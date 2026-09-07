import { socialLinks } from './navigation.js';

export const footerColumns = [
  {
    title: 'Entdecken',
    className: 'div-block-2',
    links: [
      { href: '/en', label: 'Home', current: true },
      { href: '/en/blog', label: 'Blog' },
      { href: '/en/contact', label: 'Contact', innerTarget: true },
    ],
  },
  {
    title: 'TRAVEL',
    className: 'div-block-3',
    links: [
      { href: '/en/destinations', label: 'Destinations' },
      { href: '/en/hotels', label: 'Hotels' },
    ],
  },
  {
    title: 'LANGUAGES',
    className: 'div-block-3',
    links: [
      { href: 'https://travelnextlvl.de/en', label: 'English' },
      { href: 'https://travelnextlvl.de', label: 'Deutsch' },
    ],
  },
  {
    title: 'Scials',
    className: 'div-block-3',
    links: socialLinks.map((l) => ({ ...l, external: true })),
  },
];

export const legalLinks = [
  { href: '/en/privacy-policy', label: 'Privacy Policy', first: true },
  { href: '/en/cookie-policy', label: 'Cookie Policy' },
  { href: '/en/imprint', label: 'Imprint' },
];

export const footerCopy = {
  destinationsTitle: 'Destinations',
  destinationsText:
    'Discover the world’s most captivating places, from hidden gem places to travel to popular hotspots. Explore our curated selection of best adventure travel destinations and enchanting destinations that inspire wanderlust. Plan your next journey today and create unforgettable travel experiences.',
  destinationsButton: 'Explore Destiantion',
  newsletterTitle: 'WhatsApp-Newsletter',
  newsletterSubtitle: "If you're on a mobile device - just click on the QR code.",
  whatsappHref: 'https://api.whatsapp.com/send/?phone=4915563190488&text&type=phone_number&app_absent=0',
  newsletterText:
    'Exclusive VIP WhatsApp group to discover the best travel deals, luxury getaways and budget-friendly trips. Explore secret travel destinations and trending food hotspots around the world. Get daily travel inspiration and plan your next unforgettable adventure, all in one place.',
  emailPlaceholder: 'Enter you e-mail address',
  subscribe: 'Subscribe',
  thanks: 'Danke fürs Abonnieren! Du wirst als Erster von der Markteinführung erfahren.',
  error: 'Ups! Beim Absenden des Formulars ist etwas schiefgelaufen.',
  rights: '© 2025 Travel Next Level',
  credit: { href: 'https://artemiilebedev.com', label: 'Website by Artemii Lebedev' },
};
