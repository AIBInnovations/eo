import React from 'react';
import { Phone } from 'lucide-react';
import { contactTable } from '../data/retreat.js';

/**
 * "Who to contact" — the routing table the retreat chairs circulated: what you need on the left,
 * who handles it and their number on the right. Rendered as rows on desktop and cards on phones.
 */
export default function ContactTable({ id, title = 'Who to contact', text = 'One number for each kind of question, so nothing bounces around the group.' }) {
  return (
    <section className="ice-who" id={id}>
      <div className="wrapper_base">
        <div className="r_side_bg">
          <div className="inside_rg">
            <div className="ice-eyebrow">Contacts</div>
            <h2 className="h2">{title}</h2>
            <div className="desc_ch">
              <p className="b_txt spec_partner">{text}</p>
            </div>
          </div>
        </div>

        <div className="ice-ct" role="table" aria-label={title}>
          <div className="ice-ct-head" role="row">
            <span role="columnheader">Connect for</span>
            <span role="columnheader">Name &amp; role</span>
            <span role="columnheader">Contact number</span>
          </div>
          {contactTable.map((row) => (
            <div className={`ice-ct-row${row.light ? ' is-light' : ''}`} role="row" key={row.for}>
              <div className="ice-ct-for" role="cell">
                <span className="ice-ct-label">Connect for</span>
                {row.for}
              </div>
              <div className="ice-ct-who" role="cell">
                <span className="ice-ct-label">Name &amp; role</span>
                {row.people.map((p) => (
                  <div className="ice-ct-person" key={p.name}>
                    <span className="ice-ct-name">{p.name}</span>
                    <span className="ice-ct-role">{p.role}</span>
                  </div>
                ))}
              </div>
              <div className="ice-ct-num" role="cell">
                <span className="ice-ct-label">Contact number</span>
                {row.people.map((p) =>
                  p.tel ? (
                    <a className="ice-ct-tel" href={p.tel} key={p.name}>
                      <Phone size={14} strokeWidth={1.8} aria-hidden="true" />
                      {p.phone}
                    </a>
                  ) : (
                    <span className="ice-ct-tel is-quiet" key={p.name}>
                      {p.role}
                    </span>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
