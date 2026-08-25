# Risk Assessment — Portfolio Polish

> **Version:** 1.0
> **Date:** 2026-08-25
> **Status:** Draft — Pending User Approval
> **Author:** PRIME Requirements Specialist (Phase 3 Part A)
> **Companion document:** `architecture-design.md`

---

## 1. Risk Matrix Overview

| Risk ID | Category | Description | Probability | Impact | Risk Level | Mitigation |
|---|---|---|---|---|---|---|
| R-001 | TypeScript | Zod v4 / react-hook-form type incompatibility persists after fix attempt | Low | Low | 🟢 Low | Fallback to typed cast (`Resolver<ContactForm>`) |
| R-002 | Functional | Contact form external service (Web3Forms) becomes unavailable or changes pricing | Low | Medium | 🟡 Medium | `mailto:` fallback always available; service-agnostic implementation |
| R-003 | Functional | Contact form `mailto:` fallback produces poor mobile UX | Medium | Low | 🟢 Low | Acceptable as degradation path, not primary flow |
| R-004 | Build | Image conversion breaks cover layout due to aspect ratio mismatch | Low | Medium | 🟡 Medium | Test with actual `cover.png` dimensions; keep `unoptimized: true` |
| R-005 | Hydration | Particles dynamic import causes hydration mismatch or FOUC | Low | Low | 🟢 Low | `ssr: false` prevents hydration; existing `mounted` guard pattern |
| R-006 | Layout | ErrorBoundary placement interferes with Next.js App Router error handling | Low | Medium | 🟡 Medium | Wrap `<main>` only, not entire tree; `error.tsx` remains as fallback |
| R-007 | Performance | GitHub API retry delays slow down build-time page generation | Low | Low | 🟢 Low | Cap total retry time at 7s; build already has generous timeout |
| R-008 | SEO | Invalid JSON-LD markup hurts search ranking instead of helping | Low | Medium | 🟡 Medium | Validate with Google Rich Results Test before merge |
| R-009 | Visual | Removing global `*` transition causes visible theme-switch flash | Medium | Low | 🟢 Low | `next-themes` `disableTransitionOnChange` already prevents FOUC |
| R-010 | Accessibility | Focus trap conflicts with Framer Motion AnimatePresence lifecycle | Low | Medium | 🟡 Medium | Sync hook activation with `mobileOpen` state; test edge cases |
| R-011 | Deployment | Static export build fails after changes | Low | High | 🟡 Medium | Run `npm run build` after each change group; CI catches regressions |
| R-012 | Regression | Changes to globals.css break existing component styling | Low | Medium | 🟡 Medium | Scoped changes (remove only `*` rule); visual check after deploy |
| R-013 | Security | Web3Forms access key exposed in client-side code | Medium | Low | 🟢 Low | Key is designed to be public (Web3Forms docs); spam protection built-in |
| R-014 | Compatibility | Custom focus trap doesn't work on all mobile browsers | Low | Low | 🟢 Low | Uses standard DOM APIs (querySelector, keydown); broad support |
| R-015 | Performance | Dynamic import of particles adds a separate chunk that delays interactivity | Low | Low | 🟢 Low | Particles are non-critical; loaded after main content is interactive |

---

## 2. Detailed Risk Analysis

### R-001: Zod v4 / react-hook-form Type Incompatibility

**Context:** The `as any` cast at `contact/page.tsx:26` exists because `zodResolver(contactSchema)` returns a type that doesn't match `Resolver<ContactForm>` from react-hook-form. This is likely due to Zod v4's changed generic signatures.

**Failure mode:** After removing `as any`, TypeScript compilation fails with a type error, blocking the build.

**Mitigation strategy:**
1. First attempt: Update `@hookform/resolvers` to latest — may already support Zod v4
2. If that fails: Use `as Resolver<ContactForm>` (semantically correct cast, not `any`)
3. If that fails: Use `as unknown as Resolver<ContactForm>` (double cast, still better than `any`)
4. Last resort: Pin Zod to v3 if v4 is the root cause (but this affects other code)

**Residual risk:** Very low. At minimum, we can replace `as any` with a more specific type assertion.

---

### R-002: Contact Form External Service Dependency

**Context:** The contact form currently POSTs to a non-existent `/api/contact`. The fix requires an external form submission service.

**Failure mode:** Web3Forms service goes down, changes pricing, or discontinues free tier. Form submissions are lost.

**Mitigation strategy:**
1. Implement service-agnostic submission function — only the URL and payload format need to change to switch providers
2. Always maintain `mailto:` as a fallback — works even if all external services are down
3. On submission failure, show user a visible error with the option to retry or use `mailto:` directly
4. Web3Forms free tier (250/month) is more than sufficient for a personal portfolio

**Residual risk:** Low. The `mailto:` fallback guarantees the form always works in some capacity.

---

### R-004: Image Conversion Breaks Layout

**Context:** The cover image in `hero.tsx` uses `<img className="w-full h-auto block">`. Converting to `<Image>` requires either explicit dimensions or `fill` with a positioned parent.

**Failure mode:** The cover image renders with wrong aspect ratio, overflows its container, or causes layout shift.

**Mitigation strategy:**
1. Check actual `cover.png` dimensions before choosing approach
2. Use `fill` with `aspect-ratio` container for responsive behavior
3. Keep `unoptimized: true` in next.config.ts — no runtime optimization changes
4. Test at all breakpoints (mobile, tablet, desktop)

**Residual risk:** Low. The `<Image>` component with `fill` and proper container sizing produces equivalent layout.

---

### R-005: Particles Dynamic Import — Hydration/FOUC

**Context:** Moving particles to `next/dynamic` with `ssr: false` means the component doesn't render during SSR/build. The background will be empty until the dynamic chunk loads.

**Failure mode:** Users see a flash of empty background before particles appear. Or, the `ParticlesProvider` context is missing during initial render.

**Mitigation strategy:**
1. `ssr: false` is the correct pattern for browser-only components — no hydration mismatch possible
2. Particles are decorative (fixed, -z-10) — their absence doesn't affect content visibility
3. Moving `ParticlesProvider` into the dynamic component ensures context is available when needed
4. The existing `mounted` guard pattern already handles the SSR/client transition gracefully

**Residual risk:** Very low. Particles are purely decorative; their late appearance is imperceptible.

---

### R-006: ErrorBoundary Interference with App Router

**Context:** Next.js App Router has its own error handling via `error.tsx`. Adding a React ErrorBoundary around `<main>` creates two layers of error handling.

**Failure mode:** ErrorBoundary catches an error that should propagate to `error.tsx`, preventing the full-page error recovery flow. Or, ErrorBoundary's "Try again" doesn't work correctly with Next.js navigation.

**Mitigation strategy:**
1. Wrap only `<main>` content — header, footer, and providers remain outside the boundary
2. `error.tsx` remains as the outermost catch-all for errors during route transitions
3. ErrorBoundary's reset calls `setState({ hasError: false, error: null })` which re-renders children — this works independently of Next.js navigation
4. Both error handling layers serve different purposes: ErrorBoundary for component crashes, error.tsx for route-level failures

**Residual risk:** Low. The two-layer approach is a well-established pattern in Next.js App Router.

---

### R-009: Theme Transition Flash After Global Rule Removal

**Context:** The `* { transition: ... }` rule in globals.css provides smooth color transitions on ALL elements during theme changes. Removing it could cause abrupt color switches.

**Failure mode:** When user toggles dark/light mode, background and text colors change instantly without animation, creating a jarring visual experience.

**Mitigation strategy:**
1. `next-themes` has `disableTransitionOnChange` enabled — this prevents FOUC by temporarily disabling ALL transitions during the theme class swap, then re-enabling them. This is specifically designed to handle this scenario.
2. Individual components already have their own `transition-colors` classes for hover/focus states
3. The theme toggle button itself provides clear visual feedback about what's happening
4. If flash is noticeable, add `.theme-transition` class to `<body>` only (scoped alternative)

**Residual risk:** Low. The `disableTransitionOnChange` prop is specifically designed for this use case. Most users won't notice the difference.

---

### R-010: Focus Trap vs. AnimatePresence Conflict

**Context:** The mobile nav uses Framer Motion's `AnimatePresence` for open/close animation. The focus trap needs to activate when the menu is open and deactivate when it closes.

**Failure mode:** Focus trap activates before the animation completes, causing visible focus ring on elements that are still animating. Or, focus trap deactivates after the menu is already closed, causing a brief moment where focus is in an unexpected location.

**Mitigation strategy:**
1. Hook activates/deactivates based on `mobileOpen` boolean state — same state that controls `AnimatePresence`
2. Focus the first nav link immediately when `mobileOpen` becomes true (during animation start — acceptable since the element is already visible)
3. On Escape or close, return focus to the hamburger button BEFORE the animation completes (focus management takes priority over animation)
4. Test on both mobile (touch) and desktop (keyboard) viewports

**Residual risk:** Low. The focus trap and animation are driven by the same state variable, ensuring they stay in sync.

---

### R-011: Static Export Build Failure

**Context:** Multiple changes touch different parts of the codebase. The combination could cause the static export build to fail.

**Failure mode:** `npm run build` fails with errors related to dynamic imports, server/client component boundaries, or missing API routes.

**Mitigation strategy:**
1. Run `npm run build` after each logical group of changes (not just at the end)
2. CI pipeline catches build failures before deployment
3. Each improvement is independently testable — no change requires all others to be present
4. The `output: 'export'` constraint is well-understood and documented

**Residual risk:** Low. The CI pipeline provides automated verification, and each change is small and isolated.

---

### R-013: Web3Forms Access Key Exposure

**Context:** The Web3Forms access key must be included in client-side code (it's sent in the POST body from the browser).

**Failure mode:** Malicious actors find the key and use it to send spam through the form, consuming the free tier quota.

**Mitigation strategy:**
1. Web3Forms access keys are **designed to be public** — the official documentation shows them in client-side code
2. Web3Forms has built-in spam protection (honeypot field, rate limiting)
3. The key is scoped to a specific domain/email — can't be used for other purposes
4. If abuse occurs, the key can be regenerated in the Web3Forms dashboard
5. Adding a honeypot field to the form provides additional spam protection

**Residual risk:** Very low. This is the intended usage pattern for Web3Forms.

---

## 3. Risk Heat Map

```
                    IMPACT
                Low         Medium      High
            ┌───────────┬───────────┬───────────┐
    High    │           │           │           │
            ├───────────┼───────────┼───────────┤
P   Medium  │ R-003     │ R-002     │ R-011     │
R           │ R-009     │ R-004     │           │
O           │ R-013     │ R-006     │           │
B           │           │ R-008     │           │
            │           │ R-010     │           │
            │           │ R-012     │           │
            ├───────────┼───────────┼───────────┤
    Low     │ R-001     │ R-007     │           │
            │ R-005     │           │           │
            │ R-014     │           │           │
            │ R-015     │           │           │
            └───────────┴───────────┴───────────┘

Legend: 🟢 Low (11 risks)  🟡 Medium (4 risks)  🔴 High (0 risks)
```

**Overall risk profile:** LOW. No high-severity risks identified. The project is a polish/optimization pass on a working codebase, not a ground-up rebuild.

---

## 4. Simplicity Gate Verification

### Principle: Use the simplest viable architecture for each improvement.

| Improvement | Proposed Approach | Simpler Alternative? | More Complex Alternative? | Verdict |
|---|---|---|---|---|
| **TypeScript strictness** | Remove `as any`, use proper type | None — must fix the type | Rewrite form library | ✅ Simplest |
| **Contact form** | Web3Forms POST + mailto: fallback | mailto: only (worse UX) | Cloudflare Worker backend | ✅ Simplest viable |
| **Image optimization** | `<img>` → `<Image>` | None — direct replacement | Custom image pipeline | ✅ Simplest |
| **Particles lazy load** | `next/dynamic` with `ssr: false` | IntersectionObserver (no code split) | Route-gating + service worker | ✅ Simplest |
| **Error boundaries** | Wrap `<main>` with existing component | No boundary (current broken state) | Per-section boundaries | ✅ Simplest viable |
| **GitHub API retry** | Inline retry loop in `githubFetch` | No retry (current broken state) | axios-retry library + service worker | ✅ Simplest |
| **JSON-LD** | Inline `<script>` in layout.tsx | No structured data | Per-page dynamic generation | ✅ Simplest viable |
| **Global transition** | Remove `*` rule (4 lines deleted) | Scope to class (adds code) | CSS-in-JS migration | ✅ Simplest |
| **Focus trap** | Custom `useFocusTrap` hook (~30 LOC) | No trap (WCAG violation) | focus-trap-react library | ✅ Simplest viable |

### Simplicity Gate Checklist

- [x] **No new npm dependencies** — All solutions use existing stack or browser APIs
- [x] **No architectural pattern changes** — Still static export, same component model
- [x] **No infrastructure changes** — Same Cloudflare Pages deployment, same CI pipeline
- [x] **No data model changes** — Same TypeScript interfaces, same data files
- [x] **Localized changes** — Each improvement touches 1-3 files with clear boundaries
- [x] **Incremental deployability** — Each improvement can be merged independently
- [x] **Reversible** — Each change can be reverted without affecting others
- [x] **Testable** — Each improvement has clear verification criteria (see requirements spec)

### Complexity Budget

| Metric | Before | After (projected) | Change |
|---|---|---|---|
| npm dependencies | 15 | 15 | No change |
| Client components | 16 | 17 | +1 (particles-client.tsx) |
| Server components | 8 | 8 | No change |
| Custom CSS classes | 14 | 13 | -1 (remove `*` rule) |
| `as any` occurrences | 1 | 0 | -1 |
| ARIA attributes | ~15 | ~35-40 | +20-25 |
| Lines of code (approx) | ~2,200 | ~2,350 | +150 (retry logic, focus trap, form fallback) |
| Build time | ~60-90s | ~60-90s | No significant change |

**Simplicity Gate: PASSED** — All improvements use the simplest viable approach. No unnecessary complexity introduced.

---

## 5. Failure Mode Analysis

### 5.1 What happens when GitHub API is unreachable?

**Current behavior:**
- Home page: `fetchRepos().catch(() => [])` → stats default to zeros → page renders with empty stats
- Stats page: React Query retries 2 times (configured in QueryClient) → shows loading skeleton → eventually shows error state

**After improvements:**
- Home page: Same behavior, but `githubFetch` retries 3 times with backoff before throwing → build takes up to 7s longer in worst case → still falls back to zeros
- Stats page: Same React Query retry (2 times) + each individual fetch inside `githubFetch` also retries (3 times) → total retry count compounds

**Risk:** Compounded retries could slow stats page to ~21s before showing error (3 retries × 3 attempts × exponential delays).

**Mitigation:** React Query's retry and githubFetch's retry serve different purposes:
- githubFetch retries handle transient HTTP errors (429, 503) within a single API call
- React Query retries handle complete function failures (all API calls fail)
- In practice, if GitHub is down, githubFetch will fail fast on the first attempt (connection refused), not wait through all delays

### 5.2 What happens when Web3Forms is unreachable?

**After improvements:**
1. Form submission fetch fails → catch block executes
2. `mailto:` fallback constructs email link → `window.location.href = mailtoUrl`
3. User's email client opens with pre-filled subject and body
4. User can still send their message manually

**Degradation path:** Web3Forms down → mailto: fallback → user manually sends email. No data loss.

### 5.3 What happens when the dynamic particles chunk fails to load?

**After improvements:**
1. `next/dynamic` fails to load the chunk → React shows nothing for that component
2. The particles background simply doesn't render → site shows solid background color
3. All content remains fully functional and readable
4. No error boundary trigger (dynamic import failure is handled by Next.js internally)

**Degradation path:** Particles fail to load → decorative background absent → content unaffected.

### 5.4 What happens when the ErrorBoundary catches an error?

**After improvements:**
1. Component inside `<main>` throws during render
2. ErrorBoundary catches it → renders fallback UI (error icon + message + "Try again" button)
3. Header, footer, particles remain visible and functional
4. User can click "Try again" to reset the boundary and re-render children
5. If the error persists, it will be caught again by the boundary (no infinite loop — user must click)

**Degradation path:** Component crash → friendly error message in main area → navigation still works → user can navigate away or retry.

---

## 6. Dependency Health Assessment

| Dependency | Last Updated | Community | License | Lock-in Risk | Health |
|---|---|---|---|---|---|
| next 16.2.10 | Active (2026) | Very Large | MIT | Medium (framework) | ✅ Healthy |
| react 19.2.4 | Active (2026) | Very Large | MIT | High (core) | ✅ Healthy |
| tailwindcss 4.x | Active (2026) | Very Large | MIT | Medium (styling) | ✅ Healthy |
| framer-motion 12.x | Active (2026) | Large | MIT | Low (swappable) | ✅ Healthy |
| @tsparticles/react 4.x | Active | Medium | MIT | Low (decorative) | ✅ Healthy |
| next-themes 0.4.6 | Active | Medium | MIT | Low (easily replaced) | ✅ Healthy |
| @tanstack/react-query 5.x | Active (2026) | Very Large | MIT | Low (swappable) | ✅ Healthy |
| react-hook-form 7.x | Active | Very Large | MIT | Low (swappable) | ✅ Healthy |
| zod 4.x | Active (2026) | Very Large | MIT | Low (swappable) | ✅ Healthy |
| @hookform/resolvers 5.x | Active | Large | MIT | Low (adapter) | ⚠️ Check Zod v4 compat |
| lucide-react 1.x | Active | Large | ISC | Low (icon lib) | ✅ Healthy |
| react-icons 5.x | Active | Very Large | MIT | Low (icon lib) | ✅ Healthy |
| clsx + tailwind-merge | Active | Large | MIT/Apache | None (utility) | ✅ Healthy |
| class-variance-authority | Active | Medium | Apache-2.0 | None (UNUSED) | ⚠️ Remove or use |
| date-fns 4.x | Active | Very Large | MIT | None (UTILITY) | ⚠️ Remove or use |

**Unused dependencies to consider removing (FR-021):**
- `class-variance-authority` — not imported anywhere
- `date-fns` — not imported anywhere (custom `formatDate` in utils.ts is used instead)

---

## 7. Residual Risk Summary

After all mitigations are applied, the residual risk profile is:

| Risk Level | Count | Risks |
|---|---|---|
| 🟢 Low | 11 | R-001, R-003, R-005, R-007, R-009, R-013, R-014, R-015 + mitigated R-002, R-004, R-011 |
| 🟡 Medium | 4 | R-002, R-006, R-008, R-010 (with mitigations in place) |
| 🔴 High | 0 | — |
| 🔴 Critical | 0 | — |

**Overall project risk: LOW**

This is a polish project on a working codebase. All improvements are additive or corrective — none change the fundamental architecture. The static export constraint actually reduces risk by eliminating server-side failure modes.

---

## 8. Risk-Adjusted Implementation Order

Based on risk analysis, the recommended implementation order accounts for risk dependencies:

| Phase | Improvements | Rationale |
|---|---|---|
| **Phase 1: Zero-risk foundations** | FR-010 (URL fix), FR-014 (remove `*` transition), FR-007 (contrast) | Single-file changes, immediately verifiable, no side effects |
| **Phase 2: Type safety** | FR-001 → FR-003 → FR-002 → FR-004 → FR-018 | Sequential chain; test form after each step |
| **Phase 3: Reliability** | FR-016 (API retry), FR-017 (ErrorBoundary) | Independent; improve error handling without visual changes |
| **Phase 4: Accessibility** | FR-005 → FR-006 → FR-008 | Build from specific fixes to broad ARIA expansion |
| **Phase 5: SEO** | FR-009, FR-011, FR-012 | Depend on FR-010 (URL fix from Phase 1) |
| **Phase 6: Performance** | FR-013 (particles), FR-015 (preload), FR-019 (image) | Independent optimizations; test build after each |
| **Phase 7: Final polish** | FR-020 (tree-shaking verify), FR-021 (lint + dead code) | Run last as a cleanup pass |
