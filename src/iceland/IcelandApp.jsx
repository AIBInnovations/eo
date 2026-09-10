import React, { useCallback, useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { inject } from '@vercel/analytics';
import useLenis from '../hooks/useLenis.js';
import CustomCursor from '../components/CustomCursor.jsx';
import { EnquiryProvider } from './EnquiryContext.jsx';
import { RouterProvider, useRouter } from './router.jsx';
import IcelandHeader from './components/IcelandHeader.jsx';
import IcelandMobileMenu from './components/IcelandMobileMenu.jsx';
import EnquirySwitcher from './components/EnquirySwitcher.jsx';
import IcelandFooter from './components/IcelandFooter.jsx';
import Preloader from './components/Preloader.jsx';
import CookieBanner, { readConsent } from './components/CookieBanner.jsx';
import { USE_SCROLLER, SCROLLER_SELECTOR, LOW_POWER } from './perf.js';
import { pageMeta, SITE_URL, OG_IMAGE } from './data/meta.js';
import HomePage from './pages/HomePage.jsx';
import JourneyPage from './pages/JourneyPage.jsx';
import AdventurePage from './pages/AdventurePage.jsx';
import StayPage from './pages/StayPage.jsx';
import EnquiryPage from './pages/EnquiryPage.jsx';
import TravelDeskPage from './pages/TravelDeskPage.jsx';
import FamilyPage from './pages/FamilyPage.jsx';
import UpdatesPage from './pages/UpdatesPage.jsx';
import AccountsPage from './pages/AccountsPage.jsx';
import ExtensionsPage from './pages/ExtensionsPage.jsx';
import EssentialsPage from './pages/EssentialsPage.jsx';
import LegalPage from './pages/LegalPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ThankYouPage from './pages/ThankYouPage.jsx';
import './iceland.css';

// Phones/tablets scroll inside a fixed container (see perf.js); every ScrollTrigger must measure against it.
if (USE_SCROLLER) ScrollTrigger.defaults({ scroller: SCROLLER_SELECTOR });

const PAGES = {
  home: HomePage,
  journey: JourneyPage,
  adventure: AdventurePage,
  stay: StayPage,
  extensions: ExtensionsPage,
  essentials: EssentialsPage,
  enquire: EnquiryPage,
  'travel-desk': TravelDeskPage,
  family: FamilyPage,
  updates: UpdatesPage,
  accounts: AccountsPage,
  privacy: () => <LegalPage kind="privacy" />,
  terms: () => <LegalPage kind="terms" />,
  'thank-you': ThankYouPage,
  'not-found': NotFoundPage,
};

const setMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};
const setCanonical = (href) => {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

function Shell() {
  const { page, path } = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const Page = PAGES[page] || NotFoundPage;
  const [loading, setLoading] = useState(true);
  const onLoaded = useCallback(() => setLoading(false), []);
  const [consent, setConsent] = useState(readConsent);

  // per-page <title>, description, canonical and Open Graph / Twitter tags
  useEffect(() => {
    const m = pageMeta[page] || pageMeta['not-found'];
    const url = SITE_URL + (path === '/' ? '/' : path);
    document.title = m.title;
    document.body.dataset.page = page;
    setMeta('name', 'description', m.description);
    setMeta('property', 'og:title', m.title);
    setMeta('property', 'og:description', m.description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', OG_IMAGE);
    setMeta('property', 'og:type', 'website');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', m.title);
    setMeta('name', 'twitter:description', m.description);
    setMeta('name', 'twitter:image', OG_IMAGE);
    setMeta('name', 'robots', page === 'not-found' || page === 'thank-you' ? 'noindex' : 'index,follow');
    setCanonical(url);
  }, [page, path]);

  // analytics only after consent (cookieless, but we still ask)
  useEffect(() => {
    if (consent === 'accepted' && !window.__iceAnalytics) {
      window.__iceAnalytics = true;
      inject({ mode: import.meta.env.PROD ? 'production' : 'development' });
    }
  }, [consent]);

  return (
    <>
      {loading && <Preloader onDone={onLoaded} />}
      {!LOW_POWER && <CustomCursor />}
      <IcelandMobileMenu open={menuOpen} onClose={closeMenu} />
      <EnquirySwitcher />
      <IcelandHeader menuOpen={menuOpen} onToggleMenu={toggleMenu} />
      {!loading && <CookieBanner onChange={setConsent} />}
      <div id="ice-scroller" className={USE_SCROLLER ? 'ice-scroller' : undefined}>
        <div className="ice-scroller-inner">
          <main className={`ice-main ice-main--${page}`} key={path}>
            <Page />
          </main>
          <IcelandFooter />
        </div>
      </div>
    </>
  );
}

/**
 * EO Punjab · Iceland 2027 retreat site. Same page architecture as the Travel Next Level reference
 * (fixed header, glass switcher, sticky scrubbed hero on the home page, the partnership page's
 * hero / full-bleed / points / steps / FAQ / form blocks on the internal pages, navy footer),
 * themed in cream + deep navy + restrained gold.
 */
export default function IcelandApp() {
  useLenis({ wrapper: USE_SCROLLER ? SCROLLER_SELECTOR : null });

  useEffect(() => {
    document.body.classList.add('iceland');
    return () => {
      document.body.classList.remove('iceland');
      delete document.body.dataset.page;
    };
  }, []);

  return (
    <RouterProvider>
      <EnquiryProvider>
        <Shell />
      </EnquiryProvider>
    </RouterProvider>
  );
}
