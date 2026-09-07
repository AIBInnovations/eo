import { useLayoutEffect } from 'react';
import SplitType from 'split-type';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Port of the page's split-lines script:
 *  - every `.split-lines` element is split into lines + words with SplitType
 *  - each `.line` gets a `.line-mask` overlay
 *  - a scrubbed ScrollTrigger animates the mask width 100% -> 0% between "top center" and "bottom center"
 *  - on a real viewport-width change everything is reverted and rebuilt (line wrapping changes)
 * Splitting waits for the custom font so line breaks match the final layout.
 */
export default function useSplitLines(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef?.current || document;
    let instances = [];
    let triggers = [];
    let cancelled = false;

    const revert = () => {
      triggers.forEach((t) => t.kill());
      triggers = [];
      root.querySelectorAll('.line-mask').forEach((m) => m.remove());
      instances.forEach((i) => i.revert());
      instances = [];
    };

    const run = () => {
      if (cancelled) return;
      const elements = Array.from(root.querySelectorAll('.split-lines'));
      instances = elements.map((el) => new SplitType(el, { types: 'lines, words' }));
      root.querySelectorAll('.line').forEach((line) => {
        const mask = document.createElement('div');
        mask.className = 'line-mask';
        line.appendChild(mask);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: line,
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
          },
        });
        tl.to(mask, { width: '0%', duration: 8 });
        triggers.push(tl.scrollTrigger);
      });
      ScrollTrigger.refresh();
    };

    let windowWidth = window.innerWidth;
    const onResize = () => {
      if (windowWidth === window.innerWidth) return;
      windowWidth = window.innerWidth;
      revert();
      run();
    };

    const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    fontsReady.then(run);
    window.addEventListener('resize', onResize);

    return () => {
      cancelled = true;
      window.removeEventListener('resize', onResize);
      revert();
    };
  }, [rootRef]);
}
