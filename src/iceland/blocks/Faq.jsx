import React, { useState } from 'react';

/** `.flex_faq` — sticky "FAQ" headline on the left, numbered accordion on the right (plus/minus icon). */
export default function Faq({ title = 'FAQ', items, id, className = '' }) {
  const [open, setOpen] = useState(0);
  return (
    <section className={`ice-faq-section ${className}`.trim()} id={id}>
      <div className="wrapper_base">
        <div className="flex_faq">
          <div className="faq_headline">
            <div className="faq_sticky">
              <h2 className="h2 faq_spec">{title}</h2>
            </div>
          </div>
          <div className="faq_cms">
            <div className="w-dyn-list">
              <div className="w-dyn-items">
                {items.map((f, i) => {
                  const isOpen = open === i;
                  return (
                    <div className={`accordion-item is--first w-dyn-item${isOpen ? ' is-open' : ''}`} key={f.q} onClick={() => setOpen(isOpen ? -1 : i)} role="button" aria-expanded={isOpen}>
                      <div className="accordion_head-wrapper">
                        <div className="item_head">
                          <div className="title_wrapper">
                            <div className="q_number">
                              <div className="item_title">{i + 1}</div>
                              <div className="item_title">.</div>
                            </div>
                            <div className="item_title question_on">{f.q}</div>
                            <div className="icon_wrapper">
                              <div className="icon_line is--2" />
                              <div className="icon_line" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="item_content-wrapper">
                        <div className="accordion_paragraph">
                          <div className="item_paragraph">{f.a}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
