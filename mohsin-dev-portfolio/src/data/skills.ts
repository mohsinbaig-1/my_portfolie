import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "unreal",
    title: "Unreal Engine / Game Dev",
    icon: "gamepad",
    skills: [
      { name: "Unreal Engine 5", level: 50 },
      { name: "Blueprint Scripting", level: 50 },
      { name: "C++", level: 50 },
      { name: "FPS Game Development", level: 55 },
      { name: "Vehicle Simulation", level: 55 },
      { name: "Gameplay Systems", level: 50 },
    ],
  },
  {
    id: "programming",
    title: "Programming",
    icon: "code",
    skills: [
      { name: "PHP", level: 30 },
      { name: "JavaScript", level: 10 },
      { name: "Flutter", level: 40 },
      { name: "MySQL", level: 30 },
    ],
  },
  {
    id: "engineering",
    title: "Engineering Fundamentals",
    icon: "cpu",
    skills: [
      { name: "Object-Oriented Programming", level: 65 },
      { name: "Problem Solving", level: 70 },
      { name: "Basic Design Patterns", level: 45 },
      { name: "Software Engineering Concepts", level: 60 },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    icon: "wrench",
    skills: [
      { name: "Git", level: 30 },
      { name: "GitHub", level: 30 },
      { name: "Visual Studio", level: 45 },
      { name: "VS Code", level: 55 },
    ],
  },
];
