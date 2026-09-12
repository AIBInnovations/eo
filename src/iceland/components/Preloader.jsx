import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { lockScroll } from '../perf.js';
import logo from '../../assets/logos/eo-amplify-light.png';

const MIN_MS = 700;
const MAX_MS = 4500;

/**
 * First-load screen: the wordmark and a progress bar while the fonts and the hero's first act
 * (the door frames) come in. Progress arrives from useDoorComposite as `ice:hero-progress` events;
 * on pages without the scrubbed hero it simply waits for fonts + the hero image.
 */
export default function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const rootRef = useRef(null);
  const doneRef = useRef(false);

  useEffect(() => {
    lockScroll(true);
    const started = performance.now();
    let heroReady = !document.querySelector('.ice-hero');
    let fontsReady = false;
    let timer = null;
    let raf = 0;
    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      setProgress(1);
      gsap.to(rootRef.current, {
        autoAlpha: 0,
        duration: 0.6,
        ease: 'power2.inOut',
        delay: 0.15,
        onComplete: () => {
          lockScroll(false);
          document.body.classList.add('is-loaded');
          onDone();
        },
      });
    };
    const check = () => {
      if (heroReady && fontsReady && performance.now() - started >= MIN_MS) finish();
    };
    const onHero = (e) => {
      const { loaded, gate, total } = e.detail;
      const need = gate || total;
      setProgress((p) => Math.max(p, Math.min(0.95, loaded / need)));
      if (loaded >= need) {
        heroReady = true;
        check();
      }
    };
    window.addEventListener('ice:hero-progress', onHero);
    const fonts = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    fonts.then(() => {
      fontsReady = true;
      setProgress((p) => Math.max(p, 0.2));
      check();
    });
    if (heroReady) {
      // internal pages: wait for the hero photograph (or the poster) to decode
      const img = document.querySelector('.ice-page-hero img, .ice-page-hero video');
      heroReady = false;
      const done = () => {
        heroReady = true;
        setProgress((p) => Math.max(p, 0.9));
        check();
      };
      if (!img) done();
      else if (img.tagName === 'IMG') (img.complete ? Promise.resolve() : new Promise((r) => (img.onload = img.onerror = r))).then(done);
      else done();
    }
    // keep the bar moving a little so it never looks stuck, and never hold the visitor beyond MAX_MS
    const tickFn = () => {
      setProgress((p) => (p < 0.85 ? p + 0.0015 : p));
      raf = requestAnimationFrame(tickFn);
    };
    raf = requestAnimationFrame(tickFn);
    timer = setTimeout(finish, MAX_MS);
    const minTimer = setTimeout(check, MIN_MS + 10);
    return () => {
      window.removeEventListener('ice:hero-progress', onHero);
      clearTimeout(timer);
      clearTimeout(minTimer);
      cancelAnimationFrame(raf);
    };
  }, [onDone]);

  return (
    <div className="ice-preloader" ref={rootRef} role="status" aria-label="Loading">
      <div className="ice-preloader-inner">
        <div className="ice-preloader-mark">
          <img src={logo} alt="EO Punjab × Amplify" className="ice-preloader-logo" />
          <span className="ice-preloader-sub">Iceland 2027</span>
        </div>
        <div className="ice-preloader-bar">
          <div className="ice-preloader-fill" style={{ transform: `scaleX(${progress})` }} />
        </div>
        <div className="ice-preloader-hint">Land of Fire &amp; Ice</div>
      </div>
    </div>
  );
}
