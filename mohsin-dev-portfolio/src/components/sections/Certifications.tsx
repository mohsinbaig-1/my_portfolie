"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certifications } from "@/data/experience";
import { Award, ExternalLink } from "lucide-react";

export function Certifications() {
  return (
    <section id="certifications" className="py-24 px-4 sm:px-6 lg:px-8" aria-labelledby="certs-heading">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Credentials"
          title="Certifications"
          description="Courses and credentials supporting my UE5 and software engineering journey."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert, index) => (
            <GlassCard key={cert.id} delay={index * 0.08} className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20">
                <Award className="h-7 w-7 text-cyan-400" />
              </div>
              <h3 className="font-bold text-white">{cert.title}</h3>
              <p className="mt-1 text-sm text-gray-400">{cert.issuer}</p>
              <p className="mt-2 text-xs font-semibold text-purple-300">{cert.year}</p>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300"
                >
                  View credential
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
