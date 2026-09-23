# PRP — Implementation Plan: Portfolio Repositioning (Cycle 4)

Inputs: `docs/PRD.md` (REQ-1…REQ-23), `docs/DESIGN.canvas.tsx` (D-schema, §1–§6), `prime/state/fact-whitelist.md`, `prime/reports/phase-3-design.md`.
Constraints honored: static `output:'export'` build (verified against https://nextjs.org/docs/app/guides/static-exports), no new production dependencies, preserve working surfaces, no fabrication (whitelist-gated content), no deployment (Tier C).

## Assumptions & Prerequisites
- A1/A3/A4 from Phase 1 stand (owner-brief facts; UMS minimal; canonical URL). Assumption: owner supplies no new assets during Build → text-first variants for Vision/PRIME.
- Prereqs: Node 26 + deps installed (present); PRIME plugin prerequisite checkpoint `node <prime-plugin>/scripts/check-prereqs.mjs --project-root .` must pass before Build work (per PRIME Phase 5 route; not a repo script).
- Dependency constraint: `docs/*.tsx` is type-checked; keep DESIGN.canvas.tsx compiling when editing schema notes.

## Risks & Mitigations
| Risk | Impact | Mitigation |
|---|---|---|
| Empty `image`/`url` breaks prerender or leaves dead anchors | Build failure / broken UI | Component rules in DESIGN §3 (key=slug, no `<Image>` when '', no anchor wrap) + build check in M2 |
| Union type churn breaks existing consumers of `HostedProject` | Compile errors across pages | Convert consumers in same commit slice as schema (M1); tsc gate |
| Copy drift from whitelist during content authoring | Credibility damage (Critical) | Every content task cites W# ids; grep audit in M5; phase-6 whitelist conformance check |
| Next 16 metadata/layout subtleties | Build/warning noise | Bundled docs already read (Phase 3); re-read 14-metadata doc at M3 before wrappers |
| Scope creep via 15 secondary routes | Timeline slip | Explicit non-goals; nav/footer-only treatment (REQ-23) |
| Responsive regressions from new sections | Mobile quality | Per-milestone browser spot check + full matrix in Phase 6 (REQ-18) |

## Milestones (ordered, with effort estimates and verification points)

### M1 — Data foundation (est. 4–5h) → REQ-1,2,6,7,11,13,21,22
1. `src/lib/types.ts` or projects.ts: union schema (FeaturedProject/OtherProject) per DESIGN §2.
2. Author 6 project entries (Quill, Barangay, Vision, PRIME, UBMS, UMS) + 2 others (Dish, AI SaaS) strictly from W1–W22 and the W23 derivation rule (workflow/architecture node labels may only restate owner-brief pipeline descriptions and existing projects.ts caseStudy text — no new claims); slugs, categories, highlights, links, case studies.
3. Skills: 7 domain groups per owner Phase 4 list ∩ whitelist.
4. Positioning strings single-sourced (siteConfig/team); canonical org-name constant (Bayanihan default, flagged to owner); fix education/experience date conflicts.
5. `config/navigation.ts`: 6 primary items, secondary→footer list.
6. Defensive interim patch to existing consumers so M1 stays build-green before ProjectCard exists (review finding 1): `featured-projects.tsx` + `projects-client.tsx` — hide `<Image>` when `image===''`, no-anchor card when `url===''`, `key={slug}` (M2 then replaces both with the shared card).
Verify: `npx tsc --noEmit`, `npm run lint`, `npm run build` green; grep: no non-whitelisted URL in src/data.

### M2 — Shared components (est. 4–5h) → REQ-3,4,5,9,12,18,19,21
1. `components/projects/project-card.tsx` (featured/compact variants, rules per §3).
2. `components/projects/flow-diagram.tsx` (workflow steps + architecture lanes, `<ol>` semantics, token styles, mobile vertical stack, reduced-motion safe).
3. `components/sections/what-i-build.tsx` + homepage insert (REQ-5) with `#cat-*` links.
4. Hero: positioning line (REQ-1), supporting message (REQ-4), 3 CTAs from siteConfig (REQ-3; replace draft literal GitHub URL).
Verify: build + dev-server browser spot check desktop/375px (hero, card variants, diagram both kinds).

### M3 — Routes & metadata (est. 4–5h) → REQ-8,10,16,17
1. `/projects/[slug]` server page (generateStaticParams from featured w/ caseStudy, generateMetadata, notFound), CaseStudyLayout rendering conditional sections + diagrams + metrics + screenshots + links.
2. `/projects` page: Featured (by category subgroups with ids) / Other split using flag; homepage FeaturedProjects filters flag.
3. Server metadata wrappers for client-only pages (skills, resume, contact, projects list + secondary pages where trivial).
4. sitemap.ts: all static routes + slugs + blog posts.
Verify: build emits N case-study pages (count in build output); static-export checks (finding 4): `out/404.html` exists and `out/projects/<slug>/index.html` count matches the build manifest (no server-side notFound behavior under export); curl prerendered HTML titles unique.

### M4 — Content rewrites (est. 2–3h) → REQ-1,2,14,15,22
1. About: engineering-workflow narrative replacing school timeline; keep profile photo/section.
2. Resume: summary (no objective), domain skills import, Experience/Client/Personal sections.
3. Education/experience blurbs de-juniorized (truth preserved: 2026 graduation stays).
Verify: grep ban-list (fresh graduate|beginner|basic|passionate|looking for|web development fundamentals|Bayanaihan) = 0 hits in content files; build green.

### M5 — Polish & pre-Verify sweep (est. 1–2h) → REQ-18,19,20,21
1. Responsive audit of new surfaces at 320/375/430/768/1280/1600 (dev server).
2. Link integrity: external URL 200-checks (W5/W17/W18/W15/W19) via HEAD requests; mechanical audit (finding 6): script grep that every `target=_blank` anchor also carries `rel="noopener noreferrer"`, and zero occurrences of `dangerouslySetInnerHTML` in `src/`.
3. Console error sweep; alt text; contrast spot checks; heading order on new pages.
4. Whitelist conformance grep (W1–W23): every number/URL/claim in changed `src/data` + content files resolves to a whitelist entry; report written to prime/reports.
Verify: lint 0, build 0, scripted checks report → evidence in prime/reports.

Total adjusted estimate: 15–20h (see calibration). Full Playwright matrix, independent quality-review, and Autopilot depth extensions belong to Phase 6, not Build.

## Estimation Calibration
Historical actuals: cycle 2+3 (archived reports) delivered comparable change sets — 12 fixes + site-wide E2E verified in ~2 working sessions each, suggesting ~1.3× variance vs first-pass estimates. Rebalanced after review finding 5: M1 4–5h (heaviest content authoring), M2 4–5h, M3 4–5h, M4 2–3h, M5 1–2h. Total adjusted estimate 15–20h, derived from PERT mean (o=11, m=15, p=24 → (11+4·15+24)/6 ≈ 15.8h) scaled by the 1.3× historical variance factor, rounded to the range above. Calibration basis recorded per G8.

## Requirement → Milestone Traceability (G12)
REQ-1: M1,M2,M4 · REQ-2: M1,M4 · REQ-3: M2 · REQ-4: M2 · REQ-5: M2 · REQ-6: M1,M3 · REQ-7: M1 · REQ-8: M3 · REQ-9: M2 · REQ-10: M1,M3 · REQ-11: M1,M5 · REQ-12: M2,M3 · REQ-13: M1 · REQ-14: M1,M4 · REQ-15: M4 · REQ-16: M3 · REQ-17: M3 · REQ-18: M2,M5 · REQ-19: M2,M5 · REQ-20: M1–M5 · REQ-21: M2,M5 · REQ-22: M1 · REQ-23: M1.
DESIGN decisions traced: D1→M3, D2→M2, D3→M1, D4→M3, D5→M1, D6→M1, D7→M2/M3.
External refs consulted: https://nextjs.org/docs/app/guides/static-exports ; https://nextjs.org/docs/app/getting-started/updating-metadata ; https://www.w3.org/WAI/tutorials/menus/structure/ (nav secondary pattern).

## Rollback
All work on branch `feat/repositioning-cycle4` (Tier A branch). Per-milestone commits; revert-forward per slice; no data/destructive ops (files-only change set).
