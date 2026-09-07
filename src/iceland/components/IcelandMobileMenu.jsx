import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { navigation, leadership } from '../data/retreat.js';
import { useEnquiry } from '../EnquiryContext.jsx';
import { useRouter } from '../router.jsx';

/** Full-screen navy menu (≤991px) — same slide/scale-in motion as the reference site's menu. */
export default function IcelandMobileMenu({ open, onClose }) {
  const ref = useRef(null);
  const first = useRef(true);
  const { openPanel } = useEnquiry();
  const { navigate, path } = useRouter();

  useLayoutEffect(() => {
    const el = ref.current;
    let tween;
    if (first.current) {
      first.current = false;
      gsap.set(el, { x: 0, xPercent: open ? 0 : 100, scale: open ? 1 : 0.9 });
    } else {
      tween = gsap.to(el, { xPercent: open ? 0 : 100, scale: open ? 1 : 0.9, duration: 0.6, ease: 'power3.inOut', overwrite: 'auto' });
    }
    const lenis = window.__lenis;
    document.body.style.overflow = open ? 'hidden' : '';
    if (lenis) (open ? lenis.stop : lenis.start).call(lenis);
    return () => {
      if (tween) tween.kill();
      document.body.style.overflow = '';
      if (lenis && lenis.start) lenis.start();
    };
  }, [open]);

  const go = (e, href) => {
    e.preventDefault();
    onClose();
    setTimeout(() => navigate(href), 60);
  };

  return (
    <div className="mobile_menu ice-mobile-menu" ref={ref} aria-hidden={!open}>
      <div className="menu_wrapper">
        <div className="mobile_links">
          <a href="/" className={`mobile_link w-inline-block${path === '/' ? ' w--current' : ''}`} onClick={(e) => go(e, '/')}>
            <div>Home</div>
          </a>
          {navigation.map((link) => (
            <a key={link.href} href={link.href} className={`mobile_link w-inline-block${path === link.href ? ' w--current' : ''}`} onClick={(e) => go(e, link.href)}>
              <div>{link.label}</div>
            </a>
          ))}
        </div>
        <div className="socials_mobile">
          <div className="socials_title">{leadership.chairs.role}</div>
          <div className="list_links">
            <div className="social_link">{leadership.chairs.name}</div>
          </div>
        </div>
        <div className="search_link">
          <button
            type="button"
            className="search_box w-inline-block ice-mobile-my"
            onClick={() => {
              onClose();
              openPanel('');
            }}
          >
            <div className="flexbox_link">
              <div className="search_align">
                <div className="search_txt">Enquire</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
