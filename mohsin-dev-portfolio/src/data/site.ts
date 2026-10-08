import type { BuildingPlan, NavLink } from "@/types";

export const siteConfig = {
  name: "Mohsin Baig",
  title: "Gameplay Programmer",
  subtitle: "Unreal Engine 5 Developer · Software Engineer",
  email: "mohsin.baig17423@gmail.com",
  phone: "03097287965",
  location: "Sahiwal, Punjab, Pakistan",
  github: "https://github.com/mohsinbaig-1",
  githubUsername: "mohsinbaig-1",
  linkedin: "https://www.linkedin.com/in/mr-mohsin-660372341/",
  resumePath: "/resume/mohsin-baig-resume.pdf",
  typingRoles: [
    "Gameplay Programmer",
    "Unreal Engine 5 Developer",
    "Software Engineer",
    "AI & Combat Systems Builder",
  ],
  summary: `I build gameplay systems that feel responsive, readable, and production-minded. My work centers on Unreal Engine 5—designing enemy AI, combat loops, weapon handling, and simulation-driven movement with a strong Blueprint architecture backed by C++ thinking.`,
  story: `Game development started as curiosity and became engineering discipline. I stopped treating projects as demos and started treating them as systems: modular components, clear state machines, damage pipelines, and AI that reacts with intent. Every prototype is an opportunity to refine architecture, optimize performance, and ship mechanics that feel like they belong in a AAA pipeline.`,
  focusAreas: [
    "Gameplay Programming",
    "Artificial Intelligence",
    "FPS Systems",
    "Combat Mechanics",
    "Simulation",
    "Blueprint Architecture",
    "C++",
    "Optimization",
    "Software Engineering Principles",
  ],
  careerGoal: `Targeting gameplay programming roles at studios building immersive action, shooter, and simulation experiences—contributing to AI behavior, combat systems, and scalable UE5 architecture from day one.`,
  whyUE5: `Unreal Engine combines high-performance C++ with rapid Blueprint iteration—the same dual workflow used across AAA production. Nanite, Lumen, Chaos, and the Gameplay Ability System ecosystem make UE5 the engine I trust for building combat, AI, and simulation at scale.`,
  emailjs: {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
  },
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Building", href: "#building" },
  { label: "Contact", href: "#contact" },
];

export const whyUnrealPoints = [
  {
    title: "Blueprint + C++",
    description:
      "Prototype fast in Blueprint, promote performance-critical paths to C++. The same pipeline used across AAA teams for iteration without sacrificing runtime quality.",
  },
  {
    title: "High Performance",
    description:
      "Built for real-time action—Chaos physics, Niagara VFX, and scalable rendering that supports dense combat and simulation workloads.",
  },
  {
    title: "AAA Production Pipeline",
    description:
      "Industry-standard tooling for animation, AI, navigation, multiplayer foundations, and content workflows used by Epic, CD Projekt Red, and top-tier studios.",
  },
  {
    title: "Gameplay Architecture",
    description:
      "Components, interfaces, subsystems, and data-driven design patterns that keep gameplay code modular, testable, and team-ready.",
  },
];

export const currentlyBuilding = {
  title: "Zombie Survival Game",
  description:
    "Expanding my flagship UE5 project into a full survival loop—layering inventory, quests, advanced AI states, and performance-conscious world systems on top of proven combat architecture.",
  activeSystems: [
    "Advanced AI behavior layers",
    "Inventory & equipment pipeline",
    "Quest & objective framework",
    "Multiplayer foundations",
    "Procedural encounter systems",
  ],
};

export const futurePlans: BuildingPlan[] = [
  {
    title: "Advanced AI",
    description: "EQS-driven flanking, group coordination, and dynamic difficulty scaling.",
    status: "active",
  },
  {
    title: "Inventory System",
    description: "Data-driven items, equipment slots, and UI binding through UMG.",
    status: "active",
  },
  {
    title: "Quest System",
    description: "Objective chains, world triggers, and narrative state tracking.",
    status: "planned",
  },
  {
    title: "Multiplayer",
    description: "Replication-aware combat, shared AI authority, and session flow.",
    status: "planned",
  },
  {
    title: "Procedural Systems",
    description: "Spawn tables, loot distribution, and runtime encounter variation.",
    status: "planned",
  },
];
