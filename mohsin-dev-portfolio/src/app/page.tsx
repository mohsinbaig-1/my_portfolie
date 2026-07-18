import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { CurrentlyBuilding } from "@/components/sections/CurrentlyBuilding";
import { FeaturedProject } from "@/components/sections/FeaturedProject";
import { GameplayShowcase } from "@/components/sections/GameplayShowcase";
import { GitHubRepos } from "@/components/sections/GitHubRepos";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Timeline } from "@/components/sections/Timeline";
import { WhyUnreal } from "@/components/sections/WhyUnreal";

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
