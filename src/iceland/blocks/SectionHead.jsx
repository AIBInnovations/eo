import React from 'react';

/** The home page's section header row (`flexbox_siddes`): intro paragraph left, big H2 + caption right. */
export default function SectionHead({ text, title, caption }) {
  return (
    <div className="flexbox_siddes">
      <div className="left_part">
        <p className="b_txt ice-p color-inversion-target">{text}</p>
      </div>
      <div className="right_part">
        <div className="headline_box ice-headline-box">
          <h2 className="h2 spec_p ice-h2 color-inversion-target">{title}</h2>
        </div>
        <div className="caption">
          <div className="caption_txt color-inversion-target">{caption}</div>
        </div>
      </div>
    </div>
  );
}
