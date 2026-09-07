import React from 'react';
import useSplitLines from '../../hooks/useSplitLines.js';
import PageHero from '../blocks/PageHero.jsx';
import LSection from '../blocks/LSection.jsx';
import PointsGrid from '../blocks/PointsGrid.jsx';
import StepsSplit from '../blocks/StepsSplit.jsx';
import Statement from '../blocks/Statement.jsx';
import PhotoStrip from '../blocks/PhotoStrip.jsx';
import Btn from '../blocks/Btn.jsx';
import { keyTimes, flightDesk, travelDesk, essentials, wardrobe, addOns, extensions } from '../data/retreat.js';
import { pageHeroes, pageImages, essentialIcons } from '../data/pages.js';
import { useEnquiry } from '../EnquiryContext.jsx';

const LETTERS = 'abcdefghijklmnop'.split('').map((l) => `(${l})`);

/** Travel Desk — key times, the nine topics, Iceland Essentials + wardrobe planner, add-ons and the extensions. */
export default function TravelDeskPage() {
  useSplitLines(null);
  const h = pageHeroes.travelDesk;
  const { openPanel } = useEnquiry();

  return (
    <>
      <PageHero kicker={h.kicker} title={h.title} image={h.image} cta={<Btn href={flightDesk.tel}>Call the flight desk · {flightDesk.phone}</Btn>} />

      <PointsGrid
        items={[
          ...keyTimes.map((k) => ({ title: k.value, text: k.label })),
          {
            title: `${flightDesk.agency} · ${flightDesk.contact}`,
            text: 'Flight assistance for every traveller.',
            extra: (
              <a href={flightDesk.tel} className="ice-link-btn">
                {flightDesk.phone}
              </a>
            ),
          },
        ]}
      />

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

      <section className="ice-wardrobe" id="wardrobe">
        <div className="wrapper_base">
          <div className="r_side_bg">
            <div className="inside_rg">
              <h2 className="h2">What to wear, day by day.</h2>
              <div className="desc_ch">
                <p className="b_txt spec_partner">{essentials.notes[0]}</p>
              </div>
            </div>
          </div>
          <div className="ice-table-wrap">
            <table className="ice-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Plan</th>
                  <th>Suggested look</th>
                </tr>
              </thead>
              <tbody>
                {wardrobe.map((row) => (
                  <tr key={row.date}>
                    <td data-label="Date">{row.date}</td>
                    <td data-label="Plan">{row.plan}</td>
                    <td data-label="Suggested look">{row.look}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <PhotoStrip
        photos={[
          { image: pageImages.langjokull, name: 'Glacier day', caption: 'Warm + waterproof + windproof' },
          { image: pageImages.skyLagoon, name: 'Sky Lagoon', caption: 'Pack swimwear' },
          { image: pageImages.harpa, name: 'Harpa', caption: 'The dressiest night' },
        ]}
      />

      <PointsGrid
        id="add-ons"
        items={addOns.map((a) => ({
          title: a.name,
          text: a.text,
          extra: (
            <button type="button" className="ice-link-btn" onClick={() => openPanel(`Room upgrade or extra night: ${a.name}`)}>
              Enquire →
            </button>
          ),
        }))}
      />

      <div id="extensions">
        {extensions.map((x, i) => (
          <StepsSplit
            key={x.name}
            eyebrow={`Extension · ${x.length}`}
            title={x.name}
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
      </div>

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
