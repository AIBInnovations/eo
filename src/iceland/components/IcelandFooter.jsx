import React from 'react';
import { leadership, leaders, hero, navigation, contacts } from '../data/retreat.js';
import { legalEntity } from '../data/legal.js';
import sponsors from '../../assets/logos/sponsors.png';
import { useEnquiry } from '../EnquiryContext.jsx';
import { Link } from '../router.jsx';

/** Navy footer: enquiry call-to-action, leadership, navigation and branding. */
const face = (id) => leaders.find((l) => l.id === id);

export default function IcelandFooter() {
  const { openPanel } = useEnquiry();
  return (
    <div className="footer ice-footer">
      <div className="wrapper_footer">
        <div className="dest_news ice-dest-news">
          <div className="dest_ft">
            <div className="dt_nw_wrapper">
              <div className="heading_prefooter">
                <div className="ice-eyebrow ice-eyebrow--light">Iceland 2027</div>
                <h2 className="h3 white color-inversion-target">{hero.title}</h2>
                <h3 className="h3 white grey color-inversion-target">{hero.dates} · Reykjavík</h3>
              </div>
              <div className="txt_box">
                <div className="b_txt white color-inversion-target">{hero.stats.join(' • ')}</div>
              </div>
              <div className="btn_wrapper">
                <button type="button" className="footer_button color-inversion-target ice-footer-my" onClick={() => openPanel('')}>
                  <div>Enquire now</div>
                </button>
              </div>
            </div>
          </div>
          <div className="news_ft">
            <div className="dt_nw_wrapper">
              <div className="heading_prefooter">
                <div className="ice-eyebrow ice-eyebrow--light">{leadership.president.role}</div>
                <div className="ice-footer-lead">
                  <span className="ice-footer-faces">
                    <img src={face('mohit').photo} alt={face('mohit').name} className="ice-footer-face" loading="lazy" decoding="async" />
                  </span>
                  <h2 className="h3 white color-inversion-target">{leadership.president.name}</h2>
                </div>
                <div className="ice-eyebrow ice-eyebrow--light ice-mt">{leadership.chairs.role}</div>
                <div className="ice-footer-lead">
                  <span className="ice-footer-faces">
                    <img src={face('vidur').photo} alt={face('vidur').name} className="ice-footer-face" loading="lazy" decoding="async" />
                    <img src={face('munish').photo} alt={face('munish').name} className="ice-footer-face" loading="lazy" decoding="async" />
                  </span>
                  <h3 className="h3 white color-inversion-target">{leadership.chairs.name}</h3>
                </div>
              </div>
              <div className="txt_box">
                <div className="b_txt white color-inversion-target">EO Punjab × Amplify. Same destination. We added a little chaos.</div>
              </div>
              <div className="btn_wrapper">
                <a href={hero.card.href} target="_blank" rel="noreferrer" className="footer_button color-inversion-target w-inline-block">
                  <div>Download final itinerary</div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="ice-sponsor-strip">
          <div className="ice-sponsor-panel">
            <img src={sponsors} alt="EaseMyTrip, annual travel partner · Nuvama Private, annual sponsor · MyEO · EO Punjab × Amplify" className="ice-sponsor-img" />
          </div>
        </div>

        <div className="footer_links">
          <div className="wrapper_footer_links">
            <div className="flexbox_footer">
              <div className="div-block-2">
                <div className="title_footer color-inversion-target">Explore</div>
                <div className="links_flex">
                  <Link to="/" className="footer_link color-inversion-target w-inline-block">
                    <div>Home</div>
                  </Link>
                  {navigation.slice(0, 5).map((l) => (
                    <Link key={l.href} to={l.href} className="footer_link color-inversion-target w-inline-block">
                      <div>{l.label}</div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="div-block-3">
                <div className="title_footer color-inversion-target">Members</div>
                <div className="links_flex">
                  {navigation.slice(5).map((l) => (
                    <Link key={l.href} to={l.href} className="footer_link color-inversion-target w-inline-block">
                      <div>{l.label}</div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="div-block-3">
                <div className="title_footer color-inversion-target">Downloads</div>
                <div className="links_flex">
                  <a href="/downloads/EO-Punjab-Iceland-2027-Itinerary.pdf" target="_blank" rel="noreferrer" className="footer_link color-inversion-target w-inline-block">
                    <div>Final itinerary</div>
                  </a>
                  <a href="/downloads/Extension-South-Coast-Iceland.pdf" target="_blank" rel="noreferrer" className="footer_link color-inversion-target w-inline-block">
                    <div>South Coast extension</div>
                  </a>
                  <a href="/downloads/Extension-Amsterdam.pdf" target="_blank" rel="noreferrer" className="footer_link color-inversion-target w-inline-block">
                    <div>Amsterdam extension</div>
                  </a>
                  <a href="/downloads/Extension-Copenhagen.pdf" target="_blank" rel="noreferrer" className="footer_link color-inversion-target w-inline-block">
                    <div>Copenhagen extension</div>
                  </a>
                </div>
              </div>
              <div className="div-block-3">
                <div className="title_footer color-inversion-target">Contact</div>
                <div className="links_flex">
                  <div className="footer_link color-inversion-target">{legalEntity.name}</div>
                  <div className="footer_link color-inversion-target">{legalEntity.address}</div>
                  {contacts
                    .filter((c) => c.href && c.href.startsWith('tel:') && c.value !== '112')
                    .map((c) => (
                      <a key={c.value} href={c.href} className="footer_link color-inversion-target w-inline-block">
                        <div>
                          {c.name} · {c.value}
                        </div>
                      </a>
                    ))}
                  <div className="footer_link color-inversion-target">Retreat desk · members’ WhatsApp group</div>
                </div>
              </div>
            </div>
            <div className="last_line ice-last-line">
              <div className="flexbox_line">
                <div className="left_rights">
                  <div className="footer_link just_rights color-inversion-target">© 2027 EO Punjab · Iceland Retreat</div>
                </div>
                <div className="privacy_box">
                  <Link to="/privacy" className="footer_link color-inversion-target w-inline-block">
                    <div>Privacy policy</div>
                  </Link>
                  <Link to="/terms" className="footer_link color-inversion-target w-inline-block">
                    <div>Terms of use</div>
                  </Link>
                  {/* Sign out — restore when the login gate (GATE_ENABLED in middleware.js) is switched on again
                  <a href="/logout" className="footer_link color-inversion-target w-inline-block">
                    <div>Sign out</div>
                  </a> */}
                </div>
                <div className="website_by">
                  <div className="footer_link web_by color-inversion-target">EO Punjab × Amplify</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
