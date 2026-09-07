import React from 'react';

/**
 * A row of photographs in the reference site's `featured_cards` style (cover image, dark gradient,
 * name + caption), used to bring imagery into otherwise text-only sections.
 */
export default function PhotoStrip({ photos, columns = 3, tight = false, id, className = '' }) {
  return (
    <section className={`ice-strip ice-strip--${columns}${tight ? ' ice-strip--tight' : ''} ${className}`.trim()} id={id}>
      <div className="ice-strip-grid">
        {photos.map((p, i) => (
          <figure className="featured_cards ice-strip-card" key={(p.name || '') + i}>
            <div className="content_wrapper">
              <div>
                {p.name && <div className="destination_name">{p.name}</div>}
                {p.caption && <div className="city_km">{p.caption}</div>}
              </div>
            </div>
            <div className="overlay_continent" />
            <div className="cover_continent">
              <img src={p.image} alt={p.alt || p.name || ''} loading="lazy" className="image" />
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
