import React from 'react';
import useSplitLines from '../../hooks/useSplitLines.js';
import PageHero from '../blocks/PageHero.jsx';
import LineList from '../blocks/LineList.jsx';
import PointsGrid from '../blocks/PointsGrid.jsx';
import StepsSplit from '../blocks/StepsSplit.jsx';
import Faq from '../blocks/Faq.jsx';
import PhotoStrip from '../blocks/PhotoStrip.jsx';
import LSection from '../blocks/LSection.jsx';
import Btn from '../blocks/Btn.jsx';
import { announcements, deadlines, downloads, faqs, contacts, leadership } from '../data/retreat.js';
import { pageHeroes, pageImages, ITINERARY_PDF } from '../data/pages.js';
import { useEnquiry } from '../EnquiryContext.jsx';

/** Updates & Help — announcements, deadlines, downloads, the full FAQ and contacts. */
export default function UpdatesPage() {
  useSplitLines(null);
  const h = pageHeroes.updates;
  const { openPanel } = useEnquiry();

  return (
    <>
      <PageHero kicker={h.kicker} title={h.title} image={h.image} cta={<Btn href={ITINERARY_PDF}>Download final itinerary</Btn>} />

      <LineList id="announcements" title="Latest announcements" text="What changed, what is next and what to remember." items={announcements.map((a) => ({ name: a.date, sub: 'Announcement', body: a.title, detail: a.text }))} />

      <PhotoStrip
        photos={[
          { image: pageImages.auroraSky, name: 'Aurora Basecamp', caption: 'Night one' },
          { image: pageImages.gullfoss, name: 'Gullfoss', caption: 'Day two' },
          { image: pageImages.harpa, name: 'Harpa', caption: 'Day three' },
        ]}
      />

      <PointsGrid id="deadlines" items={deadlines.map((d) => ({ title: d.label, text: d.when }))} />

      <StepsSplit
        id="downloads"
        eyebrow="Downloads"
        title="Documents."
        steps={downloads.map((d) => ({
          key: 'PDF',
          title: '',
          text: (
            <a href={d.href} target="_blank" rel="noreferrer" className="ice-doc-link">
              {d.label} ↓
            </a>
          ),
        }))}
        cta={<Btn href={ITINERARY_PDF} dark>Download final itinerary</Btn>}
        image={pageImages.posterCover}
        alt="Iceland Unexpected – EO Punjab Retreat poster"
      />

      <Faq id="faq" items={faqs} />

      <LineList
        id="contacts"
        title="Who to call"
        text="The retreat team, the travel agent and emergency assistance."
        items={[
          ...contacts.map((c) => ({
            name: c.role,
            sub: c.name,
            body: c.href ? (
              <a href={c.href} className="ice-line-link">
                {c.value}
              </a>
            ) : (
              c.value
            ),
          })),
          { name: leadership.president.role, sub: 'EO Punjab', body: leadership.president.name },
          { name: leadership.chairs.role, sub: 'EO Punjab', body: leadership.chairs.name },
        ]}
      />

      <LSection
        title="Still have a question?"
        text="Ask the retreat desk. One form, one reply."
        cta={<Btn onClick={() => openPanel('')}>Enquire now</Btn>}
        image={pageImages.strokkur}
        alt="Strokkur erupting"
      />
    </>
  );
}
