# Phase 4 Plan Digest (caveman lite — applied)

5 milestones, branch feat/repositioning-cycle4, ~15–20h, each build-green + revert-safe.

- M1 data (4–5h): projects.ts union + 6 flagships/2 others per W1–W23 whitelist; skills 7 domains; positioning strings single source; nav 6 primary; defensive patch old cards (empty image/url crash fix). Verify: tsc+lint+build+URL grep.
- M2 components (4–5h): ProjectCard featured/compact (key=slug, no dead anchors), FlowDiagram (<ol>, tokens, mobile stack), WhatIBuild (#cat-* links), hero CTAs+value line. Verify: build + browser spot desktop/375.
- M3 routes (4–5h): /projects/[slug] SSG + generateMetadata; Featured/Other split; server metadata wrappers; sitemap+out/ checks (404.html, per-slug index). 
- M4 content (2–3h): about workflow narrative; resume summary+import skills; de-junior grep ban-list zero hits.
- M5 polish (1–2h): 6-width responsive pass, 200-checks, _blank rel + no-dangerouslySetInnerHTML greps, console/alt/contrast sweep.
- Threat model: static site, boundaries browser↔edge/GitHub/data↔content; real risk = fabrication leak → W-gate + Verify greps; ASVS L1.
- Key fixes from review: W23 derivation rule, M1 interim card patch, export-safe 404 checks, rebalanced estimates.
