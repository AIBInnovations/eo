import React from 'react';
import useSplitLines from '../../hooks/useSplitLines.js';
import PageHero from '../blocks/PageHero.jsx';
import LSection from '../blocks/LSection.jsx';
import Btn from '../blocks/Btn.jsx';
import Garment from '../components/Garments.jsx';
import WardrobeCards from '../components/WardrobeCards.jsx';
import { essentials } from '../data/retreat.js';
import { pageHeroes, pageImages, essentialGarments } from '../data/pages.js';
import { scrollToHash } from '../router.jsx';

const GROUPS = ['Layers', 'Outer shell', 'Feet', 'Extremities', 'Extras'];

/** Iceland Essentials — the packing list drawn out, then what to wear day by day. */
export default function EssentialsPage() {
  useSplitLines(null);
  const h = pageHeroes.essentials;

  return (
    <>
      <PageHero kicker={h.kicker} title={h.title} image={h.image} cta={<Btn onClick={() => scrollToHash(null, '#pack')}>See the packing list</Btn>} />

      <section className="ice-garments" id="pack">
        <div className="wrapper_base">
          <div className="r_side_bg">
            <div className="inside_rg">
              <div className="ice-eyebrow">The packing list</div>
              <h2 className="h2">Warm + waterproof + windproof.</h2>
              <div className="desc_ch">
                <p className="b_txt spec_partner">Thirteen things every traveller should carry. Early April in Reykjavík runs between −1 °C and 5 °C, and the wind does the rest, so pack for the coldest moment of the day and change for dinner.</p>
              </div>
            </div>
          </div>

          {GROUPS.map((group) => {
            const items = essentialGarments.filter((g) => g.group === group);
            if (!items.length) return null;
            return (
              <div className="ice-gm-group" key={group}>
                <div className="ice-gm-grouphead">
                  <span className="ice-gm-groupname">{group}</span>
                  <span className="ice-gm-groupline" />
                  <span className="ice-gm-groupcount">{String(items.length).padStart(2, '0')}</span>
                </div>
                <ul className="ice-gm-grid">
                  {items.map((g) => (
                    <li className="ice-gm-card" key={g.name}>
                      <div className="ice-gm-art">
                        <Garment name={g.art} />
                      </div>
                      <div className="ice-gm-txt">
                        <span className="ice-gm-name">{g.name}</span>
                        <span className="ice-gm-note">{g.note}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          <div className="ice-gm-notes">
            {essentials.notes.map((n) => (
              <p className="ice-p" key={n.slice(0, 30)}>
                {n}
              </p>
            ))}
          </div>
        </div>
      </section>

      <WardrobeCards id="wardrobe" />

      <LSection
        short
        tag="Travel Desk"
        title="Flights, visas, insurance and transfers."
        text="Everything else members ask before they fly lives on the Travel Desk."
        cta={<Btn to="/travel-desk">Open the Travel Desk</Btn>}
        image={pageImages.keflavik}
        alt="Icelandair aircraft at Keflavík"
      />
    </>
  );
}
