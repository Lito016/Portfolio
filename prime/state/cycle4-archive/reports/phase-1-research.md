# Phase 1 Research Log (skill: research — applied)

## Sources consulted
1. `api.github.com/users/Lito016/repos?per_page=100&sort=updated` — fetched 2026-09-23. Public repos: quill-mcp (TypeScript), Portfolio (TypeScript), DishManager (TypeScript), University-Management-System (TypeScript), lgu_cainta_rizal (JavaScript, LGU Cainta landing), ToramDamageCalcu, Toram_db (Python), OJT_JOURNAL (JavaScript), Manolito016. Verified: no public repo for PRIME Method, Vision Video Auditor/CCTV, UBMS, Barangay Digital Portal.
2. `api.github.com/repos/Lito016/University-Management-System` — TypeScript, 0 stars, updated 2026-07-05, no description.
3. `raw.githubusercontent.com/Lito016/University-Management-System/main/README.md` — 404. No README content available; UMS facts limited to name + language.
4. Repository source inspection (local, primary): `src/data/projects.ts`, `src/components/sections/hero.tsx`, `src/data/skills.ts`, `src/data/team.ts`, `src/config/site.ts`, `src/app/page.tsx`, route inventory under `src/app/`, dependency check via `package.json`.

## Findings that changed decisions
- Quill MCP case-study numbers (49 tools, 16 memory types) trace to existing repo data (`src/data/projects.ts:24-25`) — allowed as metrics.
- Vision Auditor / PRIME / UBMS facts exist only in owner brief → case studies will use brief facts, omit links/metrics (no fabrication).
- Barangay Portal has live demo URL in data but no public repo → link demo only.
- UMS is a real repo and candidate "additional strong management system"; description must stay minimal until owner supplies detail.

## Benchmarks/reference patterns used
- Recruiter 5-second scan model: identity → proof → action; informed hero CTA and "What I Build" requirements.
- Case-study section set (Problem/Architecture/Challenges/Metrics) matches reviewer-portfolio norm; adopted from owner brief, not invented.
