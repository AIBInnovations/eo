/**
 * Device capability heuristics used to scale the experience down on phones and weak hardware:
 * lighter hero frame sets, no SVG glass distortion, no split-line scrubbing, DPR-capped canvas.
 */
const mq = (q) => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(q).matches : false);

export const IS_TOUCH = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
export const IS_SMALL = mq('(max-width: 991px)');
export const REDUCED_MOTION = mq('(prefers-reduced-motion: reduce)');

export const LOW_POWER = (() => {
  if (typeof navigator === 'undefined') return false;
  const cores = navigator.hardwareConcurrency || 8;
  const mem = navigator.deviceMemory || 8;
  const conn = navigator.connection || {};
  const slow = conn.saveData || /(^|[^\w])(2g|3g)([^\w]|$)/.test(conn.effectiveType || '');
  return IS_SMALL || cores <= 4 || mem <= 4 || slow || REDUCED_MOTION;
})();

/** Phones and tablets scroll inside a fixed container so the browser chrome never collapses/expands. */
export const USE_SCROLLER = IS_SMALL;
export const SCROLLER_SELECTOR = '#ice-scroller';

export const getScroller = () => (USE_SCROLLER ? document.querySelector(SCROLLER_SELECTOR) : null);

export const scrollTop = () => {
  const s = getScroller();
  return s ? s.scrollTop : window.scrollY;
};

export const onScroll = (fn, opts = { passive: true }) => {
  const target = getScroller() || window;
  target.addEventListener('scroll', fn, opts);
  return () => target.removeEventListener('scroll', fn, opts);
};

let locks = 0;
/** Lock/unlock page scrolling (menu, drawer, preloader) on whichever element actually scrolls. */
export const lockScroll = (on) => {
  locks = Math.max(0, locks + (on ? 1 : -1));
  const locked = locks > 0;
  const s = getScroller();
  if (s) s.style.overflowY = locked ? 'hidden' : '';
  else document.body.style.overflow = locked ? 'hidden' : '';
  const lenis = window.__lenis;
  if (lenis) (locked ? lenis.stop : lenis.start).call(lenis);
};

/**
 * AVIF support, probed once with a 1px data URI. The hero frame sets exist in both AVIF and WebP;
 * AVIF is ~35% smaller at the same quality and decodes no slower, but Safari only gained it in 16.
 */
export const avifReady = new Promise((resolve) => {
  if (typeof Image === 'undefined') return resolve(false);
  const img = new Image();
  img.onload = () => resolve(img.width > 0);
  img.onerror = () => resolve(false);
  img.src = 'data:image/avif;base64,AAAAHGZ0eXBhdmlmAAAAAG1pZjFhdmlmbWlhZgAAANZtZXRhAAAAAAAAACFoZGxyAAAAAAAAAABwaWN0AAAAAAAAAAAAAAAAAAAAAA5waXRtAAAAAAABAAAAImlsb2MAAAAAREAAAQABAAAAAAD6AAEAAAAAAAAAHAAAACNpaW5mAAAAAAABAAAAFWluZmUCAAAAAAEAAGF2MDEAAAAAVmlwcnAAAAA4aXBjbwAAAAxhdjFDgUBsAAAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwwMDAAAABZpcG1hAAAAAAAAAAEAAQOBAgMAAAAkbWRhdBIACghYADY0BDQbhDIOGYAVVVVEAACwDGHk08A='
  return undefined;
});
