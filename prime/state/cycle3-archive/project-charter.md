# Project Charter — Portfolio Polish

## Project Identity
- **Name:** Portfolio Polish
- **Tier:** 1 (Brownfield enhancement — existing static site)
- **Approach:** Brownfield / Polish
- **Quality Mode:** Polish (deep refinement + S.U.P.E.R. audits)
- **Execution:** Automatic (Autopilot-style with checkpoint gates)

## Tech Stack
- Next.js 16.2.10 (App Router, static export)
- React 19.2.4
- TypeScript ^5
- Tailwind CSS ^4
- Framer Motion 12.42.2
- tsParticles 4.3.1
- TanStack React Query 5.101.2
- Deployed: Cloudflare Pages (https://portfolio-8af.pages.dev)

## Problem Statement
The portfolio site is functional but has quality gaps across accessibility, performance, SEO, TypeScript strictness, and code polish. These issues reduce the site's effectiveness as a professional showcase.

## Primary Persona
- **Manolito Almaden Jr. (Lito_016)** — AI Solution Developer showcasing work to potential employers, clients, and collaborators.

## Audit Findings (Phase 1 Discover)

### Code Quality
1. `as any` cast in contact form resolver (contact/page.tsx:26)
2. Contact form POSTs to `/api/contact` but site is static export — API routes don't work
3. Cover image uses native `<img>` instead of Next.js `<Image>` (hero.tsx:15)
4. Global `* { transition: ... }` on all properties causes unnecessary repaints

### Accessibility (WCAG 2.1 AA)
5. Only 15 ARIA attributes across entire codebase — insufficient for 20+ pages
6. Missing `aria-label` on theme toggle, back-to-top, error boundary buttons
7. No `role="alert"` on form error messages
8. Missing focus trap in mobile navigation menu
9. Color contrast: `text-muted-foreground` (#64748b on white) passes AA but borderline for small text

### SEO
10. No JSON-LD structured data (Person, WebSite schemas)
11. `siteConfig.url` points to `manolito016.dev` (no DNS) — should reference actual deployment URL
12. Missing `alternate` language hints
13. No OpenGraph type for individual pages

### Performance
14. tsParticles loads on every page — could be lazy-loaded or route-gated
15. `react-icons` imports pull entire icon libraries (mitigated by `optimizePackageImports`)
16. No `<link rel="preload">` for critical fonts/images
17. Global transition on `*` selector forces style recalc on every element

### Reliability
18. GitHub API calls have no retry logic
19. No error boundary wrapping around component tree
20. Contact form silently fails (empty catch block)

## Improvement Scope (7 improvements for Polish mode)
1. **TypeScript strictness** — Remove `as any`, fix contact form for static export
2. **Accessibility hardening** — ARIA labels, focus management, roles, keyboard nav
3. **SEO enhancement** — JSON-LD structured data, fix site URL, per-page OG types
4. **Performance optimization** — Lazy-load particles, remove global `*` transition, preload critical assets
5. **Error handling** — Retry logic for GitHub API, proper error boundaries, user feedback on contact form
6. **Image optimization** — Convert `<img>` to Next.js `<Image>`, add preload hints
7. **Code polish** — Consistent patterns, remove dead code, improve component composition

## Integration Registry
| Tool | Phase | Purpose |
|---|---|---|
| context7 MCP | 5, 6 | Library docs lookup during build/verify |
| playwright MCP | 6 | Visual verification of changes |
| genui MCP | 3 | Design previews if needed |

## Depth Profile
- Phase 2: Deep (full requirements spec + PRD)
- Phase 3: Deep (architecture audit + design system review)
- Phase 4: Deep (full PRP + execution plan)
- Phase 5: Deep (implementation with S.U.P.E.R. side audits)
- Phase 6: Deep (14 quality gates + Playwright verification)
- Phase 7: Deep (full docs + deployment + retro)
