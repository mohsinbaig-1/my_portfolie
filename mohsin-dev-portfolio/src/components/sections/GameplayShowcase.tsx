"use client";

import { AnimatedBorder } from "@/components/effects/AnimatedBorder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { showcaseItems } from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FaPlay } from "react-icons/fa6";

export function GameplayShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = showcaseItems[activeIndex];

  return (
    <section
      id="showcase"
      className="relative py-28 px-4 sm:px-6 lg:px-8"
      aria-labelledby="showcase-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.06),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Gameplay Showcase"
          title="Systems in Motion"
          description="Gameplay captures, visual galleries, and interactive previews of UE5 work."
        />

        <AnimatedBorder>
          <div className="p-4 md:p-6">
            <div className="relative aspect-video overflow-hidden rounded-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={active.src}
                    alt={active.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <p className="text-lg font-bold text-white">{active.title}</p>
                    <p className="text-sm text-gray-400 capitalize">{active.type} preview</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/50 bg-cyan-500/20 backdrop-blur-md">
                      <FaPlay className="h-6 w-6 text-cyan-300" />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {showcaseItems.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`group relative aspect-video overflow-hidden rounded-lg border transition-all duration-300 ${
                    index === activeIndex
                      ? "border-cyan-400/60 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                      : "border-white/10 hover:border-cyan-400/30"
                  }`}
                  aria-label={`Show ${item.title}`}
                  aria-pressed={index === activeIndex}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="200px"
                  />
                  <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/20" />
                </button>
              ))}
            </div>
          </div>
        </AnimatedBorder>
      </div>
    </section>
  );
}
