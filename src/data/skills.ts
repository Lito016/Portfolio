import type { SkillCategory } from '@/lib/types';

export const skillCategories: SkillCategory[] = [
  {
    name: 'Web Development',
    icon: 'code',
    skills: [
      { name: 'HTML & CSS', level: 85, category: 'Web Development' },
      { name: 'Basic PHP', level: 60, category: 'Web Development' },
      { name: 'Basic SQL', level: 55, category: 'Web Development' },
    ],
  },
  {
    name: 'Other Skills',
    icon: 'wrench',
    skills: [
      { name: 'Mobile Development', level: 65, category: 'Other Skills' },
      { name: 'Problem Solving', level: 80, category: 'Other Skills' },
      { name: 'Technical Troubleshooting', level: 75, category: 'Other Skills' },
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
