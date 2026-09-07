import React, { useRef } from 'react';
import TravelpayoutsWidget from './TravelpayoutsWidget.jsx';
import useThirdPartyScript from '../../hooks/useThirdPartyScript.js';
import useParallax from '../../hooks/useParallax.js';
import { flightSection } from '../../data/editorial.js';
import { TPWL_VARS, WHITE_LABEL_SEARCH, OFFERS_WIDGET } from '../../data/travelpayouts.js';

/**
 * `<section class="find_best_flights">` (100em tall): full-bleed background image with a
 * scroll parallax, a 10% black overlay and the Travelpayouts search UI on top.
 * Third-party code is loaded dynamically and lives in shadow DOM / its own containers.
 */
export default function FlightSearch() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  useParallax(imageRef, { trigger: sectionRef });
  useThirdPartyScript(null, { src: WHITE_LABEL_SEARCH, type: 'module', inHead: true });

  return (
    <section className="find_best_flights" ref={sectionRef}>
      <div className="container">
        <div className="box_calculator">
          <div className="calc_css w-embed" />
          <div className="calc_box">
            <div className="headline_tickets">
              <div className="calc_headline">
                {flightSection.heading}
                <br />
              </div>
            </div>
            <div className="calc_embed search_box w-embed">
              <div id="tpwl-search" dir="ltr" style={TPWL_VARS} />
            </div>
            <div className="scroll_results">
              <div className="scroll_inside_search">
                <div data-lenis-prevent="" className="calc_embed search_result w-embed">
                  <div id="tpwl-tickets" dir="ltr" style={TPWL_VARS} />
                </div>
              </div>
            </div>
          </div>
          <div className="div-block-15">
            <div className="div-block-17">
              <TravelpayoutsWidget className="code-embed-4 w-embed w-script" src={OFFERS_WIDGET} />
            </div>
          </div>
        </div>
        <div className="overlay_box" />
        <div className="fullsize_side">
          <img ref={imageRef} src={flightSection.background} loading="lazy" alt={flightSection.backgroundAlt} className="image special_background" />
        </div>
      </div>
    </section>
  );
}
