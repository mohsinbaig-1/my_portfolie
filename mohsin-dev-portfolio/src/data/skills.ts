import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "gameplay",
    title: "Gameplay Programming",
    icon: "gamepad",
    skills: [
      { name: "Unreal Engine 5" },
      { name: "Blueprint" },
      { name: "C++" },
      { name: "AI Behavior Trees" },
      { name: "EQS" },
      { name: "Gameplay Ability Concepts" },
      { name: "Input System" },
      { name: "Animation Blueprint" },
      { name: "State Machines" },
      { name: "Components" },
      { name: "Interfaces" },
      { name: "Niagara" },
      { name: "UMG" },
      { name: "Physics" },
      { name: "Navigation" },
      { name: "Multiplayer Basics" },
    ],
  },
  {
    id: "programming",
    title: "Programming",
    icon: "code",
    skills: [
      { name: "C++" },
      { name: "Java" },
      { name: "PHP" },
      { name: "JavaScript" },
      { name: "Flutter" },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    icon: "wrench",
    skills: [
      { name: "Rider" },
      { name: "Visual Studio" },
      { name: "VS Code" },
      { name: "Git" },
      { name: "GitHub" },
      { name: "Perforce", note: "Learning" },
      { name: "Blender", note: "Basic" },
    ],
  },
];
