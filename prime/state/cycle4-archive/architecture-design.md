# Architecture Design — Portfolio Polish

> **Version:** 1.0
> **Date:** 2026-08-25
> **Status:** Draft — Pending User Approval
> **Author:** PRIME Requirements Specialist (Phase 3 Part A)

---

## 1. Current Architecture Audit

### 1.1 Technology Stack

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Framework | Next.js (App Router) | 16.2.10 | Static export mode |
| UI Library | React | 19.2.4 | Server + Client components |
| Styling | Tailwind CSS | 4.x | Via `@tailwindcss/postcss` |
| Animation | Framer Motion | 12.42.2 | Page transitions, stagger effects |
| Particles | tsParticles | 4.3.1 | `@tsparticles/react` + `@tsparticles/slim` |
| Theming | next-themes | 0.4.6 | Class-based, system preference detection |
| Data Fetching | @tanstack/react-query | 5.101.2 | Client-side GitHub stats |
| Forms | react-hook-form + zod | 7.81 / 4.4.3 | Contact form validation |
| Icons | lucide-react + react-icons | 1.23 / 5.7 | Tree-shaken via `optimizePackageImports` |
| Deployment | Cloudflare Pages | — | Static `out/` directory |
| CI/CD | GitHub Actions | — | Build + deploy on push to `main` |

### 1.2 File/Folder Structure

```
portfolio/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout (Server Component)
│   │   ├── page.tsx                  # Home page (Server Component)
│   │   ├── globals.css               # Global styles, CSS vars, animations
│   │   ├── error.tsx                 # Global error boundary (Client Component)
│   │   ├── not-found.tsx             # 404 page (Client Component)
│   │   ├── manifest.ts              # PWA manifest
│   │   ├── robots.ts                # robots.txt generator
│   │   ├── sitemap.ts               # sitemap.xml generator
│   │   ├── about/
│   │   │   ├── page.tsx             # Server Component (metadata)
│   │   │   └── about-client.tsx     # Client Component (UI)
│   │   ├── blog/
│   │   │   ├── page.tsx             # Blog listing (Client Component)
│   │   │   └── [slug]/page.tsx      # Blog post (Server Component, SSG)
│   │   ├── contact/page.tsx         # Contact form (Client Component)
│   │   ├── projects/
│   │   │   ├── page.tsx             # Server Component (metadata)
│   │   │   └── projects-client.tsx  # Client Component (UI + filtering)
│   │   ├── stats/
│   │   │   ├── page.tsx             # Server Component (metadata)
│   │   │   └── stats-client.tsx     # Client Component (React Query)
│   │   ├── [13 other route dirs]    # Skills, Experience, Education, etc.
│   │
│   ├── components/
│   │   ├── providers.tsx            # 'use client' — ThemeProvider + QueryClient + ParticlesProvider
│   │   ├── layout/
│   │   │   ├── header.tsx           # 'use client' — Glassmorphic nav + mobile menu
│   │   │   └── footer.tsx          # Server Component — Static footer
│   │   ├── sections/
│   │   │   ├── hero.tsx             # 'use client' — Cover + profile pic
│   │   │   ├── featured-projects.tsx # 'use client' — Project cards
│   │   │   ├── tech-stack-marquee.tsx # 'use client' — Scrolling tech badges
│   │   │   ├── stats-overview.tsx   # 'use client' — GitHub stat cards
│   │   │   ├── contact-cta.tsx      # 'use client' — Contact CTA section
│   │   │   └── recent-activity.tsx  # 'use client' — GitHub event feed
│   │   └── shared/
│   │       ├── back-to-top.tsx      # 'use client' — Scroll-to-top button
│   │       ├── empty-state.tsx      # Server Component — No-data placeholder
│   │       ├── error-boundary.tsx   # 'use client' — Class-based error boundary (UNUSED)
│   │       ├── loading-skeleton.tsx # Server Component — Loading placeholders
│   │       ├── page-transition.tsx  # 'use client' — Framer Motion wrapper
│   │       ├── particles.tsx        # 'use client' — tsParticles background
│   │       ├── section-heading.tsx  # 'use client' — Animated section titles
│   │       └── theme-toggle.tsx     # 'use client' — Dark/light toggle
│   │
│   ├── config/
│   │   ├── site.ts                  # Site metadata, URLs, social links
│   │   └── navigation.ts           # Nav items, route list
│   │
│   ├── data/                        # Static data files (10 files)
│   │   ├── achievements.ts, blog.ts, certifications.ts
│   │   ├── education.ts, experience.ts, now.ts
│   │   ├── projects.ts, skills.ts, testimonials.ts, uses.ts
│   │
│   └── lib/
│       ├── github/
│       │   ├── api.ts               # GitHub REST API client (no retry logic)
│       │   └── stats.ts             # Stats computation, contribution calendar
│       ├── types.ts                  # TypeScript interfaces (all data models)
│       └── utils.ts                  # Utility functions (cn, formatDate, etc.)
│
├── public/                           # Static assets
│   ├── cover.png, profile.png       # Hero images
│   └── *.svg, favicon.ico           # Icons
│
├── next.config.ts                    # output: 'export', images.unoptimized: true
├── tsconfig.json                     # strict: true, path alias @/*
├── postcss.config.mjs               # @tailwindcss/postcss
├── wrangler.toml                     # Cloudflare Pages config
└── .github/workflows/ci.yml         # Build + deploy pipeline
```

### 1.3 Component Hierarchy (Render Tree)

```
<html> ─── [Server]
  <body>
    <Providers> ─── [Client] ─── QueryClientProvider → ParticlesProvider → ThemeProvider
      <ParticlesBackground /> ─── [Client] ─── tsParticles canvas (fixed, -z-10)
      <Header /> ─── [Client] ─── Sticky glass nav + mobile AnimatePresence menu
        <ThemeToggle /> ─── [Client]
      <main #main-content>
        {children} ─── Page content (varies by route)
          <PageTransition> ─── [Client] ─── motion.div wrapper
            <SectionHeading /> ─── [Client]
            ... page-specific components ...
      </main>
      <Footer /> ─── [Server] ─── Static footer with links
      <BackToTop /> ─── [Client] ─── Scroll-triggered button
    </Providers>
  </body>
</html>
```

### 1.4 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        BUILD TIME                                │
│                                                                   │
│  ┌──────────────┐     ┌──────────────────┐     ┌─────────────┐  │
│  │ GitHub API   │────→│ Server Components │────→│ Static HTML │  │
│  │ (REST v3)    │     │ (page.tsx files)  │     │ (out/*.html)│  │
│  └──────────────┘     └──────────────────┘     └─────────────┘  │
│         │                      │                                   │
│         │              fetchRepos()                                │
│         │              computeGitHubStats()                        │
│         │              .catch(() => fallback)                      │
│         │                      │                                   │
│         │              Props passed to                             │
│         │              client components                           │
│         ▼                      ▼                                   │
│  ┌──────────────┐     ┌──────────────────┐                       │
│  │ src/data/*   │────→│ Client Components │                       │
│  │ (static TS)  │     │ (imported at      │                       │
│  │              │     │  build time)      │                       │
│  └──────────────┘     └──────────────────┘                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        RUNTIME (Browser)                          │
│                                                                   │
│  ┌──────────────────┐     ┌──────────────┐                      │
│  │ stats-client.tsx │────→│ GitHub API   │  ← React Query       │
│  │ (useQuery)       │     │ (direct CORS)│    (client-side)     │
│  └──────────────────┘     └──────────────┘                      │
│                                                                   │
│  ┌──────────────────┐     ┌──────────────┐                      │
│  │ contact/page.tsx │────→│ /api/contact │  ← ⚠️ BROKEN         │
│  │ (form submit)    │     │ (doesn't     │    (static export)   │
│  │                  │     │  exist)      │                       │
│  └──────────────────┘     └──────────────┘                      │
└─────────────────────────────────────────────────────────────────┘
```

**Key observation:** `stats-client.tsx` calls `computeGitHubStats()` from the client via React Query. This function internally calls `fetchRepos()` → `githubFetch()` which uses `next: { revalidate }` — a server-only option. At runtime in the browser, the `next` option is silently ignored by the native `fetch()` API, so the call works but without caching. This is a latent architectural inconsistency but not a blocking bug.

### 1.5 Static Export Constraints

| Feature | Available? | Notes |
|---|---|---|
| Server Components (build-time) | ✅ Yes | Data fetched during `next build` |
| Client Components | ✅ Yes | Full interactivity |
| API Routes | ❌ No | `output: 'export'` strips all server routes |
| Middleware | ❌ No | No `middleware.ts` support |
| Image Optimization | ❌ No | `images.unoptimized: true` required |
| ISR / Revalidation | ❌ No | Static only, no server to revalidate |
| Redirects (server) | ❌ No | Must use `<meta>` or client-side |
| Static Params (SSG) | ✅ Yes | `generateStaticParams` works at build time |
| Metadata export | ✅ Yes | Rendered to static `<head>` at build time |

### 1.6 CSS Architecture

```
globals.css
├── @import "tailwindcss"                    # Tailwind CSS 4 entry
├── @theme inline { ... }                    # CSS var → Tailwind token mapping
│   ├── --color-background → var(--background)
│   ├── --color-primary → var(--primary)
│   ├── --color-glass → var(--glass)
│   └── [24 color tokens + 4 radius tokens + 2 font tokens]
│
├── :root { ... }                            # Light theme variables
│   └── 22 CSS custom properties
│
├── .dark { ... }                            # Dark theme variables (class-based)
│   └── 22 CSS custom properties (mirror of :root)
│
├── @layer base { ... }                      # Base styles
│   ├── * { border-border }
│   ├── body { bg-background, text-foreground }
│   └── .dark body { gradient background }
│
├── * { transition: ... }                   # ⚠️ GLOBAL TRANSITION (to be fixed)
│   └── background-color, color, border-color, box-shadow — 0.3s ease
│
├── Glassmorphism Utilities                  # Custom CSS classes
│   ├── .glass-card                          # backdrop-filter: blur(20px)
│   ├── .glass-card-hover                    # + hover effects
│   ├── .gradient-text                       # background-clip: text
│   ├── .gradient-border                     # ::before pseudo-element
│   ├── .glow-orb, .glow-orb-*              # Decorative blurred circles
│   ├── .btn-gradient                        # Gradient button
│   ├── .glass-pill                          # Glass badge
│   └── .gradient-line                       # 2px gradient divider
│
├── Scrollbar + Selection + Focus            # Browser chrome styling
├── Skip-to-content                          # Accessibility
├── @keyframes (12 animations)               # fade-in, slide, float, marquee, etc.
└── .animate-* utility classes               # Animation bindings
```

**Design pattern:** The site uses a dual-layer styling approach:
1. **Tailwind CSS 4** for layout, spacing, typography, and responsive design
2. **CSS custom properties + custom classes** for the glassmorphism design system

Theme switching is handled by `next-themes` toggling `.dark` class on `<html>`, which swaps all CSS variable values.

### 1.7 Dependency Graph (Import Map)

```
┌─────────────────────────────────────────────────────────────┐
│                    EXTERNAL DEPENDENCIES                      │
│                                                               │
│  next ──── react, react-dom                                  │
│  tailwindcss ──── @tailwindcss/postcss                       │
│  framer-motion (standalone)                                   │
│  @tsparticles/react ──── @tsparticles/slim ──── @tsparticles/engine │
│  next-themes (standalone)                                     │
│  @tanstack/react-query (standalone)                           │
│  react-hook-form ──── @hookform/resolvers ──── zod           │
│  lucide-react (standalone)                                    │
│  react-icons (tree-shaken via optimizePackageImports)         │
│  clsx + tailwind-merge ──── used by cn() utility             │
│  class-variance-authority ──── available but UNUSED           │
│  date-fns ──── available but UNUSED                           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    INTERNAL DEPENDENCIES                       │
│                                                               │
│  @/lib/utils (cn) ──── imported by: header, back-to-top      │
│  @/config/site ──── imported by: layout, header, footer,     │
│                     contact, manifest, robots, sitemap        │
│  @/config/navigation ──── imported by: header, sitemap       │
│  @/lib/github/api ──── imported by: page.tsx (home), stats   │
│  @/lib/github/stats ──── imported by: page.tsx (home), stats │
│  @/data/* ──── imported by: respective page components       │
│  @/components/shared/* ──── imported by: pages + sections    │
│  @/components/layout/* ──── imported by: layout.tsx only     │
│  @/components/providers ──── imported by: layout.tsx only    │
│  @/components/sections/* ──── imported by: page.tsx (home)   │
└─────────────────────────────────────────────────────────────┘
```

**Unused dependencies detected:**
- `class-variance-authority` — imported nowhere in the codebase
- `date-fns` — imported nowhere; the codebase uses custom `formatDate()` in utils.ts

---

## 2. Architectural Approach per Improvement

### 2.1 TypeScript Strictness — Fix `as any` in Contact Form Resolver

**Current state:**
```typescript
// src/app/contact/page.tsx:26
const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactForm>({
  resolver: zodResolver(contactSchema) as any,  // ← TYPE ESCAPE
});
```

**Root cause analysis:**
The `as any` cast exists because of a type incompatibility between:
- `zod` v4.4.3 (uses `z.ZodType` with different generic structure)
- `@hookform/resolvers` v5.4.0 (expects `z.ZodObject` or specific generic shape)
- `react-hook-form` v7.81.0 (has its own `FieldValues` constraint)

Zod v4 changed its type signatures compared to v3, and the resolver package may not have fully caught up.

**Architectural approach:**

```typescript
// Option A (RECOMMENDED): Use Resolver type from react-hook-form
import type { Resolver } from 'react-hook-form';

const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactForm>({
  resolver: zodResolver(contactSchema) as unknown as Resolver<ContactForm>,
});
```

```typescript
// Option B: Type the resolver inline with satisfies
const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactForm>({
  resolver: zodResolver(contactSchema) as Resolver<ContactForm>,
});
// Requires: import type { Resolver } from 'react-hook-form';
```

```typescript
// Option C (CLEANEST): If @hookform/resolvers supports Zod v4 natively
// after a package update, simply remove the cast:
const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactForm>({
  resolver: zodResolver(contactSchema),
});
```

**Recommendation:** Try Option C first — update `@hookform/resolvers` to latest and check if the type error disappears. If not, use Option B (single cast to `Resolver<ContactForm>` which is the correct semantic type, not `any`). This replaces an unsafe `as any` with a safe, semantically meaningful cast.

**Files affected:** `src/app/contact/page.tsx` (1 line change + 1 import)

---

### 2.2 Contact Form — Static Export Form Submission

**Current state:**
```typescript
// src/app/contact/page.tsx
const onSubmit = async (data: ContactForm) => {
  const res = await fetch('/api/contact', { ... });  // ← BROKEN: no API route in static export
};
```

**Constraint:** `output: 'export'` means NO API routes exist at runtime. The form must use an external service or `mailto:`.

**Option comparison:**

| Approach | Pros | Cons | Verdict |
|---|---|---|---|
| `mailto:` link | Zero dependencies, works everywhere, no service account needed | Opens email client (poor UX on mobile), no spam protection, no success tracking | Fallback only |
| Web3Forms | Free tier (250 submissions/mo), no signup for basic, simple POST API, spam protection | External dependency, rate-limited | ✅ **Recommended** |
| Formspree | Well-established, reliable | Requires account, free tier limited (50/mo) | Alternative |
| Cloudflare Worker | Full control, no third-party | Adds infrastructure complexity, goes against simplicity | Overkill |

**Recommended approach: Web3Forms with `mailto:` fallback**

```typescript
// Architecture:
// 1. Form submits to Web3Forms API endpoint via fetch POST
// 2. Web3Forms delivers email to site owner
// 3. If Web3Forms fails, fall back to constructing a mailto: link
// 4. No new npm dependencies — just a fetch() call

const WEB3FORMS_ACCESS_KEY = '...'; // Stored in siteConfig or env var

const onSubmit = async (data: ContactForm) => {
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        ...data,
      }),
    });
    if (res.ok) {
      setSubmitted(true);
      reset();
    } else {
      throw new Error('Submission failed');
    }
  } catch {
    // Fallback: open mailto: with pre-filled data
    const mailtoUrl = `mailto:${siteConfig.email.replace('mailto:', '')}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`From: ${data.name}\n\n${data.message}`)}`;
    window.location.href = mailtoUrl;
  }
};
```

**Configuration:** Add `WEB3FORMS_ACCESS_KEY` to `siteConfig` or use `NEXT_PUBLIC_WEB3FORMS_KEY` env var.

**Files affected:** `src/app/contact/page.tsx`, `src/config/site.ts`

---

### 2.3 Image Optimization — Convert `<img>` to Next.js `<Image>`

**Current state:**
```tsx
// src/components/sections/hero.tsx:15
<img
  src={`${basePath}/cover.png`}
  alt="Cover banner"
  className="w-full h-auto block"
/>
```

**Constraint:** `next.config.ts` has `images: { unoptimized: true }` because static export doesn't support Next.js image optimization at runtime. However, `<Image>` still provides benefits: lazy loading, proper sizing attributes, and build-time validation.

**Architectural approach:**

```tsx
import Image from 'next/image';

// Cover image — use fill with positioned parent, or explicit dimensions
<div className="relative w-full overflow-hidden" style={{ aspectRatio: '1200/400' }}>
  <Image
    src={`${basePath}/cover.png`}
    alt="Cover banner"
    fill
    className="object-cover"
    priority  // Above the fold — LCP candidate
  />
</div>
```

**Alternative (simpler):** If the cover image dimensions are known:
```tsx
<Image
  src={`${basePath}/cover.png`}
  alt="Cover banner"
  width={1200}
  height={400}
  className="w-full h-auto block"
  priority
/>
```

**Note on `unoptimized: true`:** Keep this setting. With static export, Next.js can't run an image optimization server. The `<Image>` component still provides:
- Build-time image validation (correct paths, sizes)
- Proper `width`/`height` HTML attributes (prevents CLS)
- `priority` prop for preload hint generation
- Lazy loading by default for non-priority images

**Files affected:** `src/components/sections/hero.tsx` (1 component change)

---

### 2.4 Particles Lazy Loading — Dynamic Import

**Current state:**
```tsx
// src/components/providers.tsx
import { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

// ParticlesProvider wraps ALL children, initializing tsParticles eagerly
<ParticlesProvider init={loadSlim}>
  <ThemeProvider ...>{children}</ThemeProvider>
</ParticlesProvider>
```

```tsx
// src/components/shared/particles.tsx
// Uses mounted state guard but no code splitting
export function ParticlesBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <Particles ... />;
}
```

**Problem:** tsParticles bundle (~50-80KB) loads in the main chunk, blocking initial render. The `mounted` guard prevents SSR mismatch but doesn't code-split.

**Architectural approach:**

```tsx
// src/components/shared/particles.tsx — Convert to dynamic export
import dynamic from 'next/dynamic';

const ParticlesClient = dynamic(
  () => import('./particles-client'),
  { ssr: false }
);

export function ParticlesBackground() {
  return <ParticlesClient />;
}
```

```tsx
// src/components/shared/particles-client.tsx — New file
// Move current ParticlesBackground implementation here
'use client';
// ... existing implementation ...
```

**For ParticlesProvider in providers.tsx:**
The `ParticlesProvider` must remain in the provider tree because it provides context. However, we can defer its initialization:

```tsx
// Option: Remove ParticlesProvider from providers.tsx entirely
// The Particles component can self-initialize via loadSlim in the dynamic component
// This simplifies the provider tree and removes the eager initialization
```

**Revised approach:** Since `ParticlesProvider` with `init={loadSlim}` is what triggers the eager load, and the `Particles` component needs this context, the cleanest approach is:

1. Remove `ParticlesProvider` from `providers.tsx`
2. In the dynamically-imported particles component, wrap it with its own provider:

```tsx
// particles-client.tsx
'use client';
import { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { Particles } from '@tsparticles/react';

export default function ParticlesClient() {
  // ... existing options logic ...
  return (
    <ParticlesProvider init={loadSlim}>
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Particles id="tsparticles" options={options} />
      </div>
    </ParticlesProvider>
  );
}
```

This way, both the provider AND the particles are lazy-loaded together.

**Files affected:** `src/components/shared/particles.tsx`, `src/components/shared/particles-client.tsx` (new), `src/components/providers.tsx`

---

### 2.5 Error Boundaries — Placement in Component Tree

**Current state:**
- `ErrorBoundary` component exists at `src/components/shared/error-boundary.tsx`
- It is **never imported or used** anywhere in the codebase
- `error.tsx` exists at the App Router level but only catches errors during navigation/rendering at the route level

**Problem:** If a client component throws during rendering, the error may propagate to the route-level `error.tsx`, which replaces the ENTIRE page including header and footer. A component-level error boundary can catch errors more granularly.

**Architectural approach:**

```
<html>
  <body>
    <Providers>
      <ParticlesBackground />
      <Header />                          ← Always visible
      <ErrorBoundary fallback={<MainContentError />}>  ← NEW
        <main id="main-content">
          {children}
        </main>
      </ErrorBoundary>
      <Footer />                          ← Always visible
      <BackToTop />
    </Providers>
  </body>
</html>
```

**Rationale:**
- Wrapping `<main>` content only (not Header/Footer) ensures the navigation remains functional even if page content crashes
- The route-level `error.tsx` remains as a last-resort catch-all for errors that occur before/during the ErrorBoundary mount
- The ErrorBoundary's "Try again" button calls `setState({ hasError: false })` to re-render children

**Files affected:** `src/app/layout.tsx` (add import + wrap `<main>`)

---

### 2.6 GitHub API Retry — Exponential Backoff Wrapper

**Current state:**
```typescript
// src/lib/github/api.ts
async function githubFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  // ... single attempt, no retry ...
  const response = await fetch(url, { headers, next: ... });
  if (!response.ok) throw new Error(...);
  return response.json();
}
```

**Architectural approach:**

```typescript
// Wrap githubFetch with retry logic
const TRANSIENT_STATUS = new Set([429, 500, 502, 503, 504]);
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;

async function githubFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  // ... existing setup ...

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(url, { headers, ... });

      if (response.ok) {
        return response.json() as Promise<T>;
      }

      // Non-transient error — fail immediately
      if (!TRANSIENT_STATUS.has(response.status)) {
        const body = await response.text();
        throw new Error(`GitHub API error: ${response.status} ${response.statusText} - ${body}`);
      }

      // Transient error — retry with backoff
      lastError = new Error(`GitHub API ${response.status} on attempt ${attempt + 1}`);

      if (attempt < MAX_RETRIES) {
        const delay = BASE_DELAY_MS * Math.pow(2, attempt); // 1s, 2s, 4s
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    } catch (error) {
      // Network error — retry
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt < MAX_RETRIES) {
        const delay = BASE_DELAY_MS * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError ?? new Error('GitHub API request failed after retries');
}
```

**Key design decisions:**
- Only retry on transient HTTP status codes (429, 5xx) — NOT on 404, 403
- Exponential backoff: 1s → 2s → 4s (total max wait: 7s + request time)
- Network errors (fetch throws) are also retried
- After all retries exhausted, throw the last error (which callers already handle with `.catch()`)

**Files affected:** `src/lib/github/api.ts` (modify `githubFetch` function)

---

### 2.7 JSON-LD Structured Data

**Current state:** No JSON-LD exists anywhere in the codebase.

**Architectural approach:**

Add a `<script type="application/ld+json">` tag directly in `layout.tsx`. Since this is a Server Component, the JSON-LD is rendered at build time into every page's HTML.

```tsx
// src/app/layout.tsx
import { siteConfig } from '@/config/site';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: siteConfig.displayName,
      url: siteConfig.url,
      jobTitle: siteConfig.title.split(' - ')[1] || 'Developer',
      sameAs: [
        siteConfig.github,
        siteConfig.linkedin,
      ],
      image: siteConfig.ogImage,
      description: siteConfig.description,
    },
    {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      name: siteConfig.displayName,
      url: siteConfig.url,
      description: siteConfig.description,
      publisher: { '@id': `${siteConfig.url}/#person` },
    },
  ],
};

// In the <head> area (via Next.js metadata or inline script):
export default function RootLayout({ children }: ...) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body ...>
        ...
      </body>
    </html>
  );
}
```

**Note:** In Next.js App Router, adding `<head>` content directly in layout works. Alternatively, can use a dedicated component that returns the script tag within the body.

**Files affected:** `src/app/layout.tsx`

---

### 2.8 Global Transition Fix

**Current state:**
```css
/* globals.css:105-108 */
/* Smooth theme transitions */
* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}
```

**Problem:** This rule applies transition animations to EVERY element in the DOM. When any of these properties change (not just during theme switches), the browser must:
1. Calculate style differences on all elements
2. Animate the transition on every element that has a changing property
3. This causes unnecessary repaints and can cause jank during animations (Framer Motion), hover effects, and page transitions

**Architectural approach:**

Remove the global rule entirely. Theme transition smoothness is already handled by:
- `next-themes` with `disableTransitionOnChange` prop (already set in providers.tsx)
- Individual component transitions (e.g., `transition-colors` on buttons, cards, links)

For users who want smooth theme switching, add a scoped transition class:

```css
/* Replace the * rule with a scoped class */
.theme-transition {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}
```

Then apply `.theme-transition` only to major layout elements that should animate during theme changes:

```tsx
// In layout.tsx or component classes:
<body className="... theme-transition">
<header className="... theme-transition">
<main className="... theme-transition">
<footer className="... theme-transition">
```

**Alternative (simplest):** Just remove the global rule. The `next-themes` `disableTransitionOnChange` already prevents FOUC during theme switches. Individual components already have their own `transition-colors` or `transition-all` classes. No replacement needed.

**Recommendation:** Just remove it. The existing component-level transitions and `disableTransitionOnChange` are sufficient.

**Files affected:** `src/app/globals.css` (remove 4 lines)

---

### 2.9 Focus Trap — Mobile Navigation

**Current state:**
```tsx
// src/components/layout/header.tsx
// Mobile nav opens via AnimatePresence but has NO focus management
<AnimatePresence>
  {mobileOpen && (
    <motion.nav ...>
      {mainNavItems.map((item) => (
        <Link key={item.href} href={item.href} ...>{item.title}</Link>
      ))}
    </motion.nav>
  )}
</AnimatePresence>
```

**Problem:** When mobile nav is open, Tab key moves focus to elements behind the menu (main content, footer). This violates WCAG 2.4.3 (Focus Order) and 1.3.1 (Info and Relationships).

**Architectural approach:**

Implement a custom `useFocusTrap` hook in `header.tsx`:

```typescript
// Custom hook — no external dependencies
function useFocusTrap(isActive: boolean, containerRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    if (!container) return;

    const focusableSelector = 'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        return;
      }

      if (e.key !== 'Tab') return;

      const focusable = container.querySelectorAll<HTMLElement>(focusableSelector);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Focus first element on open
    const firstFocusable = container.querySelector<HTMLElement>(focusableSelector);
    firstFocusable?.focus();

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);
}
```

**Integration with header.tsx:**
```tsx
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileNavRef = useRef<HTMLElement>(null);

  useFocusTrap(mobileOpen, mobileNavRef);

  // ... existing code, add ref to mobile nav:
  <motion.nav ref={mobileNavRef} ...>
```

**Key design decisions:**
- Custom hook (no library) — respects NFR-004 (no new dependencies)
- Escape key closes menu AND returns focus to hamburger button (via `setMobileOpen(false)`)
- Focus first nav link when menu opens
- Tab/Shift+Tab cycles within the mobile nav container only
- Works alongside Framer Motion's `AnimatePresence` — the hook activates/deactivates with `mobileOpen` state

**Files affected:** `src/components/layout/header.tsx`

---

## 3. Architecture Decision Records

### ADR-001: Contact Form Service — Web3Forms over alternatives

**Decision:** Use Web3Forms API for contact form submission with `mailto:` fallback.

**Alternatives considered:**
1. Formspree — requires account signup, lower free tier
2. Cloudflare Worker — adds infrastructure, overkill for a portfolio
3. `mailto:` only — poor UX, no spam protection
4. Getform.io — similar to Web3Forms but less popular

**Rationale:** Web3Forms is free (250 submissions/month), requires only an access key (no npm package), and uses a simple POST endpoint. No new dependencies.

### ADR-002: Particles lazy loading — next/dynamic over IntersectionObserver

**Decision:** Use `next/dynamic` with `ssr: false` to code-split tsParticles.

**Alternatives considered:**
1. IntersectionObserver — only defers initialization, doesn't code-split
2. Route-gating — particles only on home page (reduces feature scope)
3. Web Worker — overkill, tsParticles already runs on its own render loop

**Rationale:** `next/dynamic` is the simplest Next.js-native approach for code splitting. Combined with moving `ParticlesProvider` into the dynamic component, the entire tsParticles initialization is deferred.

### ADR-003: Error Boundary placement — Around `<main>` only

**Decision:** Wrap `<main>` content with `ErrorBoundary`, not the entire provider tree.

**Alternatives considered:**
1. Wrap entire `<Providers>` — catches everything but may interfere with Next.js error handling
2. Per-section boundaries — too granular, adds complexity
3. Route-level `error.tsx` only — already exists but replaces entire page

**Rationale:** Wrapping `<main>` preserves header/footer navigation when content crashes. The route-level `error.tsx` remains as a fallback for errors that occur before the boundary mounts.

### ADR-004: Global transition removal — Delete without replacement

**Decision:** Remove the `* { transition: ... }` rule without adding a scoped replacement.

**Alternatives considered:**
1. Add `.theme-transition` class to layout elements — adds complexity for minimal benefit
2. Use `view-transition-name` CSS — browser support too limited
3. Keep but scope to `:root` — doesn't solve the performance issue

**Rationale:** `next-themes` already has `disableTransitionOnChange` enabled. Individual components already have their own transition classes (`transition-colors`, `transition-all`). The global rule is redundant and harmful to performance.

### ADR-005: Focus trap — Custom hook over library

**Decision:** Implement a custom `useFocusTrap` hook instead of using a focus-trap library.

**Alternatives considered:**
1. `focus-trap-react` — adds ~3KB, violates NFR-004 (no new dependencies)
2. `@zag-js/focus-trap` — same issue
3. No focus trap — violates WCAG 2.4.3

**Rationale:** A focus trap is ~30 lines of code. The custom hook is simpler, has no dependencies, and is tailored to the specific mobile nav structure.

---

## 4. Build & Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    DEVELOPMENT                                │
│                                                               │
│  Developer ──→ git push ──→ GitHub Actions CI                │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐    │
│  │ GitHub Actions Workflow                                │    │
│  │ 1. checkout@v4                                         │    │
│  │ 2. setup-node@v4 (Node 22, npm cache)                  │    │
│  │ 3. npm ci                                              │    │
│  │ 4. npm run build ──→ next build ──→ static export     │    │
│  │ 5. cloudflare/pages-action@v1 ──→ deploy out/         │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐    │
│  │ Cloudflare Pages                                       │    │
│  │ - Serves static HTML/CSS/JS from out/                  │    │
│  │ - Global CDN edge caching                              │    │
│  │ - No server-side runtime                               │    │
│  │ - Custom domain: portfolio-8af.pages.dev               │    │
│  └──────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

**Build-time data fetching:**
- Home page fetches GitHub API during `next build`
- Blog posts are statically generated via `generateStaticParams`
- Sitemap, robots, manifest are generated at build time
- All `src/data/*` files are imported and bundled at build time

**Runtime data fetching:**
- Stats page uses React Query to fetch GitHub API from the browser
- Contact form will use Web3Forms API from the browser
- All other pages are fully static

---

## 5. Component Classification

| Component | Type | Rendering | Data Source | Interactive? |
|---|---|---|---|---|
| `layout.tsx` | Server | Build-time | siteConfig, navigation | No |
| `providers.tsx` | Client | Client | — | Yes (theme, query) |
| `header.tsx` | Client | Client | navigation, pathname | Yes (mobile menu) |
| `footer.tsx` | Server | Build-time | siteConfig | No |
| `particles.tsx` | Client | Client (→ dynamic) | theme | Yes (canvas) |
| `hero.tsx` | Client | Client | — | No (animated) |
| `page.tsx` (home) | Server | Build-time | GitHub API, siteConfig | No |
| `contact/page.tsx` | Client | Client | — | Yes (form) |
| `stats-client.tsx` | Client | Client | GitHub API (React Query) | No (animated) |
| `error-boundary.tsx` | Client | Client | — | Yes (reset button) |
| `error.tsx` | Client | Client | — | Yes (retry button) |
| `blog/[slug]/page.tsx` | Server | Build-time (SSG) | blogContent data | No |
