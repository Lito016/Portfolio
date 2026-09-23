# Phase 1 Discovery Digest (caveman lite — applied)

Compressed recovery digest of `phase-1-discover.md`. Full detail lives there.

Site already says "AI Solution Developer" — repositioning half-done. Remaining gaps are structural.

- Positioning: hero zero CTAs (`hero.tsx`); no value line; resume subtitle wrong ("Web & Mobile Developer", `resume/page.tsx:71`); education blurb "Fresh graduate…" (`education.ts:11`); about page = school timeline (`about-client.tsx`); no "What I Build" section (`page.tsx`).
- Projects: flat list of 4 (`projects.ts`); flagships missing (Vision Auditor, PRIME, UBMS; `project-ubms.png` orphan proves intent); featured = positional `slice(0,3)`; case-study data exists but never rendered — no `/projects/[slug]` route.
- Skills: domain-organized but missing Laravel/FastAPI/PHP/Supabase/YOLO/engineering entries owner declares; no levels — good, keep.
- Consistency: "Bayanaihan" vs "Bayanihan" spelling; OJT dates conflict across education/about/experience.
- SEO: client pages export no metadata; sitemap misses blog index and posts.
- Infra: no diagram capability (deps checked); must build one.
- Verified externally: GitHub public repos = quill-mcp, UMS (+ others); none for PRIME/Vision/UBMS/Barangay. Links only where verified. No metric invention.

Success: visitor sees AI Solution Developer | Full-Stack Systems Developer in seconds; 5–6 flagships with case studies + diagrams; other projects demoted; metadata/sitemap complete; build+lint clean; browser-verified 320px–desktop.
