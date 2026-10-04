# Retrospective — Cycle 5 (Full Rebuild of the Portfolio under PRIME Autopilot)

Run: `Portfolio-mujy1le3-fva1hv` · 2026-09-27→28 · seven guarded phases, one attempt each, zero phase re-entries.

## What went well

- Attempt-1 passes on every phase gate chain (1–6). The Phase-4 plan's milestone slicing (M1–M8, each revertible) made Build failure recovery cheap: the five P5 validate-fail events between 18:11–18:19 were contract-evidence corrections, not code regressions.
- Evidence chain held: four signed tool receipts with sequential nonces (playwright n22, axe n23, npm-audit n24, quality-review n25; n25 chained to n22 via prior_receipt_ref) and the fabrication detector returned CLEAN without needing prose surgery beyond one test-count reconciliation line.
- The fact whitelist ("unknown = not shown") + data-invariant unit tests caught invented-claim risk mechanically instead of socially — the single most valuable guardrail of the cycle.
- Independent review found real signal (QR-001 CSP annotation overclaim, QR-002 contrast incompletes) — the two-pass review with sidecar was not a rubber stamp.

## What went wrong

- Phase 6 verification consumed 404.7 wall-clock minutes (~58% of P1–P6), including one context compaction mid-phase. Autopilot verify rigor (57 gates, receipts, 3-viewport matrix) is the bottleneck by design, but the runner tooling drifted (engine 35.0.6 paths, obsolete nonce-backout workaround) and had to be rewritten mid-phase — pure setup waste.
- The engine's prose-regex consistency checker (detect-fabrication) compares Phase-5's sealed `tests_run: 2` against the first number-like phrase in Phase-6 reports; two HIGH findings came from wording, not data. Lesson: report prose should state cross-phase counts in an unambiguous first mention.
- The frozen Phase-7 dispatch contract predates the `document` → `doc-forge` skill rename, blocking Enter until re-frozen with `--force`. Next-run effective per the drift report; recorded in `prime/reports/phase-7-contract-drift.json`.

## Lessons

1. Refresh or delete stale project gate-runners when the PRIME engine minor version changes — 35.1.4 made the nonce-backout obsolete (verification is side-effect free).
2. Budget verification at ≥ build time in Autopilot mode (cycle-4 observation confirmed by cycle-5 actuals).
3. Keep per-phase test-count phrasing consistent across reports; make the first numeric mention of any cross-referenced count the exact value stored in the sealed JSON.
4. Diagram-honest framing for visuals (W28) and "no claims without a whitelist row" both scaled well — zero review findings in those classes.

## Estimate vs actual (feeds prime/evidence/estimation-calibration.json)

- Estimated (Phase-4 D-4.6): PERT 20.8 h × 1.3 historical variance factor → 24–30 h adjusted range.
- Actual (guard-events.jsonl enter→advance deltas, P1–P6): 700.8 min wall-clock ≈ 11.7 h. Variance vs midpoint (27 h): ≈ −57%.
- Caveat before treating that as bias: wall-clock spans two sessions with an overnight idle gap inside P6 and includes compaction recovery; the estimate targeted continuous working effort, which was never separately instrumented. Estimation bias conclusion is therefore "probable over-estimation, not proven" — next cycle should log active-time (e.g. phase heartbeat deltas) so estimated and actual measure the same quantity.

## Next cycle

- Publish (owner-authorized) then immediately run Lighthouse + live 404-status check (QR-003).
- Prune unused whitelist rows (QR-005) and revisit the build-year rule (QR-004).
- Re-record estimates in Phase 4 in the same units as guard-event deltas.
