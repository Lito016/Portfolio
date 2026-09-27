# PRP — Implementation Plan: Cinematic Portfolio Rebuild (Cycle 5)

Inputs: `docs/PRD.md` (REQ-01…REQ-19, REQ-N01…REQ-N06, journeys J1–J5), `docs/DESIGN.canvas.tsx` (ANTIGRAVITY-EDITORIAL tokens, module schemas, behaviorStates), `prime/reports/phase-3-design.md` (ADR-3.1…ADR-3.9), `prime/reports/phase-3-quality-review.md` (verdict pass + carry-overs), `prime/state/fact-whitelist.md` (W1–W28).
Constraints honored: static `output:'export'` preserved (https://nextjs.org/docs/app/guides/static-exports); Cloudflare Pages `out/` artifact parity (PRD REQ-N06); Next 16 Turbopack — bundled docs re-read at each milestone before touching framework behavior (AGENTS.md law); exactly 2 new runtime deps gsap@3.15.0 + lenis@1.3.26 (~32KB gzip, Phase-1 bundlephobia evidence) and one pre-approved minor bump lucide-react 1.23.0→1.48.0 (ADR-3.8; `npm view` re-verified current 2026-09-27); framer-motion stays 12.42.2 (ADR-3.8); three/r3f stay forbidden (ADR-3.3).

## Assumptions & Prerequisites
- A-P1: owner supplies no new assets during Build → rebuild uses only `public/project-*.png`, `profile.png` and existing whitelisted facts; unknown = not shown (W-rule).
- A-P2: the 19 secondary routes are deleted in the same slice as the new home page (owner brief said "from scratch"); Phase 7 obtains explicit route-removal acknowledgment before deploy (risk R-7).
- A-P3: no deployment happens in Phase 5–6; publishing remains a separate user-authorized act. Mechanism stated explicitly (finding F10): `.github/workflows/ci.yml` triggers the Cloudflare deploy on `push: branches: [main]`, so A-P3 holds only while cycle-5 commits stay on `feat/cycle5-rebuild` — M0 step 1 branches after the Phase 3/4 artifact commits land on main; merge to main is itself the Phase 7 user-authorized deploy act.
- Prereq: `node <prime-plugin>/scripts/check-prereqs.mjs` currently returns `PREREQ-BLOCKED [PREREQ_RUN_CONTEXT_FINGERPRINT_MISSING]` — Phase 5 entry must re-run it with the task-fingerprint run context before any code; recorded as gate G0-Build, not a plan defect.
- Dependency constraint: `docs/*.tsx` is type-checked — `npx tsc --noEmit` must stay exit 0 through every milestone (cycle-4 precedent + Phase-3 checkpoint 7).
- Carry-in (quality-review finding 10): REQ-02 "subtle hover animation" (M2), REQ-12 "NO badge cloud" (M6 Skills; also bound where tech lists render, M5 step 4), REQ-13 location+tech line (M6 Experience), REQ-N02 "evergreen browsers" (M2/M8) clauses are truncated in canvas AC strings — re-read verbatim from docs/PRD.md at the milestone named; they bind as full PRD acceptance criteria.

## Risks & Mitigations
| ID | Risk | Impact | Mitigation |
|---|---|---|---|
| R-1 | Lenis/GSAP/Next scroll interplay jank or double-smoothing | Critical UX | ADR-3.1 single owner; delete `scroll-behavior: smooth` (globals.css:340) in M2; `lenis.on('scroll', ScrollTrigger.update)`; `ScrollTrigger.refresh()` after `document.fonts.ready` (M3 verify step); https://github.com/darkroomengineering/lenis integration pattern |
| R-2 | ScrollTrigger pin breaks mobile/iOS | Major | matchMedia coarse guard: zero pins on coarse pointers (ADR-3.5); CSS-only fallbacks specced per showcase |
| R-3 | Static-export violations (window at module scope, unsupported loaders) | Build failure | all motion code in `'use client'` leaves; guards inside effects; prod build with `output:'export'` run at every milestone; docs re-read per AGENTS.md |
| R-4 | Ghost numeral copied from canvas sample without aria-hidden law | a11y AA fail (finding 1) | M5 task text restates the law; Phase 6 axe + analyze_layout check contrast of labels, numerals excluded as decorative |
| R-5 | Copy drift from whitelist during content authoring | Credibility (Critical) | every content string cites W# in task comment; whitelist conformance grep at M8 |
| R-6 | HeroCanvas rAF drains battery / competes with scroll | Major | IntersectionObserver + document.hasFocus + pointer:fine gates; DPR≤2; pauses when hero off-screen (canvas §architecture Hero schema) |
| R-7 | Route deletion surprises owner post-build | Trust | explicit acknowledgment step in Phase 7 ship report before deploy (A-P2) |
| R-8 | Dependency currency moves during long build | Minor | lockfile-pinned installs at M0; `npm ls` recorded; no floating ranges added |

## Milestones (ordered, with effort estimates and verification points)

### M0 — Prereqs, branch & dependency install (est. 0.5h)
1. `git checkout -b feat/cycle5-rebuild` (D-4.2: branch must exist before any build commit; main stays deployable).
2. Re-run `check-prereqs.mjs` with run-context fingerprint.
3. `npm i --save-exact gsap@3.15.0 lenis@1.3.26 && npm i --save-exact lucide-react@1.48.0` (exact pins, no caret ranges — D-4.3/R-8; M2's dep-GC step removes orphaned packages from the same lockfile delta).
4. Read bundled Next 16 docs: static-exports, font, image, metadata (AGENTS.md).
Verify: `npm ls gsap lenis lucide-react` exit 0; `package.json` shows exact pins; `npm run build` still green pre-change (baseline); prereq receipt stored; `git branch --show-current` = feat/cycle5-rebuild.

### M1 — Data layer reconciliation (est. 2h) → REQ-07, REQ-08, REQ-16
1. `src/data/projects.ts`: one entry per project (S7), keep 4 featured + 3 secondary, image/slug/live/github fields per canvas schema; delete the UBMS-era leftovers already replaced (inventory screenshots exist).
2. `testimonials.ts` dropped from the render surface (not in cycle-5 PRD scope); **`now.ts` stays — FR-11 requires the current-focus metadata line from `nowData` verbatim (quality-review finding F1); consumed by M6.**
3. skills/experience/education arrays verified against W21/W22/W19-class whitelist entries.
4. REQ-16 decoupling invariant asserted: no hardcoded project names in components; featured-array entry drives showcase count (tested by temporary 5th entry in M5 verify, reverted after).
Verify: `npx tsc --noEmit` 0; `npm run build` exit 0 (R-3); grep: no non-whitelisted URL/claim in `src/data`.

### M2 — Shell, tokens, route cleanup, dep-GC (est. 3h) → REQ-01, REQ-02, REQ-15, REQ-19, REQ-N01…REQ-N06, REQ-N02 (+FR-13 carry-in lands in M6)
1. `globals.css`: light-only token block from canvas `cssVariables` (each hex + role verbatim); **G32 parity: file carries the verbatim `custom_approval` quote comment + min-width band queries crossing compact(≤767)/medium(768–1023)/expanded(≥1024)**; remove `scroll-behavior: smooth` (line 340) and dark-theme blocks; Tailwind 4 `@theme inline` mapping kept.
2. `layout.tsx`: remove theme flash script + `dark` class + theme Providers; keep Geist/Geist_Mono `next/font` vars, metadata, JSON-LD, skip-link; single-page `page.tsx` server composition (Section order per canvas §architecture).
3. New `Header` (fixed minimal, compacts >~80px via Lenis→ScrollTrigger wiring or IO sentinel — no raw scroll listener), `Footer` minimal per FR-15 element list (name, © YEAR, location, social links), remove `BackToTop` particles/marquee carry-overs; carry-in clause: "subtle hover animation" per PRD FR-02.
4. Delete the 19 secondary route dirs — including `src/app/contact/`, which carries the legacy web3forms `contact-client.tsx` and its `process.env` reads out at this slice — keep `not-found.tsx`, `robots.ts`, `sitemap.ts`, `manifest.ts`; sitemap rewrite drops its `src/data/blog` import → single URL + anchors documented (REQ-19 route-cleanup acceptance: `out/` has index.html with zero links to deleted routes).
5. Dependency GC (quality-review Minor): `npm uninstall next-themes react-hook-form zod` (+ any package left import-free by the deletions — check `npx depcheck`); data-file GC (finding F8): delete `src/data/blog.ts`, `achievements.ts`, `certifications.ts`, `uses.ts` — grep confirms their only importers are the route dirs removed in step 4 (blog importer `sitemap.ts` fixed in step 4); `team.ts` stays until M4 drops hero's import, then is deleted in the same M4 slice. Lockfile delta after M2 must equal: +gsap +lenis, lucide-react bump, −dropped packages (threat-model invariant 5 updated to match).
6. `public/_headers` CSP tightening (finding F4): `connect-src 'self'` (api.github.com/api.web3forms.com consumers are gone); drop `https://avatars.githubusercontent.com` from img-src once testimonials are unrendered; keep remaining headers; verify by reading the file diff.
Verify: `npm run build` + `npm run lint` exit 0; grep dark/theme = 0 in shell files (defined set: `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/components/layout/**`); keyboard Tab reaches header/footer controls with visible focus ring (FR-02 AC; the M2 half of the carry-in — nav hover clause bound in step 3, focus check here); `out/index.html` renders server-side full text (no-JS row of behaviorStates); `_headers` diff reviewed; depcheck output recorded; `git grep` for the four deleted data files returns 0 importers.

### M3 — Scroll core (est. 2h) → REQ-01, REQ-18
1. `SmoothScrollProvider` client leaf: Lenis constructed only when `!prefers-reduced-motion`; `lagSmoothing(0)`; `gsap.ticker` drives `lenis.raf`; `lenis.on('scroll', ScrollTrigger.update)`; `ScrollTrigger.refresh()` on `document.fonts.ready` + load; expose `scrollTo(target, opts)` honoring ~80px nav offset; native `href` remains fallback.
Verify: dev-server smoke desktop + reduced-motion emulation (no Lenis instance; `getComputedStyle(document.documentElement).scrollBehavior === 'auto'`); `npm run build` exit 0 (R-3).

### M4 — Hero (est. 3h) → REQ-03, REQ-04, REQ-05, REQ-06
1. Staged sequence per canvas timeline: bg 400 → nav 150 → headline lines 700 (stagger 120; pre-wrapped server `<span>` lines, weight 400 at ≥64px) → visual 900 scale-in from 0.94 + opacity (never scale(0)) → meta 300 → settle; serial ceiling 2450ms (FR-03 ≤2.5s); headline ≥86px ≤10vw at 1440 (REQ-04).
2. `HeroCanvas`: 2D lattice, DPR≤2, `useMotionValue`+`useSpring(stiffness:100, damping:10)` pointer lag ≤3vw, IO+focus+pointer:fine gates, `aria-hidden`; coarse-pointer static typographic composition.
3. `ScrollIndicator` first viewport, ≤2 loops, `aria-hidden` (user-instruction override kept bounded).
4. Delete `src/data/team.ts` — the hero rewrite in this slice removes its last importer (GC chain from M2 step 5, finding F8).
Verify: t+3s full-page screenshot shows settled hero (browser dev-server spot check; Playwright evidence matrix deferred to Phase 6); server HTML contains all hero strings; reduced-motion static parity; `npm run build` exit 0 (R-3).

### M5 — Work showcases (est. 4h) → REQ-07, REQ-08, REQ-09, REQ-10
1. `Work` + `variantFor(index % 4)` per ADR-3.5: 01 pinned browser-preview (the single GSAP pin; scrub image scale 1→1.025 in overflow-hidden wrapper); 02 full-bleed clip-path wipe + parallax yPercent ≤8 decorative; 03 ghost-number scrub + Vision diagram with hard-coded "System diagram" label (W28); 04 CSS sticky fan-out of 4 inventory screenshots (no ScrollTrigger pin).
2. Numeral law (finding 1): display numeral `aria-hidden` ghost tone; readable labelLarge mono index at ≥#45474D beside it in all four variants.
3. Hover: scale ≤1.03, `:active` scale 0.97/150ms, `@media (hover:hover) and (pointer:fine)` gated; live/GitHub hrefs from data, `rel="noopener noreferrer"`.
4. Secondary row (3 projects) typographic, no card-grid monotony; carry-in: PRD FR-12 "NO badge cloud" verbatim constraint on tech rendering. All below-fold images carry `loading="lazy"` (NFR-01 clause, finding F3); hero visual above fold loads eagerly.
5. REQ-16 proof: append a temporary 5th featured entry, rebuild, confirm a fifth showcase renders with zero component edits, revert (M1 assertion).
Verify: J2 walkthrough desktop+mobile dev server; grep zero `target=_blank` without noopener; grep every below-fold `<img>`/`<Image>` has loading="lazy"; anchors all resolve; `npm run build` exit 0 (R-3).

### M6 — About / Skills / Experience (est. 2h) → REQ-11, REQ-12, REQ-13
1. Editorial About: asymmetric split, statement from W21/W24 material only; metadata block per FR-11 verbatim fields: location "Philippines", education (BSIT, ISPSC, 2025–2026), role experience (Bayanihan internship 2026-02→04), specialties (W21 categories), technologies (W22), **current focus line taken verbatim from `src/data/now.ts` nowData (finding F1; W-rule: no paraphrase)**.
2. Skills (REQ-12): 7-domain typographic list — carry-in verbatim constraint applies HERE (and in M5 tech lines): "NO badge cloud"; hover detail reveal with always-visible server text for AT (no hover-gated information). Experience (REQ-13): single Bayanihan entry with FR-13's full element list — year (2026), role (Web Developer Intern), company (Bayanihan), location (Philippines; W-rule verbatim), technologies line (W22) — exact dates, no invented stats.
Verify: whitelist conformance grep on all new strings (W-id per line); reduced-motion: reveals collapse per canvas floor (opacity ≤200ms only); `npm run build` exit 0 (R-3).

### M7 — Contact + close (est. 1.5h) → REQ-14, REQ-15
1. Inverse panel #121317, "LET'S BUILD SOMETHING." display statement, links #8AB4F8 (ADR-3.9), mailto/GitHub/LinkedIn direct anchors, CTA pill radius 9999px, focus rings on-ink variant. No web3forms: the legacy `contact/contact-client.tsx` (and its `process.env` reads) is already gone — deleted with its route dir at M2 step 4 (finding N5 correction); this slice builds the replacement section only.
Verify: J3 check; contrast pair #8AB4F8/#121317 recomputed in M8 sweep; `npm run build` exit 0 (R-3).

### M8 — Build-phase sweep & handoff evidence (est. 2h) → REQ-17, REQ-18, REQ-19, REQ-N01…REQ-N06
1. `npm run build` + `npm run lint` + `npx tsc --noEmit` exit 0; prod `out/` checks (404 present, single index.html). Env leakage close-out (finding F7): all `process.env` readers are gone by now — contact-client and footer at M2, hero at M4 (timing corrected per N5) — so delete the dead `env: { NEXT_PUBLIC_BASE_PATH: '' }` block from `next.config.ts` and assert `grep -r "process\.env" src/` = 0 hits.
2. §14 62-item preflight pass against `prime/reports/phase-3-parts-evidence.md` (spec-completion gate); em-dash grep 0 in user-visible strings; `dangerouslySetInnerHTML` audit (JSON-LD only, static config input).
3. `prime/reports/output-intent.json` written; bundle size recorded (`out/_next/static` first-load JS).
Verify: all three commands + checklist report; this document's trace table re-run through the traceability oracle.

Total: raw sums to 20.0h (0.5+2+3+2+3+4+2+1.5+2 — arithmetic fixed after quality-review Minor on an earlier 18.5h mis-sum; pass-2 re-check re-derived the same sum); **adjusted estimate 24–30h** (see calibration). Full Playwright matrix, axe, ASVS pass and independent quality review belong to Phase 6, not Build.

## Estimation Calibration
Historical bias: cycle-4 plan estimated 15–20h for a smaller change set and ran ~1.3× variance vs actuals (recorded in the cycle-4 PRP calibration, superseded by this file). This rebuild replaces 20 routes + shell and adds a motion system — no comparable single actual exists for full scope, so: PERT on milestone sums (o=15h, m=20h, p=30h → (15+4·20+30)/6 ≈ 20.8h) scaled by the 1.3× historical variance factor → 24–30h adjusted estimate. Uncertainty concentrated in M4/M5 (canvas + pin variants); rollback slices are per-milestone so overrun is bounded.

## Requirement → Milestone Traceability (G12)
REQ-01: M2,M3 · REQ-02: M2 (+FR-02 hover clause carry-in) · REQ-03: M4 · REQ-04: M4 · REQ-05: M4 · REQ-06: M4 · REQ-07: M1,M5 · REQ-08: M1,M5 · REQ-09: M5 · REQ-10: M5 · REQ-11: M6 · REQ-12: M5,M6 (+FR-12 badge-cloud carry-in: Skills primary, showcase tech lines bound) · REQ-13: M6 (+FR-13 location/tech carry-in, Experience element list) · REQ-14: M7 · REQ-15: M2,M7 (footer built in shell M2, FR-15 element-list verify at M7) · REQ-16: M1,M5 (data decoupling — 5th-showcase proof) · REQ-17: M6,M8 · REQ-18: M3,M4,M5,M6,M8 · REQ-19: M2,M8 (route cleanup executed in M2; M1 carries no route task) · REQ-N01: M2,M3,M5 (lazy below-fold clause, finding F3) · REQ-N02: M2,M8 (+evergreen-browsers carry-in) · REQ-N03: M2–M7,M8(a11y sweep) · REQ-N04: M3–M7,M8 · REQ-N05: M0,M8 · REQ-N06: M0,M2,M8.
DESIGN decisions traced: ADR-3.1→M2/M3 · ADR-3.2→M4/M5 · ADR-3.3→M4 · ADR-3.4(G13 bespoke)→M2 tokens · ADR-3.5→M5 · ADR-3.6→M2/M4 · ADR-3.7→M7 · ADR-3.8→M0 · ADR-3.9→M7; G32 parity→M2; behaviorStates→M2/M4/M5; finding-1 numeral law→M5.
Journeys: J1→M4 verify · J2→M5 verify · J3→M7 verify · J4→M3+M6 reduced-motion verifies · J5 mobile arc→M5/M6 mobile dev-server checks (full matrix Phase 6).
External refs consulted (rationale at point of use): https://nextjs.org/docs/app/guides/static-exports (export support matrix, constraints line) · https://gsap.com/docs/v3/Plugins/ScrollTrigger/ (pin/scrub API + refresh semantics, R-1) · https://github.com/darkroomengineering/lenis (ScrollTrigger update wiring, R-1) · https://motion.dev/docs/react-reduced-motion (MotionConfig reducedMotion='user', M4) · https://gsap.com/blog/3-13/ (SplitText now free — still unused, ADR-3.2 a11y rationale) · https://nextjs.org/docs/app/api-reference/components/font (self-hosted export-safe fonts, M2).

## Rollback
Work on branch `feat/cycle5-rebuild` (Tier A); per-milestone commits (M0–M8); revert-forward per slice; route deletion isolated in its own commit inside M2 so a single revert restores the old site; no data/destructive ops beyond file changes; main branch stays deployable at all times.
