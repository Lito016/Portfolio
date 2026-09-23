import type { Experience } from '@/lib/types';
import { ORG_BAYANIHAN_NETWORK } from '@/config/site';

export const experiences: Experience[] = [
  {
    id: 'bayanihan-intern',
    role: 'Software Developer Intern',
    company: ORG_BAYANIHAN_NETWORK,
    location: 'Philippines',
    type: 'internship',
    startDate: '2026-02',
    endDate: '2026-04',
    description: [
      'Assisted in the design and development of software applications using AI-powered tools as part of the internship curriculum',
      'Applied AI tools to support web and mobile development tasks, including code generation and problem-solving',
      'Collaborated with the development team and leveraged AI to perform testing, debugging, and documentation of software features',
    ],
    technologies: ['HTML & CSS', 'PHP', 'SQL', 'AI Tools', 'Mobile Development'],
  },
];
