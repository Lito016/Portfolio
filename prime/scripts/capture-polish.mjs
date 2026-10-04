import { chromium } from 'playwright';
import { writeFile } from 'node:fs/promises';

const BASE = 'http://127.0.0.1:4195/';
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 },
];

const TAG = process.argv[2] ?? 'after';

const browser = await chromium.launch();
const report = {};
for (const vp of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 250));
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 600));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 600));
  });
  await page.screenshot({ path: `prime/evidence/screenshots/polish/${TAG}-${vp.name}.png`, fullPage: true });
  report[vp.name] = await page.evaluate(() => {
    const px = (el, prop) => parseFloat(getComputedStyle(el)[prop]);
    const rect = (el) => el.getBoundingClientRect();
    const out = { overflow: document.documentElement.scrollWidth > window.innerWidth ? 'YES' : 'none', sections: {}, gaps: {} };
    for (const id of ['about', 'skills', 'experience', 'contact', 'work']) {
      const el = document.getElementById(id);
      if (!el) continue;
      const cs = getComputedStyle(el);
      out.sections[id] = { pt: px(el, 'paddingTop'), pb: px(el, 'paddingBottom') };
    }
    const showcases = [...document.querySelectorAll('article[data-showcase]')];
    out.showcases = showcases.map((a) => {
      const cs = getComputedStyle(a);
      return { kind: a.dataset.showcase, pt: px(a, 'paddingTop'), pb: px(a, 'paddingBottom') };
    });
    const blocks = [
      ['work→firstShowcase', document.querySelector('#work header'), showcases[0]],
      ['lastShowcase→secondary', showcases.at(-1), document.querySelector('[data-secondary-row]')],
      ['work→about', document.getElementById('work'), document.getElementById('about')],
      ['about→skills', document.getElementById('about'), document.getElementById('skills')],
      ['skills→experience', document.getElementById('skills'), document.getElementById('experience')],
      ['experience→contact', document.getElementById('experience'), document.getElementById('contact')],
      ['contact→footer', document.getElementById('contact'), document.querySelector('footer')],
    ];
    for (const [label, a, b] of blocks) {
      if (a && b) out.gaps[label] = Math.round(rect(b).top - rect(a).bottom);
    }
    const row = (sel) => {
      const el = document.querySelector(sel);
      return el ? px(el, 'paddingTop') : null;
    };
    out.rows = {
      metaRow: row('dl.border-t > div'),
      skillRow: row('.skill-domain button'),
      secondaryRow: row('[data-secondary-row] > div:nth-child(2)'),
      experienceRow: row('#experience article'),
    };
    out.h2 = Object.fromEntries(
      [...document.querySelectorAll('h2')].map((h) => [h.id || 'anon', px(h, 'fontSize')]),
    );
    return out;
  });
  await page.close();
}
await browser.close();
await writeFile(`prime/evidence/screenshots/polish/${TAG}-metrics.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
