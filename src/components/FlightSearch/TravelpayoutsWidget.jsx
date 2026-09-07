import React, { useRef } from 'react';
import useThirdPartyScript from '../../hooks/useThirdPartyScript.js';

/**
 * Isolated host for a Travelpayouts "cascoon" widget. The remote script injects a
 * `<tp-cascoon>` custom element (shadow DOM) next to itself, so its styles stay contained.
 */
export default function TravelpayoutsWidget({ src, className = 'w-embed w-script', enabled = true }) {
  const hostRef = useRef(null);
  useThirdPartyScript(hostRef, { src, enabled });
  return <div ref={hostRef} className={className} />;
}
