import React from 'react';
import Icon from '../icons.jsx';

/**
 * "What makes us different": offset H2, a scroll-revealed `.m_txt.split-lines` statement and the
 * `grid_icons` list (circle icon + title + value).
 */
export default function Statement({ title, text, icons = [], cta = null, id, className = '' }) {
  return (
    <section className={`ice-statement ${className}`.trim()} id={id}>
      <div className="wrapper_base">
        <div className="r_side_bg">
          <div className="inside_rg">
            <h2 className="h2">{title}</h2>
          </div>
          {text && (
            <div className="split_box spec_partners">
              <p className="m_txt split-lines">{text}</p>
            </div>
          )}
          {icons.length > 0 && (
            <div className="cms_icons">
              <div className="w-dyn-list">
                <div className="grid_icons w-dyn-items">
                  {icons.map((ic, i) => (
                    <div className="w-dyn-item" key={ic.title || i}>
                      <div className="icon_circle ice-icon">
                        <Icon name={ic.icon} />
                      </div>
                      <div className="lines_icons">
                        <div className="title_icons">{ic.title}</div>
                        <div className="desc_icon">{ic.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {cta && <div className="ice-statement-cta">{cta}</div>}
        </div>
      </div>
    </section>
  );
}
