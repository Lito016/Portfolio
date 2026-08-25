# Portfolio — Manolito Almaden Jr.

Personal portfolio website showcasing my work as an AI Solution Developer. Built with Next.js 16, React 19, and Tailwind CSS 4, featuring glassmorphism design, dark/light theme, and particle effects.

**Live:** [https://portfolio-8af.pages.dev](https://portfolio-8af.pages.dev)
**Repo:** [https://github.com/Lito016/Portfolio](https://github.com/Lito016/Portfolio)

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack, Static Export)
- **UI:** React 19, Tailwind CSS 4, Framer Motion
- **Styling:** Glassmorphism design system with CSS custom properties
- **Data Fetching:** TanStack React Query, GitHub REST API
- **Forms:** React Hook Form + Zod validation
- **Effects:** tsParticles (connected-dots background)
- **Theme:** next-themes (dark/light/system)
- **Deployment:** Cloudflare Pages with GitHub Actions CI/CD

## Pages

| Section | Description |
|---------|-------------|
| Home | Hero with cover photo, tech stack marquee, GitHub stats, featured projects |
| About | Personal background and introduction |
| Skills | Technical skills and competencies |
| Projects | Hosted live applications and project showcase |
| Stats | GitHub statistics, contribution graph, language breakdown |
| Experience | Work history and professional timeline |
| Contact | Contact form with validation |
| Blog | Technical articles on AI and web development |
| Education | Academic background and certifications |
| Resume | Downloadable resume |
| Uses | Development setup and tools |
| Now | Current focus and activities |

## Featured Projects

- **UBMS** — Unified Business Management System (inventory, trading, invoicing)
- **Barangay Digital Portal** — Community services and document processing platform
- **AI SaaS Landing Page** — AI-powered intelligence platform
- **Dish Manager** — Recipe and meal planning application

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production (static export to out/)
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the site locally.

## Deployment

Pushes to `main` automatically trigger a build and deploy to Cloudflare Pages via GitHub Actions.

Manual deploy:

```bash
npm run build
npx wrangler pages deploy out --project-name portfolio
```

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
├── components/
│   ├── layout/           # Header, Footer
│   ├── sections/         # Hero, FeaturedProjects, StatsOverview, etc.
│   └── shared/           # Reusable components (particles, theme toggle)
├── config/               # Site config, navigation
├── data/                 # Static data (projects, skills, experience, etc.)
└── lib/                  # Utilities, GitHub API, types
```

## License

MIT
