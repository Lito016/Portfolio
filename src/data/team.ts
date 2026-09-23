import type { TeamMember } from '@/lib/types';
import { POSITIONING } from '@/config/site';

/** Banner content lives here so member changes never require visual edits. */
export const teamMembers: TeamMember[] = [
  {
    id: 'manolito-almaden-jr',
    name: 'Manolito Almaden Jr.',
    role: POSITIONING,
    handle: 'Lito_016',
    profileImage: '/profile.png',
    bio: 'I design and build full-stack business systems, AI & developer tools, and computer-vision automation — from data model to deployment.',
    availability: 'Available for work',
    email: 'mailto:manolitoalmadenjr@gmail.com',
    linkedin: 'https://linkedin.com/in/manolito-almaden-jr-a54a6634a',
  },
];
