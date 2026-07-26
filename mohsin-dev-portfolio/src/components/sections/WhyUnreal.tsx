"use client";

import { AnimatedBorder } from "@/components/effects/AnimatedBorder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whyUnrealPoints } from "@/data/site";
import { motion } from "framer-motion";
import { FaBolt, FaLayerGroup, FaRocket, FaCode } from "react-icons/fa6";

const icons = [FaCode, FaBolt, FaRocket, FaLayerGroup];

export function WhyUnreal() {
  return (
    <section id="why-unreal" className="section-shell relative" aria-labelledby="why-unreal-heading">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Engine Choice"
          title="Why Unreal Engine"
          description="The production pipeline, performance ceiling, and architecture that match my gameplay programming goals."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {whyUnrealPoints.map((point, index) => {
            const Icon = icons[index] ?? FaCode;
            return (
              <AnimatedBorder key={point.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-6 md:p-8"
                >
                  <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-cyan-500/18 to-blue-500/10 p-3 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{point.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-400">{point.description}</p>
                </motion.div>
              </AnimatedBorder>
            );
          })}
        </div>
      </div>
    </section>
  );
}
