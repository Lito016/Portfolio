# Feature Matrix — Portfolio Polish

> **Version:** 1.0
> **Date:** 2026-08-25
> **Source:** Requirements Spec FR-001 through FR-021

---

## 1. Matrix Overview

| ID | Improvement Area | Description | Files Affected | Dependencies | Risk | Effort | Audit # |
|---|---|---|---|---|---|---|---|
| FR-001 | TypeScript Strictness | Remove `as any` cast from zodResolver | `src/app/contact/page.tsx` | None | Low | S | #1 |
| FR-002 | TypeScript Strictness | Fix contact form for static export | `src/app/contact/page.tsx` | FR-001 (should fix types first) | Medium | M | #2 |
| FR-003 | TypeScript Strictness | Type-safe Zod schema integration | `src/app/contact/page.tsx` | FR-001 | Low | S | #1 |
| FR-004 | Accessibility | Add `role="alert"` to form errors | `src/app/contact/page.tsx` | None | Low | S | #7 |
| FR-005 | Accessibility | Accessible names on error buttons | `src/components/shared/error-boundary.tsx`, `src/app/error.tsx`, `src/app/not-found.tsx` | None | Low | S | #6 |
| FR-006 | Accessibility | Focus trap in mobile navigation | `src/components/layout/header.tsx` | None | Medium | M | #8 |
| FR-007 | Accessibility | Fix muted-foreground contrast | `src/app/globals.css` | None | Low | S | #9 |
| FR-008 | Accessibility | Expand ARIA coverage site-wide | Multiple components (see §2) | FR-004, FR-005 | Low | M | #5 |
| FR-009 | SEO | Add JSON-LD structured data | `src/app/layout.tsx` | FR-010 (URL must be correct first) | Low | M | #10 |
| FR-010 | SEO | Fix siteConfig.url | `src/config/site.ts` | None | Low | S | #11 |
| FR-011 | SEO | Per-page OpenGraph types | `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`, other page files | FR-010 | Low | M | #13 |
| FR-012 | SEO | Add hreflang alternate hints | `src/app/layout.tsx` | FR-010 | Low | S | #12 |
| FR-013 | Performance | Lazy-load tsParticles | `src/components/shared/particles.tsx`, `src/components/providers.tsx` | None | Low | M | #14 |
| FR-014 | Performance | Remove global `*` transition | `src/app/globals.css` | None | Low | S | #4, #17 |
| FR-015 | Performance | Add preload hints | `src/app/layout.tsx` | None | Low | S | #16 |
| FR-016 | Reliability | GitHub API retry logic | `src/lib/github/api.ts` | None | Low | M | #18 |
| FR-017 | Reliability | ErrorBoundary wraps component tree | `src/app/layout.tsx` | None | Medium | S | #19 |
| FR-018 | Reliability | Visible contact form feedback | `src/app/contact/page.tsx` | FR-002 | Low | S | #20 |
| FR-019 | Image Optimization | Convert cover `<img>` to `<Image>` | `src/components/sections/hero.tsx` | None | Low | S | #3 |
| FR-020 | Code Polish | Verify react-icons tree-shaking | `next.config.ts`, verify imports across `src/` | None | Low | S | #15 |
| FR-021 | Code Polish | Remove dead code, lint compliance | Multiple files (see §3) | All other FRs (run last) | Low | S | General |

---

## 2. Detailed File Impact Map

### High-Impact Files (modified by 3+ requirements)

| File | Requirements | Changes |
|---|---|---|
| `src/app/contact/page.tsx` | FR-001, FR-002, FR-003, FR-004, FR-018 | Remove `as any`; fix form submission; add type-safe resolver; add `role="alert"` + `aria-describedby` to errors; add visible error/success UI |
| `src/app/layout.tsx` | FR-009, FR-012, FR-015, FR-017 | Add JSON-LD script; add hreflang links; add preload hints; wrap children with `<ErrorBoundary>` |
| `src/app/globals.css` | FR-007, FR-014 | Fix `--muted-foreground` color value; remove `* { transition: ... }` rule |

### Medium-Impact Files (modified by 2 requirements)

| File | Requirements | Changes |
|---|---|---|
| `src/components/providers.tsx` | FR-013 | Defer ParticlesProvider initialization; dynamic import pattern |
| `src/components/layout/header.tsx` | FR-006, FR-008 | Add focus trap logic to mobile nav; expand ARIA attributes on nav elements |

### Low-Impact Files (modified by 1 requirement)

| File | Requirements | Changes |
|---|---|---|
| `src/config/site.ts` | FR-010 | Change `url` from `manolito016.dev` to `portfolio-8af.pages.dev`; update `ogImage` |
| `src/components/shared/error-boundary.tsx` | FR-005 | Add `aria-label` to "Try again" button |
| `src/app/error.tsx` | FR-005 | Add `aria-label` to "Try again" button |
| `src/app/not-found.tsx` | FR-005 | Verify buttons have accessible names (already have visible text) |
| `src/components/sections/hero.tsx` | FR-019 | Replace `<img>` with `<Image>` for cover; add width/height/priority |
| `src/lib/github/api.ts` | FR-016 | Add retry wrapper with exponential backoff to `githubFetch` |
| `src/components/shared/particles.tsx` | FR-013 | Convert to dynamically-imported component |
| `src/app/blog/[slug]/page.tsx` | FR-011 | Add `og:type: 'article'` metadata |
| `next.config.ts` | FR-020 | Verify `optimizePackageImports` includes `react-icons` (already present) |

---

## 3. Components Requiring ARIA Expansion (FR-008)

The following components need additional ARIA attributes to reach the ≥30 target:

| Component | Current ARIA Count | Needed Additions |
|---|---|---|
| `header.tsx` | 3 (`aria-label` on nav, menu button) | Add `role="banner"` to `<header>`, `aria-current="page"` on active nav link |
| `footer.tsx` | 0 | Add `role="contentinfo"`, `aria-label` on social links |
| `page-transition.tsx` | 0 | Add `aria-hidden` during exit animation |
| `section-heading.tsx` | 0 | Already uses semantic `<h2>`/`<h3>` — verify heading hierarchy |
| `stats-overview.tsx` | 0 | Add `aria-label` to stat items, `role="list"` |
| `featured-projects.tsx` | 0 | Add `role="region"` with `aria-label`, card link semantics |
| `tech-stack-marquee.tsx` | 0 | Add `aria-label="Technology stack"`, `aria-hidden` on decorative icons |
| `back-to-top.tsx` | 1 (`aria-label`) | Already sufficient |
| `theme-toggle.tsx` | 1 (`aria-label`) | Add `role="switch"` with `aria-checked` |
| `error-boundary.tsx` | 0 | Add `role="alert"` to error container |
| `loading-skeleton.tsx` | 0 | Add `aria-busy="true"` and `aria-label="Loading"` |
| `empty-state.tsx` | 0 | Add `role="status"` with descriptive `aria-label` |

**Projected total after FR-008:** ~35-40 ARIA attributes across the codebase (exceeds ≥30 target).

---

## 4. Dependency Graph

```
FR-010 (Fix URL) ──────────────────┬──→ FR-009 (JSON-LD)
                                    ├──→ FR-011 (OG types)
                                    └──→ FR-012 (hreflang)

FR-001 (Remove as any) ──→ FR-003 (Type-safe resolver) ──→ FR-002 (Fix form submission)
                                                                  │
                                                                  └──→ FR-018 (Visible feedback)

FR-004 (role="alert") ──┐
                         ├──→ FR-008 (Expand ARIA site-wide)
FR-005 (Button names) ──┘

FR-014 (Remove * transition) ──┐
                                ├──→ FR-021 (Lint + dead code — run LAST)
FR-013 (Lazy-load particles) ──┘

FR-019 (Cover image) ──→ (independent)
FR-016 (API retry) ──→ (independent)
FR-017 (ErrorBoundary wrap) ──→ (independent)
FR-006 (Focus trap) ──→ (independent)
FR-007 (Color contrast) ──→ (independent)
FR-015 (Preload hints) ──→ (independent)
FR-020 (Tree-shaking verify) ──→ (independent)
```

### Recommended Execution Order

| Phase | Requirements | Rationale |
|---|---|---|
| **Phase A: Foundation** | FR-010, FR-014, FR-007 | Quick wins; fix URL and CSS before building on them |
| **Phase B: TypeScript + Form** | FR-001 → FR-003 → FR-002 → FR-004 → FR-018 | Sequential dependency chain; form is highest-priority bug |
| **Phase C: Reliability** | FR-016, FR-017 | Independent; improve error handling |
| **Phase D: Accessibility** | FR-005 → FR-006 → FR-008 | Build from specific fixes to broad ARIA expansion |
| **Phase E: SEO** | FR-009, FR-011, FR-012 | Depend on FR-010 (URL fix) |
| **Phase F: Performance** | FR-013, FR-015 | Independent optimizations |
| **Phase G: Images + Polish** | FR-019, FR-020 → FR-021 | Image fix; then final lint/dead-code cleanup last |

---

## 5. Risk Assessment per Requirement

### Low Risk (12 requirements)
FR-001, FR-003, FR-004, FR-005, FR-007, FR-008, FR-009, FR-010, FR-012, FR-014, FR-015, FR-016, FR-018, FR-019, FR-020

These are localized changes with clear before/after states. They modify specific lines or add new attributes without altering component behavior or visual design.

### Medium Risk (4 requirements)
- **FR-002** (Contact form fix): Choosing wrong external service could break form; need to test on deployed static build
- **FR-006** (Focus trap): Interaction between focus management and Framer Motion's `AnimatePresence` could cause focus jumps or animation glitches
- **FR-013** (Lazy-load particles): Changing provider initialization order could cause hydration mismatches or flash of unstyled content
- **FR-017** (ErrorBoundary wrap): Wrapping the entire component tree could catch errors that should propagate to Next.js's own error handling

### High Risk (0 requirements)
No requirements are classified as high risk. The most impactful change (removing global `*` transition) is low risk because `next-themes` already has `disableTransitionOnChange` enabled.

---

## 6. Effort Estimates

| Size | Count | Requirements | Avg. Time |
|---|---|---|---|
| **Small (S)** | 13 | FR-001, FR-003, FR-004, FR-005, FR-007, FR-010, FR-012, FR-014, FR-015, FR-017, FR-018, FR-019, FR-020 | 15-30 min each |
| **Medium (M)** | 8 | FR-002, FR-006, FR-008, FR-009, FR-011, FR-013, FR-016 | 30-60 min each |
| **Large (L)** | 0 | — | — |

**Total estimated effort:** ~7-10 hours of focused implementation work.

---

## 7. Verification Checklist

After all requirements are implemented, run this checklist:

- [ ] `npx tsc --noEmit` passes with zero errors (FR-001, FR-003)
- [ ] `grep -rn "as any" src/` returns zero matches (FR-001)
- [ ] Contact form submits successfully on deployed static site (FR-002, FR-018)
- [ ] No fetch to `/api/contact` in network tab (FR-002)
- [ ] Form errors have `role="alert"` and `aria-describedby` (FR-004)
- [ ] All error/not-found buttons have accessible names (FR-005)
- [ ] Mobile nav focus trap works: Tab cycles, Escape closes (FR-006)
- [ ] `--muted-foreground` on `--background` ≥ 4.5:1 contrast (FR-007)
- [ ] `grep -r "aria-" src/ | wc -l` ≥ 30 (FR-008)
- [ ] Google Rich Results Test validates JSON-LD (FR-009)
- [ ] `grep "manolito016.dev" src/` returns zero matches (FR-010)
- [ ] Each page has page-specific `og:type` meta tag (FR-011)
- [ ] `<link rel="alternate" hreflang="en">` present (FR-012)
- [ ] Particles JS loaded async in Network tab (FR-013)
- [ ] No `* { transition }` rule in globals.css (FR-014)
- [ ] `<link rel="preload">` for fonts and hero image present (FR-015)
- [ ] GitHub API retries on simulated 503 (FR-016)
- [ ] ErrorBoundary catches injected error and shows fallback (FR-017)
- [ ] Cover image uses `<Image>` component (FR-019)
- [ ] `npm run lint` exits with zero warnings (FR-021)
- [ ] Lighthouse Performance ≥ 90 (NFR-001)
- [ ] Lighthouse Accessibility ≥ 95 (NFR-002)
- [ ] Lighthouse SEO ≥ 95 (NFR-001)
- [ ] `npm run build` succeeds with `output: 'export'` (NFR-003)
- [ ] No new dependencies in `package.json` (NFR-004)
- [ ] Glassmorphism design visually preserved (NFR-005)
