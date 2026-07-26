"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";

type AnimatedBorderProps = {
  children: ReactNode;
  className?: string;
};

export function AnimatedBorder({ children, className }: AnimatedBorderProps) {
  const updatePointer = (event: PointerEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();

    element.style.setProperty("--pointer-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    element.style.setProperty("--pointer-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  };

  const resetPointer = (event: PointerEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    element.style.setProperty("--pointer-x", "50%");
    element.style.setProperty("--pointer-y", "50%");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className={cn(
        "group animated-border relative rounded-[1.4rem] p-[1px] transition-transform duration-300",
        className,
      )}
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-[calc(1.4rem-1px)] border border-white/5 bg-[#050816]/82 backdrop-blur-xl transition-transform duration-300"
        onPointerMove={updatePointer}
        onPointerLeave={resetPointer}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at var(--pointer-x, 50%) var(--pointer-y, 50%), rgba(34,211,238,0.16), transparent 42%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(115deg, transparent 18%, rgba(255,255,255,0.06) 35%, transparent 50%, rgba(255,255,255,0.04) 68%, transparent 82%)",
            mixBlendMode: "screen",
          }}
        />
        {children}
      </div>
    </motion.div>
  );
}