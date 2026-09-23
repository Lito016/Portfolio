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

## UBMS (Unified Business Management System) — source: owner brief Phase 8 + orphan asset
- W12 claims: inventory; procurement; B2B sales; B2C printing; finance; receivables; payables; historical debts; reports; documents; Supabase; React; Cloudflare
- W13 image /project-ubms.png exists in public/ (asset present, shows the system)
- W14 links: NONE until owner supplies live URL. Metrics: NONE

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

## Derivation rule (added at plan review finding 2)
- W23 Case-study `workflow` and `architecture` node labels may ONLY restate: (a) the owner brief's pipeline strings (Phase 7/8/11: e.g. "Camera / Recording → Detection → Event timestamp → FFmpeg clip extraction → Clip storage → Auditor interface → Alert workflow"; "React → Inertia → Laravel → MySQL → Payment/Realtime/Email integrations"; "AI Coding Agent → MCP Client → Quill MCP → Retrieval Engine → Memory Layer → Markdown Vault"; PRIME: "agent orchestration, skills, lifecycle shapes, quality modes, gates, validation, testing harness, routing, evaluation"), and (b) existing `src/data/projects.ts` caseStudy prose. Rephrasing/shortening allowed; new technical claims NOT allowed. M5 whitelist audit checks against W1–W23.

## Explicitly NOT whitelisted (must not appear)
- mAP, FPS, latency, dataset sizes for Vision Auditor; tool/skill counts for PRIME; user counts for any project; employer names beyond existing data; certificate counts; "X+ years".
