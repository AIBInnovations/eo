import React from 'react';
import Pic from '../blocks/Pic.jsx';
import Icon from '../icons.jsx';
import { hotelIntro, roomUpgrades } from '../data/rooms.js';
import { useEnquiry } from '../EnquiryContext.jsx';

/** Room upgrades and extra nights at the EDITION: photograph, key facts, enquire. No prices. */
export default function RoomUpgrades({ id }) {
  const { openPanel } = useEnquiry();
  return (
    <section className="ice-rooms" id={id}>
      <div className="wrapper_base">
        <div className="r_side_bg">
          <div className="inside_rg">
            <div className="ice-eyebrow">Rooms & upgrades</div>
            <h2 className="h2">Move up a room.</h2>
            <div className="desc_ch">
              <p className="b_txt spec_partner">{hotelIntro}</p>
            </div>
          </div>
        </div>

        <div className="ice-room-grid">
          {roomUpgrades.map((r) => (
            <article className="ice-room-card" key={r.id}>
              <div className="ice-room-media">
                <Pic src={r.image} alt={r.alt} className="ice-room-img" sizes="(max-width: 767px) 100vw, 50vw" />
                <span className="ice-room-kicker">{r.kicker}</span>
              </div>
              <div className="ice-room-body">
                <div className="ice-room-type">{r.room}</div>
                <h3 className="ice-room-name">{r.name}</h3>
                <p className="ice-p ice-room-txt">{r.text}</p>
                <ul className="ice-room-facts">
                  {r.facts.map((f) => (
                    <li key={f.label}>
                      <Icon name={f.icon} size={16} strokeWidth={1.8} />
                      <span>{f.label}</span>
                    </li>
                  ))}
                </ul>
                {r.note && <p className="ice-room-note">{r.note}</p>}
                <button type="button" className="ice-link-btn" onClick={() => openPanel(`Room upgrade or extra night: ${r.name}`)}>
                  Enquire →
                </button>
              </div>
            </article>
          ))}
        </div>
        <p className="ice-room-credit">Photographs: The Reykjavik EDITION.</p>
      </div>
    </section>
  );
}
