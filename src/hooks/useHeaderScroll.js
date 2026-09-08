import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DESKTOP = '(min-width: 992px)';
const INVERT_ON_HERO = '(min-width: 480px)';
const INVERT_ON_FOOTER = '(min-width: 768px)';

/**
 * The header's two Webflow scroll interactions, calibrated against the live page:
 *
 *  1. Colour inversion — `filter: invert(1)` while the header sits over the light sections.
 *     It flips to inverted the moment the hero (`.threed_story`) bottom passes the viewport top
 *     and flips back once the footer enters the viewport (≥480px; ≤479px the header uses
 *     `mix-blend-mode: difference` from the CSS instead).
 *
 *  2. Hide on scroll down / show on scroll up — translateY(-100%) after scrolling down past the
 *     header height, translateY(0) as soon as the user scrolls up. Desktop (≥992px) only.
 */
export default function useHeaderScroll(headerRef, { hideThreshold = 50, key = null } = {}) {
  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return undefined;

    const mm = gsap.matchMedia();

    // --- 1. invert -------------------------------------------------------
    // The measured live behaviour: the hero un-inverts the header while any part of it is above
    // the viewport top edge; the footer un-inverts it from the moment its top crosses ~75% of the
    // viewport height (only from the tablet breakpoint upwards).
    mm.add(
      { hero: INVERT_ON_HERO, footer: INVERT_ON_FOOTER },
      (context) => {
        const { footer: withFooter } = context.conditions;
        const active = new Set();
        let inverted = null;
        const apply = () => {
          const shouldInvert = active.size === 0;
          if (shouldInvert === inverted) return;
          inverted = shouldInvert;
          // the class lets the logo counter-invert so the brand colours stay true
          header.classList.toggle('ice-inverted', shouldInvert);
          gsap.to(header, { filter: `invert(${shouldInvert ? 1 : 0})`, duration: 0.3, ease: 'power1.out', overwrite: 'auto' });
        };
        const sync = (self, el) => {
          if (self.isActive) active.add(el);
          else active.delete(el);
          apply();
        };
        const defs = [{ sel: '.threed_story, .ice-page-hero', start: 'top bottom', end: 'bottom top' }];
        if (withFooter) defs.push({ sel: '.footer', start: 'top 75%', end: 'bottom top' });
        const triggers = defs
          .flatMap((d) => Array.from(document.querySelectorAll(d.sel)).map((el) => ({ ...d, el })))
          .map((d) =>
            ScrollTrigger.create({
              trigger: d.el,
              start: d.start,
              end: d.end,
              onToggle: (self) => sync(self, d.el),
              onRefresh: (self) => sync(self, d.el),
            })
          );
        triggers.forEach((t) => t.isActive && active.add(t.trigger));
        apply();
        return () => {
          triggers.forEach((t) => t.kill());
          header.classList.remove('ice-inverted');
          gsap.set(header, { clearProps: 'filter' });
        };
      }
    );

    // --- 2. hide / show by scroll direction ----------------------------
    mm.add(DESKTOP, () => {
      let hidden = false;
      let lastY = window.scrollY;
      const setHidden = (v) => {
        if (v === hidden) return;
        hidden = v;
        gsap.to(header, { yPercent: v ? -100 : 0, duration: 0.45, ease: 'power2.out', overwrite: 'auto' });
      };
      const onScroll = () => {
        const y = window.scrollY;
        if (y <= 0) setHidden(false);
        else if (y > lastY && y > hideThreshold) setHidden(true);
        else if (y < lastY) setHidden(false);
        lastY = y;
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', onScroll);
        gsap.set(header, { clearProps: 'transform' });
      };
    });

    return () => mm.revert();
  }, [headerRef, hideThreshold, key]);
}
