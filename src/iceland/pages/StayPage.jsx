import React from 'react';
import useSplitLines from '../../hooks/useSplitLines.js';
import PageHero from '../blocks/PageHero.jsx';
import LSection from '../blocks/LSection.jsx';
import PhotoStrip from '../blocks/PhotoStrip.jsx';
import RoomUpgrades from '../components/RoomUpgrades.jsx';
import Btn from '../blocks/Btn.jsx';
import { stays } from '../data/retreat.js';
import { pageHeroes, pageImages } from '../data/pages.js';
import { scrollToHash } from '../router.jsx';

/** Stay & Experiences — lots of imagery, very little text: one full-bleed photograph per place. */
export default function StayPage() {
  useSplitLines(null);
  const h = pageHeroes.stay;

  return (
    <>
      <PageHero
        kicker={h.kicker}
        title={h.title}
        image={h.image}
        cta={
          <div className="ice-btn-row">
            <Btn onClick={() => scrollToHash(null, '#stays')}>Start with the hotel</Btn>
            <Btn dark onClick={() => scrollToHash(null, '#upgrades')}>
              Room upgrades
            </Btn>
          </div>
        }
      />

      <div id="stays">
        {stays.map((s, i) => (
          <LSection key={s.name} short tag={`${String(i + 1).padStart(2, '0')} / ${String(stays.length).padStart(2, '0')}`} title={s.name} text={s.caption} image={s.image} alt={s.alt} />
        ))}
      </div>

      <RoomUpgrades id="upgrades" />

      <PhotoStrip
        photos={[
          { image: pageImages.thingvellir, name: 'Thingvellir', caption: 'Golden Circle' },
          { image: pageImages.strokkur, name: 'Strokkur', caption: 'Geysir area' },
          { image: pageImages.fridheimar, name: 'Friðheimar', caption: 'Tomato farm lunch' },
          { image: pageImages.sunVoyager, name: 'Sun Voyager', caption: 'Reykjavík waterfront' },
        ]}
        columns={4}
      />

      <LSection
        title="Stay longer."
        text="Three curated extensions before or after the retreat: South Coast Iceland, Amsterdam or Copenhagen."
        cta={<Btn to="/extensions">See the extensions</Btn>}
        image={pageImages.glacierLagoon}
        alt="Iceberg on the Jökulsárlón glacier lagoon"
      />
    </>
  );
}
