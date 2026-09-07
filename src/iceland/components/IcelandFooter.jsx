import React from 'react';
import { leadership, hero, navigation } from '../data/retreat.js';
import { useEnquiry } from '../EnquiryContext.jsx';
import { Link } from '../router.jsx';

/** Navy footer: enquiry call-to-action, leadership, navigation and branding. */
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
                <h2 className="h3 white color-inversion-target">{leadership.president.name}</h2>
                <div className="ice-eyebrow ice-eyebrow--light ice-mt">{leadership.chairs.role}</div>
                <h3 className="h3 white color-inversion-target">{leadership.chairs.name}</h3>
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

        <div className="footer_links">
          <div className="wrapper_footer_links">
            <div className="flexbox_footer">
              <div className="div-block-2">
                <div className="title_footer color-inversion-target">Explore</div>
                <div className="links_flex">
                  <Link to="/" className="footer_link color-inversion-target w-inline-block">
                    <div>Home</div>
                  </Link>
                  {navigation.slice(0, 3).map((l) => (
                    <Link key={l.href} to={l.href} className="footer_link color-inversion-target w-inline-block">
                      <div>{l.label}</div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="div-block-3">
                <div className="title_footer color-inversion-target">Members</div>
                <div className="links_flex">
                  {navigation.slice(3).map((l) => (
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
                <div className="title_footer color-inversion-target">Brand</div>
                <div className="links_flex">
                  <div className="footer_link color-inversion-target">EO Punjab</div>
                  <div className="footer_link color-inversion-target">Amplify</div>
                </div>
              </div>
            </div>
            <div className="last_line ice-last-line">
              <div className="flexbox_line">
                <div className="left_rights">
                  <div className="footer_link just_rights color-inversion-target">© 2027 EO Punjab · Iceland Retreat</div>
                </div>
                <div className="privacy_box">
                  <div className="footer_link color-inversion-target">Land of Fire & Ice. An EO Experience Like No Other.</div>
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
