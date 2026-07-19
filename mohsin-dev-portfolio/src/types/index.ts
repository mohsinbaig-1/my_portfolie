export type NavLink = {
  label: string;
  href: string;
};

export type SkillTag = {
  name: string;
  note?: string;
};

export type SkillCategory = {
  id: string;
  title: string;
  icon: string;
  skills: SkillTag[];
};

export type ProjectMedia = {
  type: "image" | "gif" | "video";
  src: string;
  alt: string;
  caption?: string;
};

export type SystemBreakdown = {
  id: string;
  title: string;
  description: string;
  highlights: string[];
};

export type BlueprintScreenshot = {
  src: string;
  alt: string;
  caption: string;
};

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  techStack: string[];
  features: string[];
  technicalBreakdown: string[];
  challenges: string[];
  architecture: string[];
  role: string;
  timeline: string;
  lessonsLearned: string[];
  futureRoadmap?: string[];
  githubUrl?: string;
  repoUrl?: string;
  liveUrl?: string;
  demoUrl?: string;
  videoUrl?: string;
  category: "game" | "web" | "mobile";
  featured?: boolean;
  pinned?: boolean;
  media?: ProjectMedia[];
  blueprintScreenshots?: BlueprintScreenshot[];
  systemsBreakdown?: SystemBreakdown[];
};

export type TimelineItem = {
  id: string;
  period: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
};

export type ShowcaseItem = {
  id: string;
  title: string;
  type: "video" | "gif" | "image";
  src: string;
  thumbnail?: string;
  projectId: string;
  videoUrl?: string;
};

export type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
  updated_at: string;
  topics?: string[];
  pushed_at?: string;
};

export type GitHubProfile = {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
};

export type GitHubStats = {
  profile: GitHubProfile | null;
  repos: GitHubRepo[];
  pinnedRepos: GitHubRepo[];
  languages: { name: string; count: number; color: string }[];
  totalStars: number;
  recentActivity: number;
};

export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type BuildingPlan = {
  title: string;
  description: string;
  status: "active" | "planned";
};
