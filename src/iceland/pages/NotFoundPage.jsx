import React from 'react';
import Btn from '../blocks/Btn.jsx';
import { pageImages } from '../data/pages.js';

/** Custom 404: the page does not exist, but the retreat does. */
export default function NotFoundPage() {
  return (
    <section className="ice-404">
      <img src={pageImages.canyonPlateau} alt="" className="ice-404-bg" aria-hidden="true" />
      <div className="ice-404-shade" />
      <div className="ice-404-inner">
        <div className="ice-eyebrow ice-eyebrow--light">404</div>
        <h1 className="h1_partnerships white">Lost between two continents.</h1>
        <p className="ice-p ice-404-txt">That page is not on the itinerary. Head back to the plan, or ask the retreat desk.</p>
        <div className="ice-btn-row">
          <Btn to="/">Back home</Btn>
          <Btn to="/journey" dark>
            The Journey
          </Btn>
        </div>
      </div>
    </section>
  );
}
