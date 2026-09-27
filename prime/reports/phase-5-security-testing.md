# Phase 5 — Security Testing (ASVS L1 Static-Site Audit)

Date: 2026-09-28 · Method: PRIME Phase 5 security audit using Trail of Bits vocabulary from `skills/security-testing/references/SECURITY-AUDIT.md` — **Audit Context Building** (trust boundaries, invariants, unenforced assumptions), **Variant Analysis Protocol** (siblings of each root cause), **Sharp Edges Analysis** (six footgun categories), **Differential Security Review** (blast radius), **Vulnerability Triage Brocards** (seven falsifiable tests), **False Positive Elimination** (restate → trace source-to-sink → devil's advocate).
Command evidence: `npm audit --json`, `git grep` sweeps, built-artifact inspection of `out/`, `public/_headers`, `next.config.ts`, `package.json`, `package-lock.json`, `.github/workflows/ci.yml`, and cross-check against `prime/reports/threat-model.md`.

## ASVS L1 posture — scope statement

**This is an ASVS L1 audit of a fully static site.** The delivered artifact (`out/`) is a `output: 'export'` Next 16 build: no server runtime, no API routes (`find src -name route.ts` → 0), no middleware, no auth, no sessions, no payments, no database, no forms (`grep -c "<form" out/index.html` → 0), no cookies/localStorage, no analytics, and no runtime untrusted input — the only "input" is in-page `#anchor` clicks. V2 (auth), V4 (access control), V5 (validation/encoding of user input), V6 (crypto at rest), V7 (error/logging), V8 (data protection) are structurally N/A. The applicable L1 surface is: V12/V14 (configuration/headers), V13 (build/deploy artifacts), V15-ish (third-party content paths), secrets hygiene, and supply chain (TB2 in the threat model). L1-with-no-exceptions is the ceiling, consistent with `threat-model.md` §6.

## 1. Dependency vulnerabilities (`npm audit --json`)

- **Result: 0 vulnerabilities across all severities** (info 0, low 0, moderate 0, high 0, critical 0; total 0).
- No high/critical advisories exist, so the static-export reachability analysis (dev-only vs shipped) is moot; for the record, devDependencies (`@playwright/test`, `axe-core`, eslint/typescript toolchain) never enter `out/` because `next build` bundles only imported runtime code.
- **Brocard triage** of the clean result: Brocard 3 ("no vulnerability outside of usage") applied proactively — even where transitive packages exist, only gsap/lenis/framer-motion/lucide-react/next/react runtime code is bundled (threat model §3: "minimal API surface used").

## 2. Secrets detection

Patterns swept (`git grep` + working-tree scan): `api[_-]?key|secret|token|password|credential|private[_-]?key|AKIA[0-9A-Z]{16}|sk-[A-Za-z0-9]{20,}|ghp_[A-Za-z0-9]{20,}` across `src/`, `public/`, `next.config.ts`, `package.json`, `scripts/`, `wrangler.toml`, `.github/`; plus a **full-history scan** (`git log --all -p` piped to literal-key-value regexes) for web3forms access keys.

- `git grep web3forms|api.github|avatars.githubusercontent -- src public` → **0 hits**: the previously-flagged Web3Forms endpoint and GitHub API/avatar readers are fully gone from delivered code (threat model F7/M2 close-out confirmed).
- History scan for literal `WEB3FORMS_ACCESS_KEY=` / `access_key:"<value>"` → **0 hits**; `.env`/`.env.local` were never committed (`git log --all -- .env*` empty) and `.gitignore:34-35` excludes `.env*` while allowlisting `.env.example`. Historic code used `access_key: accessKey` (variable), never an inlined value.
- All "secret/token" grep matches in `src/` are false positives under **False Positive Elimination Step 0** (restated claim collapses): design-token CSS comments (`globals.css:18,120,244`) and marketing copy describing the quill-mcp project's own secret-detection feature (`projects.ts:97,109,155,175`). No credentials exist.
- Residual: `.env.example` still documents the deleted Web3Forms integration (placeholder `your-access-key-here`, not a secret) — Finding F-2, Minor stale-config debris.
- Sharp Edges category **Dangerous Defaults**: none — no code reads `process.env` at all (`git grep -n process.env -- src` → 0; threat-model invariant 4 holds; the old `env` block is gone from `next.config.ts`).

## 3. dangerouslySetInnerHTML / XSS sink audit

- **Exactly one instance repo-wide**: `src/app/layout.tsx:71`. Its input is `JSON.stringify` of a literal object whose dynamic parts are all static `siteConfig` fields (`src/config/site.ts` — hardcoded name/url/github/linkedin/email constants; no env interpolation, no network, no user data). **Variant Analysis** (generalize the sink, search for siblings): greps for `dangerouslySetInnerHTML`, `innerHTML`, `outerHTML`, `document.write`, `eval(`, `new Function`, `href={dynamic}` across `src/` → only this one HTML-injection sink exists; no siblings. Threat-model invariant 3 ("exactly one, static-config") **holds**.
- Devil's advocate: the sink is only reachable pre-hydration at build time; mutation requires repo write access, which is TB1 (already total compromise) — **Brocard 2** (exploit from the heavens) dismisses any standalone XSS claim. Severity: Informational.
- Remaining URL-bearing render path is static `<a href>` from `siteConfig`/`projects.ts` literals — no attacker-controlled source exists to taint them (**Audit Context Building**: the trust boundary "untrusted input → sink" is empty by construction; threat-model TB4).

## 4. External surface / tabnabbing

Enumerated every outbound URL rendered in `out/index.html` (source of truth: the shipped artifact):

| URL | Placements | target/rel |
|---|---|---|
| `https://github.com/Lito016` | 3 (hero, footer, contact) | `_blank` + `noopener noreferrer` |
| `https://linkedin.com/in/manolito-almaden-jr-a54a6634a` | 2 (footer, contact) | `_blank` + `noopener noreferrer` |
| `https://github.com/Lito016/{quill-mcp,Inventory_management_system,University-Management-System}` | 1 each | `_blank` + `noopener noreferrer` |
| `https://{barangay-prototype,inventory-management-system-55w,dish-manager-prototype,ai-saas-landing}.pages.dev/` | 1 each | `_blank` + `noopener noreferrer` |
| `mailto:manolitoalmadenjr@gmail.com` | 2+ | no target (correct for mailto) |
| `https://portfolio-8af.pages.dev` | canonical / author / og: links (metadata, not click-out) | n/a |

- Mechanical check on the built HTML: external anchors missing `target="_blank"` → **0**; missing `noopener` → **0**. **Variant analysis** at source level: all three link-emitting patterns carry the protection — explicit attrs (`hero-motion.tsx:110-111`), conditional spread keyed on `startsWith('http')` (`secondary-row.tsx:34-35`, `showcase-ui.tsx:60-61`), and `link.external ? {target,rel}` spreads (`footer.tsx:29-31`, `contact.tsx:41`). No variant omits `rel` while adding `_blank`.
- Referrer posture: `Referrer-Policy: strict-origin-when-cross-origin` (`public/_headers:6`) — outbound links leak origin only over HTTPS, default-safe. No `<meta name="referrer">` override. No `window.open` anywhere in `src/`.
- Forms: **zero** (`out/index.html` form count 0; `form-action 'self'` header is a belt-and-braces default). Email exposure in `mailto:` is intentional-public per threat model §1 (spam accepted, Finding F-6 Informational).

## 5. Response headers / CSP (`public/_headers`)

Shipped policy (line-by-line evaluation):

| Directive | Value | Verdict |
|---|---|---|
| `default-src 'self'` | ✓ | baseline deny |
| `script-src 'self' 'unsafe-inline'` | flag→accept | See analysis below |
| `style-src 'self' 'unsafe-inline'` | accept | Next/Tailwind emit inline style attributes + injected style tags; nonces impossible in a pure static export (no per-request server to stamp them) |
| `img-src 'self' data: blob:` | ✓ | dead `avatars.githubusercontent.com` grant from threat-model F4 is **removed** — remediation verified |
| `font-src 'self' data:` | ✓ | no Google Fonts runtime origin |
| `connect-src 'self'` | ✓ | dead `api.github.com` / `api.web3forms.com` grants from F4 are **removed** |
| `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `frame-ancestors 'none'` | ✓ | classic clickjacking/data-URI/injection lockdowns all present |
| `upgrade-insecure-requests` | ✓ | |
| HSTS | `max-age=31536000; includeSubDomains` | ✓ L1-grade (1y, subdomains; preload not claimed — fine) |
| `X-Frame-Options: DENY` | ✓ | redundant with frame-ancestors, defense-in-depth |
| `X-Content-Type-Options: nosniff` | ✓ | |
| `Referrer-Policy: strict-origin-when-cross-origin` | ✓ | |
| `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()` | ✓ | every sensitive feature disabled |
| `Cross-Origin-Opener-Policy: same-origin` | ✓ | browser-isolation hardening |
| `X-Permitted-Cross-Domain-Policies: none` | ✓ | |

**`script-src 'unsafe-inline'` adjudication (Sharp Edges — Configuration Cliffs):** In an `output: 'export'` artifact, Next inlines RSC/hydration payload `<script>` elements and the JSON-LD block directly into `index.html`; with no server to generate per-request nonces or hashes, `'unsafe-inline'` is the only working option short of pre-build hash computation Next does not expose for exports. The residual risk it opens — injected inline script — requires write access to the artifact (TB1/TB3), at which point the adversary can inject *anything*, nonce or not (**Brocard 2**). All other script vectors are closed (`default-src 'self'`, `object-src 'none'`, `base-uri 'self'`, zero third-party script srcs — §7). Verdict: **accepted residual, documented** (Finding F-4, Informational). Note `out/_headers` is copied verbatim so the deployed artifact ships this file to Cloudflare Pages.

## 6. Dependency integrity / supply chain

- **Exact pins** (`package.json`): `gsap 3.15.0`, `lenis 1.3.26`, `lucide-react 1.48.0`, `next 16.3.3`, `react 19.2.4`, `react-dom 19.2.4`, `eslint-config-next 16.3.3` — all bare pins. **`framer-motion ^12.42.2` is a caret range, not exact** (Finding F-1, Minor): lockfile resolves it to 12.42.2 and CI runs `npm ci` (lockfile-faithful), so shipped bytes are deterministic; the drift risk exists only for a lockfile-less fresh install. Same caret looseness applies to `clsx`, `tailwind-merge` (utility-only) and all devDependencies (never shipped).
- **Lockfile cross-check** (`package-lock.json`): resolved versions match the threat-model §5 invariant-5 delta story (gsap+lenis added at audited current versions; next-themes/react-hook-form/zod/@tanstack/react-query/react-icons/@hookform/resolvers deleted — none present).
- **Lifecycle scripts**: `package.json:5-10` scripts block contains only `dev/build/start/lint` — **no preinstall/postinstall/install/prepare hooks added**. `npm audit` reports no advisories (§1). CI (`ci.yml`) runs `npm ci` (integrity-checked against lockfile hash) not `npm install`.
- **CI posture (Differential Security Review of the deploy path)**: least-privilege `permissions: {contents: read, deployments: write}`, trigger limited to `push: [main]` (no `pull_request_target`), secrets referenced only via `${{ secrets.* }}` context (never inlined). Hardening note: `actions/checkout@v4`, `actions/setup-node@v4`, `cloudflare/wrangler-action@v4` are tag-pinned, not commit-SHA-pinned (Finding F-5, Minor; upstream-Action tag rewrite is the residual supply-chain vector the threat model §4 already rates as the primary residual risk, mitigated to "Minor" by the read-contents token scope).

## 7. Content-path / third-party runtime risk

- **Fonts**: `next/font/google` Geist/Geist_Mono (`layout.tsx:2,9-17`) are **build-time downloaded and self-hosted** — verified: `out/index.html` `<script>`/`<link>` scan shows zero external `src`/`href` except canonical/author metadata URLs to the site's own origin; CSS references only `/_next/static/media/*.woff2`. No fonts.googleapis.com/gstatic.com requests at runtime.
- **Scripts**: every `<script>` in `out/index.html` is `src="/_next/static/chunks/..."` (same-origin). Regex sweep of all shipped chunks for `https?://` yields only inert string constants (W3C XML namespace URIs, nextjs.org/react.dev error-message doc links, gsap.com credit string, and the site's own URLs from static config) — **no fetch/XHR/WebSocket targets to remote origins**, consistent with `connect-src 'self'`.
- **Images**: `images.unoptimized: true` (`next.config.ts:8-10`) with `next/image` used only for local files (`full-bleed-media.tsx:21`, `showcase-ui.tsx:87` receive project screenshot imports); all rendered `src` values are root-relative `/project-*.png`, `/profile.png` — zero remote image URLs (the former avatars.githubusercontent reader is gone, §2). No `remotePatterns`/`domains` config exists.
- `public/shimeji/frame_01..24.png` is copied into `out/` but referenced by **nothing** in `src/` or the built HTML (grep → 0 hits) — dead payload, not a security issue; cleanup candidate (Finding F-3, Informational).
- `out/robots.txt` / `sitemap.xml`: generated from static config; `Disallow: /api/` is vestigial (no /api exists) — harmless.

## 8. Threat-model cross-check (spot-check of every invariant)

| Threat-model claim (§5 invariants / §3 mitigations) | Verification command | Result |
|---|---|---|
| 1. Zero runtime untrusted-input sinks: no actions/routes/middleware/forms | `find src -name route.ts` → 0; no `middleware.ts`; `grep -c "<form" out/index.html` → 0 | **HOLDS** |
| 2. Every `target=_blank` carries `rel="noopener noreferrer"` | Built-HTML anchor sweep: 0 missing (12 external anchors, all pass); source spreads at footer/contact/secondary-row/showcase-ui/hero-motion | **HOLDS** |
| 3. Exactly one `dangerouslySetInnerHTML` (static JSON-LD) | `git grep` → `layout.tsx:71` only; input = static `siteConfig` | **HOLDS** |
| 4. No secrets in bundle; no `process.env` reaches client | `git grep process.env -- src` → 0; history key-value scan → 0 literals; `.env*` gitignored, never committed | **HOLDS** |
| 5. Lockfile delta = gsap+lenis additions, old form/auth deps removed | lockfile inspection §6 | **HOLDS** |
| F4 remediation: CSP dead grants removed | `public/_headers` shows `connect-src 'self'`, `img-src 'self' data: blob:` — api.github/api.web3forms/avatars grants absent | **HOLDS** |
| F7/M2 close-out: web3forms + GitHub API readers deleted | `git grep web3forms|api.github|avatars.githubusercontent -- src public` → 0 | **HOLDS** |
| TB2 residual: supply chain (pinned versions, `npm ci`, minimal API surface) | exact pins §6, `npm audit` clean §1, `npm ci` in ci.yml | **MITIGATED as modeled** |

No threat in `threat-model.md` lacks its delivered mitigation, and no *new* attack surface emerged that the model missed (the only artifacts beyond model expectations are the vestigial `.env.example` doc, the unused shimeji PNGs, and the CI tag-pinning nuance — none security-relevant beyond Minor/Info).

## Security patterns implemented

| Pattern (ToB vocabulary) | Applied to | Evidence / disposition |
|---|---|---|
| **Audit Context Building** — trust boundaries TB1–TB4, invariants, unenforced-assumption hunt | Whole audit | Boundaries re-derived §8; the only unenforced assumption ("repo history is clean") was tested, not assumed (§2 history scan) |
| **Variant Analysis Protocol** — root cause → siblings across codebase | XSS sink, tabnabbing, env reads | 1 sink found → sibling sweep (innerHTML/eval/new Function) → 0 variants; 5 distinct external-link render patterns → all carry rel (§4) |
| **Sharp Edges Analysis** — six categories | Configs/APIs | Dangerous Defaults: no process.env fallbacks exist (§2); Configuration Cliffs: CSP `unsafe-inline` adjudicated (§5), `images.unoptimized` justified (§7); Silent Failures/Stringly-Typed/Primitive-API/Algorithm-Selection: N/A (no security decision points in a static site) |
| **Differential Security Review** — blast radius of the deploy path | `.github/workflows/ci.yml`, `public/_headers`, `package.json` | Least-privilege CI verified; header diff vs threat-model F4 verified (§5, §6, §8) |
| **Vulnerability Triage Brocards** — 7 falsifiable tests | npm-audit zero-result, JSON-LD sink, unsafe-inline CSP | Brocard 2 (exploit from heavens) dismissed the TB1-only XSS claim (§3) and the unsafe-inline escalation claim (§5); Brocard 3 (usage) applied to dev-only deps (§1); Brocard 6 (cure worse than disease) justified *not* removing unsafe-inline (would break the build with no compensating gain) |
| **False Positive Elimination** — Step 0 restatement, source-to-sink trace, devil's advocate | "secret" greps, chunk URL strings | Design-token/marketing-copy matches refuted at Step 0 (§2); chunk-internal doc URLs refuted (constants, not fetches, §7) |
| Secrets detection (L1 hygiene) | working tree + full git history | Clean (§2) |
| Output encoding / XSS (V5/V13 analogue) | single sink audited | Static-only (§3) |
| Tabnabbing / referrer leakage (client-side integrity) | all 12 external anchors | Mechanically enforced (§4) |
| CSP + security headers (V14) | `public/_headers` | 11 headers evaluated; one documented accepted residual (§5) |
| Supply-chain integrity (V15/deps) | pins, lockfile, lifecycle hooks, CI | One Minor range finding (§6) |
| Third-party content path elimination | fonts, scripts, images, chunks | Fully self-hosted; zero runtime remote fetches (§7) |

## Findings

| ID | Severity | Finding | Status | Rationale |
|---|---|---|---|---|
| F-1 | Minor | `framer-motion` declared as `^12.42.2` (caret) in `package.json:13` while threat model claims exact pins; also clsx/tailwind-merge carets | **deferred** (fix = one-line pin in a follow-up; audit may not edit source) | Shipped bytes deterministic: lockfile pins 12.42.2 and CI uses `npm ci`; exposure limited to lockfile-less installs. Recommend pinning to `12.42.2` for policy consistency |
| F-2 | Minor | `.env.example` still documents the deleted Web3Forms integration (`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`) | **deferred** (docs cleanup) | Placeholder only, no secret; but it advertises a backend the site no longer has — stale-config drift (Sharp Edges: config is code) |
| F-3 | Informational | `public/shimeji/*.png` (24 frames) copied into `out/` but referenced by nothing | **accepted** | Dead payload, no security impact; optional weight cleanup |
| F-4 | Informational | CSP `script-src`/`style-src` include `'unsafe-inline'` | **accepted** | Structurally required for a static Next export (inline hydration/RSC payloads; nonces impossible without a per-request server); all other vectors closed; exploitation requires prior artifact compromise (Brocard 2) — see §5 |
| F-5 | Minor | CI Actions pinned by mutable tag (`@v4`) rather than commit SHA (`ci.yml:19,21,33`) | **deferred** (hardening) | Residual upstream-tag-rewrite vector; token is contents:read/deployments:write scoped, main-push only. SHA-pinning recommended in Phase 7 checklist |
| F-6 | Informational | Public email exposed via `mailto:` (intentional PII by design) | **accepted** | Threat model §1 classifies it public-by-design; only impact is spam |

**Counts: Critical 0 · Major 0 · Minor 3 · Informational 3.**

## Verdict

All six Trail of Bits analysis patterns executed; all eight threat-model invariants/mitigations verified HOLDS with commands, not assertion; dependency audit clean; secrets hygiene clean including git history; external-link and header posture L1-solid with one documented, justified CSP residual and three Minor hardening items none of which affect shipped-byte security.

**ASVS L1 audit: PASS** — zero Critical/Major findings; static-site posture (no auth, no input, no PII processing, no server) means the applicable L1 controls are fully satisfied, with Minors F-1/F-2/F-5 deferred to follow-up hardening and the `'unsafe-inline'` residual accepted with written justification.
