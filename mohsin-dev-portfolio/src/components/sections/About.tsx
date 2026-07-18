"use client";

import { AnimatedBorder } from "@/components/effects/AnimatedBorder";
import { RevealText } from "@/components/effects/RevealText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";
import { motion } from "framer-motion";
import { FaBrain, FaCrosshairs, FaGamepad, FaRocket } from "react-icons/fa6";

const focusIcons = [FaGamepad, FaBrain, FaCrosshairs, FaRocket];

export function About() {
  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8" aria-labelledby="about-heading">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.08),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="About"
          title="Gameplay Systems Engineer"
          description="Building combat, AI, and simulation with production-minded architecture."
        />

        <div className="grid gap-8 lg:grid-cols-5">
          <AnimatedBorder className="lg:col-span-3">
            <div className="p-8 md:p-10">
              <RevealText
                as="p"
                text={siteConfig.summary}
                className="text-lg leading-relaxed text-gray-300"
              />
              <RevealText
                as="p"
                text={siteConfig.story}
                delay={0.15}
                className="mt-6 leading-relaxed text-gray-400"
              />
              <RevealText
                as="p"
                text={siteConfig.careerGoal}
                delay={0.3}
                className="mt-6 border-l-2 border-cyan-400/50 pl-4 font-medium text-cyan-300"
              />
            </div>
          </AnimatedBorder>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
            {siteConfig.focusAreas.slice(0, 4).map((area, i) => {
              const Icon = focusIcons[i] ?? FaGamepad;
              return (
                <motion.div
                  key={area}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 p-3 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5 text-cyan-400" />
                    </div>
                    <span className="font-semibold text-white">{area}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {siteConfig.focusAreas.map((area, i) => (
            <motion.span
              key={area}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-gray-300 backdrop-blur-sm transition-colors hover:border-cyan-400/30 hover:text-cyan-300"
            >
              {area}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
