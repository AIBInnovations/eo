import React from 'react';
import useSplitLines from '../../hooks/useSplitLines.js';
import PageHero from '../blocks/PageHero.jsx';
import LSection from '../blocks/LSection.jsx';
import PointsGrid from '../blocks/PointsGrid.jsx';
import StepsSplit from '../blocks/StepsSplit.jsx';
import Btn from '../blocks/Btn.jsx';
import { activities } from '../data/retreat.js';
import { pageHeroes, pageImages } from '../data/pages.js';
import { useEnquiry } from '../EnquiryContext.jsx';
import { scrollToHash } from '../router.jsx';

/** Choose Your Adventure — the four Day 4 breakouts in full, each with an enquiry button. */
export default function AdventurePage() {
  useSplitLines(null);
  const h = pageHeroes.adventure;
  const { openPanel } = useEnquiry();
  const letters = ['(a)', '(b)', '(c)', '(d)'];

  return (
    <>
      <PageHero kicker={h.kicker} title={h.title} image={h.image} cta={<Btn onClick={() => scrollToHash(null, '#options')}>See the four options</Btn>} />

      <PointsGrid id="options" items={activities.map((a) => ({ title: a.name, text: a.duration, extra: a.level }))} />

      {activities.map((a, i) => (
        <StepsSplit
          key={a.id}
          id={a.id}
          eyebrow={a.location}
          title={a.name}
          caption={a.text}
          steps={[
            { key: letters[0], title: 'Duration', text: a.duration },
            { key: letters[1], title: 'Activity level', text: a.level },
            { key: letters[2], title: 'What to wear', text: a.wear },
            { key: letters[3], title: 'Age restrictions', text: a.age },
          ]}
          cta={
            <Btn dark onClick={() => openPanel(`Day 4 breakout activity: ${a.name}`)}>
              Enquire about {a.name.split(' ')[0] === 'Snorkelling' ? 'Silfra' : a.name}
            </Btn>
          }
          image={a.image}
          alt={a.alt}
          reverse={i % 2 === 1}
        />
      ))}

      <LSection
        title="Rather explore Reykjavík?"
        text="Skip the breakout, wander the city's streets and boutiques, and rejoin everyone for lunch, the treasure hunt and the farewell dinner."
        cta={<Btn to="/journey#day-04">See Day 4 in the Journey</Btn>}
        image={pageImages.reykjavikStreet}
        alt="Laugavegur shopping street, Reykjavík"
      />
    </>
  );
}
