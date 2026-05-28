import type { TimelineItem, Certification } from "@/types";

export const experienceTimeline: TimelineItem[] = [
  {
    id: "academic",
    period: "2022 — Present",
    title: "BS Software Engineering",
    organization: "COMSATS University Islamabad, Sahiwal Campus",
    description:
      "5th semester student building a strong foundation in software engineering while specializing in game development coursework and personal UE5 projects.",
    highlights: [
      "CGPA: 3.13",
      "Focus on game development & system design",
      "Hands-on university software projects",
    ],
  },
  {
    id: "ue5-path",
    period: "2024 — Present",
    title: "Unreal Engine 5 Learning Path",
    organization: "Self-Directed + Coursera",
    description:
      "Structured learning in UE5 Blueprints, C++, gameplay frameworks, and simulation mechanics through courses and iterative project builds.",
    highlights: [
      "Coursera UE basics certification",
      "Blueprint & C++ hybrid workflows",
      "FPS and vehicle simulation focus",
    ],
  },
  {
    id: "projects",
    period: "2024 — Present",
    title: "Personal Game Projects",
    organization: "Independent Development",
    description:
      "Building portfolio-ready UE5 experiences including F18 jet simulation and FPS prototypes to demonstrate internship-ready gameplay skills.",
    highlights: [
      "F18 Fighter Jet Simulation",
      "FPS weapon & AI systems",
      "Physics-driven gameplay loops",
    ],
  },
];

export const certifications: Certification[] = [
  {
    id: "ue-coursera",
    title: "Unreal Engine Basic Course",
    issuer: "Coursera",
    year: "2024",
    credentialUrl: "https://www.coursera.org",
  },
  {
    id: "git-github",
    title: "Version Control with Git & GitHub",
    issuer: "Self-Study / University Labs",
    year: "2024",
  },
  {
    id: "flutter-firebase",
    title: "Flutter & Firebase Mobile Development",
    issuer: "Personal Project Track",
    year: "2024",
  },
  {
    id: "software-eng",
    title: "Software Engineering Fundamentals",
    issuer: "COMSATS University",
    year: "2025",
  },
];
