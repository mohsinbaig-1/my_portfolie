"use client";

import type { Project } from "@/types";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Code2, ExternalLink } from "lucide-react";
import Image from "next/image";

type ProjectCardProps = {
  project: Project;
  index: number;
};

const categoryColors = {
  game: "from-cyan-500/20 to-blue-600/20 text-cyan-300",
  web: "from-purple-500/20 to-pink-600/20 text-purple-300",
  mobile: "from-emerald-500/20 to-teal-600/20 text-emerald-300",
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <GlassCard delay={index * 0.08} className="group flex h-full flex-col overflow-hidden p-0">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
        <span
          className={`absolute left-4 top-4 rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold uppercase tracking-wider ${categoryColors[project.category]}`}
        >
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
          {project.title}
        </h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-400">
          {project.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <ul className="mb-6 space-y-1.5 text-sm text-gray-400">
          {project.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-3">
          {project.githubUrl && (
            <Button
              href={project.githubUrl}
              variant="secondary"
              className="flex-1 px-4 py-2.5 text-xs sm:flex-none"
              external
              ariaLabel={`View ${project.title} on GitHub`}
            >
              <Code2 className="h-4 w-4" />
              GitHub
            </Button>
          )}
          {project.liveUrl && (
            <Button
              href={project.liveUrl}
              variant="primary"
              className="flex-1 px-4 py-2.5 text-xs sm:flex-none"
              external
              ariaLabel={`Live demo of ${project.title}`}
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </Button>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
