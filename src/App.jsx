import React, { useState, useCallback } from 'react';
import useLenis from './hooks/useLenis.js';
import CustomCursor from './components/CustomCursor.jsx';
import MobileMenu from './components/Header/MobileMenu.jsx';
import FloatingTravelSwitcher from './components/Header/FloatingTravelSwitcher.jsx';
import Header from './components/Header/Header.jsx';
import Home from './Home.jsx';
import IcelandApp from './iceland/IcelandApp.jsx';
import { TPWL_VARS } from './data/travelpayouts.js';

/** The Travel Next Level reference clone (kept intact; reachable at `/?page=travel`). */
function TravelNextLevel() {
  useLenis();
  const [menuOpen, setMenuOpen] = useState(false);
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);
  const toggleSwitcher = useCallback(() => setSwitcherOpen((v) => !v), []);
  return (
    <>
      <CustomCursor />
      <MobileMenu open={menuOpen} />
      <FloatingTravelSwitcher open={switcherOpen} onToggle={toggleSwitcher} />
      <Header menuOpen={menuOpen} onToggleMenu={toggleMenu} />
      <Home />
      <div id="tpwl-modals" dir="ltr" style={{ ...TPWL_VARS, position: 'absolute', height: 'unset' }} />
    </>
  );
}

export default function App() {
  const page = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('page') : null;
  if (page === 'travel') return <TravelNextLevel />;
  return <IcelandApp />;
}
