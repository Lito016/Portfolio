# Phase 5 (Build) Quality Review — Cycle 4 Repositioning (final pass)

Independent audit, follow-up pass. I was dispatched as a separate audit agent for this re-review; I did not write the implementation or the remediation. First pass verdict was "request changes" (1 Major M-1, five Minors m-1..m-5, one Nit n-1). This pass verifies the M-1 remediation in `tests/data-invariants.test.ts`, adjudicates the residual gaps left by that remediation, dispositions the five Minors and the Nit (applying only trivial, low-risk fixes within the authorized file scope), and issues the final verdict. Data files (`src/data/projects.ts`, `prime/state/fact-whitelist.md`) are unchanged since the first pass — verified via `git status` (only `src/app/about/page.tsx`, `src/app/projects/page.tsx`, `src/app/skills/page.tsx`, `src/app/resume/resume-client.tsx`, `src/components/projects/case-study-layout.tsx`, `src/components/projects/project-card.tsx` modified by me, plus my own report rewrite; no data or test-file edits).

verdict: pass

## findings:

### M-1 remediation — verified fixed (Major closed)

The whitelist-traceability guard is no longer format-only. `tests/data-invariants.test.ts` now has 8 scenarios (was 7); the two relevant tests:

1. **Metric traceability** (`tests/data-invariants.test.ts:42-60`): parses declared W-ids from `prime/state/fact-whitelist.md` via `/\bW(\d+)\b/g` (`:44`), asserts a degenerate-parse floor (`declaredIds.size >= 20`, `:45`), asserts every `metric.source` is a *declared* id (`:50` — this alone kills the original `W99` fabrication), and asserts the cited W-entry line carries the metric's value or label (`:51-56`) — so a fabricated `{value:"128", label:"repositories", source:"W20"}` fails, because W20's entry (`prime/state/fact-whitelist.md:41`, live GitHub stats) carries neither token. Non-empty value/label re-asserted at `:57`.
2. **Numeric-copy fabrication scan** (`tests/data-invariants.test.ts:62-125`): walks the full visible-copy corpus of `whatIBuildCategories` and every `hostedProjects` field — name, description, highlights, all caseStudy prose, workflow/architecture/features/challenges/decisions labels and details, and metric values/labels (`:68-114`) — scans every `\b\d+\b` token, and asserts membership in the `{'49'→W2, '16'→W3}` ALLOWED map (`:63`, `:117-123`). Anti-vacuity guards are real: corpus length `> 50` (`:115`) and `numericFound >= 4` (`:124`); the current data yields ≥ 6 numeric tokens (two metrics at `src/data/projects.ts:176-179`, two highlight strings at `src/data/projects.ts:93,96`, plus `49`/`16` again in the solution prose at `src/data/projects.ts:109`). This closes the exact case the first pass flagged — "49 tools" free text at `src/data/projects.ts:93` is now machine-guarded.

Adversarial assessment (I attempted to defeat the tests, by reasoning over the assertion logic and the current data; I did not modify repo files to stage fabrications):

- **Misbound-but-existing id (e.g. W20)**: caught. The entry-binding check at `tests/data-invariants.test.ts:51-56` requires the cited W-entry line to contain the value or label; W20's line contains neither "128" nor "repositories". The one theoretical slip — a fabricated value like `"20"` whose digits substring-match the id token inside W20's own line — is independently caught by test 2, since `20` is not in the ALLOWED map. The two tests are complementary: even where test 1's substring binding is loose, any *numeric* fabrication must pass the `:117-123` scan.
- **Numbers in fields the corpus collector misses**: `links` labels are structurally numeric-proof (union type `'GitHub' | 'Live Demo' | 'Docs'` at `src/data/projects.ts:13`, plus the allowlist assertion at `tests/data-invariants.test.ts:36`); `url`/`image`/`slug`/`screenshots` are attributes, not visible copy. One genuine miss remains: **`project.tags`** (`src/data/projects.ts:63`) is rendered visibly (`src/components/projects/project-card.tsx:82`, `src/components/projects/case-study-layout.tsx:55-62`) but is not walked by the collector. No numeric tag exists today and tags are technology nouns; residual risk is real but small (see m-6 below).
- **ALLOWED-map entry without whitelist backing**: adding `['50','W2']` to `tests/data-invariants.test.ts:63` would let "50" through — the map's *values* are never cross-checked against whitelist lines. However, this requires editing the guard itself (visible in any diff, same trust boundary as editing the whitelist), and metric values would still need a genuine binding via test 1. Residual, not Major (m-7 below).
- **Cross-project misbinding**: a Barangay metric `{value:'49', label:'MCP tools', source:'W2'}` passes both tests (W2's line carries "49"; 49 is ALLOWED). The first-pass suggestion of a per-project allowed-id map was not implemented (m-8 below).

Judgment: these three residuals each require either a deliberate test-file edit or a semantically absurd re-use of a correctly whitelisted number, on a static data file maintained alongside the whitelist, with the manual `prime/reports/m5-sweep.md` sweep retained as a backstop. They do not reopen M-1: the automated guard now fails on straightforward fabrication, which is what the Major demanded.

### Minors — disposition

Fixed in this pass (single-line markup/class changes, no content or whitelist facts touched; re-verified after edits):

- **m-1 — fixed.** `<dt>` now precedes `<dd>` in the case-study metrics definition list (`src/components/projects/case-study-layout.tsx:166-176`); the value-first visual order is preserved via `flex flex-col` + `order-1`/`order-2` utilities, so rendered output is pixel-identical while the markup is spec-valid.
- **m-2 — fixed.** About, Projects and Skills genuinely had no `h1` (first heading was `SectionHeading` → `<h2>`, `src/components/shared/section-heading.tsx:23`; confirmed no other `h1` in `src/app/layout.tsx` or the header/footer). Each route's `page.tsx` now renders a single `sr-only` `h1` matching the visible section title and page `<title>`: `src/app/about/page.tsx:10`, `src/app/projects/page.tsx:10`, `src/app/skills/page.tsx:10`. No visual change, no copy change, no restructuring.
- **m-3 — fixed.** The divergent resume header line ("AI Solution Developer | Web & Mobile Developer") is replaced by the canonical single source `POSITIONING` (`src/app/resume/resume-client.tsx:21,74`; `src/config/site.ts:4`). The rendered string is now the W21 positioning pair (`prime/state/fact-whitelist.md:42`) verbatim; duplication removed; "Web & Mobile Developer" remains only as the W-supported achievement title in `src/data/achievements.ts` (rendered from data, untouched).
- **m-5 — fixed.** The header `ExternalLink` affordance that implied the card itself was clickable (while no card header link exists) is removed from `src/components/projects/project-card.tsx` (was `:55-60`); the genuine external anchors remain at the card footer (`:89-113`), still carrying `rel="noopener noreferrer"`.

Deferred to a follow-up pass (out of this audit's authorized edit scope, or not a single-line change):

- **m-4 — deferred.** `ExternalLink` on the internal "View all projects" `Link` (`src/components/sections/featured-projects.tsx:53`). The fix is a one-token swap to `ArrowRight`, but `featured-projects.tsx` is outside the files this audit is authorized to edit. Visual affordance only (icon is `aria-hidden`); zero content/whitelist impact. Follow-up: replace the icon.
- **n-1 — deferred.** `text-white` outside the token system at `src/components/sections/hero.tsx:24` and `src/components/projects/case-study-layout.tsx:188` (and pre-existing `btn-gradient ... text-white` at `src/app/resume/resume-client.tsx:57`). A proper fix introduces a `--primary-foreground` token, which touches the theme/globals — not a trivial single-line change, and hero.tsx is outside the authorized edit scope. Acceptable follow-up; no functional or factual risk meanwhile.

### New low-severity findings from the remediation (accepted follow-ups, non-blocking)

- **m-6 (Minor, accepted).** The numeric-copy collector (`tests/data-invariants.test.ts:68-114`) does not walk `project.tags`, which are visible copy. Acceptable: no numeric tags exist, tags are technology nouns backed by W6/W7/W12, and the manual sweep in `prime/reports/m5-sweep.md` covers the data file. Follow-up: add `project.tags.forEach(collect)` to the collector.
- **m-7 (Minor, accepted).** The ALLOWED map at `tests/data-invariants.test.ts:63` is trusted input: neither its keys (e.g. "49") nor its values (e.g. "W2") are cross-checked against the whitelist file. Defeating this requires editing the test — the same diff-visibility as editing the whitelist. Follow-up: assert each `ALLOWED` key appears in the entry line of its mapped W-id (the line-scanning machinery already exists at `:46,51`).
- **m-8 (Minor, accepted).** No project→allowed-W-id binding, so a *correctly whitelisted* number/label can be attached to the wrong featured project (e.g. "49 MCP tools" under Barangay). The whitelist itself is project-sectioned (`prime/state/fact-whitelist.md:5-49`), so this stays cheap to catch in review, and the value is still whitelist-truth. Follow-up: a small `slug → [W-ids]` map asserted in test 1.

No Critical or Major findings remain. m-6/m-7/m-8 are Minor-with-reason under the severity rules (guard fails on straightforward fabrication; residuals need guard-tampering or absurd re-use), and explicit deferral of Minors does not block the gate.

## recommendations:

1. (Follow-up, non-blocking) In `tests/data-invariants.test.ts`: add `tags` to the numeric corpus (m-6), cross-check the ALLOWED map against whitelist entry lines (m-7), and add a `slug → allowed-W-ids` map to test 1 (m-8). ~15 lines total, no production-code change.
2. (Follow-up) Replace `ExternalLink` with `ArrowRight` on the internal link in `src/components/sections/featured-projects.tsx:53` (m-4).
3. (Follow-up) Introduce `--primary-foreground` and replace `text-white` in `src/components/sections/hero.tsx:24`, `src/components/projects/case-study-layout.tsx:188`, `src/app/resume/resume-client.tsx:57` (n-1).
4. No data corrections needed — `src/data/projects.ts` and `prime/state/fact-whitelist.md` are unchanged since the first pass, where every site-visible number and URL was manually traced to W1–W26; all 8 invariant scenarios re-passed this pass.
5. Commit the currently untracked `tests/`, `prime/reports/`, `prime/scripts/` artifacts and the modified `tsconfig.json`/working-tree files with the M-1 remediation as one logical `test:` commit (they are still untracked in git).

## Evidence

**Independence.** Separate audit agent, follow-up pass. I did not author the implementation, the remediation, or the first-pass report; I verified M-1's fix adversarially and ran all verification commands myself rather than trusting prior receipts.

**Receipt chain.** `prime/reports/phase-5-test-receipt.json`: `invocation_id` `68c39c303459d26a737fea247de1cc422faf0bb61f6852117b53c309565e98f8`, `nonce` 4, `principal_identity` "trusted-runner", `exit_status` 0, `output_artifact_hashes["prime/reports/phase-5-test-results.json"]` = `ebf7a740…07ef6`. I independently SHA-256'd the results file and it matches that digest exactly, and the results file records 8 scenarios including the two new tests (`prime/reports/phase-5-test-results.json:21-27`). The HMAC signature itself I could not re-verify locally (the `scripts/gate-check.mjs verify-receipt` command referenced in `prime/state/dispatch-contracts/phase-5.json:164` is not present in this repo — the verifier lives in the external trusted runner), so I re-executed the suite myself, which supersedes trust in the receipt.

**Commands I ran and outputs (final state, after my minor fixes):**

- `node --test tests/data-invariants.test.ts` → `ℹ tests 8 · pass 8 · fail 0` (all 8 scenario names listed and green, including "every metric fact is whitelist-traceable…" and "numeric tokens in visible project copy are all whitelist-mapped…"). Run twice: before and after my edits — identical results.
- `npx tsc --noEmit` → exit 0, no output. Re-run after edits → exit 0.
- `node node_modules/eslint/bin/eslint.js .` → exit 0, no output. Re-run after edits → exit 0.
- `npx next build` → exit 0; static prerender green including all SSG case-study routes and the three edited pages (`/about`, `/projects`, `/skills`, `/resume` in the route manifest).
- `sha256sum prime/reports/phase-5-test-results.json` → `ebf7a7408643e6ca2a22b1a1844bc9714b129f619f5de9972eef450394507ef6` (matches receipt artifact hash).
- Adversarial reasoning over the two new tests (misbound-W20 metric, "50" in walked prose, ALLOWED map tampering, tags/url/screenshots coverage) — recorded under findings above; no repo file was modified to stage a fabrication.

**What changed since the first pass.** (a) Remediation of M-1: `tests/data-invariants.test.ts` grew from 7 format-only scenarios to 8 with whitelist-membership binding (`:42-60`) and a numeric fabrication scan with anti-vacuity guards (`:62-125`); results + receipt regenerated (`invocation_id` above, nonce 4). (b) Fixed by me in this pass: m-1 (dt/dd order, `case-study-layout.tsx:166-176`), m-2 (sr-only h1 in the three `page.tsx` files), m-3 (resume header now renders `POSITIONING`), m-5 (header icon removed from `project-card.tsx`). (c) Deferred with reason: m-4 (file outside authorized edit scope; affordance-only), n-1 (needs a token addition, not a one-line change). (d) New accepted follow-ups m-6/m-7/m-8 documenting the remediation's residual gaps — none blocking.

Gate status: 0 Critical, 0 Major, 3 Minors + 2 Nits as explicit accepted/deferred follow-ups → **pass**.
