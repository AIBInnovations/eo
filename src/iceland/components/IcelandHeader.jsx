import React, { useRef } from 'react';
import useHeaderScroll from '../../hooks/useHeaderScroll.js';
import { navigation } from '../data/retreat.js';
import { useEnquiry } from '../EnquiryContext.jsx';
import { Link, useRouter, scrollToHash } from '../router.jsx';
import Logo from './Logo.jsx';

export { scrollToHash };

/**
 * Fixed header: wordmark on the left, three links either side of the centre pill, and the Enquire
 * button on the right. Same hide-on-scroll and invert-over-light-sections behaviour as the reference.
 */
export default function IcelandHeader({ menuOpen, onToggleMenu }) {
  const headerRef = useRef(null);
  const { openPanel } = useEnquiry();
  const { path } = useRouter();
  useHeaderScroll(headerRef, { key: path });

  const main = navigation.filter((l) => !l.cta);
  const left = main.slice(0, 3);
  const right = main.slice(3);

  const link = (l) => (
    <Link key={l.href} to={l.href} className={`ice-nav-link color-inversion-target${path === l.href ? ' is-current' : ''}`}>
      {l.short || l.label}
    </Link>
  );

  return (
    <div className="header ice-header" ref={headerRef}>
      <div className="ice-header-bar">
        <div className="ice-header-left">
          <Link to="/" className={`ice-wordmark${path === '/' ? ' is-current' : ''}`} aria-label="EO Punjab · Iceland 2027, home">
            <Logo className="ice-logo--header" />
            <span className="ice-wordmark-sub color-inversion-target">Iceland 2027</span>
          </Link>
          <nav className="ice-nav ice-nav--left" aria-label="Primary">
            {left.map(link)}
          </nav>
        </div>

        <div className="ice-header-centre" aria-hidden="true" />

        <div className="ice-header-right">
          <nav className="ice-nav ice-nav--right" aria-label="Secondary">
            {right.map(link)}
          </nav>
          <button type="button" className="ice-nav-cta color-inversion-target" onClick={() => openPanel('')}>
            Enquire
          </button>
          <button type="button" className="ice-menu-btn color-inversion-target" onClick={onToggleMenu} aria-expanded={menuOpen} aria-label="Menu">
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
    </div>
  );
}
