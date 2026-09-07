import React, { useEffect, useState } from 'react';
import { useEnquiry } from '../EnquiryContext.jsx';
import { ITINERARY_PDF } from '../data/pages.js';
import { onScroll, scrollTop } from '../perf.js';

/** Slim sticky bar on phones: appears once the visitor has scrolled past the first screen. */
export default function MobileCta({ hidden = false }) {
  const { openPanel, open } = useEnquiry();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(scrollTop() > window.innerHeight * 0.9);
    fn();
    return onScroll(fn);
  }, []);
  const visible = show && !hidden && !open;
  return (
    <div className={`ice-mobile-cta${visible ? ' is-visible' : ''}`} aria-hidden={!visible}>
      <a href={ITINERARY_PDF} target="_blank" rel="noreferrer" className="ice-mobile-cta-link">
        Itinerary
      </a>
      <button type="button" className="ice-mobile-cta-btn" onClick={() => openPanel('')}>
        Enquire
      </button>
    </div>
  );
}
