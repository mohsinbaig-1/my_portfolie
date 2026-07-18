import type { TimelineItem } from "@/types";

export const timelineItems: TimelineItem[] = [
  {
    id: "learning-unreal",
    period: "2023",
    title: "Learning Unreal Engine",
    subtitle: "Foundation Phase",
    description:
      "Started with UE5 fundamentals—Blueprints, level design workflows, and understanding the actor-component model that underpins all gameplay systems.",
    highlights: [
      "Actor-Component architecture",
      "Blueprint event graphs",
      "UMG UI fundamentals",
      "Project structure & packaging",
    ],
  },
  {
    id: "first-fps",
    period: "2024",
    title: "First FPS Prototype",
    subtitle: "Combat Systems",
    description:
      "Built a first-person shooter prototype focusing on weapon feel, hit detection, crosshair feedback, and foundational enemy AI engagement loops.",
    highlights: [
      "Weapon & projectile systems",
      "Hit detection pipeline",
      "Health & damage flow",
      "Basic AI targeting",
    ],
  },
  {
    id: "vehicle-sim",
    period: "2024",
    title: "Vehicle Simulation",
    subtitle: "F18 Fighter Jet",
    description:
      "Developed physics-driven flight controls with throttle, pitch, roll, and camera systems—translating real-world control concepts into playable simulation.",
    highlights: [
      "Chaos / physics integration",
      "Flight input mapping",
      "Camera follow systems",
      "Simulation tuning",
    ],
  },
  {
    id: "zombie-hunter",
    period: "2025",
    title: "Zombie Hunter",
    subtitle: "Flagship Project",
    description:
      "Shipped a full gameplay vertical slice—enemy detection, combat AI, weapon systems, animation blueprints, and modular component architecture.",
    highlights: [
      "Behavior Tree AI",
      "Detection & aggro systems",
      "Weapon & damage components",
      "Performance optimization pass",
    ],
  },
  {
    id: "current",
    period: "2026",
    title: "Current Learning",
    subtitle: "Production Depth",
    description:
      "Deepening C++ gameplay patterns, EQS-driven AI, inventory/quest frameworks, and multiplayer replication foundations for studio-grade workflows.",
    highlights: [
      "Advanced AI & EQS",
      "C++ gameplay modules",
      "Multiplayer replication basics",
      "Procedural encounter design",
    ],
  },
];
