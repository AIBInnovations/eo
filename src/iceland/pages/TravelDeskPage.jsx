import React from 'react';
import useSplitLines from '../../hooks/useSplitLines.js';
import PageHero from '../blocks/PageHero.jsx';
import LSection from '../blocks/LSection.jsx';
import PointsGrid from '../blocks/PointsGrid.jsx';
import StepsSplit from '../blocks/StepsSplit.jsx';
import PhotoStrip from '../blocks/PhotoStrip.jsx';
import PartnerCards from '../components/PartnerCards.jsx';
import ContactTable from '../components/ContactTable.jsx';
import Btn from '../blocks/Btn.jsx';
import { keyTimes, travelDesk } from '../data/retreat.js';
import { pageHeroes, pageImages } from '../data/pages.js';
import { useEnquiry } from '../EnquiryContext.jsx';
import { scrollToHash } from '../router.jsx';

const LETTERS = 'abcdefghijklmnop'.split('').map((l) => `(${l})`);

/** Travel Desk — key times, the partner desks, who to contact, the nine topics, rooms and upgrades. */
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

      <ContactTable id="who-to-contact" />

      <LSection
        short
        tag="Iceland Essentials"
        title="What to pack, and what to wear each day."
        text="Thirteen things every traveller should carry, and a day-by-day wardrobe planner from the glacier to the dressiest night at Harpa."
        cta={<Btn to="/essentials">Open Iceland Essentials</Btn>}
        image={pageImages.langjokull}
        alt="Langjökull glacier"
      />

      <PhotoStrip
        photos={[
          { image: pageImages.langjokull, name: 'Glacier day', caption: 'Warm + waterproof + windproof' },
          { image: pageImages.skyLagoon, name: 'Sky Lagoon', caption: 'Pack swimwear' },
          { image: pageImages.harpa, name: 'Harpa', caption: 'The dressiest night' },
        ]}
      />

      <LSection
        short
        tag="Rooms"
        title="Move up a room, or add a night."
        text="Suites, loft rooms and terrace kings at The Reykjavik EDITION, with every room type the hotel has."
        cta={<Btn to="/stay#upgrades">Rooms &amp; upgrades</Btn>}
        image={pageImages.reykjavikHarbour}
        alt="Reykjavík harbourfront"
      />

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
