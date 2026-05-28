"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function GlassCard({ children, className, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl",
        "hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.12)] transition-all duration-300",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
