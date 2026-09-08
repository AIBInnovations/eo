import React from 'react';
import HorizontalCarousel from '../../components/Carousel/HorizontalCarousel.jsx';
import { stays } from '../data/retreat.js';
import Btn from '../blocks/Btn.jsx';
import useMediaQuery from '../../hooks/useMediaQuery.js';
import Pic from '../blocks/Pic.jsx';

/** "Stay & Experiences" — lots of imagery, very little text, in the reference site's draggable card carousel. */
export default function Stay({ teaser = false }) {
  const phone = useMediaQuery('(max-width: 991px)');
  return (
    <section className="destinations ice-section ice-stay" id="stay">
      <div className="wrapper_base spec_cms">
        <div className="flexbox_siddes">
          <div className="left_part">
            <p className="b_txt ice-p color-inversion-target">The places that build the anticipation: where we sleep, where we eat under the aurora, and where the glacier, the lagoon and the concert hall take over.</p>
          </div>
          <div className="right_part">
            <div className="headline_box ice-headline-box">
              <h2 className="h2 spec_p ice-h2 color-inversion-target">Stay & Experiences</h2>
            </div>
            <div className="caption">
              <div className="caption_txt color-inversion-target">{phone ? 'Six places, four nights' : 'Drag to navigate'}</div>
            </div>
          </div>
        </div>
      </div>
      {phone ? (
        <div className="ice-stay-grid">
          {stays.map((s, i) => (
            <figure className="featured_cards ice-strip-card" key={s.name}>
              <div className="content_wrapper">
                <div>
                  <div className="destination_name">{s.name}</div>
                  <div className="city_km">{s.caption}</div>
                </div>
              </div>
              <div className="overlay_continent" />
              <div className="cover_continent">
                <Pic src={s.image} alt={s.alt} className="image" sizes="50vw" />
              </div>
            </figure>
          ))}
        </div>
      ) : (
        <div className="destinations_slider">
        <div className="container-2">
          <HorizontalCarousel id="splide-stay">
            {stays.map((s, i) => (
              <div key={s.name} role="listitem" className="splide__slide five-cards destination_cards w-dyn-item">
                <div className="cont_dest_link special_slider w-inline-block">
                  <div className="featured_cards color-inversion-target">
                    <div className="content_wrapper">
                      <div>
                        <div className="destination_name">{s.name}</div>
                      </div>
                      <div className="destination_price">
                        <div className="city_km">{s.caption}</div>
                        <div className="city_km">{String(i + 1).padStart(2, '0')}</div>
                      </div>
                    </div>
                    <div className="overlay_continent" />
                    <div className="cover_continent">
                      <Pic src={s.image} alt={s.alt} className="image" sizes="(max-width: 991px) 60vw, 28vw" loading={i > 2 ? 'lazy' : 'eager'} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </HorizontalCarousel>
        </div>
      </div>
      )}
      {teaser && (
        <div className="ice-teaser-cta">
          <Btn to="/stay" dark>
            See every stay & experience
          </Btn>
        </div>
      )}
    </section>
  );
}
