"use client";

import dynamic from "next/dynamic";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { ParticleField } from "@/components/effects/ParticleField";
import { ScrollIndicator } from "@/components/effects/ScrollIndicator";
import { siteConfig } from "@/data/site";
import { scrollToSection } from "@/lib/utils";
import { motion } from "framer-motion";
import { FaDownload, FaEnvelope } from "react-icons/fa";
import { HiOutlineCodeBracket } from "react-icons/hi2";
import { useEffect, useRef, useState } from "react";

const Scene3D = dynamic(
  () => import("@/components/effects/Scene3D").then((m) => m.Scene3D),
  { ssr: false },
);

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const mouseTargetRef = useRef({ x: 0, y: 0 });
  const mouseFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const currentRole = siteConfig.typingRoles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          const next = currentRole.slice(0, displayText.length + 1);
          setDisplayText(next);
          if (next === currentRole) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          const next = currentRole.slice(0, displayText.length - 1);
          setDisplayText(next);
          if (next === "") {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % siteConfig.typingRoles.length);
          }
        }
      },
      isDeleting ? 35 : 75,
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      mouseTargetRef.current = { x, y };

      const section = heroRef.current;
      if (section) {
        section.style.setProperty("--hero-mouse-x", `${50 + x * 10}%`);
        section.style.setProperty("--hero-mouse-y", `${40 + y * 10}%`);
      }

      if (mouseFrameRef.current !== null) {
        return;
      }

      mouseFrameRef.current = window.requestAnimationFrame(() => {
        setMouse(mouseTargetRef.current);
        mouseFrameRef.current = null;
      });
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      if (mouseFrameRef.current !== null) {
        window.cancelAnimationFrame(mouseFrameRef.current);
      }
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <Scene3D
        mouseX={mouse.x}
        mouseY={mouse.y}
        className="absolute inset-0 z-0 opacity-70"
      />

      <ParticleField className="absolute inset-0 z-[1] h-full w-full" count={80} />

      <div className="pointer-events-none absolute inset-0 z-[2]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/40 via-[#050816]/70 to-[#050816]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050816_75%)]" />
        <div
          className="absolute inset-0 opacity-30 transition-transform duration-700 ease-out"
          style={{
            background:
              "radial-gradient(circle at var(--hero-mouse-x, 50%) var(--hero-mouse-y, 40%), rgba(34,211,238,0.15) 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-end gap-12 px-4 pt-32 pb-24 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <div className="max-w-3xl text-left">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-amber-100 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
          </span>
          Available for Gameplay Programming Roles
        </motion.div>

        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl font-black leading-[0.96] tracking-tight sm:text-6xl md:text-7xl lg:text-[6.5rem]"
        >
          <span className="bg-gradient-to-r from-white via-slate-100 to-amber-100 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(247,200,115,0.16)]">
            {siteConfig.name}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 text-xl font-semibold text-gray-200 md:text-2xl"
        >
          {siteConfig.title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-2 max-w-xl text-base text-gray-400 md:text-lg"
        >
          {siteConfig.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-8 h-9 text-lg font-bold text-amber-200 md:text-xl"
          aria-live="polite"
        >
          {displayText}
          <span className="animate-pulse text-purple-400">|</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <MagneticButton onClick={() => scrollToSection("projects")}>
            <HiOutlineCodeBracket className="h-4 w-4" />
            View Projects
          </MagneticButton>
          <MagneticButton
            href={siteConfig.resumePath}
            variant="secondary"
            download
            ariaLabel="Download resume"
          >
            <FaDownload className="h-4 w-4" />
            Download Resume
          </MagneticButton>
          <MagneticButton
            onClick={() => scrollToSection("contact")}
            variant="secondary"
          >
            <FaEnvelope className="h-4 w-4" />
            Contact
          </MagneticButton>
        </motion.div>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="hidden justify-self-end border-l border-white/15 pl-6 text-left lg:block lg:max-w-xs"
        >
          <p className="font-[family-name:var(--font-orbitron)] text-[10px] uppercase tracking-[0.28em] text-slate-500">
            Current focus
          </p>
          <p className="mt-4 text-2xl font-semibold leading-tight text-white">
            Systems that make combat feel intentional.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            AI, weapons, feedback, and architecture designed as one playable loop.
          </p>
          <div className="mt-8 flex gap-6 border-t border-white/10 pt-5">
            <div>
              <p className="font-[family-name:var(--font-orbitron)] text-xl text-amber-200">UE5</p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-slate-500">Engine</p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-orbitron)] text-xl text-amber-200">AI</p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-slate-500">Systems</p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-orbitron)] text-xl text-amber-200">C++</p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-slate-500">Thinking</p>
            </div>
          </div>
        </motion.aside>
      </div>

      <ScrollIndicator />
    </section>
  );
}
