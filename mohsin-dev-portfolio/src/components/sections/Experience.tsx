"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experienceTimeline } from "@/data/experience";
import { motion } from "framer-motion";

export function Experience() {
  return (
    <section
      id="experience"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-white/[0.02]"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Journey"
          title="Experience Timeline"
          description="Academic foundation, UE5 learning path, and hands-on game projects."
        />

        <div className="relative">
          <div
            className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 md:left-1/2 md:block md:-translate-x-px"
            aria-hidden
          />

          <div className="space-y-8">
            {experienceTimeline.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative md:w-1/2 ${
                  index % 2 === 0 ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"
                }`}
              >
                <div
                  className="absolute left-4 top-6 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)] md:left-auto md:right-0 md:translate-x-1/2 [[data-side=left]_&]:md:left-0 [[data-side=left]_&]:md:right-auto"
                  style={{
                    ...(index % 2 === 0
                      ? { right: "-1.5rem", left: "auto" }
                      : { left: "-1.5rem", right: "auto" }),
                  }}
                />

                <GlassCard className="ml-10 md:ml-0">
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                    {item.period}
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-sm font-medium text-purple-300">{item.organization}</p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-400">{item.description}</p>
                  <ul className="mt-4 space-y-2">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
