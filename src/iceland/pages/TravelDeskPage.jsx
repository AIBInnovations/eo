import React from 'react';
import useSplitLines from '../../hooks/useSplitLines.js';
import PageHero from '../blocks/PageHero.jsx';
import LSection from '../blocks/LSection.jsx';
import PointsGrid from '../blocks/PointsGrid.jsx';
import StepsSplit from '../blocks/StepsSplit.jsx';
import Statement from '../blocks/Statement.jsx';
import PhotoStrip from '../blocks/PhotoStrip.jsx';
import PartnerCards from '../components/PartnerCards.jsx';
import WardrobeCards from '../components/WardrobeCards.jsx';
import RoomUpgrades from '../components/RoomUpgrades.jsx';
import Btn from '../blocks/Btn.jsx';
import { keyTimes, travelDesk, essentials } from '../data/retreat.js';
import { pageHeroes, pageImages, essentialIcons } from '../data/pages.js';
import { useEnquiry } from '../EnquiryContext.jsx';
import { scrollToHash } from '../router.jsx';

const LETTERS = 'abcdefghijklmnop'.split('').map((l) => `(${l})`);

/** Travel Desk — key times, the nine topics, Iceland Essentials + wardrobe planner, add-ons and the extensions. */
export default function TravelDeskPage() {
  useSplitLines(null);
  const h = pageHeroes.travelDesk;
  const { openPanel } = useEnquiry();

  return (
    <>
      <PageHero kicker={h.kicker} title={h.title} image={h.image} cta={<Btn onClick={() => scrollToHash(null, '#contacts')}>Who to call</Btn>} />

      <PointsGrid columns={3} items={keyTimes.map((k) => ({ title: k.value, text: k.label }))} />

      <PartnerCards id="contacts" />

      <StepsSplit
        id="topics"
        eyebrow="Travel desk"
        title="Before you fly."
        steps={travelDesk.map((t, i) => ({ key: LETTERS[i], title: t.title, text: t.text }))}
        cta={<Btn dark onClick={() => openPanel('Flights and transfers')}>Enquire about flights & transfers</Btn>}
        image={pageImages.keflavik}
        alt="Icelandair aircraft at Keflavík"
      />

      <Statement id="essentials" title={essentials.title} text="Warm + waterproof + windproof. Every traveller should ideally carry these thirteen things." icons={essentialIcons} />

      <WardrobeCards id="wardrobe" />

      <PhotoStrip
        photos={[
          { image: pageImages.langjokull, name: 'Glacier day', caption: 'Warm + waterproof + windproof' },
          { image: pageImages.skyLagoon, name: 'Sky Lagoon', caption: 'Pack swimwear' },
          { image: pageImages.harpa, name: 'Harpa', caption: 'The dressiest night' },
        ]}
      />

      <RoomUpgrades id="add-ons" />

      <LSection
        short
        tag="Extensions"
        title="Stay longer, somewhere else."
        text="South Coast Iceland, Amsterdam or Copenhagen: three curated extensions, each booked separately before or after the retreat."
        cta={<Btn to="/extensions">See the extensions</Btn>}
        image={pageImages.glacierLagoon}
        alt="Iceberg on the Jökulsárlón glacier lagoon"
      />

      <LSection
        title="Anything else? Ask the retreat desk."
        text="Flights, transfers, rooms, documents. One form, one reply."
        cta={<Btn onClick={() => openPanel('')}>Enquire now</Btn>}
        image={pageImages.skogafoss}
        alt="Skógafoss waterfall"
      />
    </>
  );
}
