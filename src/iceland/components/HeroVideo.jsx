import React, { useRef } from 'react';
import useDoorComposite from '../hooks/useDoorComposite.js';
import Countdown from './Countdown.jsx';
import { hero, heroFrames, doorFrames } from '../data/retreat.js';
import { scrollToHash } from '../router.jsx';

/**
 * Same architecture as the reference hero: three full-viewport story panels (100vh / 200vh / 100vh)
 * scroll over a sticky 100vh canvas. The canvas first scrubs the reference site's door animation
 * (the door opens, the camera walks in) and then, once inside, the Iceland FPV footage (60 fps
 * frames). Both only "play" with the scroll.
 */
export default function HeroVideo() {
  const storyRef = useRef(null);
  const canvasHostRef = useRef(null);
  useDoorComposite(canvasHostRef, storyRef, { doorFrames, videoFrames: heroFrames, start: 'top top', end: 'bottom top', doorEnd: 0.42, fade: 0.06, doorLastFrame: 230, poster: hero.poster });

  return (
    <section className="threed_story ice-hero" id="top" ref={storyRef}>
      <div className="div-block-7">
        <section className="hero_b">
          <div className="wrapper_hero">
            <div className="txt_side">
              <div className="box_in _01 ice-box">
                <div className="ice-eyebrow ice-eyebrow--light color-inversion-target">
                  {hero.eyebrow} · {hero.dates}
                </div>
                <div className="headline box_01 ice-headline">
                  <h1 className="h1_interaction color-inversion-target">{hero.title}</h1>
                </div>
                <p className="ice-hero-sub color-inversion-target">{hero.subtitle}</p>
                <div className="ice-stats color-inversion-target">
                  {hero.stats.map((s, i) => (
                    <React.Fragment key={s}>
                      {i > 0 && <span className="ice-dot">•</span>}
                      <span>{s}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className="bottom_side ice-hero-bottom">
                <Countdown target={hero.startsAt} />
                <a href="#journey" className="button_base invert color-inversion-target w-inline-block" onClick={(e) => scrollToHash(e, '#journey')}>
                  <div>Explore the Journey</div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {hero.panels.map((panel) => (
          <section className={`hero_b ${panel.key}`} key={panel.key}>
            <div className="wrapper_hero">
              <div className="txt_side">
                <div className={`box_in ${panel.key} ice-box`}>
                  <div className="headline box_01 ice-headline">
                    <h2 className="h1_interaction second_part color-inversion-target">{panel.title}</h2>
                  </div>
                  <div className="description ice-description">
                    <p className="b_txt white color-inversion-target">{panel.text}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        <div className="recent_destination ice-hero-card">
          <div className="div-block">
            <div className="flexbox_destination">
              <div className="destination_cover">
                <img src={hero.card.image} alt={hero.card.alt} className="image color-inversion-target" />
              </div>
              <a href={hero.card.href} target="_blank" rel="noreferrer" className="destination_box w-inline-block">
                <div className="wrapper_destination color-inversion-target">
                  <div className="title_link">
                    <div className="info_small">{hero.card.label}</div>
                    <div className="title_txt">{hero.card.title}</div>
                    <div>
                      <div className="explore_link">{hero.card.cta}</div>
                    </div>
                  </div>
                  <div className="flex_info">
                    {hero.card.meta.map((m) => (
                      <div className="info_small" key={m}>
                        {m}
                      </div>
                    ))}
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="background_interaction">
        <div className="overlay_mobile" />
        <div className="ice-hero-shade" />
        <div className="interaction_door ice-frames" ref={canvasHostRef} />
      </div>
    </section>
  );
}
