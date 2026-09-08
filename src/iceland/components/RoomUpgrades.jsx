import React from 'react';
import Icon from '../icons.jsx';
import RoomGallery from './RoomGallery.jsx';
import { hotelIntro, roomUpgrades, allRooms } from '../data/rooms.js';
import { useEnquiry } from '../EnquiryContext.jsx';

/**
 * Rooms at the EDITION: the four upgrade / extra-night cards (photographs, facts, enquire — no prices),
 * then every room type the hotel has, each with its full set of photographs.
 */
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
              <RoomGallery images={r.images} alt={r.alt} kicker={r.kicker} />
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

        <div className="ice-allrooms" id="all-rooms">
          <div className="ice-allrooms-head">
            <div>
              <div className="ice-eyebrow">Every room type</div>
              <h3 className="h2 ice-allrooms-title">All the rooms at the EDITION.</h3>
            </div>
            <p className="ice-p ice-allrooms-sub">Eleven room types, from the Guest King to the Penthouse. Use the arrows to see every photograph the hotel publishes for each.</p>
          </div>
          <div className="ice-allrooms-grid">
            {allRooms.map((r) => (
              <article className="ice-rt-card" key={r.id}>
                <RoomGallery images={r.images} alt={r.alt} sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 33vw" />
                <div className="ice-rt-body">
                  <div className="ice-rt-group">{r.group}</div>
                  <h4 className="ice-rt-name">{r.name}</h4>
                  <ul className="ice-rt-facts">
                    <li>
                      <Icon name="Maximize2" size={14} strokeWidth={1.8} />
                      <span>{r.size}</span>
                    </li>
                    <li>
                      <Icon name="BedDouble" size={14} strokeWidth={1.8} />
                      <span>{r.bed}</span>
                    </li>
                    <li>
                      <Icon name="Eye" size={14} strokeWidth={1.8} />
                      <span>{r.view}</span>
                    </li>
                  </ul>
                  {r.extra && <p className="ice-rt-extra">{r.extra}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
        <p className="ice-room-credit">Photographs: The Reykjavik EDITION.</p>
      </div>
    </section>
  );
}
