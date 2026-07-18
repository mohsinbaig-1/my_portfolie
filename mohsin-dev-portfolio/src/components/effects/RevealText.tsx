"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type RevealTextProps = {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

export function RevealText({ text, className, delay = 0, as = "p" }: RevealTextProps) {
  const Tag = motion[as];

  return (
    <Tag
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {text}
    </Tag>
  );
}
