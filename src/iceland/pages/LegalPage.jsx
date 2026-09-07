import React from 'react';
import { privacy, terms, legalEntity } from '../data/legal.js';
import Btn from '../blocks/Btn.jsx';

/** Privacy policy / terms: a quiet text page in the site's type. */
export default function LegalPage({ kind = 'privacy' }) {
  const doc = kind === 'terms' ? terms : privacy;
  return (
    <section className="ice-legal">
      <div className="wrapper_base">
        <div className="ice-eyebrow">Updated {doc.updated}</div>
        <h1 className="h2 ice-legal-title">{doc.title}</h1>
        <p className="ice-p ice-legal-intro">{doc.intro}</p>
        {doc.sections.map((s) => (
          <div className="ice-legal-section" key={s.h}>
            <h2 className="ice-legal-h">{s.h}</h2>
            {s.p.map((t) => (
              <p className="ice-p" key={t.slice(0, 40)}>
                {t}
              </p>
            ))}
          </div>
        ))}
        <div className="ice-legal-section">
          <h2 className="ice-legal-h">Who runs this site</h2>
          <p className="ice-p">
            {legalEntity.name}, {legalEntity.address}. {legalEntity.email}.
          </p>
        </div>
        <div className="ice-btn-row">
          <Btn to="/" dark>
            Back to the site
          </Btn>
          <Btn to="/enquire">Enquire</Btn>
        </div>
      </div>
    </section>
  );
}
