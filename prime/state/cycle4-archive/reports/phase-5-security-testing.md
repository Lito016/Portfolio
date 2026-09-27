# Phase 5 — Security Testing Report

Project: Portfolio (static Next.js 16 export, `output: 'export'`)
ASVS pre-check level: L1 (static informational site; no auth, no sessions, no database, no server-side API). L2 escalation triggers (auth, payments, PII storage, multi-tenant data) are absent from the surface. Full L1 checklist verification is scheduled for Phase 6.

## Threat surface model

The deployed artifact is prerendered HTML/CSS/JS with no server runtime. Relevant surfaces:
1. Build-time dependency chain (supply chain)
2. Client-side rendering of content (XSS)
3. Outbound links (tabnabbing, referrer leakage)
4. One external form-submission integration (web3forms)
5. Repository hygiene (secrets/credentials)

## 1. Dependency / supply-chain scan

Tool: `npm audit` (auditReportVersion 2). Raw scan output: `prime/reports/phase-5-security-scan.json` (receipt-bound).

Initial scan found 2 transitive dev-time advisories; both fixed via non-breaking `npm audit fix` (lockfile-only change; `package.json` untouched):

| Package | Advisory | Severity | Fixed to |
|---|---|---|---|
| browserslist 4.28.4 | GHSA-c83g-rgw3-j3cx (unbounded memory growth), GHSA-73wf-gq98-2v4g (prototype write via untrusted custom stats) | high | >4.28.6 |
| baseline-browser-mapping 2.10.42 | GHSA-w5vr-8v7q-w6rv (process termination DoS on invalid input) | moderate | >=2.11.0 |

Both sit under `@babel/helper-compilation-targets` / `next` and are build-time-only; the shipped static export contains no browserslist code. Post-fix state: **found 0 vulnerabilities** — confirmed by re-running `npm run build` (all 29 routes prerendered) and the data-invariant test suite (0 failures) after the lockfile change.

Install-script supply-chain guard: the project uses an allow-scripts policy; the single pending script (`unrs-resolver@1.12.2` postinstall) surfaced in npm output and was **not** auto-approved — left to owner decision.

## 2. XSS / injection review

- React escapes all interpolated text by default; no `innerHTML` string building, no `eval`, no `document.write`, no `dangerouslySetInnerHTML` fed by user input.
- The only two `dangerouslySetInnerHTML` uses (audited in `m5-sweep.md`) are static-configuration sinks:
  - `src/app/layout.tsx` theme bootstrap script — reads only `localStorage`/`matchMedia`, wraps all access in `try/catch`, sets class names from a fixed ternary; no user-controlled string reaches the DOM as markup.
  - JSON-LD block — `JSON.stringify` over `siteConfig` constants (no user input).
- Client-side project filtering (`src/app/projects/projects-client.tsx`) uses plain string comparison over local data; values never enter URLs, HTML attributes, or sinks — no injection or SSRF path.
- Path traversal / injection: no filesystem or database access at runtime; no parameterized-query surface exists (static site, zero API endpoints).

## 3. Output encoding and links

- Every external anchor uses `rel="noopener noreferrer"` (mechanical audit in `prime/reports/m5-sweep.md`: 0 violations across the full source tree).
- `target="_blank"` is limited to genuinely external destinations (GitHub, LinkedIn, deployed project URLs from the fact whitelist W1–W26).

## 4. Secrets and credential hygiene

- Pattern sweep over all tracked source/config file types for API keys, tokens, passwords, `sk-`, `ghp_`, `AKIA` prefixes: **0 hits**.
- Tracked env-related files: only `.env.example` (placeholders). No `.env*` real files in git.
- Contact form access key is provided via `process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` with an explicit placeholder guard (`isConfigured` in `src/app/contact/contact-client.tsx:25`); the render degrades gracefully when unconfigured instead of shipping a hardcoded credential.
- No authentication, session, JWT, OAuth, or RBAC surface exists (no login on a static portfolio) — auth-related ASVS domains are not applicable, recorded rather than silently skipped.

## 5. Headers / transport (deferred note)

CSP/CORS/helmet-style response headers are not set in `next.config.ts`; with `output: 'export'` the site is served by the hosting layer, which is where header policy belongs. Recorded as a Phase 7 hosting recommendation, not a build defect.

## Verdict

- Dependency vulnerabilities: 0 (fixed during this phase, evidence hashed in scan artifact).
- Injection/XSS/traversal: no reachable sink found in source audit.
- Secrets: none detected in source or tracked files.
- Residual risk: web3forms endpoint availability (external, disclosed in W26); hosting-layer headers (Phase 7 item).

Security posture for the implemented surface: **acceptable to proceed to Phase 6** with L1 checklist re-verification.
