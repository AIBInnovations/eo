import React, { useRef } from 'react';
import useLazyVideo from '../../hooks/useLazyVideo.js';
import Pic from './Pic.jsx';

/**
 * Internal-page hero (partnership page): two underlined kicker headings sit in the vertical middle,
 * the H1 + button sit at the bottom, over a background video or photograph with the dark overlay.
 * Carries `.ice-page-hero` so the header stays un-inverted while it is in view.
 */
export default function PageHero({ kicker = [], title, cta = null, image, video, alt = '' }) {
  const videoRef = useRef(null);
  useLazyVideo(videoRef, video || '');

  return (
    <section className="hero_b ice-page-hero">
      <div className="wrapper_hero partnerships">
        <div className="middle_headline">
          <div className="flex_middle spec_partners">
            <div className="left_hd">
              <div className="hd white">{kicker[0]}</div>
            </div>
            <div className="right_hd">
              <div className="hd white">{kicker[1]}</div>
            </div>
          </div>
        </div>
        <div className="partner_heading">
          <h1 className="h1_partnerships white">{title}</h1>
          {cta}
        </div>
      </div>
      <div className="background_video">
        {video ? (
          <div className="video w-embed">
            <video ref={videoRef} className="lazy ice-hero-video" autoPlay muted loop playsInline poster={image} disablePictureInPicture />
          </div>
        ) : (
          <div className="fullsize_image partnerships_b">
            <Pic src={image} alt={alt} className="image" sizes="100vw" loading="eager" fetchpriority="high" />
          </div>
        )}
        <div className="overlay" />
      </div>
    </section>
  );
}
