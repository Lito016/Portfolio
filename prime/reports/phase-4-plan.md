# Phase 4 — Plan Report (Cycle 5, Portfolio Rebuild)

Owner: prime-instruct (procedure prime-instruct-spec; role assumed in main agent — host has no native PRIME agent registration). Quality mode: autopilot; shape: full. Date: 2026-09-27. Artifact: `docs/PRP.md` (full plan; this file records planning decisions and evidence).

## 1. Planning inputs (prior-knowledge recall)

- Verified in-repo sources consumed rather than re-derived: `docs/PRD.md` (25 REQ trace ids, journeys), `docs/DESIGN.canvas.tsx` (module schemas, behaviorStates, motion budgets, G13 approval record), `prime/reports/phase-3-design.md` (ADR-3.1…3.9 + risks), `prime/reports/phase-3-quality-review.md` (two passes, verdict pass; carry-overs converted into plan tasks — finding-10 truncated PRD clauses appear as explicit carry-in lines bound to M2/M4/M5/M6; G32 source-parity bound to M2; §14 62-item preflight bound to M8), cycle-4 `docs/PRP.md` (superseded; its calibration row reused as the historical-actuals basis).
- Research skill evidence (current, this phase): `npm view` re-run 2026-09-27 confirms gsap 3.15.0 / lenis 1.3.26 / lucide-react 1.48.0 / framer-motion latest 13.4.4 with 12.42.2 intentionally held (ADR-3.8 rule "no major without a bug"). Phase-1 online chain (bundlephobia gzip figures, bundled Next 16 docs survey, gsap license/blog) reused as sources; plan URLs carry rationale at point of use (R-1, M2, M4).
- `check-prereqs.mjs` executed read-only: `PREREQ-BLOCKED [PREREQ_RUN_CONTEXT_FINGERPRINT_MISSING]` — converted into plan prerequisite A-P3 gate G0-Build with its fix, so Phase 5 cannot silently skip it.

## 2. Specification decisions (D-numbers, planning-level only)

- D-4.1 **Milestone slicing = transactional build units.** M0 prereqs/deps → M1 data → M2 shell/tokens/route-deletion → M3 scroll core → M4 hero → M5 work → M6 story → M7 close → M8 sweep. Each slice ends build-green (`npm run build` + `npx tsc --noEmit` exit 0); each is one revert unit; route deletion isolated inside M2 for single-revert restore.
- D-4.2 **Branch = `feat/cycle5-rebuild`, per-milestone commits, main untouched until Phase 7.** Rollback-forward per slice; no force operations.
- D-4.3 **Dependency discipline: exactly two new runtime deps** (gsap, lenis) pinned at install; no floating ranges; framer-motion held; lucide minor bump in the same M0 commit as the installs so `npm ls` receipts are single-sourced.
- D-4.4 **Framework-doc gate before code (AGENTS.md law).** Every milestone that touches Next behavior starts with a read of the relevant bundled `node_modules/next/dist/docs/` page; listed explicitly in M0 and re-noted in M2 (export matrix) and M8 (out/ structure checks).
- D-4.5 **Verification per milestone = the PRD acceptance criteria subset it traces** (trace table in PRP), executed as dev-server/build/browser checks at the milestone, and re-executed independently with evidence in Phase 6 (Playwright 3-viewport matrix, axe, contrast recomputation, journey runs). Milestone verifies are not claimed as Phase 6 substitutes.
- D-4.6 **Effort model.** Milestone sums 20.0h raw (mis-sum corrected at quality review) → PERT (15/20/30 → 20.8h) × 1.3 historical variance factor (cycle-4 actuals) → adjusted 24–30h; uncertainty concentrated in M4/M5 and bounded by slice reverts (G8).

## 3. Order rationale & dependencies

Strict chain M0→M1→M2: no motion code before deps exist; no section before tokens/scroll owner exist. M3 before M4–M7 (all motion consumers assert against the single scroll owner). M5 depends on M1 data shape + M3; M4 independent of M5 (parallel-capable for a specialist dispatch, kept serial under autopilot simplicity). M8 sweeps everything.

## 4. Simplicity & anti-overplanning

Rejected alternatives: parallel worktree fan-out per milestone (coordination cost exceeds serial time at this scope); Storybook/Wonderwall sandbox per §9.G (no shipped impact); adding `@gsap/react` (useLayoutEffect wrappers are 10 lines, ADR carry-over from Phase 3 §7); CMS/analytics (already rejected Phase 3, unchanged). Net plan artifact count: 1 plan + 3 reports — no placeholder tasks; every task names its file(s) or command.

## 5. Risks rolled from design + new planning risks

R-1…R-8 table in PRP (scroll interplay, mobile pin, export violations, numeral a11y law, whitelist drift, canvas rAF battery, route-removal trust, dep currency). New: G0-Build fingerprint blocker tracked as prerequisite, not skipped.

## 6. Self-check

Ordered milestones with dependencies, verification, and rollback: yes. Effort estimates with calibration basis: yes. Requirement→milestone trace 25/25 plus ADR/journey traces: yes (oracle re-run at checkpoint). Carry-in items from Phase 3 review placed in milestone text: yes. Threat model produced: `prime/reports/threat-model.md` (negative runtime surface + supply-chain/inline-script trust boundaries). Consistency: PRP numbers == ADR values == canvas values (2450ms ceiling, weights law, #45474D label floor; parallax ≤8 is the ADR-3.5 showcase-02 binding, stricter than the canvas's global decorative ≤15 ceiling — sources named per finding F12 residue). Self-check: PASSED — 2026-09-27.

## Skill Invocation Summary

| Skill | Classification | Status | Evidence |
|---|---|---|---|
| research | MANDATORY | APPLIED | npm view currency re-run 2026-09-27; prior online source chain reused with URLs + rationale in PRP; no invented sources |
| quality-review | MANDATORY | APPLIED | independent subagent dispatch → `prime/reports/phase-4-quality-review.md` (separate invocation; verdict recorded) |
| caveman | MANDATORY (core) | APPLIED | evidence-dense compressed planning prose; hexes/commands/URLs verbatim |
