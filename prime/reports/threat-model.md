# Threat Model — Portfolio Rebuild (Cycle 5)

Method: ToB-style context build — follow the calls, map trust boundaries, enumerate assets, adversary capabilities, then mitigations. Scope: the rebuilt static site (Next 16 `output:'export'`, Cloudflare Pages `out/` artifact) plus its build pipeline. Date: 2026-09-27.

## 1. Assets

| Asset | Sensitivity |
|---|---|
| Site integrity served at the owner's domain (visitors execute its JS) | High — XSS here reaches every visitor |
| Owner identity data published intentionally (name, email, GitHub, LinkedIn, employment facts) | Public by design; integrity (no fabricated claims) matters |
| Build pipeline credentials (GitHub → Cloudflare Pages CI) | High — write access to the served bundle |
| npm dependency tree | Medium — supply-chain entry point into the bundle |
| Visitor data | None collected: no forms, no cookies, no analytics, no localStorage after theme removal (PRD Out-of-Scope; ADR-3.9) |

## 2. Architecture & trust boundaries (follow the calls)

```
[owner repo push] --(GitHub auth)--> [CI: npm ci + next build] --(artifact)--> [Cloudflare Pages edge] --(HTTPS)--> [visitor browser]
        TB1                      TB2                            TB3                        TB4
```
- TB1 source trust: git content filters + protected `main` (branch workflow D-4.2); anything committed becomes served code.
- TB2 build trust: `npm ci` executes third-party postinstall/lifecycle code on the CI runner — mitigated by lockfile pinning, exactly 2 new deps at audited current versions (M0), minimal API surface used (gsap ScrollTrigger, lenis constructor only).
- TB3 artifact trust: static files, no server functions, no secrets in bundle. Precise env accounting (corrected after quality-review F7, timing per N5): `src/` currently reads `process.env` in 4 spots (contact-client ×2 web3forms key — deleted with its route dir at M2 step 4, footer + hero `NEXT_PUBLIC_BASE_PATH` — rewritten at M2/M4); M8 asserts `grep -r "process.env" src/` = 0 and deletes the dead `env` block from `next.config.ts`. Today's `NEXT_PUBLIC_BASE_PATH` value is an empty public literal inlined at build (next.config.ts), never a secret; `NODE_ENV` is build-time only, not shipped.
- TB4 client trust: **runtime attack surface = zero untrusted input.** No query parsing (single page), no forms, no dynamic params after route deletion, no cookies/headers usage, no middleware/proxy, no auth. The visitor is the read-only consumer.

## 3. Attack surfaces & vulnerabilities considered

| Surface | Finding | Severity |
|---|---|---|
| `dangerouslySetInnerHTML` (2 sites in layout.tsx) | theme script (static literal, deleted in M2) and JSON-LD (`JSON.stringify` of static config values — not user input; XSS only if repo itself is compromised, which is TB1 anyway) | Informational after deletion of theme script; M8 audit keeps exactly one static-config instance |
| External links (GitHub/LinkedIn/mailto from siteConfig) | tabnabbing if `target=_blank` without `rel` — M5 mechanical grep enforces `rel="noopener noreferrer"` | Low, mitigated in plan |
| Lenis/GSAP scroll wiring | no network calls; DOM-only; no sinks accepting external strings | None |
| Images | local `public/` files only; `unoptimized` export loader adds no remote fetch | None |
| `public/_headers` CSP (found at quality review F4) | shipped policy still grants `connect-src https://api.github.com https://api.web3forms.com` and `img-src …avatars.githubusercontent.com` to consumers the plan deletes — dead grants are attack-surface drift if any future code re-uses the origin allowance | Minor; remediated in PRP M2 step 6 (connect-src 'self', img-src trimmed, header diff reviewed) |
| sitemap/robots/manifest | generated from static config | None |
| Build-time secret leakage | no secrets exist in repo; `.env*` gitignored. Shipped-code env reads today: `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (contact-client — client-exposed public form key, not a secret; file deleted with its route dir at M2 step 4, timing per N5) and `NEXT_PUBLIC_BASE_PATH: ''` inlined via `next.config.ts` `env` block (dead after M2/M4 rewrites; block deleted at M8 with grep gate — PRP M2/M8, finding F7). `NODE_ENV` is build-config only. No secret value can appear in the bundle because none exists to inline | None after M2/M8 close-out |

## 4. Threat agents & capabilities

- **Internet anonymous**: cannot write anywhere (no endpoints); can only serve as victim of a compromised bundle. Achieves nothing directly.
- **Supply-chain attacker (malicious npm release/version)**: can inject code into the bundle via TB2. Capability ceiling: any code runnable at build; mitigations: pinned exact versions at published-current releases (verified 2026-09-27 via `npm view`), +2 deps only, review of `package.json`/lockfile diff per milestone commit.
- **Repo contributor / compromised developer account**: full site-content and JS control (TB1). Mitigations: branch protection, per-milestone small diffs, no long-lived branches with hidden changes, owner review before Phase 7 merge; risk accepted as inherent to any static host — equivalent adversary already reachable via Cloudflare dashboard credentials.
- **Cloudflare account compromise**: replaces the served artifact (TB3). Out of app scope; operational note in Phase 7 (account hygiene: 2FA, API-token minimization).
- **Physical/network MITM**: HTTPS at edge; no mixed-origin assets fetched at runtime; residual risk low.

## 5. Invariants (must hold at ship)

1. Zero runtime untrusted-input sinks: no Server Actions, no route handlers, no middleware, no forms (verified by `out/` shape + code grep in M8).
2. Every `target=_blank` anchor carries `rel="noopener noreferrer"` (M5 automated check).
3. Exactly one `dangerouslySetInnerHTML` remains (JSON-LD, static config) (M8 grep).
4. No secrets in the bundle; the only env interpolation is the public non-secret `NEXT_PUBLIC_BASE_PATH: ''` in next.config.ts (build-time inlined constant, verified as such at quality review) — M8 greps for any other `process.env` reference reaching the client.
5. Lockfile delta for the whole build = +gsap +lenis, lucide-react bump, −packages left import-free by the rebuild (next-themes, react-hook-form, zod at time of writing; `npx depcheck`-confirmed in M2 step 5) — nothing else (D-4.3; verified at M0/M2/M8).

## 6. ASVS mapping & verdict

ASVS L1 hygiene items relevant (V2 auth: N/A — no authentication; V5 validation: N/A — no input; V14 config/build: applied via artifact checks above). No security-sensitive feature exists, so L1-with-no-exceptions is the ceiling; the security review in Phase 6 verifies invariants 1–5 with commands, not assertion. Overall risk posture: LOW; primary residual = supply chain (TB2), mitigated by pinning + minimal-delta policy. This file satisfies the Phase 4 G14 security-planning artifact; `has_security_surface` is effectively false at runtime, documented as a negative-surface threat model per the gate's N/A allowance.
