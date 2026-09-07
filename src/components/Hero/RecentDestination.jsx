import React from 'react';
import { recentDestination as d } from '../../data/hero.js';

/** `.recent_destination` — sticky (bottom: 0) 30em card that rides along the bottom of the hero. */
export default function RecentDestination() {
  return (
    <div className="recent_destination">
      <div className="div-block">
        <div className="flexbox_destination">
          <div className="destination_cover">
            <img src={d.image} alt={d.alt} className="image color-inversion-target" />
          </div>
          <a href={d.href} target="_blank" rel="noreferrer" className="destination_box w-inline-block">
            <div className="wrapper_destination color-inversion-target">
              <div className="title_link">
                <div className="title_txt">{d.title}</div>
                <div>
                  <div className="explore_link">{d.cta}</div>
                </div>
              </div>
              <div className="flex_info">
                <div className="info_small">{d.category}</div>
                <div className="info_small">{d.date}</div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
