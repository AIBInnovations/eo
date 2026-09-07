import React from 'react';
import useSplitLines from '../../hooks/useSplitLines.js';
import PageHero from '../blocks/PageHero.jsx';
import StepsSplit from '../blocks/StepsSplit.jsx';
import PhotoStrip from '../blocks/PhotoStrip.jsx';
import LineList from '../blocks/LineList.jsx';
import Btn from '../blocks/Btn.jsx';
import EnquiryForm from '../components/EnquiryForm.jsx';
import { contacts } from '../data/retreat.js';
import { pageHeroes, pageImages } from '../data/pages.js';
import { scrollToHash } from '../router.jsx';

/** Enquire — the enquiry form, what it covers, and who answers. */
export default function EnquiryPage() {
  useSplitLines(null);
  const h = pageHeroes.enquire;

  return (
    <>
      <PageHero kicker={h.kicker} title={h.title} image={h.image} cta={<Btn onClick={() => scrollToHash(null, '#form')}>Go to the form</Btn>} />

      <StepsSplit
        id="form"
        eyebrow="How it works"
        title="One form, one reply."
        caption="Every enquiry lands with the retreat desk, which answers on WhatsApp or e-mail within a working day."
        steps={[
          { key: '(a)', title: 'Tell us who you are', text: 'Name, mobile number and e-mail so the desk can reach you.' },
          { key: '(b)', title: 'Pick a topic', text: 'Joining the retreat, a Day 4 breakout, a room upgrade or extra night, an extension, flights and transfers, or anything else.' },
          { key: '(c)', title: 'Send it', text: 'The desk confirms back to you, books what is needed and keeps your details on file.' },
        ]}
      >
        <div className="ice-panel-card">
          <EnquiryForm />
        </div>
      </StepsSplit>

      <PhotoStrip
        photos={[
          { image: pageImages.keflavik, name: 'Flights', caption: 'Keflavík (KEF)' },
          { image: pageImages.reykjavikHarbour, name: 'Rooms', caption: 'The Reykjavik EDITION' },
          { image: pageImages.silfra, name: 'Breakouts', caption: 'Day 4' },
        ]}
      />

      <LineList
        title="Who answers"
        text="The retreat team, the travel agent and emergency assistance."
        items={contacts.map((c) => ({
          name: c.role,
          sub: c.name,
          body: c.href ? (
            <a href={c.href} className="ice-line-link">
              {c.value}
            </a>
          ) : (
            c.value
          ),
        }))}
      />
    </>
  );
}
