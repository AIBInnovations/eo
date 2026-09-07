import React, { useRef } from 'react';
import RevealText from '../Editorial/RevealText.jsx';
import useParallax from '../../hooks/useParallax.js';
import { featuredArticle as a, nextLevelBlock } from '../../data/editorial.js';

/**
 * The safari feature: sticky 30% text column + 68.8% × 52em parallax image,
 * followed by the second split-lines editorial block (`.txt_part > .split_box.special`).
 */
export default function FeaturedArticle() {
  const imageWrapRef = useRef(null);
  const imageRef = useRef(null);
  useParallax(imageRef, { trigger: imageWrapRef });

  return (
    <section>
      <div className="wrapper_base">
        <div className="w-dyn-list">
          <div role="list" className="w-dyn-items">
            <div role="listitem" className="w-dyn-item">
              <div className="flexbox special_layout">
                <div className="l_side_tall">
                  <div className="headline_blog_home">
                    <div className="article_headline color-inversion-target">{a.heading}</div>
                    <div className="b_txt color-inversion-target">{a.text}</div>
                  </div>
                  <a href={a.href} className="button_base black color-inversion-target w-inline-block">
                    <div>{a.button}</div>
                  </a>
                </div>
                <div className="img_blog r_side" ref={imageWrapRef}>
                  <img ref={imageRef} src={a.image} loading="lazy" alt={a.alt} className="image color-inversion-target" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="txt_part">
          <RevealText boxClass="split_box special" heading={nextLevelBlock.heading} text={nextLevelBlock.text} />
        </div>
      </div>
    </section>
  );
}
