# Phase 2 Quality Review
- reviewer: independent subagent (quality-review)
- date: 2026-09-23

## Coverage Matrix
- P1 (junior education blurb) — R2
- P2 (school timeline) — R2, R15
- P3 (role inconsistency) — R1
- P4 (hero CTAs/value line) — R3, R4
- P5 (no "What I Build") — R5
- P6 (missing flagships, flat data) — R6, R7
- P7 (positional slice) — R6, R8
- P8 (dead caseStudy data) — R8, R9, R10
- P9 (no diagrams) — R12
- P10 (skills domains) — R13
- P11 (data inconsistencies) — dates: R2; "Bayanaihan" org-name conflict: MISSING
- P12 (metadata/sitemap) — R16, R17
- P13 (route sprawl) — no R#; deferred to Design as open question (acceptable, document decision)
- P14 (metrics discipline) — R11
Owner phases (positioning/homepage/skills/curation/cards/case studies/resume/about/diagrams/credibility/visual/mobile/perf-SEO) all mapped; only P11-half and P13 lack explicit R#.

## Issues
1. **Major** — P11's "Bayanaihan Network Inc." vs `bayanihan-intern` inconsistency has no acceptance criterion anywhere; add a Must requiring experience/certification names to match one source of truth.
2. **Major** — R11 whitelist scope is case studies only; metrics/links can also appear in cards (R9), "What I Build" (R5), and resume (R14) without whitelist coverage. Extend to all site-visible numbers/URLs. Also `fact-whitelist.md` does not yet exist (Design dependency) — R11 is unenforceable until authored; record as prerequisite.
3. **Major** — NFR "Lighthouse a11y/SEO ≥ prior baseline" is unverifiable; no numeric baseline exists (cycle-3 baseline is browser pass rate). Define measurable target or drop.
4. **Minor** — Featured count: R12 fixes "5 diagrams" while charter/success metrics allow 5–6 (conditional UMS, R7); reconcile count language.
5. **Minor** — R3 "exactly three CTAs" vs charter SC5 "≤3 CTAs"; align.
6. **Minor** — R17 "consciously excluded" and R4 "reviewer can answer from hero alone" are human-judgment criteria; acceptable but mark as reviewer sign-off checks.
7. **Nit** — PRD traceability maps R10–R12 to P8–P9 only; R11's source is P14 — fix mapping.
8. **Nit** — Canonical URL (assumption A4) is carried but no R#/AC verifies it in metadata.

Anti-fabrication: R7/R10/R11 discipline is structurally sound (whitelist, omit-not-fill, no-fake-screenshots); no requirement invites invention.

## Verdict
verdict: request changes
+ Solid coverage; fix P11 gap, whitelist scope, and the unmeasurable Lighthouse target before Design.

## Re-review (post-fix)
- Issue 1 (P11 org-name, Major) — **resolved**. R22: "the 'Bayanaihan' vs 'bayanihan-intern' spelling conflict must be resolved to one form (owner confirmation required; default `Bayanihan`)"; AC requires byte-identical names from one constant. Traceability row "R22 | P11"; risk row added.
- Issue 2 (whitelist scope, Major) — **resolved**. R11 now covers "all site-visible numbers, URLs, and project claims — case studies, project cards, 'What I Build', hero stats, resume, about". Prerequisite recorded: "created in Design".
- Issue 3 (route-sprawl R#, Minor/P13) — **resolved**. R23 fixes nav structure with AC; traceability "R23 | P13"; risk row retained for Design revisit.
- Issue 4 (Lighthouse NFR, Major) — **resolved**. NFR now numeric: "Accessibility ≥ 90, SEO ≥ 90, Best Practices ≥ 90; Performance score recorded as observation against current baseline".

Minor items 4–8 (featured count, ≤3 CTAs, judgment criteria, R11 traceability mapping, canonical URL) were not part of the fix scope and remain open as non-blocking.

verdict: pass
