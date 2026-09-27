# Phase 5 — Build Report (Cycle 5)

Branch: `feat/cycle5-rebuild` (A-P3: no push to main; CI deploy trigger on `push: branches: [main]` stays inert).
Plan authority: `docs/PRP.md` milestones M0–M8. Design authority: `docs/DESIGN.canvas.tsx`. Content authority: `prime/state/fact-whitelist.md` W1–W28.

## M0 — Branch, pins, baseline (complete, committed dfa2ee2)

- `git checkout -b feat/cycle5-rebuild` from main bd2830b; `git branch --show-current` verified.
- Exact pins installed: `gsap@3.15.0`, `lenis@1.3.26`, `lucide-react@1.48.0` (`--save-exact`); `framer-motion` held at 12.42.2. package.json shows exact versions (D-4.3/R-8).
- Baseline green: `npx tsc --noEmit` exit 0, `npm run build` exit 0.
- AGENTS.md doc law: read bundled `node_modules/next/dist/docs/` static-exports guide before writing code (constraints: default loader unsupported → `images.unoptimized: true` kept; no redirects/middleware; `dynamic = 'force-static'` on meta routes).
- Supply-chain observation (recorded, not acted): npm warn install scripts not covered for `unrs-resolver@1.12.2` (pre-existing).

## M1 — Data layer reconciliation (verification only; no code changes required)

The cycle-4 data layer already satisfies the M1 acceptance set; every item below was read and verified in-session:

- `src/data/projects.ts`: discriminated union `FeaturedProject | OtherProject`; 4 featured (quill-mcp, barangay-digital-portal, vision-video-auditor, inventory-management-system) + 3 secondary (university-management-system, dish-manager, ai-saas-landing). `url: ''` + `links: []` on Vision (W9: no links, no metrics) — dead-anchor rule honored at the interface level (`HostedProjectBase.url` comment).
- Whitelist audit: every metric carries a `source` (W2/W3/W27); every URL matches W1/W5/W15/W17/W18/W19/W27; workflow/architecture node labels restate only owner-brief pipeline strings and existing caseStudy prose (W23 derivation rule). No mAP/FPS/latency/user-counts/X+ years (explicitly-not-whitelisted list) — zero hits.
- UBMS removal (superseded by W27): no `unified-business`/UBMS entries in projects.ts; no `/project-ubms.png` in `public/` (asset GC already done in the cycle-4 working tree).
- `src/data/skills.ts`: 7 owner-declared domains (W22), no Expert/Basic qualifiers; `techStackItems` retained for the marquee carrier-over removal at M2 shell rewrite.
- `src/config/site.ts` (W19): name/displayName/url/github/email/linkedin all match whitelist; `src/data/now.ts` nowData fields intact for FR-11 verbatim use at M6; `experience.ts` (FR-13 elements incl. location + technologies) and `education.ts` intact.
- Public assets: 11 PNGs listed; all `image:` paths in projects.ts/site.ts resolve (`/project-quill-mcp.png`, `/project-barangay.png`, `/project-vision.png`, `/project-inventory*.png` ×4, `/project-dish-manager.png`, `/project-ai-saas.png`).
- REQ-16 decoupling precondition: projects.ts exports are plain typed arrays; no component imports in `src/data/` (imports are types-only within data). The 5th-entry render proof executes at M5 per PRP.
- Testimonials/now handling per PRP M1 step 2: `now.ts` stays (FR-11 verbatim line consumed at M6); `testimonials.ts` is dropped from the render surface — its only importers are the testimonials route dir (deleted at M2) and the legacy `navigation.ts` allRoutes list (rewritten at M2); the data file itself is PRP-silent, so it stays orphaned pending the M8 orphan sweep.

## M2 — Shell, tokens, route cleanup, dep-GC

Commits: `f9004ef` (route deletion, isolated per PRP rollback rule) + shell commit (this section).

- **Step 1 globals.css**: rewritten light-only; canvas `cssVariables` token block verbatim (each hex + measured-contrast role comment); G32 parity — file carries the verbatim `custom_approval` quote and `@media (min-width: 768px)` / `@media (min-width: 1024px)` band layers (grep: lines 211/218); `scroll-behavior: smooth` gone (R-1; Lenis owns smoothing from M3); dark blocks, glassmorphism, marquee, shimeji, print/resume CSS removed; `@theme inline` mapping kept; transitional alias block for sections awaiting M4–M7 rewrite (retired at M8).
- **Step 2 layout.tsx**: theme flash script, `dark` class and theme provider wiring removed; Geist/Geist_Mono `next/font` vars, metadata, JSON-LD kept; single `themeColor: '#F8F9FC'`; skip-link + `Providers` (MotionConfig reducedMotion='user' only — QueryClient dropped, no importers remain) + grain overlay div (aria-hidden, decorative). `page.tsx` = single-page server composition in canvas §architecture order (Hero → Work → WhatIBuild-under-#about → Close), plain `#work/#about/#contact` wrapper ids until the sections own them at M5–M7.
- **Step 3 shell components**: `header.tsx` = fixed minimal nav, name left, Work/About/Contact anchors right, compact state (hairline + blur) driven by ScrollTrigger position trigger (`start: '80px top'`) — no raw scroll listener; hover via `.nav-link` rule + `(hover:hover) and (pointer:fine)` gate; 44px touch floor; press 0.97/150ms global. `footer.tsx` = FR-15 element list exactly: name, © YEAR, location (from `education[0].location`, no hardcoded facts), social links; inverse panel #121317 with --inverse-link 8.81:1. Lucide 1.48 has no brand icons (trademark removal) — GitHub/LinkedIn/Email render as text links; one icon family preserved elsewhere. `BackToTop`, `PageTransition`, `ErrorBoundary`, marquee carry-overs removed from the shell and deleted as orphans.
- **Step 4 route cleanup**: 19 secondary route dirs deleted (37 files, −1776 lines) incl. `src/app/contact/` (web3forms client + its `process.env` reads exit here, finding N5 timing); `not-found.tsx` rewritten static; `sitemap.ts` drops blog/case-study/allRoutes imports → canonical root only (anchors documented in comment); `manifest.ts` colors → #F8F9FC; `navigation.ts` reduced to `navAnchorItems`.
- **Step 5 dep/data GC**: uninstalled `next-themes react-hook-form zod @tanstack/react-query react-icons @hookform/resolvers` (last two left import-free by the shell rewrite; react-icons also dropped from `optimizePackageImports`). Data GC: `blog.ts`, `achievements.ts`, `certifications.ts`, `uses.ts` deleted (`git grep` = 0 importers); `team.ts` stays until M4 as planned; `testimonials.ts` orphaned pending M8 sweep. depcheck: only expected residue — `lenis` (M3 will import), `@tailwindcss/postcss`/`tailwindcss`/`@types/react-dom` (build-time false positives). Threat-model invariant 5 updated to the realized delta.
- **Step 6 _headers**: CSP → `connect-src 'self'`, `img-src 'self' data: blob:` (avatars host gone); all other headers untouched.

Verify (all executed): `npm run build` exit 0 (routes: /, /_not-found, manifest, robots, sitemap) · `npm run lint` exit 0 · theme-machinery grep `\.dark\b|dark:|useTheme|ThemeToggle|ThemeProvider|prefers-color-scheme` over shell files = 0 hits (@theme inline directive is the Tailwind mapping step 1 mandates, not machinery) · `out/index.html` server-rendered full text spot-checked ("AI Solution Developer", "Systems that run operations", "Quill MCP", "Ilocos Sur") with internal hrefs limited to `/` + asset chunks (zero links to deleted routes; REQ-19) · `process.env` in `src/` now = 1 hit only (hero `NEXT_PUBLIC_BASE_PATH`, exits at M4 per invariant schedule) · focus ring: global `:focus-visible` 3px accent-deep offset-2 token; header/footer controls are native anchors in DOM order, no focus traps (browser Tab verification in Phase 6 matrix).
