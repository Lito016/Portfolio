# PRD: Portfolio Rebuild — Cinematic Single-Page Experience (Cycle 5)

**Version**: v1.0
**Author**: prime-requirement (PRIME Full lifecycle, autopilot quality mode)
**Date**: 2026-09-27
**Status**: Draft → reviewed via prime/reports/phase-2-quality-review.md
**Product Type**: B2C (personal brand site; visitor = hiring manager/client)

---

## Background & Goals

### Problem & Background
The current portfolio is a conventional 20-route developer site (hero + card grids + GitHub widgets). The owner's claim — "this person builds sophisticated digital experiences" — is contradicted by the medium itself. Prior cycles produced a verified, whitelisted content base (fact-whitelist W1–W28) and 4 strong project case studies that render as uniform cards. The site must be rebuilt from scratch as one cinematic, motion-driven, editorial experience in the spirit (not the assets) of antigravity.google.

### Target Users
| User Role | Characteristics | Core Need | Usage Scenario |
|---|---|---|---|
| Hiring manager / studio lead | Desktop, <60s attention, judges craft by feel | Immediate visual impression of sophistication | Lands on URL, watches hero, scrolls work, decides to contact |
| Prospective client | Evaluates competence for systems work | Evidence of shipped end-to-end projects | Reads project storytelling + verified links |
| Mobile visitor | Touch, variable network | Designed (not compressed) experience, fast load | Same arc, recomposed layout, no hover dependencies |
| Maintainer (owner) | Edits repo, adds projects | One-entry-per-project data model | Adds array entry in `src/data/`, rebuild deploys |

### Goals & Success Metrics (SMART, verified at Phase 6)
| Goal | Metric | Target | Monitoring Method |
|---|---|---|---|
| Cinematic first impression | Staged hero sequence completes; headline ≥6vw desktop | Verified via Playwright screenshots desktop/tablet/mobile | Phase 6 browser verification |
| Projects are the attraction | 4 featured projects as editorial showcases, varied composition | 1:1 count + visual review passes | Phase 6 quality review |
| Trust preserved | 100% visible facts traceable to whitelist | grep audit vs `prime/state/fact-whitelist.md` | Build/Verify gate (existing practice) |
| Performance | Static export; LCP < 2.5s; JS budget respected | no three/r3f; gsap+lenis ≈32KB gzip | Lighthouse + bundle inspect at Phase 6 |
| Accessibility | WCAG AA contrast; keyboard nav; reduced-motion full usability | axe-core pass; reduced-motion screenshot parity check | Phase 6 E2E + a11y |

## Solution Overview
One long-scroll page: staged hero with cursor-reactive canvas visual → pinned editorial project showcases (01–04) → oversized about statement → typographic skills list → experience list → dramatic contact close → minimal footer. Warm/cool off-white canvas, near-black display type, hairline rules, one restrained accent. Framer Motion (micro) + GSAP ScrollTrigger (pinning) + Lenis (smooth scroll). Static export to Cloudflare Pages, unchanged CI.

### Scope Decisions
- Replaces the 19 secondary routes (about, blog, resume, stats, …). Owner directed rebuild "from scratch" (R4/charter); removal is in scope, content that mattered is folded into the single page (experience, education→about, skills). Legacy-URL handling: static export cannot redirect — `not-found.tsx` retained with links to the new home; flagged for owner acknowledgment at Phase 7 handoff. Contact form (web3forms) → replaced by direct email/LinkedIn/GitHub links (W19/W26); form itself not required by brief.
- GitHub live-stats widgets dropped: not requested by the brief, and removal serves the performance mandate (keeps first-load JS minimal). (Owner may request them back; data layer unchanged.)
- Existing 3 secondary projects (University MS, Dish Manager, AI SaaS Landing) shown as a compact supporting row/index within Work (data retained in array).

## Requirements — Functional (MoSCoW; pain point → requirement traceability in §6)

Canonical trace ids: REQ-01 (≡FR-01), REQ-02 (≡FR-02), REQ-03 (≡FR-03), REQ-04 (≡FR-04), REQ-05 (≡FR-05), REQ-06 (≡FR-06), REQ-07 (≡FR-07), REQ-08 (≡FR-08), REQ-09 (≡FR-09), REQ-10 (≡FR-10), REQ-11 (≡FR-11), REQ-12 (≡FR-12), REQ-13 (≡FR-13), REQ-14 (≡FR-14), REQ-15 (≡FR-15), REQ-16 (≡FR-16), REQ-17 (≡FR-17), REQ-18 (≡FR-18), REQ-19 (≡FR-19), REQ-N01 (≡NFR-01), REQ-N02 (≡NFR-02), REQ-N03 (≡NFR-03), REQ-N04 (≡NFR-04), REQ-N05 (≡NFR-05), REQ-N06 (≡NFR-06). Phase 3+ traceability gates key on these ids.

| ID | Requirement (must/should/could) | Acceptance Criteria (GIVEN/WHEN/THEN) |
|---|---|---|
| FR-01 | Site SHALL be a single-page composition: Nav, Hero, Work, About, Skills, Experience, Contact, Footer. | GIVEN a fresh visit WHEN the page loads THEN all eight regions exist in order in the DOM with semantic landmarks; WHEN a nav link is clicked THEN the viewport scrolls to the target section. |
| FR-02 | Navigation SHALL be minimal fixed bar (name left; Work/About/Contact right) that compacts/changes appearance after scroll, with subtle hover animation. | GIVEN scroll position 0 WHEN user scrolls >~80px THEN nav gains compact state (blurred/hairline treatment); GIVEN keyboard WHEN Tab reaches nav THEN focus ring visible. |
| FR-03 | Hero SHALL stage a load sequence: background → nav → headline lines reveal → central visual scales in → metadata fade → settle. | GIVEN prefers-reduced-motion is NOT set WHEN first paint completes THEN sequence runs once (~≤2.5s total) and settles; all hero text present in server HTML regardless. |
| FR-04 | Hero typography SHALL be oversized (≈6–10vw desktop), stacked short lines, near-black on off-white, tight leading/tracking; content from whitelisted positioning (W19/W21: "AI Solution Developer | Full-Stack Systems Developer"; headline copy derived per W24/W25 rules — no invented claims). | GIVEN desktop 1440 WHEN rendered THEN headline font-size ≥ 86px and ≤ 10vw; GIVEN 375px THEN recomposed smaller scale, no horizontal overflow. |
| FR-05 | Hero SHALL include one central interactive visual (custom 2D canvas) reacting subtly to cursor movement; lazy, GPU-friendly, pointer-fine only. | GIVEN pointer:fine WHEN cursor moves THEN visual offsets ≤~3% of viewport following pointer with eased lag; GIVEN coarse pointer THEN static/absent fallback, no jank; canvas creation gated to mount (client) and reduced-motion off. |
| FR-06 | Hero SHALL include a small scroll indicator near bottom. | GIVEN hero fills ≥85vh WHEN loaded THEN indicator visible within first viewport; it does not repeat infinite bounce >2 loops and is aria-hidden. |
| FR-07 | Work section SHALL present the 4 featured projects as large editorial showcases numbered 01–04, each with visual, name, short description, technologies/category. | GIVEN data array of 4 featured projects WHEN rendered THEN 4 showcases, each with index label, image/visual, title, ≤2-line description, tech list, and available link (dead anchors forbidden, see projects.ts interface rule). |
| FR-08 | Scroll behavior per showcase SHALL use pinned/large-visual treatment: image scales slightly (≈1–3%), text moves subtly, number/typography animate on entry (GSAP ScrollTrigger). | GIVEN desktop pointer WHEN scrolling through a showcase THEN transform-only animations (no layout thrash); GIVEN reduced-motion THEN showcase fully visible statically. |
| FR-09 | Each showcase composition SHALL differ (browser preview / floating interfaces / full-width image / experimental typographic-visual), per brief; Vision auditor visual MUST be labeled honestly as diagram (W28). | GIVEN 4 showcases rendered THEN no two share identical layout structure; WHEN vision project visual renders THEN no caption/alt claims it is a product screenshot. |
| FR-10 | Project hover (desktop) SHALL be refined: slight preview scale (1–3%), subtle title shift/metadata reveal, cursor affordance change. | GIVEN pointer:fine WHEN hovering a showcase THEN scale change ≤1.03 with eased transition ≤300ms; GIVEN coarse pointer THEN no hover-dependent content hidden. |
| FR-11 | About SHALL be an editorial large statement + concise metadata block: bio (restating W21/W25 whitelisted facts), location "Philippines" (data files), education (BSIT, ISPSC, 2025–2026), role experience (Bayanihan Network internship 2026-02→04), specialties (W21 categories), technologies (W22), current focus (nowData verbatim). No "years of experience" claims (explicitly non-whitelisted). | GIVEN About renders THEN every sentence traces to whitelist entry; text reveals on viewport entry (motion optional, content never motion-gated). |
| FR-12 | Skills SHALL render as a typographic domain list (Design-adjacent domains per W22 set: Languages, Frontend, Backend, Databases & BaaS, AI & ML, Infrastructure & Deployment, Engineering) with hover-reveal detail; NO badge cloud. | GIVEN pointer WHEN hovering a domain line THEN its technology list reveals (≤300ms); GIVEN coarse/keyboard THEN focus/tap reveals equivalently; all items reachable. |
| FR-13 | Experience SHALL be a minimal editorial list (YEAR / ROLE / COMPANY / DESCRIPTION) with hairline separators and hover response. | GIVEN render THEN single verified entry displays year "2026" with months "Feb 2026 – Apr 2026" (data: 2026-02→2026-04), role, company, location, tech; no fabricated entries. |
| FR-14 | Contact SHALL be dramatic close: oversized statement (e.g. "LET'S BUILD SOMETHING." — generic invitation copy, not a claim), then Email / LinkedIn / GitHub links + one large interactive CTA. | GIVEN render THEN three links hrefs equal siteConfig values (W19/W26); mailto opens; external links `target=_blank rel=noopener`; CTA hover animation ≤300ms and keyboard-activatable. |
| FR-15 | Footer SHALL be minimal: name, © YEAR, location, social links. | GIVEN render THEN footer contains exactly those element classes; © uses current year. |
| FR-16 | Projects/data SHALL remain plain typed arrays in `src/data/` decoupled from components; adding an entry renders a new showcase/row without component changes. | GIVEN a new entry appended to featured list WHEN rebuilt THEN a 5th showcase appears using the same primitives; no hardcoded project names in components. |
| FR-17 | All visible facts/URLs/metrics MUST trace to `prime/state/fact-whitelist.md` (W1–W28). | WHEN whitelist grep audit runs at Phase 6 THEN zero unsourced claims; unknown = not shown. |
| FR-18 | `prefers-reduced-motion: reduce` MUST neutralize decorative motion (pinning scrub, canvas, reveals) while preserving all content and navigation. | GIVEN reduced-motion flag WHEN page loads THEN zero continuous animations; all sections readable; Lenis disabled or instant. |
| FR-19 | Route cleanup: home page replaced by new composition; obsolete route dirs removed; robots/sitemap/manifest updated to single-page anchors. | GIVEN `next build` (static export) WHEN complete THEN `out/` contains index.html without links to deleted routes; sitemap lists canonical root. |

## Non-Functional Requirements (measurable)
- NFR-01 Performance: static export (`output:'export'`) preserved; first-load JS: Framer Motion + gsap(+ScrollTrigger) + lenis only; three/r3f forbidden (Phase 1 §C). Lazy-load below-fold images (`loading="lazy"`), hero visual canvas mounts client-side only.
- NFR-02 Compatibility: evergreen desktop/mobile browsers; breakpoints modeled on 425/767/1024/1440 bands; no `window` access at module scope (export guard rule).
- NFR-03 Accessibility: WCAG 2.1 AA contrast (near-black `#121317`-class on off-white `#f8f9fc`-class); semantic landmarks; visible focus; axe-core 0 critical violations.
- NFR-04 Motion quality: micro ≤300ms eased; macro slow; linear forbidden; no simultaneous competing animations per viewport.
- NFR-05 Reliability/build: `npm run build` + `npm run lint` exit 0; Turbopack-compatible (no webpack config additions).
- NFR-06 Deploy parity: Cloudflare Pages CI unchanged (`out/` artifact); wrangler flow untouched.

## Critical Journeys
```json
[
 {"journey_id":"J1","name":"Landing impression","category":"primary_view_flow","steps":[{"step":1,"action":"Load /","actor":"user"},{"step":2,"action":"Hero sequence completes (bg→nav→type→visual→metadata→settle)","actor":"system"},{"step":3,"action":"Headline + visual + scroll cue visible in first viewport","actor":"system"}],"success_criteria":"Single screenshot at t+3s shows settled hero; text present in server HTML","priority":"critical","mode_requirement":["standard","polish","autopilot"]},
 {"journey_id":"J2","name":"Work showcase scroll","category":"primary_content_flow","steps":[{"step":1,"action":"Scroll to Work","actor":"user"},{"step":2,"action":"Showcases 01–04 reveal/pin correctly","actor":"system"},{"step":3,"action":"Links: project live/GitHub hrefs correct","actor":"user"}],"success_criteria":"All 4 showcases render with data, varied composition, no dead anchors","priority":"critical","mode_requirement":["standard","polish","autopilot"]},
 {"journey_id":"J3","name":"Contact close","category":"conversion_flow","steps":[{"step":1,"action":"Nav → Contact","actor":"user"},{"step":2,"action":"Lenis smooth scroll lands section (scroll-behavior reconciliation)","actor":"system"},{"step":3,"action":"Email/LinkedIn/GitHub links functional","actor":"user"}],"success_criteria":"Anchor scroll arrives; hrefs match siteConfig","priority":"critical","mode_requirement":["standard","polish","autopilot"]},
 {"journey_id":"J4","name":"Reduced-motion visit","category":"accessibility_flow","steps":[{"step":1,"action":"Emulate prefers-reduced-motion","actor":"tester"},{"step":2,"action":"Full content + nav usable, no decorative motion","actor":"system"}],"success_criteria":"Static parity of all section content","priority":"critical","mode_requirement":["polish","autopilot"]},
 {"journey_id":"J5","name":"Mobile arc","category":"responsive_flow","steps":[{"step":1,"action":"375px viewport load","actor":"user"},{"step":2,"action":"No horizontal overflow, stacked showcases, tap-friendly links, no hover-gated content","actor":"system"}],"success_criteria":"Full-page screenshot review passes; scroll smooth","priority":"high","mode_requirement":["polish","autopilot"]}
]
```

## Traceability (pain point → requirement → success criterion)
| Charter pain point | Requirements | Success criteria |
|---|---|---|
| PP1 template look | FR-01/03/04/06/07/09/11/12/14/15 | S1, S2 |
| PP2 route fragmentation | FR-01, FR-19, §Scope Decisions | S1 |
| PP3 visuals underserved | FR-02/05/07/08/09/10, FR-16 | S1, S7 |
| PP4 trust constraint | FR-17, FR-04/11/13 copy rules | S3 |
| (mobile/perf/a11y criteria) | FR-18, NFR-01..04 | S4, S5, S6 |

## Constraints & Assumptions
- Constraints: Next 16.3.3 + React 19.2.4 + Tailwind 4 + static export; AGENTS.md bundled-docs rule; scroll-stack (Lenis ↔ Next 16 `data-scroll-behavior` ↔ globals.css) resolved in Phase 3 design; lucide-react installed — upgrade to 1.48.0 allowed (Phase 3 decision); framer-motion stays 12.x unless a bug demands major bump (upgrade to 13 = should, decision Phase 3).
- Assumptions (flagged): headline/section microcopy will be original generic invitations ("LET'S BUILD SOMETHING.") that assert no professional facts; © YEAR dynamic; testimonials/now/blog content mostly dropped from single-page except nowData current-focus line in About.

## Out of Scope / Won't (this cycle)
Copy of any Google/antigravity assets, logos, text; invented experience/clients/awards/metrics; CMS; analytics dashboards; WebGL/three.js (rejected by Phase 1 evidence); multi-page architecture; dark/light toggle (design system picks one primary canvas; invert is Won't this cycle).
