# Project Charter — Portfolio Repositioning (Cycle 4)

## Project
Reposition the existing Next.js 16 portfolio at `C:\Projects\Portfolio` so visitors (recruiters, clients, technical reviewers) understand within seconds that the owner is an **AI Solution Developer | Full-Stack Systems Developer** who builds business systems, AI-powered tools, developer tooling, automation, and computer vision applications.

## Owner / Persona
Manolito Almaden Jr. (`Lito016`) — AI Solution Developer, full-stack systems builder. Fresh-graduate history is real and must not be fabricated away; presentation shifts from school-portfolio tone to systems-engineer tone.

## Target Audience
1. Technical recruiters — need identity + proof in seconds.
2. Potential clients — need business-system capability evidence.
3. Technical reviewers / engineers — need architecture, tradeoffs, real metrics.

## Scope
- Positioning consistency across hero, bio, resume, about, metadata.
- Homepage content hierarchy: hero message + CTAs (View Projects / GitHub / Resume) + "What I Build" 3-category section.
- Featured vs Other project split; add missing flagships: Vision Video Auditor, PRIME Method, UBMS.
- Dedicated case-study pages at `/projects/[slug]` for flagships (Overview, Problem, Architecture, Workflow, Challenges, Tech Decisions, Metrics, Stack, Screenshots, Links). **No invented metrics** — only facts from `src/data/projects.ts`, the owner's brief, or verifiable sources.
- Skills page re-organized by domain (Languages, Frontend, Backend, Databases & BaaS, AI & ML, Infrastructure, Engineering) without subjective levels.
- Resume + About rewrites aligned to positioning.
- Architecture diagrams for each flagship (rendered as clean React/SVG or HTML flow components; no new heavy deps without justification).
- SEO/metadata per page, sitemap coverage, accessibility, mobile responsiveness (320–desktop), performance.

## Out of Scope (unless approved)
- Framework/stack change (stays Next.js 16 + React 19 + Tailwind 4).
- Full visual redesign of strong existing surfaces (Linear-inspired hero banner, theme system).
- Deployment/publication (Tier C — requires explicit user approval).

## Constraints
- `AGENTS.md`: this Next.js version has breaking changes vs. prior training data — read `node_modules/next/dist/docs/` before writing code.
- Do not invent experience, metrics, or technologies.
- Reuse components; avoid duplicated data; keep maintainable.
- Verify incrementally: lint + build + browser verification after major slices.

## Success Criteria (measurable)
1. Every page conveys the single positioning statement; zero junior phrases ("Fresh graduate…" objective tone, "Basic", school-timeline framing) remain in primary content.
2. 5–6 flagship projects render as cards with highlights + links to case-study pages; simple projects grouped under "Other Projects".
3. Each flagship case study includes an architecture/workflow diagram and only verified metrics.
4. Skills organized by domain, no subjective labels; consistent between Skills page and Resume.
5. Homepage hero: identity, what-I-build message, value line, ≤3 CTAs.
6. Lint 0 errors, production build passes, browser verification at desktop/tablet/mobile (320/375/430px) with no overflow or console errors.
7. Metadata + sitemap cover all pages including case studies.

## Key Risks
- Metric fabrication temptation — mitigated by sourcing every number from `src/data/projects.ts` (Quill: 49 tools, 16 memory types) or omitting.
- Scope size (15 sub-phases) — mitigated by guard-enforced lifecycle with checkpoints.
- Next.js 16 API drift — mitigated by reading bundled docs before Build.

## Quality Mode / Lifecycle
Autopilot · Full lifecycle · Guarded (prime-guard.mjs). Prior cycle (3) artifacts archived in `prime/state/cycle3-archive/`.
