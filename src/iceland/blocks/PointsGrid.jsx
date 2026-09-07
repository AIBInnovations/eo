import React from 'react';

/** `.points_grid` — the numbered-bullet grid ("Why partner with us"). 4 columns by default. */
export default function PointsGrid({ items, columns = 4, id, className = '' }) {
  return (
    <section className={`ice-points ice-points--${columns} ${className}`.trim()} id={id}>
      <div>
        <div className="w-dyn-list">
          <div className="points_grid w-dyn-items">
            {items.map((it, i) => (
              <div className="item_point w-dyn-item" key={it.title || i}>
                <div className="wrapper_point">
                  <div className="number_bullet">
                    <div className="bullet_circle">
                      <div className="number_bull">{it.number || i + 1}</div>
                    </div>
                  </div>
                  <div className="headline_bullet">
                    <div>{it.title}</div>
                  </div>
                  <div className="description_point">
                    <div>{it.text}</div>
                    {it.extra && <div className="ice-point-extra">{it.extra}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
