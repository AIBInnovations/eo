import React, { useRef } from 'react';
import useCustomCursor from '../hooks/useCustomCursor.js';

/** `#cursor-dot` (8px) + `#cursor-outline` (40px); hidden ≤991px by `.code-embed-3` in the site CSS. */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  useCustomCursor(dotRef, outlineRef);

  return (
    <div className="code-embed-3 w-embed">
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-outline" ref={outlineRef} />
    </div>
  );
}
