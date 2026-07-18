"use client";

import { AnimatedBorder } from "@/components/effects/AnimatedBorder";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";
import type { Project } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FaGithub } from "react-icons/fa6";

const otherProjects = projects.filter((p) => !p.featured);

export function Projects() {
  return (
    <section id="projects" className="py-28 px-4 sm:px-6 lg:px-8" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Portfolio"
          title="Projects"
          description="Gameplay prototypes, simulations, and supporting software engineering work."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {otherProjects.map((project, index) => (
            <ProjectDetailCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectDetailCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const isMinimal = project.category === "web";

  return (
    <AnimatedBorder>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="group overflow-hidden"
      >
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300 backdrop-blur-md">
            {project.category}
          </span>
        </div>

        <div className="p-6 md:p-8">
          <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-cyan-300">
            {project.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-purple-300">{project.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-gray-400">{project.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {!isMinimal && (
            <>
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="mt-4 text-sm font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
              >
                {expanded ? "Hide Details ↑" : "Technical Details ↓"}
              </button>

              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 space-y-4 border-t border-white/10 pt-4"
                >
                  <MiniBlock title="Features" items={project.features} />
                  <MiniBlock title="Technical Breakdown" items={project.technicalBreakdown} />
                  <MiniBlock title="Challenges" items={project.challenges} />
                  <MiniBlock title="Architecture" items={project.architecture} />
                  <MiniBlock title="Lessons Learned" items={project.lessonsLearned} />
                  <p className="text-xs text-gray-500">
                    {project.role} · {project.timeline}
                  </p>
                </motion.div>
              )}
            </>
          )}

          {project.githubUrl && (
            <div className="mt-6">
              <MagneticButton
                href={project.githubUrl}
                variant="secondary"
                className="!px-4 !py-2 text-xs"
                ariaLabel={`View ${project.title} on GitHub`}
              >
                <FaGithub className="h-4 w-4" />
                GitHub
              </MagneticButton>
            </div>
          )}
        </div>
      </motion.article>
    </AnimatedBorder>
  );
}

function MiniBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-500">{title}</h4>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-gray-400">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
