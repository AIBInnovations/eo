import React, { useRef } from 'react';
import useParallax from '../../hooks/useParallax.js';
import Pic from './Pic.jsx';

/**
 * `.l_section` — a 120vh full-bleed photograph with the dark overlay. Two layouts from the partnership page:
 *  - intro: tag caption + right-aligned H2, statement paragraph bottom-right
 *  - cta (`cta_sec`): left-aligned H2 + button, statement paragraph bottom-right
 */
export default function LSection({ tag, title, text, cta = null, image, alt = '', short = false, id }) {
  const secRef = useRef(null);
  const imgRef = useRef(null);
  useParallax(imgRef, { trigger: secRef, start: 'top bottom', end: 'bottom top', fromPercent: -6, toPercent: 6 });

  return (
    <section className={`l_section ice-lsection${short ? ' ice-lsection--short' : ''}`} ref={secRef} id={id}>
      <div className={`above_part${cta ? ' cta_sec' : ''}`}>
        {cta ? (
          <div className="flexbox">
            <div className="heading_partner last">
              <div className="h2_ch">
                <h2 className="h2 white">{title}</h2>
              </div>
              {cta}
            </div>
          </div>
        ) : (
          <div className="flexbox spec_part">
            <div className="tag_cap">
              <div className="tag_caption white">{tag}</div>
            </div>
            <div className="heading_partner">
              <div className="h2_ch spec">
                <h2 className="h2 white">{title}</h2>
              </div>
            </div>
          </div>
        )}
        {text && (
          <div className="txt_bottom">
            <p className="medium_txt white">{text}</p>
          </div>
        )}
      </div>
      <div className="overlay" />
      <div className="fullsize_image partnerships_b">
        <Pic ref={imgRef} src={image} alt={alt} className="image" sizes="100vw" />
      </div>
    </section>
  );
}
