# Design System Audit — Portfolio (Phase 3 Part B)

> **Auditor:** prime-make (Design Phase)
> **Scope:** `src/app/globals.css`, all `src/components/**/*.tsx`, `src/config/site.ts`
> **Stack:** Next.js 16 · React 19 · Tailwind CSS 4 · Framer Motion · tsParticles

---

## Table of Contents

1. [Design Token Inventory](#1-design-token-inventory)
2. [Component Pattern Audit](#2-component-pattern-audit)
3. [Consistency Issues](#3-consistency-issues)
4. [Accessibility Concerns](#4-accessibility-concerns)
5. [Recommendations](#5-recommendations)

---

## 1. Design Token Inventory

### 1.1 Color Tokens

All color tokens are defined in `:root` (light) and `.dark` (dark) as CSS custom properties, then bridged into Tailwind via `@theme inline`.

#### Light Mode (`:root`)

| Token | Value | Category | Usage |
|---|---|---|---|
| `--background` | `#f8f9fc` | Surface | Page background |
| `--foreground` | `#0a0a1a` | Text | Primary body text |
| `--card` | `rgba(255,255,255,0.7)` | Surface | Card backgrounds |
| `--card-foreground` | `#0a0a1a` | Text | Card text |
| `--popover` | `rgba(255,255,255,0.9)` | Surface | Popover/dialog backgrounds |
| `--popover-foreground` | `#0a0a1a` | Text | Popover text |
| `--primary` | `#3b82f6` | Brand | Primary actions (blue-500) |
| `--primary-foreground` | `#ffffff` | Text | Text on primary |
| `--secondary` | `rgba(59,130,246,0.1)` | Surface | Secondary backgrounds |
| `--secondary-foreground` | `#3b82f6` | Text | Secondary text |
| `--muted` | `rgba(59,130,246,0.08)` | Surface | Muted backgrounds |
| `--muted-foreground` | `#64748b` | Text | Muted/description text (slate-500) |
| `--accent` | `rgba(59,130,246,0.12)` | Surface | Accent backgrounds (active nav) |
| `--accent-foreground` | `#3b82f6` | Text | Accent text |
| `--destructive` | `#ef4444` | Semantic | Error/destructive (red-500) |
| `--destructive-foreground` | `#ffffff` | Text | Text on destructive |
| `--border` | `rgba(59,130,246,0.15)` | Border | Default borders |
| `--input` | `rgba(59,130,246,0.15)` | Border | Input borders |
| `--ring` | `#3b82f6` | Focus | Focus ring color |
| `--glass` | `rgba(255,255,255,0.6)` | Glass | Glass card background |
| `--glass-border` | `rgba(255,255,255,0.3)` | Glass | Glass card border |
| `--glass-hover` | `rgba(255,255,255,0.8)` | Glass | Glass card hover state |
| `--gradient-start` | `#3b82f6` | Gradient | Gradient start (blue-500) |
| `--gradient-end` | `#06b6d4` | Gradient | Gradient end (cyan-500) |

#### Dark Mode (`.dark`)

| Token | Value | Δ from Light | Notes |
|---|---|---|---|
| `--background` | `#0a0a1a` | ✅ inverted | Deep navy-black |
| `--foreground` | `#f0f0f5` | ✅ inverted | Soft white |
| `--card` | `rgba(255,255,255,0.05)` | ✅ lower opacity | Very transparent |
| `--card-foreground` | `#f0f0f5` | ✅ inverted | |
| `--popover` | `rgba(20,20,40,0.9)` | ✅ tinted | Navy-tinted |
| `--popover-foreground` | `#f0f0f5` | ✅ inverted | |
| `--primary` | `#3b82f6` | ➖ unchanged | Same blue in both modes |
| `--primary-foreground` | `#ffffff` | ➖ unchanged | |
| `--secondary` | `rgba(59,130,246,0.15)` | ⬆ more opaque | |
| `--secondary-foreground` | `#7dd3fc` | ✅ lighter | sky-300 for dark bg |
| `--muted` | `rgba(255,255,255,0.05)` | ✅ neutral | Light-mode uses blue-tint |
| `--muted-foreground` | `rgba(255,255,255,0.6)` | ✅ semi-transparent | |
| `--accent` | `rgba(59,130,246,0.15)` | ⬆ more opaque | |
| `--accent-foreground` | `#7dd3fc` | ✅ lighter | |
| `--destructive` | `#dc2626` | ⬇ darker | red-600 vs red-500 |
| `--destructive-foreground` | `#ffffff` | ➖ unchanged | |
| `--border` | `rgba(255,255,255,0.08)` | ✅ neutral | Light uses blue-tint |
| `--input` | `rgba(255,255,255,0.08)` | ✅ neutral | |
| `--ring` | `#3b82f6` | ➖ unchanged | |
| `--glass` | `rgba(255,255,255,0.05)` | ⬇ much lower | 0.6 → 0.05 |
| `--glass-border` | `rgba(255,255,255,0.1)` | ⬇ lower | 0.3 → 0.1 |
| `--glass-hover` | `rgba(255,255,255,0.1)` | ⬇ much lower | 0.8 → 0.1 |
| `--gradient-start` | `#3b82f6` | ➖ unchanged | |
| `--gradient-end` | `#06b6d4` | ➖ unchanged | |

#### ⚠ Observations

- **`--primary` is identical in both modes** — works but limits depth. Consider a slightly brighter blue for dark mode (e.g., `#60a5fa`) for better vibrancy.
- **`--muted` base color differs**: light uses `rgba(59,130,246,...)` (blue-tinted), dark uses `rgba(255,255,255,...)` (neutral). Intentional but inconsistent approach.
- **`--border` base color differs**: same discrepancy as `--muted`.
- **Gradient colors are identical** across modes — the `#3b82f6 → #06b6d4` gradient may not have sufficient contrast against the dark background (see §4).

### 1.2 Radius Tokens

| Token | Value | Computed |
|---|---|---|
| `--radius` | `0.75rem` (12px) | Base unit |
| `--radius-sm` | `calc(var(--radius) - 4px)` | `0.5rem` (8px) |
| `--radius-md` | `calc(var(--radius) - 2px)` | `0.625rem` (10px) |
| `--radius-lg` | `var(--radius)` | `0.75rem` (12px) |
| `--radius-xl` | `calc(var(--radius) + 4px)` | `1rem` (16px) |

**⚠ Missing:** No `2xl`, `3xl` tokens despite `rounded-2xl` being used in components.

### 1.3 Font Tokens

| Token | Value | Source |
|---|---|---|
| `--font-sans` | `var(--font-geist-sans)` | Geist Sans (next/font) |
| `--font-mono` | `var(--font-geist-mono)` | Geist Mono (next/font) |

**⚠ Missing:** No font size scale, font weight, or line-height tokens.

### 1.4 Missing Token Categories

| Category | Status | Impact |
|---|---|---|
| **Spacing scale** | ❌ Not defined | Ad-hoc spacing values everywhere |
| **Typography scale** | ❌ Not defined | Inconsistent text sizes |
| **Font weights** | ❌ Not defined | Mixed bold/semibold usage |
| **Shadow tokens** | ❌ Not defined | Hardcoded shadow values in CSS |
| **Z-index scale** | ❌ Not defined | Magic numbers: `z-10`, `z-40`, `z-50` |
| **Animation timing** | ❌ Not defined | Durations scattered across files |
| **Motion easing** | ❌ Not defined | Mixed `ease`, `ease-out`, `ease-in-out` |
| **Breakpoints** | ⚠ Tailwind defaults only | No custom breakpoints |

---

## 2. Component Pattern Audit

### 2.1 CSS Utility Classes (from `globals.css`)

| Class | Usage Locations | Description |
|---|---|---|
| `glass-card` | header, hero, tech-stack marquee, contact-cta, projects search/filter | Static glassmorphic container |
| `glass-card-hover` | featured-projects cards, stats cards, recent-activity items, footer social icons, "View all" button | Interactive glassmorphic container with hover lift |
| `gradient-text` | ALL section headings (7+), header logo, footer brand, stat values | Gradient clipped text |
| `gradient-border` | *(defined but NOT used in any scanned component)* | Gradient border on hover via `::before` pseudo |
| `btn-gradient` | contact-cta CTA button only | Gradient background button |
| `glass-pill` | *(defined but NOT used — replaced by inline classes)* | Glass pill badge |
| `glow-orb` | contact-cta background | Blurred decorative circle |
| `glow-orb-purple` | contact-cta | Purple glow variant |
| `glow-orb-blue` | *(defined but NOT used)* | Blue glow variant |
| `glow-orb-pink` | *(defined but NOT used)* | Pink glow variant |
| `gradient-line` | tech-stack marquee (top/bottom) | Horizontal gradient divider |

### 2.2 Framer Motion Patterns

| Pattern | Locations | Config |
|---|---|---|
| **Section entrance** | featured-projects, stats-overview, contact-cta, recent-activity, section-heading | `initial={{ opacity: 0, y: 20 }}` → `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true }}` |
| **Page transition** | page-transition.tsx | `initial={{ opacity: 0, y: 10 }}` → `animate={{ opacity: 1, y: 0 }}`, `duration: 0.3` |
| **Stagger container** | page-transition.tsx (StaggerContainer) | `staggerChildren: 0.08` |
| **Stagger item** | page-transition.tsx (StaggerItem) | `hidden: { opacity: 0, y: 20 }`, `visible: { opacity: 1, y: 0, duration: 0.4 }` |
| **Hero profile scale** | hero.tsx | `initial={{ scale: 0.8, opacity: 0 }}` → `animate={{ scale: 1, opacity: 1 }}`, `duration: 0.5` |
| **Hero bio slide** | hero.tsx | `initial={{ opacity: 0, y: 10 }}` → `animate={{ opacity: 1, y: 0 }}`, `delay: 0.15` |
| **Mobile menu** | header.tsx | `initial={{ height: 0, opacity: 0 }}` → `animate={{ height: 'auto', opacity: 1 }}`, `duration: 0.2` |
| **Activity timeline** | recent-activity.tsx | `initial={{ opacity: 0, x: -10 }}` → `whileInView={{ opacity: 1, x: 0 }}` |
| **Card stagger** | featured-projects, stats-overview | `transition={{ delay: i * 0.1 }}` (inline index-based) |
| **Activity stagger** | recent-activity.tsx | `transition={{ delay: i * 0.05 }}` |

### 2.3 CSS Animation Classes

| Class | Keyframes | Duration | Usage |
|---|---|---|---|
| `.animate-fade-in` | `fade-in` (0.5s) | 0.5s | *(defined, not found in components)* |
| `.animate-fade-in-up` | `fade-in-up` (0.6s) | 0.6s | *(defined, not found in components)* |
| `.animate-fade-in-down` | `fade-in-down` (0.6s) | 0.6s | *(defined, not found in components)* |
| `.animate-slide-in-left` | `slide-in-left` (0.5s) | 0.5s | *(defined, not found in components)* |
| `.animate-slide-in-right` | `slide-in-right` (0.5s) | 0.5s | *(defined, not found in components)* |
| `.animate-scale-in` | `scale-in` (0.4s) | 0.4s | *(defined, not found in components)* |
| `.animate-float` | `float` (6s infinite) | 6s | *(defined, not found in components)* |
| `.animate-pulse-glow` | `pulse-glow` (4s infinite) | 4s | *(defined, not found in components)* |
| `.animate-ring-rotate` | `ring-rotate` (8s infinite) | 8s | *(defined, not found in components)* |
| `.animate-gradient-shift` | `gradient-shift` (8s infinite) | 8s | *(defined, not found in components)* |
| `.animate-marquee` | `marquee` (25s infinite) | 25s | tech-stack marquee ✅ |

> **Finding:** 10 out of 11 CSS animation classes are **defined but unused**. Components exclusively use Framer Motion for entrance animations.

### 2.4 Shared Component Inventory

| Component | File | Pattern |
|---|---|---|
| `SectionHeading` | `shared/section-heading.tsx` | Reusable `h2` + description with motion |
| `PageTransition` | `shared/page-transition.tsx` | Page mount animation wrapper |
| `StaggerContainer` / `StaggerItem` | `shared/page-transition.tsx` | Staggered children animation |
| `LoadingSkeleton` / `CardSkeleton` / `CardGridSkeleton` | `shared/loading-skeleton.tsx` | Loading states |
| `EmptyState` | `shared/empty-state.tsx` | No-data placeholder |
| `ErrorBoundary` | `shared/error-boundary.tsx` | React error boundary with fallback |
| `ThemeToggle` | `shared/theme-toggle.tsx` | Dark/light toggle |
| `BackToTop` | `shared/back-to-top.tsx` | Scroll-to-top FAB |
| `ParticlesBackground` | `shared/particles.tsx` | tsParticles background |

### 2.5 Recurring Inline Patterns (Not Abstracted)

These patterns appear in 3+ components but are **not** abstracted into shared utilities:

| Pattern | Occurrences | Example |
|---|---|---|
| Section heading (inline) | featured-projects, recent-activity | `h2.text-3xl.font-bold.tracking-tight > span.gradient-text` + `p.mt-2.text-muted-foreground` (duplicates `SectionHeading`) |
| Gradient accent line (top of card) | stats-overview, contact-cta | `absolute top-0 h-0.5 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]` |
| Icon badge (gradient background) | recent-activity, contact-cta | `rounded-full p-2.5 bg-gradient-to-br from-[var(--gradient-start)]/10 to-[var(--gradient-end)]/10 border border-[var(--glass-border)]` |
| Container wrapper | ALL sections | `container mx-auto px-4` |
| Tag/pill badge | featured-projects, tech-stack-marquee | `rounded-full text-xs font-medium bg-[var(--accent)] text-[var(--accent-foreground)]` |

---

## 3. Consistency Issues

### 3.1 Section Spacing ⚠ HIGH

Vertical section padding is inconsistent across the codebase:

| Component/Page | Padding | Notes |
|---|---|---|
| `featured-projects` | `py-16` | ✅ baseline |
| `stats-overview` | `py-16` | ✅ matches |
| `recent-activity` | `py-16` | ✅ matches |
| `contact-cta` | `py-16` | ✅ matches |
| `tech-stack-marquee` | `py-8` | ⚠ Half the standard |
| `footer` | `py-10` | ⚠ Non-standard |
| Sub-pages (`skills`, `tech-stack`, `projects`, etc.) | `py-12 md:py-16` | ⚠ Different from homepage sections |
| `hero` | `pb-16 md:pb-20` + `mt-8 md:mt-4` | ⚠ Inconsistent mobile/desktop rhythm |
| `stats` page | `py-12` (no responsive) | ⚠ No `md:` breakpoint variant |

**Impact:** The page rhythm feels uneven. Homepage sections have generous `py-16`, but the marquee at `py-8` feels cramped. Sub-pages use a different standard.

### 3.2 Border Radius ⚠ MEDIUM

Cards and containers use mixed radius values:

| Element | Radius | Expected |
|---|---|---|
| Featured project cards | `rounded-xl` | ✅ |
| Stats cards | `rounded-xl` | ✅ |
| Recent activity items | `rounded-xl` | ✅ |
| Hero bio card | `rounded-xl` | ✅ |
| Contact CTA card | `rounded-2xl` | ⚠ Should match other cards |
| CardSkeleton | `rounded-lg` | ⚠ Smaller than actual cards |
| Featured page cards | `rounded-lg` | ⚠ Inconsistent with homepage cards |
| Tech-stack page cards | `rounded-lg` | ⚠ Inconsistent |
| Error boundary button | `rounded-md` | ⚠ Should be `rounded-full` to match `btn-gradient` |
| Not-found buttons | `rounded-md` | ⚠ Inconsistent with CTA buttons |

### 3.3 Animation Patterns ⚠ HIGH

**3.3.1 — Duplicate Animation Systems**
Two parallel animation systems exist with no clear usage boundary:
- **CSS keyframes + utility classes** (11 classes defined, 1 used)
- **Framer Motion inline variants** (used everywhere for entrance animations)

**3.3.2 — Duplicated Framer Motion Variants**
The same `{ opacity: 0, y: 20 }` → `{ opacity: 1, y: 0 }` pattern is copy-pasted across 5+ components instead of using the existing `StaggerItem` or a shared variant config.

**3.3.3 — Inconsistent Transition Durations**

| Context | Duration | Source |
|---|---|---|
| Section heading (SectionHeading) | `0.5s` | component default |
| Section entrance (inline) | not specified (FM default ~0.3s) | featured-projects, stats |
| Page transition | `0.3s` | page-transition.tsx |
| Stagger item | `0.4s` | page-transition.tsx |
| Hero profile | `0.5s` | hero.tsx |
| Mobile menu | `0.2s` | header.tsx |
| CSS fade-in | `0.5s` | globals.css |
| CSS fade-in-up | `0.6s` | globals.css |
| CSS scale-in | `0.4s` | globals.css |
| Global theme transition | `0.3s` | globals.css `*` selector |

**3.3.4 — Inconsistent Stagger Delays**
- Featured projects: `i * 0.1` (100ms between cards)
- Stats overview: `i * 0.1` (100ms)
- Recent activity: `i * 0.05` (50ms — twice as fast)

### 3.4 Typography Scale ⚠ MEDIUM

**3.4.1 — Section Headings**

| Component | Markup | Size |
|---|---|---|
| `SectionHeading` | `text-3xl font-bold tracking-tight` | 30px |
| `featured-projects` (inline) | `text-3xl font-bold tracking-tight` | 30px |
| `recent-activity` (inline) | `text-3xl font-bold tracking-tight` | 30px |
| `contact-cta` | `text-2xl md:text-3xl font-bold` | 24px → 30px |

The contact-cta uses a **different** size on mobile (`text-2xl` = 24px) while other sections use `text-3xl` (30px) at all breakpoints.

**3.4.2 — Card/Item Titles**

| Element | Size | Weight |
|---|---|---|
| Featured project card title | `text-sm` | `font-semibold` |
| Stats card label | `text-xs` | (default/normal) |
| Footer quick links | `text-sm` | (default/normal) |
| Header nav links | `text-sm` | `font-medium` |
| Mobile nav links | `text-sm` | `font-medium` |
| Tech stack marquee items | `text-sm` | `font-medium` |
| Hero bio text | `text-sm md:text-base` | (default/normal) |

**3.4.3 — Description Text**
- Most descriptions: `text-muted-foreground` with no explicit size (inherits parent)
- SectionHeading description: `text-lg` (18px)
- Hero bio: `text-sm md:text-base` (14px → 16px)
- Card descriptions: `text-sm` (14px)
- Footer brand description: `text-sm` (14px)

### 3.5 Color Usage ⚠ LOW

**3.5.1 — Hardcoded Colors in Components**

| Location | Value | Issue |
|---|---|---|
| `hero.tsx:46` | `bg-green-500` | Status indicator — not tokenized |
| `hero.tsx:46` | `shadow-green-500/30` | Shadow color — not tokenized |
| `footer.tsx:85` | `text-red-500` | Heart icon — not tokenized |
| `stats-overview.tsx:39` | `rgba(59, 130, 246, 0.3)` | Inline drop-shadow — hardcoded |
| `contact-cta.tsx:28` | `rgba(59, 130, 246, 0.4)` | Inline drop-shadow — hardcoded |

**3.5.2 — Inline `var()` References**
Components frequently use `text-[var(--gradient-start)]`, `bg-[var(--accent)]`, etc. This works but bypasses Tailwind's color system. Since these are bridged in `@theme inline`, components could use `text-primary`, `bg-accent`, etc. instead.

**3.5.3 — Inconsistent Border Colors**
- Header scrolled state: `border-white/10` (hardcoded alpha)
- Footer top border: `border-white/5` (hardcoded alpha)
- Copyright border: `border-white/5` (hardcoded alpha)
- These should use `var(--border)` or `var(--glass-border)` for theme consistency.

### 3.6 Container & Layout ⚠ LOW

| Pattern | Usage |
|---|---|
| `container mx-auto px-4` | Most sections ✅ |
| `container mx-auto px-4 max-w-4xl` | Some sub-pages |
| `container mx-auto px-4 max-w-5xl` | Other sub-pages |
| `container mx-auto px-4 max-w-6xl` | Projects page |

The `max-w-*` constraint varies per page with no documented rationale.

---

## 4. Accessibility Concerns

### 4.1 Color Contrast ⚠ CRITICAL

**4.1.1 — `--muted-foreground` (description text)**

| Mode | Value | On Background | Ratio | WCAG AA Normal | WCAG AA Large |
|---|---|---|---|---|---|
| Light | `#64748b` | `#f8f9fc` | ~4.6:1 | ✅ Pass | ✅ Pass |
| Light | `#64748b` | `rgba(255,255,255,0.6)` on `#f8f9fc` (glass) | ~2.8:1 | ❌ FAIL | ❌ FAIL |
| Dark | `rgba(255,255,255,0.6)` | `#0a0a1a` | ~5.5:1 | ✅ Pass | ✅ Pass |
| Dark | `rgba(255,255,255,0.6)` | `rgba(255,255,255,0.05)` on `#0a0a1a` (glass) | ~1.8:1 | ❌ FAIL | ❌ FAIL |

> **Critical:** When `text-muted-foreground` is rendered inside a `glass-card` (which has a semi-transparent background), the effective contrast drops below WCAG AA minimums in **both** light and dark modes. This affects: hero bio text, project descriptions, stat labels, recent activity dates, contact CTA text, footer descriptions.

**4.1.2 — `gradient-text` (section headings)**

The gradient goes from `#3b82f6` (blue-500) to `#06b6d4` (cyan-500).

| Color | On `#f8f9fc` (light bg) | Ratio | WCAG AA |
|---|---|---|---|
| `#3b82f6` | Light | ~3.4:1 | ❌ FAIL (needs 4.5:1) |
| `#06b6d4` | Light | ~2.4:1 | ❌ FAIL |
| `#3b82f6` | `#0a0a1a` (dark bg) | ~4.8:1 | ✅ Pass |
| `#06b6d4` | `#0a0a1a` (dark bg) | ~5.8:1 | ✅ Pass |

> **Critical in light mode:** ALL gradient-text headings fail WCAG AA in light mode. The cyan end of the gradient is particularly problematic.

**4.1.3 — Hardcoded Colors**

| Element | Color | On | Ratio | WCAG AA |
|---|---|---|---|---|
| Status indicator | `bg-green-500` (`#22c55e`) | skin tone / bg | ~2.1:1 | ❌ FAIL (but decorative) |
| Heart icon | `text-red-500` (`#ef4444`) | dark footer bg | ~3.9:1 | ❌ FAIL for normal text |

### 4.2 Focus Management ⚠ HIGH

**4.2.1 — Global Focus Style**
```css
:focus-visible {
  outline: 2px solid var(--ring);  /* #3b82f6 */
  outline-offset: 2px;
}
```
This is a good baseline, BUT:

**4.2.2 — Overridden/Suppressed Focus**

| Component | Issue | Severity |
|---|---|---|
| `projects-client.tsx` (search/filter) | `focus:outline-none focus:ring-2 focus:ring-ring` | ⚠ Overrides global `:focus-visible` with Tailwind `focus:` (not `focus-visible:`) |
| `contact/page.tsx` (form inputs) | `focus:outline-none focus:ring-2 focus:ring-ring` | ⚠ Same — uses `focus:` instead of `focus-visible:` |
| **Header nav links** | No explicit focus style | ⚠ Relies on global `:focus-visible` — 2px blue outline on rounded-full links may look OK but untested |
| **Theme toggle** | No explicit focus style | ⚠ Same |
| **Footer social links** | No explicit focus style | ⚠ Same |
| **Glass-card-hover cards** | No focus style at all | 🔴 These are `<a>` links but have NO visible keyboard focus indicator |
| **Back to top button** | No explicit focus style | ⚠ Relies on global |
| **Mobile menu button** | No explicit focus style | ⚠ Relies on global |

**4.2.3 — `focus:` vs `focus-visible:`**
Form inputs use `focus:outline-none` which removes the outline for **all** focus types (including keyboard). They should use `focus-visible:outline-none` to preserve the outline for keyboard users.

### 4.3 Missing Interactive States ⚠ HIGH

| Element | Hover | Focus | Active | Disabled | Loading |
|---|---|---|---|---|---|
| Nav links | ✅ | ⚠ global only | ❌ | N/A | N/A |
| Project cards (`<a>`) | ✅ | ❌ none | ❌ | N/A | N/A |
| "View all projects" link | ✅ | ❌ none | ❌ | N/A | N/A |
| Footer social links | ✅ | ❌ none | ❌ | N/A | N/A |
| Contact CTA button | ✅ | ❌ none | ❌ | ❌ | ❌ |
| Theme toggle | ✅ | ⚠ global only | ❌ | N/A | N/A |
| Back to top | ✅ | ⚠ global only | ❌ | N/A | N/A |
| Mobile menu button | ✅ | ⚠ global only | ❌ | N/A | N/A |
| Form inputs | ❌ | ✅ | N/A | ❌ | N/A |

### 4.4 Screen Reader & Semantic Issues ⚠ MEDIUM

| Issue | Location | Detail |
|---|---|---|
| Status indicator has no accessible label | `hero.tsx:46` | Uses `title="Available for work"` — `title` is not reliably announced by screen readers. Needs `role="img"` + `aria-label`. |
| External links missing link type indication | `featured-projects.tsx`, `footer.tsx` | Links open in new tab (`target="_blank"`) but have no `sr-only` text or `aria-label` indicating this. The `ExternalLink` icon is visual-only. |
| Particle background not hidden from AT | `particles.tsx` | The `<div>` wrapper has no `aria-hidden="true"` — screen readers may attempt to interpret the tsparticles content. |
| Skip-to-content link | `globals.css` | CSS defined ✅, but needs verification that the HTML element exists in the layout. |
| `glass-card-hover` cards are links | `featured-projects.tsx:29` | The entire card is an `<a>` but contains child elements with their own hover states — keyboard focus should be visible on the card boundary. |

### 4.5 Motion Accessibility ⚠ HIGH

| Issue | Detail |
|---|---|
| No `prefers-reduced-motion` support | The global `*` transition (line 107), all Framer Motion animations, and all CSS keyframe animations run regardless of user motion preferences. |
| Particle background always animating | `ParticlesBackground` runs at 60fps continuously with no reduced-motion fallback. |
| Marquee animation | `.animate-marquee` runs infinitely with no pause mechanism for reduced-motion users (hover pause exists but is mouse-only). |
| Infinite animations | `animate-float`, `animate-pulse-glow`, `animate-ring-rotate`, `animate-gradient-shift` — all infinite, none respect reduced motion. |

---

## 5. Recommendations

### 5.1 Token Additions (Priority: HIGH)

Add these CSS custom properties to `:root` and `.dark`:

```css
/* Spacing scale */
--space-xs: 0.25rem;   /* 4px */
--space-sm: 0.5rem;    /* 8px */
--space-md: 1rem;      /* 16px */
--space-lg: 1.5rem;    /* 24px */
--space-xl: 2rem;      /* 32px */
--space-2xl: 3rem;     /* 48px */
--space-section: 4rem; /* 64px — standard section py */

/* Typography scale */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */

/* Font weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;

/* Shadows */
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
--shadow-md: 0 8px 32px rgba(0, 0, 0, 0.12);
--shadow-lg: 0 8px 40px rgba(0, 0, 0, 0.15);
--shadow-glow: 0 4px 20px rgba(59, 130, 246, 0.4);

/* Z-index scale */
--z-base: 0;
--z-dropdown: 10;
--z-sticky: 20;
--z-fixed: 30;
--z-modal: 40;
--z-popover: 50;
--z-toast: 60;

/* Animation timing */
--duration-fast: 0.15s;
--duration-normal: 0.3s;
--duration-slow: 0.5s;
--ease-default: ease;
--ease-in: ease-in;
--ease-out: ease-out;
--ease-in-out: ease-in-out;

/* Radius (extend existing) */
--radius-2xl: calc(var(--radius) + 8px);  /* 20px */
```

### 5.2 Consistency Fixes (Priority: HIGH)

**5.2.1 — Standardize Section Spacing**
All homepage sections should use a consistent `py-16` (or tokenized `py-[var(--space-section)]`). Exceptions:
- `tech-stack-marquee`: `py-8` is acceptable for a visual divider, but document why
- `footer`: change `py-10` → `py-12` or `py-16`

**5.2.2 — Standardize Border Radius**
- All glass cards: `rounded-xl` (unified)
- Contact CTA: `rounded-2xl` → `rounded-xl`
- CardSkeleton: `rounded-lg` → `rounded-xl`
- Sub-page cards: `rounded-lg` → `rounded-xl`
- All buttons/CTAs: `rounded-full` (already mostly consistent)
- Error boundary / not-found buttons: `rounded-md` → `rounded-full`

**5.2.3 — Consolidate Animation System**
1. Create a `lib/motion-variants.ts` file with shared Framer Motion variants:
   ```ts
   export const fadeInUp = {
     initial: { opacity: 0, y: 20 },
     whileInView: { opacity: 1, y: 0 },
     viewport: { once: true },
     transition: { duration: 0.5 },
   };
   // etc.
   ```
2. Remove unused CSS animation classes OR use them (but don't maintain both systems dead code)
3. Standardize stagger delay: use `0.08s` everywhere (matches StaggerContainer)

**5.2.4 — Standardize Focus Styles**
- Replace all `focus:outline-none` with `focus-visible:outline-none`
- Add explicit focus-visible styles to all interactive cards/links
- Ensure glass-card-hover `<a>` elements get a visible focus ring

**5.2.5 — Standardize Section Headings**
Replace inline section headings in `featured-projects.tsx` and `recent-activity.tsx` with the `<SectionHeading>` shared component. It already supports the same `title` + `description` pattern with consistent animation.

### 5.3 Accessibility Fixes (Priority: CRITICAL)

**5.3.1 — Fix Gradient Text Contrast (Light Mode)**
Options:
- **A)** Darken gradient colors for light mode: `--gradient-start: #2563eb` (blue-600, 4.6:1), `--gradient-end: #0891b2` (cyan-600, 4.5:1)
- **B)** Add a subtle text-shadow or darker fallback in light mode
- **C)** Add a semi-transparent dark background behind gradient text in light mode

**Recommendation:** Option A — adjust dark mode gradient to be brighter (`#60a5fa` → `#22d3ee`) while keeping light mode gradient at WCAG-compliant darker shades.

**5.3.2 — Fix Glass Card Text Contrast**
- Increase `--card-foreground` contrast or decrease glass transparency
- Add a subtle solid background tint behind text inside glass cards
- Consider using `--card` (0.7 opacity light / 0.05 dark) for text-heavy cards instead of `--glass`

**5.3.3 — Add `prefers-reduced-motion` Support**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
Also in Framer Motion, use `useReducedMotion()` to disable animations.

**5.3.4 — Add `aria-hidden` to Decorative Elements**
- `ParticlesBackground` wrapper: add `aria-hidden="true"`
- `glow-orb` elements: add `aria-hidden="true"`
- Gradient line dividers: add `aria-hidden="true"`

**5.3.5 — Fix Status Indicator Accessibility**
```tsx
// hero.tsx:46
<div
  className="absolute bottom-2 right-2 w-4 h-4 md:w-5 md:h-5 bg-green-500 rounded-full ring-3 ring-[var(--background)] shadow-lg shadow-green-500/30"
  role="img"
  aria-label="Available for work"
/>
```

**5.3.6 — External Link Indicators**
Add `sr-only` text to external links:
```tsx
<span className="sr-only">(opens in new tab)</span>
```

### 5.4 Missing Component States (Priority: MEDIUM)

| State | Current | Needed |
|---|---|---|
| **Button loading** | ❌ Not implemented | Add spinner + `disabled` state to `btn-gradient` |
| **Button disabled** | ❌ No visual style | Add `opacity-50 cursor-not-allowed` |
| **Card loading** | ✅ `CardSkeleton` exists | But doesn't use glassmorphic styling — should match actual cards |
| **Card error** | ❌ Not implemented | Error state for failed data fetching in cards |
| **Card empty** | ✅ `EmptyState` exists | But doesn't use glassmorphic styling |
| **Form input error** | ⚠ Basic (react-hook-form) | Needs visual error state (red border, error message) |
| **Form input disabled** | ❌ Not implemented | Add disabled styling |
| **Nav active (mobile)** | ✅ Works | But no transition animation between states |
| **Theme toggle loading** | ✅ SSR-safe | Returns placeholder div — good |
| **Section loading** | ⚠ Varies | Some pages use `CardGridSkeleton`, others don't handle loading |

### 5.5 Animation Performance (Priority: MEDIUM)

**5.5.1 — Remove Global Transition**
```css
/* REMOVE this — it forces ALL properties on ALL elements to transition */
* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}
```
Replace with targeted transitions only on theme-toggleable elements:
```css
body, .glass-card, .glass-card-hover, header, footer {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
```

**5.5.2 — Particle Background Optimization**
- Add `will-change: transform` to the particle container
- Consider pausing particles when not in viewport (using IntersectionObserver)
- Add a `prefers-reduced-motion` fallback that shows a static gradient instead

**5.5.3 — Backdrop-Filter Performance**
The `backdrop-filter: blur(20px)` on every `glass-card` is expensive. On mobile:
- Consider reducing blur to `blur(12px)` on mobile
- Limit the number of simultaneous glass-card elements with active backdrop-filter

**5.5.4 — Consolidate Framer Motion**
- Replace inline variants with shared variant configs
- Use `StaggerContainer` + `StaggerItem` in sections that currently use manual index-based delays
- Add `layout` prop to animated cards for smooth re-ordering

### 5.6 Dead Code Cleanup (Priority: LOW)

| Item | Location | Action |
|---|---|---|
| `glass-pill` class | `globals.css:208-216` | Remove or use (currently unused) |
| `gradient-border` class | `globals.css:147-168` | Remove or use (currently unused) |
| `glow-orb-blue` class | `globals.css:186-188` | Remove or use (currently unused) |
| `glow-orb-pink` class | `globals.css:190-192` | Remove or use (currently unused) |
| 10 CSS animation classes | `globals.css:332-379` | Remove or use (only `.animate-marquee` is used) |
| `@keyframes` definitions | `globals.css:276-330` | Remove unused keyframes (fade-in, slide-in-*, scale-in, float, pulse-glow, ring-rotate, gradient-shift) |

### 5.7 Summary Priority Matrix

| Priority | Action | Effort | Impact |
|---|---|---|---|
| 🔴 P0 | Fix gradient-text contrast in light mode | Low | High — affects ALL headings |
| 🔴 P0 | Fix glass-card text contrast | Medium | High — affects ALL card content |
| 🔴 P0 | Add `prefers-reduced-motion` support | Low | High — accessibility requirement |
| 🟠 P1 | Add focus-visible styles to all interactive elements | Medium | High — keyboard navigation |
| 🟠 P1 | Consolidate animation system (shared variants) | Medium | Medium — maintainability |
| 🟠 P1 | Standardize section spacing | Low | Medium — visual rhythm |
| 🟡 P2 | Add missing token categories (spacing, shadows, z-index) | Low | Medium — consistency |
| 🟡 P2 | Replace inline section headings with `SectionHeading` | Low | Medium — consistency |
| 🟡 P2 | Standardize border radius | Low | Medium — visual consistency |
| 🟡 P2 | Add `aria-hidden` to decorative elements | Low | Medium — screen reader UX |
| 🟢 P3 | Remove dead CSS code | Low | Low — bundle size |
| 🟢 P3 | Add missing component states (loading, error, disabled) | Medium | Low — polish |
| 🟢 P3 | Optimize particle background performance | Medium | Low — mobile perf |
| 🟢 P3 | Standardize `max-w-*` container widths | Low | Low — consistency |

---

## Appendix A: Files Audited

| File | Lines | Role |
|---|---|---|
| `src/app/globals.css` | 380 | Design tokens, glassmorphism utilities, animations |
| `src/components/layout/header.tsx` | 116 | Glassmorphic navigation |
| `src/components/layout/footer.tsx` | 93 | Footer with glass social icons |
| `src/components/sections/hero.tsx` | 67 | Facebook-style profile layout |
| `src/components/sections/featured-projects.tsx` | 84 | Glassmorphic project cards |
| `src/components/sections/contact-cta.tsx` | 50 | Gradient CTA section |
| `src/components/sections/stats-overview.tsx` | 49 | GitHub stats grid |
| `src/components/sections/recent-activity.tsx` | 105 | Activity timeline |
| `src/components/sections/tech-stack-marquee.tsx` | 41 | Scrolling tech marquee |
| `src/components/shared/particles.tsx` | 67 | tsParticles background |
| `src/components/shared/section-heading.tsx` | 30 | Reusable section heading |
| `src/components/shared/page-transition.tsx` | 66 | Animation wrappers |
| `src/components/shared/loading-skeleton.tsx` | 59 | Loading states |
| `src/components/shared/empty-state.tsx` | 25 | Empty state |
| `src/components/shared/error-boundary.tsx` | 55 | Error boundary |
| `src/components/shared/theme-toggle.tsx` | 40 | Theme switch |
| `src/components/shared/back-to-top.tsx` | 38 | Scroll-to-top FAB |
| `src/config/site.ts` | 19 | Site metadata |

## Appendix B: Token Usage Heatmap

```
Token                    Light  Dark  Components Using
─────────────────────────────────────────────────────────
--glass                  ✅     ✅     header, hero, tech-marquee, contact-cta, projects
--glass-border           ✅     ✅     header, hero, contact-cta, recent-activity
--glass-hover            ✅     ✅     (via glass-card-hover class)
--gradient-start         ✅     ✅     header, footer, stats, projects, activity, contact
--gradient-end           ✅     ✅     header, stats, projects, activity
--accent                 ✅     ✅     header (nav active), projects (tags)
--accent-foreground      ✅     ✅     header (nav active), projects (tags)
--muted-foreground       ✅     ✅     EVERYWHERE (descriptions, labels, dates)
--background             ✅     ✅     hero (ring), marquee (fade edges)
--primary                ✅     ✅     back-to-top, error-boundary, not-found
--ring                   ✅     ✅     projects (search), contact (form inputs)
--border                 ✅     ✅     (via @apply border-border in base)
```
