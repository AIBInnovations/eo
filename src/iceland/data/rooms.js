/**
 * Room upgrades at The Reykjavik EDITION — photographs and facts from the hotel's own room pages
 * (editionhotels.com/reykjavik/rooms-and-suites). No prices by design: the retreat desk confirms
 * availability and cost on enquiry.
 */
import deluxeSuite from '../../assets/iceland/room-deluxe-suite.webp';
import loftKing from '../../assets/iceland/room-loft-king.webp';
import terraceKing from '../../assets/iceland/room-terrace-king.webp';
import guestKing from '../../assets/iceland/room-guest-king.webp';
export { default as cornerSuite } from '../../assets/iceland/room-corner-suite.webp';
export { default as deluxeKing } from '../../assets/iceland/room-deluxe-king.webp';
export { default as penthouse } from '../../assets/iceland/room-penthouse.webp';

export const hotelIntro =
  'All four retreat nights are at The Reykjavik EDITION on the harbour, next to Harpa: 253 rooms with floor-to-ceiling windows, 26 suites and a penthouse. Upgrades and extra nights are arranged through the retreat desk.';

export const roomUpgrades = [
  {
    id: 'suite',
    kicker: 'Upgrade',
    name: 'Upgrade to Suite',
    room: 'Deluxe Suite',
    image: deluxeSuite,
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
    image: loftKing,
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
    image: terraceKing,
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
    image: guestKing,
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
