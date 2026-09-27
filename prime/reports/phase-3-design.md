# Phase 3 — Design Report (Portfolio Rebuild, Cycle 5)

Owner: prime-requirement (design/architecture) + prime-make procedures, assumed in main agent. Quality mode: autopilot (Polish-level rigor). Inputs: `docs/PRD.md` (REQ-01…REQ-19, REQ-N01…REQ-N06), `prime/state/project-charter.md` (R5 scroll conflict), `prime/state/fact-whitelist.md` (W1–W28), `prime/reports/phase-1-discover.md` §A–C, `prime/reports/phase-1-research.md` (fetched antigravity.google CSS evidence), frontend skill design-quality routing (comprehensive), UI/UX Pro Max selector output, `design/quality-parts` distillation → `prime/reports/phase-3-parts-evidence.md`, motion dataset queries (45-row GSAP motion standard).

## 0. Design read + dials (§0.B, §1 chain)

- **Read:** single-page cinematic editorial portfolio for hiring partners and clients, motion-led storytelling, original design system inspired by the measured feeling of antigravity.google, executed with taste-part discipline (not a Google clone).
- **DESIGN_VARIANCE 8** — the brief explicitly demands "experimental", "asymmetric compositions", "no two showcases identical" (FR-09). Not the 8/6/4 landing baseline-by-accident; earned by the brief text.
- **MOTION_INTENSITY 8** — "Motion is one of the most important parts of this project" (brief). Scroll-orchestrated macro motion + ≤300ms micro layer (NFR-04).
- **VISUAL_DENSITY 3** — "generous whitespace", "spacious", oversized type as the grid. Editorial low density, hairline structure instead of boxes.

## 1. Base System Law resolution (G13 / ADR-3.4)

Registry match test: the six registered entries target app types (consumer mobile, SaaS dashboards, enterprise ops, civic, workflow, iOS-companion). This is a personal editorial portfolio with a bespoke brand language — no `best_for` entry fits, and the owner's brief mandates an original visual language. The registry law permits bespoke design on explicit user request, quoted verbatim as `custom_approval` in `docs/DESIGN.canvas.tsx`:

> "Rebuild my personal portfolio website from scratch with a premium, experimental, highly interactive visual style inspired by the design language of antigravity.google. Do NOT copy Google's website, branding, logos, text, assets, or proprietary design directly."

Discipline is kept equivalent, not weaker: tokens are **measured** (live-fetched antigravity public CSS, phase 1 §A), tuned via the selector + taste parts, contrast is computed (WCAG relative-luminance, see canvas comments), the responsive contract keeps the registry band vocabulary (compact/medium/expanded) mapped to the brief's 425/767/1024/1440 bands, and Google proprietary assets (Google Sans Flex, logos, copy) are excluded — Geist/Geist Mono stand in as the grotesque family, self-hosted via `next/font` (export-safe; https://nextjs.org/docs/app/api-reference/components/font). Source-declaration parity for Phase 5 (G32): the shipped token source will carry the same `custom_approval` quote in `globals.css`.

Selector output override log (routing rule: "selector output is evidence, not authority"):
- Selector palette (monochrome #18181B/#FAFAFA + #2563EB) → overridden by the measured antigravity cool stack (#121317-class inks on #f8f9fc-class canvas) because PRD NFR-03 already fixed that class and phase 1 fetched real values; #2563EB is dropped.
- Selector typography "Inter / Inter" + Google Fonts link → rejected: §4.1 anti-default bans Inter-as-identity, part-01 §3.A bans Google Fonts `<link>` in production. Existing Geist/Geist Mono `next/font` pattern kept (already self-hosting at build, https://vercel.com/geist).
- Selector pattern "Portfolio Grid / masonry" → rejected: contradicts FR-07 editorial showcases and the brief's "no excessive cards / not a grid" mandate. Style row "Motion-Driven" retained (matches dials).
- Parts-evidence fold-in (G12; `prime/reports/phase-3-parts-evidence.md` + 4-part focused pass, checkpoint 9): accepted — native-cursor policy (part-01 §9.A), `useMotionValue`/`useSpring` for pointer physics (§3.B, never React state for continuous values), GSAP/Motion separate component trees (§10), opacity-only reduced-motion floor (part-10 §8), `:active` press feedback, no `scale(0)` entries, structural-only hairlines, one-theme lock with the single sanctioned Contact inversion (§4.11), `min-h-[100dvh]` hero rule (§3.E). Overridden by user instruction (highest priority per superpowers rule 1): (a) hero scroll indicator — §9.F bans scroll cues, the owner brief explicitly requires one → FR-06 stands, kept minimal, `aria-hidden`, ≤2 loops; (b) showcase index numerals 01–04 — §9.F bans section-number eyebrows, the brief names the showcases "01–04" and FR-08 animates the number → rendered as display-scale compositional type, not micro-label eyebrows; (c) lucide-react — §3.C prefers other icon families, the brief mandates Lucide in the stack → retained, single family, one strokeWidth; (d) spark `#FBBC04` — §4.2 "max 1 accent": spark is retained only as a dot-scale compositional mark under the sanctioned "pure monochrome + single saturated pop" alternative, never text, never state-bearing (§9.F decorative-dot ban is honored by confining it to the ScrollIndicator and removing the cursor-pip use, which bordered on §9.A custom-cursor territory).

## 2. Design Benchmark Record (frontend skill §"External benchmarking must be traceable")

| Source | Access | What was taken | What was rejected |
|---|---|---|---|
| https://antigravity.google (live HTML + 3 Astro CSS files, curl-fetched 138,789 B, phase 1) | ✅ succeeded after WebFetch rate-limit | feeling-level mechanics: cool near-white stack, layered near-black ink ramp, sub-1.0 display leading with negative tracking, weight-restraint (size carries hierarchy), hairline borders, blurred compacting sticky nav, scroll-pinned media sequencing, ≤300ms micro / eased macro budget | Google Sans Flex, logos, copy, any asset; WebGL (their hero is 2D canvas particles — matched with cheaper own canvas) |
| UI/UX Pro Max selector (`scripts/ui-ux-pro-max/search.py --design-system`) | ✅ ran locally | Motion-Driven style, reduced-motion + focus-state checklist items | palette/font/grid rows (see §1 override log) |
| `data/ui-ux-pro-max` motion CSV (45 rows) | ✅ queried | pin budget, scrub, reveal, parallax, image-reveal numeric budgets (§7 table) | SplitText rows (rejected for runtime-split reasons; see ADR-3.2 corrected rationale) |
| linear.app / apple.com / lusion.co | ⚠ prior knowledge only, NOT fetched this cycle | directional only, marked ASSUMPTION in phase 1; no token taken | everything else |

## 3. Architecture (G1)

Three layers, one-way flow, no store, no API, no server functions (REQ-N01, REQ-N05):

```
content layer    src/data/*.ts typed arrays (projects, experience, education, skills, now) — build-time only
presentation     app/layout.tsx (fonts, metadata, skip-link) + app/page.tsx server composition:
                 Nav → Hero → Work(01–04 + secondary row) → About → Skills → Experience → Contact → Footer
interaction      client islands under Providers: SmoothScrollProvider (Lenis+GSAP ticker), SiteNav scroll state,
                 HeroCanvas, ShowcaseScrollFx, Skills hover-reveal, ContactCTA — each 'use client', zero window at module scope
```

Module → interface map:

| Module | Interface (data contract) | Satisfies |
|---|---|---|
| `SmoothScrollProvider` | `useSmoothScroll(): { scrollTo(target, opts) }` context; disabled under reduced motion | REQ-01/02/18, REQ-N01 |
| `SiteNav` | `links: {label, href}[]` from `siteConfig`; compacts past ~80px via the Lenis→ScrollTrigger wiring (ADR-3.1) or an IntersectionObserver sentinel — no raw `window` scroll listener (part-01 §5.D) | REQ-02 |
| `Hero` | headline lines = whitelisted POSITIONING split server-side into `<span>` rows; metadata = siteConfig + nowData | REQ-03/04/06/17 |
| `HeroCanvas` | zero props; capability-gated custom 2D canvas | REQ-05 |
| `Work` + variants | `ShowcaseProps { project: FeaturedProject; index: number }`; variant chosen `VARIANTS[index % 4]` — a 5th data entry renders with no component change | REQ-07/08/09/10/16 |
| `SecondaryRow` | `otherProjects` array | REQ-07 (compact index), PRD scope |
| `About/Skills/Experience/Contact/Footer` | typed data arrays + `siteConfig` | REQ-11…15 |

### Route & file plan
Single route `/`; delete 19 secondary route dirs (retain root `not-found.tsx`, `robots.ts`, `sitemap.ts`, `manifest.ts` retargeted to page anchors) — FR-19, Phase 7 owner-ack flag stands. `theme` script + dark-mode class machinery removed from `layout.tsx` (single primary canvas per PRD Out-of-Scope). `globals.css` keeps Tailwind 4 `@theme inline` but with the new bespoke token block (§6).

## 4. ADRs (rationale + sources)

- **ADR-3.1 Scroll owner = Lenis, exclusively (closes charter R5).** Lenis must run with CSS `scroll-behavior: auto`, and Next 16 no longer forces smooth scroll but opts in via `data-scroll-behavior="smooth"` on `<html>` — therefore: delete `scroll-behavior: smooth` from `globals.css:340`, do NOT add the Next attribute, anchors call `lenis.scrollTo()` with section offset, native `href="#id"` remains the no-JS fallback because content is never motion-gated. Wiring: `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add((t) => lenis.raf(t * 1000))` + `gsap.ticker.lagSmoothing(0)` — the documented integration because two rAF owners (Lenis + ScrollTrigger) desync otherwise. Sources: https://github.com/darkroomengineering/lenis (scroll-trigger guide), https://nextjs.org/docs/app/guides/upgrading/version-16 (scroll-behavior opt-in change), local `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`.
- **ADR-3.2 Motion division: GSAP/ScrollTrigger for scroll orchestration, Framer Motion for mount/micro, no SplitText.** GSAP 3.15 ships ScrollTrigger free ("Standard no charge", https://gsap.com/docs/v3/Plugins/ScrollTrigger/); Framer Motion respects `reducedMotion="user"` via `MotionConfig` (https://motion.dev/docs/react-reduced-motion). Character-level GSAP SplitText is NOT used — not because it is unlicensed (corrected at quality-review finding 8: GSAP 3.13, April 2025, made all former Club plugins including SplitText free, https://gsap.com/blog/3-13/) but because runtime text splitting is rejected on a11y/CLS grounds: headline lines are pre-wrapped `<span>` rows server-side, animated as whole lines; DOM text stays intact for AT/crawlers (motion CSV rows 9/22 warned the same class of risk).
- **ADR-3.3 Hero visual: own 2D canvas, three.js rejected.** bundlephobia gzip: gsap 26.7KB + lenis 5.3KB vs three 180.6KB + r3f 55.7KB (https://bundlephobia.com/package/three@0.186.1, https://bundlephobia.com/package/@react-three/fiber@9.8.1) and antigravity's own hero is a 2D particle canvas — therefore ~200-line lattice canvas: DPR≤2, rAF only while in view (IntersectionObserver) and window focused, pointer lerp ≤3vw, `pointer:fine` + reduced-motion gates. Native cursor stays visible (part-01 §9.A custom-cursor ban): the canvas reacts behind it; pointer position flows through `useMotionValue` + `useSpring(stiffness:100, damping:10)` (part-10 spec), never React state (§3.B). GSAP showcase leaves and Motion UI islands live in strictly separate component trees (§10) so the libraries never fight over frames. Coarse pointer gets the static typographic composition (no hole in layout).
- **ADR-3.4 Base system = bespoke original under `custom_approval`** — §1; quote preserved verbatim in canvas and in Phase 5 `globals.css` for G32 parity.
- **ADR-3.5 Pinning budget: 1 GSAP pin + 1 CSS sticky; the other two showcases are scrub/clip reveals.** The motion standard (row 6) forbids pinning more than 1–2 sections because excessive pinning fights native scroll and breaks on mobile — FR-08's "pinned/large-visual treatment" is satisfied by the two treatments plus transform-only scrub scaling (1→1.025, overflow-hidden wrappers, rows 13/28/29) and no pin exists on coarse pointers (matchMedia guard; iOS ScrollTrigger pin jank is the documented failure mode this avoids). Variants: 01 Quill = pinned browser-preview (scrub scale + metadata reveal); 02 Barangay = full-bleed clip-path wipe + small parallax (yPercent ≤8, decorative layers only); 03 Vision = experimental typographic ghost-number behind the diagram, Ken-Burns scale on the diagram with honest "System diagram" label (W28); 04 Inventory = sticky visual column with fan-out stack of its 4 real screenshots (transform-only stagger). Numeral law (quality-review finding 1): every showcase display numeral is an aria-hidden decorative ghost tone (≥#E6EAF0-class, sub-3:1 by design); FR-07 index legibility is carried by a co-located labelLarge mono label at ≥#45474D (8.82:1) in all four variants — implemented in Phase 5 exactly as the canvas sample demonstrates.
- **ADR-3.6 Type system: Geist + Geist Mono, weights 400–500 for all prose/display, size carries hierarchy.** Sole exception: 600 for 11–12px uppercase mono labels (sub-large legibility floor; matches canvas `weights: [400,500,600]` with `displayWeightRule`). Mirrors the measured Google Sans Flex discipline without using Google's proprietary face; `next/font/google` self-hosts at build so static export never emits a runtime font request (https://nextjs.org/docs/app/api-reference/components/font). Hero `clamp(3.5rem, 9vw, 148px)`, lh 0.88, tracking -0.035em → at 1440 the computed size is 129.6px: FR-04's ≥86px and ≤10vw bounds both hold; mono only for index labels/eyebrows.
- **ADR-3.7 Single light canvas; Contact flips to the ink panel.** The brief's drama curve needs one tonal inversion at the close; a user-facing theme toggle is PRD Out-of-Scope, so no `[data-theme]` machinery ships. Inverse-panel ratios measured (canvas §tokens-dark values).
- **ADR-3.8 lucide-react upgrades 1.23.0 → 1.48.0** (minor-in-1.x, PRD Constraints pre-allow it) — rationale: installed version predates the current registry; upgrade cost is a lockfile bump, verified by `npm run build`. framer-motion stays 12.42.2: no bug demands the 13 major (PRD rule).
- **ADR-3.9 Contact = direct links only.** web3forms endpoint and proxy layer are deleted with the routes; mailto/LinkedIn/GitHub are static anchors (REQ-14) — a form would re-add server surface the PRD does not require.

## 5. Backend surface analysis (backend skill applied)

The backend skill's exclusion conditions match this project (`baas_only`/`infrastructure_only`/static): classification pass over its routing table found no workflow predicate with a live trigger — there are no endpoints, no auth, no uploads, no queues, no server-rendered dynamic data. Per its overengineering-prevention rule ("use the simplest architecture that safely satisfies current requirements"), the design keeps **zero custom backend**: Next static export → `out/` files → Cloudflare Pages (REQ-N06 unchanged). Surviving surface = content integrity (only typed arrays in `src/data/`, all whitelist-gated), third-party requests (removed: web3forms, GitHub live-stats widgets), and supply chain (6 client libs pinned in `package.json`). Threat controls: no user input anywhere, so injection surfaces are absent by construction; external links carry `rel="noopener"`; mailto is rendered from `siteConfig` (W19/W26). This analysis is the recorded reason the mandatory `backend` skill applies as a negative-surface confirmation, not as implementation guidance.

## 6. Design tokens → `docs/DESIGN.canvas.tsx`

The canvas is the authority document (frontend skill rule 1). Summary of the measured system:

- **Canvas/surfaces:** #F8F9FC canvas, #FFFFFF surface, #EFF2F7 sunk, #E6EAF0 deep rule; ink ramp #121317 / #202124 / #3C4043 / #45474D (muted floor 8.82:1 on canvas — AA everywhere, AAA body 17.63:1); accent #1A73E8 graphic/large-text only (4.28:1 ≥ 3:1 non-text; 30px+ large-text AA), accent-deep #0B57D0 for text links + focus ring (6.07:1); spark #FBBC04 dot-level only.
- **Inverse Contact panel:** #121317 ground, #F8F9FC type (17.63:1), links #8AB4F8 (8.81:1).
- **Type scale, spacing (4px unit), radii lock (0 for frames, pill for CTAs), z-ladder, motion durations/easings:** all in canvas `designTokens`, every pair contrast-computed with the WCAG relative-luminance formula (values in canvas comments; a Phase 6 gate re-verifies).
- **Breakpoint bands:** compact ≤767 (base styles, min-width queries add layout), medium 768–1023, expanded ≥1024; 425/1440 tuning marks; touch targets ≥44px compact.

## 7. Simplicity / complexity analysis (G3)

- Added runtime deps: exactly 2 (gsap, lenis ≈32KB gzip combined) — justified because they produce the brief's defining mechanics (pinned sequencing, unified smooth scroll) that Framer `useScroll` alone would re-implement less robustly (ADR-3.2). Rejected additions: three/r3f (236KB, ADR-3.3), @gsap/react wrapper (useGSAP nicety; plain cleanup in `useEffect` avoids another dep — recorded as acceptable trade-off), any CMS, any analytics.
- Abstractions held to the smallest set that FR-16 demands: 4 showcase variants + one shared primitive set; variant choice is `index % 4`, so no config layer, no registry object, no factory. Data model unchanged from cycle 4 (`HostedProject`) — zero migrations.
- Removed instead of added: 19 routes, theme system, particles/marquee components, web3forms integration, GitHub live-stats fetch paths. Net file count decreases.
- Unnecessary configuration rejected: no new config files; `next.config.ts` keeps its export-only shape (REQ-N05).

## 8. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Lenis × ScrollTrigger desync | single rAF owner wiring in ADR-3.1; `ScrollTrigger.refresh()` after fonts/images load (`document.fonts.ready`) |
| Mobile pin jank (row 6 warning) | zero pins on coarse pointers; sticky variant degrades to normal flow natively |
| Reduced-motion parity hole (REQ-18) | gates at construction: Lenis not instantiated, triggers not created, canvas not mounted, server HTML complete (J4) |
| W28 honesty slip | variant C hard-codes "System diagram" label from component, not data |
| FOIT/FOUT hero flash | next/font class-swap + `display: swap` default; hero text present in server HTML regardless (REQ-03 AC) |
| Bespoke-palette drift vs registry law | quote in two places (canvas + globals), selector/taste chain evidence in §1, independent review audits the quote's genuineness |

## 9. Critical-journey design coverage

J1 hero sequence → §6 timeline + ADR-3.2/3.3; J2 showcase scroll → ADR-3.5 variants; J3 contact close → ADR-3.1 anchor offset + ADR-3.7 panel; J4 reduced motion → §8 gates; J5 mobile arc → band contract, no hover-gated content, ≥44px targets.

## 10. Self-check

Every REQ id traced in canvas `requirementTraceability` (25/25); every ADR names alternatives + consequence; benchmark record distinguishes fetched vs assumption sources; dials reasoned from brief text; contrast computed. G-vocabulary present: architecture/component/interface/module/schema, simplicity/complexity/trade-off/rationale+URLs, design system/design anchor/inspired by. Self-check: PASSED — 2026-09-27.

## Skill Invocation Summary

| Skill | Classification | Status | Evidence |
|---|---|---|---|
| frontend | MANDATORY (when UI) | APPLIED | design-quality-routing comprehensive route; selector run + override log; quality-parts distillation `prime/reports/phase-3-parts-evidence.md`; motion CSV queries; canvas artifact `docs/DESIGN.canvas.tsx` |
| quality-review | MANDATORY | APPLIED | independent dispatch → `prime/reports/phase-3-quality-review.md` (separate invocation) |
| research | MANDATORY | APPLIED | phase-1 evidence reused + phase-3 citation set (§4 URLs, §2 benchmark record) |
| caveman | MANDATORY (core) | APPLIED | compressed evidence-dense artifact prose, no filler, tables over narration |
| backend | MANDATORY | APPLIED | §5 backend surface analysis: routing-table classification → zero live triggers, overengineering-prevention rule drives the no-backend confirmation |
| doc-forge | RECOMMENDED | N/A — artifacts are TSX/markdown owned by PRIME templates, no document conversion needed |
