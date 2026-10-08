"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import type { PointerEvent, ReactNode } from "react";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  download?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  ariaLabel?: string;
  external?: boolean;
};

const variantClasses = {
  primary:
    "border border-amber-200/30 bg-gradient-to-r from-amber-200 via-amber-300 to-orange-300 text-[#17130b] shadow-[0_10px_30px_rgba(247,200,115,0.16)]",
  secondary:
    "border border-white/15 bg-white/5 text-white backdrop-blur-md hover:border-amber-200/40 hover:bg-white/[0.08]",
  ghost: "border border-transparent bg-transparent text-gray-300 hover:text-amber-100",
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
  external,
}: MagneticButtonProps) {
  const elementRef = useRef<HTMLElement | null>(null);
  const xTo = useRef<((value: number) => void) | null>(null);
  const yTo = useRef<((value: number) => void) | null>(null);
  const rotateTo = useRef<((value: number) => void) | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    xTo.current = gsap.quickTo(element, "x", { duration: 0.35, ease: "power3.out" });
    yTo.current = gsap.quickTo(element, "y", { duration: 0.35, ease: "power3.out" });
    rotateTo.current = gsap.quickTo(element, "rotate", { duration: 0.35, ease: "power3.out" });

    return () => {
      xTo.current = null;
      yTo.current = null;
      rotateTo.current = null;
    };
  }, []);

  const handlePointerMove = (e: PointerEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const el = elementRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    xTo.current?.(x * 0.14);
    yTo.current?.(y * 0.14);
    rotateTo.current?.(x * 0.02);

    el.style.setProperty("--pointer-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--pointer-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  const handlePointerLeave = () => {
    xTo.current?.(0);
    yTo.current?.(0);
    rotateTo.current?.(0);

    const element = elementRef.current;
    if (!element) return;
    element.style.setProperty("--pointer-x", "50%");
    element.style.setProperty("--pointer-y", "50%");
  };

  const setAnchorRef = (element: HTMLAnchorElement | null) => {
    elementRef.current = element;
  };

  const setButtonRef = (element: HTMLButtonElement | null) => {
    elementRef.current = element;
  };

  const baseClass = cn(
    "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-7 py-3.5 text-sm font-semibold transition-[transform,box-shadow,background-color,border-color,color] duration-300 will-change-transform",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090b]",
    "disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    className,
  );

  const overlay = (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{
        background:
          "radial-gradient(circle at var(--pointer-x, 50%) var(--pointer-y, 50%), rgba(255,255,255,0.16), transparent 36%)",
      }}
    />
  );

  const sheen = (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -inset-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{
        background:
          "linear-gradient(115deg, transparent 15%, rgba(255,255,255,0.16) 35%, transparent 55%)",
        transform: "translateX(-100%)",
      }}
    />
  );

  const inner = (
    <>
      {overlay}
      {sheen}
      <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-white/10 to-purple-400/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)] opacity-70" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={setAnchorRef}
        href={href}
        download={download}
        aria-label={ariaLabel}
        className={cn(baseClass, "group magnetic-btn")}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onFocus={handlePointerLeave}
        target={external || href.startsWith("http") ? "_blank" : undefined}
        rel={external || href.startsWith("http") ? "noopener noreferrer" : undefined}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={setButtonRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(baseClass, "group magnetic-btn")}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onFocus={handlePointerLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {inner}
    </motion.button>
  );
}
