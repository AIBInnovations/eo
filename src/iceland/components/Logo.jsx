import React from 'react';
import light from '../../assets/logos/eo-amplify-light.png';
import dark from '../../assets/logos/eo-amplify-dark.png';

/**
 * EO Punjab × Amplify lockup. Two polarities are stacked and cross-faded: the light one (white
 * wordmark) shows over dark backgrounds, the dark one once the header inverts over light sections.
 * The header animates `filter: invert(1)` on itself, so the visible image counter-inverts to keep
 * the brand colours true (see `.ice-header.ice-inverted .ice-logo img` in iceland.css).
 */
export default function Logo({ className = '', alt = 'EO Punjab × Amplify' }) {
  return (
    <span className={`ice-logo ${className}`.trim()}>
      <img src={light} alt={alt} className="ice-logo-img ice-logo-img--light" />
      <img src={dark} alt="" aria-hidden="true" className="ice-logo-img ice-logo-img--dark" />
    </span>
  );
}
