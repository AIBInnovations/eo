import React from 'react';
import { desktopMenu } from '../../data/navigation.js';

/** `.lf_menu` — two stacked link groups with the 6em `.flexbox` gap. Hidden ≤767px. */
export default function DesktopNavigation() {
  return (
    <div className="lf_menu">
      <div className="flexbox">
        {desktopMenu.map((group, i) => (
          <div className="h_part color-inversion-target" key={i}>
            {group.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={link.current ? 'page' : undefined}
                className={`h_link w-inline-block${link.current ? ' w--current' : ''}`}
              >
                <div className="h_txt">{link.label}</div>
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
