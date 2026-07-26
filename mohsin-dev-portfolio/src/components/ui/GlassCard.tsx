"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function GlassCard({ children, className, delay = 0 }: GlassCardProps) {
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
      initial={{ opacity: 0, y: 24, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className={cn(
        "group relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-[border-color,box-shadow,transform] duration-300",
        "hover:border-cyan-300/25 hover:shadow-[0_24px_70px_rgba(0,0,0,0.34)]",
        className,
      )}
      onPointerMove={updatePointer}
      onPointerLeave={resetPointer}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at var(--pointer-x, 50%) var(--pointer-y, 50%), rgba(255,255,255,0.08), transparent 40%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04),transparent_35%,rgba(255,255,255,0.08)_50%,transparent_65%,rgba(255,255,255,0.03))] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ mixBlendMode: "screen" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[1.4rem] ring-1 ring-inset ring-white/5"
      />
      {children}
    </motion.div>
  );
}