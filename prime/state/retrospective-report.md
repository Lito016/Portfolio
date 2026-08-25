# Retrospective — Portfolio Polish

## What Went Well
1. **Incremental approach** — Foundation-first ordering (URL fix, CSS cleanup) caught issues early before complex changes
2. **Build verification loop** — Running `npm run build` after each batch of changes caught the `ssr: false` Server Component issue immediately
3. **Lint-driven quality** — The React 19 ESLint rules caught real issues (hooks called conditionally, setState in effects) that would have caused runtime bugs
4. **Dead code removal** — Removing 92 lines of unused CSS and 2 unused dependencies simplified the codebase measurably
5. **Autopilot execution** — Running all 7 phases without stopping kept momentum and delivered a complete polish in one session

## What Didn't Go Well
1. **`ssr: false` in Server Component** — The `next/dynamic` with `ssr: false` was initially placed in layout.tsx (a Server Component). Required creating a separate client wrapper component. This is a common Next.js 16 gotcha.
2. **`window.location.href` assignment** — React 19's `react-hooks/immutability` rule blocks direct property assignment on `window.location`. Had to switch to `window.location.assign()`.
3. **Hook ordering** — Moving `useSyncExternalStore` before the early return was needed to satisfy `react-hooks/rules-of-hooks`. The initial refactor placed hooks after the conditional return.

## Lessons Learned
1. **Next.js 16 + Server Components**: `next/dynamic` with `ssr: false` MUST be in a Client Component. Create a thin client wrapper when the parent is a Server Component.
2. **React 19 lint rules are stricter**: `useEffect(() => setState(true))` is now flagged. Use `useSyncExternalStore` for hydration-safe mounted checks.
3. **`window.location` is immutable** in React 19 hooks context. Use `window.location.assign()` instead of property assignment.
4. **Static export constraints**: Contact forms can't use API routes. `mailto:` is the simplest zero-dependency fallback.
5. **Dead code accumulates fast**: 10 of 11 CSS animation classes were unused. Regular cleanup prevents bloat.

## Process Improvements
1. Always verify `next/dynamic` placement against Server/Client component boundaries
2. Run lint after every batch of changes, not just at the end
3. For brownfield polish, start with a comprehensive audit before touching code

## Deployment
- **Committed:** `a79aa13` — conventional commit with full change list
- **Pushed:** to `origin/main` (GitHub Actions CI will auto-deploy)
- **Deployed:** https://dbf44681.portfolio-8af.pages.dev (preview)
- **Production:** https://portfolio-8af.pages.dev (after CI promotion)

## Project Closure
- **Status:** COMPLETE
- **Duration:** Single session (7 phases)
- **Quality mode:** Polish (Autopilot execution)
- **All 14 quality gates:** PASSED
- **All 7 improvements:** DELIVERED
