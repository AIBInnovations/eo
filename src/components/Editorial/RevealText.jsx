import React from 'react';

/**
 * `.split_box` editorial block: an `h2.m_txt.h-convert` (6.2em) and a `p.m_txt` (3.1em),
 * both carrying `.split-lines` so the global SplitType/GSAP line-mask reveal picks them up.
 */
export default function RevealText({ heading, text, boxClass = 'split_box' }) {
  return (
    <div className={boxClass}>
      <h2 className="m_txt split-lines color-inversion-target h-convert">{heading}</h2>
      <p className="m_txt split-lines color-inversion-target">{text}</p>
    </div>
  );
}
