# Phase 4 — Independent Quality Review (Plan, Cycle 5)

Reviewer: prime-quality-reviewer (did not author these artifacts). Date: 2026-09-27. Mode: adversarial, verified by execution where cheap.
Inputs read in full: `docs/PRP.md`, `prime/reports/phase-4-plan.md`, `prime/reports/phase-4-checkpoint-review.md`, `prime/reports/threat-model.md`, `docs/PRD.md`, `prime/state/dispatch-contracts/phase-4.json`; parity spot-checks against `docs/DESIGN.canvas.tsx`, `prime/reports/phase-3-design.md`, `package.json`, `next.config.ts`, `wrangler.toml`, `.github/workflows/ci.yml`, `public/_headers`, `src/` tree, git state.
Executed read-only: G12 `traceability` → GATE-PASS 25/25; G13 `citations docs/PRP.md 2` → GATE-PASS 6 URLs; G11 pattern → GATE-PASS. `git branch -a` / `git worktree list` / `git status`: single worktree on `main` (0555d72), `feat/cycle5-rebuild` does not exist, phase-4 artifacts dirty/untracked on main. Version probes: framer-motion 12.42.2 and lucide-react 1.23.0 installed as claimed; gsap/lenis absent (correct pre-M0). Sink greps: `dangerouslySetInnerHTML` exactly at `src/app/layout.tsx:79,90` (theme flash + JSON-LD) as modeled; no `innerHTML`/`eval(` anywhere in `src/`; `new URL` only at `layout.tsx:23` (build-time metadataBase, static config). Route count: exactly 19 secondary dirs under `src/app` as PRP claims; `globals.css:340` `scroll-behavior: smooth` confirmed; `public/project-inventory*` provides the 4 screenshots M5 variant-04 needs; `_headers` CSP inspected (see F4).

Gate note: G12 keys on REQ-* literals, so every finding below in the coverage family (F1–F3, F11) is invisible to the runnable gates — the 25/25 pass is real but weak evidence of semantic fidelity.

## Findings

| ID | path:line | Severity | Problem | Fix |
|---|---|---|---|---|
| F1 | docs/PRP.md:34 vs docs/PRD.md:57,97 | Major | M1 drops `now.ts` from the render surface as "not in cycle-5 PRD scope"; PRD FR-11 explicitly requires "current focus (nowData verbatim)" in About, and PRD Assumptions line 97 keeps exactly that line. M6 (PRP.md:63–64) has no current-focus task. REQ-11 acceptance behavior is planned out of existence; checkpoint 4 "nothing is lost downstream" fails on this clause. | M1: keep `now.ts` for the one current-focus string; M6: add "current focus line, verbatim from now.ts (W-id cited)". |
| F2 | docs/PRP.md:38,67,83 vs docs/PRD.md:61–65 | Major | REQ-identity slip: M2 header labels "REQ-16 (footer)" but PRD FR-15 is Footer and FR-16 is data decoupling ("5th entry renders without component changes; no hardcoded project names in components"). PRD REQ-16 is traced to M2,M7 whose tasks never deliver or verify it (actual home is M1/M5). REQ-19 (route cleanup/sitemap — delivered in M2) is traced to M1,M8. Literal-trace gate passes; semantics mislabel. | Relabel milestone→REQ ids per PRD; add an M5 decoupling verify: append a mock 5th featured entry, render count = 5, revert. |
| F3 | docs/PRD.md:69 vs docs/PRP.md:83 (REQ-N01: M2,M3) | Major | NFR-01 clause "Lazy-load below-fold images (`loading=\"lazy"`)" appears nowhere in PRP; the milestone that renders showcase images (M5) is not in the REQ-N01 trace. A fresh implementer following PRP omits it. | Add `loading="lazy"` (except first-viewport) to M5/M7 image tasks; extend REQ-N01 trace with M5. |
| F4 | prime/reports/threat-model.md:23–24,35,47 + public/_headers:2 | Major | Negative-surface model missed a shipped security artifact: `public/_headers` CSP grants `connect-src https://api.github.com https://api.web3forms.com` and `img-src https://avatars.githubusercontent.com` — third-party endpoints the plan itself kills (widgets, web3forms). Also `script-src 'unsafe-inline'` was justified by the theme-flash script deleted in M2 (JSON-LD still needs it, but rationale stale). No PRP milestone touches `_headers`; M8 invariant greps cover code, not header policy. Stale allowances shrink nothing and mis-state the model. | Add M2 task: tighten `_headers` connect-src/img-src to post-rebuild reality; add `_headers` row to threat-model §3 and an M8 check. |
| F5 | docs/PRP.md:29 vs docs/PRP.md:24, phase-4-plan.md:15 | Minor | `npm i gsap@3.15.0 lenis@1.3.26 && npm i lucide-react@1.48.0` uses npm default save-prefix `^`, writing floating ranges that contradict D-4.3 "pinned at install; no floating ranges added" and R-8. Existing package.json (15–16) shows caret is this repo's default. | M0: `npm i --save-exact gsap@3.15.0 lenis@1.3.26` (and lucide), or accept contradiction in writing. |
| F6 | docs/PRP.md:77,80; phase-4-plan.md:18 | Minor | Arithmetic error: milestone estimates sum to 20.0h (0.5+2+3+2+3+4+2+1.5+2), PRP states "raw ≈18.5h" and PERT uses m=18.5 → 19.3h. With m=20: PERT 20.3h, ×1.3 → 26.4h, i.e. the stated 20–26h band is built on a wrong sum. Checkpoint 5 "internal number parity" missed its own document. | Restate raw=20h; recompute PERT/adjusted band (e.g. 21–27h) or justify the 18.5. |
| F7 | prime/reports/threat-model.md:35; next.config.ts:11; src/components/sections/hero.tsx:12 | Minor | Invariant "zero env values referenced; nothing read via process.env in shipped code (static export forbids it)" is false as phrased: `next.config.ts` inlines `NEXT_PUBLIC_BASE_PATH` into the client bundle and current hero/footer read `process.env.NEXT_PUBLIC_BASE_PATH`. Static export forbids server-only env, not `NEXT_PUBLIC_` inlining. Harm is low (value is `''`), but the model overstates. | Reword invariant to "no server env; NEXT_PUBLIC_BASE_PATH inlined as empty"; drop the `env` block in M2 shell rewrite if unused by new code. |
| F8 | docs/PRP.md:38–43; package.json:12–24; threat-model.md:51 | Minor | No garbage-collection decision: after M2 deletes all 19 routes, next-themes / react-hook-form / zod / @hookform/resolvers / @tanstack/react-query / react-icons become importerless yet stay installed (CI `npm ci` still executes their lifecycle code — the model's own TB2 surface), and invariant 5 ("lockfile diff = gsap + lenis + lucide, nothing else") *forbids* the cleanup. Same for orphaned `src/data/` files (blog.ts, achievements.ts, certifications.ts, team.ts, uses.ts) — M1 only handles testimonials/now. | Decide keep-vs-drop in M2/M8 with an explicit carve-out to invariant 5; add the orphan data files to M1's zero-importer deletion rule. |
| F9 | docs/PRP.md:19 vs docs/PRP.md:36,47,53,60,65,69 | Minor | R-3 mitigation promises "prod build with `output:'export'` run at every milestone" but only M0/M2/M8 Verify lines include `npm run build`; M1, M3–M7 verifies are tsc/dev-smoke/grep — export violations (R-3, Critical impact) could sit until M8. | Add `npm run build` to each milestone Verify line or amend R-3 honestly. |
| F10 | docs/PRP.md:88–89; phase-4-plan.md:14 | Minor | Rollback plan mandates branch `feat/cycle5-rebuild`, but no M0 task creates it; verified absent (`git branch -a`: only `main` + cycle-4 remotes), and phase-4 artifacts currently dirty on `main`. Also note `.github/workflows/ci.yml` triggers deploy on any `push to main` — "no deployment in Phase 5–6" (A-P3) holds only because main is not pushed, which the plan should state as the mechanism. | M0 step 0: `git checkout -b feat/cycle5-rebuild`; commit phase-4 artifacts there; add one line tying A-P3 to the CI push trigger. |
| F11 | docs/PRP.md:12,59,63 | Minor | Carry-in mapping is incoherent: line 12 lists four clauses against three milestones ("M4/M6/M2 respectively"), leaving REQ-N02's M8 binding implicit and an unused M4 slot; FR-12 "NO badge cloud" (a Skills/FR-12 constraint) is quoted at M5 project-tech rendering while M6 Skills text never repeats it; M6 calls "location + tech" a FR-13 carry-in but places it in About (location+education is FR-11; FR-13 is the Experience entry line). Checkpoint 4's "closed" verdict rests on this fuzzy wiring. | Explicit clause→milestone table; move badge-cloud constraint to M6 wording; fix FR-11/FR-13 attribution in M6. |
| F12 | docs/PRP.md:56; prime/reports/phase-4-checkpoint-review.md:41; docs/DESIGN.canvas.tsx:196 | Nit | Checkpoint 5 claims PRP "parallax ≤8 … all match source artifacts": canvas global budget is yPercent ≤15; ≤8 is ADR-3.5's variant-02 value only. PRP itself is safe (stricter), the parity claim is sloppy. | Cite ADR-3.5 as the ≤8 source, not canvas parity. |
| F13 | docs/PRP.md:43,53; phase-4-plan.md:26 | Nit | "grep dark/theme = 0 in shell files" — the file set "shell files" is undefined; M4 verify "t+3s full-page screenshot" names no tool while Playwright is reserved to Phase 6 (PRP.md:77), contradicting "every task names its file(s) or command". | Enumerate the grepped files; give M4 a build-phase screenshot command (e.g. `npx playwright screenshot`) or manual-check wording. |
| F14 | docs/PRD.md:48 vs docs/PRP.md:41–43 | Nit | FR-02 keyboard AC (nav focus ring) absent from M2 header task and verify, despite D-4.5 "verification = PRD acceptance-criteria subset". | Add focus-ring check to M2 verify. |

## Dimension verdicts

1. **Executability — Conditional.** Chain M0→M8 is ordered, file-targeted, mostly command-bearing; a fresh implementer can run it — except the invented decisions the review surfaced (branch creation F10, save-exact F5, build-per-milestone F9, screenshot tooling F13). Fix before Phase 5.
2. **Requirement coverage — Fail.** G12 25/25 literal pass re-verified, but semantics drift: FR-11 nowData clause actively deleted (F1), FR-16 untraced-in-substance (F2), NFR-01 lazy-load clause absent from the whole plan (F3). REQ-03/REQ-09/REQ-18/REQ-N06 verified faithful (2450ms ceiling + server-HTML check; variant diversity + W28 diagram label; reduced-motion gates/verifies; export/wrangler/CI parity re-confirmed against wrangler.toml + ci.yml).
3. **Design parity — Pass (with nit).** Hero 2450ms serial staging numbers == canvas:188/499; numeral aria-hidden law + #45474D mono label == canvas:287/353/ADR-3.5; G32 quote + compact/medium/expanded bands == canvas:37,41–43; pins budget 1 GSAP + 1 CSS sticky matches (01 pin, 04 sticky, zero pin on coarse); DPR≤2, spring 100/10 == ADR-3.3; pins vs reality: framer-motion 12.42.2 and lucide 1.23.0 installed exactly as claimed, gsap/lenis pending M0 correctly. F12 is a claim-wording nit.
4. **Risk realism — Fail on omissions.** R-1..R-8 are sound and repo-anchored (globals.css:340 confirmed, refresh-after-fonts specified), but the material misses are the shipped `public/_headers` CSP going stale (F4), orphan-dependency/lifecycle surface never addressed and in fact locked in by invariant 5 (F8), and the CI push-trigger/deploy coupling unstated (F10). Tailwind 4 @theme and next/font+export are covered (M2 keeps both; fonts are self-hosted per cited docs).
5. **Threat model adequacy — Conditional.** The zero-untrusted-input conclusion survives verification (no forms/params/middleware after M2; innerHTML exactly the 2 modeled layout.tsx sites; `new URL` build-time only; no eval), but the model missed `_headers` (F4) and overstates the env invariant (F7). Fix both and it is adequate.
6. **Rollback feasibility — Pass.** Single worktree on main, clean history, no in-flight branches; per-milestone commits + route-deletion-isolated commit + revert-forward all executable today, once F10's missing branch-creation step is added. main-deployability claim is accurate but interacts with the CI push trigger — document it.

## Verdict rationale

No Critical findings; four Majors (F1–F4) each change plan text or artifacts before Phase 5 and are one-edit fixes each. All runnable gates confirmed independently. Confidence: High — every finding verified against file text, command execution, or the PRD/canvas sources; registry currency (gsap 3.15.0 / lenis 1.3.26 / lucide 1.48.0 "npm view 2026-09-27") was taken on the plan's record, not re-fetched (offline discipline), and remains the plan's evidence. Not verified: Phase 6 tooling existence for the M4 screenshot gap (F13).

verdict: request changes

## Re-verification pass 2

Reviewer: separate prime-quality-reviewer invocation (did not author pass 1 or the remediation). Date: 2026-09-27. Task: adversarially verify checkpoint 6's claimed closures against artifact text; re-derive, do not trust the checkpoint record. Inputs re-read in full: `docs/PRP.md`, `prime/reports/phase-4-plan.md`, `prime/reports/phase-4-checkpoint-review.md`, `prime/reports/threat-model.md`, `docs/PRD.md`, plus sources: `src/data/now.ts`, `src/data/` tree, `package.json`, `public/_headers`, `next.config.ts`, `.github/workflows/ci.yml`, `git branch -a`.

### Per-finding closure table

| Finding | Verified how (re-derived from source) | Status |
|---|---|---|
| F1 (Major) | `src/data/now.ts` exists, exports `nowData`; PRD FR-11 carries "current focus (nowData verbatim)"; PRP M1 step 2 now says "**`now.ts` stays — FR-11 requires the current-focus metadata line from `nowData` verbatim**… consumed by M6"; M6 step 1 emits "**current focus line taken verbatim from `src/data/now.ts` nowData**"; trace REQ-11: M6 | CLOSED |
| F2 (Major) | PRD check: FR-15 = Footer, FR-16 = data decoupling, FR-19 = route cleanup. PRP M2 header now "REQ-15, REQ-19"; M2 step 3 Footer per FR-15 element list; M2 step 4 labeled "REQ-19 route-cleanup acceptance"; M7 header "REQ-14, REQ-15"; REQ-16 trace M1,M5 with concrete proof (M1 step 4 invariant + M5 step 5 temporary-5th-entry render-then-revert) | CLOSED (residual mislabel see N1) |
| F3 (Major) | PRP M5 step 4: "All below-fold images carry `loading=\"lazy\"` (NFR-01 clause, finding F3); hero visual above fold loads eagerly" + M5 verify grep for lazy on every below-fold img/Image; REQ-N01 trace extended to M2,M3,M5 | CLOSED |
| F4 (Major) | `public/_headers` on disk still ships `connect-src 'self' https://api.github.com https://api.web3forms.com` + `img-src …avatars.githubusercontent.com` (stale grants confirmed); PRP M2 step 6 tightens to `connect-src 'self'`, drops avatars img-src, verify by reading the file diff + M2 verify line "_headers diff reviewed"; threat-model §3 gained a `public/_headers` CSP row citing F4; invariant 5 rewritten | CLOSED |
| F5 (Minor) | M0 step 3: `npm i --save-exact gsap@3.15.0 lenis@1.3.26 && npm i --save-exact lucide-react@1.48.0`; verify checks "package.json shows exact pins"; constraints line holds framer-motion 12.42.2 (package.json confirms caret 12.42.2 present, untouched) | CLOSED |
| F6 (Minor) | Milestone estimates re-summed from PRP headers: 0.5+2+3+2+3+4+2+1.5+2 = 20.0 ✓ stated as 20.0 with "arithmetic fixed after quality-review Minor"; PERT (15+4·20+30)/6 ≈ 20.8 ✓; adjusted 24–30h consistent across PRP:84,87, phase-4-plan D-4.6, checkpoint 6 | CLOSED |
| F7 (Minor) | §5 invariant 4 correctly rephrased to the NEXT_PUBLIC_BASE_PATH inlining fact (matches next.config.ts:8–10). BUT the false phrasing survives elsewhere in the same file: TB3 (threat-model.md:23) still says "grep gate: zero env values referenced" and §3 build-leakage row (:36) still says "nothing read via `process.env` in shipped code (static export forbids it)" — the exact overstatement pass 1 rejected; second half of the fix (drop unused `env` block at M2 shell rewrite) absent from PRP M2 | **OPEN (partial)** |
| F8 (Minor) | Dep-GC half done: M2 step 5 names `npm uninstall next-themes react-hook-form zod` + depcheck sweep; package.json confirms all three present; invariant 5 rewritten to match. Data-file half NOT done: `src/data/` still holds blog.ts, achievements.ts, certifications.ts, team.ts, uses.ts (grepped PRP: zero mentions anywhere); M1 only handles testimonials/now. Orphaned data files remain unplanned | **OPEN (partial)** |
| F9 (Minor) | `npm run build` exit 0 now present in every verify line: M0 (baseline), M1, M2, M3, M4, M5, M6, M7, M8 — R-3 promise kept in text | CLOSED |
| F10 (Minor) | M0 step 1 `git checkout -b feat/cycle5-rebuild` + verify `git branch --show-current` ✓ (branch still absent on disk, correct pre-Phase-5). Missing: no step commits phase-4 artifacts on the branch, and the A-P3 ↔ CI coupling is still unstated — `.github/workflows/ci.yml` triggers deploy on any `push: branches: [main]`; PRP never mentions the workflow or that no-deploy holds because main is not pushed | **OPEN (partial)** |
| F11 (Minor) | Explicit clause→milestone binding now on PRP:12 (4 clauses, 4 bindings) ✓. But the badge-cloud incoherence persists: line 12 binds REQ-12 "NO badge cloud" to **M5**, the trace table binds REQ-12 "(+FR-12 badge-cloud carry-in)" to **M6**, and M6's Skills text (step 2) never states the constraint — PRD FR-12 is Skills. FR-13 attribution uncorrected: M6 step 1 (About) still carries the "FR-13 clause" line while PRD FR-13 is the Experience entry line (year/role/company/location/tech); M6 step 2 experience text has no location/tech fields | **OPEN (partial)** |
| F12 (Nit) | Checkpoint 5 text now reads "parallax ≤8 (ADR-3.5)" — source citation moved to the ADR as prescribed; PRP itself cites ADR-3.5 at M5 | CLOSED (phase-4-plan §6 still bundles ≤8 under "canvas values" — nit residue, non-blocking) |
| F13 (Nit) | PRP:49 still says "grep dark/theme = 0 in shell files" (file set undefined); M4 verify still says "t+3s full-page screenshot" naming no tool while Playwright is reserved to Phase 6. Text unchanged since pass 1; checkpoint 6 silent on F13 | **OPEN** |
| F14 (Nit) | PRD FR-02 AC "GIVEN keyboard WHEN Tab reaches nav THEN focus ring visible" — M2 step 3 header task lists only the hover carry-in clause; M2 verify has no focus-ring check (only M7 Contact mentions focus rings). Unchanged; checkpoint 6 silent on F14 | **OPEN** |

### Gate re-runs (executed from C:/Projects/Portfolio, this invocation)

- `gate-check.mjs traceability docs/PRD.md docs/PRP.md` → **GATE-PASS**: traces all 25 requirements (literal-keyed weakness re-confirmed: the semantic checks above were still needed).
- `gate-check.mjs citations docs/PRP.md 2` → **GATE-PASS**: **7 unique source URLs** with rationale.
- `gate-check.mjs pattern prime/reports/phase-4-quality-review.md "verdict:\s*(pass|block|request changes)"` → **GATE-PASS**.

### New findings (introduced by the corrections)

| ID | Location | Severity | Problem |
|---|---|---|---|
| N1 | docs/PRP.md:35 vs :90 | Minor | M1 header traces "REQ-15" to M1, but no M1 task touches the footer and the trace table says REQ-15: M2,M7 — header/trace contradiction (same family as F2, reintroduced at one row). M1's REQ-19 binding is likewise unexplained by M1 task text. |
| N2 | prime/reports/phase-4-checkpoint-review.md:54 vs docs/PRP.md | Nit | Checkpoint 6 records "citations 6 URLs" but the corrected file yields 7 unique URLs (gate re-run: 7). Stale parity number — the exact defect class checkpoint 5 audits. |
| N3 | docs/PRP.md:12 vs :90 | Minor | The badge-cloud clause now has two different bound milestones inside one document (M5 in the carry-in line, M6 in the trace table) — an explicit internal contradiction, not just fuzziness (tracked with F11). |

### Drift check (PRP vs phase-4-plan vs checkpoint 6)

Total hours (20.0 raw / PERT 20.8 / adjusted 24–30h): agree across all three. Pin versions (gsap@3.15.0, lenis@1.3.26, lucide-react@1.48.0, framer-motion held 12.42.2): agree; package.json consistent. Route count (19 secondary dirs): consistent against `src/app`. REQ trace rows: all 25 literals present. Only the URL count drifts (N2).

### Verdict rationale

All four pass-1 Majors (F1–F4) are genuinely closed in plan text and threat model. Of the ten Minor/Nit items: F5, F6, F9, F12 are closed; F7, F8, F10, F11 remain partially open (named fixes not present in the text the checkpoint claims was corrected); F13/F14 are untouched. Checkpoint 6's "all Major findings closed" is accurate; its blanket remediation claim is not. Openings are small, precisely localized edits; no new Major/Critical. Confidence: High — every status derived from quoted file text or executed command; nothing taken from checkpoint claims. Not verified: live `npm view` registry currency (offline discipline preserved).

verdict: request changes

## Re-verification pass 3

Reviewer: separate prime-quality-reviewer invocation (did not author passes 1–2 or the remediation). Date: 2026-09-27. Task: adversarially verify each pass-2 opening (F7, F8, F10, F11, F13, F14, N1, N2, N3) against current artifact text per checkpoint 7's closure claims; re-derive, do not trust the checkpoint record. Inputs re-read in full: `docs/PRP.md`, `docs/PRD.md` (FR-11…FR-14 rows), `prime/reports/threat-model.md`, `prime/reports/phase-4-checkpoint-review.md`, this file; sources: `next.config.ts`, `.github/workflows/ci.yml`, `src/` grep for `process\.env` and `data/(blog|achievements|certifications|uses|team)` importers, `src/app` route-dir listing, `src/data` listing, `public/_headers` (prior passes).

### Per-item closure table

| Item | Verified how (re-derived from source) | Status |
|---|---|---|
| F7 | `grep process\.env src/` = exactly 4 hits: contact-client.tsx:25,45 (web3forms key ×2), footer.tsx:12, hero.tsx:12 (BASE_PATH); `next.config.ts:3` NODE_ENV, :8–10 `env` block — TB3 (threat-model:23) now states this exact inventory ("4 spots", contact-client ×2, footer + hero, NODE_ENV build-time-only) ✓; §3 build-leakage row (:36) rewritten to the same inventory with M8 delete + grep gate ✓. PRP M7 step 1 explicitly deletes `contact/contact-client.tsx` ✓; M8 step 1 deletes the dead `env` block and asserts `grep -r "process.env" src/` = 0 ✓. Residual timing contradiction see N4; invariant 4 wording nit see T2. | CLOSED (with new N4) |
| F8 | Data-GC half now in text: M2 step 5 names `blog.ts`, `achievements.ts`, `certifications.ts`, `uses.ts` with importer evidence; grep confirms: blog ← sitemap.ts (fixed by step 4 rewrite) + blog/ routes; uses ← uses/ only; achievements ← resume/ + achievements/; certifications ← certifications/ only — all importers are the step-4 deleted route dirs ✓. `team.ts ← resume-client + hero.tsx`; after M2 route deletion hero is indeed the last importer, and M4 step 4 deletes team.ts in the hero-rewrite slice ✓ chaining correctly from M2 step 5's "team.ts stays" clause. Dep-GC half unchanged from pass 2 (uninstall trio + depcheck; invariant 5 rewritten) ✓. | CLOSED |
| F10 | `.github/workflows/ci.yml` on disk: `on: push: branches: [main]` → `cloudflare/wrangler-action` deploy — the A-P3 claim is true; PRP:9 now names the workflow and trigger, states branch isolation as the no-deploy mechanism, M0 step 1 branch-first, merge-to-main ≡ Phase 7 authorized deploy ✓. Phase-4 artifacts landing on main pre-M0 is explicitly acknowledged and sits outside the A-P3 Phase 5–6 scope. Pass-2's "no step commits artifacts on the branch" is resolved by the documented alternatives (artifacts land on main, then branch). | CLOSED |
| F11 | Carry-in :12 binds REQ-12 to M6 Skills with M5 step 4 as secondary tech-line application; M5 step 4 text carries the verbatim "NO badge cloud" constraint on tech rendering; M6 step 2 Skills states "carry-in verbatim constraint applies HERE (and in M5 tech lines)" ✓; PRD FR-12 confirmed = Skills + "NO badge cloud". FR-13 element list (year/role/company/location/tech) now sits in M6 step 2 Experience, matching PRD FR-13 AC; About step 1 no longer carries the misattributed FR-13 clause (its location/education fields are correctly framed as FR-11) ✓. M2 header stray parenthetical see T1 (nit). | CLOSED |
| F13 | M2 verify:49 names the defined shell file set (`globals.css`, `layout.tsx`, `page.tsx`, `src/components/layout/**`) for the dark/theme grep ✓; M4 verify:60 names the method — "browser dev-server spot check; Playwright evidence matrix deferred to Phase 6" ✓. | CLOSED |
| F14 | M2 verify:49: "keyboard Tab reaches header/footer controls with visible focus ring (FR-02 AC…)" ✓. | CLOSED |
| N1 | M1 header:35 = "REQ-07, REQ-08, REQ-16" — REQ-15/REQ-19 gone ✓; M1 tasks (projects data, now/testimonials, whitelist, decoupling invariant) match those three ✓; trace REQ-19 = "M2,M8 (route cleanup executed in M2; M1 carries no route task)" ✓. | CLOSED |
| N2 | checkpoint-review:54 now records "citations 7 URLs" — matches this pass's gate re-run (7) ✓. | CLOSED |
| N3 | REQ-12 now has one coherent story across :12 (M6 Skills primary, M5 step 4 secondary), M5 step 4, M6 step 2, and trace:91 ("Skills primary, showcase tech lines bound") — the M5-only binding of pass 2 is gone; no contradiction remains ✓. | CLOSED |

### Gate re-runs (executed from C:/Projects/Portfolio, this invocation)

- `gate-check.mjs traceability docs/PRD.md docs/PRP.md` → **GATE-PASS**: all 25 requirements traced.
- `gate-check.mjs citations docs/PRP.md 2` → **GATE-PASS**: 7 unique source URLs with rationale.
- `gate-check.mjs pattern prime/reports/phase-4-quality-review.md "verdict:\s*(pass|block|request changes)"` → **GATE-PASS**.

### Drift check (post-correction)

Milestone headers re-read from PRP: 0.5+2+3+2+3+4+2+1.5+2 = **20.0h** ✓ (stated at :85, unchanged); PERT 20.8 / adjusted 24–30h consistent; trace table contains all 25 REQ-01…REQ-19 + REQ-N01…N06 literals ✓; route-dir count re-derived: exactly 19 secondary dirs under `src/app` ✓ (this same listing is what makes N4 below a real contradiction).

### New findings

| ID | Location | Severity | Problem |
|---|---|---|---|
| N4 | docs/PRP.md:46 vs :76, :80; threat-model.md:23, :36 | Minor | Deletion-timing contradiction: M2 step 4 deletes **all 19 secondary route dirs**, and `contact` is one of the 19 (verified by listing) — so `src/app/contact/contact-client.tsx` disappears at M2. Yet M7 step 1 tasks deleting it "in this slice — the last src-side env readers disappear here", M8's parenthetical attributes it to "contact-client M7", and TB3/§3 repeat the M7 timing. End state (M8 grep = 0) is unaffected, but a fresh M7 executor is handed a no-op task and the env-close-out narrative mis-states when the readers die. Fix: reword M7/M8/TB3/§3 to "contact-client deleted with the route dirs in M2 step 4" (or explicitly except `contact/` from the M2 deletion until M7). |
| T1 | docs/PRP.md:42 | Nit (non-blocking) | M2 header still carries the stray "(+FR-13 carry-in lands in M6)" parenthetical and redundantly re-lists REQ-N02 after "REQ-N01…REQ-N06"; neither contradicts the trace or carry-in table. Accepted as-is. |
| T2 | threat-model.md:51 vs docs/PRP.md:80 | Nit (non-blocking) | Invariant 4 says the only env interpolation "is … NEXT_PUBLIC_BASE_PATH: '' in next.config.ts" while M8 deletes that block (at ship the true state is zero interpolation). Conservative over-statement, grep gate covers it. Accepted as-is. |

### Verdict rationale

pass 3's openings are genuinely remediated in artifact text: F7's inventory matches the live grep exactly, F8's importer claims check out file-by-file, F10's CI-trigger statement is true on disk, F11/N3's badge-cloud story is coherent across all four locations, F13/F14/N1/N2 fixes present. No prior item reopens. However the F7/F8 correction wave introduced one new Minor internal contradiction (N4: contact-client deleted at M2 by the route sweep yet assigned to M7 in three places), the same defect class pass 2 held to "request changes" standard (N1 precedent). Gates all pass; estimates and trace show no drift. Confidence: High — every status re-derived from quoted text or executed commands; not verified: live registry versions (offline discipline), Phase 6 tooling existence.

verdict: request changes

## Re-verification pass 4 (final confirmation)

Reviewer: separate prime-quality-reviewer invocation (did not author passes 1–3 or the remediation). Date: 2026-09-27. Task: narrow final confirmation of the pass-3 Minor (N4, recorded by the owner as checkpoint 8 "N5"): contact-client deletion timing. Inputs re-read in full: `docs/PRP.md`, `prime/reports/threat-model.md`, `prime/reports/phase-4-checkpoint-review.md`, this file; sources: `ls src/app`, `grep process\.env src/`, gate re-runs.

### Closure verification (re-derived from source)

| Item | Verified how | Status |
|---|---|---|
| N4/N5 (Minor) — deletion timing | `ls src/app` = exactly 19 secondary route dirs, `contact/` among them (matches PRP M2 step 4 "Delete the 19 secondary route dirs — **including `src/app/contact/`**, which carries the legacy web3forms `contact-client.tsx` and its `process.env` reads out at this slice" — PRP:46). M7 step 1 (PRP:76) now reads "already gone — deleted with its route dir at M2 step 4 (finding N5 correction); this slice builds the replacement section only" — no deletion task remains at M7. M8 step 1 (PRP:80) retimed: "contact-client and footer at M2, hero at M4 (timing corrected per N5)", then deletes the dead `env: { NEXT_PUBLIC_BASE_PATH: '' }` block and asserts `grep -r "process\.env" src/` = 0 ✓. The three statements agree on one timeline. | CLOSED |
| Threat-model consistency | TB3 (threat-model:23): "contact-client ×2 web3forms key — deleted with its route dir at M2 step 4, footer + hero … rewritten at M2/M4; M8 asserts grep = 0 and deletes the dead env block" ✓. §3 build-leakage row (:36): same inventory, "file deleted with its route dir at M2 step 4, timing per N5 … block deleted at M8 with grep gate … None after M2/M8 close-out" ✓. No leftover M7 claim: `grep -n "M7" prime/reports/threat-model.md` → **0 matches**. | CLOSED |
| PRP M7 grep sweep | `grep -n "M7" docs/PRP.md` → :75 (M7 header), :91 (trace REQ-14: M7; REQ-15: M2,M7; REQ-N03/N04 ranges), :92 (ADR-3.7/3.9→M7), :93 (J3→M7 verify). None places contact-client or any env read at M7. ✓ | CLOSED |
| Live env inventory (unchanged) | `grep -rn "process\.env" src/` = exactly 4 hits: contact-client.tsx:25,45 (WEB3FORMS key ×2), footer.tsx:12, hero.tsx:12 (BASE_PATH) — TB3's "4 spots" inventory still matches disk state pre-Phase-5. ✓ | Consistent |
| Checkpoint 8 record | Checkpoint-review :73–78 states the exact corrections found in text and supersedes checkpoint 7 item 1's M7 placement. ✓ Nit (T3, non-blocking): the checkpoint and artifacts label this finding **N5** while pass 3 recorded it as **N4** — a cross-reference ID mismatch only; the described defect and fix are identical in all three documents. | Recorded |
| T1 / T2 (pass-3 accepted nits) | T1: PRP:42 stray "(+FR-13 carry-in lands in M6)" parenthetical + redundant REQ-N02 re-list — unchanged, contradicts nothing. T2: threat-model:51 invariant-4 over-statement vs M8 block deletion — unchanged, grep gate covers it. Both remain non-blocking per pass-3 acceptance; not re-litigated. | Accepted |

### Drift check

Milestone hours re-read from headers: 0.5+2+3+2+3+4+2+1.5+2 = **20.0h** ✓ (stated at PRP:85; PERT 20.8 / adjusted 24–30h unchanged). Trace table contains all 25 REQ-01…REQ-19 + REQ-N01…N06 literals ✓. Route-dir count 19 ✓.

### Gate re-runs (executed from C:/Projects/Portfolio, this invocation)

- `gate-check.mjs traceability docs/PRD.md docs/PRP.md` → **GATE-PASS**: traces all 25 requirements.
- `gate-check.mjs citations docs/PRP.md 2` → **GATE-PASS**: 7 unique source URLs with rationale.
- `gate-check.mjs pattern prime/reports/phase-4-quality-review.md "verdict:\s*(pass|block|request changes)"` → **GATE-PASS** (G4).

### Verdict rationale

The single pass-3 Minor is genuinely closed: one coherent timeline (contact-client + footer env reads die at M2 step 4, hero at M4, config `env` block at M8 with grep gate) now holds across PRP M2/M7/M8 and threat-model TB3/§3, with zero surviving M7 timing claims anywhere. No prior item reopens; no new Major or Minor introduced by the correction (T3 label mismatch is a nit). All runnable gates pass; estimates and trace show no drift. Confidence: High — every statement re-derived from quoted file text or executed commands; the checkpoint record was not trusted. Not verified: live registry versions (offline discipline preserved), Phase 6 tooling existence.

verdict: pass
