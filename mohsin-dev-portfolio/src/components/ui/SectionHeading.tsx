"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  id,
}: SectionHeadingProps) {
  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { staggerChildren: 0.08, delayChildren: 0.05 },
        },
      }}
      className={cn("relative mb-12 text-center md:mb-16", className)}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-1/2 top-0 h-px w-44 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent"
        initial={{ opacity: 0, scaleX: 0.2 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />

      {eyebrow && (
        <motion.p
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
          className="mb-3 font-[family-name:var(--font-orbitron)] text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300"
        >
          {eyebrow}
        </motion.p>
      )}

      <motion.h2
        variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
        className="font-[family-name:var(--font-orbitron)] bg-gradient-to-r from-white via-slate-100 to-cyan-100 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl lg:text-5xl"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
          className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg"
        >
          {description}
        </motion.p>
      )}

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scaleX: 0.3 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay: 0.15 }}
        className="mx-auto mt-6 h-px w-24 origin-center bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />
    </motion.div>
  );
}