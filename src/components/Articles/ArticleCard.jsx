import React from 'react';

/** Latest-articles card: 24em×20em cover + title / "Read more" / date column. */
export default function ArticleCard({ article }) {
  return (
    <a href={article.href} className="new-post-link w-inline-block">
      <div className="lates-post-main color-inversion-target">
        <div className="latest-content-wraper">
          <div className="latest-cont-flex">
            <div className="latest-cover">
              <img src={article.image} loading="lazy" alt={article.alt} className="image-2" />
            </div>
            <div className="latest-cont-container">
              <div className="div-block-14">
                <div className="title_txt">{article.title}</div>
                <div className="text-block-3">Read more</div>
              </div>
              <div className="latest-cont-info">
                <div className="text-block-4">{article.date}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
