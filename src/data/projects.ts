export interface HostedProject {
  name: string;
  description: string;
  url: string;
  tags: string[];
}

export const hostedProjects: HostedProject[] = [
  {
    name: 'UBMS — Unified Business Management System',
    description: 'All-in-one business management platform with inventory tracking, purchase orders, sales trading, printing orders, invoicing, payments, receivables, and audit trail.',
    url: 'https://ubms-prototype.pages.dev/',
    tags: ['Full-Stack', 'Business', 'React'],
  },
  {
    name: 'Barangay Digital Portal',
    description: 'Community platform for digital barangay services, online document requests with real-time tracking, announcements, and resident engagement.',
    url: 'https://barangay-portal-prototype.pages.dev/',
    tags: ['Full-Stack', 'Government', 'React'],
  },
  {
    name: 'AI SaaS Landing Page',
    description: 'AI-powered intelligence platform for modern teams. Features autonomous agents, predictive analytics, and SaaS landing page.',
    url: 'https://ai-saas-landing.pages.dev/',
    tags: ['AI', 'SaaS', 'Next.js'],
  },
  {
    name: 'Dish Manager',
    description: 'Recipe and meal planning management application.',
    url: 'https://dish-manager.pages.dev/',
    tags: ['React', 'Full-Stack', 'Meal Planning'],
  },
];
