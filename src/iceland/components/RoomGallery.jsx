import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Pic from '../blocks/Pic.jsx';

/** A room's photographs: one large image with arrows and a thumbnail row to switch between them. */
export default function RoomGallery({ images, alt, sizes = '(max-width: 767px) 100vw, 50vw', kicker = null, className = '' }) {
  const [i, setI] = useState(0);
  const n = images.length;
  const go = (d) => setI((v) => (v + d + n) % n);
  return (
    <div className={`ice-rg ${className}`.trim()}>
      <div className="ice-rg-main">
        {images.map((src, k) => (
          <Pic key={src} src={src} alt={k === 0 ? alt : ''} className={`ice-rg-img${k === i ? ' is-active' : ''}`} sizes={sizes} loading={k === 0 ? 'lazy' : 'lazy'} />
        ))}
        {kicker && <span className="ice-room-kicker">{kicker}</span>}
        {n > 1 && (
          <>
            <button type="button" className="ice-rg-arrow ice-rg-arrow--prev" onClick={() => go(-1)} aria-label="Previous photograph">
              <ChevronLeft size={18} strokeWidth={2} />
            </button>
            <button type="button" className="ice-rg-arrow ice-rg-arrow--next" onClick={() => go(1)} aria-label="Next photograph">
              <ChevronRight size={18} strokeWidth={2} />
            </button>
            <span className="ice-rg-count">
              {i + 1} / {n}
            </span>
          </>
        )}
      </div>
      {n > 1 && (
        <div className="ice-rg-thumbs" role="tablist" aria-label="Photographs">
          {images.map((src, k) => (
            <button type="button" key={src} className={`ice-rg-thumb${k === i ? ' is-active' : ''}`} onClick={() => setI(k)} role="tab" aria-selected={k === i} aria-label={`Photograph ${k + 1}`}>
              <Pic src={src} alt="" className="ice-rg-thumb-img" sizes="120px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
