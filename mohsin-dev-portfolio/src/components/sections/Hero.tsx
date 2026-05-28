"use client";

import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import { scrollToSection } from "@/lib/utils";
import { motion } from "framer-motion";
import { Download, Mail, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = siteConfig.typingRoles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          const next = currentRole.slice(0, displayText.length + 1);
          setDisplayText(next);
          if (next === currentRole) {
            setTimeout(() => setIsDeleting(true), 1500);
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
      isDeleting ? 40 : 80,
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-28 pb-20"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-cyan-500/20 blur-[100px]" />
        <div className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-purple-600/20 blur-[100px]" />
      </div>

      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[8%] top-[30%] hidden rounded-2xl border border-cyan-400/20 bg-white/5 px-4 py-2 text-xs text-cyan-300 backdrop-blur-md lg:block"
      >
        UE5 Blueprints
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="pointer-events-none absolute right-[10%] top-[35%] hidden rounded-2xl border border-purple-400/20 bg-white/5 px-4 py-2 text-xs text-purple-300 backdrop-blur-md lg:block"
      >
        FPS + Simulation
      </motion.div>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="pointer-events-none absolute bottom-[25%] left-[15%] hidden rounded-full border border-white/10 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-4 lg:block"
      >
        <Sparkles className="h-6 w-6 text-cyan-400" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-300"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
          Open to Internships · UE5 & Software Engineering
        </motion.p>

        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="bg-gradient-to-r from-white via-cyan-100 to-purple-200 bg-clip-text text-transparent">
            {siteConfig.name}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-lg text-gray-300 md:text-xl"
        >
          {siteConfig.title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-6 h-8 text-xl font-semibold text-cyan-400 md:text-2xl"
          aria-live="polite"
        >
          {displayText}
          <span className="animate-pulse text-purple-400">|</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button onClick={() => scrollToSection("projects")}>View Projects</Button>
          <Button href={siteConfig.resumePath} variant="secondary" download ariaLabel="Download resume">
            <Download className="h-4 w-4" />
            Download Resume
          </Button>
          <Button onClick={() => scrollToSection("contact")} variant="secondary">
            <Mail className="h-4 w-4" />
            Contact Me
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
