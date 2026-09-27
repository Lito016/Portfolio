# Requirements Specification — Portfolio Polish

> **Version:** 1.0
> **Date:** 2026-08-25
> **Status:** Draft — Pending User Approval
> **Source:** Phase 1 Audit Findings (20 quality gaps)

---

## 1. Functional Requirements

### IA-1: TypeScript Strictness

#### FR-001: Remove `as any` Cast from Contact Form Resolver
- **Audit Finding:** #1 — `as any` cast in contact form resolver (contact/page.tsx:26)
- **User Story:** As a developer, I want type-safe form validation so that schema changes are caught at compile time.
- **Acceptance Criteria:**
  - GIVEN the contact form component (`src/app/contact/page.tsx`)
  - WHEN the TypeScript compiler runs (`npx tsc --noEmit`)
  - THEN zero `as any` casts exist in the file
  - AND the zodResolver is properly typed without type assertions
- **Priority:** Must
- **Source:** Pain Point #1
- **Verification:** `grep -rn "as any" src/` returns zero matches; `tsc --noEmit` passes with no errors

#### FR-002: Fix Contact Form Submission for Static Export
- **Audit Finding:** #2 — Contact form POSTs to `/api/contact` but site is static export; API routes don't work
- **User Story:** As a site visitor, I want the contact form to actually deliver my message so that I can reach the site owner.
- **Acceptance Criteria:**
  - GIVEN a visitor fills out the contact form with valid data
  - WHEN they click "Send Message"
  - THEN the form data is transmitted via an external form endpoint (e.g., Formspree, getform.io) OR a `mailto:` fallback
  - AND no fetch request is made to `/api/contact`
  - AND the form works correctly when deployed as a static export (`output: 'export'`)
- **Priority:** Must
- **Source:** Pain Point #2
- **Verification:** Network tab shows no request to `/api/contact`; form submission succeeds in static build deployed to Cloudflare Pages

#### FR-003: Type-Safe Zod Schema Integration
- **Audit Finding:** #1 (root cause) — zodResolver type incompatibility workaround
- **User Story:** As a developer, I want the form resolver to be fully type-safe so that form data types match the Zod schema automatically.
- **Acceptance Criteria:**
  - GIVEN the contact form's Zod schema (`contactSchema`)
  - WHEN the form's `useForm` hook is configured
  - THEN the resolver is typed as `zodResolver(contactSchema)` without any cast
  - AND the inferred `ContactForm` type matches the schema exactly
- **Priority:** Must
- **Source:** Pain Point #1
- **Verification:** `tsc --noEmit --strict` passes; no type assertions in form setup

---

### IA-2: Accessibility Hardening (WCAG 2.1 AA)

#### FR-004: Add `role="alert"` to Form Error Messages
- **Audit Finding:** #7 — No `role="alert"` on form error messages
- **User Story:** As a screen reader user, I want form validation errors announced immediately so that I know what went wrong without manually discovering them.
- **Acceptance Criteria:**
  - GIVEN the contact form has validation errors
  - WHEN the errors are rendered in the DOM
  - THEN each error message element has `role="alert"` and `aria-live="polite"`
  - AND the error message is programmatically associated with its input via `aria-describedby`
- **Priority:** Must
- **Source:** Pain Point #7
- **Verification:** axe-core audit passes; inspecting form error elements shows `role="alert"` attribute; screen reader announces errors on form submission

#### FR-005: Add Accessible Names to Error Boundary Buttons
- **Audit Finding:** #6 — Missing `aria-label` on error boundary buttons (actual gap: error-boundary.tsx and error.tsx)
- **User Story:** As a screen reader user, I want action buttons in error states to have clear labels so I understand what they do.
- **Acceptance Criteria:**
  - GIVEN the ErrorBoundary component fallback UI is displayed
  - WHEN a screen reader navigates to the "Try again" button
  - THEN the button has an accessible name via `aria-label` or button text content
  - AND the global error page (`error.tsx`) "Try again" button also has an accessible name
  - AND the not-found page buttons have accessible names
- **Priority:** Must
- **Source:** Pain Point #6
- **Verification:** axe-core audit passes for "Buttons must have discernible text"; all error/not-found buttons have visible text or aria-label

> **Note:** Code review found that `theme-toggle.tsx` and `back-to-top.tsx` already have proper `aria-label` attributes. The actual gap is in error-boundary.tsx and error.tsx.

#### FR-006: Implement Focus Trap in Mobile Navigation
- **Audit Finding:** #8 — Missing focus trap in mobile navigation menu
- **User Story:** As a keyboard-only user, I want focus to stay within the mobile menu when it's open so that I don't accidentally tab behind the menu overlay.
- **Acceptance Criteria:**
  - GIVEN the mobile navigation menu is open on a viewport < 768px
  - WHEN the user presses Tab repeatedly
  - THEN focus cycles through only the links and buttons within the mobile menu
  - AND pressing Escape closes the menu and returns focus to the menu toggle button
  - AND focus does not escape to the main content behind the menu
- **Priority:** Should
- **Source:** Pain Point #8
- **Verification:** Manual keyboard test: open mobile nav → Tab cycles within menu → Escape closes → focus returns to hamburger button

#### FR-007: Fix Color Contrast for Muted Foreground Text
- **Audit Finding:** #9 — `text-muted-foreground` (#64748b on white #f8f9fc) borderline for small text
- **User Story:** As a user with low vision, I want all text to meet WCAG AA contrast ratios so that I can read content comfortably.
- **Acceptance Criteria:**
  - GIVEN the light theme CSS variables
  - WHEN `--muted-foreground` is used on `--background`
  - THEN the contrast ratio is ≥ 4.5:1 for normal text (WCAG AA)
  - AND the contrast ratio is ≥ 3:1 for large text (WCAG AA)
  - AND the dark theme equivalent also meets these thresholds
- **Priority:** Should
- **Source:** Pain Point #9
- **Verification:** Contrast checker tool confirms `--muted-foreground` on `--background` ≥ 4.5:1 in both light and dark themes

#### FR-008: Expand ARIA Attribute Coverage Site-Wide
- **Audit Finding:** #5 — Only 15 ARIA attributes across entire codebase
- **User Story:** As a screen reader user, I want pages to have proper landmark roles and widget semantics so that I can navigate the site efficiently.
- **Acceptance Criteria:**
  - GIVEN the full component tree
  - WHEN an accessibility audit runs (axe-core or Lighthouse)
  - THEN the codebase has ≥ 30 ARIA attributes across all components
  - AND all interactive widgets (menus, dialogs, toggles) have appropriate ARIA roles
  - AND all landmark regions (`<header>`, `<main>`, `<nav>`, `<footer>`) have proper roles or semantic HTML
  - AND all images have meaningful `alt` text or `aria-hidden="true"` for decorative images
- **Priority:** Should
- **Source:** Pain Point #5
- **Verification:** `grep -r "aria-" src/ | wc -l` returns ≥ 30; axe-core audit shows zero critical ARIA violations

---

### IA-3: SEO Enhancement

#### FR-009: Add JSON-LD Structured Data
- **Audit Finding:** #10 — No JSON-LD structured data (Person, WebSite schemas)
- **User Story:** As a site owner, I want search engines to understand my site's identity so that rich results display correctly.
- **Acceptance Criteria:**
  - GIVEN the site's layout component
  - WHEN any page is rendered
  - THEN the HTML `<head>` contains a `<script type="application/ld+json">` block
  - AND the JSON-LD includes a `Person` schema with name, url, sameAs (social links), and jobTitle
  - AND the JSON-LD includes a `WebSite` schema with name, url, and description
- **Priority:** Should
- **Source:** Pain Point #10
- **Verification:** Google Rich Results Test (search.google.com/test/rich-results) validates Person + WebSite schemas with no errors

#### FR-010: Fix siteConfig.url to Actual Deployment URL
- **Audit Finding:** #11 — `siteConfig.url` points to `manolito016.dev` (no DNS) — should reference actual deployment URL
- **User Story:** As a site owner, I want all metadata URLs to point to the real deployment so that shared links work and SEO signals are correct.
- **Acceptance Criteria:**
  - GIVEN the site configuration (`src/config/site.ts`)
  - WHEN `siteConfig.url` is referenced by any component
  - THEN the value is `https://portfolio-8af.pages.dev` (or the production custom domain if configured)
  - AND `siteConfig.ogImage` uses the same base URL
  - AND all generated sitemap URLs use the correct domain
  - AND all robots.ts sitemap references use the correct domain
- **Priority:** Must
- **Source:** Pain Point #11
- **Verification:** `grep "manolito016.dev" src/` returns zero matches; sitemap.xml entries use `portfolio-8af.pages.dev`

#### FR-011: Add Per-Page OpenGraph Type Metadata
- **Audit Finding:** #13 — No OpenGraph type for individual pages
- **User Story:** As a site owner, I want each page to have appropriate OpenGraph metadata so that shared links render rich previews on social platforms.
- **Acceptance Criteria:**
  - GIVEN any page in the application (e.g., /about, /projects, /blog/[slug])
  - WHEN the page's HTML is rendered
  - THEN the `<head>` contains `<meta property="og:type" content="...">` with a page-appropriate value
  - AND the home page uses `og:type="website"`
  - AND blog post pages use `og:type="article"`
  - AND all pages include `og:title`, `og:description`, and `og:image` meta tags
- **Priority:** Should
- **Source:** Pain Point #13
- **Verification:** View page source for each route; confirm unique og:type values; Facebook Sharing Debugger validates metadata

#### FR-012: Add Alternate Language Hints
- **Audit Finding:** #12 — Missing `alternate` language hints
- **User Story:** As a site owner, I want hreflang tags so that search engines know the page language and region.
- **Acceptance Criteria:**
  - GIVEN the site layout component
  - WHEN any page is rendered
  - THEN the `<head>` contains `<link rel="alternate" hreflang="en" href="..." />`
  - AND the href value matches the current page's canonical URL
  - AND an `x-default` alternate is also provided
- **Priority:** Could
- **Source:** Pain Point #12
- **Verification:** View page source; confirm `<link rel="alternate" hreflang="en" ...>` and `hreflang="x-default"` present in `<head>`

---

### IA-4: Performance Optimization

#### FR-013: Lazy-Load tsParticles with Dynamic Import
- **Audit Finding:** #14 — tsParticles loads on every page; could be lazy-loaded or route-gated
- **User Story:** As a site visitor, I want the initial page load to be fast so that I see content quickly without waiting for decorative animations.
- **Acceptance Criteria:**
  - GIVEN a user navigates to any page
  - WHEN the page loads
  - THEN the tsParticles bundle is loaded asynchronously via `next/dynamic` with `ssr: false`
  - AND the main content is visible and interactive before particles finish loading
  - AND particles still render correctly after loading
  - AND the `ParticlesProvider` initialization is also deferred
- **Priority:** Should
- **Source:** Pain Point #14
- **Verification:** Chrome DevTools Network tab shows particles-related JS loaded with `async` priority or after DOMContentLoaded; Lighthouse "Reduce unused JavaScript" no longer flags tsparticles

#### FR-014: Remove Global `*` Transition Rule
- **Audit Finding:** #4, #17 — Global `* { transition: ... }` on all properties causes unnecessary repaints and forces style recalc on every element
- **User Story:** As a site visitor, I want smooth theme transitions without sacrificing rendering performance on every element.
- **Acceptance Criteria:**
  - GIVEN the global stylesheet (`globals.css`)
  - WHEN the page renders
  - THEN no CSS rule applies `transition` to the universal `*` selector
  - AND theme switching still produces a smooth visual transition (via `next-themes`' `disableTransitionOnChange` or scoped transition classes)
  - AND individual components retain their own targeted transitions (e.g., `transition-colors`, `transition-all` on specific elements)
- **Priority:** Must
- **Source:** Pain Point #4, #17
- **Verification:** `grep -n "^\*" src/app/globals.css` shows no transition property; Lighthouse "Avoid large layout shifts" and "Minimize main-thread work" scores improve; DevTools Rendering panel shows fewer style recalcs

#### FR-015: Add Preload Hints for Critical Assets
- **Audit Finding:** #16 — No `<link rel="preload">` for critical fonts/images
- **User Story:** As a site visitor, I want critical fonts and hero images to load early so that text and above-the-fold content render quickly.
- **Acceptance Criteria:**
  - GIVEN the site layout or page component
  - WHEN the HTML is rendered
  - THEN `<link rel="preload">` tags exist for:
    - Geist Sans font file (as `font`, with `crossorigin`)
    - Geist Mono font file (as `font`, with `crossorigin`)
    - Cover/hero image (as `image`)
  - AND preloaded resources have correct `as` attribute and `type`
- **Priority:** Should
- **Source:** Pain Point #16
- **Verification:** View page source; confirm `<link rel="preload" as="font" ... crossorigin>` for fonts and `<link rel="preload" as="image" ...>` for hero image; Lighthouse "Preload Largest Contentful Paint image" audit passes

---

### IA-5: Error Handling & Reliability

#### FR-016: Add Retry Logic with Exponential Backoff to GitHub API
- **Audit Finding:** #18 — GitHub API calls have no retry logic
- **User Story:** As a site visitor, I want GitHub stats to load reliably even when the API temporarily fails so that I see complete profile data.
- **Acceptance Criteria:**
  - GIVEN a GitHub API request fails with a transient error (429, 500, 502, 503, 504, or network error)
  - WHEN the `githubFetch` function handles the failure
  - THEN the request is retried up to 3 times with exponential backoff (delays: 1s, 2s, 4s)
  - AND non-transient errors (404, 403) are NOT retried
  - AND after all retries are exhausted, the error is thrown with a descriptive message
  - AND the total retry time does not exceed 10 seconds
- **Priority:** Must
- **Source:** Pain Point #18
- **Verification:** Unit test or manual test: simulate 503 response → observe 3 retries with increasing delays → final error thrown; simulate 404 → no retries; simulate success on 2nd retry → data returned

#### FR-017: Wrap Component Tree with ErrorBoundary
- **Audit Finding:** #19 — No error boundary wrapping around component tree
- **User Story:** As a site visitor, I want to see a friendly error page instead of a blank screen when a component crashes so that I can recover gracefully.
- **Acceptance Criteria:**
  - GIVEN a child component throws a rendering error
  - WHEN the error propagates up the component tree
  - THEN the `ErrorBoundary` component catches it and renders its fallback UI
  - AND the fallback UI includes a "Try again" button and a meaningful error message
  - AND the rest of the page (header, footer) remains functional
- **Priority:** Must
- **Source:** Pain Point #19
- **Verification:** Intentionally throw an error in a child component → ErrorBoundary fallback renders; header and footer remain visible; "Try again" button resets the error state

#### FR-018: Add User-Visible Feedback to Contact Form
- **Audit Finding:** #20 — Contact form silently fails (empty catch block)
- **User Story:** As a site visitor, I want to see clear feedback when my message fails to send so that I know what happened and can try again.
- **Acceptance Criteria:**
  - GIVEN a user submits the contact form
  - WHEN the submission fails (network error, service unavailable)
  - THEN a visible error message is displayed to the user (not just logged to console)
  - AND the error message has `role="alert"` for screen reader announcement
  - AND the user can retry the submission without losing their form data
  - AND on successful submission, a visible success confirmation is shown
- **Priority:** Must
- **Source:** Pain Point #20
- **Verification:** Disable network → submit form → visible error message appears; enable network → submit form → success message appears; error message has `role="alert"`

---

### IA-6: Image Optimization

#### FR-019: Convert Cover Image to Next.js `<Image>`
- **Audit Finding:** #3 — Cover image uses native `<img>` instead of Next.js `<Image>` (hero.tsx:15)
- **User Story:** As a site visitor, I want images optimized automatically so that they load fast on any device and connection speed.
- **Acceptance Criteria:**
  - GIVEN the hero section cover image
  - WHEN the page renders
  - THEN the cover image uses `next/image` `<Image>` component instead of native `<img>`
  - AND the Image component has explicit `width` and `height` props (or `fill` with properly sized parent)
  - AND the image includes `priority` prop since it's above the fold
  - AND the image renders correctly at all viewport sizes
- **Priority:** Must
- **Source:** Pain Point #3
- **Verification:** `grep "<img" src/components/sections/hero.tsx` returns zero matches; `<Image>` component used with proper props; Lighthouse "Properly size images" audit passes

---

### IA-7: Code Polish

#### FR-020: Verify and Improve react-icons Tree-Shaking
- **Audit Finding:** #15 — `react-icons` imports pull entire icon libraries (partially mitigated by `optimizePackageImports`)
- **User Story:** As a site visitor, I want the JavaScript bundle to be as small as possible so that the site loads quickly.
- **Acceptance Criteria:**
  - GIVEN the Next.js build output
  - WHEN `next build` completes
  - THEN `optimizePackageImports` for `react-icons` is configured in `next.config.ts`
  - AND the build output shows no warnings about oversized icon library chunks
  - AND all `react-icons` imports use deep import paths (e.g., `react-icons/si` not `react-icons`)
- **Priority:** Could
- **Source:** Pain Point #15
- **Verification:** `next build` output shows no bundle size warnings for react-icons; `grep -rn "from 'react-icons'" src/` shows all imports use subpath patterns like `react-icons/si`

#### FR-021: Remove Dead Code and Ensure Consistent Patterns
- **Audit Finding:** General code quality
- **User Story:** As a developer, I want the codebase to be clean and consistent so that it's easy to maintain and extend.
- **Acceptance Criteria:**
  - GIVEN the full source code
  - WHEN `npm run lint` runs
  - THEN zero ESLint errors or warnings are reported
  - AND no unused imports exist across the codebase
  - AND all components follow consistent patterns (named exports, file naming conventions)
- **Priority:** Could
- **Source:** General quality
- **Verification:** `npm run lint` exits with code 0 and zero warnings

---

## 2. Non-Functional Requirements

### NFR-001: Performance — Lighthouse Scores
- **Requirement:** All Lighthouse category scores must be ≥ 90 on the deployed static site.
- **Validation:** Run Lighthouse on https://portfolio-8af.pages.dev for: Performance, Accessibility, Best Practices, SEO. Each must score ≥ 90.

### NFR-002: Accessibility — WCAG 2.1 AA Compliance
- **Requirement:** The site must pass automated WCAG 2.1 AA checks with zero critical or serious violations.
- **Validation:** Run axe-core via Lighthouse or axe DevTools on all major pages. Zero critical/serious violations.

### NFR-003: Static Export Compatibility
- **Requirement:** All features must work with `output: 'export'` in `next.config.ts`. No server-side features (API routes, SSR-only data fetching, middleware) may be introduced.
- **Validation:** `npm run build` completes successfully; `out/` directory contains all pages as static HTML; deploy to Cloudflare Pages and verify functionality.

### NFR-004: No New Dependencies
- **Requirement:** No new npm packages may be added unless absolutely necessary (e.g., no alternative exists in the current stack). If a new dependency is required, it must be justified and approved.
- **Validation:** `package.json` diff shows no new dependencies, OR any new dependency has a documented justification in the ADR.

### NFR-005: Design System Preservation
- **Requirement:** All changes must maintain the existing glassmorphism design system (glass-card, gradient-text, glow-orb utilities, color palette, spacing conventions).
- **Validation:** Visual regression check — site looks identical before/after changes except for intentional improvements. No glassmorphism utility classes removed or fundamentally altered.

### NFR-006: Browser Compatibility
- **Requirement:** The site must render correctly on the latest 2 versions of Chrome, Firefox, Safari, and Edge.
- **Validation:** Manual or automated cross-browser testing on all major pages.

### NFR-007: Build Performance
- **Requirement:** `npm run build` must complete in ≤ 120 seconds on a standard development machine.
- **Validation:** Time the build command; must be ≤ 120s.

### NFR-008: Bundle Size
- **Requirement:** The total JavaScript bundle (first load) must not increase by more than 5% compared to the pre-polish baseline. Lazy-loading particles should REDUCE initial bundle size.
- **Validation:** `next build` output — compare "First Load JS" before and after. Post-polish must be ≤ 105% of baseline.

---

## 3. Traceability Matrix

| Requirement | Audit Finding | Improvement Area | Priority | Acceptance Criteria | Verification Gate |
|---|---|---|---|---|---|
| FR-001 | #1 | TypeScript Strictness | Must | No `as any` casts | `grep` + `tsc` |
| FR-002 | #2 | TypeScript Strictness | Must | Form works in static export | Deploy test |
| FR-003 | #1 | TypeScript Strictness | Must | Type-safe resolver | `tsc --strict` |
| FR-004 | #7 | Accessibility | Must | `role="alert"` on errors | axe-core |
| FR-005 | #6 | Accessibility | Must | Accessible button names | axe-core |
| FR-006 | #8 | Accessibility | Should | Focus trap in mobile nav | Manual keyboard test |
| FR-007 | #9 | Accessibility | Should | ≥ 4.5:1 contrast ratio | Contrast checker |
| FR-008 | #5 | Accessibility | Should | ≥ 30 ARIA attributes | `grep` + axe-core |
| FR-009 | #10 | SEO | Should | JSON-LD validates | Rich Results Test |
| FR-010 | #11 | SEO | Must | Correct deployment URL | `grep` + sitemap check |
| FR-011 | #13 | SEO | Should | Per-page og:type | View source |
| FR-012 | #12 | SEO | Could | hreflang tags present | View source |
| FR-013 | #14 | Performance | Should | Particles lazy-loaded | DevTools Network |
| FR-014 | #4, #17 | Performance | Must | No global `*` transition | `grep` CSS |
| FR-015 | #16 | Performance | Should | Preload hints present | View source + Lighthouse |
| FR-016 | #18 | Reliability | Must | API retry with backoff | Unit/manual test |
| FR-017 | #19 | Reliability | Must | ErrorBoundary wraps tree | Error injection test |
| FR-018 | #20 | Reliability | Must | Visible form feedback | Manual test |
| FR-019 | #3 | Image Optimization | Must | `<Image>` for cover | `grep` + Lighthouse |
| FR-020 | #15 | Code Polish | Could | Tree-shaking verified | Build output analysis |
| FR-021 | General | Code Polish | Could | Zero lint errors | `npm run lint` |

---

## 4. Priority Distribution

| Priority | Count | Requirements |
|---|---|---|
| **Must** | 11 | FR-001, FR-002, FR-003, FR-004, FR-005, FR-010, FR-014, FR-016, FR-017, FR-018, FR-019 |
| **Should** | 7 | FR-006, FR-007, FR-008, FR-009, FR-011, FR-013, FR-015 |
| **Could** | 3 | FR-012, FR-020, FR-021 |
| **Won't** | 0 | — |

---

## 5. Discrepancies Found During Code Review

The following audit findings were refined after direct code inspection:

| Audit Finding | Code Reality | Resolution |
|---|---|---|
| #6 — Missing aria-label on theme toggle | `theme-toggle.tsx` already has `aria-label={`Switch to ${...} mode`}` | Gap is in error-boundary.tsx and error.tsx instead → FR-005 |
| #6 — Missing aria-label on back-to-top | `back-to-top.tsx` already has `aria-label="Scroll to top"` | No action needed for this specific component |
| #4 + #17 — Global transition (duplicate) | Findings #4 and #17 describe the same issue | Consolidated into FR-014 |

---

## 6. Inferred Requirements

The following requirements were inferred from the explicit audit findings:

| Inferred Requirement | Source | Confidence |
|---|---|---|
| FR-003 (Type-safe resolver) | FR-001 requires understanding WHY `as any` was used → Zod v4 + react-hook-form type mismatch | HIGH |
| FR-018 (Form feedback) | FR-002 fixes the transport, but the empty catch block (#20) also needs visible error UI | HIGH |
| NFR-008 (Bundle size) | FR-013 (lazy-load particles) implies bundle size should decrease, not increase | MEDIUM |
| FR-021 (Lint compliance) | Code polish area implies clean lint output as baseline | MEDIUM |
