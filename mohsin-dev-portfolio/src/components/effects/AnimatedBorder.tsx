"use client";

import { cn } from "@/lib/utils";

type AnimatedBorderProps = {
  children: React.ReactNode;
  className?: string;
};

export function AnimatedBorder({ children, className }: AnimatedBorderProps) {
  return (
    <div className={cn("animated-border relative rounded-2xl p-[1px]", className)}>
      <div className="relative h-full w-full rounded-2xl bg-[#050816]/80 backdrop-blur-xl">
        {children}
      </div>
    </div>
  );
}
