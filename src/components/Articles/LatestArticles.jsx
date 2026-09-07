import React from 'react';
import HorizontalCarousel from '../Carousel/HorizontalCarousel.jsx';
import ArticleCard from './ArticleCard.jsx';
import { articles } from '../../data/articles.js';

/** "Latest articles" heading + `DRAG TO NAVIGATE` caption and the second `.slider2` Splide. */
export default function LatestArticles() {
  return (
    <>
      <div className="latest_articles_heading">
        <h2 className="h2 color-inversion-target">Latest articles</h2>
        <div className="caption_txt color-inversion-target">DRAG TO NAVIGATE</div>
      </div>
      <div className="latest-blogs">
        <div className="container-2">
          <HorizontalCarousel id="splide02">
            {articles.map((article) => (
              <div key={article.href} role="listitem" className="splide__slide w-dyn-item">
                <ArticleCard article={article} />
              </div>
            ))}
          </HorizontalCarousel>
        </div>
      </div>
    </>
  );
}
