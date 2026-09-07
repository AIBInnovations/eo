import latestBlog from '../assets/images/latest-blog.avif';

// Three full-viewport story panels of the sticky-Lottie hero (visible `.div-block-7` copy of the source).
export const heroPanels = [
  {
    key: '_01',
    heading: 'Step Into a World of Discoveries',
    headingTag: 'h1',
    headingId: 'invert',
    headingClass: 'h1_interaction color-inversion-target',
    headlineBoxClass: 'headline box_01 invert',
    text: 'Unique travel destinations await to spark curiosity and inspire your next adventure. At Travel Next Level, we uncover hidden gems around the world, including enchanting cities and offbeat travel destinations waiting to be explored. Find travel inspiration that helps you plan your next trip and turn every journey into an unforgettable experience.',
    button: { href: '/en/destinations', label: 'Explore Now' },
  },
  {
    key: '_02',
    heading: 'A Window to Enchanting Destinations',
    headingTag: 'h2',
    headingClass: 'h1_interaction second_part color-inversion-target',
    headlineBoxClass: 'headline box_01 extra_change',
    text: 'The path to discovery is limitless, revealing breathtaking landscapes and exotic holiday destinations waiting to be explored. Every journey starts with curiosity, and Travel Next Level provides travel destination inspiration to help you plan where to travel next and create unforgettable experiences.',
  },
  {
    key: '_03',
    heading: 'Travel to Exotic Destinations Where Nature Meets Adventure',
    headingTag: 'h2',
    headingClass: 'h1_interaction second_part color-inversion-target',
    headlineBoxClass: 'headline box_01',
    text: 'Travel to places where the beauty of nature and the human wonder meet in absolute harmony. Let your curiosity guide you to the best adventure travel destinations and exclusive getaways, creating unforgettable experiences and breathtaking memories.',
  },
];

// Sticky "recent destination" card pinned to the bottom of the hero.
export const recentDestination = {
  href: 'https://travelnextlvl.de/de/blog/10-luxurious-vacation-destinations-you-can-find-on-check24----with-travel-next-lvl',
  image: latestBlog,
  alt: '10 Luxurious vacation destinations, jpg, image',
  title: '10 luxuriöse Urlaubsziele',
  cta: 'Jetzt lesen',
  category: 'Reiseguides',
  date: 'Oktober 27, 2024',
};

export const lottie = {
  json: '/lottie/door/door.json',
  assetsPath: '/lottie/door/images/',
  totalFrames: 287,
  // Webflow plays 1% → 99% of the clip across the section scroll (measured on the live page)
  frameRange: [0.01, 0.99],
};
