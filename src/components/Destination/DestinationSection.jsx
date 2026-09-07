import React from 'react';
import HorizontalCarousel from '../Carousel/HorizontalCarousel.jsx';
import DestinationCard from './DestinationCard.jsx';
import LatestArticles from '../Articles/LatestArticles.jsx';
import RevealText from '../Editorial/RevealText.jsx';
import { destinations } from '../../data/destinations.js';
import { destinationsIntro, explorationBlock } from '../../data/editorial.js';

/**
 * `<section class="destinations">` — intro copy + heading, the destinations Splide,
 * the mobile-only paragraph, the "Latest articles" Splide and the first split-lines block.
 * (The source nests all of these inside the one section, so the layout is kept identical.)
 */
export default function DestinationSection() {
  return (
    <section className="destinations">
      <div className="wrapper_base spec_cms">
        <div className="flexbox_siddes">
          <div className="left_part">
            <p className="b_txt color-inversion-target">{destinationsIntro.paragraph}</p>
          </div>
          <div className="right_part">
            <div className="headline_box">
              <h2 className="h2 spec_p color-inversion-target">{destinationsIntro.heading}</h2>
            </div>
            <div className="caption">
              <div className="caption_txt color-inversion-target">{destinationsIntro.caption}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="destinations_slider">
        <div className="container-2">
          <HorizontalCarousel id="splide01">
            {destinations.map((item, i) => (
              <div key={item.id} data-cms-item={item.id} role="listitem" className="splide__slide five-cards destination_cards w-dyn-item">
                <DestinationCard item={item} slider lazy={i > 2} />
              </div>
            ))}
          </HorizontalCarousel>
        </div>
        <div className="mobile_slider_additional">
          <div className="b_txt">
            {destinationsIntro.mobileParagraph}
            <br />
          </div>
        </div>
      </div>

      <LatestArticles />

      <div className="wrapper_base special_cards">
        <RevealText heading={explorationBlock.heading} text={explorationBlock.text} />
      </div>
    </section>
  );
}
