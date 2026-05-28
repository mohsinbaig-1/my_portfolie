"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillBar } from "@/components/ui/SkillBar";
import { skillCategories } from "@/data/skills";
import { Code2, Cpu, Gamepad2, Wrench } from "lucide-react";

const iconMap = {
  gamepad: Gamepad2,
  code: Code2,
  cpu: Cpu,
  wrench: Wrench,
};

export function Skills() {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 bg-white/[0.02]" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Skills"
          title="Technical Arsenal"
          description="Animated proficiency across game development, programming, and engineering fundamentals."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {skillCategories.map((category, catIndex) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap] ?? Code2;
            return (
              <GlassCard key={category.id} delay={catIndex * 0.1}>
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 p-3">
                    <Icon className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{category.title}</h3>
                </div>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={catIndex * 0.1 + skillIndex * 0.05}
                    />
                  ))}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
