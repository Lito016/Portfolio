# Phase 3 Design — Quality Parts Evidence Brief

Source: `skills/frontend/references/design/quality-parts/` (index.json + parts 1–27, prime-method-35.1.4), read in full on 2026-09-27 (agent draft printed "2026-09-30"; corrected at quality-review finding 6).
Brief context: cinematic single-page editorial portfolio rebuild. Next.js 16 + React 19 + Tailwind v4 + Framer Motion (`motion/react`) + GSAP ScrollTrigger + Lenis. Warm off-white canvas, near-black oversized display type, hairline borders, restrained accent, pinned project showcases, cursor-reactive 2D canvas hero. Feeling of antigravity.google — patterns only, never assets. prefers-reduced-motion mandatory. Mobile-first, WCAG AA, static export, no `<link>` Google Fonts.

## Design Read (§0.B, Part 1)

"Reading this as: single-page editorial portfolio for hiring/collaboration audiences, with a cinematic warm-monochrome language, leaning toward a bespoke editorial/Kinetic-type aesthetic on native CSS + Tailwind v4 tokens (not an imported design system)."

Dials (Part 1 §1 presets: Portfolio-Designer 8/7/3; Part 2 §7 definitions): **DESIGN_VARIANCE 8, MOTION_INTENSITY 7–8, VISUAL_DENSITY 2–3.** Justification: variance 8 = asymmetric/fractional grids (2fr 1fr 1fr), but §7 mobile override forces strict single-column collapse below 768px. Motion 7–8 = scroll-triggered/pinned/hijack via GSAP skeletons (§5.A/§5.B); at >4 every claimed motion must actually ship (§5 "motion claimed = motion shown"). Density 2–3 = art-gallery `py-32`–`py-48` rhythm; editorial portfolio is not a cockpit. Never invent dial aliases.

§0.A six signals read from the brief: (1) page kind = portfolio/editorial single page; (2) audience = recruiters/clients, design-literate; (3) language = cinematic warm monochrome, oversized display type, hairlines; (4) reference = antigravity.google *feeling* (canvas interactivity, scale, motion rhythm), not its assets; (5) constraints = static export, no Google Fonts link tags, reduced-motion mandatory, WCAG AA; (6) tech = Next 16 / React 19 / Tailwind v4 / Motion / GSAP ScrollTrigger / Lenis.

§2.A real design systems available for reference: Material, Fluent, Carbon, Ant, Material Web, Beacon, Primer, Blueprint, Garden, Zora, Rainbow, Polaris, Atlassian, Chakra, Clack, Simple. NONE matches a cinematic editorial portfolio → correct call is a bespoke token system labeled honestly (§2.B: editorial / glass / bento / brutalism / kinetic-type = aesthetics, not systems; implement with native CSS + Tailwind; label it "custom editorial system, inspired by the feeling of antigravity.google").

## Part 1 — Anti-Slop Aesthetic: Taste Skill Core (§0–§6)

Applicable rules:
- §0.B Design Read declared above; §0.C max one clarifying question; §0.D banned defaults: AI-purple gradients, centered hero over dark mesh, three equal feature cards, glassmorphism-everywhere, infinite-loop micro-animations, Inter + slate-900.
- §2.B: editorial/kinetic-type/glass/bento/brutalism are aesthetics, not design systems — implement with native CSS + Tailwind and label honestly. No official web CSS for Apple Liquid Glass.
- §3.A: Tailwind v4 → `@tailwindcss/postcss` (NOT the tailwindcss plugin in postcss.config.js). Motion imports from `motion/react`. Fonts: ALWAYS next/font or self-hosted `@font-face` + `font-display: swap`; NEVER `<link>` Google Fonts in production — the platform constraint (static export, no link tags) is also the taste rule, no conflict.
- RSC safety: any component using Motion/scroll/pointer physics is an isolated `'use client'` leaf.
- §3.B: NEVER useState for continuous values (mouse position, scroll progress) — `useMotionValue`/`useTransform`/`useScroll`. Directly governs the cursor-reactive hero canvas.
- §3.C icons: priority @phosphor-icons/react, hugeicons-react, @radix-ui/react-icons, @tabler/icons-react; lucide-react discouraged; never hand-roll SVG icons; one family per project; global strokeWidth 1.5 or 2.0.
- §3.D emojis discouraged. §3.F verify package.json before importing anything.
- §3.E breakpoints sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536; container max-w-[1400px] or max-w-7xl; **NEVER h-screen for heroes → min-h-[100dvh]**; grid over flex-percentage math.
- §4.1 typography: display default `text-4xl md:text-6xl tracking-tighter leading-none`; body `text-base text-gray-600 leading-relaxed max-w-[65ch]`. Inter discouraged as default (allowed only if user asks neutral/Linear-style or accessibility-first — this brief does not). Serif as default very discouraged; banned defaults Fraunces, Instrument_Serif. If serif justified, pick from PP Editorial New / GT Sectra / Tiempos Headline / Recoleta / Cormorant / Playfair / EB Garamond. Pairings: Geist+Geist Mono, Satoshi+JetBrains Mono. EMPHASIS RULE: italic/bold of the SAME family, never inject a mixed-family word. ITALIC DESCENDER: `leading-[1.1]` minimum plus `pb-1`/`mb-1` reserve wherever italic y/g/j/p/q appear.
- §4.2: max 1 accent, saturation <80%; no AI-purple default; one palette per project, no warm/cool gray mixing; COLOR CONSISTENCY LOCK. Premium-consumer beige+brass+espresso palette BANNED (hex families #f5f1ea, #f7f5f1, #b08947, #1a1714); "pure monochrome + single saturated pop" is an approved alternative.
- §4.3 ANTI-CENTER BIAS at VARIANCE>4: split 50/50, left-content/right-asset, asymmetric, scroll-pinned. Centered hero permitted for editorial/manifesto pages — this page is editorial-adjacent, so a centered hero is legal only if headlines are the visual lead; prefer split/asymmetric for the pinned showcases.
- §4.4: cards only where real hierarchy exists; tinted shadows, never pure-black drop shadows; SHAPE CONSISTENCY LOCK — one radius system (all-sharp 0 suits the hairline editorial language; mixed radius needs a documented rule).
- §4.5 full state cycles: skeleton loaders not spinners; empty + error states; `:active` `-translate-y-[1px]` or `scale-[0.98]`. BUTTON CONTRAST CHECK: AA 4.5:1 body, 3:1 large (18px+). CTA WRAP BAN: primary labels ≤3 words, one line desktop. NO DUPLICATE CTA INTENT: one label per intent across nav/hero/footer. FORM CONTRAST CHECK.
- §4.6: label above input, `gap-2`, error below, no placeholder-as-label.
- §4.7 hard hero/section rules: hero fits viewport (headline ≤2 lines; subtext ≤20 words and ≤3–4 lines; CTA visible without scroll); hero scale `text-4xl md:text-5xl lg:text-6xl` default, `text-6xl md:text-7xl` only for 3–5-word headlines; HERO TOP PADDING CAP pt-24; HERO STACK max 4 text elements (eyebrow OR brand strip, headline, subtext, CTAs) — banned: tagline below CTAs, trust micro-strip, pricing teaser. Logo wall UNDER hero, never in it. Nav one line desktop, height cap 80px (default 64–72px). Bento rhythm + exact cell count (N items → N cells). SECTION-LAYOUT-REPETITION BAN: one layout family ≤1× per page; 8 sections → ≥4 different families. ZIGZAG ALTERNATION CAP: max 2 consecutive image+text splits. EYEBROW RESTRAINT: max 1 per 3 sections; mechanical fail if `uppercase tracking` count > ceil(sections/3). SPLIT-HEADER BAN: big headline left + small explainer right. BENTO BACKGROUND DIVERSITY: 2–3 cells with real image/gradient/pattern. Explicit <768px collapse per section.
- §4.8 images: generation tool first → picsum seed → labeled TODO placeholder; even minimalist sites need 2–3 real images; div-based fake screenshots BANNED; hero needs a real visual (canvas hero counts as the real visual — do NOT fake a browser-chrome UI in it); logo walls need real SVG logos (Simple Icons/devicon), LOGO-ONLY rule — no category labels.
- §4.9 density: headline ≤8 words, sub ≤25 words, one asset/CTA per section; no data-dump sections; long lists need alt UI (2-col, cards, tabs, scroll-snap pills, carousel, marquee); spec-sheet row-hairline pattern banned; COPY SELF-AUDIT (no broken grammar, no AI-hallucinated strings); no fake-precise numbers; one copy register per page.
- §4.10 quotes ≤3 lines, no em-dashes in quotes, real typographic quotes. §4.11 PAGE THEME LOCK: one theme; sections don't invert (one deliberate full switch allowed — e.g. a single dark showcase band if fully intentional).
- §5 proactivity: glassmorphism extras only if used (1px inner `border-white/10` + inset highlight, prefers-reduced-transparency fallback); magnetic physics only when MOTION>5 and premium/playful — `useMotionValue` only. MOTION MUST BE MOTIVATED: justify each animation in one sentence (hierarchy / storytelling / feedback / state-transition). MARQUEE MAX-ONE-PER-PAGE.
- §5.A Sticky-Stack skeleton (canonical for pinned showcases): `'use client'`; `gsap.registerPlugin(ScrollTrigger)`; `useReducedMotion` guard; trigger `start: "top top"`, `pin: true`, `pinSpacing: false`; endTrigger = last card with `end: "top top"`; scale to 0.92 / opacity 0.55 scrubbed by the NEXT card's trigger (`start: "top bottom"`, `end: "top top"`); `gsap.context` + `ctx.revert()` cleanup; cards `sticky top-0 min-h-[100dvh]`.
- §5.B Horizontal-Pan skeleton (alt for project gallery): distance = `track.scrollWidth - window.innerWidth`; `x: -distance`, `ease: "none"`; trigger wrap `start: "top top"`, `end: () => \`+=${distance}\``, `pin: true`, `scrub: 1`, `invalidateOnRefresh: true`; track `flex h-[100dvh]` (use 100dvh variant per §3.E).
- §5.C RevealStagger: `motion.li` initial `{opacity:0, y:24}` whileInView `viewport={{once:true, amount:0.3}}` duration 0.6, delay `i*0.06`, ease `[0.16, 1, 0.3, 1]`. Prefer this over GSAP for simple reveals.
- §5.D HARD BANS: `window.addEventListener("scroll")`, `window.scrollY` in React state, rAF loops touching state. `layout`/`layoutId` only for visible state changes. staggerChildren parent+children in same client tree.
- §6: animate only transform/opacity; will-change sparingly. MOTION>3 requires prefers-reduced-motion handling (`useReducedMotion` → degrade to static; loops/parallax/hijack/magnetic collapse to static). §6.C dark mode mandatory for consumer pages — see conflict note. §6.D LCP<2.5s, INP<200ms, CLS<0.1. §6.E grain/noise ONLY on a fixed `pointer-events-none` pseudo-element (`fixed inset-0 z-[60]`), never on scrolling containers — governs the film-grain aesthetic. §6.F z-index restraint: never z-50 spam; systemic layers only; document the scale in a constants file.

Canonical skeletons to copy structurally (from §5.A/§5.B/§5.C; adapt, do not improvise from scratch):

```tsx
// Sticky-Stack leaf (Part 1 §5.A) — pinned project showcases
"use client";
gsap.registerPlugin(ScrollTrigger);
const reduce = useReducedMotion();
useEffect(() => {
  if (reduce) return;
  const ctx = gsap.context(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        gsap.to(card, {
          scale: 0.92, opacity: 0.55, ease: "none",
          scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: "top top", scrub: true },
        });
      }
    });
    ScrollTrigger.create({
      trigger: ".stack-wrap", start: "top top", pin: true, pinSpacing: false,
      endTrigger: cards[cards.length - 1], end: "top top",
    });
  });
  return () => ctx.revert();
}, [reduce]);
// cards: sticky top-0 min-h-[100dvh]
```

```tsx
// Horizontal-Pan leaf (Part 1 §5.B) — alt project gallery
const distance = track.scrollWidth - window.innerWidth;
gsap.to(track, {
  x: -distance, ease: "none",
  scrollTrigger: {
    trigger: wrap, start: "top top",
    end: () => `+=${track.scrollWidth - window.innerWidth}`,
    pin: true, scrub: 1, invalidateOnRefresh: true,
  },
});
// track: flex h-[100dvh]
```

```tsx
// RevealStagger (Part 1 §5.C) — preferred for simple lists over GSAP
<motion.li
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
/>
```

Selector conflicts: none directly here except that the selector's typography output is overridden (see Part 4).

## Part 2 — Taste Skill Protocols (§7–§13)

Applicable rules:
- §7 dial ladder, full reading: VARIANCE 1–3 symmetric grids and centered compositions; 4–7 overlaps, mixed aspect ratios, broken grid; 8–10 masonry, fractional grid (`grid-template-columns: 2fr 1fr 1fr`), off-axis whitespace (`padding-left: 20vw`). MOBILE OVERRIDE: at levels 4–10 every asymmetric layout MUST collapse to strict single-column below 768px — `w-full`, `px-4`, `py-8`, no residual two-column hacks. MOTION 1–3 static; 4–7 fluid micro-interactions on transform+opacity, canonical curve `transition: 0.3s cubic-bezier(0.16, 1, 0.3, 1)` (specify props, do not ship `transition: all`); 8–10 scroll-triggered choreography, parallax, scroll-driven animation via CSS `animation-timeline` or GSAP ScrollTrigger; window scroll listener = HARD BAN at every level. DENSITY 1–3 art gallery: `py-32`–`py-48` section padding, huge empty margins as composition; 4–7 standard SaaS `py-16`–`py-24`; 8–10 cockpit: 1px hairline dividers everywhere + `font-mono` numerics, dense tables. Our density 2–3 → gallery band, hairlines only structurally.
- §8 DARK MODE PROTOCOL: dual-mode by default; "never assume light-only unless the brief is print-emulating editorial." This brief IS editorial cinematic — light-lock is the documented exception (§8.A: pick ONE token strategy — Tailwind `dark:` variant OR CSS vars; here: CSS-var semantic tokens so a dark variant can be retrofitted). §8.B: no prescribed colors but WCAG AA body / AAA-target hero copy; hierarchy parity; brand fidelity; **NO pure #000000 / #ffffff — off-black/off-white**. #18181B + #FAFAFA complies. §8.D: test both modes — reduced here to verifying tokenized colors survive an inverted-token test.
- §9 AI tells: 9.A no neon/outer glows, no pure black, no oversaturated accents, no excessive gradient text, **NO custom mouse cursors** (outdated, accessibility-hostile, perf-hostile). 9.B avoid Inter default; no oversized screaming H1 with no support — hierarchy via weight+color. 9.C no 3-column equal feature cards. 9.D no generic names/avatars, no fake-perfect numbers (use organic 47.2%), no "Acme", no filler verbs (Elevate, Seamless, Unleash, Next-Gen, Revolutionize). 9.E no hand-rolled SVG icons, no div fake screenshots, no broken Unsplash (picsum seed ok), shadcn never in default state.
- §9.F PRODUCTION-TEST TELLS (all bind the copy deck): no version labels in hero (V0.6/BETA); no "Brand · No.01" sub-eyebrows; NO section-number eyebrows (00/INDEX, 001 · Capabilities, 06 · how it works); no `01 / 4` pagination on tiles; no "Scroll · 001" cues; no "Index of Work, 2018 - 2026" range labels; middle-dot `·` rationed max 1 per line; no decorative colored status dots; no em-dash anywhere; no `<br>`-broken italicized headline tricks; NO vertical rotated text; NO crosshair/hairline grid lines as decoration — hairlines allowed only when they organize real content (our design language is hairline borders → they must be structural dividers/borders, never floating ornament); no div fake product UI in hero; no fake version footers; no "Quietly in use at"; no "Field notes"/"From the field" poetic labels; no weather/locale strips; no micro-meta sentences under eyebrows; no generic step labels (Stage 1/Phase 01); no pills/labels overlaid on images; no decorative photo-credit captions; no live-stock counters; NO decoration text strip at hero bottom (BRAND. MOTION. SPATIAL. cliché); no floating top-right sub-text in section headings; no `border-t`+`border-b` on every row of long tables; no filled-track progress bars as comparisons; SCROLL CUES BANNED ("Scroll", ↓, animated wheel icons); zero decorative dots.
- §9.G EM-DASH BAN (non-negotiable, binary): zero `—`, no `–` as separators, anywhere — headlines, eyebrows, pills, body, quotes, captions, buttons, alt. Only hyphen `-` allowed. A single em-dash = pre-flight fail.
- §10 vocabulary + library choice: hero paradigms (Asymmetric Split, Editorial Manifesto, video mask, Kinetic-Type, Curtain-Reveal, Scroll-Pinned); layout (Bento, Masonry, Sticky-Stack Sections, Split-Screen Scroll); scroll anims (Sticky Scroll Stack, Horizontal Scroll Hijack, Locomotive/Sequence, Zoom Parallax); gallery (Coverflow, Drag-to-Pan, Accordion Image Slider, Hover Image Trail); typographic (Kinetic Marquee, Text Mask Reveal, Text Scramble, Kinetic Typography Grid — cursor-reactive type is a named, sanctioned pattern). Libraries: Motion = default UI/Bento/state motion; GSAP+ScrollTrigger = full-page scrolltelling/hijacks isolated in leaf components with useEffect cleanup; WebGL/canvas same isolation rule. **NEVER mix GSAP/Three.js with Motion in the same component tree** — they fight over frames. This brief uses both → enforce separate trees (GSAP leaves for pinned showcases; Motion for UI reveals).
- §13 OUT OF SCOPE: dashboards, data tables, multi-step wizards, code editors, native mobile, realtime collab. A portfolio IS in scope.

Selector conflicts: "Motion-Driven" style is compatible, but §9.A means the cursor-reactive hero must keep the native cursor visible and let the canvas react behind it — no cursor replacement. "Portfolio Grid" pattern must pass §9.C (no equal 3-col card grid monotony) and §4.7 repetition ban → pinned showcases replace a monotone grid.

## Part 3 — Taste Skill Appendices (§14 + appendices)

Applicable rules:
- §14 is the FINAL PRE-FLIGHT CHECK — reproduced in full as `## §14 Pre-flight checklist` at the end of this document. Treat it as the Phase 3→4 gate: "If a single checkbox cannot be honestly ticked, the page is not done."
- Appendix A install commands: n/a (host is Qoder, npm standard). Appendix B: canonical doc links (taste-skill upstream). Appendix C Apple Liquid Glass honest web approximation (`backdrop-filter: blur(24px) saturate(180%)`, inset highlight borders, `prefers-reduced-transparency` fallback, uneven browser support) — marginal relevance; use only if a frost panel appears, and note the support caveat.

## Part 4 — Design System Intelligence (UI UX Pro Max workflow)

Applicable rules:
- Workflow: Step 1 analyze brief → Step 2 `scripts/ui-ux-pro-max/search.py --design-system` REQUIRED (pattern/style/colors/typography/effects + anti-patterns) → Step 2b `--persist` MASTER.md + per-page overrides (hierarchical retrieval: page file overrides master) → Step 2c design dials `--variance/--motion/--density` 1–10 map onto the same taste dials (density sets `--space-*`: low 24–96px, mid 16–64px, high 8–32px) → Step 3 domain searches (style/color/typography/landing/ux/gsap/react/web/prompt) → Step 4 stack.
- Pre-delivery checklist: run `--domain ux "animation accessibility z-index loading"`; test 375px + landscape; verify with reduced-motion enabled; dark-mode contrast verified independently; touch targets ≥44pt.
- Icon discipline: default Phosphor `@phosphor-icons/react`, Heroicons `@heroicons/react` as fallback; vector-only; tokenized icon sizes (24pt default, 20px mobile/24px desktop); stroke consistency 1.5 or 2px; one filled-vs-outline discipline per level; min targets 44×44pt; icon contrast 4.5:1 small / 3:1 large glyphs.
- Micro timings: tap feedback 80–150ms; micro-interactions 150–300ms; 4/8dp spacing rhythm; section rhythm tiers 16/24/32/48; modal scrim 40–60% black; text contrast ≥4.5:1 both modes; secondary ≥3:1.

Selector conflicts (explicit):
1. Selector typography = Inter/Inter. The taste parts (§4.1, §9.B, Part 15 NEVER-list) override Inter-as-default. Resolution: non-Inter intentional display face (Geist/Satoshi-class sans or a justified serif from the §4.1 pool), delivered via next/font/self-host, never `<link>`.
2. Selector typography domain recommends Google Fonts pairings. Platform + taste rule overrides: static export, no `<link>` — next/font local packaging only; skip the `preconnect fonts.googleapis.com` checklist item entirely.
3. Selector accent #2563EB (Tailwind blue-600) on #FAFAFA. Part 8 flags "blue-500 on white" as AI-slop; §4.2 caps saturation <80% and demands brand justification. Resolution: desaturate/shift the accent toward the warm-monochrome canvas (a deeper, muted blue, or an unexpected hue), lock one accent page-wide (COLOR CONSISTENCY LOCK), verify button contrast 4.5:1 body / 3:1 large before locking.
4. Selector pattern "Portfolio Grid" — constrained by §4.7 (section-family repetition, zigzag cap, exact bento cell counts). Use grid as a fallback, not the default.
5. Selector monochrome palette #18181B/#FAFAFA — compatible with §8.B (off-black/off-white, no pure #000/#fff) and matches the approved "pure monochrome + single saturated pop" alternative.

## Part 5 — Impeccable Audit Protocol (v4.1.1)

Applicable: mode = **Experience** ("Portfolios, galleries. Let the artifact lead from the first viewport; the interface recedes") — this is our page's canonical mode. Brief wins: honor the pinned cinematic aesthetics over saturated-pattern warnings; "the agent must follow the committed world." Refinement preserves vs redesign replaces (greenfield → redesign semantics). Bounded verification: "inspect once with a batched round (desktop and mobile together)… fix everything it shows in one batch, confirm with at most one more round, stop polishing." Command inventory (polish, audit, critique, bolder, quieter, animate, distill…) exists; craft-floor loads right before editing UI. Not for backend-only.

## Part 6 — Design Extraction (Playwright+snapcheck)

Applicable: 6-phase scrape with brand pre-check; PRIME integration; spec structure (tokens/typography/spacing/shadows/backgrounds/animations/canvas/dark-mode/responsive). Binding rules: dismiss overlays before capture; CSS custom properties are source of truth; capture animated backgrounds at multiple scroll positions. **Respect target site terms: extract design patterns, never copyrighted content — NEVER copy text, images or brand assets.** For antigravity.google: reference depth for the *feeling* only (motion rhythm, canvas interactivity, oversized scale); any token reuse must be original/remixed and the inspiration labeled honestly in docs.

## Part 7 — Design QA Protocol

Applicable (Phase 3/4 gate): evidence hierarchy — DESIGN.md/tokens > approved Figma > automation JSON > screenshots/diffs > source code > human feedback > labeled inference; "never claim design approval from visual intuition alone." 8 review criteria: Contract, Visual, Alignment, Components, Responsive, States (default/hover/focus-visible/active/disabled/loading/empty/error), Accessibility (incl. reduced-motion user), Debt. Required fidelity surfaces: typography, spacing/layout, colors/tokens, image fidelity ("were real assets replaced with CSS/SVG approximations?"), copy. Severities: blocker/major/minor/debt/info/needs-design-decision. Autopilot = full design QA + automated reports (current quality mode).

## Part 8 — Design System Complete Guide (PRIME Phase 3 process)

Applicable: invoke taste-skill BEFORE design output; Design Read informs wireframe/color/type/component styling. Brand DESIGN.md library for reference aesthetics (creative/portfolio → airbnb/framer/raycast). ANTI-AI-SLOP CHECKLIST: no card-grid default; intentional hierarchy; asymmetric whitespace; sections differ; not default sans (intentional display+body pairing); type-scale rhythm; **not blue-500 on white — palette with personality**; purposeful gradients; consistent icons; real images; motion has meaning; hover states exist; skeleton loading; "would a designer approve?" test.
Process artifacts: docs/DESIGN.md + design-preview.html + verification screenshots + snapcheck report + image-understanding quality score ≥7/10. Steps 0–14.
Token categories: colors / spacing (text.3xl=40px etc.) / radius / shadows / icon sizes / z-index layers (z.dropdown, z.modal, z.toast — feeds §6.F constants file) / component heights (button md 40px visual, 44px hit) / focus ring 2px solid brand-500.
WCAG: text 4.5:1, large 3:1, UI 3:1, focus 3:1; document each pair; color never the only indicator. Typography minimums: mobile body 16px (iOS zoom), table 13px, labels 14px, helper 12px.
Motion tokens: instant 100ms, fast 200ms (hover/focus/toggle), normal 300ms (dialog/drawer/toast), slow 500ms (page transitions); easing default cubic-bezier(0.4,0,0.2,1), enter (0,0,0.2,1), exit (0.4,0,1,1). **Max 3 "delight" animations visible at once.** Reduced motion disables all (see Part 10 refinement).
Component stack: shadcn/ui foundation + Aceternity/Magic UI/Motion Primitives enhancements ("Animation-heavy: shadcn + Magic UI + Motion Primitives"). Completion gate list before SPEC.

## Part 9 — Dashboard UI References

Not relevant per §13 (portfolio, not dashboard). Leftovers that hold: Modern Stack 2025–2026 confirmation (Next.js/React 19/Tailwind v4/Framer Motion); mobile-first + 44px targets; never copy repo code.

## Part 10 — Animation Craft Standard (Emil Kowalski + Apple WWDC)

The 4 decision gates govern every animation on this page:
- Gate 1 frequency: 100+/day actions → NO animation ever; tens/day → reduce; occasional modals → standard; rare → delight allowed; NEVER animate keyboard-initiated actions. A one-visit portfolio page = rare context → scrolltelling delight is permitted.
- Gate 2 purposes: feedback / spatial consistency / state indication / prevent jarring / explanation / delight (rare only). Each hero canvas + pinned section must name its purpose (feeds §5 motivated-motion audit).
- Gate 3 easing: entering/exiting → ease-out; morphing → ease-in-out; hover/color → ease; constant scroll-pan → linear (`ease:"none"` in ScrollTrigger). **Custom curves required: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`, `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`, `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)`. NEVER ease-in for UI.** Don't invent curves beyond these (easing.dev, easings.co).
- Gate 4 durations: button press 100–160ms; tooltips 125–200ms; dropdowns 150–250ms; modals 200–500ms; **UI <300ms rule; marketing/explanatory (our pinned scrolltelling) may be longer.**
- Springs: use for drag/momentum/interruptible/decorative mouse motion. Apple-style `{type:"spring", duration:0.5, bounce:0.2}` preferred, or mass/stiffness/damping; bounce kept 0.1–0.3. Apple table: move damping 1.0/response 0.4; rotation 0.8/0.4; drawer 0.8/0.3; default critically damped 1.0, bounce only after momentum. **`useSpring(value, {stiffness:100, damping:10})` for mouse-follow — interpolate from it; never tie visuals to raw pointer position.** Direct spec for the cursor-reactive hero.

Token block to ship in `lib/motion-tokens.ts` / global CSS (Gate 3 + springs):

```css
:root {
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);       /* entries, releases */
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);   /* morphs, reposition */
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);    /* sheets, drawers */
  /* NEVER ease-in for UI. Do not invent other curves. */
}
```

```tsx
// Cursor-reactive hero pointer interpolation (NOT raw position):
const mx = useSpring(rawX, { stiffness: 100, damping: 10 });
const my = useSpring(rawY, { stiffness: 100, damping: 10 });
// Hero CTA / magnetic button:
<motion.button whileTap={{ scale: 0.97 }}
  transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}>
```

- Component patterns: button `:active` scale(0.97), 160ms ease-out (range 0.95–0.98); NEVER animate from scale(0) — start 0.9+ with opacity; origin-aware popovers (modals exempt, transform-origin center); tooltips instant after first (`[data-instant]` 0ms); CSS transitions > keyframes for interruptibility; blur ≤20px used only to mask transitions; `@starting-style` for enters; asymmetric timing (press/hold slow, release ~200ms ease-out); stagger 30–80ms between items, never block interaction.
- Transforms: translateY % of own size; **clip-path inset() is the sanctioned 4th animated property — image reveals on scroll `inset(0 0 100% 0)` → `inset(0 0 0 0)`** (canonical for project image reveals here); also hold-to-delete, comparison sliders, tab color transitions. preserve-3d for orbits.
- Gestures/physics: velocity = distance/elapsed; dismiss flick threshold >0.11; Apple velocity handoff `relativeVelocity = gestureVelocity/(targetValue - currentValue)`; momentum projection `project(v, decelerationRate=0.998)` = `(v/1000)*dr/(1-dr)`; rubberband(overshoot, dimension, constant=0.55); setPointerCapture; ignore extra touches. Relevant if Drag-to-Pan gallery is used.
- Apple principles: respond on pointer-down; continuous feedback; 1:1 tracking; **interruptibility most important — never lock input; animate from presentation value; springs for gestures; blend velocity; decompose X/Y springs**; spatial consistency (enter/exit same path, anchor to source, mirror easing); materials — never stack light translucent on translucent; dim-to-focus (scrim) vs separate-to-keep-flow; typography optical — size-specific tracking (display negative, small positive), line-height inverse to size, hierarchy via weight+size+leading set together, rem/em not px. Example: `.display { font-size: clamp(2rem, 5vw, 4rem); line-height: 1.05; letter-spacing: -0.02em; font-optical-sizing: auto; }`.
- Perf: animate only transform+opacity (+clip-path; height tolerated only for accordions); CSS var on a parent recalcs children — set transform directly; **Framer Motion x/y/scale shorthands are NOT hardware-accelerated (rAF main thread) — write full transform strings under load**; CSS animations beat JS during load; WAAPI `element.animate` with cubic-bezier(0.77,0,0.175,1) as the native option.
- Accessibility: reduced motion = fewer/gentler, keep opacity+color transitions, remove movement/position (nuance over blanket disable); gate hover effects with `@media (hover: hover) and (pointer: fine)`; prefers-reduced-transparency → frostier/solid; prefers-contrast: more → near-solid. **AVOID full-viewport moving backgrounds and slow looping oscillations (~0.2 Hz)** — CRITICAL: the canvas hero must be pointer-driven and idle-pausing, never an autonomous loop; make large moving objects semi-transparent in flight.
- Tool ladder: CSS transition → @starting-style → CSS animation → WAAPI → Motion (springs/gestures/exit) → GSAP (scrolltelling only). Review checklist: transition:all → specify props; scale(0)→0.95; ease-in→ease-out; popover origin; keyboard anims removed; >300ms reduced; hover media query; exit faster than enter; stagger; reduced-motion; no width/height/margin animation; direct transform; :active scale 0.97. Debug: 2–5x slow-mo, DevTools Animations panel, real device.

Conflicts: "deliberate 700ms" (Parts 8/14) vs "UI <300ms" — resolve: <300ms applies to functional UI; scrolltelling/marketing is the sanctioned longer class. "Reduced motion disables all" vs "gentler not zero" — Part 10 refines: keep opacity/color fades, remove movement; loops/parallax/pins fully collapse to static.

## Part 11 — UX Principles & Platforms

Applicable: NN/g heuristics (feedback <100ms; operations <1s). Laws: Fitts min 44×44 touch / 24×24 pointer; Hick 7±2 nav items max (nav ≤5 links + CTA); Miller 3–5 chunking; Doherty 400ms (skeletons > spinners); **Von Restorff — one accent, don't make everything pop (backs §4.2 accent lock)**; Zeigarnik/goal-gradient; **Peak-End: make the ending smooth — shapes the footer/contact close as the page's deliberate finale**; Proximity grouping without borders (hairline-free grouping where possible); Gestalt common region — avoid over-boxing (cards only for real hierarchy, §4.4).
Material: elevation 0/1/3/6/8/12dp; shared-axis / fade-through / container-transform motions. Apple HIG: Clarity/Deference/Depth; 8 principles incl. Craft ("every value deliberate") and Delight-as-result; 44pt targets; rem/em. GOV.UK forms: label = question, inline errors below field, error summary top with links, never placeholder-only (governs contact form); plain language; skip links; 3px focus ring, 2px offset.
Anti-patterns: mystery-meat nav, homepage carousels (users rarely pass slide 1 — if testimonials exist, not a carousel), confirmation-everything, hamburger as primary desktop nav, modal stacking, skeleton flash <500ms, infinite scroll, dark patterns, error codes. Decision priority: user need → accessible → conventions → feedback → undo → simple → feel.

## Parts 12 + 26 — Index Files

Routing only: 12 → parts 18–21 (engineering standard); 26 → template index routing to 13–17. No independent rules.

## Part 13 — Design System Foundations (numeric baseline)

The concrete token layer for DESIGN.md:
- Breakpoints: mobile 320–767 / tablet 768–1023 / desktop 1024–1279 / wide 1280–1535 / ultra 1536+, content capped 1440.

| Device | Columns | Gutter | Margin |
|---|---|---|---|
| Mobile | 4 | 16px | 16px |
| Tablet | 8 | 24px | 32px |
| Desktop | 12 | 24px | 48px |
| Wide | 12 | 32px | max(48px, (100vw-1280px)/2) |

- Spacing scale --space-1..10: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 48 / 64 / 96px; fluid member example `clamp(16px, 2vw + 8px, 24px)`. Mapping: inline icon gaps use --space-1/2; component internals --space-3/4; section internals --space-5/6; between sections --space-8/9/10 (density 2–3 → top of band; gallery py-32/py-48 = 128/192px tailwind, beyond the token scale, sanctioned by §7).
- Type scale (mobile→desktop): --text-xs 12 / sm 14 / base 16 / lg 18→20 / xl 20→24 / 2xl 24→30 / 3xl 30→40 / **4xl 36→52 `clamp(2.25rem, 3.5vw + 0.5rem, 3.25rem)` / 5xl 48→72 `clamp(3rem, 5vw + 0.5rem, 4.5rem)` (display)**. Oversized display type on this page = fluid 4xl/5xl roles, never raw px.
- Line heights: display 1.05–1.15; headings 1.15–1.25; body 1.5–1.65; captions 1.3–1.4. Letter spacing: display -0.02 to -0.03em; headings -0.01 to -0.02em; body 0; uppercase labels 0.05–0.08em (only if eyebrows are used at all — see §4.7 restraint).
- COLOR: **warm gray neutrals preferred (stone palette #fafaf9, #f5f5f4, #e7e5e4, #d6d3d1, #a8a29e, …, #1c1917, #0c0a09) — "avoids cold AI-slop grays."** Validates the warm off-white canvas; document warm-only, no cool-gray mixing (§4.2 lock). Semantic 3-layer tokens: primitives → semantic (--bg-primary, --bg-secondary, --text-primary, --text-secondary, --text-tertiary, --border-default, --border-subtle, --accent) → component (--button-radius 8px, --button-height-md 44px "meets 44px touch target", --card-radius 12px, --card-shadow 0 1px 3px rgba(0,0,0,.04), --input-radius 8px, focus ring `0 0 0 2px brand-100`-style, adjust to 3:1 against canvas).
- Touch targets: buttons 44×44 both; inputs 44 mobile / 40 desktop; icon buttons 44×44; nav links 44px vertical mobile / 32 desktop; checkbox 44 hit via ::before.

Conflict: this part's font-stack example uses display "Instrument Serif" — banned as a default by Part 1 §4.1 (Instrument_Serif/Fraunces named). Taste overrides; serif only if deliberately justified from the §4.1 pool, self-hosted.

## Part 14 — DS Components

Applicable: 4-layer stack — tokens → shadcn+Radix foundation → Motion Primitives → Aceternity/Magic UI. Button variants incl. Magnetic (spring physics, hero CTAs — allowed at MOTION>5 per §5) and Stateful; mobile buttons full-width in forms, min-h 44px, text-base (iOS zoom). Card variants (3D tilt, Spotlight, Glare, Focus blur-siblings, Wobble, Expandable, Comet) — frequency discipline per Part 15 caps; card responsive: mobile single-col NO hover, tablet 2-col hover with `@media(hover:hover)`, desktop 3-col/bento. Nav: hamburger→drawer / condensed / full. Adaptive modal snippet: mobile bottom sheet `bottom-0 top-auto rounded-t-2xl max-h-[85vh]` → `md:` centered `md:w-[600px]`. Data-table card-on-mobile pattern (n/a here). Motion CSS tokens: instant 100 / fast 200 / normal 300 / slow 500 / deliberate 700ms; ease-default (0.4,0,0.2,1), enter (0,0,0.2,1), exit (0.4,0,1,1), spring (0.34,1.56,0.64,1), bounce (0.68,-0.55,0.265,1.55); reduced-motion sets durations 0 (refined by Part 10: keep opacity/color fades). Brand consistency: radii fixed per component type (SHAPE LOCK §4.4); icon stroke 1.5px, 20px mobile / 24px desktop. Lucide named here — overridden by §3.C icon priority list.

## Part 15 — Visual Polish

NEVER list (directly binds the cinematic warm-monochrome look): generic purple-blue gradients on white; **Inter or Arial as display font**; rounded-xl everything with soft shadows on every card; identical section padding monotony; placeholder high-five illustrations; gradient text with sparkles; glassmorphism on every surface.
INSTEAD: intentional variance (alternate 8px tight vs 80px generous); typographic contrast (72px headlines beside 14px captions); purposeful motion; density by context — **marketing/portfolio pages generous: 32px gaps, 18px text; reading 24px line-height 65ch**; distinctive color — **warm stone neutrals + single saturated accent, or monochrome + one unexpected hue** (exactly our scheme); custom details (unique border treatments, asymmetric layouts, hairline treatments — hairlines must be structural per §9.F); texture over gradient (noise/grain on the §6.E fixed layer).
Motion budget: max 3 delight animations visible at once; **staggered lists 50ms delay, max 8 items animated**; page transitions ≤300ms; hover 150–200ms.
Aceternity frequency caps: Spotlight hero-only 1×/page; 3D Card max 3 cards 1 section; Moving Border primary CTA 1×/viewport; Sparkles rare/success only; Glare Card 1 section; Bento 1×/page. Magic UI: Animated Beam dividers; Border Gradient hover; Animated Counter stats (caution: live-stock counters banned §9.F — animate on reveal only, organic numbers); Marquee logo clouds (max one marquee per page §5); Shine button hover; Retro Grid bg low opacity (caution: decorative grid hairlines banned §9.F — skip).
Gradient recipes: ember stone-dark gradient fits a warm dark showcase band (the one allowed theme switch §4.11).
Micro-interaction durations: button press 150ms scale .97; card lift hover translateY(-4px)+shadow 200ms; focus ring 150ms; toggle 200ms; tabs 250ms; dropdown 200ms; toast 300ms; modal scale .95→1 200ms; **scroll-into-view section translateY(20px→0)+fade 400ms; number count 1000ms.**

## Part 16 — A11y & Performance

Contrast verification table (validate our pairs against it): body neutral-950/neutral-50 = 16.75:1 PASS; large text neutral-600/50 = 5.74:1; interactive brand-600/white = 4.56:1 (borderline — recheck the actual accent); focus brand-500/50 = 3.84:1; **disabled neutral-400 = 2.96:1 FAIL → use neutral-500**; error/white 4.63:1.
Keyboard: tab order logo→nav→main→footer; focus 2px solid ring, 2px offset, ≥3:1; skip link first focusable; Escape closes overlays and returns focus to trigger; arrow keys in composite widgets; Home/End in lists. Focus traps: modals/drawers yes, tooltips/popovers never. SR: aria-label + aria-hidden icons; `role="status" aria-live="polite"`; WAI-ARIA patterns; meaningful alt or `alt=""` decorative.
Reduced-motion hook `useReducedMotion`; alternatives table: page slide+fade→instant; modal scale→fade 100ms; card hover lift→border color change; scroll reveal translateY+fade→fade only; spinner→pulsing opacity; **background animated gradients/particles → STATIC gradient** — direct spec for the hero canvas reduced-motion fallback.
LCP<2.5s: hero `<img loading="eager" fetchpriority="high">` with srcset; **font-display: optional for display / swap for body**; inline critical CSS; SSG hero; AVIF+WebP. (Skip `preconnect fonts.googleapis.com` — we self-host, no CDN.)
CLS<0.1: width+height or aspect-ratio on every image; size-adjust for fonts; min-height for embeds; content-visibility:auto below fold; transform/opacity only.
INP<200ms: passive/debounced scroll; batch React state; chunk long tasks (requestIdleCallback/scheduler.yield); CSS animations GPU; Web Worker for heavy compute; <100ms tap feedback. Canvas hero render loop must not touch React state (§5.D).

## Part 17 — DS Implementation

Applicable Tailwind v4 `@theme` config shape: CSS-based config; colors; `--font-display/--font-heading/--font-body/--font-mono`; spacing extends (18/88); breakpoints; `--radius-card 12px / --radius-button 8px / --radius-input 8px / --radius-badge 9999px`; `--shadow-card / --shadow-card-hover / --shadow-elevated`; animate-in/out. shadcn init base color **Stone (warm neutral, avoids cold AI-slop)** — validates the canvas choice. File structure: components/ui, components/enhanced, components/motion, components/responsive, components/patterns + `lib/motion-tokens.ts`. Deps check: react ^19, tailwindcss ^4, cva, clsx, tailwind-merge, motion ^12, radix (ours Next 16 > template's 15 — §3.F: verify package.json before import; lucide-react listed → overridden by §3.C).
Testing checklist (15 items): axe-core touch/contrast; keyboard full path; focus ≥3:1; no traps; SR announcements; reduced-motion honored; prefers-color-scheme; LCP<2.5s on 3G; CLS<0.1; INP<200ms; verify 320/375/768/1024/1440; no horizontal scroll; font-display swap/optional; srcset images.

## Parts 18–21 — UI/UX Engineering Standard

Docs discipline (applied at spec level, condensed):
- 18: "Do not leave important UI decisions to arbitrary interpretation." Token categories (colors → focus rings → z-index layers → component heights → touch targets); naming `color.primary.500`, `spacing.1`; do not create unnecessary tokens; color rules (contrast, color-not-only-indicator, consistent semantics, no unverified "validated" claims); deterministic typography per role incl. mobile body; icon system — never emoji, same semantic action = same icon (Lucide "practical default" here → overridden by §3.C); component spec fields 1–10 (purpose/anatomy/variants/states/sizes/interaction/a11y/responsive/usage); button rules: one primary per form; destructive confirm; icon-only needs aria-label; hit ≥44px even when visual is smaller.
- 19: forms MUST label association + aria-describedby errors + semantic required + validation preserves data + mobile single-column (2-col only logically); data tables no shrinking desktop tables (n/a); responsive spec covers 13 elements per breakpoint, contradictions resolved deterministically; MUST/MUST NOT/SHOULD/MAY language; no unsupported a11y claims; UI states incl. offline/permission-denied; motion rules: subtle/functional, prefers-reduced-motion support, no animation blocking task completion, no novelty motion; page spec fields, "do not invent pages/features."
- 20: consistency audit list (contradictory sizes/breakpoints/button/mobile rules; duplicate component names; different colors for same semantic state; inconsistent routes/capitalization; a11y contradictions; visual-vs-responsive conflicts); contradiction resolution order (dominant direction → simplest consistent rule → preserve valid requirements → don't invent); spec quality: professional, deterministic, scannable; Final Spec Test — "if important questions still have no answer, the specification is not finished."
- 21: List/Detail/Create flow patterns are product-UI oriented — portfolio runs Experience mode (Part 5) instead. UI-vs-business behavior separation; implementation conventions: "use existing project stack; do not add libraries without a real requirement" (Lenis/GSAP/motion are pre-declared; nothing else added casually).

## Part 22 — Page Patterns (Commercial) — canonical section skeleton

SaaS Landing table adapts to our single page:

| # | SaaS block | Portfolio adaptation |
|---|---|---|
| 1 | Site Nav (logo+links+CTA) | Nav: wordmark + ≤5 links + one CTA (§4.7 one line, ≤80px) |
| 2 | Hero (headline+subtext+CTA+visual) | Hero + cursor-reactive canvas visual (≤4 text elements) |
| 3 | Social proof | Logo wall UNDER hero, grayscale, real SVG logos only |
| 4 | Features bento | Skills/approach band (bento 1×/page, exact cell count) |
| 5 | How it works | Process or pinned Sticky-Stack showcase |
| 6 | Testimonials | Optional; never a carousel (Part 11); ≤3-line quotes (§4.10) |
| 7 | Pricing | Omit |
| 8 | FAQ | 5–8 accordion items, max-w-3xl (Part 24) |
| 9 | CTA | Final contact CTA, centered max-w-2xl, py-20–28 |
| 10 | Footer | grid-cols-2 md:grid-cols-4, border-t, py-12, text-xs muted close |

Hard numbers: hero grid `grid-cols-[1fr_500px]` → `grid-cols-[1fr_700px]` wide; headline `text-5xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold` (constrained by §4.7 hero font-scale rule — 6xl/7xl only for 3–5-word headlines; oversized display type rides the fluid 4xl/5xl clamps from Part 13); subtext `text-base sm:text-xl max-w-[600px]`; CTA row `flex flex-col sm:flex-row gap-4`; hero py-10→py-20; between sections py-20.
Responsive behavior table: nav hamburger→condensed→full; hero stacked-centered-text-left (mobile) → 2-col; bento 1/2/3-col; testimonials horizontal-scroll (mobile) /2/3-col; CTA stacked/centered/inline; **section padding: mobile py-12 md:py-16; tablet py-16 md:py-20; desktop py-20 lg:py-28** (density 2–3 pages push toward py-32).
Transferable component specs: product/project card image `h-56 object-cover hover:scale-105` (200ms, Part 15), grid `gap-8 sm:grid-cols-2 lg:grid-cols-3`, card `hover:shadow-xl duration-300`, badge `bg-primary text-xs font-bold rounded-full`; cart overlay `bg-black/50 z-40` → scrim pattern (40–60% black, Part 4); dashboard/chart patterns n/a; pricing layout (gradient top bar h-2, md:grid-cols-3 gap-8, `whileHover={{y:-10}}` duration .2, price 4xl bold, checks accent) if a services/rates band is ever added. Animation pattern: container opacity 0→1 y 20→0 0.5s with 0.2s stagger (cap per Part 15: ≤8 items, 50ms stagger refines).

## Part 23 — Cross-Platform

Partially applied: Flutter mapping n/a; mobile-grade rules hold — touch list items 48px, hover disabled on touch (gate with `@media (hover:hover)`), bottom-sheet modals on mobile (Part 14 snippet), breakpoint tokens compact <600 / medium 600–840 / expanded 840–1200 / large ≤1600, shared motion tokens across surfaces, reduced-motion equivalent for mobile, velocity-based dismissal per Part 10.

## Part 24 — Content Pages — Portfolio pattern (canonical structure)

Sections: 1 Hero (name + title + short bio + social links), 2 Selected Work (project showcase), 3 About (longer bio + skills), 4 Contact (email or form). Project Card: screenshot `aspect-[16/10] rounded-xl` hover slight scale; row Project Name + Year (`flex justify-between`); short description `text-sm text-muted`; badge row [React][Tailwind][Figma]. (Radius per SHAPE LOCK — if all-sharp, drop rounded-xl.)
Shared sections: logo bar grayscale `opacity-60 hover:100`, h-6–8, max-w-4xl; FAQ accordion max-w-3xl, trigger font-semibold, 5–8 items, space-y-4; final CTA centered max-w-2xl, headline 3xl–4xl, py-20–28; footer `grid grid-cols-2 md:grid-cols-4 gap-8`, border-t, py-12, bottom text-xs muted. Blog/docs patterns n/a; 3-line clamp + gray small excerpt reusable for project teasers.

## Part 25 — Reference: Responsive Spacing System

Section gaps: py-12 (48px) / py-16 (64) / py-20 (80). Compact gaps: py-8/10/12. Content max-width: 100% / 100% / max-w-7xl (1280px). Container padding: px-4 / px-6 / px-8. Card gap: gap-4 / 6 / 8. Element gap: space-y-4 / 6 / 8. Component quick-ref: shadcn/Radix/Recharts/Aceternity/Framer Motion/Bento custom CSS grid.

## Part 27 — Layout Primitives & Animated Patterns

Composable single-responsibility primitives; nest to compose; no media queries inside primitives (sources: Every Layout/Bedrock/UI-Layouts/Flexbugs):
- Stack: `display:flex; flex-direction:column; gap: var(--stack-gap, var(--space-4))` + owl fallback `> * + * { margin-block-start: … }`.
- Cluster: `flex; flex-wrap:wrap; gap; align-items:center` — tags, button groups, breadcrumbs, social row.
- Sidebar: `display:flex; flex-wrap:wrap; gap` + `.side { flex: 0 0 var(--sidebar-width, 20rem) }` + `.main { flex: 1; min-width: 50% }` — organic breakpoint with zero @media; hero skeleton uses `--sidebar-width: 24rem`.
- Switcher: `flex-wrap; gap; > * { flex-grow:1; flex-basis: calc((var(--switcher-threshold, 30rem) - 100%) * 999) }` — hard inline↔stack threshold (CTA pairs, badge rows, pricing tiers).
- Cover: `display:flex; flex-direction:column; min-height: var(--cover-height)` + `> .fill { margin-block: auto }` — hero/full-bleed centering. **Taste §3.E override: use 100dvh, not 100vh.**
- Center: `margin-inline:auto; max-width:60rem; padding-inline: var(--space-4)`; `.center--text { max-width: 38rem }` (≈65ch reading measure).
- Grid: `display:grid; grid-template-columns: repeat(auto-fit, minmax(min(var(--grid-min, 16rem), 100%), 1fr))` — zero-media-query project grid reflow.

Reference CSS to reproduce in the primitives sheet:

```css
.stack  { display:flex; flex-direction:column; justify-content:flex-start;
          gap: var(--stack-gap, var(--space-4)); }
.stack > * + * { margin-block-start: 0; }            /* gap owns spacing; owl only as fallback */
.cluster{ display:flex; flex-wrap:wrap; align-items:center;
          justify-content:flex-start; gap: var(--cluster-gap, var(--space-2)); }
.sidebar{ display:flex; flex-wrap:wrap; gap: var(--gutter, var(--space-4)); }
.sidebar > :not(.sidebar__content) { flex: 0 0 var(--sidebar-width, 20rem); }
.sidebar > .sidebar__content { flex-grow: 1; min-width: 50%; }
.switcher { display:flex; flex-wrap:wrap; gap: var(--switcher-gap, var(--space-4)); }
.switcher > * { flex-grow:1; flex-basis: calc((var(--switcher-threshold, 30rem) - 100%) * 999); }
.cover  { display:flex; flex-direction:column; justify-content:center;
          min-height: var(--cover-height, 100dvh); }  /* dvh per §3.E, NOT 100vh */
.cover > :first-child:not(.cover__fill) { margin-block-end:auto; }
.cover > :last-child:not(.cover__fill)  { margin-block-start:auto; }
.cover__fill { flex-grow:1; }
.center { margin-inline:auto; max-width: var(--measure, 60rem); padding-inline: var(--space-4); }
.center--text { max-width: 38rem; }                    /* ≈65ch reading measure */
.layout-grid { display:grid; grid-template-columns:
          repeat(auto-fit, minmax(min(var(--grid-min, 16rem), 100%), 1fr));
          gap: var(--gutter, var(--space-4)); }
```
Spacing integration: gutter tokens map to --space-*; fluid `clamp(var(--space-3), 2vw + var(--space-2), var(--space-5))`; never raw px inside primitives; same token names everywhere; override at composition level; gap beats child margins.
Landing hero recipe (3.2): **Cover > nav + Sidebar(--sidebar-width: 24rem) { Stack { h1, p, Cluster { CTA, secondary } } + side visual } + footer strip** — adopt as the hero skeleton, with the canvas as the side/fill visual. 3.1 article = Stack-in-Center; 3.3 = Switcher(threshold 48rem) of Stacks; 3.5 = Cluster tags with --gutter-sm.
Flexbugs to enforce: 4.1 `min-width: 0` on flex children containing text (or global `* { min-width: 0 }`) or long words blow layout; 4.2 `margin: auto` absorbs free space (nav right-push = `margin-left:auto`, Part 27 decision table); 4.3 explicit `box-sizing: border-box` on flex containers; 4.4 `flex-shrink: 0` on imgs/svgs/icons; 4.5 flex gap baseline-safe since 2021 (owl fallback for legacy).
Animated patterns: 5.1 `layout` prop for data-driven reflow (project filter transitions — allowed: visible state change per §5.D); 5.2 Reorder.Group (only if drag-ordering ships); 5.3 sequential reveal: `useInView({once:true, amount:0.2})`, variants visible `transition={{staggerChildren:0.1}}`, hidden `{opacity:0, y:20}`; 5.4 AnimatedNumber via useMotionValue/useTransform/animate duration 0.8 with `controls.stop` cleanup (organic numbers only, §9.D; not a live counter §9.F); 5.5 rules: purposeful only (state transitions, not decoration); **layout shifts 200–400ms, fades 150–300ms, never >500ms**; easing ease-out entries / ease-in exits / ease-in-out reposition — conflicts with Part 10 "never ease-in": resolve via Part 10 + asymmetric exit-faster-than-enter (use a gentle ease-in-out skewed fast, not true ease-in); GPU transforms; respect prefers-reduced-motion.
Decision table: stack→Stack; tag rows→Cluster; sidebar→Sidebar (or CSS grid); side-by-side-or-stack→Switcher; full-height centering→Cover (dvh); centered max-width→Center; responsive cards→Grid; animate layout change→motion `layout`; navbar→Cluster + margin-left:auto; form→Stack-in-Center.
Anti-patterns: hardcoded per-child margins; @media where an intrinsic primitive suffices; flex without purpose; >3 nesting of the same primitive; animating width/height/top/left; Grid-for-everything (linear flows are Stack/Cluster).

## §14 Pre-flight checklist

(condensed-verbatim from Part 3 §14; every item must be honestly tickable or the page is not done)

1. Brief inference declared (§0.B Design Read).
2. Dial values explicit and reasoned.
3. Design system chosen and labeled honestly.
4. Redesign mode + audit if applicable (n/a — greenfield).
5. ZERO em-dashes anywhere (§9.G).
6. Page Theme Lock held (§4.11).
7. Color Consistency Lock held (§4.2).
8. Shape Consistency Lock held (§4.4).
9. Button Contrast Check AA 4.5:1.
10. No CTA button wraps to 2+ lines.
11. Form Contrast Check.
12. Serif discipline: not Fraunces/Instrument_Serif; differs from previous project.
13. Premium-consumer palette check (beige+brass ban).
14. Italic descender clearance: leading-[1.1] + pb-1.
15. Hero fits viewport: ≤2-line headline, ≤20-word sub, CTA visible, font scale planned with the image/visual.
16. Hero top padding ≤ pt-24.
17. Hero stack ≤4 text elements.
18. Eyebrow count ≤ ceil(sections/3).
19. Split-Header Ban held.
20. Zigzag alternation ≤2 consecutive.
21. No Duplicate CTA Intent.
22. Logo wall = logo only.
23. Bento Background Diversity: 2–3 visual cells.
24. Logo wall under hero, real SVG logos.
25. Copy Self-Audit passed.
26. Every motion motivated (one-sentence justification each).
27. Marquee ≤1 per page.
28. Nav one line, ≤80px height.
29. Section-Layout-Repetition: ≥4 families per 8 sections.
30. Bento rhythm + exact cell count.
31. Long lists use the right component.
32. Real images: no div fake screenshots, no hand-rolled decorative SVGs, no pure-text minimalism.
33. No pills/labels on images.
34. No decorative photo credits.
35. No version footers.
36. No micro-meta sentences.
37. No hero-bottom decoration strip.
38. No floating top-right sub-text in headings.
39. No filled-track progress bars as comparisons.
40. No locale/time/weather strips.
41. No scroll cues.
42. No version labels in hero.
43. No section-numbering eyebrows.
44. No decorative dots.
45. No border-t+border-b on every table row.
46. Content density sane (sub-paragraphs ≤25 words).
47. Quotes ≤3 lines, clean attribution.
48. Motion claimed = motion shown (MOTION>4 actually animates).
49. GSAP sticky-stack / horizontal-pan per §5.A/§5.B (start "top top", pin:true, correct scrub).
50. No window scroll listener (§5.D).
51. Reduced motion handled for MOTION>3.
52. Dark-mode tokens exist and both modes tested (here: tokenized so inversion is verifiable; documented editorial light-lock exception §8).
53. Mobile collapse explicit per section.
54. min-h-[100dvh], never h-screen.
55. useEffect animations: strict cleanup (gsap.context/revert).
56. Empty/loading/error states shipped.
57. Cards omitted where spacing suffices.
58. Icons from allowed library only (§3.C).
59. Motion isolated in client-leaf, memoized.
60. No Section 9 AI Tells.
61. Core Web Vitals plausible: LCP<2.5s, INP<200ms, CLS<0.1.
62. One design system per project.

## Applicability summary

| Part | Status | 3-word reason |
|---|---|---|
| 1 | Applied | Core anti-slop law |
| 2 | Applied | Dials, tells, bans |
| 3 | Applied | Pre-flight gate |
| 4 | Applied | Selector workflow/checklist |
| 5 | Applied | Experience mode |
| 6 | Applied | Extraction ethics antigravity |
| 7 | Applied | QA evidence rules |
| 8 | Applied | Phase 3 process |
| 9 | Not relevant | Dashboard-specific reference |
| 10 | Applied | Animation decision gates |
| 11 | Applied | UX laws grounding |
| 12 | Not relevant | Index file routing |
| 13 | Applied | Token numeric baseline |
| 14 | Applied | Component spec layer |
| 15 | Applied | Polish never/instead |
| 16 | Applied | A11y perf thresholds |
| 17 | Applied | Tailwind v4 implementation |
| 18 | Applied | Token/icon discipline |
| 19 | Applied | Forms states motion |
| 20 | Applied | Spec consistency audit |
| 21 | Partially applied | Product flows excluded |
| 22 | Applied | Section skeleton numbers |
| 23 | Partially applied | Mobile patterns only |
| 24 | Applied | Portfolio canonical structure |
| 25 | Applied | Spacing scale reference |
| 26 | Not relevant | Template index routing |
| 27 | Applied | Hero layout skeleton primitives |

## Appendix A — Focused 4-part second pass (parts 1 / 10 / 13 / 20), independent of the distillation above

A separate read-only pass re-checked docs/DESIGN.canvas.tsx + prime/reports/phase-3-design.md against parts 1, 10, 13, 20 with an artifact-aware lens.

Compliances confirmed: next/font self-host / no `<link>` / no Inter; motion-motivated ADRs with pin budget 1 GSAP + 1 sticky; micro 180–250ms <300ms, hero 2400ms sanctioned marketing length, known custom curves, no ease-in, linear only for scrub; transform/opacity/clip-path only; hover pointer-gated; stagger ≤0.08s within 30–80ms rule; single Contact inversion legal under §4.11 once-per-page; semantic token layers, measured WCAG ratios, 44px targets, 768/1024 bands, clamp() type; sub-1.0 leading / −0.035em accepted as documented evidence-derived deviation.

Six GAP corrections it required — all applied at checkpoint 9 of `prime/reports/phase-3-checkpoint-review.md` (§5.D scroll-listener wording; reduced-motion "gentler not zero" opacity floor; `:active` press feedback; hero scale-in start ≥0.9; part-20 §21 behavior-states section; weight-terminology harmonization). Its verdict ("Not yet PASS → re-gate after edits") is therefore superseded by the fold-in + gate re-run: G5/G8/G12/G13 GATE-PASS, `npx tsc --noEmit` exit 0.

Carried into Phase 4/5 as implementation constraints: §14 62-item pre-flight is the hard Phase 3→4 completion gate for the design spec (checked at the Phase 6 review with the rest of the evidence); `useSpring(stiffness:100, damping:10)` mouse-follow; GSAP/Motion separate trees; Flexbugs 4.1–4.5 in layout primitives; `min-h-[100dvh]`; dial MOTION_INTENSITY 8 confirmed (4 pinned-variant showcases are the brief's core, not decoration — motion claimed = motion shown holds since every listed animation ships).
