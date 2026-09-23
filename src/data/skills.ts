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

export const techStackItems = [
  { name: 'TypeScript', category: 'language', color: '#3178c6' },
  { name: 'JavaScript', category: 'language', color: '#f1e05a' },
  { name: 'Python', category: 'language', color: '#3572A5' },
  { name: 'React', category: 'framework', color: '#61dafb' },
  { name: 'Next.js', category: 'framework', color: '#808080' },
  { name: 'Node.js', category: 'runtime', color: '#339933' },
  { name: 'Tailwind CSS', category: 'styling', color: '#06b6d4' },
  { name: 'Framer Motion', category: 'animation', color: '#ff0055' },
  { name: 'PostgreSQL', category: 'database', color: '#4169e1' },
  { name: 'MySQL', category: 'database', color: '#4479a1' },
  { name: 'MongoDB', category: 'database', color: '#47a248' },
  { name: 'Supabase', category: 'backend', color: '#3ecf8e' },
  { name: 'Firebase', category: 'backend', color: '#ffca28' },
  { name: 'Docker', category: 'devops', color: '#2496ed' },
  { name: 'Git', category: 'vcs', color: '#f05032' },
  { name: 'Vercel', category: 'deployment', color: '#808080' },
  { name: 'Cloudflare', category: 'deployment', color: '#f38020' },
];
