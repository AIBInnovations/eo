import React from 'react';
import useSplitLines from './hooks/useSplitLines.js';
import HeroStory from './components/Hero/HeroStory.jsx';
import DestinationSection from './components/Destination/DestinationSection.jsx';
import FlightSearch from './components/FlightSearch/FlightSearch.jsx';
import FeaturedArticle from './components/Blog/FeaturedArticle.jsx';
import Moments from './components/Moments/Moments.jsx';
import Footer from './components/Footer/Footer.jsx';
import { HandpickedDestinations, MapSection, HotelsSection } from './components/Legacy/HiddenSections.jsx';

export default function Home() {
  // SplitType + GSAP line-mask reveals for every `.split-lines` block on the page.
  useSplitLines(null);

  return (
    <>
      <HeroStory />
      <DestinationSection />
      <FlightSearch />
      {/* Legacy sections kept for DOM parity — `.section-2/-3/-4` are display:none in the source CSS. */}
      <HandpickedDestinations />
      <MapSection />
      <FeaturedArticle />
      <HotelsSection />
      <Moments />
      <Footer />
    </>
  );
}
