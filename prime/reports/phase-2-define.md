# Phase 2 — Define: Requirements Decisions (Cycle 4)

Owner role: `prime-requirement` (ARCHITECT procedure assumed in main agent; independent review via separate subagent).
Output: `docs/PRD.md` (R1–R21, acceptance criteria, traceability).

## Methodology Checklist
- [x] Recall of prior artifacts — cycle-3 `PRD.md` and `requirements-spec.md` reviewed from `prime/state/cycle3-archive/`: cycle-3 requirements targeted SEO/a11y/perf polish, not project presentation; cycle-4 requirements extend rather than contradict them.
- [x] Research evidence — repo facts from `prime/reports/phase-1-research.md` (GitHub API verified sources: only `quill-mcp`/`University-Management-System` public among flagships; drives R7/R11 link discipline).
- [x] Persona/scenario → requirement mapping — every R# traced to owner-brief phase or P# finding (PRD Traceability table).
- [x] Architecture-relevant requirements separated — NFR table + Data Requirements (software-architecture skill reference applied: read `references/prime-requirement-architect.md`; agentic-pipeline sections inapplicable, recorded below).
- [x] Acceptance criteria testability pass — each Must requirement has Given/When/Then or grep/build-checkable criterion.
- [x] Independent quality review — `prime/reports/phase-2-quality-review.md` (separate subagent).

## Key Requirement Decisions
1. **Whitelist mechanism (R11)** — a `prime/state/fact-whitelist.md` will be authored in Design listing every number/URL that may appear on the site; verification greps case-study data against it. Chosen over prose "be accurate" because it is machine-checkable and blocks fabrication risk identified in P14.
2. **Semantic featured flag (R6)** — replaces positional `slice(0,3)`; curation intent lives in data.
3. **Data-driven case studies (R10)** — one dynamic route + typed structured content beats 5 hardcoded pages (maintenance, sitemap integration) and beats MDX (new deps for no current authoring win). Route/API specifics deferred to Design after reading bundled Next 16 docs (project `AGENTS.md` mandate).
4. **Shared FlowDiagram component (R12)** — one component, data-fed architecture/workflow graphs; rejected mermaid.js (bundle + dark-mode friction) and static SVGs (theme-blind, duplicate assets).
5. **Skills/resume single source (R13–R14)** — resume imports `skills.ts`; duplication (P11 class) structurally prevented.
6. **Metadata via server wrappers (R16)** — client pages get thin `page.tsx` server components exporting metadata; known Next pattern, minimal churn.
7. **Route sprawl (open question)** — default decision: keep all 21 routes reachable; primary nav narrows focus to Home/Projects/Skills/About/Resume/Contact per target structure. Removals need owner approval (user constraint: don't remove working functionality unnecessarily).
8. **Agentic workflow design step skipped with reason** — ARCHITECT Step 2 applies only to `--agentic` AI-pipeline products; this project is a static content site. Recorded per mandatory-skill enforcement policy.

## Scope Boundaries Confirmed
- No new production dependencies without Design approval (Tier B notify).
- Deployment excluded (Tier C).
- UMS inclusion is conditional on owner input (R7) — not a blocker; 5 flagships satisfy Phase 5 "eventually include" wording.

## Assumptions Carried Forward
- A1 (brief facts for Vision/PRIME/UBMS are true, owner-supplied), A3 (UMS = intended 6th), A4 (canonical URL `portfolio-8af.pages.dev`) inherited from Phase 1 and restated in PRD risks.
