export interface HostedProject {
  name: string;
  description: string;
  url: string;
  image: string;
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
    name: 'Quill MCP',
    description: 'Model Context Protocol server for managing a markdown notes vault. Gives AI assistants the ability to create, read, update, delete, move, search, and organize markdown notes with a persistent memory intelligence layer.',
    url: 'https://github.com/Lito016/quill-mcp',
    image: '/project-quill-mcp.png',
    tags: ['TypeScript', 'MCP', 'AI', 'Tooling'],
    caseStudy: {
      problem: 'AI assistants lacked persistent, structured memory across sessions and had no way to manage local knowledge bases.',
      approach: 'Built a stdio-based MCP server with 49 tools covering vault operations, BM25 smart retrieval, conflict detection, memory consolidation, and checkpoint-based context reconstruction.',
      solution: 'A TypeScript MCP server with a persistent memory intelligence layer featuring 16 memory types, lifecycle state machines, secret detection, and project-scoped isolation.',
      result: 'AI assistants can now maintain structured, searchable, conflict-free memory across sessions using a local markdown vault.',
    },
  },
  {
    name: 'Barangay Digital Portal',
    description: 'Community platform for digital barangay services, online document requests with real-time tracking, announcements, and resident engagement.',
    url: 'https://barangay-prototype.pages.dev/',
    image: '/project-barangay.png',
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
    image: '/project-ai-saas.png',
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
    image: '/project-dish-manager.png',
    tags: ['React', 'Full-Stack', 'Meal Planning'],
  },
];
