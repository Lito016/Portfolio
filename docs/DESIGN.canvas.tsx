/**
 * DESIGN.canvas.tsx - Portfolio rebuild, Cycle 5 (Phase 3 design language authority)
 *
 * THE RULE THIS FILE OBEYS: design values are OUTPUT, never input. This canvas
 * runs the taste chain (skills/frontend/references/design/quality-parts/part-01..03)
 * end to end for THIS brief:
 *
 *   0. Base system      bespoke original under G13 custom_approval (quoted below);
 *                       registry law satisfied by equivalent discipline: measured
 *                       tokens, computed contrast, band vocabulary preserved
 *   1. Design Read      §0 below
 *   2. Dials            §1 below, reasoned from the owner brief
 *   3. Scope check      portfolio/editorial: landing-page taste core applies in full
 *   4. System choice    original design system, honestly labeled (no package faking)
 *   5. Tokens           every value traces to fetch evidence, selector data, or a
 *                       measured contrast ratio; none copied from Google assets
 *   6. Pre-flight       part-03 §14 checklist at `preflight` below
 *
 * Evidence chain: prime/reports/phase-1-research.md (live CSS fetch),
 * prime/reports/phase-3-design.md (ADRs, benchmark record, selector override log),
 * prime/reports/phase-3-parts-evidence.md (comprehensive quality-parts distillation).
 * Structure is contract, not style: Phase 3 gates grep the token groups and the
 * traceability oracle cross-references every REQ id in docs/PRD.md.
 */

// ---------------------------------------------------------------------------
// 0. BASE SYSTEM (G13) - bespoke path. The registry law permits an original
// design system on explicit user request; the request is quoted verbatim:
// ---------------------------------------------------------------------------
export const baseSystem = {
    custom_approval:
        "Rebuild my personal portfolio website from scratch with a premium, experimental, highly interactive visual style inspired by the design language of antigravity.google. Do NOT copy Google's website, branding, logos, text, assets, or proprietary design directly.",
    approvalSource: "owner first message, cycle 5 (verbatim in custom_approval below); prime/state/project-charter.md carries the §brief paraphrase - the verbatim string is preserved in the Phase-3 artifacts themselves",
    origin: "Original system named ANTIGRAVITY-EDITORIAL: derived from measured public CSS of the fetch anchor (cool near-white stack, layered near-black ink ramp, sub-1.0 display leading, weight restraint 400-500, hairline rules) tuned through the UI/UX Pro Max selector and the taste parts. Google proprietary assets (Google Sans Flex, logos, copy, images) are excluded by law of the brief itself; Geist + Geist Mono stand in as the grotesque family, self-hosted at build via next/font.",
    registryConsidered: "skills/frontend/data/design-systems/registry.json - all six entries best_for app types (consumer mobile, SaaS, enterprise ops, civic, workflow, iOS); none matches a bespoke editorial portfolio brand, and copying a registry palette would violate the quoted user request.",
    statusColorPolicy: "no status semantics exist in this product (no badges/alerts/queues); error/on_error roles are reserved and unused; the single spark color never carries state alone.",
    g32SourceParity: "Phase 5 ships this same custom_approval quote as a comment in src/app/globals.css and uses min-width band queries across compact/medium/expanded boundaries (gate-check base-system-source).",
};

export const responsiveContract = {
    compact: "0-767px (phone; 425px tuning mark) - base stylesheet: single column, full-bleed media, stacked showcase variants without pinning, hamburger-free minimal nav (name + 3 anchor links inline), touch targets >=44px, hero clamp floor 3.5rem",
    medium: "768-1023px (tablet; 1024 boundary) - two-column editorial grid emerges via min-width queries, showcase meta rows widen, sticky-stack variant activates, secondary row 3-up",
    expanded: "1024px+ (desktop; 1440 tuning mark) - full 12-col asymmetric grid, pinned browser-preview showcase on pointer:fine, hover layer (scale <=1.03, metadata reveal), content max-width 1440px",
    mobileFirstRule: "base CSS is the compact band; layout is added with min-width queries, never removed",
};

// ---------------------------------------------------------------------------
// 1. DESIGN READ (§0.B)
// ---------------------------------------------------------------------------
export const designRead = {
    title: "Manolito Almaden Jr. - Portfolio (single-page cinematic editorial)",
    oneLiner: "Reading this as: a single-experience editorial portfolio for hiring partners and clients, with a cinematic motion-led language built around an original ANTIGRAVITY-EDITORIAL system derived from measured public CSS.",
    signalsRead: [
        "page kind: portfolio as one cinematic scroll arc (FR-01), not marketing SaaS",
        "vibe words from the brief: premium, experimental, cinematic, spacious, editorial, motion-driven",
        "audience: P1 hiring/technical evaluators, P2 clients (charter) - first-impression surface, 6-second hero budget",
        "quiet constraints: fact whitelist W1-W28 (unknown = not shown) overrides any decorative copy invention; reduced-motion parity is a hard requirement (FR-18)",
    ],
};

// ---------------------------------------------------------------------------
// 2. DIALS (§1) - reasoned from the brief text, not the silent baseline
// ---------------------------------------------------------------------------
export const dials = {
    DESIGN_VARIANCE: 8,
    MOTION_INTENSITY: 8,
    VISUAL_DENSITY: 3,
    note: "VARIANCE 8: brief demands experimental asymmetric compositions and four distinct showcase layouts (FR-09). MOTION 8: 'Motion is one of the most important parts of this project' (owner brief). DENSITY 3: generous whitespace, oversized type as the grid; hairline structure replaces boxes.",
};

// ---------------------------------------------------------------------------
// 3. SCOPE CHECK (§13) + 4. SYSTEM CHOICE (§2)
// ---------------------------------------------------------------------------
export const designSystemChoice = {
    selected: "ANTIGRAVITY-EDITORIAL - original design system (tokens hand-derived from fetch evidence + selector tuning; no component package faked)",
    honestyNote: "No official package applies; per §2 the approximation is labeled honestly. The canvas documents the language; globals.css in Phase 5 implements these exact values as CSS custom properties under @theme inline.",
    replaceWhen: "Never: the owner brief legally forbids Google asset reuse and mandates an original feel; a registry palette swap would break the quoted custom_approval.",
};

// ---------------------------------------------------------------------------
// 5. DESIGN TOKENS - measured, not claimed. Ratios computed 2026-09-27 with
// the WCAG relative-luminance formula against their stated backgrounds.
// ---------------------------------------------------------------------------
const PALETTE_LIGHT = {
    primary: "#0B57D0",            // accent-deep: text links, focus ring; 6.07:1 on canvas (AA text)
    onPrimary: "#FFFFFF",          // 6.39:1 on primary (AA button text, measured)
    primaryContainer: "#E8F0FE",   // reserved tint (used at most as hover wash); ink on it >=7:1
    onPrimaryContainer: "#073A8F",
    secondary: "#1A73E8",          // accent-graphic: rules under hover, large numerals, 3% marks; 4.28:1 on canvas (>=3:1 non-text, 30px+ AA large)
    surface: "#FFFFFF",            // cards/frames lifted on canvas; ink 18.56:1
    surfaceVariant: "#EFF2F7",     // sunk panels, marquee-free secondary row ground
    background: "#F8F9FC",         // warm-cool off-white canvas (fetch-measured class; PRD NFR-03)
    foreground: "#121317",         // near-black ink: 17.63:1 on canvas (AAA)
    muted: "#E6EAF0",              // deep rule / dividers where 1px must read stronger
    mutedForeground: "#45474D",    // 8.82:1 on canvas - secondary copy floor (AAA)
    border: "#DDE3EC",             // hairline borders: 1px rules, never layout walls
    error: "#B3261E",              // reserved, unused (no forms); never rendered as decoration
    onError: "#FFFFFF",
    focusRing: "#0B57D0",          // 6.07:1 vs canvas (>=3:1 UI minimum); 3px offset ring
};
const PALETTE_INVERSE = {
    // The Contact close is the single tonal inversion (ADR-3.7); not a user theme.
    primary: "#8AB4F8",            // links on ink: 8.81:1 on #121317 (AA)
    onPrimary: "#0B357F",
    primaryContainer: "#174EA6",
    onPrimaryContainer: "#D2E3FC",
    secondary: "#A8C7FA",          // 10.80:1
    surface: "#1A1B20",
    surfaceVariant: "#23252B",
    background: "#121317",         // near-black ground, never #000000
    foreground: "#F8F9FC",         // 17.63:1
    muted: "#2A2D34",
    mutedForeground: "#9AA0A6",    // 7.03:1 on #121317 (AA secondary; corrected at quality-review finding 2)
    border: "#3C4043",
    error: "#F2B8B5",
    onError: "#5F1210",
    focusRing: "#A8C7FA",
};
const SPARK = { dot: "#FBBC04" };  // dot-level compositional mark (ScrollIndicator only); never text (1.62:1 on canvas; corrected at finding 3), never state-bearing, never a cursor pip (part-01 §9.A/§9.F via parts fold-in)

const FONT_STACKS = {
    displayFamily: "var(--font-geist-sans), 'Segoe UI Variable Text', 'Segoe UI', system-ui, sans-serif",
    bodyFamily: "var(--font-geist-sans), 'Segoe UI Variable Text', 'Segoe UI', system-ui, sans-serif",
    numericFamily: "var(--font-geist-mono), ui-monospace, 'Cascadia Mono', Consolas, monospace",
};

export const designTokens = {
    colors: PALETTE_LIGHT,
    colorsDark: PALETTE_INVERSE, // inverse panel scheme (Contact close + footer); hierarchy parity: the same accent button pops on both
    spark: SPARK,
    cssVariables: {
        "--bg-canvas": PALETTE_LIGHT.background,
        "--surface": PALETTE_LIGHT.surface,
        "--surface-sunk": PALETTE_LIGHT.surfaceVariant,
        "--rule": PALETTE_LIGHT.border,
        "--rule-deep": PALETTE_LIGHT.muted,
        "--ghost-ink": "#858B94",   // decorative ghost numerals: 3.43:1 white / 3.26:1 canvas (AA large-text); --rule-deep is divider-only
        "--ink": PALETTE_LIGHT.foreground,
        "--ink-2": "#202124",      // 15.29:1 subheads
        "--ink-3": "#3C4043",      // 9.94:1 strong body
        "--ink-muted": PALETTE_LIGHT.mutedForeground,
        "--accent": PALETTE_LIGHT.secondary,
        "--accent-deep": PALETTE_LIGHT.primary,
        "--spark": SPARK.dot,
        "--inverse-bg": PALETTE_INVERSE.background,
        "--inverse-fg": PALETTE_INVERSE.foreground,
        "--inverse-link": PALETTE_INVERSE.primary,
        "--font-display": FONT_STACKS.displayFamily,
        "--font-mono": FONT_STACKS.numericFamily,
        "--gutter": "clamp(20px, 4vw, 64px)",
        "--section-rhythm": "clamp(96px, 16vh, 192px)",
    },
    typography: {
        ...FONT_STACKS,
        minimumBodySize: "16px",
        // Weight restraint (fetch-measured Google Sans Flex discipline): size carries
        // hierarchy, weights stay 400-500; 600 only for 11-12px mono labels.
        weights: [400, 500, 600],
        displayWeightRule: "400 at >=64px, 500 below; no bold display",
        letterSpacing: { display: "-0.035em", heading: "-0.02em", body: "normal", label: "0.1em" },
        lineHeight: { display: 0.88, heading: 0.95, body: 1.65, small: 1.5 },
        typeScale: {
            displayHero: "clamp(3.5rem, 9vw, 9.25rem) / 0.88 / -0.035em",   // 129.6px at 1440: FR-04 >=86px and <=10vw hold
            displayStatement: "clamp(2.5rem, 7vw, 7rem) / 0.9 / -0.03em",   // About/Contact statements
            sectionHead: "clamp(2rem, 4.5vw, 4.5rem) / 0.95 / -0.025em",
            showcaseTitle: "clamp(2rem, 3.5vw, 3.5rem) / 1 / -0.02em",
            titleLarge: "1.5rem / 1.2 / -0.01em",
            bodyLarge: "1.125rem / 1.6",
            bodyMedium: "1rem / 1.65",
            bodySmall: "0.875rem / 1.5",
            labelLarge: "0.75rem Geist Mono uppercase / 1.4 / 0.1em",       // eyebrows, index labels 01-04
        },
    },
    spacing: {
        unit: "4px",
        scale: ["4px", "8px", "12px", "16px", "24px", "32px", "48px", "64px", "96px", "128px", "192px"],
        pageGutter: "clamp(20px, 4vw, 64px)",
        sectionRhythm: "clamp(96px, 16vh, 192px) block padding",
        maxContentWidth: "1440px (media frames may full-bleed past it on expanded)",
    },
    radii: { sm: "0px", md: "8px (media frames only)", lg: "8px", full: "9999px (CTA + nav-compact pills only)" }, // Shape lock: frames square or 8px, pills interactive-only
    shadows: {
        elevation1: "0 1px 2px rgba(18,19,23,0.04)  (hairline surfaces)",
        elevation2: "0 24px 48px -24px rgba(18,19,23,0.18)  (browser-preview frame only)",
        focusRing: "0 0 0 3px var(--accent-deep) with 2px offset",
    },
    zIndex: { base: 0, stickyNav: 50, stickyShowcase: 40, overlay: 100 }, // small ladder, nothing decorative
    motion: {
        duration: { micro: "180ms", state: "250ms", reveal: "600ms", heroSequenceTotal: "2450ms serial ceiling (bg 400 -> nav 150 -> lines 700 stagger 120 -> visual 900 scale-in from 0.94 + opacity 0->1, never scale(0) -> meta 300 -> settle); stages may overlap, wall time <=2450ms, inside FR-03 <=2.5s (arithmetic corrected at quality-review finding 4)" },
        easing: {
            expoOut: "cubic-bezier(0.16, 1, 0.3, 1)",       // macro reveals, hero settle
            measuredOut: "cubic-bezier(0.165, 0.84, 0.44, 1)", // fetch-measured antigravity micro curve
            scrub: "none (scrub-driven timelines are position-tied)",
        },
        transition: "transform 250ms cubic-bezier(0.165,0.84,0.44,1), color 180ms, border-color 180ms; linear forbidden (NFR-04)",
        press: "interactive :active scale 0.97 at 150ms expoOut (ContactCTA, nav links, showcase links); hover gated behind @media (hover:hover) and (pointer:fine)",
        budgets: "hover scale <=1.03 (FR-10); parallax yPercent <=15 decorative layers only; reveals y <=24px; stagger <=0.08s, <=8 children; pins: 1 GSAP pin + 1 CSS sticky total (motion-row-6 rule); micro <=300ms, macro eased >=600ms",
        reducedMotion: "prefers-reduced-motion: reduce - Lenis never constructed, ScrollTriggers never created, hero canvas never mounted (static typographic hero instead), Framer MotionConfig reducedMotion='user'. Static means fewer and gentler, not zero (part-10 §8): opacity-only fades <=200ms may remain; nothing translates, scales, pins, loops, or scrubs. All content and anchors fully usable (FR-18, J4)",
    },
    layout: {
        gridColumns: 12,
        gridGutter: "24px compact / 32px expanded",
        breakpoints: { compact: "0px (base)", medium: "768px (min-width)", expanded: "1024px (min-width)", tuningMarks: "425px, 1440px" },
        containerQuery: "showcase media frames size captions on container width",
        touchTargetMinimum: "44x44px compact band",
    },
    accessibility: {
        wcagLevel: "AA floor everywhere; AAA for body on canvas (17.63:1 measured)",
        contrast: { text: "ink 17.63 / secondary 8.82 / link 6.07 (all on #F8F9FC)", largeTextAndUI: "accent graphic 4.28 (>=3:1 non-text), focus ring 6.07", inverse: "on-ink 17.63, link 8.81, secondary 7.03" },
        keyboard: "every anchor native href; skip link retained; nav compact does not trap focus; hover reveals have focus equivalents (FR-12)",
        colorIndependence: "meaning never by hue alone: links are underlined on focus, diagram labeling is textual (W28), spark dot is decorative aria-hidden",
        landmarks: "header/nav/main/section[aria-labelledby]/footer in FR-01 order",
    },
};

// ---------------------------------------------------------------------------
// 5b. ANTI-DEFAULTS AUDIT (§0.D, §9)
// ---------------------------------------------------------------------------
export const antiDefaults = [
    "Rejected: copying Google Sans Flex, logos, copy or any antigravity.google asset - the brief forbids it; Geist/Geist Mono with measured-discipline instead",
    "Rejected: selector row 'Inter / Inter + Google Fonts link' - §4.1 Inter-as-default ban + §3.A Google Fonts link ban; override logged in phase-3-design.md §1",
    "Rejected: selector pattern 'Portfolio Grid / masonry cards' - contradicts FR-07/FR-09 editorial showcases and 'no excessive cards' brief rule",
    "Rejected: AI-purple gradients, glassmorphism-everywhere, equal feature-card trios (§0.D)",
    "Rejected: three.js/R3F hero demo (+236KB gzip, ADR-3.3) - own 2D canvas matches the fetch-verified 2D hero mechanism",
    "Rejected: hand-authored pure #000000 inverse ground - the ink panel uses #121317-class, the canvas floor uses #F8F9FC-class",
    "Rejected: dark/light theme toggle machinery (PRD Out-of-Scope); one canvas + one designed inversion, no user-visible theme state",
    "Retained despite part-01 §9.F tells (user instruction outranks taste rules; overrides recorded in phase-3-design.md §1): hero ScrollIndicator required by the brief/FR-06 (minimal, aria-hidden, <=2 loops); showcase index numerals 01-04 rendered as display-scale compositional type per FR-08, not micro-label eyebrows; lucide-react mandated by the owner stack, one family, one strokeWidth",
];

// Behavior states (part-20 §21: a spec without defined states is unfinished)
export const behaviorStates = {
    loading: "below-fold images: sunk-background (#EFF2F7) aspect-ratio placeholder until decode; hero has no async data (server-rendered), so no skeleton",
    noJs: "all copy, links, project data and anchors render in server HTML; Lenis/GSAP/HeroCanvas simply never initialize; native anchor scrolling is the fallback (ADR-3.1)",
    emptyData: "data arrays are build-time static and non-empty; each section component returns null when its array is empty, so an emptied file degrades to layout without orphan shells (verified by build)",
    keyboardFocus: "every interactive element reachable in DOM order; focusRing token 3px offset #0B57D0; skip-link first stop; hover-only reveals duplicated in always-visible server markup for keyboard/AT (no hover-gated information)",
};

// ---------------------------------------------------------------------------
// Design language
// ---------------------------------------------------------------------------
export const designLanguage = {
    brand: "One person's engineering presented like a product film: calm surface, heavy typography, motion with intent.",
    designSystem: "ANTIGRAVITY-EDITORIAL: off-white canvas, layered near-black ink ramp, hairline rules, sub-1.0 oversized display type at weight restraint, one deep-blue text accent + one graphic accent, single tonal inversion at Contact",
    voice: "Sentence case, concrete, whitelist-bound (FR-17: unknown = not shown); no 'elevate/seamless/unleash' filler (§9.D); no em-dash characters in any user-visible string (§9.G)",
    density: "Editorial (VISUAL_DENSITY 3): section rhythm 96-192px, media breathes full-bleed, metadata in mono labels",
};

// ---------------------------------------------------------------------------
// 6. PRE-FLIGHT (§14)
// ---------------------------------------------------------------------------
export const preflight = {
    designReadDeclared: true,
    dialsReasoned: true,
    systemChosenHonestly: true, // bespoke under quoted custom_approval; origin and registry consideration recorded
    zeroEmDash: true,           // enforced in this canvas and mandated for all shipped UI copy
    accentLocked: true,         // --accent-deep for text, --accent for graphics: one hue family, no per-screen hues
    radiusLocked: true,         // 0/8px frames + pill-only interactives
    contrastMeasured: true,     // WCAG relative-luminance, computed 2026-09-27; Phase 6 re-verifies renders
    darkModeParity: true,       // inverse panel scheme ships with the same hierarchy (colorsDark above)
    reference: "skills/frontend/references/design/quality-parts/part-03-taste-skill-appendices.md §14 (distilled in prime/reports/phase-3-parts-evidence.md)",
};

// ---------------------------------------------------------------------------
// Architecture - components/modules implementing requirements (G1)
// ---------------------------------------------------------------------------
export const architecture = {
    summary: "Static Next 16 export: server composition (layout.tsx, page.tsx) mounts one client interaction island per motion concern under a SmoothScrollProvider that owns Lenis + the GSAP ticker (single rAF owner, ADR-3.1). Content flows one-way from src/data typed arrays; no store, no API, no server functions (backend surface analysis: phase-3-design.md §5).",
    modules: [
        { name: "Shell", schema: "siteConfig {name, links, positioning}", components: ["SiteNav", "SiteFooter", "SkipLink", "GrainOverlay(CSS)"] },
        { name: "Scroll", schema: "useSmoothScroll(): { scrollTo(target, opts) }", components: ["SmoothScrollProvider"] },
        { name: "Hero", schema: "whitelisted POSITIONING split server-side into line spans", components: ["Hero", "HeroCanvas(2D, pointer-gated)", "ScrollIndicator"] },
        { name: "Work", schema: "FeaturedProject {slug,name,description,url,image,tags,category,highlights,links,caseStudy}", components: ["Work", "ShowcasePinnedBrowser(01)", "ShowcaseFullBleed(02)", "ShowcaseTypographicDiagram(03)", "ShowcaseStickyStack(04)", "SecondaryRow", "variantFor(index%4)"] },
        { name: "Story", schema: "bio/education/skills/experience typed arrays", components: ["About", "Skills(hover+focus reveal)", "Experience"] },
        { name: "Close", schema: "siteConfig contact links verbatim", components: ["Contact(inverse panel)", "ContactCTA(anchor mailto)"] },
    ],
};

// ---------------------------------------------------------------------------
// Traceability - every REQ id from docs/PRD.md (G8; oracle-enforced)
// ---------------------------------------------------------------------------
export const requirementTraceability = [
    { requirement: "REQ-01", acceptanceCriterion: "eight regions in order with landmarks; nav click scrolls to target", components: ["page.tsx composition", "SiteNav", "SmoothScrollProvider"] },
    { requirement: "REQ-02", acceptanceCriterion: "fixed minimal bar compacts >~80px; visible focus ring", components: ["SiteNav", "focusRing token"] },
    { requirement: "REQ-03", acceptanceCriterion: "staged sequence runs once <=2.5s; hero text in server HTML", components: ["Hero", "motion.heroSequenceTotal"] },
    { requirement: "REQ-04", acceptanceCriterion: ">=86px at 1440 and <=10vw; 375px recomposed, no overflow", components: ["typeScale.displayHero clamp", "Hero"] },
    { requirement: "REQ-05", acceptanceCriterion: "cursor-reactive offsets <=3% viewport, eased lag; coarse fallback; mount-gated", components: ["HeroCanvas", "pointer:fine + reduced-motion gates"] },
    { requirement: "REQ-06", acceptanceCriterion: "indicator in first viewport, <=2 loops, aria-hidden", components: ["ScrollIndicator", "motion budgets"] },
    { requirement: "REQ-07", acceptanceCriterion: "4 showcases from data array with index, visual, title, <=2-line desc, tech, live links only; index legibility: display numeral aria-hidden decorative ghost tone, a readable labelLarge mono label (>=#45474D, 8.82:1) always present beside it (quality-review finding 1)", components: ["Work", "variantFor", "SecondaryRow"] },
    { requirement: "REQ-08", acceptanceCriterion: "transform-only pinned treatment (scrub scale 1->1.025 in overflow-hidden wrappers); static under reduced motion; ghost numeral inside the pinned/scrub contract, never sole information carrier", components: ["ShowcasePinnedBrowser", "ShowcaseStickyStack", "ADR-3.5"] },
    { requirement: "REQ-09", acceptanceCriterion: "no two layouts identical; Vision labeled as diagram", components: ["4 variant components", "ShowcaseTypographicDiagram W28 label"] },
    { requirement: "REQ-10", acceptanceCriterion: "hover scale <=1.03 <=300ms; nothing hover-gated on coarse", components: ["motion.budgets", "variant hover layer"] },
    { requirement: "REQ-11", acceptanceCriterion: "every About sentence traces to whitelist", components: ["About", "FR-17 data discipline"] },
    { requirement: "REQ-12", acceptanceCriterion: "domain lines reveal <=300ms; focus/tap equivalence", components: ["Skills", "motion.duration.micro"] },
    { requirement: "REQ-13", acceptanceCriterion: "single verified entry with year/months/role/company", components: ["Experience", "hairline rows"] },
    { requirement: "REQ-14", acceptanceCriterion: "three siteConfig hrefs; noopener; CTA keyboard-activatable <=300ms", components: ["Contact", "ContactCTA", "PALETTE_INVERSE"] },
    { requirement: "REQ-15", acceptanceCriterion: "name, (c) YEAR, location, socials only", components: ["SiteFooter"] },
    { requirement: "REQ-16", acceptanceCriterion: "5th data entry renders via same primitives", components: ["variantFor(index%4)", "src/data unchanged schema"] },
    { requirement: "REQ-17", acceptanceCriterion: "zero unsourced claims at Phase 6 grep", components: ["typed arrays + siteConfig only", "voice rule"] },
    { requirement: "REQ-18", acceptanceCriterion: "reduced motion: zero continuous animations, full content", components: ["motion.reducedMotion", "construction-time gates"] },
    { requirement: "REQ-19", acceptanceCriterion: "out/index.html without dead route links; sitemap canonical root", components: ["route plan phase-3-design.md §3"] },
    { requirement: "REQ-N01", acceptanceCriterion: "static export preserved; first-load JS = gsap+lenis+framer only", components: ["ADR-3.2/3.3", "lazy images", "client islands"] },
    { requirement: "REQ-N02", acceptanceCriterion: "425/767/1024/1440 bands; no module-scope window", components: ["responsiveContract", "layout.breakpoints", "island rule"] },
    { requirement: "REQ-N03", acceptanceCriterion: "AA contrast; landmarks; focus; axe 0 critical", components: ["accessibility block", "measured ratios"] },
    { requirement: "REQ-N04", acceptanceCriterion: "micro <=300ms eased; no linear; no competing animations", components: ["motion token family"] },
    { requirement: "REQ-N05", acceptanceCriterion: "build + lint exit 0, Turbopack-clean", components: ["no webpack config", "deps via npm only"] },
    { requirement: "REQ-N06", acceptanceCriterion: "Cloudflare Pages out/ CI untouched", components: ["deployment parity: next.config.ts unchanged"] },
];

// ---------------------------------------------------------------------------
// Presentation layer - rendered spec sheet. Self-contained; every pixel from
// the tokens above. Preview stacks degrade through OS faces before generic.
// ---------------------------------------------------------------------------
const t = designTokens;
const mono = { fontFamily: t.typography.numericFamily };

const canvasStyles = `
  .design-canvas { background: ${t.colors.background}; color: ${t.colors.foreground}; font-family: ${t.typography.bodyFamily}; min-height: 100vh; }
  .design-canvas * { box-sizing: border-box; }
  .dc-shell { max-width: 1200px; margin: auto; padding: 32px clamp(20px, 4vw, 64px) 72px; }
  .dc-topline { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding-bottom: 18px; border-bottom: 1px solid ${t.colors.border}; }
  .dc-kicker { color: ${t.colors.primary}; font: 500 11px/1.4 ${t.typography.numericFamily}; letter-spacing: .12em; text-transform: uppercase; }
  .dc-edition { color: ${t.colors.mutedForeground}; font: 12px/1.4 ${t.typography.numericFamily}; text-align: right; }
  .dc-hero { padding: 52px 0 40px; }
  .dc-hero h1 { font-size: clamp(2.5rem, 6.5vw, 6rem); line-height: .9; letter-spacing: -.035em; font-weight: 400; margin: 14px 0 18px; max-width: 14ch; overflow-wrap: anywhere; } /* 400 per displayWeightRule >=64px (quality-review finding 9) */
  .dc-hero .dc-display-line { color: ${t.colors.mutedForeground}; }
  .dc-lede { color: ${t.colors.mutedForeground}; line-height: 1.6; margin: 0; max-width: 62ch; font-size: 15px; }
  .dc-dials { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border: 1px solid ${t.colors.border}; margin-top: 32px; }
  .dc-dial { min-width: 0; padding: 18px 20px; border-right: 1px solid ${t.colors.border}; }
  .dc-dial:last-child { border-right: 0; }
  .dc-dial-label { color: ${t.colors.mutedForeground}; font: 10px/1.4 ${t.typography.numericFamily}; letter-spacing: .08em; overflow-wrap: anywhere; }
  .dc-dial-value { font: 500 26px/1.2 ${t.typography.numericFamily}; margin-top: 10px; overflow-wrap: anywhere; }
  .dc-section { border-top: 1px solid ${t.colors.border}; padding-top: 28px; margin-top: 48px; }
  .dc-section-head { display: grid; grid-template-columns: minmax(160px, .6fr) minmax(0, 1.4fr); gap: 24px; align-items: baseline; margin-bottom: 24px; }
  .dc-section h2 { font-size: 21px; line-height: 1.2; letter-spacing: -.02em; margin: 0; font-weight: 500; }
  .dc-section-note { color: ${t.colors.mutedForeground}; font-size: 13px; line-height: 1.5; margin: 0; max-width: 66ch; }
  .dc-swatches { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 12px; }
  .dc-swatch-color { height: 64px; border: 1px solid ${t.colors.border}; border-radius: ${t.radii.md.startsWith("0") ? "0" : "2px"}; }
  .dc-swatch-name { font-size: 13px; font-weight: 500; margin-top: 8px; overflow-wrap: anywhere; }
  .dc-swatch-value { color: ${t.colors.mutedForeground}; font: 11px/1.5 ${t.typography.numericFamily}; }
  .dc-dark { background: ${t.colorsDark.background}; color: ${t.colorsDark.foreground}; padding: 20px; margin-top: 12px; }
  .dc-dark .dc-swatch-color { border-color: ${t.colorsDark.border}; }
  .dc-dark .dc-swatch-value { color: ${t.colorsDark.mutedForeground}; }
  .dc-dark .dc-swatch-name { color: ${t.colorsDark.foreground}; }
  .dc-spec-row { display: grid; grid-template-columns: 120px minmax(0, 1fr) minmax(90px, auto); gap: 16px; align-items: baseline; padding: 12px 0; border-bottom: 1px solid ${t.colors.border}; }
  .dc-spec-row > :nth-child(2) { overflow-wrap: anywhere; }
  .dc-navspec { display: flex; justify-content: space-between; align-items: center; border: 1px solid ${t.colors.border}; background: rgba(255,255,255,.72); backdrop-filter: blur(12px); border-radius: 9999px; padding: 10px 20px; margin-bottom: 12px; font-size: 13px; }
  .dc-navspec b { font-weight: 500; letter-spacing: -.01em; }
  .dc-navspec span { color: ${t.colors.mutedForeground}; margin-left: 20px; }
  .dc-frame { border: 1px solid ${t.colors.border}; border-radius: 8px; background: ${t.colors.surface}; box-shadow: ${t.shadows.elevation2}; overflow: hidden; }
  .dc-frame-bar { display: flex; gap: 6px; padding: 10px 14px; border-bottom: 1px solid ${t.colors.border}; }
  .dc-frame-bar i { width: 8px; height: 8px; border-radius: 50%; background: ${t.colors.muted}; }
  .dc-frame-body { padding: 22px; }
  .dc-showcase { display: grid; grid-template-columns: minmax(0,7ch) minmax(0,1fr); gap: 24px; align-items: end; }
  .dc-index { font: 400 clamp(48px, 6vw, 88px)/1 ${t.typography.numericFamily}; color: var(--ghost-ink); } /* ghost tone = decorative; aria-hidden; --ghost-ink meets AA large-text (3:1); legible index label beside it (finding 1) */
  .dc-index-label { font: 500 11px/1.4 ${t.typography.numericFamily}; letter-spacing: .1em; text-transform: uppercase; color: ${t.colors.mutedForeground}; margin-top: 6px; } /* 8.82:1 canvas / 9.29:1 surface - AA large+small */
  .dc-showcase h3 { margin: 0 0 6px; font: 500 clamp(22px, 2.6vw, 34px)/1 ${t.typography.displayFamily}; letter-spacing: -.02em; }
  .dc-showcase p { margin: 0 0 8px; color: ${t.colors.mutedForeground}; font-size: 14px; line-height: 1.55; max-width: 52ch; }
  .dc-tech { font: 500 11px/1.4 ${t.typography.numericFamily}; letter-spacing: .1em; text-transform: uppercase; color: ${t.colors.primary}; }
  .dc-inverse { background: ${t.colorsDark.background}; color: ${t.colorsDark.foreground}; border-radius: 8px; padding: clamp(28px, 5vw, 56px); margin-top: 12px; }
  .dc-inverse h3 { font: 400 clamp(34px, 5.4vw, 64px)/.92 ${t.typography.displayFamily}; letter-spacing: -.03em; margin: 0 0 18px; }
  .dc-inverse a { color: ${t.colorsDark.primary}; text-decoration: none; font-size: 14px; margin-right: 24px; }
  .dc-cta { display: inline-block; background: ${t.colorsDark.primary}; color: ${t.colorsDark.onPrimary}; border-radius: 9999px; padding: 14px 28px; font: 500 14px/1 ${t.typography.bodyFamily}; margin-top: 22px; }
  .dc-spacing-bar { height: 10px; background: ${t.colors.primary}; }
  .dc-scroll { overflow-x: auto; }
  .dc-motion-table { width: 100%; border-collapse: collapse; font-size: 12px; }
  .dc-motion-table th { color: ${t.colors.mutedForeground}; text-align: left; font-weight: 500; }
  .dc-motion-table th, .dc-motion-table td { padding: 10px 8px; border-bottom: 1px solid ${t.colors.border}; }
  .dc-motion-table td:last-child { font-family: ${t.typography.numericFamily}; color: ${t.colors.mutedForeground}; }
  @media (max-width: 760px) { .dc-section-head { grid-template-columns: 1fr; gap: 8px; } .dc-dials { grid-template-columns: repeat(2, minmax(0, 1fr)); } .dc-dial:nth-child(2) { border-right: 0; } .dc-dial:nth-child(-n+2) { border-bottom: 1px solid ${t.colors.border}; } .dc-spec-row { grid-template-columns: 96px minmax(0, 1fr); } .dc-spec-row > :last-child { grid-column: 2; } .dc-showcase { grid-template-columns: 1fr; gap: 8px; } }
`;

function Section({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
    return (
        <section className="dc-section" aria-label={title}>
            <div className="dc-section-head"><h2>{title}</h2>{note && <p className="dc-section-note">{note}</p>}</div>
            <div>{children}</div>
        </section>
    );
}

function DialTile({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="dc-dial">
            <div className="dc-dial-label">{label}</div>
            <div className="dc-dial-value">{value}</div>
        </div>
    );
}

function Swatch({ name, value }: { name: string; value: string }) {
    return (
        <div>
            <div className="dc-swatch-color" style={{ background: value }} />
            <div className="dc-swatch-name">{name}</div>
            <div className="dc-swatch-value">{value}</div>
        </div>
    );
}

export default function DesignCanvas() {
    return (
        <div className="design-canvas">
            <style>{canvasStyles}</style>
            <div className="dc-shell">
                <div className="dc-topline">
                    <span className="dc-kicker">Prime / Design language</span>
                    <span className="dc-edition">CYCLE 5 · PHASE 3 · 2026-09-27</span>
                </div>

                <header className="dc-hero">
                    <div className="dc-kicker">Cinematic editorial portfolio · Spec sheet</div>
                    <h1>AI Solution<br />Developer<span style={{ color: t.colors.muted }}>.</span></h1>
                    <p className="dc-lede">{designRead.oneLiner}</p>
                    <p className="dc-lede" style={{ marginTop: 8 }}>Bespoke base under G13 custom_approval: {baseSystem.custom_approval.slice(0, 118)}...</p>
                </header>

                <div className="dc-dials" aria-label="Design dials and system">
                    <DialTile label="DESIGN_VARIANCE" value={dials.DESIGN_VARIANCE} />
                    <DialTile label="MOTION_INTENSITY" value={dials.MOTION_INTENSITY} />
                    <DialTile label="VISUAL_DENSITY" value={dials.VISUAL_DENSITY} />
                    <DialTile label="SYSTEM" value={<span style={{ fontSize: 12, lineHeight: 1.4, display: "block" }}>{designSystemChoice.selected}</span>} />
                </div>

                <Section title="Interface sample: nav + showcase 01" note="Sticky nav compact state (blur 12px, pill, hairline) over the pinned browser-preview treatment. Index numeral and mono tech line carry the editorial grid.">
                    <div className="dc-navspec"><b>Lito016</b><span style={{ marginLeft: "auto" }}>Work<span>About</span><span>Contact</span></span></div>
                    <div className="dc-frame">
                        <div className="dc-frame-bar"><i /><i /><i /></div>
                        <div className="dc-frame-body">
                            <div className="dc-showcase">
                                <div>
                                    <div aria-hidden="true" className="dc-index">01</div>
                                    <div className="dc-index-label">Showcase 01</div>
                                </div>
                                <div>
                                    <h3>Quill MCP</h3>
                                    <p>Model Context Protocol server that gives AI assistants persistent, structured memory over a markdown notes vault.</p>
                                    <span className="dc-tech">TypeScript · MCP · BM25 Retrieval</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                <Section title="Interface sample: Contact inversion (REQ-14)" note="The single tonal inversion closes the arc; hierarchy parity holds: same accent family pops on both grounds.">
                    <div className="dc-inverse">
                        <h3>LET&apos;S BUILD<br />SOMETHING.</h3>
                        <a href="#contact">Email</a><a href="#contact">LinkedIn</a><a href="#contact">GitHub</a>
                        <div><span className="dc-cta">Start a conversation</span></div>
                    </div>
                </Section>

                <Section title="Palette" note="One hue family, two roles: deep blue for text affordances (6.07:1 measured), graphic blue for large marks (4.28:1, non-text/large only). Ratios computed with the WCAG relative-luminance formula.">
                    <div className="dc-swatches">
                        {Object.entries(t.colors).map(([name, value]) => <Swatch key={name} name={name} value={value as string} />)}
                        <Swatch name="spark (dot only)" value={t.spark.dot} />
                    </div>
                    <h3 style={{ fontSize: 15, fontWeight: 500, margin: "28px 0 4px" }}>Inverse scheme parity</h3>
                    <div className="dc-dark">
                        <div className="dc-swatches">
                            {Object.entries(t.colorsDark).map(([name, value]) => <Swatch key={name} name={name} value={value} />)}
                        </div>
                    </div>
                </Section>

                <Section title="Type scale" note="Geist/Geist Mono self-hosted via next/font (no Google Fonts link, no Inter identity). Weights 400-500: size carries hierarchy. Hero clamp keeps FR-04 bounds at 1440 (129.6px) and 375 (60px floor + recompose).">
                    {Object.entries(t.typography.typeScale).map(([step, spec]) => (
                        <div key={step} className="dc-spec-row">
                            <span style={{ ...mono, fontSize: 11, color: t.colors.mutedForeground }}>{step}</span>
                            <span style={{ fontSize: step.startsWith("display") ? "clamp(28px, 5vw, 58px)" : step.startsWith("section") ? "clamp(24px, 4vw, 42px)" : step.startsWith("showcase") ? "clamp(22px, 3vw, 32px)" : step.startsWith("title") ? 22 : step.startsWith("body") ? (step === "bodyLarge" ? 18 : step === "bodyMedium" ? 16 : 14) : 12, fontFamily: step.startsWith("label") ? t.typography.numericFamily : t.typography.displayFamily, fontWeight: step.startsWith("label") ? 500 : 400, letterSpacing: step.startsWith("display") ? "-.035em" : step.startsWith("label") ? ".1em" : "-.01em", lineHeight: 1 }}>{step.startsWith("label") ? "MANOLITO ALMADEN JR." : "Manolito Almaden Jr. 0123456789"}</span>
                            <span style={{ ...mono, fontSize: 11, color: t.colors.mutedForeground }}>{spec}</span>
                        </div>
                    ))}
                </Section>

                <Section title="Spacing & grid" note="4px unit, 11-step scale, 12-col asymmetric editorial grid, section rhythm 96-192px, gutter clamp(20px, 4vw, 64px). Bands: compact base CSS; min-width queries add layout at 768/1024 (425/1440 tuning marks).">
                    {t.spacing.scale.map((s) => (
                        <div key={s} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                            <div className="dc-spacing-bar" style={{ width: s }} />
                            <span style={{ ...mono, fontSize: 11, color: t.colors.mutedForeground }}>{s}</span>
                        </div>
                    ))}
                </Section>

                <Section title="Shape & elevation" note="Radius lock: square hairline frames, 8px media, pills only for interactive CTAs. Shadows appear twice in the whole product: elevation1 surfaces and the browser-preview frame; everything else is border-colored hierarchy.">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(12rem, 1fr))", gap: 12 }}>
                        <div style={{ border: `1px solid ${t.colors.border}`, padding: 14, ...mono, fontSize: 12 }}>radius 0 / 8 / pill, locked</div>
                        <div style={{ border: `1px solid ${t.colors.border}`, padding: 14, boxShadow: t.shadows.focusRing, fontSize: 12, borderRadius: 8 }}>focus ring: 3px --accent-deep</div>
                        <div style={{ border: `1px solid ${t.colors.border}`, padding: 14, boxShadow: t.shadows.elevation2, fontSize: 12, borderRadius: 8 }}>elevation2: preview frames only</div>
                    </div>
                </Section>

                <Section title="Motion" note="Numeric budgets from the 45-row motion standard + NFR-04. One rAF owner (Lenis drives GSAP ticker, ADR-3.1). Pins: exactly 1 GSAP + 1 CSS sticky; none on coarse pointers.">
                    <div className="dc-scroll">
                        <table className="dc-motion-table">
                            <thead><tr><th>concern</th><th>budget</th><th>easing</th></tr></thead>
                            <tbody>
                                <tr><td>micro (hover, focus)</td><td>180-250ms, scale &lt;=1.03, shift &lt;=2px</td><td>cubic-bezier(0.165,0.84,0.44,1)</td></tr>
                                <tr><td>reveal (sections, lines)</td><td>600ms, y &lt;=24px, stagger &lt;=0.08s / &lt;=8 children</td><td>cubic-bezier(0.16,1,0.3,1)</td></tr>
                                <tr><td>hero sequence (once)</td><td>bg 400 / nav 150 / lines 700 / visual 900 / meta 300 / serial ceiling 2450ms (FR-03 &lt;=2.5s)</td><td>expoOut family</td></tr>
                                <tr><td>scrub (pinned showcase, image scale 1-&gt;1.025)</td><td>position-tied, transform-only, overflow-hidden wrappers</td><td>none</td></tr>
                                <tr><td>parallax</td><td>yPercent &lt;=15, decorative layers only, never text</td><td>linear scrub</td></tr>
                                <tr><td>reduced motion</td><td>no translate/scale/pin/loop; opacity-only fades &lt;=200ms kept (part-10 §8); static parity; anchors native</td><td>n/a</td></tr>
                            </tbody>
                        </table>
                    </div>
                </Section>

                <Section title="Accessibility contract" note="All pairs computed 2026-09-27 (WCAG relative luminance); Phase 6 re-measures renders. Meaning never by hue alone.">
                    {[
                        ["body ink on canvas", "17.63:1", "AAA"],
                        ["secondary ink on canvas", "8.82:1", "AAA"],
                        ["text link accent-deep", "6.07:1", "AA"],
                        ["CTA white on accent-deep", "6.39:1", "AA"],
                        ["graphic accent (large/non-text)", "4.28:1", ">=3:1 UI"],
                        ["inverse: type on ink", "17.63:1", "AAA"],
                        ["inverse: link on ink", "8.81:1", "AA"],
                        ["focus ring vs canvas", "6.07:1", ">=3:1 UI"],
                    ].map(([label, ratio, pass]) => (
                        <div key={label} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 12, padding: "6px 0", borderBottom: `1px solid ${t.colors.border}`, maxWidth: "30rem", fontSize: 13 }}>
                            <span>{label}</span>
                            <span style={{ ...mono }}>{ratio}</span>
                            <span style={{ ...mono, color: t.colors.mutedForeground }}>{pass}</span>
                        </div>
                    ))}
                </Section>

                <Section title="Responsive contract" note="Registry band vocabulary retained under the bespoke system; G32 Phase 5 check requires min-width queries at these boundaries.">
                    {Object.entries(responsiveContract).map(([band, spec]) => (
                        <div key={band} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 12, padding: "10px 0", borderBottom: `1px solid ${t.colors.border}`, fontSize: 13, maxWidth: "62ch" }}>
                            <span style={{ ...mono, color: t.colors.primary }}>{band}</span>
                            <span style={{ color: t.colors.mutedForeground, lineHeight: 1.55 }}>{spec}</span>
                        </div>
                    ))}
                </Section>

                <Section title="Requirement coverage" note="Every REQ id from docs/PRD.md appears here; the Phase 3 traceability oracle enforces it.">
                    {requirementTraceability.map((r) => (
                        <div key={r.requirement} style={{ display: "grid", gridTemplateColumns: "84px 1fr", gap: 12, padding: "6px 0", borderBottom: `1px solid ${t.colors.border}`, maxWidth: "56rem" }}>
                            <span style={{ ...mono, fontSize: 12 }}>{r.requirement}</span>
                            <span style={{ fontSize: 12, color: t.colors.mutedForeground }}>{r.acceptanceCriterion} ({r.components.join(", ")})</span>
                        </div>
                    ))}
                </Section>

                <Section title="Rejected defaults" note="The anti-slop audit: what the chain turned down, and why (§0.D, §9).">
                    <ul style={{ margin: 0, paddingLeft: 24, maxWidth: "65ch" }}>
                        {antiDefaults.map((a) => <li key={a} style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 4 }}>{a}</li>)}
                    </ul>
                </Section>

                <footer style={{ marginTop: 32, paddingTop: 12, borderTop: `1px solid ${t.colors.border}`, ...mono, fontSize: 11, color: t.colors.mutedForeground }}>
                    designLanguage: {designLanguage.designSystem}
                    <br />preflight: {preflight.reference} · architecture: {architecture.summary.slice(0, 140)}...
                </footer>
            </div>
        </div>
    );
}
