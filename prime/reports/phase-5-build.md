# Phase 5 — Build Report (Cycle 5)

Branch: `feat/cycle5-rebuild` (A-P3: no push to main; CI deploy trigger on `push: branches: [main]` stays inert).
Plan authority: `docs/PRP.md` milestones M0–M8. Design authority: `docs/DESIGN.canvas.tsx`. Content authority: `prime/state/fact-whitelist.md` W1–W28.

## M0 — Branch, pins, baseline (complete, committed dfa2ee2)

- `git checkout -b feat/cycle5-rebuild` from main bd2830b; `git branch --show-current` verified.
- Exact pins installed: `gsap@3.15.0`, `lenis@1.3.26`, `lucide-react@1.48.0` (`--save-exact`); `framer-motion` held at 12.42.2. package.json shows exact versions (D-4.3/R-8).
- Baseline green: `npx tsc --noEmit` exit 0, `npm run build` exit 0.
- AGENTS.md doc law: read bundled `node_modules/next/dist/docs/` static-exports guide before writing code (constraints: default loader unsupported → `images.unoptimized: true` kept; no redirects/middleware; `dynamic = 'force-static'` on meta routes).
- Supply-chain observation (recorded, not acted): npm warn install scripts not covered for `unrs-resolver@1.12.2` (pre-existing).

## M1 — Data layer reconciliation (verification only; no code changes required)

The cycle-4 data layer already satisfies the M1 acceptance set; every item below was read and verified in-session:

- `src/data/projects.ts`: discriminated union `FeaturedProject | OtherProject`; 4 featured (quill-mcp, barangay-digital-portal, vision-video-auditor, inventory-management-system) + 3 secondary (university-management-system, dish-manager, ai-saas-landing). `url: ''` + `links: []` on Vision (W9: no links, no metrics) — dead-anchor rule honored at the interface level (`HostedProjectBase.url` comment).
- Whitelist audit: every metric carries a `source` (W2/W3/W27); every URL matches W1/W5/W15/W17/W18/W19/W27; workflow/architecture node labels restate only owner-brief pipeline strings and existing caseStudy prose (W23 derivation rule). No mAP/FPS/latency/user-counts/X+ years (explicitly-not-whitelisted list) — zero hits.
- UBMS removal (superseded by W27): no `unified-business`/UBMS entries in projects.ts; no `/project-ubms.png` in `public/` (asset GC already done in the cycle-4 working tree).
- `src/data/skills.ts`: 7 owner-declared domains (W22), no Expert/Basic qualifiers; `techStackItems` retained for the marquee carrier-over removal at M2 shell rewrite.
- `src/config/site.ts` (W19): name/displayName/url/github/email/linkedin all match whitelist; `src/data/now.ts` nowData fields intact for FR-11 verbatim use at M6; `experience.ts` (FR-13 elements incl. location + technologies) and `education.ts` intact.
- Public assets: 11 PNGs listed; all `image:` paths in projects.ts/site.ts resolve (`/project-quill-mcp.png`, `/project-barangay.png`, `/project-vision.png`, `/project-inventory*.png` ×4, `/project-dish-manager.png`, `/project-ai-saas.png`).
- REQ-16 decoupling precondition: projects.ts exports are plain typed arrays; no component imports in `src/data/` (imports are types-only within data). The 5th-entry render proof executes at M5 per PRP.
- Testimonials/now handling per PRP M1 step 2: `now.ts` stays (FR-11 verbatim line consumed at M6); `testimonials.ts` is dropped from the render surface — its only importers are the testimonials route dir (deleted at M2) and the legacy `navigation.ts` allRoutes list (rewritten at M2); the data file itself is PRP-silent, so it stays orphaned pending the M8 orphan sweep.

## M2 — Shell, tokens, route cleanup, dep-GC

In progress. Route deletion isolated in its own commit per PRP rollback rule.
