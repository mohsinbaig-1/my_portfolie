"use client";

import { AnimatedBorder } from "@/components/effects/AnimatedBorder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillCategories } from "@/data/skills";
import { motion } from "framer-motion";
import { FaCode, FaGamepad, FaWrench } from "react-icons/fa6";

const iconMap = {
  gamepad: FaGamepad,
  code: FaCode,
  wrench: FaWrench,
};

export function Skills() {
  return (
    <section
      id="skills"
      className="section-shell relative"
      aria-labelledby="skills-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.05),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Skills"
          title="Technical Arsenal"
          description="Categorized expertise across gameplay systems, programming, and production tools."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {skillCategories.map((category, catIndex) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap] ?? FaCode;
            return (
              <AnimatedBorder key={category.id}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIndex * 0.1 }}
                  className="p-6 md:p-8"
                >
                  <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-xl bg-gradient-to-br from-cyan-500/18 to-blue-500/10 p-3">
                      <Icon className="h-6 w-6 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{category.title}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: catIndex * 0.05 + skillIndex * 0.02 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="group inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300 transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-200 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                      >
                        {skill.name}
                        {skill.note && (
                          <span className="rounded bg-sky-500/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-sky-200">
                            {skill.note}
                          </span>
                        )}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </AnimatedBorder>
            );
          })}
        </div>
      </div>
    </section>
  );
}
