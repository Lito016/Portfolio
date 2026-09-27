# Phase 4 — Plan Report (Cycle 4)

Owner role: `prime-instruct` (planning procedure in main agent; independent plan review by separate subagent). Output: `docs/PRP.md` (M1–M5, traces, estimates, calibration), `prime/reports/threat-model.md`.

## Methodology Checklist
- [x] Recall of prior knowledge / sources — cycle-3 archived execution plan reviewed: milestone sizing by slice was effective (verification-report-cycle2/3 evidence); reused slice-per-milestone structure and its actual durations for calibration.
- [x] Research sources reverified for planning constraints — Next.js static-export requirement (https://nextjs.org/docs/app/guides/static-exports mirror of bundled docs), metadata server-only rule (https://nextjs.org/docs/app/getting-started/updating-metadata), menu structure pattern (https://www.w3.org/WAI/tutorials/menus/structure/).
- [x] Dependency order validated against design (data → components → routes → content → polish).
- [x] Verification points per milestone (build/tsc/grep/browser) per G6.
- [x] Effort estimates + historical calibration (1.3× variance factor from cycle 2/3 actuals) per G8.
- [x] Threat model produced (trust boundaries, attack surfaces, adversary capabilities) — content-only static posture, ASVS L1.
- [x] Independent plan review + corrections (see phase-4-checkpoint-review.md).
- [x] Traceability REQ-1…23 and D1–D7 → milestones (G12 machine-check + manual pass).

## Specification Decisions
1. Slice = commit unit = verification unit (each milestone independently build-green; revert-forward safe).
2. Content authoring precedes component work (M1) so components render real data during their own verification — catches schema-feasibility defects one milestone earlier than classic "components-then-data".
3. Hero CTA edit folded into M2 (component milestone) not M4 (copy milestone) because it changes JSX structure, matching file-ownership boundaries.
4. Grep ban-list (M4) formalized from Phase-1 pain phrases — verification-as-spec, deterministic.
5. Browser checks during Build limited to smoke spot-checks; full viewport matrix + screenshots deferred to Phase 6 to avoid double work (Phase 6 also owns quality-review independence).
6. Rollback: feature branch `feat/repositioning-cycle4`, per-milestone commits (Tier A per Autopilot protocol).
7. Non-blocking scope freeze: secondary routes get metadata wrappers only where trivial; no redesign, no deletion — owner-decision items collected for Ship report instead.

## Risks Carried into Build
- UMS/3-new-flagship enrichment remains an owner input; plan never blocks on it (text-first variants specified).
- `HostedProject` union migration touches all consumers — tsc gate at M1 is the catch-all.
