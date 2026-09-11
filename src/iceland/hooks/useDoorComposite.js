import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-scrubbed hero sequence on one canvas, in two acts:
 *
 *   Act 1  (progress 0 → doorEnd)      the reference site's door animation plays untouched:
 *                                       the door opens and the camera walks through it.
 *   Act 2  (doorEnd → 1)               once inside, the Iceland FPV footage (60 fps frames) plays;
 *                                       a short crossfade (fade) blends the last door frame into it.
 *
 * Nothing autoplays: both sequences are driven only by the section's scroll progress, which is
 * eased towards its target every tick (`smoothing`) so fast wheel input never jumps frames.
 */
export default function useDoorComposite(
  containerRef,
  triggerRef,
  { doorFrames, videoFrames, start = 'top top', end = 'bottom top', doorEnd = 0.42, fade = 0.06, doorLastFrame = 230, smoothing = 0.16, poster, dprCap = 2, concurrency = 8 }
) {
  const stateRef = useRef({ target: 0, current: 0 });

  useEffect(() => {
    const container = containerRef.current;
    const trigger = triggerRef.current;
    if (!container || !trigger || !doorFrames.length || !videoFrames.length) return undefined;

    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      canvas.remove();
      return undefined;
    }

    const door = doorFrames.map(() => null);
    const video = videoFrames.map(() => null);
    let posterImg = null;
    let destroyed = false;
    let dirty = true;
    let lastKey = '';

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      const { width, height } = container.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.round(width * dpr));
      const nextHeight = Math.max(1, Math.round(height * dpr));
      if (canvas.width === nextWidth && canvas.height === nextHeight) return;
      canvas.width = nextWidth;
      canvas.height = nextHeight;
      dirty = true;
    };

    const cover = (img, alpha = 1) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
      ctx.globalAlpha = 1;
    };

    const ready = (img) => img && img.complete && img.naturalWidth > 0;
    // nearest loaded frame at or before index (keeps motion continuous while the sequence streams in)
    const nearest = (arr, i) => {
      for (let k = i; k >= 0; k -= 1) if (ready(arr[k])) return arr[k];
      for (let k = i + 1; k < arr.length; k += 1) if (ready(arr[k])) return arr[k];
      return null;
    };

    const lastDoor = Math.min(doorLastFrame, doorFrames.length - 1);
    const fadeStart = doorEnd;
    const fadeEnd = Math.min(1, doorEnd + fade);

    const draw = () => {
      const p = stateRef.current.current;
      let doorIndex = -1;
      let videoIndex = -1;
      let doorAlpha = 1;
      if (p < fadeEnd) doorIndex = Math.round(Math.min(1, p / doorEnd) * lastDoor);
      if (p >= fadeStart) {
        const vp = (p - fadeStart) / (1 - fadeStart);
        videoIndex = Math.round(vp * (videoFrames.length - 1));
        doorAlpha = p >= fadeEnd ? 0 : 1 - (p - fadeStart) / (fadeEnd - fadeStart);
      }
      const key = `${doorIndex}:${videoIndex}:${doorAlpha.toFixed(2)}`;
      if (!dirty && key === lastKey) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const v = videoIndex >= 0 ? nearest(video, videoIndex) : null;
      const d = doorIndex >= 0 ? nearest(door, doorIndex) : null;
      if (v) cover(v);
      if (d && doorAlpha > 0) cover(d, doorAlpha);
      if (!v && !d && ready(posterImg)) cover(posterImg);
      lastKey = key;
      dirty = false;
    };

    // Frames stream in through a small queue (instead of ~1000 simultaneous requests): the door first,
    // reporting progress for the preloader, then the footage.
    const queue = [];
    let inflight = 0;
    let doorLoaded = 0;
    const doorTotal = Math.min(doorLastFrame, doorFrames.length - 1) + 1;
    // the preloader only waits for the first `gate` frames; the rest keep streaming behind the page
    const gate = Math.min(doorTotal, 48);
    const report = () => window.dispatchEvent(new CustomEvent('ice:hero-progress', { detail: { loaded: doorLoaded, total: doorTotal, gate } }));
    const pump = () => {
      while (inflight < concurrency && queue.length) {
        const job = queue.shift();
        inflight += 1;
        job(() => {
          inflight -= 1;
          pump();
        });
      }
    };
    const load = (arr, urls, i, isDoor) => {
      if (arr[i]) return;
      const img = new Image();
      img.decoding = 'async';
      arr[i] = img;
      queue.push((done) => {
        if (destroyed) return done();
        const finish = () => {
          if (!destroyed) {
            dirty = true;
            draw();
            if (isDoor) {
              doorLoaded += 1;
              report();
            }
          }
          done();
        };
        img.onload = finish;
        img.onerror = finish;
        img.src = urls[i];
        return undefined;
      });
    };

    if (poster) {
      posterImg = new Image();
      posterImg.onload = () => {
        if (destroyed) return;
        dirty = true;
        draw();
      };
      posterImg.src = poster;
    }
    // the door first (it is what the visitor sees first), then the footage
    for (let i = 0; i <= lastDoor; i += 1) load(door, doorFrames, i, true);
    for (let i = 0; i < videoFrames.length; i += 1) load(video, videoFrames, i, false);
    report();
    pump();

    size();
    draw();

    const st = ScrollTrigger.create({
      trigger,
      start,
      end,
      onUpdate(self) {
        stateRef.current.target = self.progress;
      },
    });
    stateRef.current.target = st.progress;
    stateRef.current.current = st.progress;

    const tick = () => {
      const s = stateRef.current;
      const diff = s.target - s.current;
      if (Math.abs(diff) < 0.00005) s.current = s.target;
      else s.current += diff * smoothing;
      draw();
    };
    gsap.ticker.add(tick);

    const onResize = () => {
      size();
      draw();
    };
    window.addEventListener('resize', onResize);
    // CSS, fonts and the mobile scroll container can settle after the initial effect.
    const observer = new ResizeObserver(onResize);
    observer.observe(container);

    return () => {
      destroyed = true;
      gsap.ticker.remove(tick);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
      st.kill();
      canvas.remove();
    };
  }, [containerRef, triggerRef, doorFrames, videoFrames, start, end, doorEnd, fade, doorLastFrame, smoothing, poster, dprCap, concurrency]);
}
