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

/** Navigation item */
export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  children?: NavItem[];
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
  linkedin?: string;
}
