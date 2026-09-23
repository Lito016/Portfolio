// One-off diagnostic probe: contact overflow element, axe detail with
// animations settled, svg-img-alt and listitem node targets.
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { createRequire } from 'node:module';
import { chromium } from '@playwright/test';

const require = createRequire(import.meta.url);
const PORT = 4198;
const BASE = `http://127.0.0.1:${PORT}`;
const OUT = 'out';
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.txt': 'text/plain', '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json', '.xml': 'application/xml' };
function fileFor(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]);
  const base = path.join(OUT, clean);
  const candidates = clean.endsWith('/') ? [path.join(base, 'index.html')] : [base + '.html', base, path.join(base, 'index.html')];
  for (const c of candidates) if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  const dir = path.dirname(base);
  const name = path.basename(base);
  if (name.startsWith('__next.') && name.endsWith('.txt')) {
    const parts = name.slice(0, -4).split('.');
    for (let i = 2; i < parts.length; i++) {
      const p = path.join(dir, parts.slice(0, i).join('.'), parts.slice(i).join('.') + '.txt');
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

const axeSource = require('axe-core').source;
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });

// ── axe detail on settled pages ────────────────────────────────────────
for (const route of ['/', '/skills', '/resume', '/projects/quill-mcp', '/blog', '/blog/my-journey-into-agentic-ai', '/uses']) {
  const page = await ctx.newPage();
  await page.goto(BASE + route, { waitUntil: 'load' });
  await page.waitForTimeout(1200);
  await page.addScriptTag({ content: axeSource });
  const res = await page.evaluate(async () => {
    const r = await window.axe.run(document, { resultTypes: ['violations'] });
    return r.violations.map((v) => ({
      id: v.id, impact: v.impact, nodes: v.nodes.slice(0, 4).map((n) => ({
        target: n.target.join(' '),
        html: n.html.slice(0, 160),
        msg: (n.any[0]?.message || n.all[0]?.message || '').slice(0, 200),
      })),
      total: v.nodes.length,
    }));
  });
  console.log('==', route);
  for (const v of res) for (const n of v.nodes) console.log(' ', v.id, `(${v.total})`, '|', n.target, '|', n.msg.slice(0, 140));
  await page.close();
}

// ── contact overflow element at 375 ────────────────────────────────────
const cpage = await ctx.newPage();
await cpage.setViewportSize({ width: 375, height: 667 });
await cpage.goto(BASE + '/contact', { waitUntil: 'load' });
await cpage.waitForTimeout(1200);
const wide = await cpage.evaluate(() => {
  const vw = document.documentElement.clientWidth;
  const out = [];
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.right > vw + 1 && r.width > 0) {
      const cs = getComputedStyle(el);
      if (cs.position === 'fixed') continue;
      out.push({ tag: el.tagName, cls: String(el.className).slice(0, 80), right: Math.round(r.right), w: Math.round(r.width), text: (el.textContent || '').trim().slice(0, 50) });
      if (out.length > 12) break;
    }
  }
  return out;
});
console.log('== /contact overflow @375:', JSON.stringify(wide, null, 1));
await cpage.close();

await browser.close();
server.close();
