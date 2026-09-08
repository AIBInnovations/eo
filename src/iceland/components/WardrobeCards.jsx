import React from 'react';
import Pic from '../blocks/Pic.jsx';
import Icon from '../icons.jsx';
import { wardrobeDays } from '../data/wardrobe.js';

/** What to wear, day by day: a scene photograph, the plan, and each part of the day as garment chips. */
export default function WardrobeCards({ id }) {
  return (
    <section className="ice-wardrobe" id={id}>
      <div className="wrapper_base">
        <div className="r_side_bg">
          <div className="inside_rg">
            <div className="ice-eyebrow">Wardrobe planner</div>
            <h2 className="h2">What to wear, day by day.</h2>
            <div className="desc_ch">
              <p className="b_txt spec_partner">Warm, waterproof and windproof by day; dressier every evening. Pack for the coldest moment of each day and change for dinner.</p>
            </div>
          </div>
        </div>

        <div className="ice-wd-list">
          {wardrobeDays.map((d) => (
            <article className="ice-wd-card" key={d.day}>
              <div className="ice-wd-media">
                <Pic src={d.image} alt={d.alt} className="ice-wd-img" sizes="(max-width: 991px) 100vw, 34vw" />
                <div className="ice-wd-tag">
                  <span className="ice-wd-day">{d.day}</span>
                  <span className="ice-wd-date">{d.date}</span>
                </div>
              </div>
              <div className="ice-wd-body">
                <h3 className="ice-wd-plan">{d.plan}</h3>
                {d.looks.map((l) => (
                  <div className="ice-wd-look" key={l.when}>
                    <div className="ice-wd-when">
                      <span>{l.when}</span>
                      {l.note && <em>{l.note}</em>}
                    </div>
                    <ul className="ice-wd-chips">
                      {l.items.map((it) => (
                        <li className="ice-wd-chip" key={it.label}>
                          <Icon name={it.icon} size={15} strokeWidth={1.8} />
                          <span>{it.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
