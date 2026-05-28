import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";
import { Download, FileText } from "lucide-react";

export function Resume() {
  return (
    <section id="resume" className="py-24 px-4 sm:px-6 lg:px-8" aria-labelledby="resume-heading">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Resume"
          title="Download My Resume"
          description="Internship-ready overview of UE5 projects, software skills, and education."
        />

        <GlassCard className="text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-600/30">
            <FileText className="h-10 w-10 text-cyan-400" />
          </div>
          <h3 className="text-xl font-bold text-white">{siteConfig.name}</h3>
          <p className="mt-2 text-gray-400">{siteConfig.title}</p>
          <ul className="mx-auto mt-6 max-w-md space-y-2 text-left text-sm text-gray-300">
            <li>• Unreal Engine 5 · Blueprints · C++</li>
            <li>• F18 Simulation & FPS Game Projects</li>
            <li>• {siteConfig.degree} · {siteConfig.university}</li>
            <li>• CGPA {siteConfig.cgpa} · {siteConfig.semester}</li>
          </ul>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href={siteConfig.resumePath} download ariaLabel="Download resume PDF">
              <Download className="h-4 w-4" />
              Download Resume
            </Button>
            <Button
              href={`mailto:${siteConfig.email}?subject=Resume%20Request%20-%20Mohsin%20Baig`}
              variant="secondary"
            >
              Request via Email
            </Button>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
