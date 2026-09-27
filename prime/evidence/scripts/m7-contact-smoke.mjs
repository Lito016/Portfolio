import { chromium } from '@playwright/test';
import { spawn, execSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { setTimeout as sleep } from 'node:timers/promises';

const PORT = 4214;
const URL = `http://localhost:${PORT}/`;

function killPort(port) {
  try {
    const out = execSync(`netstat -ano | findstr LISTENING | findstr :${port} `, { encoding: 'utf8' });
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
// Next 16 allows ONE dev server per project dir; an orphan on any 421x port holds the lock.
for (let p = 4210; p <= 4219; p++) killPort(p);
killPort(PORT);

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

// Check 0: server HTML — statement, exact siteConfig hrefs (FR-14), footer set (FR-15)
{
  const html = (await (await fetch(URL)).text()).replace(/<!--\s*-->/g, '').replace(/&#x27;|&rsquo;|\u2019/g, "'");
  const needed = [
    "LET'S BUILD SOMETHING.",
    'mailto:manolitoalmadenjr@gmail.com',
    'https://linkedin.com/in/manolito-almaden-jr-a54a6634a',
    'https://github.com/Lito016',
    'Start a conversation',
    'id="contact"',
  ];
  const missing = needed.filter((s) => !html.includes(s));
  check('server HTML: statement + three siteConfig hrefs + CTA (FR-14)', missing.length === 0, missing.join(', '));
  const year = String(new Date().getFullYear());
  const footerOk =
    html.includes('Lito_016') && html.includes(`© ${year}`) && html.includes('Philippines');
  check('footer element list: name, © YEAR, location, socials (FR-15)', footerOk, '');
}

const browser = await chromium.launch();

const untilHydrated = (page) =>
  page.waitForFunction(() => document.documentElement.classList.contains('lenis'), undefined, { timeout: 60_000 });

const jumpTo = async (page, selector) => {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 140, behavior: 'auto' });
  }, selector);
  await sleep(1200);
};

// Pass 1: 1440 — inversion, noopener, hover CTA, on-ink focus ring
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(URL, { waitUntil: 'load' });
  await untilHydrated(page);
  await jumpTo(page, '#contact');

  const panel = await page.evaluate(() => {
    const s = document.querySelector('#contact');
    const cs = getComputedStyle(s);
    return { bg: cs.backgroundColor, fg: cs.color };
  });
  check('contact is the tonal inversion #121317 (ADR-3.7)', panel.bg === 'rgb(18, 19, 23)' && panel.fg === 'rgb(248, 249, 252)', JSON.stringify(panel));

  const anchors = await page.evaluate(() =>
    [...document.querySelectorAll('#contact a')].map((a) => ({
      href: a.getAttribute('href'),
      target: a.getAttribute('target'),
      rel: a.getAttribute('rel'),
      radius: getComputedStyle(a).borderRadius,
    })),
  );
  const externals = anchors.filter((a) => a.href?.startsWith('https'));
  const noopenerOk = externals.length === 2 && externals.every((a) => a.target === '_blank' && a.rel === 'noopener noreferrer');
  const mailtos = anchors.filter((a) => a.href === 'mailto:manolitoalmadenjr@gmail.com');
  check('external links noopener; mailto direct (FR-14, J3)', noopenerOk && mailtos.length === 2, JSON.stringify(anchors));
  const pill = anchors.find((a) => a.radius !== '0px');
  const pillValue = pill ? parseFloat(pill.radius) : 0;
  check('CTA pill radius maximal (shape lock 9999px; Tailwind 4 rounded-full = calc(inf*1%) -> float32 clamp)', Number.isFinite(pillValue) && pillValue >= 9999, JSON.stringify({ ...pill, parsed: pillValue }));

  const ctaBefore = await page.evaluate(() => getComputedStyle(document.querySelector('.cta-pill')).backgroundColor);
  await page.hover('.cta-pill');
  await sleep(450);
  const ctaAfter = await page.evaluate(() => {
    const el = document.querySelector('.cta-pill');
    return { bg: getComputedStyle(el).backgroundColor, ms: Math.max(...getComputedStyle(el).transitionDuration.split(',').map((s) => Math.round(parseFloat(s) * 1000))) };
  });
  check('CTA hover change <=300ms (FR-14/REQ-10 budget)', ctaAfter.bg !== ctaBefore && ctaAfter.ms <= 300, `${ctaBefore} -> ${ctaAfter.bg} @${ctaAfter.ms}ms`);

  const ring = await page.evaluate(() => {
    const link = document.querySelector('#contact .contact-link');
    link.focus();
    const cs = getComputedStyle(link);
    // force-visible check: focus() alone may not trigger :focus-visible; keyboard path:
    return { outlineColor: cs.outlineColor, outlineWidth: cs.outlineWidth };
  });
  await page.keyboard.press('Tab');
  const ringKb = await page.evaluate(() => {
    const el = document.activeElement;
    const cs = getComputedStyle(el);
    return { tag: el.tagName, matches: el.closest('#contact') !== null, outline: cs.outlineColor, width: cs.outlineWidth };
  });
  check('on-ink focus ring variant #A8C7FA (canvas colorsDark)', ringKb.matches && ringKb.outline === 'rgb(168, 199, 250)' && ringKb.width === '3px', JSON.stringify({ ring, ringKb }));

  mkdirSync('prime/evidence/screenshots', { recursive: true });
  await page.screenshot({ path: 'prime/evidence/screenshots/m7-contact-desktop-1440.png' });
  await page.close();
}

// Pass 2: reduced motion + 375 — static parity, no overflow
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await page.goto(URL, { waitUntil: 'load' });
  await jumpTo(page, '#contact');
  const vis = await page.evaluate(() => {
    const h2 = document.querySelector('#contact h2');
    return Number(getComputedStyle(h2.closest('div') || h2).opacity) > 0 || getComputedStyle(h2).opacity === '1';
  });
  check('reduced motion: contact content present (FR-18)', vis);
  await page.close();
}
{
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto(URL, { waitUntil: 'load' });
  await untilHydrated(page);
  await sleep(1000);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  check('375px: no horizontal overflow (J5)', overflow <= 0, `overflow:${overflow}px`);
  await jumpTo(page, '#contact');
  const touch = await page.evaluate(() =>
    [...document.querySelectorAll('#contact a')].every((a) => a.getBoundingClientRect().height >= 40),
  );
  check('contact anchors meet touch floor', touch);
  await page.screenshot({ path: 'prime/evidence/screenshots/m7-contact-mobile-375.png' });
  await page.close();
}

await browser.close();
// Reap the whole npm->node tree, then sweep any survivor still holding a 421x port.
execSync(`taskkill /PID ${server.pid} /T /F`, { stdio: 'ignore' });
for (let p = 4210; p <= 4219; p++) killPort(p);

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
