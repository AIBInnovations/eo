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
| `/accounts` | Accounts & Payments | The payment structure (advance, three tranches, refund of the advance), and requests for invoices and statements |
| `/privacy`, `/terms` | Legal | Plain-language privacy policy and terms (`data/legal.js`, fill in the chapter's registered address) |
| `/thank-you` | Thank you | Shown after the enquiry form is sent |
| anything else | 404 | Custom not-found page (Vercel rewrites every path to `index.html`, so the app renders it) |
| `/essentials` | Iceland Essentials | The thirteen-item packing list drawn as colour lineart (`components/Garments.jsx`), plus the day-by-day wardrobe planner |
| `/extensions` | Extensions | South Coast Iceland, Amsterdam and Copenhagen on their own page, each booked separately |
| `/travel-desk` | Travel Desk | Key times, EaseMyTrip contact, the nine topics, Iceland Essentials, wardrobe planner, add-ons, the three extensions with PDFs |
| `/family` | The EO Punjab Family | "114 People. One Iceland Adventure.", counts, photo strip, the people to recognise |
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
- Branding: `src/assets/logos/` holds the EO Punjab × Amplify lockup in both polarities, the sponsor lockup and the
  EaseMyTrip mark (client-supplied assets — see `src/assets/iceland/CREDITS.md`). The header renders the lockup through
  `components/Logo.jsx`; because the header animates `filter: invert(1)` over light sections, `useHeaderScroll` also
  toggles an `ice-inverted` class so the logo can swap polarity and counter-invert to keep the brand colours true.
- The itinerary PDF (`public/downloads/EO-Punjab-Iceland-2027-Itinerary.pdf`) is EO Punjab branded and generated from
  the site's own typography — rebuild it with `node scripts/make-itinerary-pdf.cjs` after editing the copy in `docs/itinerary-source.json`.
- "Who to contact" is one table in `contactTable` (`data/retreat.js`), rendered by `components/ContactTable.jsx` on the
  Travel Desk and Updates pages and reproduced on the last page of the itinerary PDF — edit it in one place.
- The three people to recognise are `leaders` in `data/retreat.js`; each shows initials until a portrait is added
  (drop a file into `assets/iceland/people/` and set `photo`).
- Payment structure lives in `src/iceland/data/accounts.js`; partner desks in `partners` in `data/retreat.js`;
  room upgrades (photographs and facts from The Reykjavik EDITION's room pages, no prices) in `data/rooms.js`; the
  wardrobe planner in `data/wardrobe.js`.
- **Members-only gate (currently switched off)** — `middleware.js` (Vercel Edge Middleware) can put the whole site
  behind one shared login; flip `GATE_ENABLED` to `true` there (and restore the footer's "Sign out" link) to turn it on:
  `EO_LOGIN_NUMBER` (the official login number, digits compared), `EO_LOGIN_PASSWORD`, and `EO_SESSION_SECRET`
  (any long random string) as Production environment variables on the Vercel project. A correct login sets a signed
  30-day cookie; `/logout` clears it (the footer's "Sign out"). Changing the number or password signs everyone out.
  If the number or password is unset the gate stays open (so previews and `vite dev` are never locked). Search engines
  are told to stay out via `robots.txt`.
- Deploy: `vercel.json` rewrites every path to `index.html` (client-side routing) and caches the frame / lottie / video folders for a year.
- Launch checklist in place: per-page title/description/canonical + Open Graph/Twitter tags (`data/meta.js`, `public/og.jpg`),
  favicon set + `site.webmanifest`, `robots.txt`, `sitemap.xml`, custom 404, thank-you page, privacy + terms pages,
  cookie/consent bar (Vercel Web Analytics only loads after "Accept"), form validation + sending state,
  and a first-load preloader that waits for the fonts and the door frames. `SITE_URL` in `data/meta.js`, `robots.txt`
  and `sitemap.xml` all carry the production URL: change all three when a custom domain is added.
- Performance: photographs are 1600 px masters + 800 px variants (`assets/iceland/sm`, served through `blocks/Pic.jsx`
  with `srcset`); phones and low-power devices (`perf.js`) get half-rate 720 px hero frames and 960 px door frames,
  a DPR-capped canvas, no SVG glass distortion, no split-line scrubbing and no custom cursor. Frames stream through a
  small download queue (door first, reporting progress to the preloader).
- Phones and tablets scroll inside a fixed container (`#ice-scroller`, see `perf.js`) so the browser's address bar
  never collapses and shifts the layout; Lenis and every ScrollTrigger measure against that container there.

---

## Travel Next Level reference clone (`/?page=travel`)

Pixel-faithful rebuild of `https://travelnextlvl.de/en` from the Webflow export in `reference/`:
Webflow design CSS used verbatim, Lenis 0.2.28, GSAP ScrollTrigger, SplitType line reveals, Splide 3.2.2
carousels, scroll-scrubbed door Lottie (canvas), custom cursor, glass switcher with SVG distortion filter.
Behaviour was calibrated against the live page with headless Chromium (Lottie frame mapping, header
hide/invert thresholds, parallax ranges, switcher offsets).
