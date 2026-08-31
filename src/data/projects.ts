export interface HostedProject {
  name: string;
  description: string;
  url: string;
  image?: string;
  tags: string[];
  caseStudy?: {
    problem: string;
    approach: string;
    solution: string;
    result: string;
  };
}

export const hostedProjects: HostedProject[] = [
  {
    name: 'UBMS — Unified Business Management System',
    description: 'All-in-one business management platform with inventory tracking, purchase orders, sales trading, printing orders, invoicing, payments, receivables, and audit trail.',
    url: 'https://ubms-prototype.pages.dev/',
    image: '/ubms-thumbnail.png',
    tags: ['Full-Stack', 'Business', 'React'],
    caseStudy: {
      problem: 'Core business operations were fragmented across separate inventory, sales, payment, and audit workflows.',
      approach: 'Mapped the operational lifecycle first, then designed shared records and permissions around the way teams actually work.',
      solution: 'A unified management workspace covering stock, orders, invoicing, receivables, payments, printing, and traceable activity.',
      result: 'One coherent operating view with fewer handoffs and a clearer audit trail.',
    },
  },
  {
    name: 'Barangay Digital Portal',
    description: 'Community platform for digital barangay services, online document requests with real-time tracking, announcements, and resident engagement.',
    url: 'https://barangay-portal-prototype.pages.dev/',
    image: '/barangay-thumbnail.png',
    tags: ['Full-Stack', 'Government', 'React'],
    caseStudy: {
      problem: 'Residents lacked a clear digital path for requesting documents and following the status of local services.',
      approach: 'Designed the experience around common resident tasks, readable status feedback, and straightforward administrative review.',
      solution: 'A responsive service portal for document requests, progress tracking, announcements, and community engagement.',
      result: 'A simpler, more transparent connection between residents and barangay services.',
    },
  },
  {
    name: 'AI SaaS Landing Page',
    description: 'AI-powered intelligence platform for modern teams. Features autonomous agents, predictive analytics, and SaaS landing page.',
    url: 'https://ai-saas-landing.pages.dev/',
    image: '/ai-saas-thumbnail.png',
    tags: ['AI', 'SaaS', 'Next.js'],
    caseStudy: {
      problem: 'AI products often communicate complex capabilities without helping teams understand their immediate value.',
      approach: 'Structured the narrative around outcomes, product clarity, and progressive disclosure instead of feature overload.',
      solution: 'A fast, polished product experience presenting autonomous agents and predictive analytics with focused calls to action.',
      result: 'A clearer AI product story that remains credible, approachable, and conversion-focused.',
    },
  },
  {
    name: 'Dish Manager',
    description: 'Recipe and meal planning management application.',
    url: 'https://dish-manager.pages.dev/',
    image: '/dish-manager-thumbnail.png',
    tags: ['React', 'Full-Stack', 'Meal Planning'],
  },
];
