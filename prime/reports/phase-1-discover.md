# Phase 1 — Discover: Portfolio Repositioning Audit (Cycle 4)

Owner role: `prime-problem` (assumed in main agent; host has no native `prime-problem` registration).
Inputs: full repository inspection (`src/app`, `src/components`, `src/data`, `src/config`), prior-cycle artifacts (`prime/state/cycle3-archive/`), folder audit (`prime/reports/phase-1-folder-audit.md`), online research verification via GitHub API.

## Methodology Checklist
- [x] Prior knowledge recall — cycle 3 artifacts reviewed: 68-check baseline, positioning already partially applied ("AI Solution Developer" in `site.ts:6`, hero eyebrow `hero.tsx:48`, skills domain-organized in cycle 2).
- [x] Repository audit — full source inventory + targeted reads (research evidence below).
- [x] Online research / source verification — GitHub API (`/users/Lito016/repos`, `/repos/Lito016/University-Management-System`) verified which repos are public: **quill-mcp yes; prime/vision/ubms/barangay NO public repos; University-Management-System yes (TypeScript, no README)**. Barangay Portal's live URL and Dish Manager's live URL come from `src/data/projects.ts`.
- [x] User/persona & needs analysis — three audiences defined in charter.
- [x] Alternative evaluation & scoring — diagram rendering and case-study architecture options scored below.
- [x] Pain-point identification — 14 findings recorded.

## Findings & Pain Points

### Positioning residuals (junior tone)
1. **P1** `src/data/education.ts:11` — "Fresh graduate. Focused on web development, mobile development, and information technology." — generic student framing. Pain: recruiters anchor on "fresh graduate", not "systems developer".
2. **P2** `src/app/about/about-client.tsx:8-45` — school timeline ("Started IT Studies", "Joined GitHub", "OJT Internship") reads like a CV for a student, not an engineering-process narrative the user requested.
3. **P3** `src/data/team.ts:8` role says "AI Solution Developer" but never "Full-Stack Systems Developer"; resume subtitle (`resume/page.tsx:71`) is "AI Solution Developer | Web & Mobile Developer" — inconsistent with target positioning.
4. **P4** Hero (`hero.tsx:47-63`) has **zero CTAs** and no value line; the brief requires View Projects / GitHub / Resume and a supporting "what I build / why valuable" message.
5. **P5** No "What I Build" section anywhere on homepage (`page.tsx:16-21`: Hero → Marquee → FeaturedProjects → ContactCTA).

### Project presentation
6. **P6** `src/data/projects.ts` — flat array, only 4 projects. **Missing flagship entries: Vision Video Auditor, PRIME Method, UBMS** (orphan asset `public/project-ubms.png` proves UBMS was intended). Dish Manager one-liner sits undifferentiated beside Quill MCP's deep profile.
7. **P7** `featured-projects.tsx:8` uses positional `slice(0,3)` — no semantic featured flag; "featured" = list order, so reordering breaks curation intent.
8. **P8** `caseStudy` data exists for 3 projects but **is never rendered anywhere** — no `/projects/[slug]` route; `projects-client.tsx:71-73` links out only. The strongest evidence (problem/approach/solution/result) is dead data.
9. **P9** No architecture/workflow diagrams anywhere; zero diagram capability in dependencies (verified package.json).

### Skills / resume / consistency
10. **P10** Skills (`skills.ts`) are domain-organized but omit user-declared, project-supported capabilities: Laravel, FastAPI, PHP, Supabase, YOLO/computer vision, MySQL+RLS/BaaS grouping, engineering practices (system design, API design, workflow modeling). Resume and Skills page organize differently.
11. **P11** Data inconsistencies: "Bayanaihan Network Inc." (`experience.ts:7-11`, `certifications.ts:5`) vs id `bayanihan-intern`; conflicting dates (OJT 2026-02→04 vs about timeline 2024 vs "Started IT Studies" 2021 + education 2025–2026).

### Technical credibility infrastructure
12. **P12** Client-component pages export **no per-page metadata** (`/skills`, `/resume`, `/contact`, `/projects`, blog, etc. — `'use client'` at top blocks export); sitemap omits blog posts and future case studies.
13. **P13** `/featured` (GitHub stars) and `/tech-stack`, `/stats`, `/activity`, `/contributions`, `/open-source`, `/testimonials` — 21 routes dilute the core narrative; several are thin GitHub-API dashboards that can look like filler to a recruiter.
14. **P14** Metrics discipline: only verified numbers may appear (Quill: 49 tools, 16 memory types — from existing data; repo existence — from GitHub API). Vision Auditor/PRIME/UBMS facts come solely from owner's brief; **no repo links or metrics can be shown for them until owner supplies them**.

## User Needs (visitor jobs-to-be-done)
- Recruiter, 5 seconds: identity → proof → next action (needs hero statement + CTA + flagship cards).
- Client: "can you build my business system?" (needs systems framing: Barangay, UBMS, UMS + workflows).
- Technical reviewer: architecture and decisions (needs case studies with diagrams, tradeoffs, real metrics).

## Alternatives Considered (evaluation for later phases)
| Decision | Options | Score/notes |
|---|---|---|
| Diagram rendering | (a) mermaid/js dep (+bundle, theme drift) (b) purpose-built React flow component reusing tokens (c) static SVG images | Early lean: **(b)** — theme-aware, no new deps, reusable across 5 flagships; (a) scores lower on control/bundle; (c) lower on dark-mode. To be confirmed in Design. |
| Case-study data | (a) hardcode per-page JSX (b) extend `projects.ts` with structured `caseStudy` fields + single dynamic route (c) MDX content layer | Lean: **(b)** — reuses existing typed data, no new deps, sitemap-friendly (c) adds deps/parsing for marginal authoring gain; (a) duplicates layout 5×. |
| Thin extra routes | (a) delete (b) keep all (c) keep, de-emphasize from nav | Lean: **(c)/(a) mix** — decide in Design; deleting working functionality needs justification (user constraint). |
| 6th featured project | University-Management-System (verified repo, zero facts) vs stay at 5 | Lean: include **UMS** with only verified facts, flagged for owner enrichment. |

## Assumptions (documented per Autopilot)
- A1: Vision Video Auditor, PRIME Method, UBMS exist as described in the owner's brief; presented with brief-derived facts, **no GitHub/live links until owner provides them**.
- A2: "AI-assisted development", MCP, YOLO etc. are permitted in Skills because owner explicitly declares them backed by work.
- A3: UMS = "University Management System" repo is the intended "one additional strong management system".
- A4: Deployment stays out of scope; `portfolio-8af.pages.dev` remains the canonical URL in metadata.
- Evidence note: A1/A3 and repo-verification facts rest on live GitHub API queries run 2026-09-23 (reproducible via `api.github.com/users/Lito016/repos`; no local snapshot retained).
- Correction: folder-audit suggestion to relocate `next-env.d.ts` is **rejected** — Next.js requires it at project root; no action taken.

## Success Criteria
See charter §Success Criteria (7 measurable items). Baseline from cycle 3: 64/68 browser checks passing, build 29 pages, lint clean.

## Risks
- Fabrication risk (mitigated: A1 + metrics whitelist per case study).
- Next.js 16 API drift for dynamic routes/metadata (mitigated: read bundled docs before Build).
- Scope sprawl across 15 user phases (mitigated: guard checkpoints, per-slice verification).
