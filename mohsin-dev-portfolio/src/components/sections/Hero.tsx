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
import { useEffect, useState } from "react";

const Scene3D = dynamic(
  () => import("@/components/effects/Scene3D").then((m) => m.Scene3D),
  { ssr: false },
);

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

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
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      id="home"
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
            background: `radial-gradient(circle at ${50 + mouse.x * 10}% ${40 + mouse.y * 10}%, rgba(34,211,238,0.15) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 pt-32 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2 text-xs font-medium uppercase tracking-widest text-cyan-300 backdrop-blur-md"
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
          className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="bg-gradient-to-r from-white via-cyan-100 to-purple-200 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">
            {siteConfig.name}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-4 text-xl font-semibold text-gray-200 md:text-2xl"
        >
          {siteConfig.title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-2 text-base text-gray-400 md:text-lg"
        >
          {siteConfig.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-8 h-9 text-lg font-bold text-cyan-400 md:text-xl"
          aria-live="polite"
        >
          {displayText}
          <span className="animate-pulse text-purple-400">|</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
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

      <ScrollIndicator />
    </section>
  );
}
