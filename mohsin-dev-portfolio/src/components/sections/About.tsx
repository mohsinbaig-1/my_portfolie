"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { educationFocus, siteConfig } from "@/data/site";
import { Gamepad2, GraduationCap, Target } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8" aria-labelledby="about-heading">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="About Me"
          title="Engineering Meets Game Development"
          description="Software engineering student building internship-ready UE5 projects."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <GlassCard>
            <p className="leading-relaxed text-gray-300">{siteConfig.summary}</p>
            <p className="mt-4 leading-relaxed text-gray-400">{siteConfig.whyUE5}</p>
            <p className="mt-4 font-medium text-cyan-300">{siteConfig.careerGoal}</p>
          </GlassCard>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <GlassCard delay={0.1}>
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-cyan-500/15 p-3">
                  <GraduationCap className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Education</h3>
                  <p className="mt-1 text-sm text-gray-400">{siteConfig.university}</p>
                  <p className="text-sm text-gray-300">
                    {siteConfig.degree} · {siteConfig.semester}
                  </p>
                  <p className="mt-1 text-sm text-cyan-400">CGPA: {siteConfig.cgpa}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {educationFocus.map((item) => (
                      <li
                        key={item}
                        className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-gray-300"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCard>

            <GlassCard delay={0.2}>
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-purple-500/15 p-3">
                  <Gamepad2 className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Game Dev Focus</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-400">
                    Passionate about Unreal Engine 5, FPS mechanics, and physics-based simulation—especially
                    vehicle and aircraft systems like my F18 jet project.
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard delay={0.3} className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-blue-500/15 p-3">
                  <Target className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Career Goal</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-400">
                    Become a professional Game Developer specializing in Unreal Engine 5—shipping gameplay
                    systems, simulation experiences, and polished prototypes for studio teams.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
