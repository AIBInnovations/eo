import rubiTulum from '../assets/images/rubi-tulum.webp';
import santorini from '../assets/images/sommerliebhaber-santorini.webp';
import wingsCappadocia from '../assets/images/hotel-wings-cappadocia.webp';
import atlantis from '../assets/images/atlantis-the-palm.webp';
import purana from '../assets/images/purana-suite-ubud.webp';
import pillars from '../assets/images/137-pillars-suites-bangkok.webp';
import siyam from '../assets/images/siyam-world-maldives.webp';
import sentido from '../assets/images/sentido-pearl-beach-kos.webp';

const CHECK24 = 'https://www.check24.net/pauschalreisen-vergleich/';

// Legacy hotels grid (section-4, hidden by CSS in the source page)
export const hotels = [
  { name: 'Rubi Tulum', price: '€264/Nacht', airport: 'Internationaler Flughafen Cancun (CUN)', image: rubiTulum, href: CHECK24 },
  { name: 'Sommerliebhaber auf Santorin', price: '€109/Nacht', airport: 'Flughafen Santorin (JTR)', image: santorini, href: CHECK24 },
  { name: 'Hotel Wings Cappadocia', price: '€113/Nacht', airport: 'Flughafen Ankara Esenboga (ESB)', image: wingsCappadocia, href: CHECK24 },
  { name: 'Atlantis, The Palm', price: '€416/Nacht', airport: 'Internationaler Flughafen Dubai (DXB)', image: atlantis, href: CHECK24 },
  { name: 'Purana Suite Ubud', price: '$109/Nacht', airport: 'Internationaler Flughafen I Gusti Ngurah Rai (DPS)', image: purana, href: CHECK24 },
  { name: '137 Pillars Suites & Residences Bangkok', price: '$169/Nacht', airport: ' Suvarnabhumi Airport (BKK)', image: pillars, href: CHECK24 },
  { name: 'Siyam World Maldives', price: '$904/Nacht', airport: 'Internationaler Flughafen Malé-Velana (MLE/VIA)', image: siyam, href: CHECK24 },
  { name: 'Sentido Pearl Beach Kos', price: '$120/Nacht', airport: 'Kos International Airport (KOS)', image: sentido, href: CHECK24 },
];
