/**
 * DESIGN.canvas.tsx — PRIME Phase 3 design artifact (Cycle 4 portfolio repositioning)
 *
 * This is the project design document and the authority for tokens, components,
 * interfaces, and routing. It traces every requirement in docs/PRD.md (REQ-1 … REQ-23).
 * Conventions verified against bundled Next.js 16 docs before writing:
 *   node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md (dynamic [slug] + generateStaticParams)
 *   node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md (per-page metadata)
 *   In-repo precedent: src/app/blog/[slug]/page.tsx uses `params: Promise<{slug:string}>`, generateMetadata, generateStaticParams.
 * Production build is `output: 'export'` (next.config.ts) → every dynamic route MUST be fully static via generateStaticParams.
 * NOTE: this file is type-checked (tsconfig includes **/*.tsx) — keep it valid TS on every edit.
 */

// ─────────────────────────────────────────────────────────────────────────────
// 1. Architecture overview (module map)
// ─────────────────────────────────────────────────────────────────────────────
/**
 * src/data/projects.ts        single content schema + source of truth (extended below)  ─┐
 * src/data/skills.ts          7-domain skills, consumed by Skills page AND Resume        │ data layer
 * src/data/site.ts / config   positioning strings, canonical URLs                        │
 * src/components/sections/    hero (CTAs + value line), what-i-build, featured-projects  │
 * src/components/projects/    ProjectCard (shared), CaseStudyLayout, FlowDiagram         │ presentation
 * src/app/projects/page.tsx   Featured / Other grouping (semantic flag, no slice)        │
 * src/app/projects/[slug]/    static case-study pages via generateStaticParams            │
 * server page wrappers        per-page metadata for former client-only pages             ─┘
 *
 * Interface direction (one-way): pages → sections/components → data. No component
 * owns copy; no duplicated literals (prevents P11-class drift). GitHub-API mirror
 * routes (stats/activity/etc.) unchanged.
 */

// ─────────────────────────────────────────────────────────────────────────────
// 2. Data schema — HostedProject v2 (REQ-6, REQ-7, REQ-10, REQ-11)
// ─────────────────────────────────────────────────────────────────────────────

export type ProjectCategory =
  | 'business-systems'
  | 'ai-developer-tools'
  | 'computer-vision-automation';

export interface ProjectLink {
  /** Only whitelisted, reachable URLs (fact-whitelist). Cards omit a link slot entirely when none exists — never a dead anchor. */
  label: 'GitHub' | 'Live Demo' | 'Docs';
  url: string;
}

export interface DiagramNode {
  id: string;
  label: string;
  /** Secondary line, e.g. "FastAPI + YOLO" */
  detail?: string;
}

export interface DiagramGroup {
  /** Lane heading, e.g. "Ingest", "Detection", "Delivery" */
  label: string;
  nodes: DiagramNode[];
}

export interface MetricFact {
  value: string;   // "49"
  label: string;   // "MCP tools"
  source: string;  // traceability to prime/state/fact-whitelist.md entry id
}

export interface CaseStudy {
  overview: string;
  problem: string;
  /** Optional: omit section when no verified fact exists (prevents filler — review finding 6). */
  users?: string;
  solution: string;
  /** End-to-end main process; rendered as numbered horizontal steps (wraps on mobile). */
  workflow: DiagramNode[];
  /** Component/integration map; rendered as grouped lanes. Optional extra prose. Arrows are inter-lane sequential only (v1 limitation, finding 5). */
  architecture: DiagramGroup[];
  architectureNote?: string;
  features?: { name: string; description: string }[];
  challenges?: { problem: string; resolution: string }[];
  decisions?: { choice: string; rationale: string }[];
  dataDesign?: string;
  testing?: string;
  security?: string;
  metrics: MetricFact[];
  /** Primary interface screenshots from public/ — whitelist-gated (W13 class). Empty/omitted → text-first layout, never a broken <Image>. */
  screenshots?: string[];
}

/**
 * Discriminated union: `featured: true` COMPILE-TIME requires `caseStudy` (review finding 1).
 * HostedProject below is the union; non-featured entries may omit it.
 */
export interface FeaturedProject extends HostedProjectBase {
  featured: true;
  caseStudy: CaseStudy;
}

export interface OtherProject extends HostedProjectBase {
  featured: false;
  caseStudy?: never;
}

export interface HostedProjectBase {
  slug: string;          // kebab-case, route identity: /projects/[slug]; also the React list key (never url — finding 2)
  name: string;
  /** Engineering-focused one-liner: what the system is + what problem it solves. Never "Web application for managing X". */
  description: string;
  url: string;           // primary link ('' when none verified)
  image: string;         // card screenshot in public/; '' → render card WITHOUT <Image> (next/image src='' throws at prerender)
  tags: string[];        // canonical tech names (see §5)
  category: ProjectCategory;
  highlights: string[];  // 4–6 strongest engineering bullets for cards
  links: ProjectLink[];
}

export type HostedProject = FeaturedProject | OtherProject;

/**
 * Flagship slugs (featured): quill-mcp, barangay-digital-portal, vision-video-auditor,
 * prime-method, ubms — plus university-management-system when owner enriches (REQ-7, default: include, facts-only).
 * Other Projects (featured:false): dish-manager, ai-saas-landing (+ any current list members not flagship).
 * Content rule (REQ-11): every number/URL/claim in the data files must exist in
 * prime/state/fact-whitelist.md; Vision Auditor / PRIME / UBMS prose facts come only
 * from the owner brief; links/metrics absent until owner supplies them.
 */

// ─────────────────────────────────────────────────────────────────────────────
// 3. Component interfaces (REQ-3, REQ-5, REQ-9, REQ-12, REQ-21)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Shared card used by homepage FeaturedProjects and /projects — one markup source.
 * Component rules (review findings 2): key = slug (never url); when `image === ''`
 * render the text-only card variant (no <Image> — empty src breaks prerender);
 * when `url === ''` and no links, the card is NOT wrapped in an anchor.
 */
export interface ProjectCardProps {
  project: HostedProject;
  variant: 'featured' | 'compact'; // featured: highlights + case-study CTA; compact: image + tags + links
}

/**
 * FlowDiagram — data-fed pipeline/architecture graphic, one component for all flagships.
 * Design: DOM boxes + CSS arrows (token-colored borders, --color-primary at 8% tint),
 * NOT mermaid/d3/SVG-assets: theme-aware via existing CSS variables, zero new deps,
 * text stays selectable/translated, and mobile collapses lanes to a vertical stack.
 * Accessibility: rendered as <ol> with aria-label="Architecture flow"; arrows are
 * decorative (aria-hidden). Keyboard: no interactive elements.
 * Rejected: mermaid.js (bundle +85KB est., style fight with dark mode), static SVG
 * per project (5 duplicated assets, theme-blind) — simplicity gate favors one primitive.
 */
export interface FlowDiagramProps {
  kind: 'workflow' | 'architecture';
  title: string;
  groups?: DiagramGroup[]; // architecture mode
  steps?: DiagramNode[];   // workflow mode
}

/** CaseStudyLayout renders sections conditionally: a missing field = section omitted, never filler (REQ-10). */
export interface CaseStudyLayoutProps {
  project: HostedProject;
}

/**
 * WhatIBuild — 3 category cards linking to /projects category anchors (finding 4):
 * the Featured section on /projects renders three category subgroups with
 * id="cat-<category>" (e.g. /projects#cat-business-systems); Other Projects stay one group.
 */
export interface WhatIBuildProps {
  items: {
    title: string;            // "Business & Management Systems" etc.
    blurb: string;
    examples: string[];       // owner-brief example lists verbatim
    category: ProjectCategory;
  }[];
}

/** Hero CTA set — exactly three: View Projects (→ /projects), GitHub (siteConfig.github), Resume (→ /resume). */
export const HERO_CTAS = [
  { label: 'View Projects', href: '/projects', kind: 'primary' },
  { label: 'GitHub', href: 'https://github.com/Lito016', kind: 'outline', external: true },
  { label: 'Resume', href: '/resume', kind: 'ghost' },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// 4. Routing & metadata (REQ-10, REQ-16, REQ-17, REQ-23)
// ─────────────────────────────────────────────────────────────────────────────
/**
 * /projects/[slug]/page.tsx — server component (case studies are content, no client JS):
 *   generateStaticParams() → featured projects with caseStudy (5–6 pages; all build time under output:'export')
 *   generateMetadata({params}) → title "<Name> — Case Study | <site title>", description = caseStudy.overview
 *   notFound() on unknown slug.
 * Client-only pages (skills, resume, contact, projects list, stats…) gain a server wrapper:
 *   page.tsx  = `export const metadata` + <XClient/>   (moves existing 'use client' file to *-client.tsx if needed — pattern already used by about/projects/blog pages)
 * sitemap.ts  → static route list + hostedProjects.filter(featured).map(slug urls) + blog posts (fix P12; REQ-17)
 * navigation.ts → primary: Home, Projects, Skills, About, Resume, Contact; secondary routes remain in footer only (REQ-23).
 */

// ─────────────────────────────────────────────────────────────────────────────
// 5. Design language & tokens (REQ-1, REQ-13, REQ-19, REQ-21) — G10/G11/G12 record
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Original design system (documented, continued): Linear-inspired developer surface,
 * benchmarked via UI/UX Pro Max selector output ("Portfolio Grid" pattern,
 * "Trust & Authority" style: case studies with metrics, badges over decoration;
 * AVOID: playful design, AI purple/pink gradients) and the bundled Vercel
 * developer-brand token study (monochrome ink/canvas duet, single blue link
 * accent #0070f3 — our --primary #3b82f6 is already the same device).
 *
 * Palette (existing CSS custom properties in src/app/globals.css — new UI consumes ONLY these):
 *   --background #f8f9fc (light) / dark twin · --foreground #0a0a1a · --primary #3b82f6
 *   --muted-foreground · --border · --glass · --radius 0.625rem (+ --radius-sm/md/lg/xl derived)
 *   Dark mode: existing `.dark` token overrides — new components inherit automatically by using tokens, never hex literals.
 * Typography: Geist Sans (--font-sans) + Geist Mono (--font-mono); type scale steps used on site:
 *   display text-4xl→[3.5rem] clamp-like via Tailwind responsive classes; h2 SectionHeading; body base/lg;
 *   mono for tech tags/metric values (technical credibility cue).
 * Spacing/layout: 4px scale via Tailwind utilities; content max-width var(--content-wide); section rhythm from existing SectionHeading usage.
 * Motion: keep existing stagger/text-reveal; respect prefers-reduced-motion (already 3 blocks in globals.css); no new animation families.
 * Anti-slop guardrails (enforced in review): no emoji icons (lucide only), no gradient text, no glassmorphism beyond existing --glass usage, no particle additions, decorative strips banned per quality-parts part-02 portfolio protocol, hover/focus states with 150–300ms transitions, contrast ≥ 4.5:1 both themes.
 * Canonical tech names (single string source for tags): TypeScript, JavaScript, Python, PHP, SQL, React, Next.js, Vite, Tailwind CSS, Laravel, Node.js, FastAPI, Inertia.js, PostgreSQL, MySQL, Supabase, MongoDB, Docker, Cloudflare, Git, GitHub, Linux — only those actually used per fact-whitelist; drop uncertain items at Build.
 */

// ─────────────────────────────────────────────────────────────────────────────
// 6. Requirements coverage matrix (G8 traceability — every REQ maps to a design element above)
// ─────────────────────────────────────────────────────────────────────────────
export const REQUIREMENT_TRACE: { id: string; design: string }[] = [
  { id: 'REQ-1',  design: '§5 identity strings via siteConfig/team data; hero eyebrow + role line' },
  { id: 'REQ-2',  design: '§2 content rule — education/about copy rewritten in data layer; no junior phrases' },
  { id: 'REQ-3',  design: '§3 HERO_CTAS (exactly three)' },
  { id: 'REQ-4',  design: '§3 Hero: role + supporting message + value line' },
  { id: 'REQ-5',  design: '§3 WhatIBuildProps, 3 categories from §2 ProjectCategory' },
  { id: 'REQ-6',  design: '§2 featured flag + slug; filter replaces slice' },
  { id: 'REQ-7',  design: '§2 flagship slug set; whitelist-gated facts' },
  { id: 'REQ-8',  design: '§4 /projects grouping by featured' },
  { id: 'REQ-9',  design: '§3 ProjectCardProps featured variant w/ highlights + case-study CTA' },
  { id: 'REQ-10', design: '§2 CaseStudy schema + §4 route with generateStaticParams; conditional sections' },
  { id: 'REQ-11', design: '§2 MetricFact.source → prime/state/fact-whitelist.md covers all site-visible facts' },
  { id: 'REQ-12', design: '§3 FlowDiagramProps — one shared diagram component, all flagships' },
  { id: 'REQ-13', design: '§2 skills.ts 7 domains; §5 tag styling' },
  { id: 'REQ-14', design: '§4 resume server wrapper + §2 shared skills data source' },
  { id: 'REQ-15', design: '§2 about content rewrite; workflow process section' },
  { id: 'REQ-16', design: '§4 metadata wrappers per page' },
  { id: 'REQ-17', design: '§4 sitemap.ts slug + blog coverage' },
  { id: 'REQ-18', design: '§3 FlowDiagram mobile vertical stack; §5 layout constraints; verify 6 widths' },
  { id: 'REQ-19', design: '§3 diagram aria/ol semantics; §5 contrast/motion rules' },
  { id: 'REQ-20', design: '§4 static export compatible; build/lint gates in Verify' },
  { id: 'REQ-21', design: '§5 tokens-only consumption; shared primitives' },
  { id: 'REQ-22', design: '§2 single-source names; §5 canonical strings' },
  { id: 'REQ-23', design: '§4 navigation.ts six-item primary + footer secondary' },
];

export default function DesignDoc() {
  return null; // documentation artifact; structure encoded above
}
