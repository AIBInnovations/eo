# EO Punjab · Iceland 2027 retreat site

React + Vite site for the EO Punjab Iceland retreat (31 March – 4 April 2027), built on the page
architecture of the Travel Next Level reference clone (fixed header, glass switcher, sticky scrubbed
hero, editorial sections, dark footer) with the retreat's own content and styling.

```bash
npm install
npm run dev      # http://localhost:5173  (retreat site)
                 # http://localhost:5173/?page=travel  (the Travel Next Level reference clone, kept intact)
npm run build
```

## Pages

The home page is deliberately light: the scrubbed door → Iceland hero, then one short teaser per section
of the brief. Each teaser links to its own page, where the detail lives. Routing is a small History-API
router (`src/iceland/router.jsx`); Vite's dev server and any SPA host with a fallback to `index.html` serve
the deep links.

| Route | Page | What it holds |
| --- | --- | --- |
| `/` | Home | Hero (door animation → 60 fps drone footage, scroll-scrubbed), countdown, and teasers for the seven sections |
| `/journey` | The Journey | Drone-video hero, key times, all five days with photograph, timeline and "what to expect" |
| `/adventure` | Choose Your Adventure | The four Day 4 breakouts with duration, level, wear, age and "Select My Activity" |
| `/stay` | Stay & Experiences | Full-bleed photograph per place (EDITION, Aurora Basecamp, Langjökull, Sky Lagoon, Harpa, Golden Circle) + add-ons |
| `/enquire` | Enquire | The enquiry form (name, mobile, e-mail, topic, message), how it works, who answers |
| `/travel-desk` | Travel Desk | Key times, EaseMyTrip contact, the nine topics, Iceland Essentials, wardrobe planner, add-ons, the three extensions with PDFs |
| `/family` | The EO Punjab Family | "112 People. One Iceland Adventure.", counts, the member wall, photo form |
| `/updates` | Updates & Help | Announcements, deadlines, downloads, full FAQ, contacts, President and Retreat Chairs, help form |

The internal pages use the reference site's *partnership* page design (the second HTML/CSS export placed in
`public/index.html` + `public/styles.css`): hero with two underlined kicker headings over a video/photo,
120vh full-bleed statements, the numbered points grid, the "how it works" steps split, the ruled line list,
the split-lines statement with icon grid, the FAQ accordion and the two-column form — all with the retreat's
content and the cream / navy / gold theme. **EO IN ICELAND** (glass pill at the top of every page) opens the enquiry drawer (slides in from the right, full width on phones); every "Enquire" button pre-fills the topic.

## Structure

```
src/
  App.jsx                   routes ?page=travel to the reference clone, otherwise the retreat site
  iceland/
    IcelandApp.jsx          shell (Lenis, cursor, header, switcher, routed page, footer)
    router.jsx              RouterProvider / useRouter / Link / scrollToHash
    iceland.css             theme layer: tokens, Fs R, section styles, internal-page block styles, breakpoints
    EnquiryContext.jsx      enquiry panel state + pre-filled subject
    icons.jsx               lucide icon registry (data files reference icons by name)
    data/retreat.js         all copy and structured content (days, activities, stays, travel desk, extensions…)
    data/pages.js           per-page hero copy, essentials icon tiles, drone video path
    blocks/                 PageHero, LSection, PointsGrid, StepsSplit, LineList, Statement, Faq, FormBlock, Btn, SectionHead
    pages/                  HomePage + JourneyPage, AdventurePage, StayPage, EnquiryPage, TravelDeskPage, FamilyPage, UpdatesPage
    hooks/useDoorComposite.js   canvas scrub: door frames → crossfade → 60 fps footage, eased per tick
    components/             IcelandHeader, IcelandMobileMenu, EnquirySwitcher, EnquiryForm, HeroVideo, Countdown, Stay, IcelandFooter
  components/, hooks/, data/, styles/   the Travel Next Level clone (see the section below)
public/
  frames/iceland/           773 webp frames of the canyon flight (60 fps)
  lottie/door/              the door animation frames (287) + JSON
  downloads/                itinerary and extension PDFs served to members
  video/iceland-canyon.mp4  compressed drone clip for the Journey page hero
reference/                  the two Webflow exports (home page + partnership page) the site is modelled on
docs/sections-and-style.md  the brief
source/                     (git-ignored) original video, PDFs and poster PNGs
```

## Notes

- Fonts: Fs R everywhere (same as the reference site), sizes on the `1vw`/`em` scale with the 991 / 767 / 479 px breakpoints.
- Photography: Creative Commons photographs from Wikimedia Commons (2000 px webp) in `src/assets/iceland/`, with
  attribution per file in `src/assets/iceland/CREDITS.md` (keep that file with the site, the licences require credit).
  Each day of the Journey carries a photo strip (`gallery` in `data/retreat.js`); swap in the retreat's own hotel /
  venue photography as it becomes available.
- Responsive: the em scale plus the 991 / 767 / 479 px breakpoints; the "mobile pass" block at the end of
  `iceland.css` holds the phone-specific fixes (stacked wardrobe planner, auto-height points grid, full-bleed sections).
- Forms are front-end previews; connect `EnquiryForm.jsx` (and the Updates/Family forms) to the retreat desk's inbox or WhatsApp.
- Deploy: `vercel.json` rewrites every path to `index.html` (client-side routing) and caches the frame / lottie / video folders for a year.

---

## Travel Next Level reference clone (`/?page=travel`)

Pixel-faithful rebuild of `https://travelnextlvl.de/en` from the Webflow export in `reference/`:
Webflow design CSS used verbatim, Lenis 0.2.28, GSAP ScrollTrigger, SplitType line reveals, Splide 3.2.2
carousels, scroll-scrubbed door Lottie (canvas), custom cursor, glass switcher with SVG distortion filter.
Behaviour was calibrated against the live page with headless Chromium (Lottie frame mapping, header
hide/invert thresholds, parallax ranges, switcher offsets).
