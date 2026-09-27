# Phase 2 — Define Report (Cycle 5)

Owner: prime-requirement runtime (assumed in main agent; independent review by separate subagent). Inputs: `prime/state/project-charter.md`, `prime/reports/phase-1-discover.md`, `prime/reports/phase-1-research.md`, owner brief (conversation). Outputs: `docs/PRD.md`, `prime/state/requirements-spec.md`.

## Methodology Checklist (steps applied)
- [x] **Requirement elicitation** from owner brief §Goal/§Sections/Motion/Perf/A11y + charter personas/pain points; no re-asked questions (all answers present in brief — prior-answer rule logged).
- [x] **Pain-point → requirement mapping** complete (4/4, PRD §6); strategy attempt 1 (derive from problem brief + research) succeeded; no loop.
- [x] **Acceptance criteria** in GIVEN/WHEN/THEN for all 19 FRs; measurable NFR targets (6).
- [x] **MoSCoW classification** applied (must/should/could in FR table column 2; Won't list PRD §8).
- [x] **Critical journey matrix** per CRITICAL-JOURNEY-MATRIX.md template (J1–J5, priorities, mode requirements) — machine-readable copy at `prime/state/critical-journeys.json`, human copy in PRD §Critical Journeys.
- [x] **Research/reference evidence**: derived from verified Phase 1 research sources — live antigravity.google HTML/CSS evidence (`prime/reports/phase-1-research.md`), Next 16 bundled docs reference, npm/bundlephobia benchmarks; requirements cite file-level sources (whitelist, data files). No new online research needed this phase; none invented.
- [x] **Prior knowledge recall**: cycle-4 artifacts (fact-whitelist W1–W28, projects data model) treated as authoritative constraints, verified against `prime/state/cycle4-archive` boundary (whitelist deliberately kept active).

## Key decisions (see requirements-spec.md D1–D6)
Single-page replacement with route removal (D1); contact via direct links, web3forms dropped (D2); GitHub live-stats dropped (D3); 3 secondary projects as supporting row (D4); original claim-free microcopy (D5); Vision visual diagram-honest presentation (D6).

## Risks / open items handed to Phase 3 (Design)
- Scroll-stack reconciliation: Lenis (`scroll-behavior:auto`) vs Next 16 `data-scroll-behavior="smooth"` vs existing globals.css — design must name one scroll owner. (from research §B)
- Design-language translation of verified antigravity tokens (weights 400–500, sub-1.0 leading, negative tracking, hairlines, single accent) into a bespoke system without copying Google assets; frontend design-system routing + UI/UX selector required at Phase 3 per orchestrator.
- Canvas hero spec: 2D, cursor-reactive, pointer-fine + reduced-motion gated, lazy client mount.
- framer-motion 12→13 and lucide-react 1.23→1.48 upgrade decisions (version-matched docs first per AGENTS.md).

## Self-check (runtime protocol)
FR count 19 ≥3 ✓; acceptance criteria per FR 19/19 ✓; NFR ≥2 with measurable targets 6 ✓; journeys ≥1 critical ✓ (4 critical, 1 high). Self-check: PASSED — 2026-09-27.

## Skill Invocation Summary
| Skill | Classification | Status | Evidence |
|---|---|---|---|
| research | MANDATORY | APPLIED | Phase 1 verified sources consumed and cited in PRD/define (§Research/reference evidence row); no unsupported claims introduced |
| quality-review | MANDATORY | APPLIED | Independent subagent review of PRD + spec → `prime/reports/phase-2-quality-review.md` |
| caveman | MANDATORY (core) | APPLIED | Active session-wide caveman compression discipline for agent prose; artifacts evidence-dense, no filler |
| doc-forge | RECOMMENDED | N/A | No document artifact (office/doc) deliverable this phase; PRD is plain markdown |
| database / baas / business / security-testing | RECOMMENDED | N/A | No DB/BaaS/business-logic scope; static site, no new attack surface beyond links (covered by NFR/FR-17) |
