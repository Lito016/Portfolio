# Project Charter — Portfolio Rebuild (Cinematic / antigravity-inspired)

Project: Portfolio — Manolito Almaden Jr. (Lito016)
Cycle: 5 (rebuild from scratch, PRIME Full lifecycle, autopilot quality mode; prior cycle: Cycle 4)
Date: 2026-09-27
Owner: Lito016 (site owner, sole stakeholder)

## Problem Statement

The current portfolio (Next.js 16 multi-page, dark/light theme, card grids, GitHub API widgets) reads as a conventional developer portfolio. The owner wants the first impression to communicate: "This person builds sophisticated digital experiences." The site itself must *demonstrate* that claim — it should feel like a high-end interactive product experience, designed rather than assembled.

## Users & Personas

- **P1 — Hiring manager / studio lead (primary).** Skims in <60s. Judges craft by feel: typography, motion, composition. Needs: immediate visual impression, projects as the main attraction, fast load, clear contact path.
- **P2 — Prospective client / collaborator.** Wants evidence that complex systems (business platforms, AI tooling, CV pipelines) were actually designed and shipped end to end. Needs: project storytelling (problem → solution), real links, honest visuals.
- **P3 — The owner (maintainer).** Needs projects/content in a plain data structure so adding/removing a project is a one-entry edit.
- **P4 — Mobile visitor.** Gets a recomposed, touch-first experience — not a shrunk desktop.

## Pain Points (evidence-based)

1. **Template look.** Existing home page is hero + marquee + card grid + CTA — the exact "generic developer portfolio" pattern the owner rejects. (evidence: `src/app/page.tsx`, README "Home: Hero with cover photo, tech stack marquee, featured projects, contact CTA")
2. **20 routes dilute the showcase.** Home + 19 route pages (about, achievements, activity, blog, certifications, contact, contributions, education, experience, featured, now, open-source, projects, resume, skills, stats, tech-stack, testimonials, uses) fragment the story; scrolling never builds momentum. (evidence: `src/app/` directory listing, verified 2026-09-27)
3. **Content is strong but visually underserved.** 4 featured projects with case studies, screenshots, and verified links exist, yet render as uniform cards (`public/project-*.png`, `src/data/projects.ts`). The projects do not feel like the main attraction.
4. **Trust constraint.** Prior cycles produced a strict fact whitelist (`prime/state/fact-whitelist.md`, W1–W28): no invented experience, clients, metrics, awards. Any redesign must reuse verified content only.

## Desired Outcome (from owner brief, verbatim intent)

Premium, experimental, motion-driven single experience inspired by the *feeling* of antigravity.google — cinematic, futuristic, minimal, playful, spacious, polished — with NO copying of Google assets/branding/text. Editorial layouts, oversized typography, scroll-pinned project showcases, restrained palette (warm off-white canvas, near-black type), purposeful motion, designed mobile, high performance, accessibility (reduced-motion, keyboard, contrast).

## Constraints

- Keep deployable stack: Next.js 16.3.3 static export (`output: 'export'` → `out/`) on Cloudflare Pages via GitHub Actions (`next.config.ts`, `.github/`, `wrangler.toml`).
- React 19.2.4, Tailwind CSS 4, TypeScript. AGENTS.md: this Next version has breaking changes vs. training data — read `node_modules/next/dist/docs/` before coding.
- Content limited to fact whitelist W1–W28 + existing `src/data/` files. No new claims.
- Motion: Framer Motion + GSAP/ScrollTrigger + Lenis as appropriate; Three.js/R3F only where it genuinely improves the experience; Lucide icons.
- No Git history destruction: rebuild happens on this repo's main (prior work committed at 546bf63).

## Success Criteria (measurable)

- S1: Single-page scroll experience with Hero → Work (4 featured, editorial/pinned) → About → Skills (typographic reveal list) → Experience → Contact → Footer.
- S2: First-paint impression: oversized display typography + one central interactive visual reacting to cursor; load sequence staged (bg → nav → type lines → visual → metadata → settle).
- S3: Every rendered fact/URL/metric traces to fact-whitelist entry.
- S4: Desktop/tablet/mobile verified via full-page screenshots at 3 viewports; hover interactions only on pointer devices; no cursor-dependent functionality on touch.
- S5: `prefers-reduced-motion`: full content and navigation usable, animations neutralized.
- S6: Build passes (`next build`, static export), lint passes, images lazy-loaded, heavy scenes code-split; no layout jank in scroll playback.
- S7: Projects data remains a plain array so a new project = one entry added.

## Risks

- R1: Motion libs inflate bundle → mitigated by evidence (Phase 1 §C): adopt GSAP+ScrollTrigger+Lenis (~32KB gzip), reject three/r3f (+236KB); hero = custom 2D canvas, lazy, reduced-motion gated.
- R2: "Experimental" drifts to gimmicky → mitigate: motion principles in brief (fast micro / slow macro, eased, purposeful) enforced in review passes.
- R3: Design research via fetch of antigravity.google — DONE via curl fallback (WebFetch rate-limited); rendered visual appearance not screenshot-verified, only source HTML/CSS.
- R4: Single-page rebuild removes existing pages the owner may still value (Blog/Resume) → decision recorded in Phase 2 scope.
- R5: Scroll-stack conflict: Lenis requires `scroll-behavior:auto`, Next 16 adds `data-scroll-behavior` opt-in, existing globals.css sets smooth → Phase 3 must define one owner of scrolling.

## Out of Scope (unless owner directs later)

Copy of any Google/antigravity assets, logos, text, or proprietary imagery; new professional claims; CMS/admin; analytics dashboards beyond existing Cloudflare-provided data.
