import React, { useState } from 'react';
import { footerColumns, legalLinks, footerCopy as c } from '../../data/footer.js';
import qrCode from '../../assets/images/whatsapp-qr.avif';

/**
 * Black footer: 80vh `.dest_news` (Destinations CTA | WhatsApp newsletter with QR + subscribe form)
 * and the link columns / legal line below. Layout stacks at ≤767px via the source CSS.
 */
export default function Footer() {
  const [formState, setFormState] = useState('idle'); // idle | done | fail

  const onSubmit = (e) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get('email-2');
    setFormState(email ? 'done' : 'fail');
  };

  return (
    <div className="footer">
      <div className="wrapper_footer">
        <div className="dest_news">
          <div className="dest_ft">
            <div className="dt_nw_wrapper">
              <div className="heading_prefooter">
                <div>
                  <h2 className="h3 white color-inversion-target">{c.destinationsTitle}</h2>
                </div>
              </div>
              <div className="txt_box">
                <div className="b_txt white color-inversion-target">{c.destinationsText}</div>
              </div>
              <div className="btn_wrapper">
                <a href="/en/destinations" className="footer_button color-inversion-target w-inline-block">
                  <div>{c.destinationsButton}</div>
                </a>
              </div>
            </div>
          </div>

          <div className="news_ft">
            <div className="dt_nw_wrapper">
              <div className="heading_prefooter">
                <h2 className="h3 white color-inversion-target">{c.newsletterTitle}</h2>
                <h3 className="h3 white grey color-inversion-target">{c.newsletterSubtitle}</h3>
              </div>
              <div className="qr_link">
                <a href={c.whatsappHref} target="_blank" rel="noreferrer" className="link_qr w-inline-block">
                  <img src={qrCode} loading="lazy" alt="" className="image color-inversion-target" />
                </a>
              </div>
              <div className="txt_box">
                <div className="b_txt white color-inversion-target">{c.newsletterText}</div>
              </div>
              <div className="btn_wrapper">
                <div>
                  <div className="form-block w-form">
                    {formState !== 'done' && (
                      <form
                        id="wf-form-Subscribe-Form"
                        name="wf-form-Subscribe-Form"
                        data-name="Subscribe Form"
                        method="get"
                        className="subscribe_flex"
                        aria-label="Subscribe Form"
                        onSubmit={onSubmit}
                      >
                        <input
                          className="field_prefooter color-inversion-target w-input"
                          maxLength={256}
                          name="email-2"
                          data-name="Email 2"
                          placeholder={c.emailPlaceholder}
                          type="email"
                          id="email-2"
                          required
                        />
                        <input type="submit" data-wait="Please wait..." className="footer_button color-inversion-target w-button" value={c.subscribe} />
                      </form>
                    )}
                    <div className="subscribe_thanks w-form-done" tabIndex={-1} role="region" aria-label="Subscribe Form success" style={{ display: formState === 'done' ? 'block' : 'none' }}>
                      <div className="thanks_txt">{c.thanks}</div>
                    </div>
                    <div className="error_state w-form-fail" tabIndex={-1} role="region" aria-label="Subscribe Form failure" style={{ display: formState === 'fail' ? 'block' : 'none' }}>
                      <div>{c.error}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer_links">
          <div className="wrapper_footer_links">
            <div className="flexbox_footer">
              {footerColumns.map((col) => (
                <div className={col.className} key={col.title}>
                  <div className="title_footer color-inversion-target">{col.title}</div>
                  <div className="links_flex">
                    {col.links.map((l) => (
                      <a
                        key={l.href + l.label}
                        href={l.href}
                        target={l.external ? '_blank' : undefined}
                        rel={l.external ? 'noreferrer' : undefined}
                        aria-current={l.current ? 'page' : undefined}
                        className={`footer_link${l.innerTarget ? '' : ' color-inversion-target'} w-inline-block${l.current ? ' w--current' : ''}`}
                      >
                        <div className={l.innerTarget ? 'color-inversion-target' : undefined}>{l.label}</div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="last_line">
              <div className="flexbox_line">
                <div className="left_rights">
                  <a href="#" className="footer_link just_rights color-inversion-target w-inline-block">
                    <div>{c.rights}</div>
                  </a>
                </div>
                <div className="privacy_box">
                  {legalLinks.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className={`footer_link${l.first ? '' : ' second'} color-inversion-target w-inline-block`}>
                      {l.first ? (
                        <div>
                          <br />
                          {l.label}
                          <br />
                        </div>
                      ) : (
                        <div>{l.label}</div>
                      )}
                    </a>
                  ))}
                </div>
                <div className="website_by">
                  <a href={c.credit.href} target="_blank" rel="noreferrer" className="footer_link web_by color-inversion-target w-inline-block">
                    <div>{c.credit.label}</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
