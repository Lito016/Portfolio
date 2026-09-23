# Phase 2 Define Digest (caveman lite — applied)

Compressed recovery digest of `docs/PRD.md` + `phase-2-define.md`.

Goal: portfolio must scream "AI Solution Developer | Full-Stack Systems Developer" in 5 seconds. Preserve strong surfaces, fix positioning + projects + evidence.

- R1–R5 positioning/homepage: consistent role strings, junior wording gone, hero 3 CTAs + who/what/why line, "What I Build" 3-category section.
- R6–R9 projects: `featured` flag in data (no `slice`), add Vision Auditor/PRIME/UBMS from owner brief only, Featured vs Other split, cards with highlights + case-study link, no dead links.
- R10–R12 case studies: `/projects/[slug]` SSG route, sections conditional on real data, fact whitelist file blocks invented metrics/links, one shared FlowDiagram component feeds all diagrams.
- R13–R15 skills/resume/about: 7 domain categories no levels, resume reuses skills data + summary not objective, about = engineering workflow not school timeline.
- R16–R17 SEO: per-page metadata via server wrappers, sitemap includes slugs.
- R18–R21 quality: no overflow 320–1600, a11y pass, lint/build/console zero errors, reuse tokens no gimmicks.

Decisions: whitelist over prose; data-driven case studies over MDX/hardcode; FlowDiagram over mermaid/static SVG; keep 21 routes, narrow nav.
Open: no screenshots/repos for 3 new flagships until owner supplies; UMS thin — 5 flagships acceptable.
