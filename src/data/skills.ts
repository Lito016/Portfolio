import type { SkillCategory } from '@/lib/types';

export const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    icon: 'code',
    skills: [
      { name: 'TypeScript', category: 'Languages' },
      { name: 'JavaScript', category: 'Languages' },
      { name: 'Python', category: 'Languages' },
      { name: 'HTML & CSS', category: 'Languages' },
      { name: 'SQL', category: 'Languages' },
    ],
  },
  {
    name: 'Frameworks & Libraries',
    icon: 'layers',
    skills: [
      { name: 'React', category: 'Frameworks & Libraries' },
      { name: 'Next.js', category: 'Frameworks & Libraries' },
      { name: 'Node.js', category: 'Frameworks & Libraries' },
      { name: 'Tailwind CSS', category: 'Frameworks & Libraries' },
      { name: 'Framer Motion', category: 'Frameworks & Libraries' },
    ],
  },
  {
    name: 'AI & Machine Learning',
    icon: 'brain',
    skills: [
      { name: 'LLM Integration', category: 'AI & Machine Learning' },
      { name: 'RAG Pipelines', category: 'AI & Machine Learning' },
      { name: 'Agentic AI Workflows', category: 'AI & Machine Learning' },
      { name: 'Prompt Engineering', category: 'AI & Machine Learning' },
      { name: 'MCP Servers', category: 'AI & Machine Learning' },
    ],
  },
  {
    name: 'Tools & Platforms',
    icon: 'wrench',
    skills: [
      { name: 'Git', category: 'Tools & Platforms' },
      { name: 'Docker', category: 'Tools & Platforms' },
      { name: 'Cloudflare', category: 'Tools & Platforms' },
      { name: 'Vercel', category: 'Tools & Platforms' },
      { name: 'Firebase', category: 'Tools & Platforms' },
    ],
  },
  {
    name: 'Databases',
    icon: 'database',
    skills: [
      { name: 'PostgreSQL', category: 'Databases' },
      { name: 'MySQL', category: 'Databases' },
      { name: 'MongoDB', category: 'Databases' },
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
  { name: 'Firebase', category: 'backend', color: '#ffca28' },
  { name: 'Docker', category: 'devops', color: '#2496ed' },
  { name: 'Git', category: 'vcs', color: '#f05032' },
  { name: 'Vercel', category: 'deployment', color: '#808080' },
  { name: 'Cloudflare', category: 'deployment', color: '#f38020' },
];
