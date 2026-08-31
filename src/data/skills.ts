import type { SkillCategory } from '@/lib/types';

export const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    icon: 'code',
    skills: [
      { name: 'HTML & CSS', icon: 'SiHtml5', category: 'Languages' },
      { name: 'JavaScript', icon: 'SiJavascript', category: 'Languages' },
      { name: 'TypeScript', icon: 'SiTypescript', category: 'Languages' },
      { name: 'Python', icon: 'SiPython', category: 'Languages' },
      { name: 'PHP', icon: 'SiPhp', category: 'Languages' },
      { name: 'SQL', icon: 'SiMysql', category: 'Languages' },
    ],
  },
  {
    name: 'Frameworks & Libraries',
    icon: 'layers',
    skills: [
      { name: 'React', icon: 'SiReact', category: 'Frameworks & Libraries' },
      { name: 'Next.js', icon: 'SiNextdotjs', category: 'Frameworks & Libraries' },
      { name: 'Node.js', icon: 'SiNodedotjs', category: 'Frameworks & Libraries' },
      { name: 'Tailwind CSS', icon: 'SiTailwindcss', category: 'Frameworks & Libraries' },
      { name: 'Framer Motion', icon: 'SiFramer', category: 'Frameworks & Libraries' },
    ],
  },
  {
    name: 'Databases & Backend',
    icon: 'database',
    skills: [
      { name: 'PostgreSQL', icon: 'SiPostgresql', category: 'Databases & Backend' },
      { name: 'MySQL', icon: 'SiMysql', category: 'Databases & Backend' },
      { name: 'MongoDB', icon: 'SiMongodb', category: 'Databases & Backend' },
      { name: 'Firebase', icon: 'SiFirebase', category: 'Databases & Backend' },
    ],
  },
  {
    name: 'Tools & Platforms',
    icon: 'wrench',
    skills: [
      { name: 'Git', icon: 'SiGit', category: 'Tools & Platforms' },
      { name: 'Docker', icon: 'SiDocker', category: 'Tools & Platforms' },
      { name: 'Vercel', icon: 'SiVercel', category: 'Tools & Platforms' },
      { name: 'Cloudflare', icon: 'SiCloudflare', category: 'Tools & Platforms' },
    ],
  },
];

export const techStackItems = [
  { name: 'TypeScript', category: 'language', color: '#3178c6' },
  { name: 'JavaScript', category: 'language', color: '#f1e05a' },
  { name: 'Python', category: 'language', color: '#3572A5' },
  { name: 'React', category: 'framework', color: '#61dafb' },
  { name: 'Next.js', category: 'framework', color: '#000000' },
  { name: 'Node.js', category: 'runtime', color: '#339933' },
  { name: 'Tailwind CSS', category: 'styling', color: '#06b6d4' },
  { name: 'Framer Motion', category: 'animation', color: '#ff0055' },
  { name: 'PostgreSQL', category: 'database', color: '#4169e1' },
  { name: 'MySQL', category: 'database', color: '#4479a1' },
  { name: 'MongoDB', category: 'database', color: '#47a248' },
  { name: 'Firebase', category: 'backend', color: '#ffca28' },
  { name: 'Docker', category: 'devops', color: '#2496ed' },
  { name: 'Git', category: 'vcs', color: '#f05032' },
  { name: 'Vercel', category: 'deployment', color: '#000000' },
  { name: 'Cloudflare', category: 'deployment', color: '#f38020' },
];
