import React from 'react';
import { Phone } from 'lucide-react';
import { leaders } from '../data/retreat.js';

const initials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

/**
 * The three people to recognise on the trip. Portraits drop in through `leaders[].photo`
 * in data/retreat.js; until then each card shows initials in the retreat's palette.
 */
export default function Leaders({ id, title = 'Who to look for', text = 'The people running the retreat. Say hello, and call any of them if you need something.' }) {
  return (
    <section className="ice-leaders" id={id}>
      <div className="wrapper_base">
        <div className="r_side_bg">
          <div className="inside_rg">
            <div className="ice-eyebrow">EO Punjab</div>
            <h2 className="h2">{title}</h2>
            <div className="desc_ch">
              <p className="b_txt spec_partner">{text}</p>
            </div>
          </div>
        </div>
        <div className="ice-leader-grid">
          {leaders.map((l) => (
            <article className="ice-leader" key={l.id}>
              <div className="ice-leader-face">
                {l.photo ? <img src={l.photo} alt={l.name} className="ice-leader-img" loading="lazy" decoding="async" /> : <span className="ice-leader-initials">{initials(l.name)}</span>}
              </div>
              <div className="ice-leader-body">
                <h3 className="ice-leader-name">{l.name}</h3>
                <div className="ice-leader-role">{l.role}</div>
                <a className="ice-ct-tel" href={l.tel}>
                  <Phone size={14} strokeWidth={1.8} aria-hidden="true" />
                  {l.phone}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
