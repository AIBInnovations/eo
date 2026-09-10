import React from 'react';
import useSplitLines from '../../hooks/useSplitLines.js';
import HeroVideo from '../components/HeroVideo.jsx';
import Stay from '../components/Stay.jsx';
import SectionHead from '../blocks/SectionHead.jsx';
import StepsSplit from '../blocks/StepsSplit.jsx';
import PointsGrid from '../blocks/PointsGrid.jsx';
import LSection from '../blocks/LSection.jsx';
import LineList from '../blocks/LineList.jsx';
import Btn from '../blocks/Btn.jsx';
import { days, activities, keyTimes, flightDesk, family, announcements } from '../data/retreat.js';
import { pageImages } from '../data/pages.js';

/**
 * Home: the scrubbed door → Iceland hero, then one short, design-led teaser per section of the brief.
 * Every teaser links to its own page, where the detail lives.
 */
export default function HomePage() {
  useSplitLines(null);

  return (
    <>
      <HeroVideo />

      {/* 1 · The Journey */}
      <section className="ice-section ice-teaser" id="journey">
        <div className="wrapper_base spec_cms">
          <SectionHead text="Five days, one chapter, and a plan that moves 114 people like a single family." title="The Journey" caption="Day by day · 31 March – 4 April" />
        </div>
        <StepsSplit
          teaser
          eyebrow="Day by day"
          caption="Reykjavík · the Golden Circle · Langjökull glacier"
          steps={days.map((d) => ({ key: `(${d.number})`, title: `${d.date} · ${d.title}`, text: d.tagline }))}
          cta={
            <Btn to="/journey" dark>
              See the full itinerary
            </Btn>
          }
          image={pageImages.auroraSky}
          alt="Northern lights over Kirkjufell"
        />
      </section>

      {/* 2 · Choose Your Adventure */}
      <section className="ice-section ice-teaser" id="adventure">
        <div className="wrapper_base spec_cms">
          <SectionHead text="Day 4, 3 April. Pick one breakout for the morning, or simply explore Reykjavík and rejoin everyone for lunch." title="Choose Your Adventure" caption="Day 4 breakouts" />
        </div>
        <PointsGrid items={activities.map((a) => ({ title: a.name, text: a.duration, extra: a.level }))} />
        <div className="ice-teaser-cta">
          <Btn to="/adventure" dark>
            See the four options
          </Btn>
        </div>
      </section>

      {/* 3 · Stay & Experiences */}
      <Stay teaser />

      {/* 4 · Travel Desk */}
      <section className="ice-section ice-teaser" id="travel-desk">
        <div className="wrapper_base spec_cms">
          <SectionHead text="The answers to everything members ask, in one place." title="Travel Desk" caption="Plan · Pack · Arrive" />
        </div>
        <PointsGrid columns={3} items={keyTimes.map((k) => ({ title: k.value, text: k.label }))} />
        <div className="ice-teaser-cta">
          <div className="ice-btn-row">
            <Btn to="/travel-desk" dark>
              Open the Travel Desk
            </Btn>
            <Btn href={flightDesk.tel}>
              {flightDesk.agency} · {flightDesk.phone}
            </Btn>
          </div>
        </div>
      </section>

      {/* 5 · The EO Punjab Family */}
      <section className="ice-section ice-teaser" id="family">
        <LSection
          short
          tag="The EO Punjab Family"
          title={family.headline}
          text={`${family.counts.map((c) => `${c.value} ${c.label}`).join(' • ')}. Members, spouses and kids, travelling as one chapter.`}
          image={pageImages.kirkjufell}
          alt="Kirkjufell mountain and waterfall"
        />
        <div className="ice-teaser-cta">
          <Btn to="/family" dark>
            Meet the family
          </Btn>
        </div>
      </section>

      {/* 6 · Updates & Help */}
      <section className="ice-section ice-teaser" id="updates">
        <LineList
          title="Updates & Help"
          text="Latest announcements, the deadlines that matter and the people to call."
          items={announcements.slice(0, 2).map((a) => ({ name: a.date, sub: 'Announcement', body: a.title, detail: a.text }))}
          cta={
            <Btn to="/updates" dark>
              All updates, FAQs & contacts
            </Btn>
          }
        />
      </section>

    </>
  );
}
