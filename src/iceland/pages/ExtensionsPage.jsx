import React from 'react';
import useSplitLines from '../../hooks/useSplitLines.js';
import PageHero from '../blocks/PageHero.jsx';
import PointsGrid from '../blocks/PointsGrid.jsx';
import StepsSplit from '../blocks/StepsSplit.jsx';
import LSection from '../blocks/LSection.jsx';
import Btn from '../blocks/Btn.jsx';
import { extensions } from '../data/retreat.js';
import { pageHeroes, pageImages } from '../data/pages.js';
import { useEnquiry } from '../EnquiryContext.jsx';
import { scrollToHash } from '../router.jsx';

/** Extensions — three curated add-on trips before or after the retreat, each on its own. */
export default function ExtensionsPage() {
  useSplitLines(null);
  const h = pageHeroes.extensions;
  const { openPanel } = useEnquiry();

  return (
    <>
      <PageHero kicker={h.kicker} title={h.title} image={h.image} cta={<Btn onClick={() => scrollToHash(null, '#south-coast')}>See the three extensions</Btn>} />

      <PointsGrid
        columns={3}
        items={extensions.map((x) => ({
          title: x.name,
          text: x.length,
          extra: (
            <a href={`#${x.id}`} className="ice-link-btn" onClick={(e) => scrollToHash(e, `#${x.id}`)}>
              Details →
            </a>
          ),
        }))}
      />

      {extensions.map((x, i) => (
        <StepsSplit
          key={x.id}
          id={x.id}
          eyebrow={`Extension ${String(i + 1).padStart(2, '0')} · ${x.length}`}
          title={x.name}
          caption={x.caption}
          steps={x.highlights.map((hl, j) => ({ key: String(j + 1).padStart(2, '0'), title: '', text: hl }))}
          cta={
            <div className="ice-btn-row">
              <Btn href={x.href} dark>
                Download itinerary (PDF)
              </Btn>
              <Btn onClick={() => openPanel(`Trip extension: ${x.name}`)}>Enquire</Btn>
            </div>
          }
          image={x.image}
          alt={x.alt}
          reverse={i % 2 === 1}
        />
      ))}

      <LSection
        title="Extensions are booked separately."
        text="Each one is priced and confirmed on its own, before or after the retreat dates. Tell the retreat desk which one and for how many, and they will come back with the plan."
        cta={<Btn onClick={() => openPanel('Trip extension')}>Enquire about an extension</Btn>}
        image={pageImages.skogafoss}
        alt="Skógafoss waterfall"
      />
    </>
  );
}
