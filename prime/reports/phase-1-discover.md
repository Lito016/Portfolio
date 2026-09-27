# Phase 1 — Discover Report (Portfolio Rebuild, Cycle 5)

Owner: prime-problem runtime (assumed in main agent; host has no native PRIME agent registration). Quality mode: autopilot. Shape: full.

## Methodology Checklist (steps applied)

- [x] **Codebase/doc analysis** (attempt strategy 2 — owner brief is complete; no user questions needed): read `src/app/`, `src/data/`, `src/config/`, `next.config.ts`, `README.md`, `prime/state/fact-whitelist.md`, prior-cycle reports.
- [x] **Folder audit executed**: plugin-root `scripts/folder-audit.mjs` (prime-method-35.1.4) → `prime/reports/phase-1-folder-audit.md`, dated 2026-09-27 (1 medium finding: `next-env.d.ts` at root — Next-generated file, must stay at root; no action).
- [x] **Online research** (design language + technical constraints + library currency): dispatched dedicated research pass; evidence recorded below in "Research evidence".
- [x] **Ideation & alternatives evaluation**: options scored in "Alternatives" section.
- [x] **Prior-knowledge recall**: checked `prime/state` prior-cycle artifacts (charter, whitelist, gate results) — reused verified content rules instead of re-deriving.
- [x] **Pain-point validation**: ≥3 pain points with file-level evidence (see below) → passed to charter.

## Findings — Existing Content Inventory (verified by reading)

| Asset | Source | Reuse in rebuild |
|---|---|---|
| Identity: "Manolito Almaden Jr." / Lito016 / "AI Solution Developer \| Full-Stack Systems Developer" | `src/config/site.ts` | Nav logo, hero, about, footer, contact |
| Email manolitoalmadenjr@gmail.com, GitHub Lito016, LinkedIn (siteConfig) | `src/config/site.ts` (W19) | Contact section |
| 4 featured projects w/ case studies: Quill MCP, Barangay Digital Portal, Vision Video Auditor, Inventory Management System | `src/data/projects.ts` | Work section — the 4 editorial showcases (01–04) |
| 3 secondary projects: UBMS-era University MS, Dish Manager, AI SaaS Landing | `src/data/projects.ts` | Supporting/index row, not pinned showcases |
| Screenshots: `public/project-*.png` (quill-mcp, barangay, vision [diagram per W28], inventory ×4, dish-manager, ai-saas) | `public/` | Project visuals |
| Experience: Software Developer Intern, Bayanihan Network Inc., 2026-02→04, Philippines | `src/data/experience.ts` | Experience list (exact facts only) |
| Education: BSIT, Ilocos Sur Polytechnic State College, 2025–2026 | `src/data/education.ts` | About supporting info |
| Skills: 7 domains (Languages/Frontend/Backend/DB&BaaS/AI&ML/Infra/Engineering) | `src/data/skills.ts` (W22) | Typographic skills list with hover detail |
| What I Build categories + blurbs (W21/W24) | `src/data/projects.ts` | About statement material |
| Location "Philippines" (from experience/education) | data files | About metadata line |
| Profile/cover images: `public/profile.png`, root `Profile.png`, `Manolito Almaden Jr..png` | `public/` | Optional About visual |

Constraint confirmed: `prime/state/fact-whitelist.md` W1–W28 governs every visible claim ("Unknown = not shown"). No "X+ years" claims permitted. Availability: only verbatim `nowData` content may support an availability line (e.g. current-focus statement), no invented status.

## Pain Points (with evidence)

1. Generic pattern: home = Hero + WhatIBuild + marquee + card grid + CTA (`src/app/page.tsx:19-23`) — the exact template shape the owner rejects.
2. 20 routes fragment the story (19 route dirs + home page under `src/app/`); no scroll momentum, no single cinematic arc.
3. Strong project content rendered as uniform cards (`FeaturedProjects` grid; README "4-up grid fix" history) — visuals underserved.
4. Dark-theme card UI with particles/marquee reads assembled, not designed (README tech notes; `src/components/shared/` particles).

## Users / Personas / Scenarios

See charter §Users. Primary scenario: P1 lands → 6-second hero impression → scrolls through 4 pinned project stories → reads one editorial about statement → contacts. Failure mode to avoid: looks like every other dev portfolio; motion that reads as gimmick; broken mobile; invented claims destroying trust.

## Success Criteria

S1–S7 in `prime/state/project-charter.md` (single-page arc, staged hero load, whitelist traceability, 3-viewport verification, reduced-motion usability, clean static-export build, one-entry-per-project data model).

## Alternatives Considered & Evaluation (criteria: cinematic ceiling, bundle cost, static-export fit, maintenance, owner-rules fit)

| Option | Description | Score / verdict |
|---|---|---|
| A — Incremental restyle of existing multi-page app | Keep 20 routes, reskin light theme | Rejected: cannot deliver cinematic scroll arc; highest residual template-look (fails S1/S2) |
| B — **Single-page editorial rebuild, Framer Motion + GSAP/ScrollTrigger + Lenis; custom canvas visual (no three.js)** | New `page.tsx` composition; keep routes as removed/redirect targets | **Selected (pending Phase 3 confirmation)**: delivers pinned showcases + staged hero at lowest bundle cost; static-export safe |
| C — B + React Three Fiber hero object | WebGL 3D centerpiece | Conditional: only if a genuinely bespoke visual can't be done cheaper; +~100KB+ risk (R1). Research pass evaluating; default = defer |
| D — Astro/other framework | Rebuild outside Next | Rejected: breaks CI/CD + owner stack requirement (Next.js mandated in brief) |
| Motion lib detail: pure-Framer (no GSAP) | ScrollTrigger-equivalent via `useScroll`+`useTransform` | Fallback if GSAP bundle/complexity not justified for pinning; Lenis still additive |

## Research evidence

- **Local sources read**: `src/config/site.ts`, `src/data/projects.ts`, `experience.ts`, `education.ts`, `skills.ts`, `now.ts`, `testimonials.ts`, `src/app/page.tsx`, `next.config.ts`, `README.md`, `AGENTS.md`, `package.json`, `prime/state/fact-whitelist.md`, folder-audit output, prior `prime/state/state-machine.json`.
- **Online research (delegated research agent, benchmark/source-backed)**: antigravity.google design-language fetch (WebFetch rate-limited → `curl` fallback: page HTML 138,789 B + 3 linked Astro CSS files parsed); Next.js 16 bundled docs (`node_modules/next/dist/docs/`) breaking-change survey; `npm view` currency checks for gsap/lenis/three/@react-three/fiber/framer-motion/lucide-react; `bundlephobia.com/api/size` gzip measurements. Findings appended in §A–C below. Commands run: `find/grep/ls` over docs+node_modules, `npm view {gsap,lenis,three,@react-three/fiber,framer-motion,lucide-react} version`, `npm view gsap license`, curl fetches.

### A. Design language — antigravity.google (verified from live HTML/CSS)

Full evidence transcript: `prime/reports/phase-1-research.md`.

Method: WebFetch rate-limited; research agent fetched `https://antigravity.google` via curl (138,789 B decompressed) + its three Astro CSS files. Observations are from real source, not recollection.

- **Palette:** Material-3-style tokens on cool near-white stack: `#fff / #f8f9fc / #eff2f7 / #e6eaf0`; layered near-black ink `#121317–#45474d`; dark "inverse surface" panels. Accents: blue `#3186ff`/`#1a73e8` + sparing traffic-light sparks (`#00b95c`, `#fc413d`, `#fbbc04`, `#ffee48`).
- **Typography:** Google Sans Flex variable (weights 400–500 only — size carries hierarchy), optical sizing auto, scale base 15px → 148px display; display line-heights below 1.0, letter-spacing to −2.96px; headlines stack into short lines ("Built for developers / for the agent-first era").
- **Motion:** own `SmoothScrollLayout` chunk (confirms smooth-scroll as core feel), canvas particle hero (`MainParticlesComponent`), `TypedHeader` typewriter reveal, `hero_video.mp4`, custom cursor PNG; micro-transitions 0.15–0.3s ease-out / `cubic-bezier(.165,.84,.44,1)`; `backdrop-filter: blur(5–16px)` sticky header.
- **Composition:** oversized stacked hero type, hairline borders, generous whitespace, scroll-pinned media showcases, huge terminal CTA, breakpoints 425/767/1024/1440/1600.
- **Actionable principles for rebuild:** off-white canvas, near-black display type at 6–10vw, line-height ≈0.85–1.0, negative tracking, weight 400–500 only; hairline rules; one restrained accent + sparse sparks; sticky blurred compacting nav; scroll-pinned project showcases; ≤300ms micro / slow eased macro reveals; custom cursor as tasteful detail (pointer-fine only).
- **Comparables (prior knowledge — ASSUMPTION, not fetched):** linear.app (type scale + restraint), apple.com product pages (pinned showcase sequencing), lusion.co (single disciplined WebGL hero effect, motion-as-content).

### B. Next.js 16.3 constraints (verified in bundled docs)

Sources: `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`, `static-exports.md`, `01-getting-started/11-css.md|12-images.md|13-fonts.md`, `03-api-reference/02-components/image.md|font.md`; local `next.config.ts`, `src/app/layout.tsx`.

- Turbopack default for dev AND build — any webpack config fails build. `params`/`searchParams`/`cookies`/`headers` async-only. `middleware` → `proxy`. `next lint` removed (package.json already migrated). Parallel routes need `default.js`.
- **Scroll:** Next 16 no longer overrides global `scroll-behavior: smooth` on navigation; opt-in via `data-scroll-behavior="smooth"` on `<html>` — directly relevant to Lenis + anchor nav. Current `globals.css` sets `scroll-behavior` — must reconcile with Lenis (Lenis requires `scroll-behavior:auto`).
- **Static export** (`output:'export'`, prod-only here, `images.unoptimized:true`): unsupported = default image loader, redirects/rewrites/headers, cookies, proxy, Server Actions, ISR. `window`/`localStorage` must be guarded inside `'use client'` effects.
- Fonts: `next/font/google` self-hosts at build, export-safe; keep Geist-variable pattern. Tailwind 4: `@import 'tailwindcss'` in globals imported from root layout. Image defaults changed (qualities [75], `domains` deprecated) — moot under `unoptimized` export but matters if loader ever returns.
- React 19.2: native View Transitions / `Activity` available.

### C. Library currency, bundle cost, recommendation

Registry latest (`npm view`): gsap 3.15.0 (ScrollTrigger bundled, "Standard no charge" license), lenis 1.3.26, three 0.186.1, @react-three/fiber 9.8.1, framer-motion 13.4.4 (installed 12.42.2), lucide-react 1.48.0 (installed 1.23.0). gsap/lenis/three/r3f confirmed absent from package.json + node_modules.

Bundlephobia gzip: gsap 26.7KB, lenis 5.3KB, three 180.6KB, r3f 55.7KB.

**Recommendation (Option B confirmed):** adopt GSAP+ScrollTrigger+Lenis (+~32KB gzip — this is what produces the pinned/scroll orchestration and the antigravity feel; Framer Motion stays for micro-interactions and mount reveals). **Skip three/r3f** (+236KB gzip): antigravity's own hero is a 2D canvas particle field, not WebGL — replicate with a small custom cursor-reactive canvas (existing particles code proves the pattern, zero deps), gated by `prefers-reduced-motion` + pointer-fine.

## Unresolved Risks / Questions for later phases

- ~~Whether any WebGL/3D element is justified~~ Resolved by evidence: three/r3f rejected (+236KB gzip; antigravity hero itself is 2D canvas). Hero visual = custom cursor-reactive canvas, reduced-motion + pointer-fine gated.
- Existing secondary routes (blog/resume): rebuild removes them by design (owner said "from scratch"); flag in Phase 2 for explicit acknowledgment.
- `/project-vision.png` is a rendered diagram (W28) — must not be presented as a product screenshot.
- Lenis vs `globals.css scroll-behavior` and Next 16 `data-scroll-behavior="smooth"` opt-in must be reconciled in Phase 3 design (finding from §B).
- Comparables (linear/apple/lusion) rest on prior knowledge — marked ASSUMPTION; treat as directional only.

## Self-check

Pain points: 4 (≥3 ✓). Personas: 4 (≥2 ✓). Measurable success criteria: 7 (≥3 ✓). Internal consistency: charter pain points = this report's pain points. Self-check: PASSED — 2026-09-27.

## Skill Invocation Summary

| Skill | Classification | Status | Evidence |
|---|---|---|---|
| research | MANDATORY | APPLIED | RESEARCH.md loaded; online+local evidence tracked above; delegated research pass with citation requirements; alternatives scored with criteria |
| quality-review | MANDATORY | APPLIED | Independent quality-review dispatch on Phase 1 artifacts → `prime/reports/phase-1-quality-review.md` (separate invocation; verdict recorded) |
| caveman | MANDATORY (core) | APPLIED | Artifact writing uses caveman-compressed style discipline: no filler, evidence-dense tables/lines, ~75% token reduction target on prose while preserving technical substance |
| brainstorm | RECOMMENDED | N/A | Owner brief fully specifies intent; ideation handled in Alternatives table instead |
| frontend | RECOMMENDED | APPLIED-later | Design-system routing deferred to Phase 3 per orchestrator phase routes |
