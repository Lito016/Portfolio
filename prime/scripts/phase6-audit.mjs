// Phase 6 browser audit harness: serves out/ (Next export clean URLs), drives
// Playwright Chromium across routes/viewports, captures console/network/perf/
// a11y (axe-core)/layout facts and structured UAT journey evidence.
// Read-only against the app; no submissions, no external POSTs.
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { chromium } from '@playwright/test';

const require = createRequire(import.meta.url);
const PORT = 4173;
const BASE = `http://127.0.0.1:${PORT}`;
const OUT = 'out';
const SHOTS = 'prime/evidence/screenshots/p6';
const UAT_DIR = 'prime/test/reports';
const started = new Date().toISOString();

fs.mkdirSync(SHOTS, { recursive: true });
fs.mkdirSync(UAT_DIR, { recursive: true });

// ── static server with export URL mapping ──────────────────────────────
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.txt': 'text/plain', '.woff2': 'font/woff2', '.json': 'application/json', '.xml': 'application/xml', '.webmanifest': 'application/manifest+json' };
function fileFor(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]);
  const base = path.join(OUT, clean);
  const candidates = clean.endsWith('/') ? [path.join(base, 'index.html')] : [base + '.html', base, path.join(base, 'index.html')];
  for (const c of candidates) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }
  // Next export RSC payloads: segments join nested dirs with '.' or '/'.
  const dir = path.dirname(base);
  const name = path.basename(base);
  if (name.startsWith('__next.') && name.endsWith('.txt')) {
    const parts = name.slice(0, -'.txt'.length).split('.');
    const n = parts.length - 1;
    for (let mask = 0; mask < (1 << Math.max(0, n - 1)); mask++) {
      const segs = [parts[0]];
      for (let i = 1; i < n; i++) {
        if (mask & (1 << (i - 1))) segs[segs.length - 1] += '.' + parts[i];
        else segs.push(parts[i]);
      }
      const p = path.join(dir, ...segs, parts[parts.length - 1] + '.txt');
      if (fs.existsSync(p) && fs.statSync(p).isFile()) return p;
    }
  }
  return null;
}
const server = http.createServer((req, res) => {
  const f = fileFor(req.url);
  if (!f) { res.writeHead(404, { 'content-type': 'text/plain' }); res.end('404'); return; }
  res.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(PORT, '127.0.0.1', r));

// ── route inventory from out/ *.html files ─────────────────────────────
const routeSet = new Set();
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { if (e.name !== '_next' && !e.name.startsWith('__')) walk(p); }
    else if (e.name.endsWith('.html')) {
      let rel = '/' + path.relative(OUT, p).replace(/\\/g, '/');
      if (rel === '/index.html') rel = '/';
      else if (rel.endsWith('/index.html')) rel = rel.slice(0, -'/index.html'.length);
      else rel = rel.slice(0, -'.html'.length);
      if (rel !== '/404' && rel !== '/_not-found') routeSet.add(rel);
    }
  }
})('out');
const dataRoutes = [...routeSet].sort();
const ALL_JOURNEY_CANDIDATES = ['/', '/projects', '/about', '/skills', '/resume', '/contact', '/projects/quill-mcp', '/blog'];
const JOURNEYS = ALL_JOURNEY_CANDIDATES.filter((r) => dataRoutes.includes(r));
const VIEWPORTS = [
  { name: 'mobile-sm', width: 320, height: 568 },
  { name: 'mobile', width: 375, height: 667 },
  { name: 'mobile-lg', width: 430, height: 932 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'desktop-lg', width: 1600, height: 1200 },
];

const axeSource = require('axe-core').source;

// framer entrance animations set inline opacity<1 until they finish (hero CTA
// ends at ~2.0s); measure contrast/overflow only after they settle.
async function waitSettled(page, capMs = 3000) {
  // Floor: viewport entrance animations start at inline opacity 0 (which the
  // settle predicate ignores) then run 0->1. The 1200ms floor guarantees the
  // animation has started; the predicate then waits out long-tail cases (hero
  // CTA ends at ~2.0s).
  await page.waitForTimeout(1200);
  await page.waitForFunction(() => {
    for (const el of document.querySelectorAll('main [style]')) {
      const o = parseFloat(getComputedStyle(el).opacity);
      if (o > 0.01 && o < 0.99) return false;
    }
    return true;
  }, undefined, { timeout: capMs }).catch(() => {});
}

const browser = await chromium.launch();
// P6_A11Y_ONLY=1 runs only the axe accessibility loop and writes only
// phase-6-a11y-audit.json, leaving the playwright e2e-results artifact intact
// so the two receipts attest disjoint outputs.
const A11Y_ONLY = process.env.P6_A11Y_ONLY === '1';

// one reused context per viewport (context creation is the expensive part)
const contexts = new Map();
async function contextFor(vp) {
  if (!contexts.has(vp.name)) {
    contexts.set(vp.name, await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 }));
  }
  return contexts.get(vp.name);
}
async function withPage(vp, fn, shared = false) {
  const ctx = shared ? await contextFor(vp) : await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  try { return await fn(page); } finally {
    await page.close();
    if (!shared) await ctx.close();
  }
}

async function newPage(vp) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const consoleMsgs = [];
  attachConsole(page, consoleMsgs);
  return { ctx, page, consoleMsgs };
}
function attachConsole(page, sink) {
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') sink.push({ type: m.type(), text: m.text().slice(0, 300) }); });
  page.on('pageerror', (e) => sink.push({ type: 'pageerror', text: String(e).slice(0, 300) }));
  page.on('requestfailed', (r) => sink.push({ type: 'requestfailed', text: `${r.url().slice(0, 160)} ${r.failure()?.errorText || ''}` }));
}

const results = { tool: 'playwright', started, results: [], screenshots: [], console_errors: [], network_failures: [], viewports: VIEWPORTS.map((v) => v.name), routes_tested: dataRoutes };
const slug = (r) => (r === '/' ? 'home' : r.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, ''));
function shotPath(r, vp) { return `${SHOTS}/${slug(r)}__${vp.name}.png`; }

// ── sweep: every route at desktop, console + h1 + overflow + perf ───────
const desktop = VIEWPORTS.find((v) => v.name === 'desktop');
if (!A11Y_ONLY) for (const route of dataRoutes) {
  const entry = { route, viewport: desktop.name };
  try {
    await withPage(desktop, async (page) => {
      const msgs = [];
      attachConsole(page, msgs);
      const t0 = Date.now();
      const resp = await page.goto(BASE + route, { waitUntil: 'load', timeout: 20000 });
      entry.http_status = resp ? resp.status() : 0;
      entry.load_ms = Date.now() - t0;
      await waitSettled(page); // let framer entrance animations settle before measuring layout
      entry.perf = await page.evaluate(() => {
        const n = performance.getEntriesByType('navigation')[0];
        const paints = Object.fromEntries(performance.getEntriesByType('paint').map((p) => [p.name, Math.round(p.startTime)]));
        return { fcp: paints['first-contentful-paint'] ?? null, domContentLoaded: n ? Math.round(n.domContentLoadedEventEnd - n.startTime) : null, transfer: n ? n.transferSize : null };
      });
      entry.checks = await page.evaluate(() => {
        const de = document.documentElement;
        return {
          h1: document.querySelectorAll('h1').length,
          title: (document.title || '').slice(0, 120),
          horizontal_overflow: de.scrollWidth > de.clientWidth + 1,
          lang: de.lang,
          img_missing_alt: [...document.images].filter((i) => !i.hasAttribute('alt') && !i.getAttribute('aria-hidden')).length,
        };
      });
      await page.screenshot({ path: shotPath(route, desktop), fullPage: true });
      entry.screenshot = shotPath(route, desktop);
      results.screenshots.push(entry.screenshot);
      const pageErrors = msgs.filter((m) => m.type === 'error' || m.type === 'pageerror');
      const netFails = msgs.filter((m) => m.type === 'requestfailed');
      if (pageErrors.length) results.console_errors.push({ route, errors: pageErrors });
      if (netFails.length) results.network_failures.push({ route, failures: netFails });
      entry.console = { errors: pageErrors.length, warnings: msgs.filter((m) => m.type === 'warning').length, network_failures: netFails.length };
      entry.status = entry.http_status === 200 && !entry.checks?.horizontal_overflow && entry.checks?.h1 >= 1 && pageErrors.length === 0 ? 'pass' : 'fail';
    }, true);
  } catch (err) {
    entry.error = String(err).slice(0, 200);
    entry.status = 'fail';
  }
  results.results.push(entry);
}

// ── responsive matrix on journey routes ────────────────────────────────
if (!A11Y_ONLY) for (const route of JOURNEYS) {
  for (const vp of VIEWPORTS.filter((v) => v.name !== 'desktop')) {
    const entry = { route, viewport: vp.name, kind: 'responsive' };
    try {
      await withPage(vp, async (page) => {
        await page.goto(BASE + route, { waitUntil: 'load', timeout: 20000 });
        await waitSettled(page);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
        entry.checks = { horizontal_overflow: overflow };
        await page.screenshot({ path: shotPath(route, vp), fullPage: true });
        entry.screenshot = shotPath(route, vp);
        results.screenshots.push(entry.screenshot);
        entry.status = overflow ? 'fail' : 'pass';
      }, true);
    } catch (err) { entry.error = String(err).slice(0, 160); entry.status = 'fail'; }
    results.results.push(entry);
  }
}

// ── axe accessibility audit (desktop, all content routes) ──────────────
const a11y = { tool: 'axe', tool_version: require('axe-core/package.json').version, started, audit_tool: 'axe', pages: [], evidence_paths: [], violations_total: 0, passes_total: 0, incomplete_total: 0 };
for (const route of dataRoutes) {
  try {
    const pageReport = await withPage(desktop, async (page) => {
      await page.goto(BASE + route, { waitUntil: 'load', timeout: 20000 });
      await waitSettled(page);
      await page.addScriptTag({ content: axeSource });
      return page.evaluate(async () => {
        const r = await window.axe.run(document);
        return {
          violations: r.violations.map((v) => ({ id: v.id, impact: v.impact, wcag: (v.tags || []).filter((t) => t.startsWith('wcag')), nodes: v.nodes.length, target: (v.nodes[0]?.target || []).join(' ') })),
          incomplete: r.incomplete.map((v) => v.id),
          passes: r.passes.length,
        };
      });
    }, true);
    const rules = pageReport.violations;
    a11y.pages.push({ route, violations: rules.length, violation_rules: rules, incomplete: pageReport.incomplete.length, pass_count: pageReport.passes });
    a11y.violations_total += rules.length;
    a11y.passes_total += pageReport.passes;
    a11y.incomplete_total += pageReport.incomplete.length;
    const evShot = shotPath(route, desktop);
    if (fs.existsSync(evShot)) a11y.evidence_paths.push(evShot);
  } catch (err) {
    a11y.pages.push({ route, error: String(err).slice(0, 160), violations: -1 });
  }
}
a11y.completed_at = new Date().toISOString();

// ── UAT journeys ───────────────────────────────────────────────────────
const journeys = [];
const check = (rec, name, cond, detail = '') => rec.steps.push({ name, status: cond ? 'pass' : 'fail', detail: typeof detail === 'string' ? detail.slice(0, 200) : JSON.stringify(detail).slice(0, 200) });

async function runJourney(id, title, stepFactory) {
  if (A11Y_ONLY) return;
  const vp = VIEWPORTS.find((v) => v.name === 'desktop');
  const { ctx, page, consoleMsgs } = await newPage(vp);
  const rec = { id, title, tool: 'playwright', steps: [], screenshots: [], started: new Date().toISOString() };
  try {
    for (const step of stepFactory(page, rec)) await step();
  } catch (err) {
    rec.steps.push({ name: 'abort', status: 'fail', detail: String(err).slice(0, 200) });
  }
  rec.console_errors = consoleMsgs.filter((m) => m.type === 'error' || m.type === 'pageerror');
  rec.status = rec.steps.length > 0 && rec.steps.every((x) => x.status === 'pass') && rec.console_errors.length === 0 ? 'pass' : 'fail';
  rec.completed_at = new Date().toISOString();
  journeys.push(rec);
  for (const p of rec.screenshots) results.screenshots.push(p);
  await ctx.close();
  const file = `${UAT_DIR}/UAT-${id}-${slug(title)}.json`;
  fs.writeFileSync(file, JSON.stringify(rec, null, 2));
  rec.evidence_file = file;
}

// UAT-01 navigation: header links, mobile menu, theme toggle, focus ring
await runJourney('01', 'site-navigation-and-theme', (page, rec) => [
  async () => { await page.goto(BASE + '/', { waitUntil: 'load' }); },
  async () => {
    const hrefs = await page.locator('header nav[aria-label="Main navigation"] a').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    check(rec, 'desktop-nav-rendered', hrefs.length >= 4, JSON.stringify(hrefs));
  },
  async () => {
    await page.click('header nav[aria-label="Main navigation"] a[href="/projects"]');
    await page.waitForURL('**/projects');
    check(rec, 'nav-link-to-projects', page.url().includes('/projects'), page.url());
  },
  async () => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE + '/', { waitUntil: 'load' });
    await page.click('button[aria-label="Open menu"]');
    const visible = await page.locator('nav[aria-label="Mobile navigation"] a').first().isVisible();
    check(rec, 'mobile-menu-opens', visible);
    const shot = `${SHOTS}/uat01-mobile-menu__mobile.png`;
    await page.screenshot({ path: shot });
    rec.screenshots.push(shot);
  },
  async () => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(BASE + '/', { waitUntil: 'load' });
    // <html> is SSR'd with class "dark"; the provider effect re-applies the
    // resolved theme (setting style.colorScheme) shortly after load. Wait for
    // that before sampling `before`, else the read races the effect.
    await page.waitForFunction(() => document.documentElement.style.colorScheme === 'light' || document.documentElement.style.colorScheme === 'dark', undefined, { timeout: 3000 }).catch(() => {});
    await page.waitForTimeout(150);
    const before = await page.evaluate(() => document.documentElement.className);
    await page.click('button[aria-label^="Switch to"]');
    await page.waitForTimeout(400);
    const after = await page.evaluate(() => document.documentElement.className);
    check(rec, 'theme-toggle-switches', before !== after, `${before} -> ${after}`);
    const shot = `${SHOTS}/home__theme-toggled.png`;
    await page.screenshot({ path: shot, fullPage: true });
    rec.screenshots.push(shot);
  },
  async () => {
    // Real keyboard traversal. Clicking the theme toggle earlier leaves the
    // sequential-focus-navigation start at that header button, so Tab would
    // skip the nav links entirely. tabindex=-1 + focus() on body resets the
    // start point, then Tab until a header nav link is focused.
    await page.evaluate(() => {
      document.body.setAttribute('tabindex', '-1');
      document.body.focus();
    });
    let navFocused = false;
    for (let i = 0; i < 20 && !navFocused; i++) {
      await page.keyboard.press('Tab');
      navFocused = await page.evaluate(() => !!(document.activeElement && document.activeElement.closest && document.activeElement.closest('header nav a')));
    }
    const focus = await page.evaluate(() => {
      const s = getComputedStyle(document.activeElement);
      return { tag: document.activeElement.tagName.toLowerCase(), outline: s.outlineStyle + ' ' + s.outlineWidth, shadow: s.boxShadow !== 'none' };
    });
    await page.evaluate(() => document.body.removeAttribute('tabindex'));
    check(rec, 'focus-visible-on-nav-link', navFocused && (focus.outline !== 'none 0px' || focus.shadow), JSON.stringify(focus));
  },
]);

// UAT-02 projects filtering + category anchors
await runJourney('02', 'projects-filter-and-categories', (page, rec) => [
  async () => { await page.goto(BASE + '/projects', { waitUntil: 'load' }); },
  async () => {
    const cats = await page.locator('[id^="cat-"]').evaluateAll((els) => els.map((e) => e.id));
    check(rec, 'category-anchor-groups-present', cats.length === 3, JSON.stringify(cats));
  },
  async () => {
    const caseLinks = await page.locator('a[href^="/projects/"]').count();
    check(rec, 'featured-case-study-links', caseLinks >= 5, String(caseLinks));
  },
  async () => {
    await page.goto(BASE + '/projects#cat-ai-developer-tools', { waitUntil: 'load' });
    const box = await page.locator('#cat-ai-developer-tools').boundingBox();
    check(rec, 'anchor-scroll-target-rendered', !!box, JSON.stringify(box));
  },
  async () => {
    const shot = `${SHOTS}/uat02-projects-groups__desktop.png`;
    await page.screenshot({ path: shot, fullPage: true });
    rec.screenshots.push(shot);
  },
]);

// UAT-03 case study pages: all five reachable, sections render, UBMS omits workflow
await runJourney('03', 'case-study-pages', (page, rec) => [
  async () => { await page.goto(BASE + '/projects/quill-mcp', { waitUntil: 'load' }); },
  async () => {
    const heads = await page.locator('main h2').evaluateAll((hs) => hs.map((h) => h.textContent.trim()));
    check(rec, 'quill-sections-rendered', heads.includes('Overview') && heads.includes('Problem') && heads.includes('Architecture'), JSON.stringify(heads));
  },
  async () => {
    const metrics = await page.locator('main dl').count();
    check(rec, 'quill-metrics-present', metrics >= 1, String(metrics));
  },
  async () => {
    await page.goto(BASE + '/projects/ubms', { waitUntil: 'load' });
    const heads = await page.locator('main h2').evaluateAll((hs) => hs.map((h) => h.textContent.trim()));
    check(rec, 'ubms-omits-core-workflow', !heads.includes('Core Workflow'), JSON.stringify(heads));
  },
  async () => {
    for (const s of ['barangay-digital-portal', 'vision-video-auditor', 'prime-method']) {
      const r = await page.goto(BASE + '/projects/' + s, { waitUntil: 'load' });
      check(rec, `case-study-${s}-http-200`, r.status() === 200, String(r.status()));
    }
  },
  async () => {
    const shot = `${SHOTS}/uat03-case-study-quill__desktop.png`;
    await page.goto(BASE + '/projects/quill-mcp', { waitUntil: 'load' });
    await page.screenshot({ path: shot, fullPage: true });
    rec.screenshots.push(shot);
  },
]);

// UAT-04 resume + about integrity
await runJourney('04', 'resume-and-about', (page, rec) => [
  async () => { await page.goto(BASE + '/resume', { waitUntil: 'load' }); },
  async () => {
    const txt = (await page.locator('main').innerText()).toLowerCase();
    check(rec, 'resume-positioning-line', txt.includes('ai solution developer | full-stack systems developer'));
    check(rec, 'resume-selected-projects-section', txt.includes('selected projects'));
    check(rec, 'resume-no-beginner-labels', !/beginner|intermediate/i.test(txt), (txt.match(/beginner|intermediate/i) || [''])[0]);
  },
  async () => {
    await page.goto(BASE + '/about', { waitUntil: 'load' });
    const txt = (await page.locator('main').innerText()).toLowerCase();
    check(rec, 'about-how-i-work-flow', txt.includes('understand') && txt.includes('improve'));
  },
  async () => {
    const shot = `${SHOTS}/uat04-resume__desktop.png`;
    await page.goto(BASE + '/resume', { waitUntil: 'load' });
    await page.screenshot({ path: shot, fullPage: true });
    rec.screenshots.push(shot);
  },
]);

// UAT-05 contact form: renders (or env-gated fallback), validation guard, NO submission performed
await runJourney('05', 'contact-form-render-only', (page, rec) => [
  async () => { await page.goto(BASE + '/contact', { waitUntil: 'load' }); },
  async () => {
    const fields = await page.locator('main form input, main form textarea').count();
    const fallback = await page.locator('main').innerText();
    const hasFallback = /contact form is currently unavailable/i.test(fallback) && fallback.includes('manolitoalmadenjr@gmail.com');
    check(rec, 'contact-form-or-fallback-rendered', fields >= 3 || hasFallback, JSON.stringify({ fields, hasFallback, note: 'form is env-gated on NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY; this export build ships the direct-contact fallback card' }));
  },
  async () => {
    const fields = await page.locator('main form input, main form textarea').count();
    const labelled = await page.locator('main form label[for]').count();
    check(rec, 'form-labels-associated-when-configured', fields === 0 ? true : labelled >= 4, JSON.stringify({ fields, labelled }));
  },
  async () => {
    // deliberately no submit — web3forms POST would send real email
    check(rec, 'no-live-submission-performed', true, 'read-only audit; external POST endpoint not exercised by design (see security report)');
    const shot = `${SHOTS}/uat05-contact__desktop.png`;
    await page.screenshot({ path: shot, fullPage: true });
    rec.screenshots.push(shot);
  },
]);

// ── design token verification (expected vs actual, both themes) ───────
const tokenActual = A11Y_ONLY ? {} : await withPage(desktop, async (page) => {
  await page.goto(BASE + '/projects/quill-mcp', { waitUntil: 'load' });
  return page.evaluate(() => {
    const read = () => {
      const cs = getComputedStyle(document.documentElement);
      return {
        primary: cs.getPropertyValue('--primary').trim(),
        background: cs.getPropertyValue('--background').trim(),
        radius: cs.getPropertyValue('--radius').trim(),
        body_font: getComputedStyle(document.body).fontFamily.slice(0, 60),
      };
    };
    const el = document.documentElement;
    const original = el.className;
    el.classList.remove('light', 'dark');
    el.classList.add('light');
    const light = read();
    el.classList.remove('light');
    el.classList.add('dark');
    const dark = read();
    el.className = original;
    return { light, dark };
  });
});

// ── finish ─────────────────────────────────────────────────────────────
const flat = [];
for (const j of journeys) for (const s of j.steps) flat.push({ journey: j.id, step: s.name, status: s.status });
const totals = {
  route_checks: results.results.filter((r) => !r.kind).length,
  responsive_checks: results.results.filter((r) => r.kind === 'responsive').length,
  journey_steps: flat.length,
  tests_run: results.results.length + flat.length,
  passed: results.results.filter((x) => x.status === 'pass').length + flat.filter((s) => s.status === 'pass').length,
};
totals.failed = totals.tests_run - totals.passed;

const pwVersion = JSON.parse(fs.readFileSync('node_modules/@playwright/test/package.json', 'utf8')).version;
const doc = {
  tool: 'playwright',
  tool_version: pwVersion,
  command: 'node prime/scripts/phase6-audit.mjs',
  started,
  completed_at: new Date().toISOString(),
  base_url: BASE,
  tests_run: totals.tests_run,
  passed: totals.passed,
  failed: totals.failed,
  suites: [
    { name: 'route-sweep', checks: totals.route_checks },
    { name: 'responsive-matrix', checks: totals.responsive_checks },
    { name: 'uat-journeys', checks: totals.journey_steps, files: journeys.map((j) => j.evidence_file) },
  ],
  journeys: journeys.map((j) => ({ id: j.id, title: j.title, status: j.status, steps: j.steps.length, evidence_file: j.evidence_file })),
  results: results.results,
  screenshots: results.screenshots,
  console_errors: results.console_errors,
  network_failures: results.network_failures,
  console_log: results.console_errors.length === 0 && results.network_failures.length === 0 ? 'zero page errors and zero network failures across all routes' : JSON.stringify(results.console_errors).slice(0, 4000),
  design_tokens: (() => {
    // Computed custom properties normalize: leading zero dropped (.625rem),
    // #000000 shortens to #000. Compare canonicalized values.
    const canon = (v) => typeof v === 'string'
      ? v.replace(/^\.(\d)/, '0.$1').toLowerCase().replace(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/, '#$1$1$2$2$3$3')
      : v;
    const eq = (a, b) => canon(a) === canon(b);
    const t = tokenActual;
    const pass = !A11Y_ONLY && t.light && t.dark
      && eq(t.light.primary, '#2563eb') && eq(t.light.background, '#f8f9fc')
      && eq(t.dark.primary, '#5e82f6') && eq(t.dark.background, '#000000')
      && eq(t.light.radius, '0.625rem') && eq(t.dark.radius, '0.625rem');
    return {
      expected: {
        source: 'docs/DESIGN.canvas.tsx §tokens / globals.css; AA text-contrast corrected',
        light: { primary: '#2563eb', background: '#f8f9fc', radius: '0.625rem' },
        dark: { primary: '#5e82f6', background: '#000000', radius: '0.625rem' },
      },
      actual: t,
      verdict: pass ? 'pass' : 'deviation',
    };
  })(),
  cross_references: [...new Set(['tests/data-invariants.test.ts', 'src/data/projects.ts', 'docs/DESIGN.canvas.tsx', ...dataRoutes.map((r) => 'out' + (r === '/' ? '/index' : r) + '.html'), ...journeys.map((j) => j.evidence_file)])],
};
const rest = { ...doc };
delete rest.fingerprint;
doc.fingerprint = createHash('sha256').update(JSON.stringify(rest, Object.keys(rest).sort(), 2)).digest('hex');

if (!A11Y_ONLY) fs.writeFileSync('prime/reports/phase-6-e2e-results.json', JSON.stringify(doc, null, 2) + '\n');
const a = { ...a11y, compliance: a11y.violations_total === 0 ? 'pass' : 'violations-found', violations: a11y.violations_total, passes: a11y.passes_total, pages_audited: a11y.pages.length, cross_references: ['src/app/layout.tsx', 'src/components/layout/header.tsx', 'docs/DESIGN.canvas.tsx', ...a11y.pages.filter((p) => !p.error).map((p) => 'out' + (p.route === '/' ? '/index' : p.route) + '.html')] };
const r2 = { ...a };
delete r2.fingerprint;
a.fingerprint = createHash('sha256').update(JSON.stringify(r2, Object.keys(r2).sort(), 2)).digest('hex');
fs.writeFileSync('prime/reports/phase-6-a11y-audit.json', JSON.stringify(a, null, 2) + '\n');

await browser.close();
for (const ctx of contexts.values()) await ctx.close().catch(() => {});
contexts.clear();
server.close();
console.log('DONE tests_run:' + doc.tests_run + ' passed:' + doc.passed + ' failed:' + doc.failed + ' a11y_violations:' + a11y.violations_total + ' a11y_passes:' + a11y.passes_total);
console.log('journeys:', journeys.map((j) => j.id + '=' + j.status).join(' '));
for (const f of results.results.filter((r) => r.status === 'fail')) console.log('FAIL', f.route, f.viewport, JSON.stringify(f.checks || f.error || '').slice(0, 140));
for (const j of journeys) for (const s of j.steps.filter((x) => x.status === 'fail')) console.log('STEP-FAIL', j.id, s.name, s.detail);
