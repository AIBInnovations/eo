import React from 'react';
import { Check } from 'lucide-react';
import Btn from '../blocks/Btn.jsx';
import { pageImages } from '../data/pages.js';

/** Confirmation after the enquiry form is sent. */
export default function ThankYouPage() {
  return (
    <section className="ice-404 ice-thanks">
      <img src={pageImages.auroraSky} alt="" className="ice-404-bg" aria-hidden="true" />
      <div className="ice-404-shade" />
      <div className="ice-404-inner">
        <div className="ice-thanks-check">
          <Check size={26} strokeWidth={2.2} />
        </div>
        <h1 className="h1_partnerships white">Thank you. The retreat desk has it.</h1>
        <p className="ice-p ice-404-txt">You will hear back on WhatsApp or e-mail within a working day. Until then, the plan is all here.</p>
        <div className="ice-btn-row">
          <Btn to="/journey">The Journey</Btn>
          <Btn to="/" dark>
            Back home
          </Btn>
        </div>
      </div>
    </section>
  );
}
