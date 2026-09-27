# Phase 1 — Research Evidence (Cycle 5, 2026-09-27)

Produced by delegated research agent (`phase1-research`, general-purpose subagent). Sections transcribed with method notes. Consumed by `phase-1-discover.md` §A–C.

## Scope
1. Design language of antigravity.google — observable, principle-level only (no asset copying).
2. Next.js 16.3 technical constraints from version-matched bundled docs (per AGENTS.md).
3. Motion-library currency, licensing, and bundle cost → adoption recommendation.

## A. antigravity.google (source: live fetch)
Method: WebFetch rate-limited (FORBIDDEN) → `curl` of https://antigravity.google (33KB gz → 138,789 B) + 3 linked Astro CSS files (`BaseLayout`, `SmoothScrollLayout`, `index`). All observations from real HTML/CSS.

- Palette: Material-3 tokens, cool near-white stack `#fff / #f8f9fc / #eff2f7 / #e6eaf0`; layered near-black ink `#121317–#45474d`; dark inverse-surface panels. Accents: blue `#3186ff`/`#1a73e8`; sparing sparks `#00b95c #fc413d #fbbc04 #ffee48`.
- Typography: Google Sans Flex variable, weights 400–500 only; optical sizing; scale 15px base → 148px display; display line-heights < 1.0; tracking to −2.96px; stacked short headline lines.
- Motion: `SmoothScrollLayout` (smooth-scroll wrapper), canvas particle hero `MainParticlesComponent`, `TypedHeader`, `hero_video.mp4`, custom cursor PNG; micro 0.15–0.3s ease-out / `cubic-bezier(.165,.84,.44,1)`; `backdrop-filter: blur(5–16px)` sticky header.
- Composition: oversized stacked hero type, hairline borders, generous whitespace, scroll-pinned media, huge terminal CTA; breakpoints 425/767/1024/1440/1600.
- Principles adopted: see discover §A "Actionable principles".
- Comparables (linear.app / apple.com / lusion.co): prior-knowledge ASSUMPTION, directional only.

## B. Next.js 16.3 constraints (source: bundled docs + local config)
Files: `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`, `static-exports.md`, `01-getting-started/11-css.md|12-images.md|13-fonts.md`, `03-api-reference/02-components/image.md|font.md`; `next.config.ts`, `src/app/layout.tsx`.

- Turbopack default dev+build (webpack config fails build); async-only `params/searchParams/cookies/headers`; `middleware`→`proxy`; `next lint` removed; parallel routes need `default.js`; `revalidateTag` second arg.
- Scroll: Next 16 no longer overrides global `scroll-behavior: smooth`; opt-in via `data-scroll-behavior="smooth"` on `<html>`; globals.css currently sets smooth → must reconcile with Lenis (`auto`).
- Static export `output:'export'` (prod-only here; `images.unoptimized:true`): no default image loader, redirects/rewrites/headers, cookies, proxy, Server Actions, ISR; guard `window`/`localStorage` in client effects.
- `next/font/google` self-hosts at build, export-safe; Tailwind 4 `@import 'tailwindcss'`; React 19.2 native View Transitions/`Activity`.

## C. Libraries (source: npm registry + bundlephobia)
- Installed: framer-motion 12.42.2 (latest 13.4.4), lucide-react 1.23.0 (latest 1.48.0). Absent (confirmed package.json + node_modules): gsap, lenis, three, @react-three/fiber.
- Latest: gsap 3.15.0 (ScrollTrigger bundled; npm license "Standard no charge"), lenis 1.3.26, three 0.186.1, @react-three/fiber 9.8.1.
- Gzip (bundlephobia): gsap 26.7KB, lenis 5.3KB, three 180.6KB, r3f 55.7KB.
- **Decision input**: adopt GSAP+ScrollTrigger+Lenis (~32KB) for pinned scroll orchestration; keep Framer for micro/mount animation; skip three/r3f (+236KB) — hero = custom 2D canvas, reduced-motion + pointer-fine gated.

## Evidence list
URLs: https://antigravity.google, /_astro/*.css (3), bundlephobia.com/api/size. Files: as cited above. Commands: `find/grep/ls` over docs+node_modules, `npm view {gsap,lenis,three,@react-three/fiber,framer-motion,lucide-react} version`, `npm view gsap license`, curl fetches.
Confidence: High (Section B command/file-verified; Section A live source). Not verified: rendered appearance of antigravity.google (no screenshot); framer-motion bundle size (API call failed).
