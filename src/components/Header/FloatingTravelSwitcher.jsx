import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import GlassLayers from './GlassLayers.jsx';
import TravelpayoutsWidget from '../FlightSearch/TravelpayoutsWidget.jsx';
import iconAirOpen from '../../assets/icons/icon-air-open.svg';
import iconAirClose from '../../assets/icons/icon-air-close.svg';
import iconHotel from '../../assets/icons/hotel-icon.avif';
import { CALCULATOR_WIDGET } from '../../data/travelpayouts.js';

// Closed-state offset of `.fixed_calculator` per source breakpoint (translateY in % of its own height)
const CLOSED_Y_PERCENT = [
  ['(max-width: 479px)', -650],
  ['(max-width: 767px)', -450],
  ['(max-width: 991px)', -350],
];
const closedYPercent = () => {
  for (const [query, value] of CLOSED_Y_PERCENT) if (window.matchMedia(query).matches) return value;
  return -250;
};


/**
 * `.airplane_middle` — the fixed glass pill at the top-centre of the viewport — and the
 * `.fixed_calculator` glass panel it slides in (translateY(-250%) -> 0) on click.
 * When open the airplane icon, divider and hotel icon give way to the centred close icon.
 */
export default function FloatingTravelSwitcher({ open, onToggle }) {
  const calcRef = useRef(null);
  const closeRef = useRef(null);
  const openRef = useRef(null);
  const dividerRef = useRef(null);
  const hotelRef = useRef(null);
  const first = useRef(true);

  useLayoutEffect(() => {
    const calc = calcRef.current;
    let tween = null;
    if (first.current) {
      // Take over the stylesheet's translateY(-N%) as a percent-based GSAP transform (px y must be 0).
      // This must survive re-runs, so the effect never reverts it — later runs only tween yPercent.
      first.current = false;
      gsap.set(calc, { y: 0, yPercent: open ? 0 : closedYPercent() });
    } else {
      tween = gsap.to(calc, { yPercent: open ? 0 : closedYPercent(), duration: 0.5, ease: 'power2.inOut', overwrite: 'auto' });
    }
    gsap.set(closeRef.current, { display: open ? 'block' : 'none' });
    gsap.set([openRef.current, dividerRef.current, hotelRef.current], { display: open ? 'none' : 'block' });

    // keep the closed panel parked at the right offset when the breakpoint changes
    const onResize = () => {
      if (!open) gsap.set(calc, { yPercent: closedYPercent() });
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (tween) tween.kill();
    };
  }, [open]);

  // One handler on the pill: clicks on the inner `#` links bubble here and are cancelled.
  const handle = (e) => {
    e.preventDefault();
    onToggle();
  };

  return (
    <>
      <div className="airplane_middle" onClick={handle} role="button" aria-expanded={open} aria-label="Find the best flights or hotels">
        <GlassLayers withFilter />
        <div className="fixed-icons-container">
          <div className="icon_air close" ref={closeRef} style={{ display: 'none' }}>
            <img src={iconAirClose} loading="lazy" alt="" className="image" />
          </div>
          <a href="#" className="airplane_form w-inline-block">
            <div className="icon_air open" ref={openRef} style={{ display: 'block' }}>
              <img src={iconAirOpen} loading="lazy" alt="" className="image" />
            </div>
          </a>
          <div className="div-block-6" ref={dividerRef} style={{ display: 'block' }} />
          <a href="#" className="hotel-form w-inline-block">
            <div className="icon-hotel" ref={hotelRef} style={{ display: 'block' }}>
              <img src={iconHotel} loading="lazy" alt="An icon of a hotel" className="image" />
            </div>
          </a>
        </div>
      </div>

      <div className="fixed_calculator" ref={calcRef}>
        <GlassLayers />
        <div className="calc_box">
          <div>
            <div className="calc_headline">Finde die besten Flüge oder Hotels</div>
          </div>
          <TravelpayoutsWidget className="calc_embed w-embed w-script" src={CALCULATOR_WIDGET} />
        </div>
      </div>
    </>
  );
}
