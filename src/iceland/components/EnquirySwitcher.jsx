import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { X } from 'lucide-react';
import GlassLayers from '../../components/Header/GlassLayers.jsx';
import EnquiryForm from './EnquiryForm.jsx';
import { useEnquiry } from '../EnquiryContext.jsx';
import { LOW_POWER, lockScroll } from '../perf.js';

/**
 * The glass pill fixed at the top-centre of every page ("EO IN ICELAND") and the enquiry drawer it
 * opens: a panel that slides in from the right edge (full width on phones), with a dimmed backdrop.
 */
export default function EnquirySwitcher() {
  const { open, openPanel, closePanel } = useEnquiry();
  const drawerRef = useRef(null);
  const backdropRef = useRef(null);
  const first = useRef(true);

  useLayoutEffect(() => {
    const drawer = drawerRef.current;
    const backdrop = backdropRef.current;
    if (first.current) {
      first.current = false;
      gsap.set(drawer, { x: 0, xPercent: open ? 0 : 100 });
      gsap.set(backdrop, { autoAlpha: open ? 1 : 0 });
      drawer.classList.add('is-ready');
      return undefined;
    }
    const t1 = gsap.to(drawer, { x: 0, xPercent: open ? 0 : 100, duration: 0.55, ease: 'power3.inOut', overwrite: 'auto' });
    const t2 = gsap.to(backdrop, { autoAlpha: open ? 1 : 0, duration: 0.4, overwrite: 'auto' });
    return () => {
      t1.kill();
      t2.kill();
    };
  }, [open]);

  // Lock page scrolling while the drawer is open (the drawer scrolls on its own).
  useEffect(() => {
    if (open) lockScroll(true);
    const onKey = (e) => {
      if (e.key === 'Escape') closePanel();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      if (open) lockScroll(false);
    };
  }, [open, closePanel]);

  return (
    <>
      <div className="airplane_middle ice-pill" onClick={() => openPanel('')} role="button" aria-expanded={open} aria-label="Enquire">
        <GlassLayers withFilter={!LOW_POWER} />
        <div className="fixed-icons-container ice-pill-inner">
          <span className="ice-pill-txt">EO IN ICELAND</span>
        </div>
      </div>

      <div className="ice-drawer-backdrop" ref={backdropRef} onClick={closePanel} aria-hidden="true" />
      <aside className="ice-drawer" ref={drawerRef} aria-hidden={!open} data-lenis-prevent="">
        <div className="ice-drawer-head">
          <span className="ice-drawer-brand">EO in Iceland</span>
          <button type="button" className="ice-drawer-close" onClick={closePanel} aria-label="Close">
            <X size={20} strokeWidth={2} />
          </button>
        </div>
        <EnquiryForm compact />
      </aside>
    </>
  );
}
