import React from 'react';

/**
 * The partners' testimonial list: an offset heading (`r_side_bg` / `inside_rg`) and ruled rows of
 * `profile | large statement | aside`. Used for announcements, contacts and extensions.
 */
export default function LineList({ title, text, items, cta = null, id, className = '' }) {
  return (
    <section className={`ice-lines ${className}`.trim()} id={id}>
      <div className="wrapper_base">
        <div className="r_side_bg">
          <div className="inside_rg">
            <h2 className="h2">{title}</h2>
            {text && (
              <div className="desc_ch">
                <p className="b_txt spec_partner">{text}</p>
              </div>
            )}
          </div>
        </div>
        <div className="list_influencers">
          <div className="w-dyn-list">
            <div className="influencers_list w-dyn-items">
              {items.map((it, i) => (
                <div className="w-dyn-item" key={it.name || i}>
                  <div className="line_test">
                    <div className="profile_flex">
                      {it.image && (
                        <div className="profile_image">
                          <img src={it.image} alt={it.alt || ''} className="image" loading="lazy" />
                        </div>
                      )}
                      {it.mark && !it.image && <div className="profile_image ice-mark">{it.mark}</div>}
                      <div className="info_profile">
                        <div className="top_info">
                          <div>{it.name}</div>
                          {it.sub && <div>{it.sub}</div>}
                        </div>
                        {it.meta && (
                          <div className="flex_followers">
                            <div>{it.meta[0]}</div>
                            <div>{it.meta[1]}</div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="testimonial_txt">
                      <div>{it.body}</div>
                      {it.detail && <p className="ice-line-detail">{it.detail}</p>}
                    </div>
                    <div className="payout_list">
                      {it.aside && (
                        <div className="payout_money">
                          <div>{it.aside[0]}</div>
                          <div>{it.aside[1]}</div>
                        </div>
                      )}
                      {it.action}
                    </div>
                  </div>
                  <div className="splitter_infl" />
                </div>
              ))}
            </div>
          </div>
        </div>
        {cta && (
          <div className="r_side_bg">
            <div className="inside_rg">
              <div>{cta}</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
