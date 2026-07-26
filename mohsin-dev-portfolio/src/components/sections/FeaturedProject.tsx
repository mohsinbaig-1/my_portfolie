"use client";

import { AnimatedBorder } from "@/components/effects/AnimatedBorder";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredProject } from "@/data/projects";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub } from "react-icons/fa6";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";

export function FeaturedProject() {
  const project = featuredProject;

  return (
    <section
      id="featured"
      className="section-shell relative"
      aria-labelledby="featured-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.05),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Hero Project"
          title={project.title}
          description={project.tagline}
        />

        <AnimatedBorder>
          <div className="overflow-hidden">
            <div className="relative aspect-[21/9] w-full overflow-hidden">
              <Image
                src={project.image}
                alt={`${project.title} showcase`}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/40 to-transparent" />
              <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                {project.techStack.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-2">
              <div>
                <p className="leading-relaxed text-gray-300">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-400">
                  <span className="rounded-lg bg-white/5 px-3 py-1">
                    <strong className="text-gray-200">Role:</strong> {project.role}
                  </span>
                  <span className="rounded-lg bg-white/5 px-3 py-1">
                    <strong className="text-gray-200">Timeline:</strong> {project.timeline}
                  </span>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {project.githubUrl && (
                    <MagneticButton href={project.githubUrl} variant="secondary" ariaLabel="View on GitHub">
                      <FaGithub className="h-4 w-4" />
                      GitHub
                    </MagneticButton>
                  )}
                  <MagneticButton onClick={() => document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth" })} variant="secondary">
                    <HiOutlineArrowTopRightOnSquare className="h-4 w-4" />
                    View Showcase
                  </MagneticButton>
                </div>
              </div>

              <div className="space-y-6">
                <DetailBlock title="Features" items={project.features.slice(0, 6)} color="cyan" />
                <DetailBlock title="Architecture" items={project.architecture.slice(0, 4)} color="purple" />
              </div>
            </div>

            <div className="grid gap-6 border-t border-white/10 p-6 md:grid-cols-3 md:p-10">
              <DetailBlock title="Technical Breakdown" items={project.technicalBreakdown} color="cyan" />
              <DetailBlock title="Challenges Overcome" items={project.challenges} color="purple" />
              <DetailBlock title="Lessons Learned" items={project.lessonsLearned} color="blue" />
            </div>

            {project.futureRoadmap && (
              <div className="border-t border-white/10 p-6 md:p-10">
                <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-cyan-400">
                  Future Roadmap
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.futureRoadmap.map((item, i) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="rounded-lg border border-purple-400/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-200"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </AnimatedBorder>
      </div>
    </section>
  );
}

function DetailBlock({
  title,
  items,
  color,
}: {
  title: string;
  items: string[];
  color: "cyan" | "purple" | "blue";
}) {
  const dotColor = {
    cyan: "bg-cyan-400",
    purple: "bg-purple-400",
    blue: "bg-blue-400",
  }[color];

  return (
    <div>
      <h4 className="mb-3 text-sm font-bold uppercase tracking-widest text-gray-400">{title}</h4>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-gray-400">
            <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${dotColor}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
