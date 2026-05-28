import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "f18-jet",
    title: "F18 Fighter Jet Simulation",
    description:
      "UE5 aircraft flight simulation with physics-based movement, realistic throttle and control surfaces, and immersive cockpit-style handling.",
    image: "/images/projects/f18-jet.svg",
    techStack: ["Unreal Engine 5", "Blueprints", "Physics", "Simulation"],
    features: [
      "Aircraft flight simulation",
      "Physics-based movement",
      "Realistic flight controls",
      "Vehicle simulation systems",
    ],
    githubUrl: "https://github.com/mohsinbaig-1",
    category: "game",
  },
  {
    id: "fps-game",
    title: "FPS Game (UE5)",
    description:
      "First-person shooter built in Unreal Engine 5 featuring weapon handling, shooting mechanics, and foundational enemy AI behavior.",
    image: "/images/projects/fps-game.svg",
    techStack: ["Unreal Engine 5", "Blueprints", "AI", "Gameplay"],
    features: [
      "First-person shooter mechanics",
      "Weapon system",
      "Enemy AI (basic)",
      "Shooting & damage flow",
    ],
    githubUrl: "https://github.com/mohsinbaig-1",
    category: "game",
  },
  {
    id: "hospital",
    title: "Hospital Management System",
    description:
      "University software engineering project for managing patients, appointments, and administrative workflows with full CRUD operations.",
    image: "/images/projects/hospital.svg",
    techStack: ["PHP", "MySQL", "HTML/CSS", "JavaScript"],
    features: [
      "Patient management",
      "CRUD operations",
      "Admin panel",
      "Role-based access",
    ],
    githubUrl: "https://github.com/mohsinbaig-1",
    category: "web",
  },
  {
    id: "assignment-portal",
    title: "Assignment Submission Portal",
    description:
      "Web portal enabling students to upload assignments and teachers to review, grade, and track submissions in one streamlined flow.",
    image: "/images/projects/assignment.svg",
    techStack: ["PHP", "MySQL", "File Upload", "Admin Dashboard"],
    features: [
      "Student submission system",
      "File upload handling",
      "Teacher review workflow",
      "Submission tracking",
    ],
    githubUrl: "https://github.com/mohsinbaig-1",
    category: "web",
  },
  {
    id: "recipe-app",
    title: "Recipe Mobile App",
    description:
      "Flutter mobile application with Firebase backend for browsing recipes, saving favorites, and clean, intuitive UI patterns.",
    image: "/images/projects/recipe.svg",
    techStack: ["Flutter", "Firebase", "Dart", "Mobile UI"],
    features: [
      "Recipe listing",
      "Favorites system",
      "Firebase integration",
      "Simple, responsive UI",
    ],
    githubUrl: "https://github.com/mohsinbaig-1",
    category: "mobile",
  },
];
