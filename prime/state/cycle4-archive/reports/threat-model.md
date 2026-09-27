# Threat Model — Portfolio (Cycle 4 changes) — prime/reports/threat-model.md

System: fully static SSG site (`output: 'export'`) served via Cloudflare Pages (`portfolio-8af.pages.dev`); client-side GitHub REST fetches (unauthenticated, public data); `mailto:` contact + client-side form UX (no server endpoint added this cycle).

## Trust Boundaries
1. Browser ↔ Cloudflare edge: HTTPS, no cookies/sessions, no server code → minimal boundary.
2. Browser ↔ api.github.com: unauthenticated third-party read; responses render as text only.
3. Build machine → repo: source content is owner-controlled; PRIME artifacts stay in `prime/`, not served.
4. Owner data → public content: trust boundary enforced by fact-whitelist (leaking unpublished/private facts is the site's real risk class).

## Attack Surfaces & Threats (new/changed this cycle)
| Surface | Threat | Adversary capability | Control |
|---|---|---|---|
| Project links (data-driven `<a href>`) | Malicious/incorrect external redirect, `target=_blank` reverse tabnabbing | Low (requires repo commit) | URLs restricted to whitelist W-ids; all external links `rel="noopener noreferrer"`; code review at M5 link sweep |
| GitHub API client fetches | Availability/privacy: rate-limit outage; no PII sent | Network observer / GitHub outage | Existing React Query error states; no auth tokens; degrade silently to empty states |
| Static content injection (XSS) | Owner-authored data rendered by React; JSX escapes by default. Diagram prose must never be HTML-loaded | Only compromised-dev supply chain | No `dangerouslySetInnerHTML` allowed in new components — enforced mechanically at M5 (scripted grep, finding 6); no user input parsing |
| Sitemap/metadata | Information disclosure of unpublished routes | Crawler | Only public routes listed; no preview/internal paths (threat-model review confirmed none added) |
| Reputation/fabrication | False claims presented as facts (metrics/repos) | Author error, not adversary | REQ-11 whitelist + Verify conformance grep; explicit NOT-whitelisted list |
| Supply chain | New dependency risk | Typosquat/compromise | Plan constraint: zero new production deps |

## Non-goals / Residual risk
- No auth, no DB, no forms to server, no cookies → OWASP server classes N/A (documented, not assumed).
- Cloudflare `_headers` file unchanged this cycle; CSP hardening recorded as follow-up (pre-existing posture, out of repositioning scope).
- Availability of `mailto:` fallback only = accepted for a portfolio.
Conclusion: change set is content/presentation only; no new high-risk surface if link discipline + no-HTML-injection rules hold. ASVS level 1 posture sufficient for Verify phase (no auth/payments/PII processing).
