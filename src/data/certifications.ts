import type { Certification } from '@/lib/types';
import { PROGRAM_BAYANIHAN_AI } from '@/config/site';

export const certifications: Certification[] = [
  {
    id: 'bayanihan-ai',
    name: `${PROGRAM_BAYANIHAN_AI} - OJT`,
    issuer: 'AI Training Program',
    date: '2024',
    description: 'Agentic AI, Generative AI, and Prompt Engineering intensive program.',
  },
  {
    id: 'ai-workshop',
    name: 'AI Intensive Workshop (3-day)',
    issuer: 'AI Workshop Series',
    date: '2024',
    description: 'Foundational AI concepts and hackathon MVP development.',
  },
  {
    id: 'agentic-ai-bootcamp',
    name: 'Agentic AI Bootcamp (5-day)',
    issuer: 'AI Bootcamp',
    date: '2024',
    description: 'AI Agents and workflow automation intensive training.',
  },
  {
    id: 'it-specialist-html-css',
    name: 'IT Specialist - HTML & CSS',
    issuer: 'Certiport / Pearson VUE',
    date: '2026',
    credentialId: 'IT-Specialist-HTML-CSS',
    description: 'Professional certification in HTML and CSS development.',
  },
];
