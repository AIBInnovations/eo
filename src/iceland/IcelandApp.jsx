import React, { useCallback, useEffect, useState } from 'react';
import useLenis from '../hooks/useLenis.js';
import CustomCursor from '../components/CustomCursor.jsx';
import { EnquiryProvider } from './EnquiryContext.jsx';
import { RouterProvider, useRouter } from './router.jsx';
import IcelandHeader from './components/IcelandHeader.jsx';
import IcelandMobileMenu from './components/IcelandMobileMenu.jsx';
import EnquirySwitcher from './components/EnquirySwitcher.jsx';
import IcelandFooter from './components/IcelandFooter.jsx';
import HomePage from './pages/HomePage.jsx';
import JourneyPage from './pages/JourneyPage.jsx';
import AdventurePage from './pages/AdventurePage.jsx';
import StayPage from './pages/StayPage.jsx';
import EnquiryPage from './pages/EnquiryPage.jsx';
import TravelDeskPage from './pages/TravelDeskPage.jsx';
import FamilyPage from './pages/FamilyPage.jsx';
import UpdatesPage from './pages/UpdatesPage.jsx';
import './iceland.css';

const PAGES = {
  home: { component: HomePage, title: 'Iceland 2027 · EO Punjab Retreat' },
  journey: { component: JourneyPage, title: 'The Journey · Iceland 2027' },
  adventure: { component: AdventurePage, title: 'Choose Your Adventure · Iceland 2027' },
  stay: { component: StayPage, title: 'Stay & Experiences · Iceland 2027' },
  enquire: { component: EnquiryPage, title: 'Enquire · Iceland 2027' },
  'travel-desk': { component: TravelDeskPage, title: 'Travel Desk · Iceland 2027' },
  family: { component: FamilyPage, title: 'The EO Punjab Family · Iceland 2027' },
  updates: { component: UpdatesPage, title: 'Updates & Help · Iceland 2027' },
};

function Shell() {
  const { page, path } = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const entry = PAGES[page] || PAGES.home;
  const Page = entry.component;

  useEffect(() => {
    document.title = entry.title;
    document.body.dataset.page = page;
  }, [entry, page]);

  return (
    <>
      <CustomCursor />
      <IcelandMobileMenu open={menuOpen} onClose={closeMenu} />
      <EnquirySwitcher />
      <IcelandHeader menuOpen={menuOpen} onToggleMenu={toggleMenu} />
      <main className={`ice-main ice-main--${page}`} key={path}>
        <Page />
      </main>
      <IcelandFooter />
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
  useLenis();

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
