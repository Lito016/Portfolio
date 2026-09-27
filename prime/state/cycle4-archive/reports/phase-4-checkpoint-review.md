# Phase 4 Checkpoint Review (G11) — plan defects found & corrected mid-phase

- artifact snapshot (2026-09-23, pre-correction): docs/PRP.md (M1–M5, traceability, calibration), prime/reports/phase-4-plan.md (decisions 1–7), prime/reports/threat-model.md. Reviewer: independent subagent cross-checking PRD/DESIGN/whitelist and real consumer files (featured-projects.tsx, projects-client.tsx).
- blockers found: 2 Major (blocking: 2), plus 4 minor/nit. All corrected before final review.

| # | sev | finding | correction applied |
|---|---|---|---|
| 1 | Major | M1 not build-green as written: empty `image/url` crash existing consumers before M2 | M1 step 6 added: defensive interim patch to both consumers (hide Image on '', no-anchor on '', key=slug) |
| 2 | Major | Whitelist had no coverage for case-study workflow/architecture node labels → fabrication grep unenforceable | W23 derivation rule added to fact-whitelist.md; M1 step 2 cites W23; M5 audit scope updated |
| 3 | Minor | `scripts/check-prereqs.mjs` misattributed as repo script | PRP prerequisites clarify plugin-script path per PRIME Phase 5 route |
| 4 | Minor | "dead-slug → 404" untestable under static export | M3 verify replaced with `out/404.html` + per-slug `index.html` count checks |
| 5 | Minor | Estimate skew (M1/M3 under, M5 over) + "PERT-mode" mislabel | M1/M3 → 4–5h, M5 → 1–2h; calibration rewritten as PERT mean 15.8h × 1.3 historical factor → 15–20h |
| 6 | Nit | Threat model rel/noopener + XSS bans lacked mechanical enforcement path | M5 item 2 now scripts the `_blank`/`rel` and `dangerouslySetInnerHTML` greps; threat-model row updated |

- traceability re-checked post-edit: REQ-1…23 all still mapped; whitelist ids referenced consistently.
- final independent verdict: phase-4-quality-review.md (separate invocation).
