import glacierLagoon from '../../assets/iceland/glacier-lagoon.webp';
import skogafoss from '../../assets/iceland/skogafoss-waterfall.webp';
import diamondBeach from '../../assets/iceland/diamond-beach.webp';
import iceCave from '../../assets/iceland/katla-ice-cave.webp';
import vik from '../../assets/iceland/vik-village.webp';
import amsterdam from '../../assets/iceland/amsterdam-canal.webp';
import copenhagen from '../../assets/iceland/copenhagen-nyhavn.webp';
import posterCover from '../../assets/iceland/poster-cover.webp';
import auroraDinner from '../../assets/iceland/aurora-basecamp-dinner.webp';
import auroraSky from '../../assets/iceland/aurora-sky.webp';
import canyonRiver from '../../assets/iceland/canyon-river.webp';
import canyonAerial from '../../assets/iceland/canyon-aerial.webp';
import canyonPlateau from '../../assets/iceland/canyon-plateau.webp';
import heroPoster from '../../assets/iceland/hero-poster.webp';
import reykjavikHarbour from '../../assets/iceland/reykjavik-harbour.webp';
import reykjavikCity from '../../assets/iceland/reykjavik-city.webp';
import reykjavikStreet from '../../assets/iceland/reykjavik-street.webp';
import harpa from '../../assets/iceland/harpa-concert-hall.webp';
import skyLagoon from '../../assets/iceland/sky-lagoon.webp';
import thingvellir from '../../assets/iceland/thingvellir.webp';
import gullfoss from '../../assets/iceland/gullfoss.webp';
import strokkur from '../../assets/iceland/strokkur.webp';
import langjokull from '../../assets/iceland/langjokull.webp';
import fridheimar from '../../assets/iceland/fridheimar.webp';
import silfra from '../../assets/iceland/silfra.webp';
import lavaTunnel from '../../assets/iceland/lava-tunnel.webp';
import horses from '../../assets/iceland/icelandic-horses.webp';
import atvTerrain from '../../assets/iceland/atv-snow.jpeg';
import mohitPhoto from '../../assets/portraits/mohit.jpeg';
import vidurPhoto from '../../assets/portraits/vidur.jpeg';
import munishPhoto from '../../assets/portraits/munish.jpeg';
import keflavik from '../../assets/iceland/keflavik-airport.webp';
import kirkjufell from '../../assets/iceland/kirkjufell.webp';
import sunVoyager from '../../assets/iceland/sun-voyager.webp';
import monsterTruck from '../../assets/iceland/monster-truck.webp';
import snowmobiling from '../../assets/iceland/snowmobiling.webp';

// ---------------------------------------------------------------------------
// Hero — act 1: the reference site's door animation (287 frames) opens and the camera walks in;
// act 2: the FPV canyon flight plays inside — last 15 s of the clip minus its first 2 s,
// motion-interpolated to 60 fps with motion blur (773 frames, 1280 px).
// ---------------------------------------------------------------------------
export const FRAME_COUNT = 773;
export const heroFrames = Array.from({ length: FRAME_COUNT }, (_, i) => `/frames/iceland/f_${String(i + 1).padStart(4, '0')}.webp`);
export const DOOR_FRAME_COUNT = 287;
export const doorFrames = Array.from({ length: DOOR_FRAME_COUNT }, (_, i) => `/lottie/door/images/image_${i}.webp`);
/**
 * Phone / low-power sets. The footage stays full size: the clip is 16:9 and a phone is portrait, so
 * the canvas only ever shows a tall slice of each frame — a 720 px copy leaves ~230 px of real
 * detail to stretch over the screen and looks soft. Half the frames at full size is the trade that
 * keeps it sharp. The door art is wide and flat, so its 960 px copies hold up.
 */
export const heroFramesSm = heroFrames.filter((_, i) => i % 2 === 0);
export const doorFramesSm = Array.from({ length: DOOR_FRAME_COUNT }, (_, i) => `/lottie/door/images-sm/image_${i}.webp`);

export const hero = {
  eyebrow: 'EO Punjab Retreat × Amplify',
  dates: '31 March – 4 April 2027',
  location: 'Reykjavík, Iceland',
  title: 'Land of Fire & Ice.',
  subtitle: 'An EO Experience Like No Other.',
  stats: ['114 Travellers', '49 EO Members & Families', '4 Extraordinary Nights'],
  startsAt: '2027-03-31T18:30:00Z', // Iceland runs on UTC all year
  poster: heroPoster,
  panels: [
    {
      key: '_02',
      title: 'Iceland Unexpected.',
      text: 'Same destination. We added a little chaos. Northern lights over a private dinner, monster trucks onto a glacier, the dressiest night of the year inside Harpa, and a treasure hunt through Reykjavík.',
    },
    {
      key: '_03',
      title: 'Where Fire Meets Ice, and EO Meets Family.',
      text: 'Four nights across Reykjavík, the Golden Circle and Langjökull glacier, designed for 114 travellers to move as one. Everything you need is on this site, and the retreat desk is one enquiry away.',
    },
  ],
  card: {
    image: posterCover,
    alt: 'Iceland Unexpected – EO Punjab Retreat poster',
    label: 'Retreat starts',
    title: '6:30 PM · 31 March 2027',
    cta: 'Download itinerary',
    href: '/downloads/EO-Punjab-Iceland-2027-Itinerary.pdf',
    meta: ['Arrive in Reykjavík by 5:00 PM', 'Ends after breakfast, 4 April'],
  },
};

// ---------------------------------------------------------------------------
// The Journey — day-by-day (from the retreat itinerary PDF)
// ---------------------------------------------------------------------------
export const days = [
  {
    number: '01',
    date: '31 March',
    title: 'Arrival & Aurora Basecamp',
    subtitle: 'Arrival → The Reykjavik EDITION → Aurora Basecamp → Private Dinner & After-Party',
    tagline: 'First night. Zero chill.',
    image: auroraDinner,
    alt: 'Northern lights over a church in Vík, south Iceland',
    gallery: [{ image: reykjavikHarbour, name: 'Reykjavík', caption: 'Check in at The Reykjavik EDITION' }, { image: auroraSky, name: 'Aurora Basecamp', caption: 'Private dinner under the lights' }, { image: sunVoyager, name: 'Sun Voyager', caption: 'A walk from the hotel' }],
    timeline: [
      { time: 'On arrival', label: 'Private transfer from Keflavík to The Reykjavik EDITION (approx. 50 min). Check in, relax and unwind.' },
      { time: '5:00 PM', label: 'Recommended latest arrival in Reykjavík.' },
      { time: '6:30 PM', label: 'The retreat begins.' },
      { time: '7:30 PM', label: 'Depart the hotel for Aurora Basecamp, approx. 30 minutes away.' },
      { time: 'Evening', label: 'Private dinner in a unique Arctic setting, followed by an exclusive after-party: DJ, drinks, music and entertainment under the Icelandic sky.' },
    ],
    expect: ['Warm smart-casual layers for travel', 'Stylish winter casual for the evening: thermals, knit, statement winter jacket, boots', 'Keep gloves and beanie handy', 'Overnight in Reykjavík'],
  },
  {
    number: '02',
    date: '1 April',
    title: 'The Golden Circle & the Glacier',
    subtitle: 'Golden Circle → Thingvellir → Friðheimar → Monster Truck → Snowmobiling → Gullfoss → Strokkur → Private Dinner',
    tagline: 'Walk between two continents. Then ride a glacier.',
    image: gullfoss,
    alt: 'Gullfoss waterfall, Golden Circle',
    gallery: [{ image: thingvellir, name: 'Thingvellir', caption: 'Walk between two continents' }, { image: fridheimar, name: 'Friðheimar', caption: 'Lunch in the tomato greenhouse' }, { image: monsterTruck, name: 'Monster Truck', caption: 'Up to the top of Langjökull' }, { image: snowmobiling, name: 'Snowmobiling', caption: 'Across the glacier' }, { image: strokkur, name: 'Strokkur', caption: 'Erupts every few minutes' }],
    timeline: [
      { time: 'Morning', label: 'Breakfast, then a full-day excursion through the highlights of the Golden Circle.' },
      { time: 'Late morning', label: 'Thingvellir National Park: walk from North America to Europe across the rift where the tectonic plates drift apart.' },
      { time: '12:00 PM', label: 'Lunch at Friðheimar Tomato Farm: tomato soup with freshly baked bread, cucumber salsa and a spread of tomato-based dishes.' },
      { time: 'Afternoon', label: 'Board a Monster Truck to the top of Langjökull glacier for snowmobiling. Thermal overalls, gloves and helmets are provided.' },
      { time: 'Late afternoon', label: 'Quick stop at Gullfoss Falls, then the Geysir thermal area, where Strokkur shoots superheated water more than 20 metres into the air every few minutes.' },
      { time: 'Evening', label: 'Dinner at a private venue, a short walk from the hotel.' },
    ],
    expect: ['Thermal base layers + fleece or wool mid-layer', 'Waterproof insulated jacket, waterproof trousers, snow boots', 'Wool socks, gloves, beanie; change into smart casual for dinner', 'Overnight in Reykjavík'],
  },
  {
    number: '03',
    date: '2 April',
    title: 'Sky Lagoon & Harpa',
    subtitle: 'Sky Lagoon → Pósthús → Lava Tunnel → Harpa Dinner',
    tagline: 'Slow morning. Big night.',
    image: skyLagoon,
    alt: 'Geothermal lagoon in Iceland',
    gallery: [{ image: skyLagoon, name: 'Sky Lagoon', caption: 'Warm geothermal waters' }, { image: lavaTunnel, name: 'Lava Tunnel', caption: 'Raufarhólshellir, 3 PM' }, { image: harpa, name: 'Harpa', caption: 'The dressiest night' }],
    timeline: [
      { time: 'Morning', label: 'Breakfast at the hotel.' },
      { time: '11:30 AM', label: 'Sky Lagoon: warm geothermal waters framed by dramatic coastal scenery, and a taste of Iceland’s bathing culture.' },
      { time: '2:00 PM', label: 'Lunch at Pósthús Food Hall in the heart of Reykjavík, choosing from sushi, Italian, Mexican and more.' },
      { time: '3:00 PM', label: 'Leave the hotel for the Lava Tunnel: walk the path of lava that flowed during the Leitahraun eruption about 5,200 years ago, deep inside Raufarhólshellir.' },
      { time: '6:00 PM', label: 'Return to the hotel and change for the evening.' },
      { time: '8:00 PM', label: 'Dinner at Harpa Concert Hall, Reykjavík’s landmark of glass on the harbour. The dressiest night of the retreat.' },
    ],
    expect: ['Swimwear and easy change clothes for the lagoon', 'Warm layers and sturdy footwear for the Lava Tunnel; helmets and lights provided', 'Harpa: blazer or suit separates; elegant dress or trouser ensemble, plus a sophisticated overcoat', 'Overnight in Reykjavík'],
  },
  {
    number: '04',
    date: '3 April',
    title: 'Choose Your Adventure & Farewell',
    subtitle: 'Breakouts → Snorkelling / Horse Riding / ATV → Lunch → Reykjavík Treasure Hunt → Farewell Dinner & After-Party',
    tagline: 'Your morning, your way.',
    image: silfra,
    alt: 'Snorkellers in the Silfra fissure, Thingvellir',
    gallery: [{ image: silfra, name: 'Silfra', caption: 'Snorkel between the plates' }, { image: lavaTunnel, name: 'Lava Tunnel', caption: 'Raufarhólshellir' }, { image: horses, name: 'Icelandic horses', caption: 'Volcanic scenery on horseback' }, { image: atvTerrain, name: 'ATV', caption: 'Adventure across snowy terrain' }],
    timeline: [
      { time: 'Morning', label: 'Breakout activities: snorkelling at Silfra, the Lava Tunnel, Icelandic horse riding or an ATV adventure. Or simply explore Reykjavík.' },
      { time: 'Lunch', label: 'Regroup in Reykjavík for a relaxed lunch at a local restaurant and a taste of Icelandic flavours.' },
      { time: 'Afternoon', label: 'Reykjavík Treasure Hunt: follow a trail of clues through hidden corners and landmarks, with a little friendly competition.' },
      { time: 'Evening', label: 'Farewell dinner and after-party at a private venue, a short walk from the hotel. Great food, music and celebration.' },
    ],
    expect: ['Activity-specific outdoor gear in the morning: thermals, waterproof layers, boots', 'Party chic in the evening: elevated cocktail attire, not black-tie', 'Comfortable party shoes', 'Overnight in Reykjavík'],
  },
  {
    number: '05',
    date: '4 April',
    title: 'Breakfast & Departures',
    subtitle: 'Breakfast → Departures',
    tagline: 'Until the next one.',
    image: keflavik,
    alt: 'Departures from Keflavík',
    gallery: [{ image: kirkjufell, name: 'Until next time', caption: 'Kirkjufell, Snæfellsnes' }, { image: canyonAerial, name: 'Stuðlagil', caption: 'Basalt canyon, east Iceland' }, { image: diamondBeach, name: 'Diamond Beach', caption: 'South Coast extension' }],
    timeline: [
      { time: 'Morning', label: 'Breakfast at the hotel and check out.' },
      { time: 'Departure', label: 'Private transfer from the hotel to Keflavík International Airport, timed to your onward flight.' },
    ],
    expect: ['Comfortable travel look: sweatshirt or knit, trousers, sneakers or boots, puffer jacket'],
  },
];

// ---------------------------------------------------------------------------
// Choose Your Adventure — Day 4 breakouts
// ---------------------------------------------------------------------------
export const activities = [
  {
    id: 'silfra',
    name: 'Snorkelling at Silfra',
    location: 'Thingvellir National Park',
    duration: 'Approx. 5 hours incl. transfers',
    level: 'Moderate · in-water',
    wear: 'Thermal base layer and wool socks under the dry suit (provided); a dry change of clothes',
    age: 'Minimum age and swimming ability set by the operator',
    text: 'Snorkel the rift between the North American and European tectonic plates in water so clear that visibility reaches up to 100 metres.',
    image: silfra,
    alt: 'Snorkellers in the Silfra fissure',
  },
  {
    id: 'horse-riding',
    name: 'Icelandic Horse Riding',
    location: 'Volcanic landscapes near Reykjavík',
    duration: 'Approx. 3 hours incl. transfers',
    level: 'Easy to moderate · riding',
    wear: 'Waterproof outer layers, warm mid-layer, closed boots; helmets provided',
    age: 'Rider age and weight limits set by the stable',
    text: 'Ride through dramatic volcanic scenery on the back of Iceland’s iconic, sure-footed Icelandic horses.',
    image: horses,
    alt: 'Icelandic horse in winter',
  },
  {
    id: 'atv',
    name: 'ATV Adventure',
    location: 'Black sand and lava fields outside Reykjavík',
    duration: 'Approx. 3.5 hours incl. transfers',
    level: 'Moderate · driving',
    wear: 'Warm waterproof layers and boots; overalls, helmets and gloves provided',
    age: 'Drivers need a valid driving licence; passenger age limits set by the operator',
    text: 'Set out across Iceland’s rugged terrain on an exhilarating ATV ride, taking in spectacular landscapes along the way.',
    image: atvTerrain,
    alt: 'ATV riders crossing snow-covered terrain',
  },
];

// ---------------------------------------------------------------------------
// Stay & Experiences
// ---------------------------------------------------------------------------
export const stays = [
  { name: 'The Reykjavik EDITION', caption: 'Home for four nights', image: reykjavikHarbour, alt: 'Reykjavík harbourfront' },
  { name: 'Aurora Basecamp', caption: 'Night one, under the Arctic sky', image: auroraSky, alt: 'Northern lights over Kirkjufell' },
  { name: 'Langjökull Glacier', caption: 'Monster trucks and snowmobiles', image: langjokull, alt: 'Langjökull glacier' },
  { name: 'Sky Lagoon', caption: 'Geothermal waters by the sea', image: skyLagoon, alt: 'Geothermal lagoon' },
  { name: 'Harpa Concert Hall', caption: 'The dressiest night', image: harpa, alt: 'Harpa concert hall, Reykjavík' },
  { name: 'The Golden Circle', caption: 'Thingvellir, Gullfoss, Strokkur', image: gullfoss, alt: 'Gullfoss waterfall' },
];

// ---------------------------------------------------------------------------
// Travel Desk
// ---------------------------------------------------------------------------
export const keyTimes = [
  { label: 'Recommended arrival', value: 'Reykjavík by 5:00 PM, 31 March' },
  { label: 'Retreat starts', value: '6:30 PM, 31 March' },
  { label: 'Retreat ends', value: 'Breakfast, 4 April' },
];

/** The two desks members deal with: the retreat planner and the flight agent. */
/**
 * "Who to contact" — the table the retreat chairs circulated. Rendered by ContactTable.jsx and
 * reproduced in the itinerary PDF. `people` holds one or two names per row.
 */
export const contactTable = [
  { for: 'Stay extensions', people: [{ name: 'Mallika Iyyer', role: 'The Villa Escape', phone: '+91 98200 43566', tel: 'tel:+919820043566' }] },
  { for: 'Flight bookings', people: [{ name: 'Rishita', role: 'EaseMyTrip', phone: '+91 62001 50904', tel: 'tel:+916200150904' }] },
  { for: 'Accounts, invoicing and payment queries', people: [{ name: 'Mayanka', role: 'Chapter Manager · EO Punjab', phone: '+91 98738 91512', tel: 'tel:+919873891512' }] },
  {
    for: 'Upgrades, about the retreat and any other queries',
    people: [
      { name: 'Vidur Varma', role: 'Retreat Chair · EO Punjab', phone: '+91 73556 88888', tel: 'tel:+917355688888', portrait: 'vidur' },
      { name: 'Munish Dua', role: 'Retreat Chair · EO Punjab', phone: '+91 98155 55575', tel: 'tel:+919815555575', portrait: 'munish' },
    ],
  },
  { for: 'All escalations', people: [{ name: 'Mohit Saharan', role: 'President · EO Punjab', phone: '+91 98155 05000', tel: 'tel:+919815505000', portrait: 'mohit' }] },
  { for: 'Day-to-day permissions', people: [{ name: 'Call your spouse', role: 'IYKYK', phone: '', tel: '' }], light: true },
];

export const partners = [
  {
    id: 'villa-escape',
    role: 'Retreat Planner',
    org: 'The Villa Escape',
    contact: 'Mallika Iyyer',
    phone: '+91 98200 43566',
    tel: 'tel:+919820043566',
    text: 'Plans and runs the retreat on the ground: hotels, transfers, activities and the day-by-day programme.',
  },
  {
    id: 'easemytrip',
    role: 'Flight Bookings',
    org: 'EaseMyTrip',
    contact: 'Rishita',
    phone: '+91 6200 150 904',
    tel: 'tel:+916200150904',
    logo: true,
    text: 'EO Punjab’s annual travel partner, available to book your flights into Keflavík (KEF) and hold the group fares.',
    note: 'Booking your flights through EaseMyTrip is not compulsory. You are free to book your own tickets — just share the final itinerary with the retreat desk so your airport transfer can be arranged.',
  },
];

export const flightDesk = {
  title: 'Flight assistance',
  agency: 'EaseMyTrip',
  contact: 'Rishita',
  phone: '+91 6200 150 904',
  tel: 'tel:+916200150904',
  text: 'Book flights into Keflavík (KEF) to land by the afternoon of 31 March. Share your itinerary with the retreat team so your airport transfer can be scheduled.',
};

export const travelDesk = [
  { title: 'Flights', text: 'Fly into Keflavík International Airport (KEF). Aim to arrive in Reykjavík by 5:00 PM on 31 March and depart after breakfast on 4 April. Share your ticket with the retreat team as soon as it is booked.' },
  { title: 'Visa guidance', text: 'Iceland is part of the Schengen area. Indian passport holders need a Schengen visa; apply well ahead of travel with your hotel confirmation, itinerary and insurance.' },
  { title: 'Travel insurance', text: 'Comprehensive travel insurance is required for every traveller, with cover for winter and adventure activities such as snowmobiling, snorkelling and ATV riding.' },
  { title: 'Weather', text: 'Late March in Reykjavík is typically between −1 °C and 5 °C, with strong wind, sudden rain or snow, and about 13 hours of daylight. Dress in layers and expect the weather to change during the day.' },
  { title: 'What to pack', text: 'Start from the Iceland Essentials list below. Priority for the glacier day is warm + waterproof + windproof, not fashion winterwear.' },
  { title: 'Currency & cards', text: 'The currency is the Icelandic króna (ISK). Cards and contactless payment are accepted almost everywhere, so very little cash is needed.' },
  { title: 'SIM / eSIM', text: 'An eSIM with Europe or Iceland data is the easiest option and can be set up before you fly. Local SIMs are available at Keflavík Airport.' },
  { title: 'Airport transfers', text: 'Private transfers between Keflavík and The Reykjavik EDITION (approx. 50 minutes) are arranged for every arrival and departure based on the flight details you share.' },
  { title: 'Emergency contacts', text: 'Dial 112 for police, ambulance or fire anywhere in Iceland. The retreat team and travel agent numbers are listed under Updates & Help.' },
];

export const essentials = {
  title: 'Iceland Essentials',
  intro: 'Every traveller should ideally carry:',
  items: ['2 thermal sets', 'Waterproof insulated jacket or parka', 'Waterproof trousers', 'Fleece or wool mid-layer', '2–3 sweaters or knits', 'Waterproof boots', 'Wool socks', 'Gloves', 'Beanie', 'Neck warmer', 'Sunglasses', 'Swimwear', 'Compact day backpack'],
  notes: [
    'For the snowmobiling and glacier day, do not rely on fashion winterwear. The priority is warm + waterproof + windproof. Thermal overalls, gloves and helmets are provided for snowmobiling, but arrive properly layered underneath.',
    'Separate guidance for the Day 4 breakouts will follow once you choose between Silfra snorkelling, horse riding and the ATV adventure, because footwear and layering requirements differ.',
  ],
};

export const wardrobe = [
  { date: '31 Mar – Day 1', plan: 'Arrival + Aurora Basecamp Dinner & After-Party', look: 'Travel: warm smart-casual layers, puffer or parka, waterproof shoes. Evening: stylish winter casual, thermals + knit or sweater + trousers or jeans + statement winter jacket + boots. Keep gloves and beanie handy.' },
  { date: '1 Apr – Day 2', plan: 'Golden Circle + Monster Truck + Snowmobiling + Glacier + Private Dinner', look: 'Day: thermal base layers + fleece or wool mid-layer + waterproof insulated jacket + waterproof trousers + wool socks + snow boots + gloves + beanie. Dinner: change into smart casual, shirt, polo or knit + trousers + jacket or overcoat.' },
  { date: '2 Apr – Day 3', plan: 'Sky Lagoon + Reykjavík Leisure + Harpa Dinner', look: 'Lagoon: swimwear + easy change clothes or slides. Afternoon: chic Reykjavík casual. Evening at Harpa, the dressiest night: blazer or suit separates for men; elegant dress or trouser ensemble for women + sophisticated overcoat.' },
  { date: '3 Apr – Day 4', plan: 'Breakout Activities + Treasure Hunt + Farewell Dinner & After-Party', look: 'Morning: activity-specific outdoor gear; thermals + waterproof layers + boots. Evening: party chic, elevated cocktail attire but not black-tie. Statement jacket or dress + comfortable party shoes.' },
  { date: '4 Apr – Day 5', plan: 'Breakfast + Airport', look: 'Comfortable travel look: sweatshirt or knit + trousers + sneakers or boots + puffer jacket.' },
];

export const addOns = [
  { name: 'Upgrade to Suite', text: 'Move up to a suite at The Reykjavik EDITION for the four retreat nights.' },
  { name: 'Upgrade to Loft Room', text: 'Double-height loft rooms with harbour or city views.' },
  { name: 'Upgrade to Terrace King', text: 'A king room with a private terrace over Reykjavík.' },
  { name: 'Add another night', text: 'Extend your stay before or after the retreat, with transfers adjusted to your new flights.' },
];

export const extensions = [
  {
    id: 'south-coast',
    name: 'South Coast Iceland',
    caption: 'Waterfalls, black sand, the glacier lagoon and an ice cave, with three nights in Vík.',
    length: '4 days · from Reykjavík',
    image: glacierLagoon,
    alt: 'Iceberg on the Jökulsárlón glacier lagoon',
    href: '/downloads/Extension-South-Coast-Iceland.pdf',
    highlights: ['Seljalandsfoss and Skógafoss waterfalls', 'Reynisfjara black sand beach', 'Jökulsárlón glacier lagoon and Diamond Beach', 'Katla Ice Cave by superjeep, ATV to the Sólheimasandur plane wreck', 'Three nights in Vík'],
  },
  {
    id: 'amsterdam',
    name: 'Amsterdam',
    caption: 'Canals, museums and the Nine Streets, with a day out to Giethoorn.',
    length: '4 days · 3 nights',
    image: amsterdam,
    alt: 'Amsterdam canal houses at sunset',
    href: '/downloads/Extension-Amsterdam.pdf',
    highlights: ['Evening cocktail cruise on the UNESCO-listed canals', 'Private walking tour, Rijksmuseum or Van Gogh Museum, Heineken Experience', 'Jordaan, the Nine Streets and Amsterdam’s clubs', 'Day trip to Giethoorn, the Dutch Venice', 'Farewell dinner'],
  },
  {
    id: 'copenhagen',
    name: 'Copenhagen',
    caption: 'Harbour, palaces and Tivoli, with a day across the Øresund to Malmö and Lund.',
    length: '4 days · 3 nights',
    image: copenhagen,
    alt: 'Nyhavn harbourfront in Copenhagen',
    href: '/downloads/Extension-Copenhagen.pdf',
    highlights: ['Private chartered canal cruise or self-drive eco boats', 'Segway tour or Rosenborg Castle, Amalienborg Palace and the Marble Church', 'Freetown Christiania and an evening at Tivoli Gardens', 'Day trip across the Øresund Bridge to Malmö and Lund', 'Nyhavn, Strøget and a farewell dinner'],
  },
];

// ---------------------------------------------------------------------------
// The EO Punjab Family
// ---------------------------------------------------------------------------
export const family = {
  headline: '114 People. One Iceland Adventure.',
  counts: [
    { value: '49', label: 'EO Members' },
    { value: '114', label: 'Travellers' },
    { value: '4', label: 'Nights' },
  ],
  text: 'Members, spouses and kids, travelling as one chapter. Member and couple photographs with names will fill this wall before departure, and during the retreat it becomes the live photo wall.',
  memberCount: 49,
};

// ---------------------------------------------------------------------------
// Updates & Help
// ---------------------------------------------------------------------------
export const announcements = [
  { date: 'Latest', title: 'Retreat website is live', text: 'Everything about Iceland 2027 now lives here: the day-by-day journey, breakout activities, travel desk and an enquiry desk that answers everything else.' },
  { date: 'Next', title: 'Choose your Day 4 breakout', text: 'Pick between Silfra snorkelling, the Lava Tunnel, horse riding and the ATV adventure under Choose Your Adventure. Slots are confirmed in order of selection.' },
  { date: 'Reminder', title: 'Share flight details and passport copies', text: 'Transfers and hotel registration are prepared from the details you share with the retreat desk.' },
];

export const deadlines = [
  { label: 'Tranche 2 payment', when: '30 Nov 2026' },
  { label: 'Tranche 3 payment (balance)', when: '05 Feb 2026' },
  { label: 'Breakout activity selection', when: 'To be announced' },
  { label: 'Flight details, passport copies and insurance', when: 'To be announced' },
];

export const downloads = [
  { label: 'Final itinerary (PDF)', href: '/downloads/EO-Punjab-Iceland-2027-Itinerary.pdf' },
  { label: 'South Coast Iceland extension (PDF)', href: '/downloads/Extension-South-Coast-Iceland.pdf' },
  { label: 'Amsterdam extension (PDF)', href: '/downloads/Extension-Amsterdam.pdf' },
  { label: 'Copenhagen extension (PDF)', href: '/downloads/Extension-Copenhagen.pdf' },
];

export const faqs = [
  { q: 'When should I arrive and when does it end?', a: 'Plan to be in Reykjavík by 5:00 PM on 31 March. The retreat starts at 6:30 PM that evening and ends after breakfast on 4 April.' },
  { q: 'Are airport transfers included?', a: 'Yes. Private transfers between Keflavík Airport and the hotel are arranged for every traveller based on the flight details you share.' },
  { q: 'Do I need a visa?', a: 'Iceland is in the Schengen area, so Indian passport holders need a Schengen visa. Apply early and reach out to the travel desk if you need supporting documents.' },
  { q: 'How cold will it be?', a: 'Expect roughly −1 °C to 5 °C with wind. Layers matter more than a single heavy coat; see Iceland Essentials and the wardrobe planner.' },
  { q: 'Can I extend my trip?', a: 'Yes. South Coast Iceland, Amsterdam and Copenhagen extensions are available, and extra nights at the hotel can be added before or after the retreat.' },
  { q: 'What if I don’t want a breakout activity on Day 4?', a: 'You can simply spend the morning exploring Reykjavík and rejoin the group for lunch.' },
];

export const contacts = [
  { role: 'Retreat Team', name: 'EO Punjab Retreat Desk', value: 'Contact your retreat chairs on the members’ WhatsApp group' },
  { role: 'Travel Agent', name: 'Rishita · EaseMyTrip', value: '+91 6200 150 904', href: 'tel:+916200150904' },
  { role: 'Emergency assistance', name: 'Iceland emergency services', value: '112', href: 'tel:112' },
];

export const leadership = {
  president: { role: 'President', name: 'Mohit Saharan' },
  chairs: { role: 'Retreat Chairs', name: 'Vidur Varma & Munish Dua' },
};

/**
 * The three people everyone should be able to recognise on the trip. `photo` stays null until the
 * chapter sends portraits — the card falls back to initials, and dropping a file into
 * assets/iceland/people/<id>.webp plus an import here is the only change needed.
 */
export const leaders = [
  { id: 'mohit', name: 'Mohit Saharan', role: 'President · EO Punjab', phone: '+91 98155 05000', tel: 'tel:+919815505000', photo: mohitPhoto },
  { id: 'vidur', name: 'Vidur Varma', role: 'Retreat Chair · EO Punjab', phone: '+91 73556 88888', tel: 'tel:+917355688888', photo: vidurPhoto },
  { id: 'munish', name: 'Munish Dua', role: 'Retreat Chair · EO Punjab', phone: '+91 98155 55575', tel: 'tel:+919815555575', photo: munishPhoto },
];

export const navigation = [
  { href: '/journey', label: 'The Journey', short: 'Journey', anchor: '#journey' },
  { href: '/adventure', label: 'Choose Your Adventure', short: 'Adventure', anchor: '#adventure' },
  { href: '/stay', label: 'Stay & Experiences', short: 'Stay', anchor: '#stay' },
  { href: '/extensions', label: 'Extensions', short: 'Extensions', anchor: '#extensions' },
  { href: '/essentials', label: 'Iceland Essentials', short: 'Essentials', anchor: '#essentials' },
  { href: '/travel-desk', label: 'Travel Desk', short: 'Travel Desk', anchor: '#travel-desk' },
  { href: '/family', label: 'The EO Punjab Family', short: 'Family', anchor: '#family' },
  { href: '/accounts', label: 'Accounts & Payments', short: 'Accounts', anchor: '#accounts' },
  { href: '/updates', label: 'Updates & Help', short: 'Updates', anchor: '#updates' },
  { href: '/enquire', label: 'Enquire', short: 'Enquire', anchor: '#enquire', cta: true },
];

export const images = { canyonAerial, canyonRiver, canyonPlateau, posterCover, auroraDinner, auroraSky, reykjavikHarbour, reykjavikCity, reykjavikStreet, harpa, skyLagoon, thingvellir, gullfoss, strokkur, langjokull, fridheimar, silfra, lavaTunnel, horses, atvTerrain, keflavik, kirkjufell, sunVoyager, monsterTruck, glacierLagoon, skogafoss, diamondBeach, iceCave, vik, amsterdam, copenhagen, heroPoster };
