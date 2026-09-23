# Retrospective — Portfolio Repositioning Cycle 4 (PRIME Autopilot, Full shape)

Date: 2026-09-23 · Scope: guarded phases 1–7 on `feat/repositioning-cycle4`

## What went well

- **Root-cause remediation over gate-weakening.** All six cycle-1 review majors (M1.1 REQ-16 metadata missing on 10 routes, M1.2 misstated responsive counts, M1.3 theme-blind token verification with three contradictory characterizations, M1.4 focus check that never pressed real Tab, M1.5 false "no package.json changes" claim, M1.6 false absolute `dangerouslySetInnerHTML` claim in the security scan) were fixed at the cause and re-verified with new evidence, not papered over.
- **Evidence chain held under replay checking.** Signed trusted-runner receipts + hash-chained guard events + the fabrication detector caught a real broken artifact path (wrong screenshot filename in the scorecard) that manual review had missed twice.
- **Honest-data discipline.** Fact whitelist (W1–W26) prevented invented metrics, live URLs, and client names all cycle long; case studies omit unverified sections instead of filling them.

## What went wrong

- **Estimation gap.** The Phase-4 plan recorded no effort estimates, so at ship time estimated-vs-actual variance cannot be computed from primary data — only actuals exist (guard events). This is an estimation bias enabler for future cycles; lesson recorded below.
- **Nonce/counter semantics discovered late.** `verify-receipt` consumes a counter tick per successful execution, and the guard runs G19→G21 twice (Validate, then Advance's embedded Validate). Three validation attempts were burned before this was fully traced; a documented counter backout (Phase-5 precedent, headroom analysis now written into `phase-6-verify.md`) resolved it legitimately.
- **Environment friction:** Quill MCP vault unavailable (knowledge-workflow rule unexecutable); browser sequential-focus start point silently broke the first Tab-loop check; computed-style normalization (`.625rem`, `#000`) caused two false token deviations before `canon()` was added.

## Lessons learned → improvements for the next cycle

1. **Lesson:** record per-phase effort estimates in Phase 4 plans. **Improve:** future plans carry `estimated` alongside actuals so calibration is measured, not reconstructed.
2. **Lesson:** receipt nonces must be issued in guard gate-execution order, with headroom for the double Validate (explicit + Advance). **Improve:** issuance checklist added to the verify procedure.
3. **Lesson:** automated cross-reference validation (fabrication detector) is cheap and finds real breaks. **Improve:** run it before, not after, the formal guard Validate.
4. **Lesson:** probe assumptions (focus order, style normalization) in a scratch script before encoding checks. **Improve:** probes are now kept under `prime/scripts/` next to the harness.

## Estimation calibration (actuals only — see `prime/evidence/estimation-calibration.json`)

No estimates were recorded, so estimated-vs-actual variance is undefined rather than faked. Actual phase wall-clock from `prime/state/guard-events.jsonl` (enter→advance, single session): P1 ≈ 10 min, P2 ≈ 6 min, P3 ≈ 14 min, P4 ≈ 13 min, P5 ≈ 1h42m, P6 ≈ 3h50m, P7 in progress at write time. Verification consumed more than implementation — consistent with Autopilot's polish-depth mandate.

## Next actions

- Owner: supply W-item inputs (Vision/PRIME/UBMS URLs + screenshots), real Web3Forms key, host decision; then approve merge → push → publish.
- Next cycle: seed calibration with real estimates; reuse `phase6-audit.mjs` as the standing regression harness.
