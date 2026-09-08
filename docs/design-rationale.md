# Iceland 2027 · Design rationale

How the EO Punjab × Amplify retreat site was designed, and how to explain it to the client.
Live: https://eo-delta-henna.vercel.app

## 1. The idea in one line

A members' travel magazine for one trip. Every page is built like an editorial spread: a
photograph does the emotional work, a short headline says what the page is for, and the facts
sit underneath in a fixed, predictable order. The site opens with a reveal, a door opening onto
Iceland footage that plays only as you scroll, because the retreat's own line is "Iceland
Unexpected. Same destination. We added a little chaos."

## 2. Visual identity

**Palette** (deliberately small, so colour can carry meaning)

| Token | Value | Role |
| --- | --- | --- |
| Cream | `#f4efe6` | Reading surfaces, light text on dark |
| Navy | `#0b1f3a` | Ink, primary buttons, dark sections, footer |
| Gold | `#c9a227` | Labels, keys and numbers, current state, accents. Never body text |
| Aurora green | `#3fbf9f` | One semantic highlight (confirmation) |
| Ice blue | `#7fb7d8` | Reserved accent |
| Cream 2 | `#ebe4d6` | Card surfaces |
| Line | navy at 14% | Every rule and border |

Gold is the wayfinding colour: eyebrows, step numbers, the current nav item, the refund row
in the payment table. Because it is used for nothing else, the eye learns to follow it.

**Typography.** One typeface (Fs R, a condensed grotesque) in every role, which keeps the
site quiet and lets size and case do the hierarchy:

1. Display: large condensed headlines, sentence case with a full stop ("Land of Fire & Ice.")
2. Labels: uppercase, letter-spaced 0.16–0.24em, gold, 12–13px
3. Body: 15–17px, generous line height, reading width capped around 65–70 characters

Nothing on desktop or tablet drops below 13px for labels or 15px for body. On phones every
size is set in pixels rather than the viewport scale, so nothing collapses.

**Photography.** Full-bleed, real places, no stock clichés: the aurora over Vík, Gullfoss,
Strokkur, Silfra, Harpa, the glacier truck, and the hotel's own room photographs. Landscapes
are Creative Commons with attribution kept in the repository; the EDITION photographs are the
hotel's, used to show the rooms the group will stay in.

## 3. Structure

**Home is the overview; every section has its own page.** The home page carries one short
teaser per section, each ending in a link to the full page. Progressive disclosure: a member
sees the shape of the trip in one scroll and drills into what matters to them.

Pages: Journey · Adventure · Stay · Extensions · Travel Desk · Family · Accounts · Updates ·
Enquire (plus privacy, terms, thank-you and a 404).

**Every internal page has the same skeleton**, so nothing has to be learned twice:

1. Full-bleed hero with a two-word kicker pair, the headline, one button
2. Key facts grid (numbers first)
3. Detail blocks (steps, photo strips, cards)
4. A closing call to action

**One primary action.** "Enquire" is the only conversion on the site. It lives in the glass
pill at the top centre of every page, opens a drawer with a short form, and every "Enquire"
button on the site pre-fills the topic (a breakout, a room upgrade, an extension, an invoice).
No login, no OTP, no dead ends.

**Extensions are separate from the retreat**, on their own page and nav tab, so optional and
included never blur. Rooms show photographs and facts, never prices.

## 4. Visual hierarchy

- Kicker → headline → facts → detail, top to bottom, on every page.
- Numbered keys (01/02, (a)/(b)) are used only where order is real: timings, steps, tranches.
- Cards are used sparingly, for things that are genuinely separate objects (rooms, partner
  desks, payment tranches). Lists are ruled rows, not cards, so the page stays calm.
- Text over photographs always sits on a gradient shade; the header inverts over light
  sections and takes a blurred backdrop on phones once scrolled, so it is legible everywhere.
- Icons are a single line-icon set (Lucide), gold on navy circles, never emoji.

## 5. Spacing and rhythm

- Desktop and tablet use a viewport-relative scale inherited from the reference layout, with
  pixel floors; phones use fixed pixel spacing.
- Section padding is consistent; every list is separated by one hairline; every card uses the
  same 6–8px radius, 1px line border and cream-2 surface.
- Grids step down predictably:

| Element | Desktop | Tablet (768–991) | Phone |
| --- | --- | --- | --- |
| Points grid | 4 across | 2 across | 2 across |
| Photo strips | 3–4 across | 2 across | 2 across |
| Room cards | 2 across | 1 | 1 |
| All-rooms grid | 3 across | 2 across | 1 |
| Tables | table | stacked cards | stacked cards |
| Stay teaser | drag carousel | 3-up grid | 2-up grid |

- Reading width is capped on desktop; on phones the page padding sets the line length.

## 6. Motion

- The hero is scroll-scrubbed: 230 door frames, then 773 frames of Iceland footage on
  desktop (387 half-rate frames on phones). It never autoplays; the scroll is the playhead.
- Smooth scrolling, split-line text reveals and image parallax on desktop only. Weak devices
  and reduced-motion settings get a still, fast version.
- A loading screen with a progress bar holds the page until the fonts and the first 48 door
  frames are in, so the first thing anyone sees is finished.

## 7. Mobile hygiene

- Phones and tablets scroll inside a fixed container, so the browser's address bar never
  collapses and shifts the layout.
- No sideways scrolling anywhere. Two-up grids instead of one long column. Tables become
  cards. Thumbnails wrap.
- Every page was audited at 360, 390 and 768px for overflow, squeezed columns, inflated and
  unreadable text. Phones pass on all thirteen routes.

## 8. Launch hygiene

Per-page titles and descriptions, Open Graph image, favicon set and manifest, sitemap,
robots, custom 404, thank-you page, privacy and terms, cookie consent gating analytics,
form validation and sending states, compressed images with responsive variants, an EO Punjab
branded itinerary PDF, and a members-only login gate that can be switched on in one line when
the official login number is issued.

## 9. What changed on client feedback

- EO Punjab × Amplify logos in the header, loading screen and PDF; sponsor strip in the footer
- Itinerary PDF rebranded from the agent's letterhead to EO Punjab
- Travel Desk shows both desks (The Villa Escape, EaseMyTrip) with the EaseMyTrip logo and a
  clear note that booking through them is not compulsory
- Accounts page with the payment structure and invoice / statement requests
- Extensions moved to their own tab
- Rooms with the hotel's photographs and facts, no prices; every room type shown
- Wardrobe planner rebuilt as visual day cards with garment chips

## 10. Sixty-second talk track

1. "We built it like a travel magazine for one trip: photograph, short headline, facts."
2. "Three colours with jobs: cream to read on, navy for action, gold to guide the eye."
3. "One typeface, three sizes. Nothing on the site is smaller than 13 pixels."
4. "Home is the overview; every section has its own page with the same skeleton."
5. "One action everywhere: Enquire, with the topic already filled in."
6. "The hero opens a door onto Iceland and only plays when you scroll. It is the one moment
   of theatre; everything after it is calm."
7. "It was audited on phones and tablets at three widths, and it is ready to go behind a
   members' login the day you send the number."
