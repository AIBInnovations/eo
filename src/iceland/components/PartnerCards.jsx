import React from 'react';
import { Phone } from 'lucide-react';
import { partners } from '../data/retreat.js';
import emtLogo from '../../assets/logos/easemytrip.png';

/** The two desks members deal with: the retreat planner and the flight agent. */
export default function PartnerCards({ id }) {
  return (
    <section className="ice-partners" id={id}>
      <div className="wrapper_base">
        <div className="ice-eyebrow">Who to call</div>
        <h2 className="h2 ice-partners-title">Your two desks.</h2>
        <div className="ice-partner-grid">
          {partners.map((p) => (
            <div className="ice-partner-card" key={p.id}>
              <div className="ice-partner-role">{p.role}</div>
              {p.logo ? <img src={emtLogo} alt="EaseMyTrip" className="ice-partner-logo" /> : <div className="ice-partner-org">{p.org}</div>}
              <p className="ice-p ice-partner-txt">{p.text}</p>
              <div className="ice-partner-person">
                <span className="ice-partner-name">{p.contact}</span>
                <a href={p.tel} className="ice-partner-phone">
                  <Phone size={15} strokeWidth={1.8} aria-hidden="true" />
                  {p.phone}
                </a>
              </div>
              {p.note && <p className="ice-partner-note">{p.note}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
