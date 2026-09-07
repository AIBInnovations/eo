import { useEffect, useRef } from 'react';
import lottie from 'lottie-web/build/player/lottie_canvas';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-scrubbed Lottie (canvas renderer, like Webflow's lottie element).
 * The animation never autoplays: a ScrollTrigger on `triggerRef` maps scroll progress
 * (start -> end) onto the frame range with `goToAndStop`.
 *
 * Calibrated against the live page: Webflow plays the clip from 1% to 99% of its length
 * while the `.threed_story` section travels from "top top" to "bottom top", i.e.
 *   frame = totalFrames * (frameRange[0] + (frameRange[1] - frameRange[0]) * progress)
 */
export default function useScrollLottie(containerRef, triggerRef, options) {
  const { path, assetsPath, start = 'top top', end = 'bottom top', frameRange = [0.01, 0.99], preserveAspectRatio = 'xMidYMid slice' } = options;
  const animRef = useRef(null);
  const [f0, f1] = frameRange;

  // useEffect (not layout): the trigger ref belongs to the parent section and is only attached after
  // the children's layout effects have run.
  useEffect(() => {
    const container = containerRef.current;
    const trigger = triggerRef.current;
    if (!container || !trigger) return undefined;

    let destroyed = false;
    let loaded = false;
    let pendingFrame = 0;

    const anim = lottie.loadAnimation({
      container,
      renderer: 'canvas',
      loop: false,
      autoplay: false,
      path,
      assetsPath,
      rendererSettings: {
        preserveAspectRatio,
        clearCanvas: true,
        progressiveLoad: false,
      },
    });
    animRef.current = anim;
    window.__lottieAnim = anim;

    const render = (frame) => {
      pendingFrame = frame;
      if (!loaded || destroyed) return;
      anim.goToAndStop(frame, true);
    };

    anim.addEventListener('DOMLoaded', () => {
      loaded = true;
      render(pendingFrame);
    });

    const st = ScrollTrigger.create({
      trigger,
      start,
      end,
      scrub: true,
      onUpdate(self) {
        const total = anim.totalFrames || 1;
        const p = self.progress;
        // the source shows frame 0 until the very first scroll; then the 1%–99% mapping
        const frame = p === 0 ? 0 : Math.min(total - 1, total * (f0 + (f1 - f0) * p));
        render(frame);
      },
    });

    const onResize = () => {
      if (!destroyed && loaded) {
        anim.resize();
        anim.goToAndStop(pendingFrame, true);
      }
    };
    window.addEventListener('resize', onResize);

    return () => {
      destroyed = true;
      window.removeEventListener('resize', onResize);
      st.kill();
      anim.destroy();
      animRef.current = null;
      if (window.__lottieAnim === anim) window.__lottieAnim = null;
    };
  }, [containerRef, triggerRef, path, assetsPath, start, end, preserveAspectRatio, f0, f1]);

  return animRef;
}
