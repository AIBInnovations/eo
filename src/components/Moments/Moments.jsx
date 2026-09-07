import React, { useRef } from 'react';
import useLazyVideo from '../../hooks/useLazyVideo.js';
import { videos } from '../../data/videos.js';
import { momentsHeading } from '../../data/editorial.js';

function MomentVideo({ src }) {
  const ref = useRef(null);
  useLazyVideo(ref, src);
  return (
    <video
      ref={ref}
      data-lazy-load="true"
      data-src={src}
      poster=""
      autoPlay
      loop
      playsInline
      muted
      disablePictureInPicture
      className="video_embed-2"
    />
  );
}

/** `<section class="moments">` — 2×2 grid of 34em looping videos. Hidden at ≤479px by the source CSS. */
export default function Moments() {
  return (
    <section className="moments">
      <div className="wrapper_base">
        <div className="flexbox special_layout">
          <div className="l_side_tall">
            <h2 className="h2 color-inversion-target">{momentsHeading}</h2>
          </div>
          <div className="moments_share">
            <div className="w-dyn-list">
              <div role="list" className="grid_moments w-dyn-items">
                {videos.map((v) => (
                  <div role="listitem" className="w-dyn-item" key={v.id}>
                    <div className="video_moments color-inversion-target">
                      <MomentVideo src={v.src} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
