import { useEffect } from 'react';

/**
 * Equivalent of the `lazy-load-video` script used on the source page:
 * the <video> gets its `src` from `data-src` once it approaches the viewport, then autoplays muted.
 */
export default function useLazyVideo(videoRef, src, rootMargin = '200px') {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    video.disablePictureInPicture = true;
    video.muted = true;
    video.playsInline = true;

    let observer;
    const playIfVisible = () => {
      if (document.hidden) return;
      const rect = video.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
      const play = video.play();
      if (play && typeof play.catch === 'function') play.catch(() => {});
    };
    const load = () => {
      if (!src || video.dataset.loaded === 'true') return;
      video.src = src;
      video.dataset.loaded = 'true';
      playIfVisible();
    };
    video.addEventListener('canplay', playIfVisible);
    window.addEventListener('pageshow', playIfVisible);
    document.addEventListener('visibilitychange', playIfVisible);

    // Above-the-fold video must not depend on an observer firing after the first gesture.
    const rect = video.getBoundingClientRect();
    if (rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight) load();

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            load();
            observer.disconnect();
          }
        },
        { rootMargin }
      );
      observer.observe(video);
    } else {
      load();
    }

    return () => {
      if (observer) observer.disconnect();
      video.removeEventListener('canplay', playIfVisible);
      window.removeEventListener('pageshow', playIfVisible);
      document.removeEventListener('visibilitychange', playIfVisible);
      delete video.dataset.loaded;
    };
  }, [videoRef, src, rootMargin]);
}
