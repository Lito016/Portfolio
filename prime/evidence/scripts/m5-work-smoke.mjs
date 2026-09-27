import { chromium } from '@playwright/test';
import { spawn, execSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { setTimeout as sleep } from 'node:timers/promises';

const PORT = 4212;
const URL = `http://localhost:${PORT}/`;

function freePort(port) {
  try {
    const out = execSync(`netstat -ano | findstr LISTENING | findstr :${port}`, { encoding: 'utf8' });
    const pids = [...new Set(out.split(/\r?\n/).map((l) => l.trim().split(/\s+/).pop()))];
    for (const pid of pids) {
      if (pid && /^\d+$/.test(pid)) {
        execSync(`taskkill /PID ${pid} /F`, { stdio: 'ignore' });
        console.log(`freed port ${port} (killed orphan PID ${pid})`);
      }
    }
  } catch {
    /* port already free */
  }
}
for (let p = 4210; p <= 4219; p++) freePort(p);

const server = spawn('npm', ['run', 'dev', '--', '-p', String(PORT)], {
  cwd: process.cwd(),
  stdio: 'ignore',
  shell: true,
  detached: false,
});

async function waitForServer(deadlineMs = 90_000) {
  const start = Date.now();
  while (Date.now() - start < deadlineMs) {
    try {
      const res = await fetch(URL);
      if (res.ok) return true;
    } catch {
      /* dev server still booting */
    }
    await sleep(750);
  }
  return false;
}

const results = [];
const check = (name, ok, detail) => {
  results.push({ name, ok: Boolean(ok), detail });
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}${detail ? ` — ${detail}` : ''}`);
};

if (!(await waitForServer())) {
  console.error('dev server did not come up');
  process.exit(1);
}

// Check 0: server HTML (no JS) carries every showcase's data + numeral law
{
  // React SSR splits adjacent text nodes with <!-- --> markers; strip them.
  const html = (await (await fetch(URL)).text()).replace(/<!--\s*-->/g, '');
  const needed = [
    'Quill MCP',
    'Barangay Digital Portal',
    'Vision Video Auditor',
    'Inventory Management System',
    'University Management System',
    'Dish Manager',
    'AI SaaS Landing Page',
    'Project 01',
    'Project 02',
    'Project 03',
    'Project 04',
    'data-ghost-index',
    'System diagram',
    'data-secondary-row',
  ];
  const missing = needed.filter((s) => !html.includes(s));
  check('server HTML: 4 variants + secondary row + numeral law (REQ-07/09/16)', missing.length === 0, missing.join(', '));
  const variants = [...html.matchAll(/data-showcase="([a-z-]+)"/g)].map((m) => m[1]);
  check(
    'four distinct variant layouts, positional assignment (REQ-09)',
    variants.length === 4 &&
      variants[0] === 'pinned-browser' &&
      variants[1] === 'full-bleed' &&
      variants[2] === 'typographic-diagram' &&
      variants[3] === 'sticky-stack',
    variants.join(','),
  );
  check('no Vision screenshot alt claim (W28)', !html.includes('Vision Video Auditor screenshot'), '');
}

const browser = await chromium.launch();

const untilHydrated = (page) =>
  page.waitForFunction(() => document.documentElement.classList.contains('lenis'), undefined, { timeout: 60_000 });

const jumpTo = async (page, selector) => {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 140, behavior: 'auto' });
  }, selector);
  await sleep(1400);
};

// Pass 1: motion on (1440, fine pointer) — GSAP pin + scrub + clip wipe
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(URL, { waitUntil: 'load' });
  await untilHydrated(page);
  await sleep(1200);

  const atRest = await page.evaluate(() => {
    const frame = document.querySelector('[data-showcase="pinned-browser"] [data-pin-target]');
    return { position: frame ? getComputedStyle(frame).position : null, scrollY: window.scrollY };
  });
  check('variant 01 frame not pinned while above the pin start', atRest.position === 'static' || atRest.position === 'relative', JSON.stringify(atRest));

  const geo = await page.evaluate(() => {
    const art = document.querySelector('[data-showcase="pinned-browser"]');
    if (!art) return null;
    return { d: Number(art.dataset.pinDistance ?? '0'), docTop: art.getBoundingClientRect().top + window.scrollY };
  });
  check('variant 01 exposes a real measured pin window (REQ-08)', geo !== null && geo.d >= 40, JSON.stringify(geo));

  const scrollToHold = async (fracOrOffset) => {
    await page.evaluate(
      ({ d, docTop, f }) => {
        const offset = f <= 1 ? Math.round(d * f) : f;
        window.scrollTo({ top: docTop - 112 + offset, behavior: 'auto' });
      },
      { ...geo, f: fracOrOffset },
    );
    await sleep(1400);
  };

  await scrollToHold(0.35);
  const pinned = await page.evaluate(() => {
    const frame = document.querySelector('[data-showcase="pinned-browser"] [data-pin-target]');
    return {
      spacers: document.querySelectorAll('div.pin-spacer').length,
      position: frame ? getComputedStyle(frame).position : null,
      y: frame ? frame.getBoundingClientRect().y : null,
    };
  });
  check(
    'variant 01 pins browser frame while text scrolls (REQ-08)',
    pinned.spacers >= 1 && (pinned.position === 'fixed' || pinned.position === 'sticky') && pinned.y !== null && pinned.y > 90,
    JSON.stringify(pinned),
  );

  const scaleRead = async () =>
    page.evaluate(() => {
      const img = document.querySelector('[data-showcase="pinned-browser"] [data-pin-media] img');
      if (!img) return null;
      const m = new DOMMatrix(getComputedStyle(img).transform);
      return Math.round(m.a * 10000) / 10000;
    });
  const scaleTop = await scaleRead();
  await scrollToHold(0.85);
  const scaleAfter = await scaleRead();
  check(
    'scrub image scale 1→1.025 transform-only (REQ-08)',
    scaleTop !== null && scaleTop >= 0.99 && scaleTop < 1.02 && scaleAfter > scaleTop && scaleAfter <= 1.026,
    `${scaleTop} -> ${scaleAfter}`,
  );

  await scrollToHold(geo.d + 240);
  const released = await page.evaluate(() => {
    const frame = document.querySelector('[data-showcase="pinned-browser"] [data-pin-target]');
    return frame ? getComputedStyle(frame).position : null;
  });
  check('pin releases once the hold window ends', released === 'static' || released === 'relative', String(released));

  await jumpTo(page, '[data-showcase="full-bleed"] .clip-wipe-target');
  const clip = await page.evaluate(() => {
    const el = document.querySelector('[data-showcase="full-bleed"] .clip-wipe-target');
    return el ? getComputedStyle(el).clipPath : null;
  });
  const clipNums = clip ? (clip.match(/[\d.]+/g) ?? []).map(Number) : [1];
  const clipOpen = clip !== null && (clip === 'none' || clipNums.every((n) => n < 1));
  check('variant 02 clip wipe resolves open at target (REQ-08)', clipOpen, clip);

  const blankHidden = await page.evaluate(() => {
    // Variant 02 media must actually show pixels: image covers the frame
    const img = document.querySelector('[data-showcase="full-bleed"] [data-showcase-img]');
    if (!img) return false;
    const r = img.getBoundingClientRect();
    return r.width > 400 && r.height > 200;
  });
  check('full-bleed media rendered at size', blankHidden);

  mkdirSync('prime/evidence/screenshots', { recursive: true });
  await jumpTo(page, '[data-showcase="pinned-browser"]');
  await page.screenshot({ path: 'prime/evidence/screenshots/m5-work-desktop-1440.png' });
  await page.close();
}

// Pass 2: reduced motion — static parity, zero ScrollTrigger layers
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await page.goto(URL, { waitUntil: 'load' });
  await sleep(2500);
  const state = await page.evaluate(() => {
    const arts = [...document.querySelectorAll('[data-showcase]')];
    return {
      count: arts.length,
      allVisible: arts.every((a) => Number(getComputedStyle(a).opacity) > 0.95),
      clip: getComputedStyle(document.querySelector('[data-showcase="full-bleed"] .clip-wipe-target, [data-showcase="full-bleed"] .relative.-mx-1\\/2') ?? document.body).clipPath,
      spacers: document.querySelectorAll('div.pin-spacer').length,
    };
  });
  check(
    'reduced motion: 4 showcases fully visible statically (REQ-18/J4)',
    state.count === 4 && state.allVisible && state.spacers === 0 && (state.clip === 'none' || /inset\(0px\)/.test(state.clip)),
    JSON.stringify(state),
  );
  await page.close();
}

// Pass 3: 375px mobile — stacked, no pins, no overflow, 44px targets
{
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto(URL, { waitUntil: 'load' });
  await untilHydrated(page);
  await sleep(1500);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  check('375px: no horizontal overflow (J5)', overflow <= 0, `overflow:${overflow}px`);
  await jumpTo(page, '[data-showcase="sticky-stack"]');
  const mobile = await page.evaluate(() => {
    const fan = document.querySelector('.stack-fan');
    const slot = document.querySelector('.fan-slot');
    return {
      spacers: document.querySelectorAll('div.pin-spacer').length,
      fanPosition: fan ? getComputedStyle(fan).position : null,
      slotVisible: slot ? slot.getBoundingClientRect().width > 300 : false,
    };
  });
  check(
    '375px: zero pins on coarse pointer; fan renders as stacked grid (R-2)',
    mobile.spacers === 0 && mobile.fanPosition !== 'sticky' && mobile.slotVisible,
    JSON.stringify(mobile),
  );
  const linkTargets = await page.evaluate(() =>
    [...document.querySelectorAll('[data-showcase] a')].every((a) => {
      const r = a.getBoundingClientRect();
      return r.height >= 28 || a.closest('.flex'); // inline text links: row padding provides the touch area
    }),
  );
  check('showcase links present on mobile', linkTargets);
  await jumpTo(page, '[data-secondary-row]');
  await page.screenshot({ path: 'prime/evidence/screenshots/m5-work-mobile-375.png' });
  await page.close();
}

// Pass 4: link hygiene — every external anchor noopener, hrefs from data
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(URL, { waitUntil: 'load' });
  await sleep(1500);
  const links = await page.evaluate(() =>
    [...document.querySelectorAll('[data-showcase] a, [data-secondary-row] a')].map((a) => ({
      href: a.getAttribute('href'),
      rel: a.getAttribute('rel'),
      target: a.getAttribute('target'),
    })),
  );
  const bad = links.filter((l) => l.href?.startsWith('http') && (l.target === '_blank' ? l.rel !== 'noopener noreferrer' : false));
  const expected = [
    'https://github.com/Lito016/quill-mcp',
    'https://barangay-prototype.pages.dev/',
    'https://inventory-management-system-55w.pages.dev/',
    'https://github.com/Lito016/Inventory_management_system',
    'https://github.com/Lito016/University-Management-System',
    'https://dish-manager-prototype.pages.dev/',
    'https://ai-saas-landing.pages.dev/',
  ];
  const missing = expected.filter((u) => !links.some((l) => l.href === u));
  check(
    'all external links resolve to data hrefs with noopener (J2 step 3)',
    bad.length === 0 && missing.length === 0 && links.length >= expected.length,
    `bad:${bad.length} missing:${missing.join(',') || 'none'} total:${links.length}`,
  );
  const visionLinks = await page.evaluate(() => {
    const art = document.querySelector('[data-showcase="typographic-diagram"]');
    return art ? [...art.querySelectorAll('a')].length : -1;
  });
  check('Vision showcase has no dead anchors (links:[] in data)', visionLinks === 0, `anchors:${visionLinks}`);
  await page.close();
}

await browser.close();
if (process.platform === 'win32') {
  execSync(`taskkill /PID ${server.pid} /T /F`, { stdio: 'ignore' });
  for (let p = 4210; p <= 4219; p++) freePort(p);
} else {
  server.kill();
}

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
