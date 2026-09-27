# Execution Plan — Portfolio Polish

## Execution Order (7 phases, dependency-sorted)

### Phase A: Foundation (zero-risk quick wins)
1. Fix `siteConfig.url` → `https://portfolio-8af.pages.dev`
2. Remove global `* { transition }` rule from globals.css
3. Fix `prefers-reduced-motion` support in globals.css
4. Fix muted-foreground contrast for glass card readability

### Phase B: TypeScript + Form
5. Remove `as any` cast in contact form — type resolver properly
6. Replace broken `/api/contact` POST with `mailto:` fallback
7. Add user feedback for form submission states

### Phase C: Reliability
8. Add retry logic with exponential backoff to `githubFetch`
9. Wrap `<main>` with ErrorBoundary in layout.tsx

### Phase D: Accessibility
10. Add `aria-label` to error-boundary reset button
11. Add `role="alert"` to form error messages
12. Implement focus trap for mobile navigation
13. Add `aria-hidden` to decorative elements

### Phase E: SEO
14. Add JSON-LD structured data (Person + WebSite) to layout.tsx
15. Add per-page OpenGraph types where missing

### Phase F: Performance
16. Lazy-load ParticlesBackground with `next/dynamic`
17. Convert cover `<img>` to Next.js `<Image>` in hero.tsx

### Phase G: Cleanup
18. Remove dead CSS animation classes (10 unused)
19. Remove unused dependencies from package.json (class-variance-authority, date-fns — verify first)
20. Standardize section spacing across pages

## File Impact Map
| File | Changes |
|---|---|
| src/config/site.ts | URL fix |
| src/app/globals.css | Remove * transition, add reduced-motion, fix contrast |
| src/app/contact/page.tsx | Fix resolver type, mailto form, error roles |
| src/app/layout.tsx | ErrorBoundary wrap, JSON-LD script |
| src/lib/github/api.ts | Retry logic |
| src/components/layout/header.tsx | Focus trap hook |
| src/components/shared/error-boundary.tsx | aria-label |
| src/components/shared/particles.tsx | Dynamic import target |
| src/components/sections/hero.tsx | Image optimization |
| src/app/page.tsx | Dynamic import for particles |
| package.json | Remove unused deps (if verified) |

## Constraints
- Static export (`output: 'export'`) — no server features
- No new npm dependencies
- Must build successfully with `npm run build`
- Must deploy to Cloudflare Pages without issues
