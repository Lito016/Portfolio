# Fact Whitelist (REQ-11) — all site-visible numbers, URLs, and project claims

Rule: any metric, external URL, or hard technical claim rendered on the portfolio must match one entry below. Build/Verify greps new content against this file. Unknown = not shown.

## Quill MCP — sources: existing `src/data/projects.ts:18-27` (owner-authored), public repo
- W1 url https://github.com/Lito016/quill-mcp (verified reachable 2026-09-23 via api.github.com/repos/Lito016/quill-mcp)
- W2 metric "49 MCP tools" (projects.ts approach text)
- W3 metric "16 memory types" (projects.ts solution text)
- W4 claims: stdio MCP server; BM25 retrieval; conflict detection; memory consolidation; checkpoint-based context reconstruction; lifecycle state machines; secret detection; project-scoped isolation; TypeScript; markdown vault storage

## Barangay Digital Portal — sources: projects.ts:30-40 + owner brief Phase 8
- W5 url https://barangay-prototype.pages.dev/ (in projects.ts; verify HTTP 200 at Build)
- W6 claims: document requests w/ status workflow; resident management; household relationships; payments; complaints; announcements; notifications; realtime updates; support chat; admin + resident roles; Laravel; React; Inertia; MySQL
- W7 tags in projects.ts: Full-Stack, Government, React (extend with W6 stack names — owner-declared)

## Vision Video Auditor — source: owner brief Phases 3/8 ONLY (no repo, no URL, no metrics)
- W8 claims: YOLO detection; CCTV/video processing; event detection w/ timestamps; automated FFmpeg clip extraction; clip storage; auditor interface; alert workflow; FastAPI backend; React frontend
- W9 links: NONE permitted. Metrics: NONE permitted (no mAP/latency data supplied). Image: none (no asset)

## PRIME Method — source: owner brief Phase 8 ONLY
- W10 claims: agent orchestration; skills system; lifecycle shapes; quality modes; gates; validation; testing harness; routing; evaluation; architecture design; developer tooling / orchestration infrastructure
- W11 links: NONE. Metrics: NONE (skill counts etc. not asserted). Image: none

## UBMS (Unified Business Management System) — source: owner brief Phase 8 + orphan asset — SUPERSEDED by W27
- W12 claims: inventory; procurement; B2B sales; B2C printing; finance; receivables; payables; historical debts; reports; documents; Supabase; React; Cloudflare
- W13 image /project-ubms.png exists in public/ (asset present, shows the system)
- W14 links: NONE until owner supplies live URL. Metrics: NONE

## Inventory Management System — source: owner-supplied links, verified 2026-09-24 (replaces UBMS in place)
- W27 verified evidence:
  - repo https://github.com/Lito016/Inventory_management_system — public, TypeScript-primary + PLpgSQL, pushed 2026-09-24 (`gh repo view` / GitHub API)
  - live https://inventory-management-system-55w.pages.dev/ — HTTP 200 (Vite SPA shell; rendered UI not verifiable, app is behind Supabase auth)
  - claims from the repo README: B2B fabric trading; B2C printing; finance as main priority; receivables, payables, payments, overdue tracking, historical debts; pre-orders → purchase orders → receiving (variance tracking) → fulfillments; printing orders → production → completion → release → payment; inventory products/adjustments/summary; centralized customers and suppliers; reports; unified documents with print/export; React 19, TypeScript 5, Vite 6, Tailwind CSS 4, TanStack Query 5, React Hook Form + Zod, React Router v7, Lucide, Supabase (PostgreSQL, Auth, RLS, auto-REST), Cloudflare Pages; Admin and Staff roles (Admin: user management, payment voiding); 10 ordered migrations creating 20 tables, 5 computed views, 16 triggers, RLS policies, indexes
  - W27 also extends the W23 derivation rule: `workflow` and `architecture` node labels for this entry may restate the README pipeline strings above
- W27 NOT claimed (no source): tests, deployments/CI for the app itself, user or record counts, uptime, client name, procurement module, queue management
- License note: README states "Proprietary — developed for the client per the project agreement." Owner elected to showcase it; repo is public at owner's direction.
- W27 screenshots: /project-inventory.png (B2B pre-orders), -dashboard.png, -products.png, -documents.png — captured 2026-09-24 from the deployed app through its own "Continue as Admin" demo mode at 1600x900. The app states "DEMO — sample data only. Edits reset when you reload the page."; every name, amount and document visible is seeded sample data, not client records.
- W27 demo mode also clears the login-wall concern: the live link opens a one-click demo, no credentials needed.
- W13 asset /project-ubms.png removed — it depicted the prior UI and cannot be verified as the current app.

## University Management System (6th featured, conditional) — source: GitHub API 2026-09-23
- W15 url https://github.com/Lito016/University-Management-System (verified public)
- W16 claims: TypeScript; university management system. Nothing further until owner enriches.

## Dish Manager — projects.ts:56-60
- W17 url https://dish-manager-prototype.pages.dev/ (verify 200 at Build); tags React/Full-Stack/Meal Planning; description "Recipe and meal planning management application." (Other Projects tier)

## AI SaaS Landing — projects.ts:43-53
- W18 url https://ai-saas-landing.pages.dev/ (verify 200 at Build); Next.js/SaaS landing tier: Other

## Site-wide
- W19 github https://github.com/Lito016 (siteConfig) · email manolitoalmadenjr@gmail.com · linkedin per siteConfig · canonical https://portfolio-8af.pages.dev
- W20 Homepage "GitHub stats" numbers are LIVE API values (client-fetched) — not static claims; acceptable as-is
- W21 Positioning strings: "AI Solution Developer", "Full-Stack Systems Developer"; "What I Build" category examples are copied verbatim from owner brief Phase 3 (Inventory, Finance, Procurement, Sales, Queue management, Government services, Operations systems / MCP servers, AI agent infrastructure, Prompt engineering systems, Developer tooling, Evaluation systems, Knowledge and memory systems / YOLO detection, CCTV processing, Video event detection, Automated clip extraction, Monitoring workflows)
- W22 Skills list restricted to owner brief Phase 4 declarations + current skills.ts. Pending owner confirmation before publish: Laravel (Barangay, W6), FastAPI (W8), Supabase (W12), YOLO (W8) are claimed via W6–W12 — permitted because they back listed projects. Redis: NOT included (no source). PHP/SQL: permitted (Barangay-Laravel ecosystem + owner brief) — do not add "Expert/Basic" qualifiers.
- W24 (added at M2 build) Positioning copy lines derived from the owner brief's framing, no new technical claims: hero value line "Systems that run operations — designed, built, tested, and deployed end to end."; What I Build blurbs (business: "Operational systems that model real workflows — records, roles, approvals, and reporting — end to end."; ai: "Infrastructure that makes AI usable in production: agent tooling, memory, and evaluation."; cv: "Detection pipelines that turn raw video into events, clips, and monitoring workflows."; homepage featured subtitle "Systems I designed and shipped end to end")
- W25 (added at M4 build) Positioning/process copy, no new technical claims: About "How I Work" steps (Understand, Model, Design, Build, Test, Deploy, Monitor, Improve — owner brief Phase 10 workflow verbatim; step detail lines are generic process descriptions); About bio sentences restate W21 categories + existing program/OJT facts already in data files (Bayanihan AI program, Agentic AI Bootcamp, Generative AI Intensive, OJT journaling platform); Resume Summary and Selected Projects render existing whitelisted data (featuredProjects descriptions) — no new facts. Blog post "basic prompt engineering" (blog.ts) is pre-existing learning-journey narrative, not a current-skill label.
- W26 (added at M5 audit) Pre-existing external endpoints in touched files (not new claims; functional integrations retained per "do not remove working functionality"): api.web3forms.com/submit (contact form), api.github.com + avatars.githubusercontent.com/u/146796071 (live GitHub stats/avatar), linkedin.com/in/manolito-almaden-jr-a54a6634a (owner profile, "linkedin per siteConfig" under W19). All predate this cycle.

## Derivation rule (added at plan review finding 2)
- W23 Case-study `workflow` and `architecture` node labels may ONLY restate: (a) the owner brief's pipeline strings (Phase 7/8/11: e.g. "Camera / Recording → Detection → Event timestamp → FFmpeg clip extraction → Clip storage → Auditor interface → Alert workflow"; "React → Inertia → Laravel → MySQL → Payment/Realtime/Email integrations"; "AI Coding Agent → MCP Client → Quill MCP → Retrieval Engine → Memory Layer → Markdown Vault"; PRIME: "agent orchestration, skills, lifecycle shapes, quality modes, gates, validation, testing harness, routing, evaluation"), and (b) existing `src/data/projects.ts` caseStudy prose. Rephrasing/shortening allowed; new technical claims NOT allowed. M5 whitelist audit checks against W1–W23.

## Explicitly NOT whitelisted (must not appear)
- mAP, FPS, latency, dataset sizes for Vision Auditor; tool/skill counts for PRIME; user counts for any project; employer names beyond existing data; certificate counts; "X+ years".
