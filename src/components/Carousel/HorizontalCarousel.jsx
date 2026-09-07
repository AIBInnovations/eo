import React, { useEffect, useRef } from 'react';
import Splide from '@splidejs/splide';

// Exact `.slider2` configuration from the source page (arrows/pagination are disabled here
// instead of rendered-and-hidden; the CSS hide rules are kept as well).
export const SLIDER2_OPTIONS = {
  perPage: 3,
  perMove: 1,
  focus: 'left',
  type: 'slide',
  gap: '16px',
  arrows: false,
  pagination: false,
  speed: 700,
  dragAngleThreshold: 80,
  autoWidth: false,
  rewind: false,
  rewindSpeed: 800,
  waitForTransition: false,
  updateOnMove: true,
  trimSpace: false,
  breakpoints: {
    991: { perPage: 3, gap: '4vw' },
    767: { perPage: 1, gap: '4vw' },
    479: { perPage: 1, gap: '12px' },
  },
};

/**
 * Reusable draggable Splide carousel (`.splide.slider2`). Children must be `.splide__slide` elements.
 * The DOM wrappers keep the Webflow collection classes so the source CSS applies unchanged.
 */
export default function HorizontalCarousel({ id, children, className = 'splide slider2', options }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const splide = new Splide(rootRef.current, { ...SLIDER2_OPTIONS, ...options });
    splide.mount();
    return () => {
      splide.destroy(true);
    };
  }, [options]);

  return (
    <div className={className} id={id} ref={rootRef}>
      <div className="splide__track w-dyn-list">
        <div role="list" className="splide__list w-dyn-items">
          {children}
        </div>
      </div>
    </div>
  );
}
