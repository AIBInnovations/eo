import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { mobileLinks, socialLinks } from '../../data/navigation.js';
import searchIcon from '../../assets/icons/search-icon.svg';

/**
 * Full-screen black `.mobile_menu` (≤767px). Starts off-canvas at translateX(100%) scale(.9) (the
 * Webflow interaction's initial state measured on the live page) and slides/scales in;
 * page scrolling (Lenis + native) is locked while it is open.
 */
export default function MobileMenu({ open }) {
  const ref = useRef(null);
  const first = useRef(true);

  useLayoutEffect(() => {
    const el = ref.current;
    let tween;
    if (first.current) {
      // Take over the stylesheet's translate(100%) as a percent-based GSAP transform (px x must be 0)
      first.current = false;
      gsap.set(el, { x: 0, xPercent: open ? 0 : 100, scale: open ? 1 : 0.9 });
    } else {
      tween = gsap.to(el, { xPercent: open ? 0 : 100, scale: open ? 1 : 0.9, duration: 0.6, ease: 'power3.inOut', overwrite: 'auto' });
    }

    const lenis = window.__lenis;
    if (open) {
      document.body.style.overflow = 'hidden';
      if (lenis && lenis.stop) lenis.stop();
    } else {
      document.body.style.overflow = '';
      if (lenis && lenis.start) lenis.start();
    }
    return () => {
      if (tween) tween.kill();
      document.body.style.overflow = '';
      if (lenis && lenis.start) lenis.start();
    };
  }, [open]);

  return (
    <div className="mobile_menu" ref={ref} aria-hidden={!open}>
      <div className="menu_wrapper">
        <div className="mobile_links">
          {mobileLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={link.current ? 'page' : undefined}
              className={`mobile_link w-inline-block${link.current ? ' w--current' : ''}`}
            >
              <div>{link.label}</div>
            </a>
          ))}
        </div>
        <div className="socials_mobile">
          <div className="socials_title">Soziale Medien</div>
          <div className="list_links">
            {socialLinks.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="social_link w-inline-block">
                <div>{s.label}</div>
              </a>
            ))}
          </div>
        </div>
        <div className="search_link">
          <a href="/en/search-all" className="search_box w-inline-block">
            <div className="flexbox_link">
              <div className="search_icon">
                <img src={searchIcon} loading="lazy" alt="" className="image" />
              </div>
              <div className="search_align">
                <div className="search_txt">Suche</div>
              </div>
            </div>
          </a>
          <div className="flex_account">
            <a data-ms-content="!members" href="/en/log-in" className="log_in_link w-inline-block">
              <div>Einloggen</div>
            </a>
            <a data-ms-content="!members" href="/en/sign-up" className="sign_up_link w-inline-block">
              <div>Registrieren</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
