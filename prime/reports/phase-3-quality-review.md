# Quality Review — Phase 3: Design (Portfolio Rebuild, Cycle 5)

Date: 2026-09-27
Reviewer: independent quality-review dispatch, separate invocation from Phase 3 owner
Scope reviewed: `docs/DESIGN.canvas.tsx`, `prime/reports/phase-3-design.md`, `prime/reports/phase-3-checkpoint-review.md`, `prime/reports/phase-3-parts-evidence.md`, `docs/PRD.md`, `prime/state/dispatch-contracts/phase-3.json`. Read-only checks only; no artifact edited except this file.

Summary: contract substantively satisfied — all four required artifacts exist with real content; 6 runnable gates independently re-run GATE-PASS; 25/25 REQ trace confirmed by oracle and manual AC sampling; 13/15 spot-computed contrast claims reproduce exactly. Findings: 1 Major (index-numeral contrast/ambiguity), 8 Minor, 3 Nit. No Critical. The Major plus two measurement-accuracy defects in an artifact whose core claim is "measured, not claimed" require cheap corrections before Phase 4 closes on this spec.

## Findings

| # | Location | Severity | Problem | Fix |
|---|---|---|---|---|
| 1 | docs/DESIGN.canvas.tsx:353, :428 (:170, :210) | Major | The rendered showcase index numeral uses `t.colors.muted` #E6EAF0 → recomputed 1.21:1 on the #FFFFFF frame surface (1.15:1 on canvas). FR-07 requires a visible index label per showcase and NFR-03 requires AA (large text ≥3:1). The canvas specifies a readable mono index label (labelLarge, :170) but the sample never shows it, and the oversized numeral is nowhere declared `aria-hidden`/decorative (unlike the spark dot, :210). Phase 5 copying the sample ships an AA failure + REQ-07 legibility hole; part-20 "no open questions" test fails. | Deterministically bind the treatment: numeral gets `aria-hidden`, index legibility carried by a labelLarge mono label (≥#45474D); state it in REQ-07/REQ-08 acceptanceCriterion and in ADR-3.5. |
| 2 | docs/DESIGN.canvas.tsx:113 | Minor | Inverse `mutedForeground #9AA0A6` claimed "5.94:1 (AA secondary)"; recomputed vs stated ground #121317 = **7.03:1**. 5.94 matches neither #121317 nor #23252B (5.80). Safe-side error, but falsifies the "ratios computed 2026-09-27, measured not claimed" authority. | Recompute all comment ratios with one script pass; correct value + ground. |
| 3 | docs/DESIGN.canvas.tsx:119 | Nit | Spark claimed "1.9:1 on canvas"; recomputed #FBBC04 on #F8F9FC = **1.62:1**. Conclusion (never text, never state) unchanged. | Correct the number. |
| 4 | docs/DESIGN.canvas.tsx:188, :494 | Minor | `heroSequenceTotal: 2400ms` vs stated stage durations bg400+nav150+lines700+visual900+meta300 = 2450ms if serial (the `->` chain implies serial); overlap semantics of "lines 700 stagger 120" vs "visual 900" undefined. FR-03 AC ≤2.5s holds either way; internal numbers do not. | Define the overlap or restate total as 2450ms (≤2.5s still satisfied). |
| 5 | phase-3-checkpoint-review.md:41 vs phase-3-design.md:68 | Minor | Checkpoint 5 records variant 02 parallax "yPercent ≤15"; ADR-3.5 binds it at ≤8 (canvas:196 ceiling is ≤15). Doc drift leaves Phase 5 free to pick the looser number for that showcase. | Align checkpoint text to ADR-3.5 (≤8). |
| 6 | phase-3-parts-evidence.md:3 vs phase-3-checkpoint-review.md:90-101 | Minor | Parts file says sources "read in full on 2026-09-30"; checkpoint 9 folds it in on 2026-09-27 — impossible ordering. Evidence-integrity wrinkle in a date-stamped audit chain. | Correct the date or annotate the typo. |
| 7 | docs/DESIGN.canvas.tsx:33 | Minor | `approvalSource` claims the quote was "audited against prime/state/project-charter.md"; the charter holds only a paraphrase (project-charter.md:28) — the verbatim string exists nowhere in the repo except the Phase-3 artifacts themselves. Substance is genuinely authorizing bespoke design (rebuild from scratch + explicit anti-copy mandate), so G13 intent holds; provenance wording overstates. | Reword to "owner first message (verbatim); aligned with charter §Brief paraphrase", or cite the actual session transcript. |
| 8 | phase-3-design.md:65, :32 | Minor | "SplitText is a Club/paid plugin (not licensed)" is outdated: GSAP 3.13 (2025-04-29) made all former Club plugins free including SplitText (gsap.com/blog/3-13/; css-tricks 2025-05-06). The decision itself (server-side pre-wrapped spans, zero runtime splitting) remains sound on the a11y/CLS grounds the same ADR gives. | Update the rationale wording; keep the decision. |
| 9 | docs/DESIGN.canvas.tsx:158 vs :323 | Minor | `displayWeightRule: "400 at >=64px, 500 below"` but the canvas's own hero sample h1 renders weight 500 at a clamp max of 6rem/96px. Spec sheet violates its own token rule. | Sample to 400, or document the exemption. |
| 10 | docs/DESIGN.canvas.tsx:282, :292, :293, :301 | Nit | REQ-02/12/13/N02 acceptanceCriterion strings truncate PRD clauses ("subtle hover animation" FR-02; "NO badge cloud" FR-12; location+tech FR-13; "evergreen browsers" NFR-02). Under-trace only — no overstated trace found in the 25/25 manual sample. | Pull the truncated clauses into Phase 4 instructions so nothing is lost downstream. |
| 11 | docs/DESIGN.canvas.tsx:405, :271 | Nit | Spec-sheet line "CYCLE 5 · PHASE 3 · …" carries 2 middle-dots (§9.F ≤1/line — canvas is the sheet, not shipped UI); FeaturedProject schema listing omits the `featured: true` discriminator (src/data/projects.ts:69-72). Representative, harmless. | Optional cleanup. |

## Verified numbers (reviewer-independent)

WCAG relative-luminance recomputation (16 pairs, script run 2026-09-27):
- MATCH: #121317/#F8F9FC 17.63 ✓ · #0B57D0/#F8F9FC 6.07 ✓ · #45474D/#F8F9FC 8.82 ✓ · #FFFFFF/#0B57D0 6.39 ✓ · #1A73E8/#F8F9FC 4.28 ✓ · #8AB4F8/#121317 8.81 ✓ · #A8C7FA/#121317 10.80 ✓ · #202124/#F8F9FC 15.29 ✓ · #3C4043/#F8F9FC 9.94 ✓ · #121317/#FFFFFF 18.56 ✓ · #F8F9FC/#121317 17.63 ✓ · #121317/#E8F0FE = 16.20 (claim ">=7:1" true) ✓
- MISMATCH: #9AA0A6/#121317 claim 5.94 → actual 7.03 (finding 2) · #FBBC04/#F8F9FC claim 1.90 → actual 1.62 (finding 3)
- NEW: #E6EAF0 ghost numeral = 1.21:1 on #FFFFFF, 1.15:1 on #F8F9FC (finding 1)

Gate re-runs (plugin gate-check.mjs, read-only, from C:/Projects/Portfolio): G1 pattern PASS · G6 pattern PASS · G7 pattern PASS (G7 was absent from the owner-verified list; it passes) · G8 traceability PASS "traces all 25 requirements" · G9 citations PASS (9 unique URLs) · G13 base-system PASS (custom_approval recorded). `npx tsc --noEmit` exit 0 confirmed. G4 is satisfied by this file's final line.

Repo/source fact-checks: `src/app/globals.css:340` contains `scroll-behavior: smooth` — ADR-3.1's exact-line claim verified. Bundled `node_modules/next/dist/docs/.../version-16.md` lines 963-973 confirm Next 16 no longer overrides `scroll-behavior` and the `data-scroll-behavior="smooth"` opt-in — ADR-3.1 wording accurate. `src/app/layout.tsx:2` already imports Geist/Geist_Mono via `next/font/google` — "existing self-host pattern" verified. Exactly 19 secondary route dirs under `src/app` — "delete 19" count accurate (22 page.tsx incl. 2 dynamic children; PRD "20-route" counts dirs, Nit-level). `gsap`/`lenis` absent from package.json — "adds exactly 2 deps" consistent; `lucide-react` installed at 1.23.0 — ADR-3.8 base version verified; `framer-motion ^12.42.2` — "stays" verified. `next.config.ts` `output:'export'` (prod) — static-export constraint preserved. Em-dash grep: 0 in canvas (preflight zeroEmDash honest for the shipped-facing artifact); internal reports use em dashes in prose only — allowed (§9.G binds user-visible strings).
UNVERIFIED-by-me: live antigravity.google fetch evidence and bundlephobia byte figures (accepted on Phase-1 citation chain, not re-fetched); lucide-react 1.48.0 registry availability (PRD pre-allowed; install-time check is Phase 5).

Skill invocation verification: frontend MANDATORY APPLIED (canvas embodies §14 preflight, measured tokens, parts rules cited by section, behaviorStates, motion budgets from the 45-row standard) · quality-review MANDATORY APPLIED (this separate dispatch) · research MANDATORY APPLIED (9-URL citation set re-run) · caveman MANDATORY APPLIED (evidence-dense artifact prose) · backend MANDATORY APPLIED (§5 routing-table negative-surface analysis present). No mandatory skill missing or unevidenced.

## Dimension verdicts (Phase 3 design protocol: Pass 1 correctness, Pass 2 security/threat, Pass 3 performance, Pass 4 adversarial/failure modes; converge cycle 1)

1. Contract compliance — PASS. All 4 required artifacts exist with substance; 6 runnable gates re-passed independently; hybrid gates G3/G5/G10/G11/G12/G13 follow-up items independently spot-verified (§5 simplicity bounded — 2 deps, rejected three/r3f with numbers; bespoke approval genuine in substance but see finding 7).
2. Traceability — PASS. 25/25 by oracle; 25 AC strings manually compared to PRD wording; zero orphaned ids, zero overstated traces; four truncated AC strings are Nit-level (finding 10).
3. Internal consistency — REQUEST-CHANGES-LEVEL DRIFT, non-blocking. Token hexes, pin counts (1 GSAP + 1 CSS sticky across canvas/ADR-3.5/checkpoint), palette parity, breakpoint bands all consistent; weight rule consistent post-checkpoint-9 except the canvas's own sample (finding 9); 2 contrast-claim errors + 1 hero-sequence arithmetic + 1 parallax-number drift + 1 date anomaly (findings 2-6).
4. Design quality vs loaded references — PASS. §14 spirit materially present (dials reasoned from brief text, anti-defaults audit, selector override log with rule citations, behavior states, numeric motion budgets, G13 escape fully documented), not generic description. Four user-instruction overrides are coherently bounded (indicator aria-hidden ≤2 loops; numeral display-scale — legibility hole is finding 1; lucide one-family one-stroke; spark dot-only non-state).
5. Phase 5 / G32 risk — LOW-MODERATE. ADR-3.1 scroll-conflict facts verified against the bundled Next 16 doc and the exact globals.css line; static-export and CI-parity claims verified in-repo; G32 parity (globals.css must carry the verbatim quote + min-width band queries) explicitly recorded at canvas:37 — Phase 5 must copy finding-7's exact string. Remaining rework risks into Phase 6: finding 1 (contrast gate) and finding 4 (hero timing).

Passes run: P1 architectural correctness (requirement→component tracing, boundaries, data flow — sound; finding 4 timing gap); P2 security/threat — no live attack surface (no input, no endpoints, static export; rel=noopener and mailto-from-config designed); P3 performance — bundle/LCP/CLS strategy evidence-backed, verified absent-heavy-deps claims; P4 adversarial/failure modes — no-JS/reduced-motion/empty-data states specced (behaviorStates), coarse-pointer pin hole covered. Cross-cutting: fact-check pass (SplitText claim outdated — finding 8; UNVERIFIED list above) and skill-invocation pass (table above). Converge: cycle 1 of max 2 — findings are cheap corrections to Phase 3 artifacts, none cascade into redesign.

Confidence: High overall (all claims above recomputed or re-run; two external items unverified as listed). Assumption: charter paraphrase is a faithful condensation of the owner's first message; the verbatim quote's wording itself could not be corroborated from a repo file outside Phase-3 artifacts.

verdict: request changes

## Re-verification pass 2 (owner remediation review)

Date: 2026-09-27 · Reviewer: independent quality-review dispatch (separate invocation from pass 1 and from the owner) · Inputs: checkpoint 10 claims in `prime/reports/phase-3-checkpoint-review.md` verified against CURRENT `docs/DESIGN.canvas.tsx`, `prime/reports/phase-3-design.md`, `prime/reports/phase-3-checkpoint-review.md`, `prime/reports/phase-3-parts-evidence.md`, `docs/PRD.md`. Read-only; no artifact edited except this appended section.

Per-finding evidence:
1. (Major) Closed. Sample now shows `aria-hidden="true"` ghost numeral + visible mono label (`docs/DESIGN.canvas.tsx:430-431`; `.dc-index` comment :353; `.dc-index-label` :354 at #45474D). Law bound deterministically: REQ-07 acceptanceCriterion (:287), REQ-08 "never sole information carrier" (:288), ADR-3.5 numeral law (`phase-3-design.md:68`, all four variants, ≥#45474D). Recomputed #45474D: 8.82 on #F8F9FC, 9.29 on #FFFFFF — both new claims exact; numeral 1.21/1.15 confirmed aria-hidden decorative only.
2. Closed. :113 token comment now "7.03:1 on #121317"; `accessibility.contrast.inverse` "secondary 7.03" (:208). Recomputed #9AA0A6/#121317 = 7.03 exactly.
3. Closed. :119 now "1.62:1 on canvas"; recomputed 1.62; conclusion (never text/state) unchanged.
4. Closed. `heroSequenceTotal` restated "2450ms serial ceiling … stages may overlap, wall time <=2450ms, inside FR-03 <=2.5s" (:188); motion table row synced (:498). 400+150+700+900+300 = 2450 arithmetic verified; PRD FR-03 (docs/PRD.md:49 "~≤2.5s total") holds.
5. Closed. Checkpoint 5 (checkpoint-review:41) now "yPercent ≤8 per ADR-3.5; canvas global ceiling ≤15, decorative layers only" — matches ADR-3.5 (≤8) and canvas budgets (:196 ≤15 ceiling).
6. Closed. `phase-3-parts-evidence.md:3` now "read in full on 2026-09-27 (agent draft printed '2026-09-30'; corrected at quality-review finding 6)" — annotated, ordering coherent with checkpoint 9.
7. Closed. `approvalSource` (:33) reworded: charter carries the §brief paraphrase; verbatim preserved in the Phase-3 artifacts themselves — no longer claims charter audit of the verbatim string.
8. Closed. ADR-3.2 (phase-3-design.md:65) now states GSAP 3.13 (April 2025) made SplitText free (https://gsap.com/blog/3-13/) and rejects runtime splitting on a11y/CLS grounds — decision kept on sound basis; benchmark row (:32) synced ("see ADR-3.2 corrected rationale").
9. Closed. `.dc-hero h1` font-weight 400 with rule citation (:323); clamp max 6rem/96px ≥64px → 400 per displayWeightRule. Inverse sample h3 (:359) 400 at 64px max also conforms.

New-contradiction spot-checks: (a) aria-hidden-numeral law vs antiDefaults(b) display-scale compositional override — coherent (numeral stays compositional+decorative; legibility moves to the co-located label); FR-07's "index label" is carried by the label. (b) reduced-motion opacity floor ("opacity-only fades ≤200ms may remain, nothing translates/scales/pins/loops/scrubs", :197/:501) vs FR-18 AC "zero continuous animations" (PRD:64) — consistent: ≤200ms finite fades are not continuous; REQ-18 AC text unchanged in clause. (c) 2450ms restatement introduces no FR-03 conflict. Nit-level residue (non-blocking, no action required): sample `.dc-index-label` renders 11px vs the 12px labelLarge token it cites; sample hero's ghost "." span (:411, #E6EAF0, 1.15:1) is a decorative sheet mark not itself declared aria-hidden — spec-sheet surface only, outside the shipped-UI law's scope.

Re-runs: `npx tsc --noEmit` exit 0. `gate-check.mjs traceability docs/PRD.md docs/DESIGN.canvas.tsx` → GATE-PASS "traces all 25 requirements". G4 exact contract command `pattern prime/reports/phase-3-quality-review.md "verdict:\s*(pass|block|request changes)"` → GATE-PASS. Spot contrast recomputation (node, WCAG relative luminance): 9/9 pairs match current claims, including the three corrected ones (7.03, 1.62, 8.82/9.29) and the 1.21/1.15 ghost tones.

| # | Severity | Status |
|---|---|---|
| 1 | Major | closed |
| 2 | Minor | closed |
| 3 | Nit | closed |
| 4 | Minor | closed |
| 5 | Minor | closed |
| 6 | Minor | closed |
| 7 | Minor | closed |
| 8 | Minor | closed |
| 9 | Minor | closed |

Findings 10-11 (Nit) remain as recorded in pass 1: 10 carried to Phase 4 by checkpoint 10 (correct disposition); 11 optional, unchanged. No Critical/Major/Minor open. Converged at cycle 2 of max 2. Confidence: High — every remediation claim independently re-verified against current file state and recomputed numerics; not re-fetched: gsap.com/blog/3-13 (pass-1 finding 8 evidence accepted).

verdict: pass
