/** GitHub user profile data */
export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

/** GitHub repository data */
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  homepage: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  default_branch: string;
  license: GitHubLicense | null;
}

/** GitHub license info */
export interface GitHubLicense {
  key: string;
  name: string;
  spdx_id: string;
  url: string | null;
}

/** GitHub event/activity */
export interface GitHubEvent {
  id: string;
  type: string;
  repo: {
    name: string;
    url: string;
  };
  payload: Record<string, unknown>;
  created_at: string;
  actor: {
    display_login: string;
    avatar_url: string;
  };
}

/** Language breakdown */
export interface LanguageStats {
  [language: string]: number;
}

/** Contribution day */
export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

/** Contribution calendar */
export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

/** Contribution week */
export interface ContributionWeek {
  days: ContributionDay[];
}

/** GitHub stats aggregate */
export interface GitHubStats {
  totalStars: number;
  totalForks: number;
  totalRepos: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  languageStats: LanguageStats;
  topLanguages: { name: string; bytes: number; percentage: number }[];
  contributionGraph: ContributionCalendar | null;
  currentStreak: number;
  longestStreak: number;
}

/** Skill item */
export interface Skill {
  name: string;
  icon?: string;
  level?: number;
  category: string;
}

/** Skill category */
export interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

/** Experience entry */
export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
  startDate: string;
  endDate: string | 'Present';
  description: string[];
  technologies: string[];
  logo?: string;
}

/** Education entry */
export interface Education {
  id: string;
  degree: string;
  school: string;
  schoolUrl?: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
  gpa?: string;
  courses?: string[];
}

/** Certification entry */
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuerUrl?: string;
  date: string;
  expirationDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  icon?: string;
  description?: string;
}

/** Achievement entry */
export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon?: string;
  url?: string;
}

/** Testimonial entry */
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  content: string;
  relationship: string;
}

/** Blog post metadata */
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  updatedDate?: string;
  tags: string[];
  coverImage?: string;
  readingTime: number;
  published: boolean;
}

/** Uses item */
export interface UsesItem {
  category: string;
  items: {
    name: string;
    description: string;
    url?: string;
  }[];
}

/** Navigation item */
export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

/** Contact form data */
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/** Site configuration */
export interface SiteConfig {
  name: string;
  displayName: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  github: string;
  email: string;
  twitter?: string;
  linkedin?: string;
  resumeUrl?: string;
}

/** Person displayed by the reusable team banner. */
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  handle: string;
  profileImage?: string;
  bio?: string;
  availability?: string;
  phone?: string;
  phoneLabel?: string;
  email?: string;
  linkedin?: string;
  website?: string;
  websiteLabel?: string;
}
