import React, { useRef } from 'react';
import DesktopNavigation from './DesktopNavigation.jsx';
import useHeaderScroll from '../../hooks/useHeaderScroll.js';
import searchIcon from '../../assets/icons/search-icon.svg';

/**
 * Fixed header (`.header`, z-index 900). Structure and class names mirror the Webflow export:
 * logo (12%) · locale list + mobile "Deutsch" link + menu trigger · centre navigation (27%) · right side (30%).
 */
export default function Header({ menuOpen, onToggleMenu }) {
  const headerRef = useRef(null);
  useHeaderScroll(headerRef);

  return (
    <div className="header" ref={headerRef}>
      <div className="wrapper_header">
        <div className="flex_header">
          <div className="l_l_side">
            <a href="/en" aria-current="page" className="logotype color-inversion-target w-inline-block w--current">
              <div className="logo_txt">
                Travel
                <br />
                Next Level
              </div>
            </a>
          </div>

          <div className="w-locales-list">
            <div role="list" className="locales-list w-locales-items">
              <div role="listitem" className="locale w-locales-item">
                <a hrefLang="de-DE" href="/" className="h_link color-inversion-target lang_change mobile">
                  Deutsch
                </a>
              </div>
              <div role="listitem" className="locale w-locales-item">
                <a hrefLang="en-US" href="/en" aria-current="page" className="h_link color-inversion-target lang_change mobile w--current">
                  English
                </a>
              </div>
            </div>
          </div>

          <a data-lan="de" href="https://travelnextlvl.de" className="language w-inline-block">
            <div>Deutsch</div>
          </a>

          <div className="menu_box" onClick={onToggleMenu} role="button" aria-expanded={menuOpen} aria-label="Menu">
            <div className="menu_txt open" style={{ display: menuOpen ? 'none' : undefined }}>
              Menü
            </div>
            <div className="menu_txt close" style={{ display: menuOpen ? 'block' : 'none' }}>
              close
            </div>
          </div>

          <DesktopNavigation />

          <div className="rg_side">
            <div className="flexbox">
              <div className="h_part">
                <div className="w-locales-list">
                  <div role="list" className="locales-list w-locales-items">
                    <div role="listitem" className="locale w-locales-item">
                      <a hrefLang="de-DE" href="/" className="h_link color-inversion-target lang_change">
                        Deutsch
                      </a>
                    </div>
                    <div role="listitem" className="locale w-locales-item">
                      <a hrefLang="en-US" href="/en" aria-current="page" className="h_link color-inversion-target lang_change w--current">
                        English
                      </a>
                    </div>
                  </div>
                </div>
                <a data-lang="de" href="https://travelnextlvl.de" className="h_link lang_link color-inversion-target w-inline-block">
                  <div className="h_txt">DEUTSCH</div>
                </a>
              </div>
              <div className="search_login">
                <a href="/en/search-all" className="h_link w-inline-block">
                  <div className="flex_search color-inversion-target">
                    <div className="search_icon_header">
                      <img src={searchIcon} loading="lazy" alt="" className="image" />
                    </div>
                    <div className="h_txt">SEARCH</div>
                  </div>
                </a>
                <div className="login_sign">
                  <div className="flex_outside_account">
                    <a data-ms-content="!members" href="/en/log-in" className="h_link color-inversion-target w-inline-block">
                      <div className="h_txt">LOGIN</div>
                    </a>
                    <a data-ms-content="!members" href="/en/sign-up" className="h_link color-inversion-target w-inline-block">
                      <div className="h_txt">REGISTER</div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
