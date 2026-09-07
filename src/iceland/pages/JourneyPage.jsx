import React from 'react';
import useSplitLines from '../../hooks/useSplitLines.js';
import PageHero from '../blocks/PageHero.jsx';
import LSection from '../blocks/LSection.jsx';
import StepsSplit from '../blocks/StepsSplit.jsx';
import PhotoStrip from '../blocks/PhotoStrip.jsx';
import Btn from '../blocks/Btn.jsx';
import { days } from '../data/retreat.js';
import { pageHeroes, pageImages, ITINERARY_PDF } from '../data/pages.js';

/** The Journey — every day in full: photograph, timings, what to expect and a photo strip. */
export default function JourneyPage() {
  useSplitLines(null);
  const h = pageHeroes.journey;

  return (
    <>
      <PageHero kicker={h.kicker} title={h.title} image={h.image} video={h.video} cta={<Btn href={ITINERARY_PDF}>Download itinerary</Btn>} />

      {days.map((d, i) => (
        <React.Fragment key={d.number}>
          <StepsSplit
            id={`day-${d.number}`}
            eyebrow={`Day ${d.number} · ${d.date}`}
            title={d.title}
            caption={d.subtitle}
            steps={d.timeline.map((t, j) => ({ key: String(j + 1).padStart(2, '0'), title: t.time, text: t.label }))}
            ctaText={d.tagline}
            cta={
              <div className="ice-expect-row" aria-label="What to expect">
                <span className="ice-expect-label">What to expect</span>
                {d.expect.map((x) => (
                  <span className="ice-expect-chip" key={x}>
                    {x}
                  </span>
                ))}
              </div>
            }
            image={d.image}
            alt={d.alt}
            reverse={i % 2 === 1}
          />
          {d.gallery && <PhotoStrip photos={d.gallery} columns={d.gallery.length} />}
        </React.Fragment>
      ))}

      <LSection
        title="Day 4 is yours to choose."
        text="Silfra, the Lava Tunnel, Icelandic horses or an ATV across the lava fields. Pick one for the morning, then regroup for lunch and the Reykjavík treasure hunt."
        cta={<Btn to="/adventure">Choose your adventure</Btn>}
        image={pageImages.iceCave}
        alt="Inside a blue ice cave in Iceland"
      />
    </>
  );
}
