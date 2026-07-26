import { Hero } from "@/components/sections/Hero";
import dynamic from "next/dynamic";
import { About } from "@/components/sections/About";
import { CurrentlyBuilding } from "@/components/sections/CurrentlyBuilding";
import { Skills } from "@/components/sections/Skills";
import { Timeline } from "@/components/sections/Timeline";
import { WhyUnreal } from "@/components/sections/WhyUnreal";

const FeaturedProject = dynamic(
  () => import("@/components/sections/FeaturedProject").then((module) => module.FeaturedProject),
);
const Projects = dynamic(
  () => import("@/components/sections/Projects").then((module) => module.Projects),
);
const GameplayShowcase = dynamic(
  () => import("@/components/sections/GameplayShowcase").then((module) => module.GameplayShowcase),
);
const GitHubRepos = dynamic(
  () => import("@/components/sections/GitHubRepos").then((module) => module.GitHubRepos),
);
const Contact = dynamic(
  () => import("@/components/sections/Contact").then((module) => module.Contact),
);

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <FeaturedProject />
      <Projects />
      <GameplayShowcase />
      <Timeline />
      <CurrentlyBuilding />
      <WhyUnreal />
      <GitHubRepos />
      <Contact />
    </>
  );
}
