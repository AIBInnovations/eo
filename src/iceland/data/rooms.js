/**
 * Rooms at The Reykjavik EDITION — every photograph and fact comes from the hotel's own room pages
 * (editionhotels.com/reykjavik/rooms-and-suites). No prices by design: the retreat desk confirms
 * availability and cost on enquiry.
 */
import guestKing from '../../assets/iceland/room-guest-king.webp';
import guestKing2 from '../../assets/iceland/room-guest-king-2.webp';
import guestKing3 from '../../assets/iceland/room-guest-king-3.webp';
import guestDQ from '../../assets/iceland/room-guest-double-queen.webp';
import guestDQ2 from '../../assets/iceland/room-guest-double-queen-2.webp';
import terrace from '../../assets/iceland/room-terrace-king.webp';
import terrace2 from '../../assets/iceland/room-terrace-king-2.webp';
import terrace3 from '../../assets/iceland/room-terrace-king-3.webp';
import deluxeKing from '../../assets/iceland/room-deluxe-king.webp';
import deluxeKing2 from '../../assets/iceland/room-deluxe-king-2.webp';
import deluxeDQ from '../../assets/iceland/room-deluxe-double-queen.webp';
import deluxeDQ2 from '../../assets/iceland/room-deluxe-double-queen-2.webp';
import loft from '../../assets/iceland/room-loft-king.webp';
import loft2 from '../../assets/iceland/room-loft-king-2.webp';
import loft3 from '../../assets/iceland/room-loft-king-3.webp';
import connecting from '../../assets/iceland/room-connecting-family.webp';
import suite from '../../assets/iceland/room-deluxe-suite.webp';
import suite2 from '../../assets/iceland/room-deluxe-suite-2.webp';
import corner from '../../assets/iceland/room-corner-suite.webp';
import corner2 from '../../assets/iceland/room-corner-suite-2.webp';
import corner3 from '../../assets/iceland/room-corner-suite-3.webp';
import ph from '../../assets/iceland/room-penthouse.webp';
import ph2 from '../../assets/iceland/room-penthouse-2.webp';
import ph3 from '../../assets/iceland/room-penthouse-3.webp';
import ph4 from '../../assets/iceland/room-penthouse-4.webp';
import ph5 from '../../assets/iceland/room-penthouse-5.webp';
import ph6 from '../../assets/iceland/room-penthouse-6.webp';

export const hotelIntro =
  'All four retreat nights are at The Reykjavik EDITION on the harbour, next to Harpa: 253 rooms with floor-to-ceiling windows, 26 suites and a penthouse. Upgrades and extra nights are arranged through the retreat desk.';

/** The four things members can ask for. */
export const roomUpgrades = [
  {
    id: 'suite',
    kicker: 'Upgrade',
    name: 'Upgrade to Suite',
    room: 'Deluxe Suite',
    images: [suite, suite2, deluxeKing2],
    alt: 'Deluxe Suite living area at The Reykjavik EDITION',
    text: 'A separate living room and bedroom for the four retreat nights.',
    facts: [
      { icon: 'Maximize2', label: '41–62 sqm (435–660 sqft)' },
      { icon: 'BedDouble', label: 'King bed' },
      { icon: 'Eye', label: 'Scenic view' },
      { icon: 'Sofa', label: 'Living room with 65″ TV' },
      { icon: 'DoorOpen', label: 'Rainfall shower, bathtub and a guest bathroom' },
    ],
    note: 'Corner Suites (78–82 sqm, harbour view, two full bathrooms) on request.',
  },
  {
    id: 'loft',
    kicker: 'Upgrade',
    name: 'Upgrade to Loft Room',
    room: 'Loft King',
    images: [loft, loft2, loft3],
    alt: 'Loft King room at The Reykjavik EDITION',
    text: 'The largest of the rooms, on two levels.',
    facts: [
      { icon: 'Maximize2', label: '31–45 sqm (330–480 sqft)' },
      { icon: 'BedDouble', label: 'King bed' },
      { icon: 'Eye', label: 'Courtyard view' },
      { icon: 'DoorOpen', label: 'Mosaic-tile bathroom, rainfall shower' },
    ],
  },
  {
    id: 'terrace',
    kicker: 'Upgrade',
    name: 'Upgrade to Terrace King',
    room: 'Terrace King',
    images: [terrace, terrace2, terrace3],
    alt: 'Terrace King room with its terrace at The Reykjavik EDITION',
    text: 'A king room with its own terrace over the city.',
    facts: [
      { icon: 'Maximize2', label: '25 sqm (270 sqft)' },
      { icon: 'BedDouble', label: 'King bed' },
      { icon: 'Building2', label: 'City view' },
      { icon: 'DoorOpen', label: 'Private terrace' },
    ],
  },
  {
    id: 'night',
    kicker: 'Extra night',
    name: 'Add another night',
    room: 'Guest King',
    images: [guestKing, guestKing2, guestKing3],
    alt: 'Guest King room at The Reykjavik EDITION',
    text: 'Arrive a day early or stay on after breakfast on 4 April; transfers move with your flights.',
    facts: [
      { icon: 'Maximize2', label: '26–28 sqm (280 sqft)' },
      { icon: 'BedDouble', label: 'King bed' },
      { icon: 'Eye', label: 'Floor-to-ceiling window' },
      { icon: 'KeyRound', label: 'Same room, before or after the retreat' },
    ],
  },
];

/** Every room type the hotel has, with every photograph it publishes for each. */
export const allRooms = [
  { id: 'guest-king', group: 'Rooms', name: 'Guest King', size: '26–28 sqm · 280 sqft', bed: 'King bed', view: 'Courtyard view', images: [guestKing, guestKing2, guestKing3], alt: 'Guest King room', extra: 'Mosaic-tile bathroom with an enclosed rainfall shower.' },
  { id: 'guest-double-queen', group: 'Rooms', name: 'Guest Double Queen', size: '27–29 sqm · 300 sqft', bed: 'Two queen beds', view: 'Courtyard view', images: [guestDQ, guestDQ2], alt: 'Guest Double Queen room', extra: 'Two queens, an armchair and a floor-to-ceiling window.' },
  { id: 'terrace-king', group: 'Rooms', name: 'Terrace King', size: '25 sqm · 270 sqft', bed: 'King bed', view: 'City view', images: [terrace, terrace2, terrace3], alt: 'Terrace King room', extra: 'A private terrace with seating, looking towards Harpa.' },
  { id: 'superior-king', group: 'Rooms', name: 'Superior King', size: '27–29 sqm · 280–300 sqft', bed: 'King bed', view: 'Courtyard view', images: [guestKing, guestDQ2, guestKing3], alt: 'Superior King room' },
  { id: 'deluxe-king', group: 'Rooms', name: 'Deluxe King', size: '27–29 sqm · 280–300 sqft', bed: 'King bed', view: 'Scenic view', images: [deluxeKing, deluxeKing2], alt: 'Deluxe King room', extra: 'Floor-to-ceiling window over the water.' },
  { id: 'deluxe-double-queen', group: 'Rooms', name: 'Deluxe Double Queen', size: '28–29 sqm · 300–305 sqft', bed: 'Two queen beds', view: 'Scenic view', images: [deluxeDQ, deluxeDQ2], alt: 'Deluxe Double Queen room', extra: 'Two queens with harbour views.' },
  { id: 'loft-king', group: 'Rooms', name: 'Loft King', size: '31–45 sqm · 330–480 sqft', bed: 'King bed', view: 'Courtyard view', images: [loft, loft2, loft3], alt: 'Loft King room', extra: 'The largest room category; bathroom with a bathtub.' },
  { id: 'connecting', group: 'Rooms', name: 'Connecting Family Rooms', size: '59–74 sqm · 600–785 sqft', bed: 'King + two queens', view: 'Two connecting rooms', images: [connecting, guestKing3], alt: 'Connecting family rooms', extra: 'A king room connecting to a second room with queen beds.' },
  { id: 'deluxe-suite', group: 'Suites', name: 'Deluxe Suite', size: '41–62 sqm · 435–660 sqft', bed: 'King bed', view: 'Scenic view', images: [suite, suite2, deluxeKing2], alt: 'Deluxe Suite', extra: 'Living room, guest bathroom, bathtub and rainfall shower, 65″ TV.' },
  { id: 'corner-suite', group: 'Suites', name: 'Corner Suite', size: '78–82 sqm · 840–880 sqft', bed: 'King bed', view: 'Scenic & harbour view', images: [corner, corner2, corner3], alt: 'Corner Suite', extra: 'Two full bathrooms; living room; a dining table that seats ten.' },
  { id: 'penthouse', group: 'Suites', name: 'Penthouse', size: '128 sqm · 1,375 sqft', bed: 'King bed', view: 'Scenic & harbour view', images: [ph, ph2, ph3, ph4, ph5, ph6], alt: 'Penthouse', extra: 'Separate living and dining, full kitchen, fireplace, and a private terrace with ocean and mountain views.' },
];
