# Phase 3 Design Digest (caveman lite — applied)

Design locked. Static export → all case studies prerender via generateStaticParams (blog/[slug] proves pattern).

- Data: projects.ts v2. Union forces featured⇒caseStudy at compile time. Fields: slug, category, highlights, links, caseStudy{workflow nodes, architecture lanes, features/challenges/decisions optional, metrics w/ whitelist source, screenshots?}. image:'' → card without <Image>; no anchor when url:''; key=slug.
- Components: ProjectCard (2 variants), FlowDiagram (DOM <ol>, token colors, lanes vertical on mobile, arrows lane→lane only, no mermaid/no deps), WhatIBuild (3 cards → /projects#cat-*).
- Route: /projects/[slug] server page + generateMetadata; client pages get server wrappers for metadata; sitemap += slugs + blog; nav six primary, rest footer.
- Tokens: existing globals.css only (blue #3b82f6, Geist, glass, radius). Benchmark: Portfolio Grid + Trust & Authority; no gradients/particles/strips added.
- Facts: whitelist W1–W22 gates every number/URL. Vision/PRIME/UBMS: prose only, zero links/metrics until owner supplies. UMS minimal-facts featured or drop to 5.
- Open → Plan: per-flagship fact checklist, URL 200 checks, hero CTA use siteConfig.github not literal.
