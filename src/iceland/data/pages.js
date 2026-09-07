import glacierLagoon from '../../assets/iceland/glacier-lagoon.webp';
import skogafoss from '../../assets/iceland/skogafoss-waterfall.webp';
import diamondBeach from '../../assets/iceland/diamond-beach.webp';
import iceCave from '../../assets/iceland/katla-ice-cave.webp';
import vik from '../../assets/iceland/vik-village.webp';
import posterCover from '../../assets/iceland/poster-cover.webp';
import auroraDinner from '../../assets/iceland/aurora-basecamp-dinner.webp';
import canyonRiver from '../../assets/iceland/canyon-river.webp';
import canyonAerial from '../../assets/iceland/canyon-aerial.webp';
import canyonPlateau from '../../assets/iceland/canyon-plateau.webp';
import { images } from './retreat.js';

/** The FPV canyon flight (the original clip in `public/`), used as the moving hero of the Journey page. */
export const DRONE_VIDEO = '/video/iceland-canyon.mp4';
export const ITINERARY_PDF = '/downloads/EO-Punjab-Iceland-2027-Itinerary.pdf';

/** Hero copy for every internal page (kicker pair, headline, background). */
export const pageHeroes = {
  journey: {
    kicker: ['Day by Day', '31 Mar – 4 Apr 2027'],
    title: 'The Journey. Five days, one chapter, 112 travellers moving as one.',
    image: canyonAerial,
    video: DRONE_VIDEO,
  },
  adventure: {
    kicker: ['Day 4', '3 April 2027'],
    title: 'Choose Your Adventure. Your morning, your way.',
    image: images.silfra,
  },
  stay: {
    kicker: ['Reykjavík', 'Four Nights'],
    title: 'Stay & Experiences. The places that build the anticipation.',
    image: images.auroraSky,
  },
  enquire: {
    kicker: ['Enquire', 'One form, one reply'],
    title: 'Ask the retreat desk anything about Iceland 2027.',
    image: images.reykjavikCity,
  },
  travelDesk: {
    kicker: ['Plan · Pack', 'Arrive'],
    title: 'Travel Desk. Everything members repeatedly ask, in one place.',
    image: images.keflavik,
  },
  family: {
    kicker: ['49 EO Members', 'Spouses · Kids'],
    title: '112 People. One Iceland Adventure.',
    image: images.kirkjufell,
  },
  updates: {
    kicker: ['Announcements', 'Deadlines · Help'],
    title: 'Updates & Help. Stay in the loop.',
    image: images.strokkur,
  },
};


/** Iceland Essentials as icon tiles (title = the item from the brief). */
export const essentialIcons = [
  { icon: 'Layers', title: '2 thermal sets', desc: 'Base layer' },
  { icon: 'Shirt', title: 'Insulated jacket / parka', desc: 'Waterproof outer' },
  { icon: 'CloudRain', title: 'Waterproof trousers', desc: 'Outer layer' },
  { icon: 'Flame', title: 'Fleece or wool mid-layer', desc: 'Mid layer' },
  { icon: 'Shirt', title: '2–3 sweaters / knits', desc: 'Evenings' },
  { icon: 'Footprints', title: 'Waterproof boots', desc: 'Footwear' },
  { icon: 'Snowflake', title: 'Wool socks', desc: 'Footwear' },
  { icon: 'Hand', title: 'Gloves', desc: 'Accessories' },
  { icon: 'Snowflake', title: 'Beanie', desc: 'Accessories' },
  { icon: 'Wind', title: 'Neck warmer', desc: 'Accessories' },
  { icon: 'Glasses', title: 'Sunglasses', desc: 'Glacier glare' },
  { icon: 'Waves', title: 'Swimwear', desc: 'Sky Lagoon' },
  { icon: 'Backpack', title: 'Compact day backpack', desc: 'Every day' },
];

/** Compact travel-desk topics for the home page tiles. */
export const deskIcons = [
  { icon: 'Plane', title: 'Flights', desc: 'Into Keflavík (KEF) by 5 PM, 31 Mar' },
  { icon: 'FileCheck', title: 'Visa', desc: 'Schengen · apply early' },
  { icon: 'ShieldCheck', title: 'Insurance', desc: 'Winter + adventure cover' },
  { icon: 'CloudSun', title: 'Weather', desc: '−1 °C to 5 °C · wind' },
  { icon: 'Backpack', title: 'What to pack', desc: 'Warm + waterproof + windproof' },
  { icon: 'BusFront', title: 'Transfers', desc: 'Private · approx. 50 min' },
];

export const pageImages = { glacierLagoon, skogafoss, diamondBeach, iceCave, vik, posterCover, auroraDinner, canyonRiver, canyonAerial, canyonPlateau, ...images };
