import type { BlogPost } from '@/lib/types';

export const blogPosts: BlogPost[] = [
  {
    slug: 'building-ai-powered-web-apps',
    title: 'Building AI-Powered Web Applications with Next.js',
    excerpt:
      'Learn how to integrate AI capabilities into modern web applications using Next.js, TypeScript, and LLM APIs. From RAG architectures to agentic workflows.',
    date: '2026-06-15',
    tags: ['AI', 'Next.js', 'TypeScript', 'LLM'],
    readingTime: 8,
    published: true,
  },
  {
    slug: 'my-journey-into-agentic-ai',
    title: 'My Journey into Agentic AI Development',
    excerpt:
      'From basic prompt engineering to building autonomous AI agents - a personal account of learning and building in the AI space.',
    date: '2026-05-20',
    tags: ['AI', 'Agentic AI', 'Learning'],
    readingTime: 6,
    published: true,
  },
  {
    slug: 'modern-web-development-stack-2026',
    title: 'My Modern Web Development Stack in 2026',
    excerpt:
      'A deep dive into my current tech stack: Next.js, TypeScript, Tailwind CSS, shadcn/ui, and how these tools come together for production-ready applications.',
    date: '2026-04-10',
    tags: ['Web Development', 'Tech Stack', 'Next.js'],
    readingTime: 5,
    published: true,
  },
];

/** Blog post content (simplified - in production, use MDX) */
export const blogContent: Record<string, string> = {
  'building-ai-powered-web-apps': `
# Building AI-Powered Web Applications with Next.js

The intersection of AI and web development has opened up incredible possibilities for building intelligent applications. In this post, I'll share my experience integrating AI capabilities into modern web apps.

## Why Next.js for AI?

Next.js provides the perfect foundation for AI-powered applications:

- **Server Components** allow heavy AI processing on the server
- **API Routes** handle LLM API calls securely
- **Streaming responses** create real-time AI interactions
- **Edge functions** enable low-latency AI inference

## RAG Architecture

Retrieval-Augmented Generation (RAG) combines the power of LLMs with custom knowledge bases:

1. **Document Ingestion** - Process and chunk your documents
2. **Embedding Generation** - Convert chunks to vector embeddings
3. **Similarity Search** - Find relevant context for queries
4. **Augmented Generation** - Feed context + query to LLM

## Agentic Workflows

AI agents can autonomously perform complex tasks by:

- Breaking down problems into steps
- Using tools and APIs
- Maintaining context across interactions
- Self-correcting and iterating

## Key Takeaways

- Start with a clear use case before adding AI
- Use streaming for better UX with LLM responses
- Implement proper error handling and fallbacks
- Always validate AI outputs before displaying to users

The future of web development is intelligent, and the tools are here today.
`,

  'my-journey-into-agentic-ai': `
# My Journey into Agentic AI Development

When I first started learning about AI, it was through basic prompt engineering. Today, I'm building autonomous AI agents that can solve complex problems. Here's my journey.

## Getting Started

My AI journey began with the Bayanihan AI para sa Bayan program, where I learned:

- Fundamentals of generative AI
- Effective prompt engineering techniques
- How to build AI-powered applications

## The Agentic AI Bootcamp

The 5-day Agentic AI Bootcamp was a turning point:

- Learned to design AI agent architectures
- Built workflow automation systems
- Understood multi-agent collaboration patterns

## Building Real Projects

Theory is important, but building real projects solidified my understanding:

- **AI-integrated web platform** - Combined LLMs with web interfaces
- **Automated workflows** - Created agents that handle repetitive tasks
- **RAG systems** - Built knowledge-augmented AI assistants

## Lessons Learned

1. **Start simple** - Don't over-engineer your first AI agent
2. **Test extensively** - AI behavior can be unpredictable
3. **Iterate quickly** - The field evolves rapidly
4. **Focus on value** - AI should solve real problems

## What's Next

I'm currently exploring LLM fine-tuning and more advanced RAG architectures. The goal is to build AI systems that are not just intelligent, but truly helpful.
`,

  'modern-web-development-stack-2026': `
# My Modern Web Development Stack in 2026

After working on numerous projects, I've refined my tech stack to a set of tools that maximize productivity and code quality.

## Core Framework: Next.js

Next.js with App Router is my go-to for:

- Server-side rendering and static generation
- API routes for backend logic
- Built-in image optimization
- Excellent developer experience

## Language: TypeScript

TypeScript is non-negotiable:

- Catches bugs at compile time
- Provides excellent IDE support
- Makes refactoring safe and easy
- Improves team collaboration

## Styling: Tailwind CSS + shadcn/ui

This combination gives me:

- Utility-first CSS for rapid development
- Pre-built accessible components
- Easy theming and customization
- Consistent design system

## Animation: Framer Motion

For smooth, declarative animations:

- Page transitions
- Scroll-triggered animations
- Gesture-based interactions
- Layout animations

## Deployment: Cloudflare Pages / Vercel

Both platforms offer:

- Global edge deployment
- Automatic HTTPS
- Preview deployments
- Excellent performance

## The Complete Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Components | shadcn/ui |
| Animation | Framer Motion |
| State | React Query |
| Forms | React Hook Form + Zod |
| Deployment | Cloudflare Pages |

This stack has served me well across projects from portfolio sites to full-stack applications.
`,
};
