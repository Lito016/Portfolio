# Phase 3 Checkpoint Review (G7) — mid-phase findings & corrections

- artifact snapshot (at checkpoint, 2026-09-23): docs/DESIGN.canvas.tsx (schema §2, components §3, routes §4, tokens §5, REQ trace §6), prime/state/fact-whitelist.md (W1–W22), prime/reports/phase-3-design.md (D1–D7, benchmark record). Reviewer: independent subagent, repo spot-checks included.
- blockers found: 3 Major, 3 Minor, 2 Nit — listed with corrections applied before finalization.

| # | sev | finding | correction applied |
|---|---|---|---|
| 1 | Major | D3 claimed compile-time "featured requires caseStudy" but `caseStudy?` could not express it | DESIGN §2 rewritten as discriminated union (`FeaturedProject`/`OtherProject`/`HostedProjectBase`); D3 rationale updated |
| 2 | Major | `url:''`/`image:''` unhandled in card spec → empty `<Image>` src breaks prerender; duplicate React keys; dead anchors | ProjectCardProps doc now mandates key=slug, image-less card variant, no anchor wrap when unlinked |
| 3 | Major | REQ-10 "screenshots" plural vs single `image` field | `CaseStudy.screenshots?: string[]` added, whitelist-gated; empty → text-first layout |
| 4 | Minor | WhatIBuild anchors had no target on /projects | §3 defines `id="cat-<category>"` subgroups within Featured section |
| 5 | Minor | FlowDiagram cannot express true fan-out edges | documented v1 limitation "inter-lane sequential arrows only" in §2/§3 comments |
| 6 | Minor | required prose fields (users/features/challenges/decisions) tempt filler for thin-fact UMS | fields made optional; §2 comment + open item handed to Plan (per-flagship fact checklist) |
| 7 | Nit | "Redis?" in canonical names contradicts W22 | removed |
| 8 | Nit | docs/*.tsx is type-checked by tsconfig include | header NOTE added to DESIGN.canvas.tsx |

- reviewer verification pass post-correction: see phase-3-quality-review.md (separate invocation).
- no blocker remains at phase exit.
