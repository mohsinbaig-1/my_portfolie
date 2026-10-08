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
      className={cn("relative mb-10 text-left md:mb-14", className)}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none left-0 top-0 h-px w-28 bg-gradient-to-r from-amber-300/70 to-transparent"
        initial={{ opacity: 0, scaleX: 0.2 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />

      {eyebrow && (
        <motion.p
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
          className="mb-3 font-[family-name:var(--font-orbitron)] text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-200"
        >
          {eyebrow}
        </motion.p>
      )}

      <motion.h2
        variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
        className="max-w-3xl font-[family-name:var(--font-orbitron)] bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl lg:text-5xl"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
          className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg"
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
        className="mt-6 h-px w-24 origin-left bg-gradient-to-r from-amber-300/60 to-transparent"
      />
    </motion.div>
  );
}