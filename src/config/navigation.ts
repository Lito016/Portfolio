import type { NavItem } from '@/lib/types';

/** Primary navigation (REQ-23): exactly six items; secondary routes live in the footer. */
export const mainNavItems: NavItem[] = [
  { title: 'Home', href: '/' },
  { title: 'Projects', href: '/projects' },
  { title: 'Skills', href: '/skills' },
  { title: 'About', href: '/about' },
  { title: 'Resume', href: '/resume' },
  { title: 'Contact', href: '/contact' },
];

export const footerNavItems: NavItem[] = [
  { title: 'Blog', href: '/blog' },
  { title: 'Experience', href: '/experience' },
  { title: 'Stats', href: '/stats' },
];

export const footerMoreItems: NavItem[] = [
  { title: 'Blog', href: '/blog' },
  { title: 'Uses', href: '/uses' },
  { title: 'Now', href: '/now' },
];

export const footerSocialItems: NavItem[] = [
  { title: 'GitHub', href: 'https://github.com/Lito016' },
  { title: 'LinkedIn', href: 'https://linkedin.com/in/manolito-almaden-jr-a54a6634a' },
  { title: 'Email', href: 'mailto:manolitoalmadenjr@gmail.com' },
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
