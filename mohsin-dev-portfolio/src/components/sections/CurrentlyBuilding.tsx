"use client";

import { AnimatedBorder } from "@/components/effects/AnimatedBorder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { currentlyBuilding, futurePlans } from "@/data/site";
import { motion } from "framer-motion";
import { FaHammer, FaRoad } from "react-icons/fa6";

export function CurrentlyBuilding() {
  return (
    <section
      id="building"
      className="section-shell relative"
      aria-labelledby="building-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.04),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="In Development"
          title="Currently Building"
          description="Active development on the next evolution of my UE5 gameplay portfolio."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <AnimatedBorder>
            <div className="p-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl bg-cyan-500/15 p-3">
                  <FaHammer className="h-5 w-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                    Currently Developing
                  </p>
                  <h3 className="text-2xl font-bold text-white">{currentlyBuilding.title}</h3>
                </div>
              </div>
              <p className="leading-relaxed text-gray-400">{currentlyBuilding.description}</p>
              <ul className="mt-6 space-y-2">
                {currentlyBuilding.activeSystems.map((system, i) => (
                  <motion.li
                    key={system}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-2 text-sm text-gray-300"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    {system}
                  </motion.li>
                ))}
              </ul>
            </div>
          </AnimatedBorder>

          <AnimatedBorder>
            <div className="p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-amber-500/12 p-3">
                  <FaRoad className="h-5 w-5 text-amber-300" />
                </div>
                <h3 className="text-xl font-bold text-white">Future Plans</h3>
              </div>
              <div className="space-y-4">
                {futurePlans.map((plan, i) => (
                  <motion.div
                    key={plan.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-amber-300/25"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-semibold text-white">{plan.title}</h4>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          plan.status === "active"
                            ? "bg-cyan-500/18 text-cyan-200"
                              : "bg-amber-500/15 text-amber-200"
                        }`}
                      >
                        {plan.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-400">{plan.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedBorder>
        </div>
      </div>
    </section>
  );
}
