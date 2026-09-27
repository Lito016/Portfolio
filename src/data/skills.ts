import type { SkillCategory } from '@/lib/types';

/**
 * Skills organized by domain (Cycle 4, REQ-13). No subjective level labels.
 * Content is limited to owner-declared skills and technologies backed by
 * prime/state/fact-whitelist.md (W22). Canonical names per DESIGN §5.
 */
export const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    icon: 'code',
    skills: [
      { name: 'TypeScript', category: 'Languages' },
      { name: 'JavaScript', category: 'Languages' },
      { name: 'Python', category: 'Languages' },
      { name: 'PHP', category: 'Languages' },
      { name: 'SQL', category: 'Languages' },
      { name: 'HTML & CSS', category: 'Languages' },
    ],
  },
  {
    name: 'Frontend',
    icon: 'layers',
    skills: [
      { name: 'React', category: 'Frontend' },
      { name: 'Next.js', category: 'Frontend' },
      { name: 'Tailwind CSS', category: 'Frontend' },
      { name: 'Inertia.js', category: 'Frontend' },
      { name: 'Framer Motion', category: 'Frontend' },
    ],
  },
  {
    name: 'Backend',
    icon: 'server',
    skills: [
      { name: 'Node.js', category: 'Backend' },
      { name: 'Laravel', category: 'Backend' },
      { name: 'FastAPI', category: 'Backend' },
    ],
  },
  {
    name: 'Databases & BaaS',
    icon: 'database',
    skills: [
      { name: 'PostgreSQL', category: 'Databases & BaaS' },
      { name: 'MySQL', category: 'Databases & BaaS' },
      { name: 'MongoDB', category: 'Databases & BaaS' },
      { name: 'Supabase', category: 'Databases & BaaS' },
      { name: 'Firebase', category: 'Databases & BaaS' },
    ],
  },
  {
    name: 'AI & ML',
    icon: 'brain',
    skills: [
      { name: 'LLM Integration', category: 'AI & ML' },
      { name: 'RAG Pipelines', category: 'AI & ML' },
      { name: 'Agentic AI Workflows', category: 'AI & ML' },
      { name: 'Prompt Engineering', category: 'AI & ML' },
      { name: 'MCP Servers', category: 'AI & ML' },
      { name: 'Object Detection (YOLO)', category: 'AI & ML' },
    ],
  },
  {
    name: 'Infrastructure & Deployment',
    icon: 'cloud',
    skills: [
      { name: 'Docker', category: 'Infrastructure & Deployment' },
      { name: 'Cloudflare', category: 'Infrastructure & Deployment' },
      { name: 'Vercel', category: 'Infrastructure & Deployment' },
    ],
  },
  {
    name: 'Engineering',
    icon: 'wrench',
    skills: [
      { name: 'Git', category: 'Engineering' },
      { name: 'GitHub', category: 'Engineering' },
    ],
  },
];

