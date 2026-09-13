import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MB = 1024 * 1024;
const IS_IOS =
  typeof navigator !== 'undefined' &&
  (/iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

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
 *
 * Memory model. Frames are decoded once into ImageBitmaps (an <img> lets the browser drop and
 * re-decode its pixels mid-scroll). Decoded pixels live under a hard byte budget, sized per device:
 * iOS kills a page's rendering process ("A problem repeatedly occurred") long before desktop limits.
 *
 *   dense lane   full-resolution frames around the playhead. When a nearer frame is needed and the
 *                lane is full, the frame farthest from the playhead is released; a released frame is
 *                only fetched again once it is nearer than something still held, so the loader
 *                settles instead of cycling.
 *   spread lane  a small, capped set of low-resolution copies of every STRIDE-th footage frame. A
 *                fast flick crosses more frames than a phone connection can deliver; these keep the
 *                footage moving (motion blur hides the lower detail) until full frames arrive.
 */
export default function useDoorComposite(
  containerRef,
  triggerRef,
  { doorFrames, videoFrames, start = 'top top', end = 'bottom top', doorEnd = 0.42, fade = 0.06, doorLastFrame = 230, smoothing = 0.16, poster, dprCap = 2, concurrency }
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
    const spread = videoFrames.map(() => null);
    const spreadDoor = doorFrames.map(() => null);
    let posterImg = null;
    let destroyed = false;
    let dirty = true;
    let lastKey = '';

    // ---- device budget ---------------------------------------------------
    const small = Math.min(window.innerWidth, window.innerHeight) <= 600;
    // spread copies decode at half width (~0.4MB each on a phone); the cap fits every door and footage copy
    const BUDGET = IS_IOS ? (small ? 205 : 350) * MB : (small ? 345 : 1024) * MB;
    const SPREAD_CAP = IS_IOS ? (small ? 55 : 90) * MB : (small ? 55 : 110) * MB;
    const DENSE_BUDGET = BUDGET - SPREAD_CAP;
    const CONCURRENCY = concurrency || (IS_IOS ? 6 : 8);
    const KEEP_BACK = 24;
    const KEEP_AHEAD = 96;
    const STRIDE = 8;
    const SPREAD_WIDTH = small ? 270 : 640;

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

    const dims = (img) => [img.naturalWidth || img.width || 0, img.naturalHeight || img.height || 0];
    const bytesOf = (img) => {
      const [w, h] = dims(img);
      return w * h * 4;
    };

    const cover = (img, alpha = 1) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const [iw, ih] = dims(img);
      const scale = Math.max(cw / iw, ch / ih);
      const w = iw * scale;
      const h = ih * scale;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
      ctx.globalAlpha = 1;
    };

    const ready = (img) => Boolean(img && dims(img)[0]);
    // nearest loaded frame at or before index (keeps motion continuous while the sequence streams in)
    const nearest = (arr, i) => {
      for (let k = i; k >= 0; k -= 1) if (ready(arr[k])) return arr[k];
      for (let k = i + 1; k < arr.length; k += 1) if (ready(arr[k])) return arr[k];
      return null;
    };

    const lastDoor = Math.min(doorLastFrame, doorFrames.length - 1);
    const fadeStart = doorEnd;
    const fadeEnd = Math.min(1, doorEnd + fade);
    const lastVideo = videoFrames.length - 1;

    // Footage: a full frame within one stride of the playhead wins; failing that, the nearest spread
    // copy, so a flick shows motion rather than a frame left far behind.
    const nearestVideo = (i) => {
      for (let k = i; k >= Math.max(0, i - STRIDE); k -= 1) if (ready(video[k])) return video[k];
      for (let k = i + 1; k <= Math.min(lastVideo, i + STRIDE); k += 1) if (ready(video[k])) return video[k];
      const s = Math.round(i / STRIDE) * STRIDE;
      for (let r = 0; r <= lastVideo + STRIDE; r += STRIDE) {
        if (s - r >= 0 && ready(spread[s - r])) return spread[s - r];
        if (s + r <= lastVideo && ready(spread[s + r])) return spread[s + r];
      }
      return nearest(video, i);
    };
    // Door: the same rule, so a flick from the top keeps the door moving through frames not yet loaded.
    const nearestDoor = (i) => {
      for (let k = i; k >= Math.max(0, i - STRIDE); k -= 1) if (ready(door[k])) return door[k];
      for (let k = i + 1; k <= Math.min(lastDoor, i + STRIDE); k += 1) if (ready(door[k])) return door[k];
      const s = Math.round(i / STRIDE) * STRIDE;
      for (let r = 0; r <= lastDoor + STRIDE; r += STRIDE) {
        if (s - r >= 0 && ready(spreadDoor[s - r])) return spreadDoor[s - r];
        if (s + r <= lastDoor && ready(spreadDoor[s + r])) return spreadDoor[s + r];
      }
      return nearest(door, i);
    };

    const draw = () => {
      const p = stateRef.current.current;
      let doorIndex = -1;
      let videoIndex = -1;
      let doorAlpha = 1;
      if (p < fadeEnd) doorIndex = Math.round(Math.min(1, p / doorEnd) * lastDoor);
      if (p >= fadeStart) {
        const vp = (p - fadeStart) / (1 - fadeStart);
        videoIndex = Math.round(vp * lastVideo);
        doorAlpha = p >= fadeEnd ? 0 : 1 - (p - fadeStart) / (fadeEnd - fadeStart);
      }
      const key = `${doorIndex}:${videoIndex}:${doorAlpha.toFixed(2)}`;
      if (!dirty && key === lastKey) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const v = videoIndex >= 0 ? nearestVideo(videoIndex) : null;
      const d = doorIndex >= 0 ? nearestDoor(doorIndex) : null;
      if (v) cover(v);
      if (d && doorAlpha > 0) cover(d, doorAlpha);
      if (!v && !d && ready(posterImg)) cover(posterImg);
      lastKey = key;
      dirty = false;
    };

    // ---- frame loading -------------------------------------------------
    // The preloader is told about a small "gate" set (the opening of each act); the rest streams
    // behind the page, nearest the scroll position first.
    const doorTotal = lastDoor + 1;
    const gateDoor = Math.min(doorTotal, 44);
    const gateVideo = Math.min(videoFrames.length, 8);
    const gateSize = gateDoor + gateVideo;
    let gateLoaded = 0;
    const report = () => window.dispatchEvent(new CustomEvent('ice:hero-progress', { detail: { loaded: gateLoaded, total: gateSize, gate: gateSize } }));

    const asked = { door: new Array(doorFrames.length).fill(false), video: new Array(videoFrames.length).fill(false), spread: new Array(videoFrames.length).fill(false), spreadDoor: new Array(doorFrames.length).fill(false) };
    const estimate = { door: 1.6 * MB, video: 1.6 * MB, spread: 0.4 * MB };
    // Every frame download this hero starts can be cancelled at once: leaving the page must not
    // keep downloading and decoding frames nobody will see.
    const controller = typeof AbortController === 'function' ? new AbortController() : null;
    let inflight = 0;
    let held = 0;
    let reserved = 0;
    let spreadHeld = 0;
    let spreadReserved = 0;
    const stats = { fetches: 0, released: 0, held: 0, frames: 0, spread: 0, budget: BUDGET };
    window.__iceHero = stats;
    const count = (arr) => arr.reduce((n, x) => n + (x ? 1 : 0), 0);
    const syncStats = () => {
      stats.held = held + spreadHeld;
      stats.frames = count(door) + count(video);
      stats.spread = count(spread) + count(spreadDoor);
    };

    // the frame each act is showing at progress `p`
    const indices = (p) => {
      const clamped = Math.min(1, Math.max(0, p));
      const vp = (clamped - fadeStart) / (1 - fadeStart);
      return { d: Math.round(Math.min(1, clamped / doorEnd) * lastDoor), v: Math.round(Math.min(1, Math.max(0, vp)) * lastVideo) };
    };
    // Distance from the playhead in progress units; frames ahead count half, so the loader leans forward.
    const distOf = (kind, k, target) => {
      const pk = kind === 'door' ? (k / Math.max(1, lastDoor)) * doorEnd : fadeStart + (k / Math.max(1, lastVideo)) * (1 - fadeStart);
      return pk >= target ? (pk - target) * 0.5 : target - pk;
    };

    const bestCandidate = (target) => {
      const { d, v } = indices(target);
      let bestKind = null;
      let bestIndex = -1;
      let bestDist = Infinity;
      const consider = (kind, k) => {
        if (asked[kind][k]) return;
        const dd = distOf(kind, k, target);
        if (dd < bestDist) {
          bestDist = dd;
          bestKind = kind;
          bestIndex = k;
        }
      };
      for (let k = Math.max(0, d - KEEP_BACK); k <= Math.min(lastDoor, d + KEEP_AHEAD); k += 1) consider('door', k);
      for (let k = Math.max(0, v - KEEP_BACK); k <= Math.min(lastVideo, v + KEEP_AHEAD); k += 1) consider('video', k);
      for (let k = 0; k < gateVideo; k += 1) consider('video', k);
      return bestKind ? { kind: bestKind, index: bestIndex, dist: bestDist } : null;
    };

    const farthestHeld = (target) => {
      let kind = null;
      let index = -1;
      let dist = -1;
      for (let k = 0; k < door.length; k += 1) {
        if (!door[k]) continue;
        const dd = distOf('door', k, target);
        if (dd > dist) {
          dist = dd;
          kind = 'door';
          index = k;
        }
      }
      for (let k = 0; k < video.length; k += 1) {
        if (!video[k]) continue;
        const dd = distOf('video', k, target);
        if (dd > dist) {
          dist = dd;
          kind = 'video';
          index = k;
        }
      }
      return kind ? { kind, index, dist } : null;
    };

    const release = (kind, k) => {
      const arr = kind === 'door' ? door : video;
      const img = arr[k];
      if (!img) return;
      held -= bytesOf(img);
      if (img.close) img.close();
      arr[k] = null;
      asked[kind][k] = false;
      stats.released += 1;
    };

    // Decode once into an ImageBitmap (optionally resized while decoding). Falls back to decoding
    // without options, then through an <img>, and to the <img> itself where createImageBitmap is missing.
    const viaImage = (blob, toBitmap) =>
      new Promise((resolve, reject) => {
        const url = URL.createObjectURL(blob);
        const img = new Image();
        img.onload = () => {
          if (!toBitmap) {
            URL.revokeObjectURL(url);
            resolve(img);
            return;
          }
          createImageBitmap(img).then(
            (bm) => {
              URL.revokeObjectURL(url);
              resolve(bm);
            },
            (e) => {
              URL.revokeObjectURL(url);
              reject(e);
            }
          );
        };
        img.onerror = (e) => {
          URL.revokeObjectURL(url);
          reject(e);
        };
        img.src = url;
      });
    const decode = (blob, options) => {
      if (typeof createImageBitmap !== 'function') return viaImage(blob, false);
      const first = options ? createImageBitmap(blob, options) : createImageBitmap(blob);
      return first.catch(() => (options ? createImageBitmap(blob) : Promise.reject())).catch(() => viaImage(blob, true));
    };
    const download = (url) =>
      fetch(url, { cache: 'force-cache', signal: controller ? controller.signal : undefined }).then((r) => (r.ok ? r.blob() : Promise.reject(new Error('frame'))));

    const fetchFrame = (kind, i) => {
      const arr = kind === 'door' ? door : video;
      const urls = kind === 'door' ? doorFrames : videoFrames;
      const isGate = kind === 'door' ? i < gateDoor : i < gateVideo;
      const est = estimate[kind];
      asked[kind][i] = true;
      inflight += 1;
      reserved += est;
      stats.fetches += 1;
      const settle = (img) => {
        inflight -= 1;
        reserved -= est;
        if (destroyed) {
          if (img && img.close) img.close();
          return;
        }
        if (img) {
          const bytes = bytesOf(img);
          estimate[kind] = bytes;
          held += bytes;
          arr[i] = img;
        }
        if (isGate) {
          gateLoaded += 1;
          report();
        }
        syncStats();
        dirty = true;
        draw();
        pump();
      };
      download(urls[i])
        .then((blob) => decode(blob))
        .then(settle, () => settle(null));
    };

    // door copies first (a flick from the top crosses the door first), then the footage
    const spreadOrder = [];
    for (let k = 0; k <= lastDoor; k += STRIDE) spreadOrder.push(['spreadDoor', k]);
    for (let k = 0; k <= lastVideo; k += STRIDE) spreadOrder.push(['spread', k]);
    let spreadCursor = 0;
    const spreadRoom = () => spreadHeld + spreadReserved + estimate.spread <= SPREAD_CAP;
    const nextSpread = () => {
      while (spreadCursor < spreadOrder.length) {
        const item = spreadOrder[spreadCursor];
        spreadCursor += 1;
        if (!asked[item[0]][item[1]]) return item;
      }
      return null;
    };
    const fetchSpread = (lane, i) => {
      const arr = lane === 'spreadDoor' ? spreadDoor : spread;
      const url = lane === 'spreadDoor' ? doorFrames[i] : videoFrames[i];
      const est = estimate.spread;
      asked[lane][i] = true;
      inflight += 1;
      spreadReserved += est;
      stats.fetches += 1;
      const settle = (img) => {
        inflight -= 1;
        spreadReserved -= est;
        if (destroyed) {
          if (img && img.close) img.close();
          return;
        }
        if (img) {
          const bytes = bytesOf(img);
          estimate.spread = Math.max(estimate.spread, bytes);
          spreadHeld += bytes;
          arr[i] = img;
        }
        syncStats();
        dirty = true;
        draw();
        pump();
      };
      download(url)
        .then((blob) => decode(blob, { resizeWidth: SPREAD_WIDTH, resizeQuality: 'low' }))
        .then(settle, () => settle(null));
    };
    // hand spare capacity to the spread lane; true if a download was started
    const trySpread = () => {
      if (!spreadRoom()) return false;
      const item = nextSpread();
      if (!item) return false;
      fetchSpread(item[0], item[1]);
      return true;
    };

    let pickTurn = 0;
    function pump() {
      while (!destroyed && inflight < CONCURRENCY) {
        pickTurn += 1;
        // one download in three goes to the spread until it is complete
        if (pickTurn % 3 === 0 && trySpread()) continue;
        const target = stateRef.current.target;
        const cand = bestCandidate(target);
        if (!cand) {
          if (trySpread()) continue;
          syncStats();
          return;
        }
        const need = estimate[cand.kind];
        let blocked = false;
        while (held + reserved + need > DENSE_BUDGET) {
          const far = farthestHeld(target);
          // nothing held is farther than what we want: stop here rather than cycle frames
          if (!far || far.dist <= cand.dist) {
            blocked = true;
            break;
          }
          release(far.kind, far.index);
        }
        if (blocked) {
          if (trySpread()) continue;
          syncStats();
          return;
        }
        fetchFrame(cand.kind, cand.index);
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

    const onPageHide = () => {
      if (controller) controller.abort();
    };
    const onPageShow = (e) => {
      if (!e.persisted) return;
      // restored from the back/forward cache: downloads cancelled on hide are wanted again
      for (const [kind, arr] of [['door', door], ['video', video], ['spread', spread], ['spreadDoor', spreadDoor]]) {
        for (let k = 0; k < arr.length; k += 1) if (!arr[k]) asked[kind][k] = false;
      }
      spreadCursor = 0;
      inflight = 0;
      reserved = 0;
      spreadReserved = 0;
      pump();
    };
    window.addEventListener('pagehide', onPageHide);
    window.addEventListener('pageshow', onPageShow);

    return () => {
      destroyed = true;
      if (controller) controller.abort();
      window.removeEventListener('pagehide', onPageHide);
      window.removeEventListener('pageshow', onPageShow);
      gsap.ticker.remove(tick);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
      st.kill();
      // Leaving the page must hand every decoded frame and the canvas backing store back at once;
      // on iOS, waiting for garbage collection is what pushed a second visit over the limit.
      for (const arr of [door, video, spread, spreadDoor]) {
        for (let k = 0; k < arr.length; k += 1) {
          if (arr[k] && arr[k].close) arr[k].close();
          arr[k] = null;
        }
      }
      held = 0;
      spreadHeld = 0;
      canvas.width = 0;
      canvas.height = 0;
      canvas.remove();
      if (window.__iceHero === stats) delete window.__iceHero;
    };
  }, [containerRef, triggerRef, doorFrames, videoFrames, start, end, doorEnd, fade, doorLastFrame, smoothing, poster, dprCap, concurrency]);
}
