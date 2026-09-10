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
    title: 'The Journey. Five days, one chapter, 114 travellers moving as one.',
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
  extensions: {
    kicker: ['Extensions', 'Before or after'],
    title: 'Stay longer. Three curated extensions, booked separately.',
    image: diamondBeach,
  },
  essentials: {
    kicker: ['Iceland Essentials', 'Pack · Wear'],
    title: 'Warm, waterproof, windproof. Everything to pack and what to wear each day.',
    image: images.langjokull,
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
    title: '114 People. One Iceland Adventure.',
    image: images.kirkjufell,
  },
  accounts: {
    kicker: ['Accounts', 'Invoices · Payments'],
    title: 'Accounts & Payments. What is due, when, and how to get your invoice.',
    image: images.harpa,
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
];

/**
 * Iceland Essentials, drawn rather than iconified (components/Garments.jsx). `group` sorts the
 * thirteen things into how you actually pack them.
 */
export const essentialGarments = [
  { art: 'Thermals', name: '2 thermal sets', note: 'Base layer, worn under everything', group: 'Layers' },
  { art: 'Fleece', name: 'Fleece or wool mid-layer', note: 'The warm middle', group: 'Layers' },
  { art: 'Sweater', name: '2–3 sweaters or knits', note: 'Evenings and dinners', group: 'Layers' },
  { art: 'Parka', name: 'Insulated jacket or parka', note: 'Waterproof and windproof outer', group: 'Outer shell' },
  { art: 'Trousers', name: 'Waterproof trousers', note: 'Glacier day and every excursion', group: 'Outer shell' },
  { art: 'Boots', name: 'Waterproof boots', note: 'Grip matters more than looks', group: 'Feet' },
  { art: 'Socks', name: 'Wool socks', note: 'Several pairs, thicker than you think', group: 'Feet' },
  { art: 'Gloves', name: 'Gloves', note: 'Windproof, and a thin pair underneath', group: 'Extremities' },
  { art: 'Beanie', name: 'Beanie', note: 'Covering the ears', group: 'Extremities' },
  { art: 'NeckWarmer', name: 'Neck warmer', note: 'Better than a scarf in wind', group: 'Extremities' },
  { art: 'Sunglasses', name: 'Sunglasses', note: 'Glacier glare is real', group: 'Extras' },
  { art: 'Swimwear', name: 'Swimwear', note: 'Sky Lagoon, day three', group: 'Extras' },
  { art: 'Backpack', name: 'Compact day backpack', note: 'Every day out', group: 'Extras' },
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
