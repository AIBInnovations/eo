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
      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;
      const scale = Math.max(cw / iw, ch / ih);
      const w = iw * scale;
      const h = ih * scale;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
      ctx.globalAlpha = 1;
    };

    const ready = (img) => Boolean(img && (img.width || img.naturalWidth));
    // A full sequence held in memory decodes to well over a gigabyte on a phone, which makes the
    // browser purge and re-decode frames mid-scroll — the stutter this is here to avoid. Frames far
    // from the playhead are released (they come back from the HTTP cache in a few ms if revisited).
    const KEEP_BACK = 24;
    const KEEP_AHEAD = 96;
    let trimTick = 0;
    const TRIM_BUDGET = 6; // release a few per pass; closing many at once costs a frame
    const trim = (arr, flags, idx) => {
      if (idx < 0) return;
      let budget = TRIM_BUDGET;
      for (let k = 0; k < arr.length && budget > 0; k += 1) {
        if (k >= idx - KEEP_BACK && k <= idx + KEEP_AHEAD) continue;
        if (arr === video && k % SPARSE_STRIDE === 0) continue; // keep the spread
        if (arr[k]) {
          if (arr[k].close) arr[k].close();
          arr[k] = null;
          flags[k] = false;
          budget -= 1;
        }
      }
    };
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
      trimTick += 1;
      if (trimTick % 12 === 0) {
        trim(video, asked.video, videoIndex);
        // past the door act: keep only its tail, in case the visitor scrolls back up
        trim(door, asked.door, doorIndex >= 0 ? doorIndex : lastDoor);
      }
    };

    // ---- frame loading -------------------------------------------------
    // Frames are fetched nearest-first around the scroll playhead rather than in one fixed order,
    // so scrolling ahead never waits behind frames that are already off screen. The preloader is
    // told about a small "gate" set (the opening of each act) and the rest streams behind the page.
    const doorTotal = lastDoor + 1;
    const gateDoor = Math.min(doorTotal, 44);
    const gateVideo = Math.min(videoFrames.length, 8);
    const gateSize = gateDoor + gateVideo;
    let gateLoaded = 0;
    const report = () => window.dispatchEvent(new CustomEvent('ice:hero-progress', { detail: { loaded: gateLoaded, total: gateSize, gate: gateSize } }));

    let inflight = 0;
    const asked = { door: new Array(doorFrames.length).fill(false), video: new Array(videoFrames.length).fill(false) };

    // the frame each act is showing at progress `p`
    const indices = (p) => {
      const clamped = Math.min(1, Math.max(0, p));
      const vp = (clamped - fadeStart) / (1 - fadeStart);
      return { d: Math.round(Math.min(1, clamped / doorEnd) * lastDoor), v: Math.round(Math.min(1, Math.max(0, vp)) * (videoFrames.length - 1)) };
    };
    // A fast flick can cross hundreds of frames in a second — far more than any mobile connection
    // can deliver. So a sparse spread across the whole footage is fetched alongside the dense fill
    // near the playhead: wherever you land, a frame within a few of it already exists, and the
    // sequence keeps moving instead of freezing on one image.
    const SPARSE_STRIDE = 8;
    let sparseCursor = 0;
    const nextSparse = () => {
      while (sparseCursor < videoFrames.length) {
        const i = sparseCursor;
        sparseCursor += SPARSE_STRIDE;
        if (!asked.video[i]) return i;
      }
      return -1;
    };
    let pickTurn = 0;

    const nextUnasked = (flags, from, limit) => {
      for (let k = from; k < limit; k += 1) if (!flags[k]) return k;
      for (let k = 0; k < from; k += 1) if (!flags[k]) return k;
      return -1;
    };

    const fetchFrame = (kind, i) => {
      const arr = kind === 'door' ? door : video;
      const urls = kind === 'door' ? doorFrames : videoFrames;
      const isGate = kind === 'door' ? i < gateDoor : i < gateVideo;
      asked[kind][i] = true;
      inflight += 1;
      const settle = (bitmap) => {
        inflight -= 1;
        if (destroyed) {
          if (bitmap && bitmap.close) bitmap.close();
          return;
        }
        if (bitmap) arr[i] = bitmap;
        if (isGate) {
          gateLoaded += 1;
          report();
        }
        dirty = true;
        draw();
        pump();
      };
      // Decode once into an ImageBitmap. An <img> lets the browser drop its decoded pixels under
      // memory pressure and decode again at draw time, which is what stalls the scroll; a bitmap
      // is owned here, costs one decode, and draws as a straight blit.
      fetch(urls[i], { cache: 'force-cache' })
        .then((r) => (r.ok ? r.blob() : Promise.reject(new Error('frame'))))
        .then((blob) => createImageBitmap(blob))
        .then(settle, () => settle(null));
    };

    function pump() {
      while (!destroyed && inflight < concurrency) {
        const p = stateRef.current.target;
        const { d, v } = indices(p);
        let kind = null;
        let index = -1;
        pickTurn += 1;
        // one in three goes to the spread until it is complete
        if (pickTurn % 3 === 0) {
          index = nextSparse();
          if (index >= 0) kind = 'video';
        }
        if (index < 0 && p < fadeEnd) {
          index = nextUnasked(asked.door, d, doorTotal);
          if (index >= 0) kind = 'door';
        }
        if (index < 0) {
          index = nextUnasked(asked.video, v, videoFrames.length);
          if (index >= 0) kind = 'video';
        }
        if (index < 0) {
          index = nextUnasked(asked.door, 0, doorTotal);
          if (index >= 0) kind = 'door';
        }
        if (index < 0) return;
        fetchFrame(kind, index);
      }
    }

    if (poster) {
      posterImg = new Image();
      posterImg.onload = () => {
        if (destroyed) return;
        dirty = true;
        draw();
      };
      posterImg.src = poster;
    }
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
        pump();
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
