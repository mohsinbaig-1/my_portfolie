export type NavLink = {
  label: string;
  href: string;
};

export type Skill = {
  name: string;
  level: number;
};

export type SkillCategory = {
  id: string;
  title: string;
  icon: string;
  skills: Skill[];
};

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: "game" | "web" | "mobile";
};

export type TimelineItem = {
  id: string;
  period: string;
  title: string;
  organization: string;
  description: string;
  highlights: string[];
};

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
};

export type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
  updated_at: string;
};

export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
