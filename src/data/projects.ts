/**
 * Project content model (Cycle 4, DESIGN.canvas.tsx §2).
 * Every number, URL, and technical claim below traces to prime/state/fact-whitelist.md
 * (W1–W23). Unknown = not shown. Do not add facts without a whitelist entry.
 */

export type ProjectCategory =
  | 'business-systems'
  | 'ai-developer-tools'
  | 'computer-vision-automation';

export interface ProjectLink {
  label: 'GitHub' | 'Live Demo' | 'Docs';
  url: string;
}

export interface DiagramNode {
  id: string;
  label: string;
  detail?: string;
}

export interface DiagramGroup {
  label: string;
  nodes: DiagramNode[];
}

export interface MetricFact {
  value: string;
  label: string;
  /** Whitelist entry id in prime/state/fact-whitelist.md */
  source: string;
}

export interface CaseStudy {
  overview: string;
  problem: string;
  users?: string;
  solution: string;
  /** Build decision: optional — only when a pipeline is stated by the owner or repo (W23 forbids inventing one). */
  workflow?: DiagramNode[];
  architecture: DiagramGroup[];
  architectureNote?: string;
  features?: { name: string; description: string }[];
  challenges?: { problem: string; resolution: string }[];
  decisions?: { choice: string; rationale: string }[];
  dataDesign?: string;
  testing?: string;
  security?: string;
  metrics: MetricFact[];
  screenshots?: string[];
}

export interface HostedProjectBase {
  /** kebab-case route identity: /projects/[slug]; also the React list key */
  slug: string;
  name: string;
  description: string;
  /** Primary link; '' when none is whitelisted — cards must not render a dead anchor. */
  url: string;
  /** Card screenshot in public/; '' → render the card WITHOUT <Image> (empty src breaks prerender). */
  image: string;
  tags: string[];
  category: ProjectCategory;
  highlights: string[];
  links: ProjectLink[];
}

export interface FeaturedProject extends HostedProjectBase {
  featured: true;
  caseStudy: CaseStudy;
}

export interface OtherProject extends HostedProjectBase {
  featured: false;
  caseStudy?: never;
}

export type HostedProject = FeaturedProject | OtherProject;

export const hostedProjects: HostedProject[] = [
  {
    slug: 'quill-mcp',
    name: 'Quill MCP',
    featured: true,
    description:
      'Model Context Protocol server that gives AI assistants persistent, structured memory over a markdown notes vault — create, read, update, move, search, and organize notes across sessions.',
    url: 'https://github.com/Lito016/quill-mcp',
    image: '/project-quill-mcp.png',
    tags: ['TypeScript', 'MCP', 'AI', 'Tooling'],
    category: 'ai-developer-tools',
    highlights: [
      'stdio-based MCP server exposing 49 tools',
      'BM25 smart retrieval over a local markdown vault',
      'Conflict detection and memory consolidation',
      'Persistent memory layer with 16 memory types and lifecycle state machines',
      'Secret detection and project-scoped isolation',
      'Checkpoint-based context reconstruction',
    ],
    links: [{ label: 'GitHub', url: 'https://github.com/Lito016/quill-mcp' }],
    caseStudy: {
      overview:
        'Quill MCP is a Model Context Protocol server for managing a markdown notes vault. It gives AI assistants the ability to create, read, update, delete, move, search, and organize markdown notes with a persistent memory intelligence layer.',
      problem:
        'AI assistants lacked persistent, structured memory across sessions and had no way to manage local knowledge bases.',
      users:
        'Developers running MCP-capable AI assistants who need durable, searchable project knowledge stored locally.',
      solution:
        'A TypeScript MCP server with a persistent memory intelligence layer featuring 16 memory types, lifecycle state machines, secret detection, and project-scoped isolation, fronted by 49 vault tools with BM25 retrieval, conflict detection, memory consolidation, and checkpoint-based context reconstruction.',
      workflow: [
        { id: 'q-agent', label: 'AI Coding Agent', detail: 'Claude / agent runtime' },
        { id: 'q-client', label: 'MCP Client' },
        { id: 'q-server', label: 'Quill MCP', detail: 'stdio · 49 tools' },
        { id: 'q-retrieval', label: 'Retrieval Engine', detail: 'BM25 smart retrieval' },
        { id: 'q-memory', label: 'Memory Layer', detail: '16 memory types' },
        { id: 'q-vault', label: 'Markdown Vault' },
      ],
      architecture: [
        {
          label: 'Assistants',
          nodes: [
            { id: 'q-a1', label: 'AI Coding Agent' },
            { id: 'q-a2', label: 'MCP Client' },
          ],
        },
        {
          label: 'MCP Server',
          nodes: [
            { id: 'q-s1', label: 'Quill MCP (stdio)', detail: 'TypeScript' },
            { id: 'q-s2', label: 'Vault Operations', detail: '49 tools' },
          ],
        },
        {
          label: 'Intelligence',
          nodes: [
            { id: 'q-i1', label: 'BM25 Retrieval' },
            { id: 'q-i2', label: 'Conflict Detection' },
            { id: 'q-i3', label: 'Memory Consolidation' },
            { id: 'q-i4', label: 'Checkpoint Reconstruction' },
          ],
        },
        {
          label: 'Memory & Storage',
          nodes: [
            { id: 'q-m1', label: 'Memory Layer', detail: '16 types · state machines' },
            { id: 'q-m2', label: 'Markdown Vault', detail: 'project-scoped isolation' },
          ],
        },
      ],
      features: [
        { name: 'Vault operations', description: 'Create, read, update, delete, move, search, and organize markdown notes.' },
        { name: 'Smart retrieval', description: 'BM25-ranked search across the vault.' },
        { name: 'Memory intelligence', description: '16 memory types, lifecycle state machines, conflict detection, and consolidation.' },
        { name: 'Context recovery', description: 'Checkpoint-based context reconstruction across sessions.' },
        { name: 'Safety', description: 'Secret detection and project-scoped isolation.' },
      ],
      challenges: [
        {
          problem: 'Memory persisted across sessions had to stay structured and conflict-free.',
          resolution: 'Lifecycle state machines with conflict detection and memory consolidation in the memory layer.',
        },
        {
          problem: 'Assistants need context rebuilt after interruption.',
          resolution: 'Checkpoint-based context reconstruction restores working context from the vault.',
        },
      ],
      decisions: [
        {
          choice: 'stdio MCP server over a hosted service',
          rationale: 'Keeps the knowledge base a local markdown vault that assistants can search and maintain directly.',
        },
      ],
      dataDesign:
        'Notes are stored as markdown files in a local vault; structured memory is kept in 16 memory types with project-scoped isolation.',
      security: 'Secret detection scans content before it enters the memory layer; isolation keeps project scope private.',
      metrics: [
        { value: '49', label: 'MCP tools', source: 'W2' },
        { value: '16', label: 'memory types', source: 'W3' },
      ],
      screenshots: ['/project-quill-mcp.png'],
    },
  },
  {
    slug: 'barangay-digital-portal',
    name: 'Barangay Digital Portal',
    featured: true,
    description:
      'Full-stack barangay service platform: document requests with real-time status tracking, resident and household management, payments, complaints, and announcements.',
    url: 'https://barangay-prototype.pages.dev/',
    image: '/project-barangay.png',
    tags: ['React', 'Inertia.js', 'Laravel', 'MySQL', 'Full-Stack', 'Government'],
    category: 'business-systems',
    highlights: [
      'Document request lifecycle with visible status workflow',
      'Resident management with household relationships',
      'Payments, complaints, and notifications',
      'Real-time updates and support chat',
      'Separate admin and resident roles',
    ],
    links: [{ label: 'Live Demo', url: 'https://barangay-prototype.pages.dev/' }],
    caseStudy: {
      overview:
        'A community platform for digital barangay services: online document requests with real-time tracking, announcements, and resident engagement.',
      problem:
        'Residents lacked a clear digital path for requesting documents and following the status of local services.',
      users: 'Barangay residents requesting services, and barangay staff reviewing and processing those requests.',
      solution:
        'A responsive service portal for document requests, progress tracking, announcements, and community engagement, with an administrative review flow.',
      workflow: [
        { id: 'b-1', label: 'Resident', detail: 'React interface' },
        { id: 'b-2', label: 'Inertia.js', detail: 'app shell' },
        { id: 'b-3', label: 'Laravel', detail: 'server' },
        { id: 'b-4', label: 'MySQL', detail: 'data' },
        { id: 'b-5', label: 'Integrations', detail: 'Payments · Realtime · Email' },
      ],
      architecture: [
        {
          label: 'Resident Services',
          nodes: [
            { id: 'b-r1', label: 'Document Requests', detail: 'status workflow' },
            { id: 'b-r2', label: 'Announcements' },
            { id: 'b-r3', label: 'Complaints' },
            { id: 'b-r4', label: 'Support Chat' },
          ],
        },
        {
          label: 'Administration',
          nodes: [
            { id: 'b-a1', label: 'Request Review' },
            { id: 'b-a2', label: 'Residents & Households' },
            { id: 'b-a3', label: 'Payments' },
            { id: 'b-a4', label: 'Notifications' },
          ],
        },
        {
          label: 'Platform',
          nodes: [
            { id: 'b-p1', label: 'React + Inertia.js' },
            { id: 'b-p2', label: 'Laravel' },
            { id: 'b-p3', label: 'MySQL' },
            { id: 'b-p4', label: 'Realtime Updates' },
          ],
        },
      ],
      features: [
        { name: 'Document requests', description: 'Request submission with a readable status workflow.' },
        { name: 'Resident records', description: 'Resident management and household relationships.' },
        { name: 'Transactions', description: 'Payments and complaints tracked per resident.' },
        { name: 'Engagement', description: 'Announcements, notifications, and support chat.' },
        { name: 'Roles', description: 'Dedicated admin and resident experiences.' },
      ],
      challenges: [
        {
          problem: 'Residents could not follow the status of local service requests.',
          resolution: 'Every request carries a visible status workflow through administrative review.',
        },
      ],
      dataDesign:
        'Relational records for residents, households, document requests, payments, complaints, and announcements in MySQL.',
      metrics: [],
      screenshots: ['/project-barangay.png'],
    },
  },
  {
    slug: 'vision-video-auditor',
    name: 'Vision Video Auditor',
    featured: true,
    description:
      'Computer-vision audit pipeline: YOLO detection over CCTV and video input, timestamped events, automated FFmpeg clip extraction, and an auditor review interface.',
    url: '',
    image: '',
    tags: ['Python', 'FastAPI', 'React', 'YOLO'],
    category: 'computer-vision-automation',
    highlights: [
      'YOLO object detection over CCTV / video sources',
      'Event detection with timestamps',
      'Automated FFmpeg clip extraction',
      'Clip storage for evidence review',
      'Auditor interface with alert workflow',
    ],
    links: [],
    caseStudy: {
      overview:
        'A video auditing system: a FastAPI backend runs YOLO detection on CCTV/video input, records events with timestamps, extracts clips automatically with FFmpeg, stores them, and serves an auditor interface with an alert workflow.',
      problem:
        'Reviewing long CCTV recordings for incidents requires a structured path from detection to evidence — timestamps, clips, and a review surface.',
      solution:
        'A detection-to-review pipeline: YOLO detection with event timestamps, FFmpeg clip extraction, clip storage, and a React auditor interface driving the alert workflow.',
      workflow: [
        { id: 'v-1', label: 'Camera / Recording' },
        { id: 'v-2', label: 'YOLO Detection', detail: 'FastAPI backend' },
        { id: 'v-3', label: 'Event Timestamp' },
        { id: 'v-4', label: 'FFmpeg Clip Extraction', detail: 'automated' },
        { id: 'v-5', label: 'Clip Storage' },
        { id: 'v-6', label: 'Auditor Interface', detail: 'React frontend' },
        { id: 'v-7', label: 'Alert Workflow' },
      ],
      architecture: [
        {
          label: 'Ingest',
          nodes: [{ id: 'v-in', label: 'Camera / Recording', detail: 'CCTV video processing' }],
        },
        {
          label: 'Detection',
          nodes: [
            { id: 'v-de1', label: 'YOLO Detection' },
            { id: 'v-de2', label: 'Event Detection', detail: 'timestamps' },
          ],
        },
        {
          label: 'Evidence',
          nodes: [
            { id: 'v-ev1', label: 'FFmpeg Clip Extraction', detail: 'automated' },
            { id: 'v-ev2', label: 'Clip Storage' },
          ],
        },
        {
          label: 'Review',
          nodes: [
            { id: 'v-rv1', label: 'Auditor Interface', detail: 'React' },
            { id: 'v-rv2', label: 'Alert Workflow' },
          ],
        },
      ],
      architectureNote: 'FastAPI serves the detection and extraction backend; React serves the auditor frontend.',
      metrics: [],
    },
  },
  {
    slug: 'inventory-management-system',
    name: 'Inventory Management System',
    featured: true,
    description:
      'Fabric trading, printing orders, inventory, and finance for one business — React and Supabase, live on Cloudflare Pages.',
    url: 'https://inventory-management-system-55w.pages.dev/',
    image: '/project-inventory.png',
    tags: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Cloudflare Pages'],
    category: 'business-systems',
    highlights: [
      'Finance-first: receivables, payables, payments, overdue tracking, historical debts',
      'B2B fabric trading and B2C printing orders in one operational surface',
      'Inventory, reports, and unified transaction documents',
      'Supabase Postgres with row-level security, auth, and auto-generated REST',
      'React 19 with TanStack Query, React Hook Form and Zod validation',
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/Lito016/Inventory_management_system' },
    ],
    caseStudy: {
      overview:
        'A web-based business management system combining B2B fabric trading and B2C printing operations with finance as the main priority. Inventory, customers and suppliers, reports, and documents are shared across those flows instead of duplicated per module.',
      problem:
        'Trading, printing, and money movement tracked in disconnected tools makes it impossible to answer what is owed, what is overdue, and what stock actually supports an order.',
      users: 'Two Supabase-authenticated roles — Admin (full access, user management, payment voiding) and Staff (all modules except user management).',
      solution:
        'One React application over a Supabase Postgres schema: order pipelines feed shared inventory and party records, and every transaction emits a document and a finance entry, so receivables and payables stay reconciled with operations.',
      workflow: [
        { id: 'i-w1', label: 'Pre-order', detail: 'B2B' },
        { id: 'i-w2', label: 'Purchase Order' },
        { id: 'i-w3', label: 'Receiving', detail: 'variance tracking' },
        { id: 'i-w4', label: 'Fulfillment' },
        { id: 'i-w5', label: 'Payment', detail: 'receivables / payables' },
      ],
      architecture: [
        {
          label: 'Operations',
          nodes: [
            { id: 'im-o1', label: 'B2B Fabric Trading', detail: 'pre-orders to fulfillments' },
            { id: 'im-o2', label: 'B2C Printing', detail: 'production to release' },
            { id: 'im-o3', label: 'Inventory', detail: 'products, adjustments' },
            { id: 'im-o4', label: 'Parties', detail: 'customers, suppliers' },
          ],
        },
        {
          label: 'Finance',
          nodes: [
            { id: 'im-f1', label: 'Receivables' },
            { id: 'im-f2', label: 'Payables' },
            { id: 'im-f3', label: 'Payments' },
            { id: 'im-f4', label: 'Historical Debts' },
          ],
        },
        {
          label: 'Platform',
          nodes: [
            { id: 'im-p1', label: 'React 19', detail: 'Vite 6, Tailwind 4' },
            { id: 'im-p2', label: 'Supabase', detail: 'Postgres, Auth, RLS' },
            { id: 'im-p3', label: 'TanStack Query' },
            { id: 'im-p4', label: 'Cloudflare Pages' },
          ],
        },
        {
          label: 'Outputs',
          nodes: [
            { id: 'im-x1', label: 'Reports', detail: 'sales, aging, inventory' },
            { id: 'im-x2', label: 'Documents', detail: 'print and export' },
          ],
        },
      ],
      architectureNote:
        'React Router v7 guards public auth pages from protected module routes; Supabase serves data through its auto-REST API under Postgres row-level security.',
      dataDesign:
        'Ten ordered Supabase migrations create 20 tables, 5 computed views, 16 triggers, indexes, and RLS policies, so totals and aging derive in the database rather than in the client.',
      security:
        'Supabase Auth with role-scoped access, and row-level security enforced in Postgres on every module table. Only the publishable anon key reaches the browser.',
      metrics: [
        { value: '20', label: 'Postgres tables', source: 'W27' },
        { value: '10', label: 'Ordered migrations', source: 'W27' },
        { value: '16', label: 'Database triggers', source: 'W27' },
      ],
      screenshots: [
        '/project-inventory-dashboard.png',
        '/project-inventory.png',
        '/project-inventory-products.png',
        '/project-inventory-documents.png',
      ],
    },
  },
  {
    slug: 'university-management-system',
    name: 'University Management System',
    featured: false,
    description: 'University management system written in TypeScript.',
    url: 'https://github.com/Lito016/University-Management-System',
    image: '',
    tags: ['TypeScript'],
    category: 'business-systems',
    highlights: [],
    links: [
      { label: 'GitHub', url: 'https://github.com/Lito016/University-Management-System' },
    ],
  },
  {
    slug: 'dish-manager',
    name: 'Dish Manager',
    featured: false,
    description: 'Recipe and meal planning management application.',
    url: 'https://dish-manager-prototype.pages.dev/',
    image: '/project-dish-manager.png',
    tags: ['React', 'Full-Stack', 'Meal Planning'],
    category: 'business-systems',
    highlights: [],
    links: [{ label: 'Live Demo', url: 'https://dish-manager-prototype.pages.dev/' }],
  },
  {
    slug: 'ai-saas-landing',
    name: 'AI SaaS Landing Page',
    featured: false,
    description:
      'Landing page for an AI-powered intelligence platform: autonomous agents and predictive analytics presented with a focused conversion narrative.',
    url: 'https://ai-saas-landing.pages.dev/',
    image: '/project-ai-saas.png',
    tags: ['Next.js', 'AI', 'SaaS'],
    category: 'ai-developer-tools',
    highlights: [],
    links: [{ label: 'Live Demo', url: 'https://ai-saas-landing.pages.dev/' }],
  },
];

export const featuredProjects = hostedProjects.filter(
  (project): project is FeaturedProject => project.featured
);

export const otherProjects = hostedProjects.filter(
  (project): project is OtherProject => !project.featured
);

export const categoryLabels: Record<ProjectCategory, string> = {
  'business-systems': 'Business & Management Systems',
  'ai-developer-tools': 'AI & Developer Tools',
  'computer-vision-automation': 'Computer Vision & Automation',
};

export interface WhatIBuildCategory {
  category: ProjectCategory;
  title: string;
  blurb: string;
  examples: string[];
}

/** Category examples verbatim from the owner brief (fact-whitelist W21). */
export const whatIBuildCategories: WhatIBuildCategory[] = [
  {
    category: 'business-systems',
    title: categoryLabels['business-systems'],
    blurb:
      'Operational systems that model real workflows — records, roles, approvals, and reporting — end to end.',
    examples: [
      'Inventory',
      'Finance',
      'Procurement',
      'Sales',
      'Queue management',
      'Government services',
      'Operations systems',
    ],
  },
  {
    category: 'ai-developer-tools',
    title: categoryLabels['ai-developer-tools'],
    blurb:
      'Infrastructure that makes AI usable in production: agent tooling, memory, and evaluation.',
    examples: [
      'MCP servers',
      'AI agent infrastructure',
      'Prompt engineering systems',
      'Developer tooling',
      'Evaluation systems',
      'Knowledge and memory systems',
    ],
  },
  {
    category: 'computer-vision-automation',
    title: categoryLabels['computer-vision-automation'],
    blurb:
      'Detection pipelines that turn raw video into events, clips, and monitoring workflows.',
    examples: [
      'YOLO detection',
      'CCTV processing',
      'Video event detection',
      'Automated clip extraction',
      'Monitoring workflows',
    ],
  },
];
