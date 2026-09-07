import React from 'react';
import DestinationCard from '../Destination/DestinationCard.jsx';
import { handpickedDestinations } from '../../data/destinations.js';
import { hotels } from '../../data/hotels.js';

/*
 * These three sections exist in the source DOM but are hidden by
 * `.section-2,.section-3,.section-4{display:none}`. They are reproduced (without their
 * third-party map/load-more scripts) purely for structural parity and never become visible.
 */

export function HandpickedDestinations() {
  return (
    <section className="section-2" aria-hidden="true">
      <div className="continent_content">
        <div className="continent_headline">
          <h2 className="h3">Handpicked Destinations</h2>
        </div>
        <div className="cms_cards">
          <div className="w-dyn-list">
            <div role="list" className="grid_continents w-dyn-items">
              {handpickedDestinations.map((item) => (
                <div key={item.id} data-cms-item={item.id} role="listitem" className="continents_cards w-dyn-item">
                  <DestinationCard item={item} cardClass="continent_card" inversionTarget={false} />
                </div>
              ))}
            </div>
            <div role="navigation" aria-label="List" className="w-pagination-wrapper">
              <a href="?74d2ace9_page=2" aria-label="Next Page" className="w-pagination-next load_more">
                <div className="w-inline-block">Load More</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function MapSection() {
  return (
    <section className="section-3" aria-hidden="true">
      <div className="flexbox map">
        <div className="left_side_map">
          <div className="map_side_part" />
        </div>
        <div className="right_side_map">
          <div className="content_map">
            <div className="map_embed w-embed w-script" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function HotelsSection() {
  return (
    <section className="section-4" aria-hidden="true">
      <div className="wrapper_base spec_cms">
        <div className="hotels_headline">
          <div className="flexbox bottom_al">
            <h1 className="h2 spec_p">Wo Komfort auf Abenteuer trifft</h1>
            <div className="desktop_base">
              <a href="/en/hotels" className="button_base black w-inline-block">
                <div>Hotels entdecken</div>
              </a>
            </div>
          </div>
        </div>
        <div className="hotels_grid">
          <div className="w-dyn-list">
            <div role="list" className="grid_hotels w-dyn-items">
              {hotels.map((h) => (
                <div role="listitem" className="hotels_cards w-dyn-item" key={h.name}>
                  <a href={h.href} target="_blank" rel="noreferrer" className="cont_dest_link w-inline-block">
                    <div className="featured_cards">
                      <div className="content_wrapper">
                        <div>
                          <div className="destination_name">{h.name}</div>
                        </div>
                        <div>
                          <div className="city_km">{h.price}</div>
                          <div className="hotel_rooms w-condition-invisible">
                            <div className="city_km w-dyn-bind-empty" />
                            <div className="city_km w-condition-invisible">Rooms</div>
                          </div>
                          <div className="city_km">{h.airport}</div>
                        </div>
                      </div>
                      <div className="overlay_continent" />
                      <div className="cover_continent">
                        <img src={h.image} loading="lazy" alt={h.name} className="image" />
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="hotels_cms">
        <div className="mobile_base">
          <a href="#" className="button_base black w-inline-block">
            <div>Explore Hotels</div>
          </a>
        </div>
      </div>
    </section>
  );
}
