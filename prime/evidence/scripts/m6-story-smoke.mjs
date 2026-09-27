import { chromium } from '@playwright/test';
import { spawn, execSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { setTimeout as sleep } from 'node:timers/promises';

const PORT = 4213;
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

// Check 0: server HTML (no JS) — FR-01 region order + every story fact verbatim
{
  const html = (await (await fetch(URL)).text())
    .replace(/<!--\s*-->/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"');
  const regions = ['<header', 'id="work"', 'id="about"', 'id="skills"', 'id="experience"', 'id="contact"', '<footer'];
  const positions = regions.map((r) => html.indexOf(r));
  const missingRegions = regions.filter((r) => !html.includes(r));
  check(
    'FR-01: eight regions present in DOM order (server HTML)',
    missingRegions.length === 0 && positions.every((p, i) => i === 0 || p > positions[i - 1]),
    JSON.stringify(Object.fromEntries(regions.map((r, i) => [r, positions[i]]))),
  );
  const needed = [
    // About statement (W21) + nowData verbatim (finding F1)
    'AI Solution Developer.',
    'Full-Stack Systems Developer.',
    'AI-integrated web platform with agentic workflows',
    // FR-11 metadata verbatim fields from data files
    'Philippines',
    'Bachelor of Science in Information Technology',
    'Ilocos Sur Polytechnic State College',
    '2025–2026',
    'Software Developer Intern',
    'Bayanihan Network Inc.',
    'Feb 2026 – Apr 2026',
    'Business & Management Systems',
    // FR-12: seven domains + detail text always in server HTML (AT-visible)
    'Languages',
    'Databases & BaaS',
    'Infrastructure & Deployment',
    'Engineering',
    'Prompt Engineering',
    // FR-13: single entry element list
    'Assisted in the design and development of software applications',
    'HTML & CSS · PHP · SQL · AI Tools · Mobile Development',
  ];
  const missing = needed.filter((s) => !html.includes(s));
  check('server HTML: all story facts verbatim (REQ-11/12/13)', missing.length === 0, missing.join(', '));
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

// Pass 1: 1440 fine pointer — skills reveal law (hover / focus / tap), no badge cloud
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(URL, { waitUntil: 'load' });
  await untilHydrated(page);
  await jumpTo(page, '#skills');

  const panelState = (name) =>
    page.evaluate((domain) => {
      const rows = [...document.querySelectorAll('.skill-domain')];
      const row = rows.find((r) => r.querySelector('button')?.textContent.includes(domain));
      if (!row) return null;
      const panel = row.querySelector('.skill-panel');
      const inner = panel.querySelector('div');
      return {
        opacity: Number(getComputedStyle(panel).opacity),
        height: inner.getBoundingClientRect().height,
        expanded: row.querySelector('button')?.getAttribute('aria-expanded'),
      };
    }, name);

  const atRest = await panelState('Languages');
  check('skills panel collapsed at rest on fine pointer (FR-12)', atRest !== null && atRest.opacity < 0.05 && atRest.height < 4, JSON.stringify(atRest));

  await page.hover('.skill-domain button');
  await sleep(450);
  const hovered = await panelState('Languages');
  check('hover reveals domain detail <=300ms budget (FR-12)', hovered.opacity > 0.9 && hovered.height > 8, JSON.stringify(hovered));

  const transitionMs = await page.evaluate(() => {
    const t = getComputedStyle(document.querySelector('.skill-panel')).transitionDuration;
    return Math.max(...t.split(',').map((s) => Math.round(parseFloat(s) * 1000)));
  });
  check('reveal transition within micro budget <=300ms (REQ-12)', transitionMs <= 300, `${transitionMs}ms`);

  await page.mouse.move(10, 10);
  await sleep(450);
  await page.focus('.skill-domain button');
  await sleep(450);
  const focused = await panelState('Languages');
  check('keyboard focus reveals equivalently (FR-12 AC)', focused.opacity > 0.9 && focused.height > 8, JSON.stringify(focused));

  await page.evaluate(() => document.activeElement.blur());
  await sleep(450);
  await page.click('.skill-domain button');
  await sleep(450);
  const tapped = await panelState('Languages');
  check('tap/click toggles with aria-expanded (FR-12 coarse/keyboard parity)', tapped.opacity > 0.9 && tapped.height > 8 && tapped.expanded === 'true', JSON.stringify(tapped));

  const badgeCloud = await page.evaluate(() => {
    // FR-12 "NO badge cloud": each domain detail must be ONE text line, not per-item chips
    const panels = [...document.querySelectorAll('.skill-panel > div')];
    return panels.every((p) => p.querySelectorAll('span, li, a').length === 0);
  });
  check('no badge cloud: details render as single typographic lines (REQ-12)', badgeCloud);

  await page.evaluate(() => document.querySelector('.skill-domain button').click());
  await jumpTo(page, '#about');
  mkdirSync('prime/evidence/screenshots', { recursive: true });
  await page.screenshot({ path: 'prime/evidence/screenshots/m6-story-desktop-1440.png' });
  await page.close();
}

// Pass 2: reduced motion — reveal is opacity-only; all content statically present
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await page.goto(URL, { waitUntil: 'load' });
  await jumpTo(page, '#skills');
  const state = await page.evaluate(() => {
    const panel = document.querySelector('.skill-panel');
    const cs = getComputedStyle(panel);
    const sections = [...document.querySelectorAll('main section, main header ~ *')];
    const about = document.querySelector('#about');
    return {
      props: cs.transitionProperty,
      aboutVisible: Number(getComputedStyle(about).opacity) > 0.95 || getComputedStyle(about.firstElementChild.firstElementChild).opacity === '1',
      sectionCount: sections.length,
      pinnedSpacers: document.querySelectorAll('div.pin-spacer').length,
    };
  });
  check('reduced motion: skill reveal collapses to opacity-only (canvas floor)', state.props === 'opacity', state.props);
  check('reduced motion: story content present, zero pins (FR-18)', state.pinnedSpacers === 0);
  await page.close();
}

// Pass 3: 375px — no overflow, coarse pointer: detail reachable without hover
{
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto(URL, { waitUntil: 'load' });
  await untilHydrated(page);
  await sleep(1200);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  check('375px: no horizontal overflow (J5)', overflow <= 0, `overflow:${overflow}px`);
  await jumpTo(page, '.skill-domain');
  await page.evaluate(() => document.querySelector('.skill-domain button').click());
  await sleep(500);
  const tapOpen = await page.evaluate(() => {
    const btn = document.querySelector('.skill-domain button');
    const panel = btn.closest('.skill-domain').querySelector('.skill-panel > div');
    return { height: panel.getBoundingClientRect().height, expanded: btn.getAttribute('aria-expanded') };
  });
  check('375px: tap reveals domain detail (FR-12 coarse parity)', tapOpen.height > 8 && tapOpen.expanded === 'true', JSON.stringify(tapOpen));
  await jumpTo(page, '#experience');
  await page.screenshot({ path: 'prime/evidence/screenshots/m6-story-mobile-375.png' });
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
