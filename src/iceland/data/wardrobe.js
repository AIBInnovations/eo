/**
 * Day-by-day wardrobe planner, structured for the visual cards: one scene photograph, the plan,
 * and each part of the day as a list of garments with an icon (lucide names, see icons.jsx).
 * Copy is the same as the brief's planner — only split into scannable pieces.
 */
import { images } from './retreat.js';

export const wardrobeDays = [
  {
    day: 'Day 1',
    date: '31 March',
    plan: 'Arrival + Aurora Basecamp dinner & after-party',
    image: images.auroraDinner,
    alt: 'Northern lights over a church in south Iceland',
    looks: [
      {
        when: 'Travel',
        items: [
          { icon: 'Layers', label: 'Warm smart-casual layers' },
          { icon: 'CloudRain', label: 'Puffer or parka' },
          { icon: 'Footprints', label: 'Waterproof shoes' },
        ],
      },
      {
        when: 'Evening · Aurora Basecamp',
        note: 'Stylish winter casual',
        items: [
          { icon: 'Layers', label: 'Thermals' },
          { icon: 'Shirt', label: 'Knit or sweater' },
          { icon: 'Shirt', label: 'Trousers or jeans' },
          { icon: 'Sparkles', label: 'Statement winter jacket' },
          { icon: 'Footprints', label: 'Boots' },
          { icon: 'Hand', label: 'Gloves + beanie handy' },
        ],
      },
    ],
  },
  {
    day: 'Day 2',
    date: '1 April',
    plan: 'Golden Circle + monster truck + snowmobiling + glacier + private dinner',
    image: images.monsterTruck,
    alt: 'Glacier truck on Langjökull',
    looks: [
      {
        when: 'Day · on the glacier',
        items: [
          { icon: 'Layers', label: 'Thermal base layers' },
          { icon: 'Flame', label: 'Fleece or wool mid-layer' },
          { icon: 'CloudRain', label: 'Waterproof insulated jacket' },
          { icon: 'CloudRain', label: 'Waterproof trousers' },
          { icon: 'Snowflake', label: 'Wool socks' },
          { icon: 'Footprints', label: 'Snow boots' },
          { icon: 'Hand', label: 'Gloves' },
          { icon: 'Snowflake', label: 'Beanie' },
        ],
      },
      {
        when: 'Dinner',
        note: 'Change into smart casual',
        items: [
          { icon: 'Shirt', label: 'Shirt, polo or knit' },
          { icon: 'Shirt', label: 'Trousers' },
          { icon: 'Wind', label: 'Jacket or overcoat' },
        ],
      },
    ],
  },
  {
    day: 'Day 3',
    date: '2 April',
    plan: 'Sky Lagoon + Reykjavík leisure + Harpa dinner',
    image: images.harpa,
    alt: 'Harpa concert hall, Reykjavík',
    looks: [
      {
        when: 'Lagoon',
        items: [
          { icon: 'Waves', label: 'Swimwear' },
          { icon: 'Shirt', label: 'Easy change clothes or slides' },
        ],
      },
      {
        when: 'Afternoon',
        items: [{ icon: 'Sun', label: 'Chic Reykjavík casual' }],
      },
      {
        when: 'Evening at Harpa',
        note: 'The dressiest night',
        items: [
          { icon: 'Gem', label: 'Blazer or suit separates' },
          { icon: 'Sparkles', label: 'Elegant dress or trouser ensemble' },
          { icon: 'Wind', label: 'Sophisticated overcoat' },
        ],
      },
    ],
  },
  {
    day: 'Day 4',
    date: '3 April',
    plan: 'Breakout activities + treasure hunt + farewell dinner & after-party',
    image: images.silfra,
    alt: 'Snorkellers in the Silfra fissure',
    looks: [
      {
        when: 'Morning · your breakout',
        note: 'Activity-specific outdoor gear',
        items: [
          { icon: 'Layers', label: 'Thermals' },
          { icon: 'CloudRain', label: 'Waterproof layers' },
          { icon: 'Footprints', label: 'Boots' },
        ],
      },
      {
        when: 'Evening · farewell',
        note: 'Party chic — elevated cocktail attire, not black-tie',
        items: [
          { icon: 'Sparkles', label: 'Statement jacket or dress' },
          { icon: 'Music', label: 'Comfortable party shoes' },
        ],
      },
    ],
  },
  {
    day: 'Day 5',
    date: '4 April',
    plan: 'Breakfast + airport',
    image: images.keflavik,
    alt: 'Icelandair aircraft at Keflavík',
    looks: [
      {
        when: 'Travel',
        note: 'Comfortable travel look',
        items: [
          { icon: 'Shirt', label: 'Sweatshirt or knit' },
          { icon: 'Shirt', label: 'Trousers' },
          { icon: 'Footprints', label: 'Sneakers or boots' },
          { icon: 'Plane', label: 'Puffer jacket' },
        ],
      },
    ],
  },
];
