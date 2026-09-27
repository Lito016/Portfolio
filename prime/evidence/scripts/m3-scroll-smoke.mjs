import { chromium } from '@playwright/test';
import { spawn, execSync } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

const PORT = 4210;
const URL = `http://localhost:${PORT}/`;

// Stale-server defense (M7 harness law): any orphan serve on 421x answers with
// an out/ snapshot from before the current build. Sweep the whole band.
const killPort = (p) => {
  try {
    const out = execSync(`netstat -ano | findstr :${p} | findstr LISTENING`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    for (const line of out.split('\n')) {
      const pid = line.trim().split(/\s+/).pop();
      if (pid && /^\d+$/.test(pid)) execSync(`taskkill /PID ${pid} /F`, { stdio: 'ignore' });
    }
  } catch {
    /* port free */
  }
};
for (let p = 4210; p <= 4219; p++) killPort(p);

const server = spawn('npx', ['--yes', 'serve', '-l', String(PORT), 'out'], {
  stdio: 'ignore',
  shell: true,
  detached: false,
});
await sleep(4000);

const results = [];
const check = (name, ok, detail) => {
  results.push({ name, ok: Boolean(ok), detail });
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}${detail ? ` — ${detail}` : ''}`);
};

const browser = await chromium.launch();

// Pass 1: normal motion — Lenis must own scrolling
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(URL, { waitUntil: 'load' });
  await sleep(1200);
  const hasLenis = await page.evaluate(() =>
    document.documentElement.classList.contains('lenis')
  );
  check('lenis constructed (motion on)', hasLenis);

  const scrollBehavior = await page.evaluate(
    () => getComputedStyle(document.documentElement).scrollBehavior
  );
  check('html scroll-behavior not smooth', scrollBehavior !== 'smooth', scrollBehavior);

  await page.click('nav[aria-label="Main navigation"] a[href="#work"]');
  const a = await page.evaluate(() => window.scrollY);
  await sleep(250);
  const b = await page.evaluate(() => window.scrollY);
  const targetTop = await page.evaluate(() => {
    const el = document.querySelector('#work');
    return el ? el.getBoundingClientRect().top + window.scrollY : null;
  });
  check(
    'anchor click animates in stages (smooth)',
    b > a - 1 && (targetTop === null || b <= targetTop + 2),
    `t+0:${Math.round(a)} t+250:${Math.round(b)} target:${Math.round(targetTop ?? -1)}`
  );
  await sleep(1400);
  const settledPair = await page.evaluate(() => {
    const el = document.querySelector('#work');
    if (!el) return { y: window.scrollY, top: null, margin: 0 };
    const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    return { y: window.scrollY, top: el.getBoundingClientRect().top + window.scrollY, margin };
  });
  check(
    'settles at CSS scroll-margin target (single offset owner)',
    settledPair.top !== null && Math.abs(settledPair.y - (settledPair.top - settledPair.margin)) <= 4,
    `settled:${Math.round(settledPair.y)} margin:${settledPair.margin}`
  );

  await page.goto(URL, { waitUntil: 'load' });
  await page.keyboard.press('Tab');
  const first = await page.evaluate(() => document.activeElement?.getAttribute('href'));
  await page.keyboard.press('Tab');
  const second = await page.evaluate(() => document.activeElement?.getAttribute('href'));
  check(
    'keyboard Tab: skip-link then nav name',
    first === '#main-content' && second === '/',
    `${first} -> ${second}`
  );
  await page.close();
}

// Pass 2: reduced motion — Lenis never constructed
{
  const page = await browser.newPage({
    viewport: { width: 1280, height: 800 },
    reducedMotion: 'reduce',
  });
  await page.goto(URL, { waitUntil: 'load' });
  await sleep(1200);
  const hasLenis = await page.evaluate(() =>
    document.documentElement.classList.contains('lenis')
  );
  check('no Lenis instance (reduced motion)', !hasLenis);
  const scrollBehavior = await page.evaluate(
    () => getComputedStyle(document.documentElement).scrollBehavior
  );
  check(
    'scroll-behavior auto under reduced motion',
    scrollBehavior === 'auto',
    scrollBehavior
  );
  await page.click('nav[aria-label="Main navigation"] a[href="#work"]');
  await sleep(120);
  const early = await page.evaluate(() => window.scrollY);
  const targetTop = await page.evaluate(() => {
    const el = document.querySelector('#work');
    return el ? el.getBoundingClientRect().top + window.scrollY : null;
  });
  check(
    'native anchor jump lands immediately',
    targetTop === null || early > 100,
    `scrollY:${Math.round(early)} target:${Math.round(targetTop ?? -1)}`
  );
  await page.close();
}

await browser.close();
if (process.platform === 'win32') {
  execSync(`taskkill /PID ${server.pid} /T /F`, { stdio: 'ignore' });
} else {
  server.kill();
}
for (let p = 4210; p <= 4219; p++) killPort(p);

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
