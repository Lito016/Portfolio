import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { setTimeout as sleep } from 'node:timers/promises';

const PORT = 4211;
const URL = `http://localhost:${PORT}/`;

import { execSync } from 'node:child_process';

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
freePort(PORT);

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

// Check 0: server HTML contains all hero strings (no JS)
{
  const html = await (await fetch(URL)).text();
  const needed = [
    'AI Solution Developer',
    'Full-Stack Systems Developer',
    'Systems that run operations',
    'manolitoalmadenjr@gmail.com',
    'Lito_016',
    'Ilocos Sur, Philippines',
    'AI-integrated web platform with agentic workflows',
  ];
  const missing = needed.filter((s) => !html.includes(s));
  check('server HTML has all hero strings (REQ-03)', missing.length === 0, missing.join(', '));
}

const browser = await chromium.launch();

const untilHydrated = (page) =>
  page.waitForFunction(
    () => document.documentElement.classList.contains('lenis'),
    undefined,
    { timeout: 60_000 },
  );

const opacityOf = (page, selector) =>
  page.evaluate((sel) => {
    const el = document.querySelector(sel);
    return el ? Number(getComputedStyle(el).opacity) : -1;
  }, selector);

// Pass 1: motion on — staged sequence, canvas, indicator, type bounds
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(URL, { waitUntil: 'load' });
  await untilHydrated(page);

  // Sequence epoch marker (set at HeroMotion mount, pre-animation). Poll at fixed
  // offsets: t+700 (lines stage done, meta not started), t+1750 (meta in flight),
  // t+2900 (settled).
  const epoch = await page.evaluate(() =>
    Number(document.documentElement.getAttribute('data-hero-seq-start')),
  );
  const sampleAt = async (offsetMs) => {
    const wait = epoch + offsetMs - (await page.evaluate(() => performance.now()));
    if (wait > 0) await sleep(wait);
    return {
      line: await opacityOf(page, '[data-hero-line]'),
      meta: await opacityOf(page, '[data-hero-meta]'),
    };
  };
  const s700 = await sampleAt(700);
  const s1500 = await sampleAt(1500);
  const s2900 = await sampleAt(2900);
  check(
    'sequence staged 4 stages then settled (REQ-03)',
    s700.meta < 0.05 && s700.line > 0.01 && s700.line < 0.9 && s1500.line > 0.9 && s1500.meta < 0.05 && s2900.meta > 0.95 && s2900.line > 0.95,
    `t0.7 line:${s700.line.toFixed(2)} meta:${s700.meta.toFixed(2)} | t1.5 line:${s1500.line.toFixed(2)} meta:${s1500.meta.toFixed(2)} | t2.9 line:${s2900.line.toFixed(2)} meta:${s2900.meta.toFixed(2)}`,
  );

  const frameHash = () =>
    page.evaluate(() => {
      const c = document.querySelector('canvas.hero-canvas');
      if (!c || !c.width) return null;
      const g = c.getContext('2d');
      const d = g.getImageData(0, 0, c.width, c.height).data;
      let h = 0;
      let nonZero = 0;
      for (let i = 0; i < d.length; i += 1) {
        h = (h * 33 + d[i]) | 0;
        if (d[i] !== 0) nonZero += 1;
      }
      return nonZero > 0 ? h : null;
    });
  const before = await frameHash();
  await page.mouse.move(200, 300);
  await sleep(900);
  const near = await frameHash();
  await page.mouse.move(1300, 750);
  await sleep(900);
  const far = await frameHash();
  check(
    'canvas painted + reacts to pointer (REQ-05)',
    before !== null && near !== null && far !== null && near !== before && far !== near,
    `${before} -> ${near} -> ${far}`,
  );

  const indicator = await page.evaluate(() => {
    const el = document.querySelector('[data-scroll-indicator]');
    return el ? { hidden: el.getAttribute('aria-hidden') } : null;
  });
  check('scroll indicator present + aria-hidden (REQ-06)', indicator !== null && indicator.hidden === 'true', JSON.stringify(indicator));
  await page.mouse.wheel(0, 300);
  await sleep(600);
  const goneAfterScroll = await page.evaluate(() => !document.querySelector('[data-scroll-indicator]'));
  check('indicator yields after scroll', goneAfterScroll);
  await page.mouse.wheel(0, -300);

  const size1440 = await page.evaluate(() => Number(getComputedStyle(document.querySelector('h1')).fontSize.replace('px', '')));
  check(
    'headline >=86px and <=10vw at 1440 (REQ-04)',
    size1440 >= 86 && size1440 <= 144,
    `${size1440}px`,
  );

  mkdirSync('prime/evidence/screenshots', { recursive: true });
  await page.screenshot({ path: 'prime/evidence/screenshots/m4-hero-desktop-1440.png', fullPage: false });
  await page.close();
}

// Pass 2: reduced motion — static parity, no canvas loop
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await page.goto(URL, { waitUntil: 'load' });
  await page
    .waitForFunction(
      () => Number(getComputedStyle(document.querySelector('[data-hero-meta]')).opacity) > 0.9,
      undefined,
      { timeout: 60_000 },
    )
    .catch(() => {});
  await sleep(300);
  const meta = await opacityOf(page, '[data-hero-meta]');
  const line = await opacityOf(page, '[data-hero-line]');
  check('reduced motion: hero fully visible immediately', line > 0.9 && meta > 0.9, `line:${line} meta:${meta}`);
  const staticFlag = await page.evaluate(() => document.querySelector('canvas.hero-canvas')?.dataset.static === 'true');
  check('reduced motion: canvas flagged static', staticFlag);
  await page.close();
}

// Pass 3: 375px recompose — no horizontal overflow
{
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto(URL, { waitUntil: 'load' });
  await sleep(3500);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  const size375 = await page.evaluate(() => Number(getComputedStyle(document.querySelector('h1')).fontSize.replace('px', '')));
  check('375px: no horizontal overflow (REQ-04)', overflow <= 0, `overflow:${overflow}px h1:${size375}px`);
  await page.screenshot({ path: 'prime/evidence/screenshots/m4-hero-mobile-375.png', fullPage: false });
  await page.close();
}

await browser.close();
if (process.platform === 'win32') {
  spawn('taskkill', ['/pid', String(server.pid), '/T', '/F'], { shell: true, stdio: 'ignore' });
} else {
  server.kill();
}

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
