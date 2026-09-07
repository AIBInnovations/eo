import React, { useRef } from 'react';
import useScrollLottie from '../../hooks/useScrollLottie.js';
import { lottie } from '../../data/hero.js';

/**
 * `.interaction_door` — the original `m8akxnzz.lottie` (287-frame door image sequence, 1880×920)
 * rendered to a canvas and scrubbed by the scroll progress of `.threed_story`.
 */
export default function DoorAnimation({ storyRef, start = 'top top', end = 'bottom top', frameRange }) {
  const containerRef = useRef(null);
  useScrollLottie(containerRef, storyRef, {
    path: lottie.json,
    assetsPath: lottie.assetsPath,
    start,
    end,
    frameRange: frameRange || lottie.frameRange,
  });

  return (
    <div
      ref={containerRef}
      className="interaction_door"
      data-animation-type="lottie"
      data-renderer="canvas"
      data-autoplay="0"
      data-loop="0"
      data-loading="eager"
      data-preserve-aspect-ratio="xMidYMid slice"
    />
  );
}
