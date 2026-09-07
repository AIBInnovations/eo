import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Replaces the Webflow "while scrolling in view" image parallax (the source sets
 * `will-change: transform; transform: translate3d(0, y%, 0)` on the image).
 *
 * Calibrated against the live page: the image translates from 0% to 8% of its own height
 * while the trigger element travels from "top top" (its top at the viewport top) to
 * "bottom top" (its bottom at the viewport top). The interaction only runs on desktop (≥992px).
 */
export default function useParallax(imageRef, { fromPercent = 0, toPercent = 8, trigger, start = 'top top', end = 'bottom top' } = {}) {
  useLayoutEffect(() => {
    const el = imageRef.current;
    if (!el) return undefined;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 992px)', () => {
      gsap.fromTo(
        el,
        { yPercent: fromPercent, willChange: 'transform' },
        {
          yPercent: toPercent,
          ease: 'none',
          scrollTrigger: {
            trigger: trigger?.current || el.parentElement,
            start,
            end,
            scrub: true,
          },
        }
      );
    });
    return () => mm.revert();
  }, [imageRef, fromPercent, toPercent, trigger, start, end]);
}
