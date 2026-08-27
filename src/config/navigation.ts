import type { NavItem } from '@/lib/types';

export const mainNavItems: NavItem[] = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
  { title: 'Skills', href: '/skills' },
  { title: 'Projects', href: '/projects' },
  { title: 'Stats', href: '/stats' },
  { title: 'Experience', href: '/experience' },
  { title: 'Contact', href: '/contact' },
];

export const footerNavItems: NavItem[] = [
  { title: 'GitHub', href: 'https://github.com/Lito016' },
  { title: 'LinkedIn', href: 'https://linkedin.com/in/manolito-almaden-jr-a54a6634a' },
  { title: 'Resume', href: '/resume' },
  { title: 'Uses', href: '/uses' },
  { title: 'Now', href: '/now' },
];

/** All navigation links for sitemap */
export const allRoutes = [
  '/',
  '/about',
  '/skills',
  '/tech-stack',
  '/projects',
  '/featured',
  '/stats',
  '/contributions',
  '/activity',
  '/open-source',
  '/experience',
  '/education',
  '/certifications',
  '/achievements',
  '/testimonials',
  '/uses',
  '/now',
  '/resume',
  '/contact',
];
