# Phase 5 — Pre-flight audit (M8): §14 62-item checklist

**Scope/method.** Audit of the shipped static export (`out/`) and source (`src/`) of the single-page portfolio (Hero → Work → About → Skills → Experience → Contact). Checklist authority: `prime/reports/phase-3-parts-evidence.md` §14 (lines 338–403). Design authority: `docs/DESIGN.canvas.tsx`; requirements: `docs/PRD.md`; fact law: `prime/state/fact-whitelist.md`; overrides: `prime/reports/phase-3-design.md` (fold-in, line 24) and quality-review findings.
Method: full source review + computational checks (grep, measured CSS) + Playwright (chromium) against `npx serve out -l 4310` at **1440x900** and **375x812**, plus a `reducedMotion:'reduce'` context. No builds run, no dev server, no files changed except this report. Measurements are local-host values (fast LAN, not a CWV lab run). Verdicts use PASS / FAIL / EXCEPTION(documented) / N/A(reason).

## Verdict table

| # | Item | Verdict | Evidence (file:line or measured) |
|---|---|---|---|
| 1 | Brief inference declared (§0.B) | PASS | `docs/DESIGN.canvas.tsx:50-59` designRead with signals + one-liner |
| 2 | Dials explicit and reasoned | PASS | `DESIGN.canvas.tsx:64-69` VARIANCE 8 / MOTION 8 / DENSITY 3, each reasoned from brief |
| 3 | Design system chosen, labeled honestly | PASS | `DESIGN.canvas.tsx:74-78` bespoke ANTIGRAVITY-EDITORIAL under quoted custom_approval (`globals.css:6-15`) |
| 4 | Redesign mode + audit | N/A | greenfield; checklist itself states "(n/a — greenfield)" (`phase-3-parts-evidence.md:345`) |
| 5 | Zero em-dashes | EXCEPTION(documented) | Visible em-dashes only in whitelist-verbatim owner copy: hero value line W24 (`fact-whitelist.md:61`), Quill/Inventory descriptions from owner-authored projects.ts (`fact-whitelist.md:5-6` W1-W4, W12/W25), siteConfig.description in head meta (`site.ts:13`); comments exempt |
| 6 | Page Theme Lock held (§4.11) | PASS | One light canvas + single sanctioned inversion (`globals.css:32-35`, ADR-3.7; fold-in records "one-theme lock" `phase-3-design.md:24`) |
| 7 | Color Consistency Lock (§4.2) | PASS | One hue family, all stray literals traced to tokens (`globals.css:19-42`; `hero-canvas.tsx:6-8`; `header.tsx:35` = canvas alpha) |
| 8 | Shape Consistency Lock (§4.4) | FAIL | Lock is 0/8/9999 (`DESIGN.canvas.tsx:180`); diagram renders use 6px radius: `showcase-typographic-diagram.tsx:42,51` `style={{borderRadius: 6}}` |
| 9 | Button Contrast AA 4.5:1 | PASS | Measured: primary CTA 6.39, secondary 16.1, contact pill 17.63, nav link 8.82, contact link 8.81 (both viewports) |
| 10 | No CTA wraps to 2+ lines | PASS | Measured Range rects = 1 line for "View Projects", "GitHub", "Start a conversation" at 1440 and 375 |
| 11 | Form Contrast Check | N/A | No forms shipped (ADR-3.9, `contact.tsx:9`; error role "reserved and unused" `globals.css:59`) |
| 12 | Serif discipline | PASS | Geist + Geist Mono, zero serifs (`layout.tsx:9-17`); not Fraunces/Instrument Serif |
| 13 | Premium-consumer palette (beige+brass ban) | PASS | Off-white/blue/ink ramp (`globals.css:20-35`); no beige/brass |
| 14 | Italic descender clearance | N/A | No italic text anywhere (computed italic set = 3 empty `<i>` containers); rule vacuous |
| 15 | Hero fits viewport (CTA visible) | FAIL | Measured CTA top 1006px > 900vh desktop; 891px > 812vh mobile; hero section height 1107/1034px; headline 2 lines and sub 12 words do pass |
| 16 | Hero top padding ≤ pt-24 (96px) | FAIL | Measured computed padding-top 104px at ≥768px (`hero-motion.tsx:50` `pt-[calc(var(--nav-h)+40px)]`, `--nav-h:64px` `globals.css:215`); mobile 96px OK |
| 17 | Hero stack ≤4 text elements | FAIL | 5 text groups: eyebrow `hero-motion.tsx:53`, h1 :56, sub :100, CTAs :101, bottom strip :117 (§4.7 bans "tagline below CTAs / trust micro-strip", `phase-3-parts-evidence.md:33`) |
| 18 | Eyebrow count ≤ ceil(sections/3) | FAIL | Measured 51 rendered `.label-mono` uppercase-tracking labels; sections 6 (ceil=2, 8 regions ceil=3); override log covers numerals only (`phase-3-design.md:24`) |
| 19 | Split-Header Ban | PASS | No big-headline-left + explainer-right pattern; Work/About headers are eyebrow-column + metadata grid (`work.tsx:31-44`, `about.tsx:23`) |
| 20 | Zigzag ≤2 consecutive | PASS | Only two text/media splits (variants 01, 04), both text-left, separated by full-bleed + diagram variants (`work.tsx:14-25`) |
| 21 | No Duplicate CTA Intent | EXCEPTION(documented) | Email anchor + "Start a conversation" mailto pill in Contact = same intent twice, but FR-14/ADR-3.9 mandates "three direct anchors + one large pill CTA (mailto)" (`contact.tsx:8-15,48-54`; `DESIGN.canvas.tsx:443-448` sample) |
| 22 | Logo wall = logo only | N/A | No logo wall exists (no logos in DOM) |
| 23 | Bento Background Diversity | N/A | No bento grid; fan-stack is a 4-cell screenshot stack (`showcase-sticky-stack.tsx:49-63`) |
| 24 | Logo wall under hero, real SVGs | N/A | No logo wall exists |
| 25 | Copy Self-Audit | PASS | DOM text pass: no invented strings (all copy traces to whitelist data files), consistent editorial register, grammar clean; nit: W24 line repeated verbatim in hero and Work intro (`hero.tsx:16`, `work.tsx:41`) |
| 26 | Every motion motivated | PASS | Each animated behavior has a one-line justification: FR-03 sequence (`hero-motion.tsx:20-22`), FR-06 cue, FR-11 reveal (`reveal.tsx:5-9`), REQ-08 pin (`pin-browser-layer.tsx:11-16`), ADR-3.5 wipe/Ken-Burns (`full-bleed-media.tsx:10-17`, `diagram-scrub-layer.tsx:8-12`), FR-12 panel (`globals.css:363-367`) |
| 27 | Marquee ≤1 per page | PASS | Zero marquees (canvas itself states "marquee-free" `DESIGN.canvas.tsx:92`) |
| 28 | Nav one line, ≤80px | PASS | Measured header 65px (desktop) / 57px (mobile) incl. 1px hairline; nav single line, height 44px; `--nav-h` 56/64 (`globals.css:40,215`) |
| 29 | Section-layout repetition ≥4 families/8 | PASS | Families: cover-typographic hero, pinned split, full-bleed, numeral-rail+diagram, sticky fan, hairline rows, statement+dl, accordion, inverse close (>4) |
| 30 | Bento rhythm + exact cell count | N/A | No bento layout on the page |
| 31 | Long lists use right component | PASS | Skills → accordion rows (`skills.tsx:38-74`), projects → showcases + secondary rows (`work.tsx`), meta → dl (`about.tsx:53-71`); no spec-sheet dumps |
| 32 | Real images, no div fake UI | PASS | 7 real screenshot PNGs rendered (`out/` img srcs measured: `/project-*.png`); hero canvas is the FR-05-mandated interactive visual, not a fake product UI; Vision visual labeled "System diagram" (W28, `showcase-typographic-diagram.tsx:38`) |
| 33 | No pills/labels on images | PASS | Browser-chrome label bar sits above the image, never overlaid (`showcase-pinned-browser.tsx:55-62`); fan images are clean |
| 34 | No decorative photo credits | PASS | Only caption is "Browser preview" = treatment label (`showcase-pinned-browser.tsx:67`), not a photo credit |
| 35 | No version footers | PASS | Footer = name, © YEAR, location, socials (`footer.tsx:14-38`); no version text (grep clean) |
| 36 | No micro-meta sentences | FAIL | "Now building: …" micro-meta under hero CTAs (`hero-motion.tsx:124-126`); "Currently building:" repeated in About body AND About meta "Current focus" (`about.tsx:48,67`) |
| 37 | No hero-bottom decoration strip | FAIL | Text strip (email + Now-building mono line) pinned at hero bottom (`hero-motion.tsx:117-127`), i.e. the §4.7-banned "trust micro-strip" |
| 38 | No floating top-right sub-text in headings | PASS | No absolutely-positioned sub-text near any heading; ghost numerals are left/top (aria-hidden), verified in DOM walk |
| 39 | No filled-track progress bars | PASS | No progress bars anywhere (skills are typographic reveals) |
| 40 | No locale/time/weather strips | PASS | Static location strings only, mandated by FR-15 footer spec; no clock/weather/API strips (grep clean) |
| 41 | No scroll cues | EXCEPTION(documented) | ScrollIndicator exists by explicit mandate FR-06/REQ-06 (`docs/PRD.md:52`; `scroll-indicator.tsx`); override recorded `phase-3-design.md:24` (a); project requirements override the generic checklist |
| 42 | No version labels in hero | PASS | No V0.x/BETA/version strings in hero (`hero.tsx`, `hero-motion.tsx`) |
| 43 | No section-numbering eyebrows | EXCEPTION(documented) | Section eyebrows are words (Work/About/Skills/Career/Contact); showcase "Project 01–04" mono labels + ghost numerals are the FR-07/REQ-07-mandated data index with recorded override (`phase-3-design.md:24` (b), finding 1; `showcase-ui.tsx:16-22`) |
| 44 | No decorative dots | FAIL | 3 decorative faux-traffic-light `<i>` dots in browser frame (`showcase-pinned-browser.tsx:56-58`, measured 3 rendered); §9.F says "zero decorative dots"; the hero dot-lattice is the FR-05-mandated content visual and is not counted |
| 45 | No border-t+border-b on every row | PASS | Measured 0 elements with solid borders top AND bottom; pattern is container border-t + row border-b (`about.tsx:53,81`, `skills.tsx:38,45`, `experience.tsx:28,32`) |
| 46 | Content density sane (sub ≤25 words) | FAIL | Measured >25-word subs: Quill showcase desc 27w (`projects.ts:87-88`), About p1 31w, About p2 41w (`about.tsx:37-46`) |
| 47 | Quotes ≤3 lines, clean attribution | PASS | No quotes/blockquotes on the page (constraint vacuously held) |
| 48 | Motion claimed = motion shown (MOTION 8) | PASS | Verified live at 1440: Lenis active (`html.lenis`), hero sequence hook `data-hero-seq-start` set, GSAP pin built with measured hold `data-pin-distance=144`, reveal/scrub layers mount under fine capability |
| 49 | GSAP sticky-stack/horizontal-pan per §5.A/§5.B | EXCEPTION(documented) | Pin deviates from canonical `start "top top"` to `start "top 112px"` for fixed-nav clearance, pin:true, pinSpacing:false, scrub ease:'none' (`pin-browser-layer.tsx:47-54`); §5 skeletons are explicitly "adapt, do not improvise" (`phase-3-parts-evidence.md:44`) and ADR-3.5 documents the 1-pin+1-CSS-sticky budget |
| 50 | No window scroll listener | PASS | Grep: zero `addEventListener('scroll')` in `src/`; only `lenis.on('scroll', ScrollTrigger.update)` (`smooth-scroll-provider.tsx:40`) + pointermove/focus/blur (`hero-canvas.tsx:138-141`) |
| 51 | Reduced motion handled (MOTION>3) | PASS | Emulated `reduce`: Lenis absent, canvas `data-static="true"`, no pin, hero opacity 1, static clip layers (`motion.ts:14-27`, `providers.tsx:9-11`, `globals.css:227-241,397-409`; runtime measured) |
| 52 | Dark-mode tokens + both modes tested | EXCEPTION(documented) | Editorial light-lock with single inverse panel (ADR-3.7, checklist §8 note); inverse tokens exist (`globals.css:32-35`) and the inverse surface was measured: pill 17.63:1, link 8.81:1 on ink |
| 53 | Mobile collapse explicit per section | PASS | Band contract min-width-only (`globals.css:211-224`; `responsiveContract` `DESIGN.canvas.tsx:40-45`); measured at 375: single-column, `document.scrollWidth=375`, no overflow |
| 54 | min-h-[100dvh], never h-screen | FAIL | Zero `dvh` in `src/` (grep); vh units everywhere: `min-h-[85vh]` (`hero-motion.tsx:45`), `h-[38vh]` :78, `min-h-[60vh]` (`not-found.tsx:5`), `min-h-screen`=100vh (`error.tsx:10`); no literal `h-screen` but the §3.E dvh law is unmet |
| 55 | useEffect animations strict cleanup | PASS | `gsap.context` + `ctx.revert()` (`motion.ts:39-49`); `trigger.kill()` (`header.tsx:28`, `scroll-indicator.tsx:20`); Lenis destroy + ticker remove (`smooth-scroll-provider.tsx:50-55`); rAF cancel + listener removal (`hero-canvas.tsx:144-152`) |
| 56 | Empty/loading/error states shipped | PASS | `error.tsx` (reset + tokens), `not-found.tsx`, sunk aspect-ratio loading placeholders (`globals.css:253-256`), empty-data null renders (`secondary-row.tsx:11`, `showcase-ui.tsx:53`); behaviorStates in `DESIGN.canvas.tsx:230-235` |
| 57 | Cards omitted where spacing suffices | PASS | Sections use hairlines + rhythm, not card boxes; boxes only for media frames and the diagram panel |
| 58 | Icons from allowed library only (§3.C) | PASS | lucide-react only (`ArrowRight` `contact.tsx:1`; `AlertTriangle`,`Home` `error.tsx:4`), single family/strokeWidth, override (c) recorded (`phase-3-design.md:24`) |
| 59 | Motion isolated in client-leaf, memoized | FAIL | Isolation yes (zero-DOM leaf layers), but no memoization anywhere (grep: zero `memo(`/`useMemo`), and Header mixes Framer `motion.div` with GSAP ScrollTrigger in one component tree (`header.tsx:5-7,22-27,39`), same for ScrollIndicator (`scroll-indicator.tsx:4-6,15-19,28`) — §10 "NEVER mix GSAP/Motion in the same component tree" (`phase-3-parts-evidence.md:107`) |
| 60 | No Section 9 AI Tells | FAIL | Documented overrides cover em-dashes/scroll cue/index numerals/spark, but uncovered tells measured: hero-bottom strip + micro-meta (#36/#37), 3 faux-traffic-light dots (#44), 16 rendered lines with >1 middle dot violating "rationed max 1 per line" (`phase-3-parts-evidence.md:74`; e.g. `about.tsx:65-66` joins, `skills.tsx:67`, `showcase-ui.tsx:41`) |
| 61 | Core Web Vitals plausible | PASS | Local serve: HTML load 127ms / transfer 14KB, CLS measured 0.000, static export, self-hosted fonts (next/font), below-fold images `loading=lazy` with aspect-ratio placeholders; LCP element is server-rendered text (LCP not lab-sampled, local-only caveat) |
| 62 | One design system per project | PASS | Single token source (G32 header `globals.css:3-16`) = `DESIGN.canvas.tsx` designTokens; no second system/package in renders |

## Findings (every FAIL)

1. **#15 Hero CTA below the fold — Major.** "View Projects" renders at y=1006 (viewport 900) and y=891 (viewport 812). Root cause: the hero column (eyebrow + 2×129.6px display lines + 38vh canvas + meta stack) totals 1107/1034px. §4.7 hard rule "CTA visible without scroll" broken at both prime viewports; tension exists with FR-03's staged metadata and FR-05's canvas height. Recommendation: shrink `h-[38vh]` visual (e.g. ≤24vh on ≤900px-tall viewports) or move the meta strip out of the flex flow; re-measure both viewports.
2. **#18 Eyebrow/uppercase-label count — Major.** 51 rendered `.label-mono` labels vs cap 2–3 (`phase-3-parts-evidence.md:33` mechanical rule). The mono-label vocabulary is the design language, but the only recorded override covers showcase numerals, not section eyebrows. Recommendation: either record an explicit §14.18 override in the design authority or reduce section-level eyebrows to ≤3 and convert data-join labels to sentence-case body.
3. **#60 Residual §9 AI tells — Major (aggregate).** Uncovered classes present: hero micro-meta strip (#36/#37), decorative chrome dots (#44), multi-`·` list lines (`about.tsx:65-66`, `skills.tsx:67`, tech joins `showcase-ui.tsx:41`). Recommendation: replace `·` joins with commas or a stacked term list; delete the hero bottom strip; remove/replace the faux window dots; then re-gate.
4. **#17 Hero stack 5 elements — Minor.** Eyebrow + headline + sub + CTAs + bottom strip > the 4-element cap (`hero-motion.tsx:53,56,100,101,117`). Fixing #37 (drop the strip) also fixes this.
5. **#16 Hero top padding 104px — Minor.** 8px over pt-24 at ≥768px (`hero-motion.tsx:50` + `--nav-h:64`). Recommendation: `pt-[calc(var(--nav-h)+32px)]` or reduce to fit 96.
6. **#36 Micro-meta sentences — Minor.** "Now building: …" in hero (`hero-motion.tsx:124-126`) and the thrice-repeated `nowData.building` fact (hero, About paragraph `about.tsx:48`, meta row "Current focus" `about.tsx:67`). Keep one instance maximum, in About.
7. **#37 Hero-bottom text strip — Minor.** The email + Now-building strip at hero bottom is the §4.7-banned trust micro-strip (`hero-motion.tsx:117-127`). Removing it (email already available in Contact) also mitigates #15.
8. **#8 Shape lock breach (6px) — Minor.** Lock vocabulary is 0/8/9999 (`DESIGN.canvas.tsx:180`); `showcase-typographic-diagram.tsx:42,51` use `borderRadius: 6`. Change to 8 (or 0).
9. **#44 Decorative dots — Minor.** Three faux traffic-light `<i>` dots (`showcase-pinned-browser.tsx:56-58`) against "zero decorative dots"; the design even recorded compliance as "spark confined / dots honored" (`phase-3-design.md:24` (d)). Remove them or record the override.
10. **#46 Sub-paragraph word caps — Minor.** Measured 27w (Quill showcase desc, `projects.ts:87-88`), 31w and 41w (About paragraphs, `about.tsx:37-46`) vs ≤25w cap. Split the 41-word sentence; trim Quill to the first clause.
11. **#54 dvh law — Minor.** No `dvh` usage anywhere; error page uses `min-h-screen` (100vh) (`error.tsx:10`). `h-screen` itself is absent, and the hero's 85vh floor is FR-06-mandated, but §3.E's `100dvh` idiom is unmet. Swap viewport-height utilities to `dvh` variants.
12. **#59 Motion memoization / tree mixing — Minor.** No `React.memo`/`useMemo` on motion props; Header and ScrollIndicator each run GSAP ScrollTrigger and Framer motion in the same component tree, which §10 forbids because they contend for frames (`header.tsx:5-7,22-27,39`; `scroll-indicator.tsx:4-6,28`). Extract the compact-state trigger into a leaf, or replace ScrollTrigger there with the Lenis scroll callback.

## Summary

**37 PASS / 6 EXCEPTION(documented) / 7 N/A / 12 FAIL** (62 total).
Exceptions: #5 (W24/W25 + owner-authored data), #21 (FR-14/ADR-3.9), #41 (FR-06), #43 (REQ-07 + override b), #49 (ADR-3.5 adaptation mandate), #52 (§8 light-lock).
N/A: #4 (greenfield), #11 (no forms), #14 (no italics), #22/#24 (no logo wall), #23/#30 (no bento).
Three of the twelve FAILs (#15/#36/#37, plus a share of #17/#60) trace to one root cause: the hero bottom meta strip + oversized canvas column; one structural fix resolves the majority. Confidence: High for source/measurement-backed verdicts; CWV (#61) and motion-shipping (#48) rest on local-serve measurements, not a lab run.

## Post-fix revalidation (M8 sweep, 2026-09-28)

All 12 FAILs remediated or converted to a recorded exception; re-measured on the rebuilt `out/` via Playwright (chromium, 1440x900 + 375x812, `npx serve out -l 4210`, band-swept before/after):

| # | New verdict | Evidence |
|---|---|---|
| 8 | PASS | `showcase-typographic-diagram.tsx` radii now 8 (lock vocabulary 0/8/9999); grep `borderRadius: 6` in `src/` = 0 |
| 15 | PASS | "View Projects" CTA top 844 (bottom 888) < 900 at 1440x900; 763 (bottom 807) < 812 at 375x812 after strip removal + canvas `h-[24dvh]` + `gap-8` |
| 16 | PASS | computed hero padding-top 88px (≥768) / 80px (mobile) ≤ 96; `pt-[calc(var(--nav-h)+24px)]` |
| 17 | PASS | 4 hero text groups (eyebrow, h1, sub, CTAs); bottom strip deleted |
| 18 | EXCEPTION (recorded) | override (e) added to `prime/reports/phase-3-design.md` §1 selector override log: label-mono is the structural data-index vocabulary, not marketing eyebrows |
| 36 | PASS | one instance of the building fact remains (About meta "Current focus"); hero strip and About body duplicate paragraph removed |
| 37 | PASS | hero-bottom strip removed (`hero-motion.tsx`); grep "Now building" in rendered HTML = 0 |
| 44 | PASS | 3 faux traffic-light `<i>` dots removed from `showcase-pinned-browser.tsx`; label bar retained |
| 46 | PASS | sub-paragraphs ≤25w: hero 7w / lists 24w / education 20w / internship 14w (`about.tsx` split); Quill card desc trimmed to 16w (first clause only, no invented content) |
| 54 | PASS | all viewport-height utilities are `dvh` (85dvh hero floor, 24dvh canvas, 100dvh error, 60dvh 404); grep `100vh|min-h-screen` = 0 |
| 59 | PASS | GSAP ScrollTrigger extracted to zero-DOM memoized `ScrollCrossLeaf` (`src/components/shared/scroll-cross-leaf.tsx`); Header/ScrollIndicator no longer mix libraries in one component (matches the PinBrowserLayer leaf precedent) |
| 60 | PASS | residual tell classes cleared: strip (#36/#37), dots (#44), multi-dot lines = 0 (list joins converted to `', '` in about/skills/experience/showcase-ui + `projects.ts` b-5 detail; rendered double-dot text nodes = 0) |

Suite re-run after the sweep: 13/13 node:test (data-invariants 8 + five smoke wrappers, `--test-concurrency=1`); lint, tsc, build green. m6 verbatim expectation updated to the comma joiner (fact words unchanged). Bundle: `out/_next/static` JS+CSS 941,362 B raw / 298,700 B gzipped.

**Post-fix counts: 48 PASS / 7 EXCEPTION(recorded) / 7 N/A / 0 FAIL.** (Original 12 FAILs: 11 remediated to PASS, #18 converted to a recorded design-authority exception; baseline 37 PASS + 6 EXCEPTION + 7 N/A.)
