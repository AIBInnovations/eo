/**
 * Builds the EO Punjab-branded itinerary PDF from docs/itinerary-source.json using headless Chromium.
 * Run from the project root:  node scripts/make-itinerary-pdf.cjs
 * Writes public/downloads/EO-Punjab-Iceland-2027-Itinerary.pdf
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = '/Users/moon/Documents/eo';
const S = path.join(ROOT, 'docs');
const data = JSON.parse(fs.readFileSync(path.join(S, 'itinerary-source.json'), 'utf8'));
const b64 = (p, mime) => `data:${mime};base64,${fs.readFileSync(p).toString('base64')}`;
const font = b64(path.join(ROOT, 'src/assets/fonts/fs-r.otf'), 'font/otf');
const logo = b64(path.join(ROOT, 'src/assets/logos/eo-amplify-dark.png'), 'image/png');
const logoLight = b64(path.join(ROOT, 'src/assets/logos/eo-amplify-light.png'), 'image/png');
const sponsors = b64(path.join(ROOT, 'src/assets/logos/sponsors.png'), 'image/png');
const cover = b64(path.join(ROOT, 'src/assets/iceland/aurora-sky.webp'), 'image/webp');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const block = (bl) => {
  if (bl.h) return `<div class="act"><div class="act-h">${esc(bl.h)}</div><p>${esc(bl.p)}</p><p class="dur"><span>Duration</span> ${esc(bl.d)}</p></div>`;
  if (bl.t) return `<div class="row"><div class="time">${esc(bl.t)}</div><p>${esc(bl.p)}</p></div>`;
  return `<div class="row"><div class="time"></div><p class="${bl.muted ? 'muted' : ''}">${esc(bl.p)}</p></div>`;
};
const CONTACTS = [
  ['Stay extensions', [['Mallika Iyyer', 'The Villa Escape', '+91 98200 43566']]],
  ['Flight bookings', [['Rishita', 'EaseMyTrip', '+91 62001 50904']]],
  ['Accounts, invoicing and payment queries', [['Mayanka', 'Chapter Manager · EO Punjab', '+91 98738 91512']]],
  ['Upgrades, about the retreat and any other queries', [['Vidur Varma', 'Retreat Chair · EO Punjab', '+91 73556 88888'], ['Munish Dua', 'Retreat Chair · EO Punjab', '+91 98155 55575']]],
  ['All escalations', [['Mohit Saharan', 'President · EO Punjab', '+91 98155 05000']]],
  ['Day-to-day permissions', [['Call your spouse', 'IYKYK', '']], true],
];
const contactRows = CONTACTS.map(([what, people, light]) => `<tr class="${light ? 'light' : ''}">
  <td>${esc(what)}</td>
  <td class="who">${people.map((p, i) => `<div class="${i ? 'p2' : ''}"><b>${esc(p[0])}</b><span class="role">${esc(p[1])}</span></div>`).join('')}</td>
  <td class="num">${people.map((p) => `<div>${p[2] ? esc(p[2]) : '<span style="color:#8a8172">IYKYK</span>'}</div>`).join('')}</td>
</tr>`).join('');

const day = (d) => `
  <section class="day">
    <div class="day-head">
      <div class="day-n">${esc(d.n)}</div>
      <div><div class="day-date">${esc(d.date)}</div><h2>${esc(d.title)}</h2></div>
    </div>
    ${d.blocks.map(block).join('')}
  </section>`;

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face { font-family: 'Fs R'; src: url('${font}') format('opentype'); font-weight: 400; }
  @page { size: A4; margin: 16mm 15mm 18mm; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body { font-family: 'Fs R', Georgia, serif; color: #0b1f3a; font-size: 9.6pt; line-height: 1.5; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .cover { position: relative; height: 263mm; page-break-after: always; overflow: hidden; background: #0b1f3a; border-radius: 2mm; }
  .cover img.bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .cover .shade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(6,18,36,.55) 0%, rgba(6,18,36,.25) 40%, rgba(6,18,36,.92) 100%); }
  .cover .inner { position: absolute; inset: 0; padding: 14mm 14mm 16mm; display: flex; flex-direction: column; justify-content: space-between; color: #f4efe6; }
  .cover .logo { height: 16mm; width: auto; align-self: flex-start; flex: 0 0 auto; object-fit: contain; }
  .cover .eyebrow { font-size: 8.4pt; letter-spacing: .28em; text-transform: uppercase; color: #c9a24a; margin-bottom: 5mm; }
  .cover h1 { font-size: 34pt; line-height: 1.02; margin: 0 0 4mm; font-weight: 400; }
  .cover .sub { font-size: 13pt; opacity: .92; margin: 0 0 9mm; }
  .cover .facts { display: flex; gap: 9mm; font-size: 8.6pt; letter-spacing: .16em; text-transform: uppercase; border-top: .4pt solid rgba(244,239,230,.45); padding-top: 5mm; }
  .head { display: flex; justify-content: space-between; align-items: center; border-bottom: .5pt solid #d9d2c5; padding-bottom: 4mm; margin-bottom: 7mm; }
  .head img { height: 11mm; width: auto; flex: 0 0 auto; object-fit: contain; }
  .head .t { font-size: 7.6pt; letter-spacing: .2em; text-transform: uppercase; color: #8a8172; text-align: right; }
  .day { margin-bottom: 7mm; }
  .day-head { display: flex; gap: 5mm; align-items: baseline; border-bottom: .5pt solid #d9d2c5; padding-bottom: 2.5mm; margin-bottom: 3.5mm; page-break-after: avoid; page-break-inside: avoid; }
  .day-n { font-size: 19pt; color: #c9a24a; line-height: 1; min-width: 13mm; }
  .day-date { font-size: 7.8pt; letter-spacing: .2em; text-transform: uppercase; color: #8a8172; margin-bottom: 1mm; }
  .day h2 { font-size: 14.5pt; margin: 0; font-weight: 400; line-height: 1.12; }
  .row { display: flex; gap: 5mm; margin-bottom: 2.4mm; page-break-inside: avoid; }
  .time { min-width: 13mm; font-size: 9pt; color: #c9a24a; padding-top: .6mm; }
  .row p { margin: 0; }
  .muted { color: #6f6858; font-style: italic; }
  .act { margin: 0 0 3mm 18mm; padding-left: 4mm; border-left: 1.2pt solid #c9a24a; page-break-inside: avoid; }
  .act-h { font-size: 10.6pt; margin-bottom: .8mm; }
  .act p { margin: 0 0 1.5mm; }
  .dur { font-size: 9pt; color: #6f6858; }
  .dur span { letter-spacing: .14em; text-transform: uppercase; font-size: 7.6pt; color: #8a8172; }
  .end { margin-top: 8mm; page-break-before: avoid; border-top: .5pt solid #d9d2c5; padding-top: 5mm; display: flex; justify-content: space-between; align-items: flex-end; gap: 10mm; page-break-inside: avoid; }
  .end .desks { font-size: 9pt; }
  .end .desks b { font-weight: 400; }
  .end .desks div { margin-bottom: 1.2mm; }
  .end .desks .lbl { font-size: 7.4pt; letter-spacing: .18em; text-transform: uppercase; color: #8a8172; }
  .end img { height: 11mm; width: auto; flex: 0 0 auto; object-fit: contain; }
  .contacts { page-break-before: always; }
  .contacts h2 { font-size: 16pt; font-weight: 400; margin: 0 0 1.5mm; }
  .contacts .lead { color: #6f6858; margin: 0 0 6mm; font-size: 9.4pt; }
  table.ct { width: 100%; border-collapse: collapse; }
  table.ct th { text-align: left; font-size: 7.4pt; letter-spacing: .18em; text-transform: uppercase; color: #8a8172; font-weight: 400; padding: 0 4mm 2.5mm 0; border-bottom: .5pt solid #d9d2c5; }
  table.ct td { padding: 3.2mm 4mm 3.2mm 0; border-bottom: .5pt solid #e6e0d4; vertical-align: top; font-size: 9.4pt; }
  table.ct td.who b { font-weight: 400; }
  table.ct td.who .role { color: #6f6858; font-size: 8.6pt; display: block; }
  table.ct td.who .p2 { margin-top: 2mm; }
  table.ct td.num { color: #0b1f3a; white-space: nowrap; }
  table.ct td.num div + div { margin-top: 2mm; }
  table.ct tr.light td { color: #6f6858; font-style: italic; }
</style></head><body>
  <div class="cover">
    <img class="bg" src="${cover}" alt="">
    <div class="shade"></div>
    <div class="inner">
      <img class="logo" src="${logoLight}" alt="EO Punjab × Amplify">
      <div>
        <div class="eyebrow">EO Punjab Retreat × Amplify · 31 March – 4 April 2027</div>
        <h1>Land of Fire &amp; Ice.</h1>
        <p class="sub">An EO Experience Like No Other · Reykjavík, Iceland</p>
        <div class="facts"><span>114 Travellers</span><span>49 EO Members &amp; Families</span><span>4 Extraordinary Nights</span></div>
      </div>
    </div>
  </div>

  <div class="head">
    <img src="${logo}" alt="EO Punjab × Amplify">
    <div class="t">Iceland 2027 · Itinerary<br>31 March – 4 April 2027</div>
  </div>
  ${data.days.map(day).join('')}
  <section class="contacts">
    <div class="head">
      <img src="${logo}" alt="EO Punjab × Amplify">
      <div class="t">Iceland 2027 · Who to contact</div>
    </div>
    <h2>Who to contact</h2>
    <p class="lead">One number for each kind of question, so nothing bounces around the group.</p>
    <table class="ct">
      <thead><tr><th style="width:34%">Connect for</th><th style="width:36%">Name &amp; role</th><th style="width:30%">Contact number</th></tr></thead>
      <tbody>${contactRows}</tbody>
    </table>
    <p style="color:#6f6858;font-size:8.6pt;margin-top:5mm">Booking flights through EaseMyTrip is not compulsory. You are free to book your own tickets — just share the final itinerary with the retreat desk so your airport transfer can be arranged.</p>
    <div class="end">
      <div class="desks"><div class="lbl">EO Punjab × Amplify</div><div>Iceland 2027 · 31 March – 4 April</div></div>
      <img src="${sponsors}" alt="Sponsors">
    </div>
  </section>
</body></html>`;

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.setContent(html, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.pdf({
    path: path.join(ROOT, 'public/downloads/EO-Punjab-Iceland-2027-Itinerary.pdf'),
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate:
      '<div style="width:100%;font-size:7pt;color:#8a8172;font-family:Georgia,serif;padding:0 15mm;display:flex;justify-content:space-between;"><span>EO Punjab · Iceland 2027</span><span class="pageNumber"></span></div>',
    margin: { top: '16mm', bottom: '18mm', left: '15mm', right: '15mm' },
  });
  await b.close();
  console.log('pdf written');
})();
