import React, { useRef } from 'react';
import useDoorComposite from '../hooks/useDoorComposite.js';
import Countdown from './Countdown.jsx';
import { hero, heroFrames, doorFrames, heroFramesSm, doorFramesSm } from '../data/retreat.js';
import { LOW_POWER } from '../perf.js';

/** Nudge the page down by a little over half a screen (enough to start the door opening). */
const nudgeDown = () => {
  const target = scrollTop() + window.innerHeight * 0.6;
  const lenis = window.__lenis;
  const scroller = getScroller();
  if (lenis && lenis.scrollTo && !scroller) lenis.scrollTo(target);
  else (scroller || window).scrollTo({ top: target, behavior: 'smooth' });
};
import { ArrowDown } from 'lucide-react';
import { getScroller, scrollTop } from '../perf.js';

/**
 * Same architecture as the reference hero: three full-viewport story panels (100vh / 200vh / 100vh)
 * scroll over a sticky 100vh canvas. The canvas first scrubs the reference site's door animation
 * (the door opens, the camera walks in) and then, once inside, the Iceland FPV footage (60 fps
 * frames). Both only "play" with the scroll.
 */
export default function HeroVideo() {
  const storyRef = useRef(null);
  const canvasHostRef = useRef(null);
  useDoorComposite(canvasHostRef, storyRef, {
    doorFrames: LOW_POWER ? doorFramesSm : doorFrames,
    videoFrames: LOW_POWER ? heroFramesSm : heroFrames,
    start: 'top top',
    end: 'bottom top',
    doorEnd: 0.42,
    fade: 0.06,
    doorLastFrame: 230,
    poster: hero.poster,
    dprCap: LOW_POWER ? 1 : 2,
    smoothing: LOW_POWER ? 0.22 : 0.16,
  });

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
                <button type="button" className="ice-scroll-cue color-inversion-target" onClick={nudgeDown} aria-label="Scroll down to explore">
                  <span className="ice-scroll-cue-txt">Explore</span>
                  <ArrowDown className="ice-scroll-cue-arrow" size={18} strokeWidth={1.8} aria-hidden="true" />
                </button>
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
                <img src={hero.card.image} alt={hero.card.alt} className="image color-inversion-target" width="200" height="300" decoding="async" />
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
