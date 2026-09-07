import React, { useRef } from 'react';
import useParallax from '../../hooks/useParallax.js';

/**
 * `.flexbox.partnerships` — the "How it works" split: headline, caption line, a ruled list of steps
 * (`(a) Apply — description`) and a CTA box on the left; a full-height photograph (or any element) on the right.
 */
export default function StepsSplit({ eyebrow, title, caption, steps = [], ctaText, cta = null, image, alt = '', reverse = false, teaser = false, children, id, className = '' }) {
  const rightRef = useRef(null);
  const imgRef = useRef(null);
  useParallax(imgRef, { trigger: rightRef, start: 'top bottom', end: 'bottom top', fromPercent: -5, toPercent: 5 });

  return (
    <section className={`ice-split${reverse ? ' ice-split--reverse' : ''}${teaser ? ' ice-split--teaser' : ''} ${className}`.trim()} id={id}>
      <div className="flexbox partnerships">
        <div className="left_side">
          <div className="wrapper_left">
            {(eyebrow || title) && (
              <div className={`headline_how${title ? '' : ' ice-headline-how--slim'}`}>
                {eyebrow && <div className="tag_caption ice-tag">{eyebrow}</div>}
                {title && <h2 className="h2">{title}</h2>}
              </div>
            )}
            <div className="caption_list">
              {caption && (
                <div className="caption_line">
                  <div>{caption}</div>
                </div>
              )}
              {steps.length > 0 && (
                <div>
                  <div className="w-dyn-list">
                    <div className="list_steps w-dyn-items">
                      {steps.map((s, i) => (
                        <div className="w-dyn-item" key={(s.key || '') + (s.title || '') + i}>
                          <div className="flexbox_line spec_part">
                            <div className="letter_title">
                              <div>{s.key}</div>
                              <div>{s.title}</div>
                            </div>
                            <div className="desc_step">
                              <div>{s.text}</div>
                            </div>
                          </div>
                          <div className="splitter_list" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {(ctaText || cta) && (
              <div className="cta_box">
                {ctaText && (
                  <div className="m_cta">
                    <p className="medium_txt">{ctaText}</p>
                  </div>
                )}
                {cta}
              </div>
            )}
          </div>
        </div>
        <div className={`right_side${children ? ' ice-right-content' : ''}`} ref={rightRef}>
          {children || <img ref={imgRef} src={image} alt={alt} className="image" loading="lazy" />}
        </div>
      </div>
    </section>
  );
}
