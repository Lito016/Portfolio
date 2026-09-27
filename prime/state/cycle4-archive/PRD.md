# Product Requirements Document — Portfolio Polish

> **Product:** Portfolio Site (https://portfolio-8af.pages.dev)
> **Version:** 1.0
> **Date:** 2026-08-25
> **Author:** PRIME Requirements Agent
> **Status:** Draft — Pending User Approval
> **Mode:** Polish (Tier 1 Brownfield)

---

## 1. Problem Statement

Manolito Almaden Jr.'s portfolio site is a functional Next.js 16 static site deployed on Cloudflare Pages. While the site showcases projects, skills, and GitHub activity effectively, a comprehensive Phase 1 audit identified **20 quality gaps** across five dimensions:

- **Code Quality:** TypeScript type safety violations, a broken contact form (POSTs to a non-existent API route in a static export), suboptimal image handling, and a CSS performance anti-pattern.
- **Accessibility:** Insufficient ARIA coverage (only 15 attributes across 25+ components), missing focus management in the mobile navigation, form errors not announced to screen readers, and borderline color contrast for secondary text.
- **SEO:** No structured data (JSON-LD), metadata URLs pointing to an unresolvable domain (`manolito016.dev`), missing per-page OpenGraph types, and no alternate language hints.
- **Performance:** tsParticles loads on every page regardless of need, a global CSS transition on the `*` selector forces style recalculation on every DOM element, and no preload hints for critical assets.
- **Reliability:** GitHub API calls fail without retry, no error boundary wraps the component tree, and the contact form fails silently with an empty catch block.

These gaps reduce the site's effectiveness as a professional showcase, hurt search engine discoverability, create barriers for users with disabilities, and introduce fragile failure modes.

---

## 2. Goals

| # | Goal | Measurable Outcome |
|---|---|---|
| G1 | Eliminate all code quality anti-patterns | Zero `as any` casts; zero broken API calls; `tsc --strict` passes |
| G2 | Achieve WCAG 2.1 AA compliance | Zero critical/serious axe-core violations; ≥ 30 ARIA attributes site-wide |
| G3 | Maximize search engine discoverability | JSON-LD validates in Rich Results Test; all metadata URLs resolve correctly |
| G4 | Optimize rendering performance | Lighthouse Performance ≥ 90; no global `*` transition; particles lazy-loaded |
| G5 | Harden reliability and error recovery | GitHub API retries on transient failure; ErrorBoundary catches render errors; visible form feedback |
| G6 | Maintain design system integrity | Glassmorphism utilities preserved; visual regression < 5% |

---

## 3. Success Metrics

| Metric | Baseline (Pre-Polish) | Target (Post-Polish) | Measurement Tool |
|---|---|---|---|
| Lighthouse Performance | ~75-85 (est.) | ≥ 90 | Lighthouse CLI |
| Lighthouse Accessibility | ~70-80 (est.) | ≥ 95 | Lighthouse CLI |
| Lighthouse SEO | ~70-80 (est.) | ≥ 95 | Lighthouse CLI |
| axe-core Critical Violations | Unknown (likely >0) | 0 | axe DevTools |
| ARIA Attribute Count | 15 | ≥ 30 | `grep -r "aria-" src/` |
| `as any` Cast Count | 1+ | 0 | `grep -r "as any" src/` |
| Contact Form Functional | ❌ Broken | ✅ Working | Manual test on deployed site |
| JSON-LD Valid | ❌ Missing | ✅ Valid | Google Rich Results Test |
| Correct Metadata URL | ❌ manolito016.dev | ✅ portfolio-8af.pages.dev | View source |
| Global `*` Transition | ❌ Present | ✅ Removed | CSS audit |
| GitHub API Retry | ❌ None | ✅ 3 retries w/ backoff | Network throttling test |
| ErrorBoundary Coverage | ❌ None | ✅ Full tree | Error injection test |
| First Load JS (bytes) | Baseline TBD | ≤ 105% of baseline | `next build` output |

---

## 4. User Stories

### Primary Persona: Site Visitor (Recruiter / Client / Collaborator)

| ID | Story | Priority |
|---|---|---|
| US-01 | As a visitor using a screen reader, I want form errors announced automatically so I can correct them without visual inspection. | Must |
| US-02 | As a keyboard-only user, I want the mobile menu to trap focus when open so I don't lose my place. | Should |
| US-03 | As a visitor on a slow connection, I want the page content to load before decorative animations so I see useful content quickly. | Should |
| US-04 | As a visitor who wants to contact Manolito, I want the contact form to actually work so I can send a message. | Must |
| US-05 | As a visitor who encounters an error, I want to see a friendly error page with a retry option instead of a blank screen. | Must |
| US-06 | As a visitor reading secondary text, I want sufficient color contrast so I can read all content comfortably. | Should |

### Secondary Persona: Site Owner (Manolito)

| ID | Story | Priority |
|---|---|---|
| US-07 | As the site owner, I want search engines to understand my identity via structured data so rich results display my profile. | Should |
| US-08 | As the site owner, I want all metadata URLs to point to my actual deployment so shared links work correctly. | Must |
| US-09 | As the site owner, I want GitHub stats to load reliably even during transient API issues so my profile data is always visible. | Must |
| US-10 | As a developer maintaining this site, I want strict TypeScript types so I catch errors at compile time. | Must |

---

## 5. Scope Boundaries

### In Scope

| Area | What's Included |
|---|---|
| TypeScript strictness | Remove `as any` cast, fix type-safe form resolver |
| Contact form | Fix broken submission for static export, add error/success feedback |
| Accessibility | ARIA attributes, focus trap, color contrast, role="alert", accessible names |
| SEO | JSON-LD (Person + WebSite), fix site URL, per-page OG types, hreflang |
| Performance | Lazy-load particles, remove global transition, add preload hints |
| Reliability | GitHub API retry, ErrorBoundary wrapping, visible form feedback |
| Images | Convert cover `<img>` to Next.js `<Image>` |
| Code polish | Verify tree-shaking, lint compliance, consistent patterns |

### Out of Scope

| Area | Reason |
|---|---|
| New pages or routes | Polish mode — no new content areas |
| Design system overhaul | Must preserve glassmorphism; only fix bugs within it |
| New npm dependencies | Constraint: no new packages unless absolutely necessary |
| Server-side features | Static export constraint — no API routes, middleware, or SSR |
| Content changes | No text, image, or layout content modifications |
| New third-party integrations | No analytics, CMS, or comment systems |
| Custom domain setup | URL fix references current deployment; DNS is separate concern |
| E2E test suite | Verification via manual testing and Lighthouse, not automated E2E |
| Multi-language support | hreflang tags added for `en` only; full i18n is out of scope |

---

## 6. Constraints

| Constraint | Impact | Mitigation |
|---|---|---|
| **Static export only** (`output: 'export'`) | No API routes, no server-side data fetching, no middleware | Contact form must use external service or mailto: |
| **Cloudflare Pages deployment** | Must work within Cloudflare's static hosting capabilities | All assets must be self-contained in `out/` directory |
| **No new npm dependencies** | Cannot add new packages without justification | Use existing stack: Next.js 16, React 19, Tailwind 4, Framer Motion, TanStack Query |
| **Glassmorphism design system** | Cannot remove or fundamentally alter visual design | All CSS changes must preserve `.glass-card`, `.gradient-text`, color palette |
| **Next.js 16 + React 19** | Must use App Router patterns; React 19 APIs | Leverage `next/dynamic`, `next/image`, metadata API |
| **Tailwind CSS 4** | Must use v4 syntax and `@theme` directives | No v3-era `@apply` patterns for new utilities |
| **Autopilot execution** | Minimal user interaction; decisions made by agent with checkpoint gates | Document all decisions in ADRs; surface only blocking decisions |

---

## 7. Requirements Summary

This PRD is fulfilled by **21 functional requirements** and **8 non-functional requirements** detailed in the companion [Requirements Specification](./requirements-spec.md).

### Priority Distribution

| Priority | Count | Description |
|---|---|---|
| **Must** | 11 | Critical fixes — site is broken, non-compliant, or unreliable without these |
| **Should** | 7 | Important quality improvements — significantly enhance user experience |
| **Could** | 3 | Nice-to-have — polish on top of polish |

### Improvement Area Summary

| Area | Requirements | Audit Findings Addressed |
|---|---|---|
| TypeScript Strictness | FR-001, FR-002, FR-003 | #1, #2 |
| Accessibility | FR-004, FR-005, FR-006, FR-007, FR-008 | #5, #6, #7, #8, #9 |
| SEO | FR-009, FR-010, FR-011, FR-012 | #10, #11, #12, #13 |
| Performance | FR-013, FR-014, FR-015 | #4, #14, #16, #17 |
| Reliability | FR-016, FR-017, FR-018 | #18, #19, #20 |
| Image Optimization | FR-019 | #3 |
| Code Polish | FR-020, FR-021 | #15, General |

---

## 8. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Contact form external service adds dependency | Medium | Low | Use Formspree free tier (no JS SDK needed); fallback to mailto: |
| Removing global `*` transition breaks theme switch UX | Low | Medium | `next-themes` has `disableTransitionOnChange` already enabled; test theme toggle visually |
| Focus trap conflicts with Framer Motion animations | Medium | Low | Implement focus trap with `useEffect` + keydown handler; test with AnimatePresence |
| Lazy-loading particles delays visual effect | Low | Low | Particles are decorative; content loads first (improved UX); particles fade in after |
| JSON-LD validation fails on deployed URL | Low | Low | Test with Google Rich Results Test before merge; schema is static data |
| Color contrast change alters design appearance | Medium | Low | Darken `--muted-foreground` by ~10%; verify glassmorphism still looks correct |

---

## 9. Assumptions

1. The deployed URL `https://portfolio-8af.pages.dev` is the canonical production URL for the foreseeable future.
2. Formspree or a similar free form endpoint service is acceptable for contact form delivery.
3. The site is English-only; hreflang `en` and `x-default` are sufficient.
4. Geist Sans and Geist Mono are the only custom fonts requiring preload.
5. The cover image (`/cover.png`) is a static asset in the `public/` directory.
6. GitHub API rate limits (60/hr unauthenticated) are acceptable for the site's traffic volume.

---

## 10. Approval

| Role | Name | Status | Date |
|---|---|---|---|
| Product Owner | Manolito Almaden Jr. | ⏳ Pending | — |
| Requirements Agent | PRIME architect | ✅ Complete | 2026-08-25 |
