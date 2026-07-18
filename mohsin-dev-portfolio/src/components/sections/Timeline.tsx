"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { timelineItems } from "@/data/timeline";
import { motion } from "framer-motion";

export function Timeline() {
  return (
    <section id="timeline" className="py-28 px-4 sm:px-6 lg:px-8" aria-labelledby="timeline-heading">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Journey"
          title="Professional Timeline"
          description="From first Blueprint to flagship gameplay systems."
        />

        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-cyan-400/50 via-purple-400/30 to-transparent md:left-1/2 md:-translate-x-px" />

          {timelineItems.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                className={`relative mb-12 flex flex-col md:flex-row ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="hidden w-1/2 md:block" />
                <div
                  className={`w-full pl-12 md:w-1/2 md:pl-0 ${
                    isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                  }`}
                >
                  <div className="glass-card rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                      {item.period}
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-sm font-medium text-purple-300">{item.subtitle}</p>
                    <p className="mt-3 text-sm leading-relaxed text-gray-400">{item.description}</p>
                    <ul className={`mt-4 space-y-1 ${isEven ? "md:text-right" : ""}`}>
                      {item.highlights.map((h) => (
                        <li key={h} className="text-xs text-gray-500">
                          · {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="absolute left-4 top-6 flex h-3 w-3 -translate-x-1/2 items-center justify-center md:left-1/2">
                  <span className="absolute h-6 w-6 animate-ping rounded-full bg-cyan-400/20" />
                  <span className="relative h-3 w-3 rounded-full border-2 border-cyan-400 bg-[#050816]" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
