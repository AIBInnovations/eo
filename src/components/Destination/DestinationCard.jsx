import React from 'react';

/**
 * Destination card: image → dark overlay → absolutely positioned content.
 * `cardClass` is `featured_cards` (carousel / hotels) or `continent_card` (legacy grid).
 */
export default function DestinationCard({ item, cardClass = 'featured_cards', slider = false, inversionTarget = true, lazy = true }) {
  return (
    <a href={item.href} target="_blank" rel="noreferrer" className={`cont_dest_link${slider ? ' special_slider' : ''} w-inline-block`}>
      <div className={`${cardClass}${inversionTarget ? ' color-inversion-target' : ''}`}>
        <div className="content_wrapper">
          <div>
            <div className="destination_name">{item.name}</div>
          </div>
          <div className="destination_price">
            <div className="city_km">{item.location}</div>
            <div className="city_km">{item.price}</div>
          </div>
        </div>
        <div className="overlay_continent" />
        <div className="cover_continent">
          <img src={item.image} alt={item.name} className="image" loading={lazy ? 'lazy' : undefined} />
        </div>
      </div>
    </a>
  );
}
