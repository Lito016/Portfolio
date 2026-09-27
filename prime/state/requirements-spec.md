# Requirements Spec — Cycle 5 (mirror of docs/PRD.md, prime-requirement runtime format)

Authoritative text: `docs/PRD.md`. This file records derivation and decisions only.

## Derivation map (strategy: attempt 1 — from Phase 1 pain points + charter success criteria)
- PP1 → FR-01,03,04,07,09,11,12,14 (anti-template composition)
- PP2 → FR-01, FR-19, PRD §2.1 (single page; route removal decision)
- PP3 → FR-07..10, FR-16 (editorial showcases, varied composition, data-driven)
- PP4 → FR-17 + per-FR copy rules (whitelist W1–W28; "unknown = not shown")
- S4/S5/S6 (charter) → FR-18, NFR-01..06, J4/J5

## Requirement decisions
| # | Decision | Rationale | Alternatives |
|---|---|---|---|
| D1 | Remove 19 secondary routes; fold skills/experience/education/now into single page | Owner: rebuild "from scratch"; cinematic arc impossible with multi-route | Keep routes as hidden pages — rejected: dead weight, sitemap confusion |
| D2 | Contact = direct links (mailto/LinkedIn/GitHub), web3forms form dropped | Brief lists Email/LinkedIn/GitHub only; fewer JS + external deps | Keep form — rejected: not requested, adds api endpoint surface |
| D3 | GitHub live-stats widgets dropped | Brief wants no dashboards; W20 permitted live values but not required | Keep — rejected vs. performance/simplicity mandate |
| D4 | Secondary projects (3) as compact supporting row in Work | Brief "01 — 04" featured focus; data must not vanish | Drop — rejected: loses portfolio breadth; owner may renumber later |
| D5 | Headline/microcopy: original generic statements only, zero professional claims | FR-17; whitelist derivation rule | Reuse old hero copy — acceptable too; prefer fresh per brief tone |
| D6 | Vision auditor visual presented with diagram-honest framing | W28 forbids screenshot implication | Re-generate abstract visual — Phase 3 option |

## Completeness self-check
- Functional requirements: 19 (≥3 ✓), each with GIVEN/WHEN/THEN criterion ✓
- NFRs: 6 with measurable targets (≥2 ✓)
- Critical journeys: 5 (J1–J5), 4 critical + 1 high; machine-readable `prime/state/critical-journeys.json` + PRD §Critical Journeys ✓
- Personas from charter: all mapped in PRD §1.2 ✓
- Pain-point→requirement traceability: 4/4 covered ✓
- Consistency: FR IDs referenced in PRD §6 = PRD §3 table ✓
Self-check: PASSED — 2026-09-27T21:5x local.
