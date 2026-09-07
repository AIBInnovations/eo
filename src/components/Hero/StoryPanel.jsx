import React from 'react';

/** One `.hero_b` story panel. Markup follows the visible `.div-block-7` copy of the source exactly. */
export default function StoryPanel({ panel }) {
  const isFirst = panel.key === '_01';
  const Heading = panel.headingTag;
  const sectionClass = isFirst ? 'hero_b' : `hero_b ${panel.key}`;

  return (
    <section className={sectionClass}>
      <div className="wrapper_hero">
        <div className="txt_side">
          {isFirst ? (
            <>
              <div className="box_in _01">
                <div className={panel.headlineBoxClass}>
                  <Heading id={panel.headingId} className={panel.headingClass}>
                    {panel.heading}
                  </Heading>
                </div>
              </div>
              <div className="bottom_side">
                <div className="description">
                  <p className="b_txt white color-inversion-target">{panel.text}</p>
                </div>
                <a href={panel.button.href} className="button_base invert color-inversion-target w-inline-block">
                  <div>{panel.button.label}</div>
                </a>
              </div>
            </>
          ) : (
            <div className={`box_in ${panel.key}`}>
              <div className={panel.headlineBoxClass}>
                <Heading className={panel.headingClass}>{panel.heading}</Heading>
              </div>
              <div className="description">
                <p className="b_txt white color-inversion-target">{panel.text}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
