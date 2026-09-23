# Phase 3 — Design Report (Cycle 4)

Owner roles: `prime-requirement` + `prime-make` (design-authoring procedure; independent review by separate subagent). Output: `docs/DESIGN.canvas.tsx`, `prime/state/fact-whitelist.md`, this report. Frontend design route: comprehensive for Autopilot UI work — `references/core/design-quality-routing.md` and `references/design/quality-parts/index.json` (27-part manifest) loaded; parts 01/02/05/13/24/27 consulted for portfolio protocol; UI/UX Pro Max selector executed (`search.py "developer portfolio … " --design-system -p "Portfolio"`), Vercel brand token study queried via `scripts/query-brand-designs.mjs`.

## Methodology Checklist
- [x] Project design artifact continued (not reset): existing tokens from `src/app/globals.css` are the authority (frontend skill rule "project design doc is authority").
- [x] Selector run + benchmark record (below) because high-impact new UI (case studies, homepage sections).
- [x] Stack docs read before interface design because this repo's AGENTS.md warns Next 16 differs from training data.
- [x] Simplicity gate applied to every new component (see §Simplicity).
- [x] Requirements traced REQ-1…REQ-23 in DESIGN §6.
- [x] Independent design review + corrections (checkpoint artifact below).

## Technical Decisions (ADR-style, with rationale and sources)

### D1. Case-study route = static `[slug]` with async `params: Promise<{slug}>` + `generateStaticParams`
Rationale: production build is `output: 'export'` (`next.config.ts`), therefore every dynamic route must be enumerable at build time; the existing `/blog/[slug]` page already proves this exact interface in-repo. Verified against bundled docs `01-app/01-getting-started/03-layouts-and-pages.md` (mirrors https://nextjs.org/docs/app/getting-started/layouts-and-pages). Server Component case studies also gain `generateMetadata` for free (REQ-16) — because metadata cannot be exported from `'use client'` files (https://nextjs.org/docs/app/getting-started/updating-metadata).
Trade-off: content changes need rebuild — acceptable for a static portfolio.

### D2. Diagrams = one DOM-based `FlowDiagram` component (groups/steps props), not mermaid, not static SVG
Rationale: mermaid.js adds ~85KB+ client bundle and its theme system fights the existing CSS-variable dark/light pair (https://mermaid.js.org/config/theming.html documents theme-driven fills); static SVGs are theme-blind and duplicate five assets; a token-styled `<ol>` with CSS arrows reuses `--primary/--border/--glass`, keeps text selectable, screen-reader-navigable (ARIA list semantics per https://www.w3.org/WAI/ARIA/apg/patterns/list/), and satisfies REQ-12/REQ-18/REQ-19 with zero dependencies. Justification vs simplicity gate: one primitive replacing five bespoke diagrams is complexity-reducing.

### D3. Content model: extend `src/data/projects.ts` in place (typed `CaseStudy`, `featured`, `slug`, `links`, `category`), no MDX layer
Rationale: 5–6 pages of structured sections do not need a content pipeline; MDX (@next/mdx or content-collections) would add build plugins and authoring drift risk; a discriminated union (`FeaturedProject` requires `caseStudy` at compile time, `OtherProject` forbids it) gives type enforcement that featured ⇒ case study exists (schema in DESIGN §2; added after checkpoint review finding 1). Evidence: existing data-driven pages already render correctly at build (cycle-3 report; 29/29 pages).

### D4. Metadata strategy: server wrapper `page.tsx` + moved `*-client.tsx` bodies
Rationale: Next 16 metadata exports are server-only; the repo already uses this split (about-client, projects-client). Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata. Avoids converting whole client pages to server rendering (scope containment, REQ-16 without regression risk to interactive pages).

### D5. Positioning strings centralized in `siteConfig`/`team.ts` and composed everywhere
Rationale: P3/P11-class drift (three different role strings, Bayanaihan/Bayanihan) is a duplication defect, not a copy defect; single-source constants + REQ-22 grep check structurally prevents recurrence. Canonical: "AI Solution Developer | Full-Stack Systems Developer".

### D6. Nav split: six primary items; secondary GitHub-mirror routes → footer
Rationale: recruiter-focus requirement (REQ-23) without deleting working functionality (user constraint). Routes stay prerendered and sitemap-listed.

### D7. What I Build section keyed to `ProjectCategory` anchors on /projects
Rationale: linking category cards to the projects list (not new pages) avoids route sprawl while satisfying owner Phase 3; optional category pages explicitly deferred (simplicity: two nav structures = one too many).

## Design Benchmark Record (high-impact UI, per frontend skill)
- Sources consulted: UI/UX Pro Max selector output (pattern "Portfolio Grid"; style "Trust & Authority": metrics-bearing case studies, credentials over decoration; AVOID playful + AI purple/pink gradients) — generated locally from skill datasets; Vercel brand token study (monochrome + single blue link accent `#0070f3`, geometric sans + mono captions) via `query-brand-designs.mjs`; existing site's Linear-inspired surface (`hero.tsx` comment, `globals.css` tokens).
- Adopted: mono accents for metric values (type-scale existing), card hover 150–300ms, no decorative strips/emoji icons, visuals-first project grid.
- Rejected: mesh-gradient hero art (conflicts existing token palette; gimmick per brief), Airbnb/Stripe-style colored brand pops (off-positioning).
- External web sources: not cloned; official docs cited above for platform APIs only.

## Simplicity / Complexity Justification
- New: 3 components (ProjectCard extract, FlowDiagram, WhatIBuild), 1 route, ~6 data-type additions. Removed: positional slicing, duplicated role strings. No new npm dependencies. No page deletions. Each addition traces to ≥1 REQ; nothing built "for future use" (category pages deferred).

## Anti-slop & responsive design rules (inherited into Build/Verify)
- 320px: hero grid single column; FlowDiagram lanes → vertical stack with rotated arrows; tag chips wrap (`overflow-wrap`), marquee untouched.
- Contrast: `--muted-foreground` on `--background` re-checked per surface (cycle-3 `check_contrast` tooling reused in Verify).
- Motion: only existing framer-motion stagger/reveal; `prefers-reduced-motion` respected (3 existing blocks); no new particle layers.

## Open items handed to Plan
1. Screenshot/asset decisions for Vision Auditor/PRIME (text-first card variants — DESIGN §2 image:'' rule).
2. Barangay/Dish/AI-SaaS live URL 200-check at Build (W5/W17/W18).
3. Owner enrichment window for UMS (default: minimal facts-only featured entry or 5-flagship fallback).
