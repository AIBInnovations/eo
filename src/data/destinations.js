import hollywood from '../assets/images/hollywood-los-angeles-travel-destination.webp';
import beverlyHills from '../assets/images/beverly-hills-luxury-travel-destination.webp';
import banff from '../assets/images/banff-national-park-nature-travel-destination.webp';
import cancun from '../assets/images/cancun-best-travel-destination.webp';
import tayrona from '../assets/images/tayrona-national-park-tropical-destination.webp';
import kohSamui from '../assets/images/koh-samui-top-travel-destination.webp';
import cappadocia from '../assets/images/cappadocia-unique-travel-destination.webp';
import santaMonica from '../assets/images/santa-monica-beach-travel-destination.webp';
import newYork from '../assets/images/new-york-best-travel-destination.webp';
import lasVegas from '../assets/images/las-vegas-popular-travel-destination.webp';
import miami from '../assets/images/miami-beach-travel-destination.webp';

const tp = (code, journey) =>
  `https://aviasales.tpo.lu/${code}?trs=391476&journey_id=${journey}&trace_id=Zzee4569f7fcd840528a854fc-608661&promo_kind=tp_short&page_url=https%3A%2F%2Ftravelnextlvl.de%2Fen&product_type=tp_manual&install_type=partner`;

// "Hidden Gem Places" draggable carousel (Splide #splide01)
export const destinations = [
  { id: '001', name: 'Hollywood', location: 'Los Angeles, Vereinigte Staaten', price: 'ab 36€', image: hollywood, href: tp('8nObh6vx', 'Hw68xCmtC2KH7lQjKfPNt') },
  { id: '002', name: 'Beverly Hills', location: 'Los Angeles, Vereinigte Staaten', price: 'ab 36€', image: beverlyHills, href: tp('8nObh6vx', 'erBaNEsCZck0AWnFIHyUS') },
  { id: '007', name: 'Banff-Nationalpark', location: 'Alberta, Kanada', price: 'ab 36€', image: banff, href: tp('9PvFEtGL', 'JOqdYIX-9DeVXoUDSTm7B') },
  { id: '008', name: 'Cancún', location: 'Quintana Roo, Mexico', price: 'ab 36€', image: cancun, href: tp('D5WBVe8X', '2bghKyvooG_R39DJnB425') },
  { id: '015', name: 'Tayrona-Nationalpark', location: 'Santa Marta, Kolumbien', price: 'ab 36€', image: tayrona, href: tp('PobHQVlo', 'Dd5dwNp-QcjJC7QOpVN3Y') },
  { id: '042', name: 'Ko Samui', location: 'Surat Thani, Thailand', price: 'ab 36€', image: kohSamui, href: tp('nvWHBADO', 'Hq7ZqLt0eH2e0VHhJKJ3i') },
  { id: '051', name: 'Kappadokien', location: 'Zentralanatolien, Türkei', price: 'ab 36€', image: cappadocia, href: tp('aEBt3SLf', 'R6ZU23LmukGvWr8aW4wqu') },
];

// Legacy "Handpicked Destinations" grid (section-2, hidden by CSS in the source)
export const handpickedDestinations = [
  { id: '001', name: 'Hollywood', location: 'Los Angeles, Vereinigte Staaten', price: 'ab 36€', image: hollywood, href: tp('8nObh6vx', 'b7OfgWuTfy4eyWS0bhbGX') },
  { id: '002', name: 'Beverly Hills', location: 'Los Angeles, Vereinigte Staaten', price: 'ab 36€', image: beverlyHills, href: tp('8nObh6vx', 'Sv3x6qSoF98dFFy98_Md9') },
  { id: '003', name: 'Santa Monica', location: 'Los Angeles, Vereinigte Staaten', price: 'ab 36€', image: santaMonica, href: tp('8nObh6vx', 'QzPbXbMTyJftYHux5EI5T') },
  { id: '004', name: 'New York', location: 'New York City, Vereinigte Staaten', price: 'ab 36€', image: newYork, href: tp('tj5PoFp6', 'e6WgafbF-LAPLkb-Jd5GZ') },
  { id: '005', name: 'Las Vegas', location: 'Nevada, Vereinigte Staaten', price: 'ab 36€', image: lasVegas, href: tp('XA5hiF7E', 'UWRVXDJMh0CntOahsWBAh') },
  { id: '006', name: 'Miami', location: 'Florida, Vereinigte Staaten', price: 'ab 36€', image: miami, href: tp('B3vAUOOU', 'l5D_AEOid-DAoNvA7ufBz') },
  { id: '007', name: 'Banff-Nationalpark', location: 'Alberta, Kanada', price: 'ab 36€', image: banff, href: tp('9PvFEtGL', 'mn306f9HG0oqrefe2Jyii') },
  { id: '008', name: 'Cancún', location: 'Quintana Roo, Mexico', price: 'ab 36€', image: cancun, href: tp('D5WBVe8X', 'IMdiRjH5Q3C4n4WpcNtEu') },
];
