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

    let observer;
    const load = () => {
      if (video.dataset.loaded === 'true') return;
      video.src = src;
      video.dataset.loaded = 'true';
      const play = video.play();
      if (play && typeof play.catch === 'function') play.catch(() => {});
    };

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
    };
  }, [videoRef, src, rootMargin]);
}
