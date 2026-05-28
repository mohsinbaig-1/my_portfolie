"use client";

import { motion } from "framer-motion";

type SkillBarProps = {
  name: string;
  level: number;
  delay?: number;
};

export function SkillBar({ name, level, delay = 0 }: SkillBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-gray-200">{name}</span>
        <span className="text-cyan-400">{level}%</span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name} proficiency`}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
        />
      </div>
    </div>
  );
}
