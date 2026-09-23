# PRD: Portfolio Repositioning — "AI Solution Developer | Full-Stack Systems Developer" (Cycle 4)

## Overview
Reposition the existing Next.js 16 portfolio so recruiters, clients, and technical reviewers understand within seconds that the owner builds serious software systems and AI-enabled applications: business systems, AI tools, developer tooling, automation, and computer vision. Preserve the strongest existing surfaces (Linear-inspired hero banner, theme system, glass cards); focus on positioning, content hierarchy, project presentation, case studies, credibility evidence, consistency, and polish.

Source discovery: `prime/reports/phase-1-discover.md` (findings P1–P14), `prime/reports/phase-1-research.md`.

## Goals
1. One consistent professional identity site-wide.
2. Project curation: flagships elevated, simple projects demoted, case studies with diagrams and verified evidence.
3. Technical credibility: real architecture descriptions, metrics only where verified, links only where they exist.
4. Production quality: metadata per page, a11y, responsive 320px–desktop, clean lint/build, no console errors.

## Non-Goals
- Stack or framework change (stays Next.js 16 + React 19 + Tailwind 4).
- Full visual rewrite of working surfaces.
- Deployment/publication (requires explicit user approval — Tier C).
- Inventing experience, metrics, repositories, or client logos.

## Users and Scenarios
| User | Scenario | Need |
|---|---|---|
| Technical recruiter | 10-second scan of homepage | Identity + proof + next action within first viewport |
| Potential client | Evaluating whether to commission a business system | Evidence of shipped systems (Barangay, UBMS, UMS) with workflows |
| Engineer/reviewer | Deep diligence | Case studies: architecture, tradeoffs, real metrics, code links |
| Owner (maintainer) | Updating content | Single source of truth in `src/data`, no duplication |

## Requirements
| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| REQ-1 | The site must present the positioning "AI Solution Developer | Full-Stack Systems Developer" consistently in hero, `siteConfig` title, team role, and resume subtitle. | Must | Given the built site, when hero, metadata title, resume header are inspected, then each contains both role halves (no stale "Web & Mobile Developer"). |
| REQ-2 | Junior-framed wording must be removed from primary content: "Fresh graduate…" education blurb, school-milestone timeline framing, "web development fundamentals". | Must | Grep of `src/data/` + about/education/resume shows no junior phrases; dates between education/experience/about no longer conflict. |
| REQ-3 | Hero must offer exactly three primary CTAs: View Projects, GitHub, Resume. | Must | Given desktop and 375px viewports, when hero renders, then 3 CTAs are visible, focusable, and navigate correctly. |
| REQ-4 | Hero must state who/what/why: role line, one supporting message about building full-stack business systems, AI tools, automation, CV apps, and value framing. | Must | Reviewer can answer "what does he build?" from hero alone. |
| REQ-5 | Homepage must include a "What I Build" section with the three categories Business & Management Systems, AI & Developer Tools, Computer Vision & Automation, each with example capabilities. | Must | Section renders between hero and projects; each category card lists examples per owner brief. |
| REQ-6 | The project data model must carry semantic `featured: boolean`, `slug`, `highlights[]`, and structured case-study content — no positional slicing. | Must | `featured-projects.tsx` filters on the flag; reordering the array does not change which projects are featured. |
| REQ-7 | Vision Video Auditor, PRIME Method, and UBMS must be added as projects using only owner-brief facts; UMS included only if owner enriches or accepts minimal verified description. | Must | Each entry's description/highlights trace to the brief; no repo/live URL present unless verified reachable. |
| REQ-8 | Projects page must group Featured and Other Projects; Dish Manager and AI SaaS Landing appear only under Other. | Must | Two distinct sections; flagships never render in Other. |
| REQ-9 | Each featured card must show name, technical one-liner, key highlights, tech tags, "View Case Study", and live/GitHub link when available. | Must | Card for Quill shows ≥4 highlights incl. "49 MCP tools"; cards without links show no dead link/icon. |
| REQ-10 | A static case-study page must exist per flagship at `/projects/[slug]` (Next 16 dynamic route + `generateStaticParams`) rendering: Overview, Problem, Users, Solution, Core Workflow, Architecture, Major Features, Engineering Challenges, Technical Decisions, Metrics, Tech Stack, Screenshot(s), Links. | Must | `next build` emits one page per flagship slug; every section with available data renders; sections without data are omitted, not filled with filler. |
| REQ-11 | The fact whitelist (`prime/state/fact-whitelist.md`, created in Design) must cover **all site-visible numbers, URLs, and project claims** — case studies, project cards, "What I Build", hero stats, resume, about — not case studies alone. | Must | Reviewer matches every metric/URL/claim on changed pages to the whitelist; unmatched item = fail. |
| REQ-12 | Each flagship case study must include at least one architecture/workflow diagram rendered by one shared component (no per-page SVG duplication, no new heavy dependency). | Must | Single `FlowDiagram`-style component feeds all 5 diagrams; readable at 320px (scroll within container or vertical stack). |
| REQ-13 | Skills page must be organized by domain (Languages, Frontend, Backend, Databases & BaaS, AI & ML, Infrastructure & Deployment, Engineering) with no subjective level labels; content limited to owner-brief list and project-supported items. | Must | Seven categories render as tag groups; grep shows no "Beginner/Intermediate/Expert/Basic/progress%". |
| REQ-14 | Resume page must replace the objective with a systems-focused professional summary, reuse the skills data source, and separate Experience / Client Projects / Personal Projects (no fabricated employment). | Must | Resume imports from same data modules as Skills page; summary contains AI-solution + full-stack-systems framing; section headers present. |
| REQ-15 | About page must describe what he builds, his engineering workflow (Understand → Model → Design → Build → Test → Deploy → Monitor → Improve), and problem types he solves, without generic passion statements. | Must | No "passionate about technology"; workflow steps rendered as process, not school timeline. |
| REQ-16 | Every routed page must export page-specific `title`/`description` metadata (server wrapper around client pages where needed). | Must | `/skills`, `/resume`, `/contact`, `/projects`, case studies each return unique `<title>` and meta description in built HTML. |
| REQ-17 | Sitemap must include all static routes plus every `/projects/[slug]`; blog index and posts included or consciously excluded. | Must | `sitemap.ts` output contains each flagship slug. |
| REQ-18 | No horizontal page overflow at 320/375/430/tablet(768)/laptop(1280)/desktop(1600); navigation, cards, tags, diagrams usable at each. | Must | Playwright check: `document.documentElement.scrollWidth <= viewport width` at all six widths on all changed pages. |
| REQ-19 | Accessibility: single h1 per page, alt text on all images, visible focus rings, AA contrast in both themes, labeled form controls. | Must | axe/manual pass on changed pages; no decorative animation traps keyboard focus. |
| REQ-20 | `npm run lint` → 0 errors; `npm run build` → all pages prerender; zero console errors on visited pages. | Must | CI-equivalent local runs, exit code 0. |
| REQ-21 | Visual additions (sections, cards, diagrams) must reuse existing design tokens/primitives; no new gradients/glass/glow/particle gimmicks. | Must | Review confirms shared primitives (`SectionHeading`, glass-card patterns) used; theme toggle affects new components correctly. |
| REQ-22 | Organization/person names must have a single canonical source across experience, education, and certifications; the "Bayanaihan" vs "bayanihan-intern" spelling conflict must be resolved to one form (owner confirmation required; default `Bayanihan`). | Must | Given grep of all name strings in `src/data/`, when compared, then every occurrence of each entity is byte-identical and derives from one constant. |
| REQ-23 | Primary navigation must present the target structure Home · Projects · Skills · About · Resume · Contact; secondary routes remain reachable via footer/links but leave primary nav. | Must | Header renders the six items at desktop + mobile menu; removed routes still return 200 and appear in sitemap. |

## User Experience Requirements
- Information architecture: Home · Projects (+ case studies) · Skills · About · Resume · Contact primary; secondary GitHub-mirror routes stay reachable but are not reworked unless cheap wins appear.
- Content tone: precise engineering language; short sentences; no buzzword soup; screenshots at consistent aspect ratio.
- Motion: keep existing restrained reveals; remove nothing that currently works well; no new animation categories.

## Data and Integration Requirements
- Single source: extended `src/data/projects.ts` (`slug`, `featured`, `highlights`, structured `caseStudy` incl. `workflowSteps`, `architectureNodes`, `metrics`, `links`).
- Skills single source `src/data/skills.ts` consumed by Skills page and Resume.
- GitHub live-data routes unchanged (React Query client fetches); no build-time secrets.
- Images: reuse `next/image` with existing screenshot assets; new `public/` images only for the three added flagships if owner supplies, else documented placeholders-free layout (no fake screenshots).

## Non-Functional Requirements
| Category | Requirement | Target |
|---|---|---|
| Performance | Static prerender (SSG) for all new routes; optimized images; no new heavy deps | Lighthouse (production, desktop): Accessibility ≥ 90, SEO ≥ 90, Best Practices ≥ 90; Performance score recorded as observation against current baseline |
| Reliability | Existing pages keep working; no route removals without decision | 21 existing routes reachable post-change |
| Security | No secrets; external links only from verified data; no user input surfaces added | Review pass |
| Maintainability | Shared `FlowDiagram` + case-study layout components; data-driven content | ≤1 layout component per page family |
| Compatibility | Next.js 16 conventions verified against bundled `node_modules/next/dist/docs/` before coding | Doc citations in phase-3 report |

## Risks and Open Questions
| Item | Impact | Owner | Resolution Needed |
|---|---|---|---|
| Vision/PRIME/UBMS facts are owner-asserted; no public repos | Credibility claims could be unverifiable | Owner | Owner confirms brief facts; links omitted meanwhile |
| No screenshots exist for Vision/PRIME/UBMS | Cards/case studies look empty | Owner | Supply screenshots or accept text-first layout |
| UMS has zero public detail | Featured slot thin | Owner | Provide highlights or keep at 5 flagships |
| 21-route sprawl vs recruiter focus | Diluted narrative | Orchestrator | Default: keep routes, tighten nav; revisit in Design |
| Next.js 16 route/metadata API drift | Build breakage | Builder | Read bundled docs before implementation (R: NFR) |
| Canonical spelling of "Bayanaihan/Bayanihan Network Inc." unknown | Wrong legal-ish name on resume | Owner | Owner confirms exact company name (default `Bayanihan` per `bayanihan-intern` id) |

## Success Metrics
- Recruiter test: identity-understandable-in-5-seconds on hero (human check).
- 5–6 flagship case studies with diagrams; 0 whitelist violations.
- Lint/build/console: 0 errors; metadata coverage 100% of routed pages; overflow checks pass at 6 widths.
- Baseline: cycle-3 browser pass rate 64/68 → cycle-4 checks ≥95% with new surfaces included.

## Traceability
| Requirement | Source | Verification |
|---|---|---|
| REQ-1–REQ-5 | Owner brief Phases 2–3; P1–P5 | Phase 6 browser + grep checks |
| REQ-6–REQ-9 | Owner brief Phases 5–6; P6–P9 | Build + DOM inspection |
| REQ-10–REQ-12 | Owner brief Phases 7–8, 11; P8–P9 | Build page manifest, whitelist review, screenshots |
| REQ-13–REQ-15 | Owner brief Phases 4, 9–10; P2–P3, P10–P11 | Content review, grep |
| REQ-16–REQ-17 | P12; SEO audit | Built HTML inspection, sitemap.xml output |
| REQ-18–REQ-20 | Owner brief Phases 14–15, Final Validation; P13 | Playwright + lint/build logs |
| REQ-21 | Owner brief Phase 13 | Visual review in Verify |
| REQ-22 | P11 (name/date inconsistency) | Grep canonical-source check |
| REQ-23 | P13; owner brief Final Portfolio Structure | Header DOM + route reachability check |
