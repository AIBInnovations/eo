import { useEffect } from 'react';

const OUTLINE_EASING = 0.15;
const DOT_EASING = OUTLINE_EASING * 2; // double the speed of the outline (as in the source script)

/**
 * Two-element lerp cursor (dot + outline) in a single requestAnimationFrame loop.
 * Hover state is delegated so cards rendered later (Splide clones, lazy content) still work.
 * Disabled on touch / coarse-pointer devices.
 */
export default function useCustomCursor(dotRef, outlineRef) {
  useEffect(() => {
    const dot = dotRef.current;
    const outline = outlineRef.current;
    if (!dot || !outline) return undefined;

    const isTouch =
      typeof window !== 'undefined' &&
      (window.matchMedia('(hover: none), (pointer: coarse)').matches || 'ontouchstart' in window);
    if (isTouch) {
      dot.style.display = 'none';
      outline.style.display = 'none';
      return undefined;
    }

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let outlineX = 0;
    let outlineY = 0;
    let rafId = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const onOver = (e) => {
      if (e.target.closest && e.target.closest('.color-inversion-target')) {
        dot.classList.add('hover');
        outline.classList.add('hover');
      }
    };
    const onOut = (e) => {
      const from = e.target.closest && e.target.closest('.color-inversion-target');
      if (!from) return;
      const to = e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest('.color-inversion-target');
      if (to === from) return;
      dot.classList.remove('hover');
      outline.classList.remove('hover');
    };

    const animate = () => {
      dotX += (mouseX - dotX) * DOT_EASING;
      dotY += (mouseY - dotY) * DOT_EASING;
      dot.style.left = `${dotX}px`;
      dot.style.top = `${dotY}px`;

      outlineX += (mouseX - outlineX) * OUTLINE_EASING;
      outlineY += (mouseY - outlineY) * OUTLINE_EASING;
      outline.style.left = `${outlineX}px`;
      outline.style.top = `${outlineY}px`;

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, [dotRef, outlineRef]);
}
