import React, { useRef } from 'react';
import StoryPanel from './StoryPanel.jsx';
import RecentDestination from './RecentDestination.jsx';
import DoorAnimation from './DoorAnimation.jsx';
import { heroPanels } from '../../data/hero.js';

/**
 * `.threed_story`: three full-viewport story panels (100vh / 200vh / 100vh) plus a sticky
 * 100vh `.background_interaction` that carries the scroll-driven door Lottie. The sticky block
 * comes AFTER the panels in the DOM (as in the source) and pins to the viewport via `inset: 0`.
 */
export default function HeroStory() {
  const storyRef = useRef(null);

  return (
    <section className="threed_story" ref={storyRef}>
      <div className="div-block-7">
        {heroPanels.map((panel) => (
          <StoryPanel key={panel.key} panel={panel} />
        ))}
        <RecentDestination />
      </div>
      <div className="background_interaction">
        <div className="overlay_mobile" />
        <DoorAnimation storyRef={storyRef} />
      </div>
    </section>
  );
}
