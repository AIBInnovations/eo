/** Run with a local Vite server: MOBILE_TEST_URL=http://127.0.0.1:5173 node scripts/check-mobile.cjs
 * Optional: MOBILE_TEST_BROWSER=webkit WEBKIT_EXECUTABLE=/path/to/pw_run.sh
 */
const assert = require('node:assert/strict');
const { chromium, webkit } = require('playwright');
const base = process.env.MOBILE_TEST_URL || 'http://127.0.0.1:5173';
const engine = process.env.MOBILE_TEST_BROWSER === 'webkit' ? webkit : chromium;
const options = engine === webkit
  ? (process.env.WEBKIT_EXECUTABLE ? { executablePath: process.env.WEBKIT_EXECUTABLE } : {})
  : { channel: 'chrome' };

(async () => {
  const browser = await engine.launch(options);
  try {
    for (const width of [320, 390, 768]) {
      const page = await browser.newPage({ viewport: { width, height: 800 }, isMobile: true, hasTouch: true });
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      await page.addInitScript(() => localStorage.setItem('ice-consent', 'declined'));
      await page.goto(base);
      await page.waitForSelector('body.is-loaded');
      const heroState = () => page.evaluate(() => {
        const bg = document.querySelector('.background_interaction').getBoundingClientRect();
        const canvas = document.querySelector('.ice-frames canvas');
        const pixel = canvas.getContext('2d').getImageData(canvas.width / 2, canvas.height / 2, 1, 1).data;
        const scroller = document.querySelector('#ice-scroller');
        return { top: bg.top, width: bg.width, height: bg.height, alpha: pixel[3], scroll: scroller.scrollTop, overflow: scroller.scrollWidth > innerWidth };
      });
      const first = await heroState();
      assert.equal(first.scroll, 0, 'Hero must render without scrolling');
      assert.equal(first.top, 0);
      assert.equal(first.width, width);
      assert.ok(first.height > 0 && first.alpha > 0, 'Canvas must paint at first load');
      assert.equal(first.overflow, false);
      const paragraphs = await page.locator('.ice-hero .ice-description p').evaluateAll(elements => elements.map(p => {
        const box = p.closest('.ice-box').getBoundingClientRect();
        const paragraph = p.getBoundingClientRect();
        return { available: box.width, width: paragraph.width, right: paragraph.right };
      }));
      for (const paragraph of paragraphs) {
        assert.ok(paragraph.width >= paragraph.available * 0.9, 'Hero paragraphs must use the available text column');
        assert.ok(paragraph.right <= width, 'Hero paragraphs must fit the viewport');
      }
      await page.setViewportSize({ width, height: 640 });
      await page.waitForTimeout(200);
      assert.ok((await heroState()).alpha > 0, 'Resize must repaint without a scroll gesture');
      await page.evaluate(() => { document.querySelector('#ice-scroller').scrollTop = 1000; });
      await page.waitForTimeout(350);
      assert.ok((await heroState()).alpha > 0, 'Scroll sequence must stay painted');
      for (const route of ['/journey', '/adventure', '/stay', '/extensions', '/essentials', '/travel-desk', '/family', '/accounts', '/updates', '/enquire']) {
        await page.goto(base + route);
        await page.waitForSelector('body.is-loaded');
        assert.equal(await page.evaluate(() => document.querySelector('#ice-scroller').scrollWidth > innerWidth), false, `${route}: horizontal overflow`);
        if (route === '/journey') {
          await page.waitForFunction(() => {
            const v = document.querySelector('video');
            return v.readyState >= 2 && !v.paused && v.currentTime > 0;
          });
        }
      }
      assert.deepEqual(errors, []);
      await page.close();
      console.log(`${engine.name()} ${width}px: hero, resize, scroll, video and routes passed`);
    }
    const page = await browser.newPage({ viewport: { width: 360, height: 740 }, isMobile: true, hasTouch: true });
    await page.route('**/frames/**', route => route.abort());
    await page.route('**/lottie/door/**', route => route.abort());
    await page.goto(base);
    await page.waitForSelector('body.is-loaded');
    assert.ok(await page.locator('.ice-hero-poster').evaluate(img => img.complete && img.naturalWidth > 0 && img.getBoundingClientRect().top === 0), 'Poster must remain visible when frames fail');
    await page.close();
    console.log('Frame failure fallback passed');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
