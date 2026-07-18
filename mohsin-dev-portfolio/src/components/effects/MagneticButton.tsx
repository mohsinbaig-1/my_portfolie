"use client";

import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  download?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: "primary" | "secondary";
  ariaLabel?: string;
};

export function MagneticButton({
  children,
  className,
  onClick,
  href,
  download,
  type = "button",
  disabled,
  variant = "primary",
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const [transform, setTransform] = useState("translate(0, 0)");

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTransform(`translate(${x * 0.15}px, ${y * 0.15}px)`);
  };

  const handleMouseLeave = () => setTransform("translate(0, 0)");

  const baseClass = cn(
    "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-7 py-3.5 text-sm font-semibold transition-all duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]",
    "disabled:pointer-events-none disabled:opacity-50",
    variant === "primary"
      ? "bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
      : "border border-white/20 bg-white/5 text-white backdrop-blur-md hover:border-cyan-400/40 hover:bg-white/10",
    className,
  );

  const style = { transform };

  const inner = (
    <>
      <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-white/10 to-purple-400/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        download={download}
        aria-label={ariaLabel}
        className={cn(baseClass, "group magnetic-btn")}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(baseClass, "group magnetic-btn")}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {inner}
    </button>
  );
}
