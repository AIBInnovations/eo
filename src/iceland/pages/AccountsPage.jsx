import React from 'react';
import useSplitLines from '../../hooks/useSplitLines.js';
import PageHero from '../blocks/PageHero.jsx';
import LSection from '../blocks/LSection.jsx';
import Btn from '../blocks/Btn.jsx';
import { paymentColumns, paymentRows, accountsNotes, accountsActions } from '../data/accounts.js';
import { pageHeroes, pageImages } from '../data/pages.js';
import { useEnquiry } from '../EnquiryContext.jsx';
import { scrollToHash } from '../router.jsx';

/** Accounts & Payments — the payment structure, and how to get your invoices and statements. */
export default function AccountsPage() {
  useSplitLines(null);
  const h = pageHeroes.accounts;
  const { openPanel } = useEnquiry();

  return (
    <>
      <PageHero kicker={h.kicker} title={h.title} image={h.image} cta={<Btn onClick={() => scrollToHash(null, '#structure')}>See the payment structure</Btn>} />

      <section className="ice-accounts" id="structure">
        <div className="wrapper_base">
          <div className="ice-eyebrow">Payment structure</div>
          <h2 className="h2 ice-accounts-title">What is due, and when.</h2>
          <p className="ice-p ice-accounts-intro">
            The advance is paid to EO Punjab and refunded to you at the end. Every tranche after it is invoiced by the travel agent, with GST and TCS extra as applicable.
          </p>

          <div className="ice-table-wrap">
            <table className="ice-table ice-pay-table">
              <thead>
                <tr>
                  <th>Attribute</th>
                  <th>Date</th>
                  {paymentColumns.map((c) => (
                    <th key={c}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paymentRows.map((r) => (
                  <tr key={r.label} className={r.refund ? 'is-refund' : undefined}>
                    <td data-label="Attribute">
                      <span className="ice-pay-label">{r.label}</span>
                      {r.sub && <span className="ice-pay-sub">{r.sub}</span>}
                    </td>
                    <td data-label="Date">
                      <span className="ice-pay-date">{r.date}</span>
                    </td>
                    {r.amounts.map((a, i) => (
                      <td data-label={paymentColumns[i]} key={paymentColumns[i]}>
                        <span className="ice-pay-amount">{a}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="ice-accounts-notes">
            {accountsNotes.map((n) => (
              <li key={n.slice(0, 30)}>{n}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ice-accounts-actions" id="invoices">
        <div className="wrapper_base">
          <div className="ice-eyebrow">Invoices & statements</div>
          <h2 className="h2 ice-accounts-title">Your paperwork.</h2>
          <div className="ice-action-grid">
            {accountsActions.map((a) => (
              <div className="ice-action-card" key={a.title}>
                <h3 className="ice-action-title">{a.title}</h3>
                <p className="ice-p">{a.text}</p>
                <button type="button" className="ice-link-btn" onClick={() => openPanel(a.subject)}>
                  {a.cta} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LSection
        title="A question about your payments?"
        text="The accounts desk answers on WhatsApp or e-mail within a working day."
        cta={<Btn onClick={() => openPanel('Accounts · Payment question')}>Ask the accounts desk</Btn>}
        image={pageImages.thingvellir}
        alt="Þingvellir National Park"
      />
    </>
  );
}
