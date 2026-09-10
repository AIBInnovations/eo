import React from 'react';
import useSplitLines from '../../hooks/useSplitLines.js';
import PageHero from '../blocks/PageHero.jsx';
import LSection from '../blocks/LSection.jsx';
import PointsGrid from '../blocks/PointsGrid.jsx';
import Statement from '../blocks/Statement.jsx';
import Leaders from '../components/Leaders.jsx';
import PhotoStrip from '../blocks/PhotoStrip.jsx';
import Btn from '../blocks/Btn.jsx';
import { family, leadership } from '../data/retreat.js';
import { pageHeroes, pageImages } from '../data/pages.js';
import { useEnquiry } from '../EnquiryContext.jsx';

/** The EO Punjab Family — fun, not administrative: counts, photographs and who leads the trip. */
export default function FamilyPage() {
  useSplitLines(null);
  const h = pageHeroes.family;
  const { openPanel } = useEnquiry();

  return (
    <>
      <PageHero kicker={h.kicker} title={h.title} image={h.image} cta={<Btn onClick={() => openPanel('Joining the retreat')}>Join the trip</Btn>} />

      <PointsGrid
        columns={3}
        items={[
          { number: '49', title: 'EO Members', text: 'One chapter, travelling together.' },
          { number: '114', title: 'Travellers', text: 'Members, spouses and kids, moving as one.' },
          { number: '4', title: 'Nights', text: 'Reykjavík, the Golden Circle and Langjökull glacier.' },
        ]}
      />

      <PhotoStrip
        photos={[
          { image: pageImages.reykjavikCity, name: 'Reykjavík', caption: 'Home base' },
          { image: pageImages.horses, name: 'Icelandic horses', caption: 'Day 4 breakout' },
          { image: pageImages.auroraSky, name: 'Northern lights', caption: 'Aurora Basecamp' },
          { image: pageImages.skyLagoon, name: 'Sky Lagoon', caption: 'Day 3' },
        ]}
        columns={4}
      />

      <Leaders id="leaders" />

      <Statement
        title="One chapter. One trip."
        text="Members, spouses and kids, travelling as one chapter. Four nights designed so that 114 people move like a single family."
        icons={[
          { icon: 'Users', title: 'EO Members', desc: '49' },
          { icon: 'Heart', title: 'Spouses', desc: 'Travelling together' },
          { icon: 'Baby', title: 'Kids', desc: 'Family-friendly days' },
          { icon: 'Award', title: leadership.president.role, desc: leadership.president.name },
          { icon: 'Compass', title: leadership.chairs.role, desc: leadership.chairs.name },
          { icon: 'Camera', title: 'Photographs', desc: 'Shared after the retreat' },
        ]}
      />

      <LSection
        title="114 people. One Iceland adventure."
        text="Want to bring your family, or have a question about the trip? Ask the retreat desk."
        cta={<Btn onClick={() => openPanel('Joining the retreat')}>Enquire now</Btn>}
        image={pageImages.canyonPlateau}
        alt="Landmannalaugar highlands"
      />
    </>
  );
}
