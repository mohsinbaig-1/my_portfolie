"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  Box,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  Gamepad2,
  Layers3,
  Mail,
  MapPin,
  MonitorCog,
  MousePointer2,
  Palette,
  Send,
  Sparkles,
  Wrench,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { siteConfig } from "@/data/site";
import { featuredProject } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { cn } from "@/lib/utils";

const skills = [
  { name: "Unreal Engine 5", category: "Game Development", icon: Gamepad2 },
  { name: "C++", category: "Programming", icon: Code2 },
  { name: "Blender", category: "3D Modeling", icon: Box },
  { name: "Blueprints", category: "Visual Scripting", icon: Layers3 },
  { name: "Java", category: "Programming", icon: Cpu },
  { name: "PHP", category: "Web Development", icon: MonitorCog },
  { name: "MySQL", category: "Database", icon: Database },
  { name: "Git / GitHub", category: "Version Control", icon: FaGithub },
];

const focusItems = [
  { label: "UE5 Gameplay Programming", icon: Gamepad2 },
  { label: "Environment Design", icon: Palette },
  { label: "AI Systems", icon: Bot },
  { label: "Performance Optimization", icon: Wrench },
];

const cardMotion = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export function PortfolioDashboard() {
  return (
    <div className="dashboard-page">
      <section id="home" className="dashboard-hero" aria-labelledby="hero-heading">
        <Image
          src="/media/f18-jet/hero.png"
          alt="F18 fighter jet gameplay capture from Mohsin's Unreal Engine project"
          fill
          priority
          className="dashboard-hero-image"
          sizes="100vw"
        />
        <div className="dashboard-hero-overlay" />
        <div className="dashboard-hero-grid" aria-hidden="true" />
        <div className="dashboard-hero-content">
          <p className="handwritten hero-note hero-note-top">Game Developer<br />from Pakistan</p>
          <p className="eyebrow">Software Engineering Student · COMSATS Sahiwal</p>
          <h1 id="hero-heading" className="hero-title">
            <span>Hi, I&apos;m</span>
            <strong>Mohsin Baig</strong>
          </h1>
          <p className="hero-role">Unreal Engine 5 <i /> Gameplay Programmer <i /> C++ <i /> Blueprints</p>
          <p className="hero-copy">
            I build gameplay systems, interactive worlds, and believable mechanics with a focus on
            the details that make a game feel alive.
          </p>
          <div className="hero-actions">
            <a className="dashboard-button dashboard-button-primary" href="#projects">
              View my projects <ArrowUpRight size={16} />
            </a>
            <a className="dashboard-button dashboard-button-quiet" href="#contact">
              Contact me <ArrowUpRight size={16} />
            </a>
          </div>
          <p className="handwritten hero-note hero-note-bottom">Better games build<br />a brighter future.</p>
        </div>
        <a className="hero-scroll" href="#about" aria-label="Scroll to About Me">
          <MousePointer2 size={14} />
          <span>Scroll to explore</span>
        </a>
      </section>

      <div className="dashboard-shell">
        <div className="dashboard-kicker">
          <span>01 / Selected work</span>
          <span className="kicker-line" />
          <span>Gameplay · Systems · Worlds</span>
        </div>

        <div className="dashboard-grid">
          <motion.section {...cardMotion} id="about" className="dash-card about-card">
            <CardHeader icon={<Sparkles size={17} />} label="About me" />
            <div className="about-layout">
              <div>
                <h2>I&apos;m interested in the space between a mechanic and a feeling.</h2>
                <p>
                  I&apos;m Mohsin Baig, a Software Engineering student at COMSATS University Islamabad —
                  Sahiwal Campus. I enjoy working on game mechanics, 3D environments, gameplay systems,
                  and interactive worlds using Unreal Engine.
                </p>
              </div>
              <div className="terminal-card" aria-label="Quick facts">
                <span className="terminal-title">{"// Quick Facts"}</span>
                <p><b>name:</b> Mohsin Baig</p>
                <p><b>location:</b> Pakistan</p>
                <p><b>focus:</b> Unreal Engine 5</p>
                <p><b>role:</b> Gameplay Development</p>
                <p><b>learning:</b> C++, AI, Environment Design</p>
              </div>
            </div>
            <p className="handwritten card-note">Same guy.<br />Different maps!</p>
          </motion.section>

          <motion.section {...cardMotion} id="skills" className="dash-card skills-card">
            <CardHeader icon={<Code2 size={17} />} label="Skills & tools" />
            <div className="skill-grid">
              {skills.map(({ name, category, icon: Icon }) => (
                <div className="skill-tile" key={name}>
                  <Icon size={18} strokeWidth={1.6} />
                  <span>{name}</span>
                  <small>{category}</small>
                </div>
              ))}
            </div>
            <p className="skills-footnote">{skillCategories.flatMap((category) => category.skills).length} tools and concepts in active rotation</p>
          </motion.section>

          <motion.section {...cardMotion} id="projects" className="dash-card featured-card">
            <div className="featured-media">
              <Image
                src={featuredProject.image}
                alt={`${featuredProject.title} gameplay preview`}
                fill
                className="featured-image"
                sizes="(max-width: 900px) 100vw, 66vw"
              />
              <div className="featured-overlay" />
              <span className="featured-badge">Featured project</span>
              <div className="featured-content">
                <p className="eyebrow">Third-person zombie survival · Unreal Engine 5</p>
                <h2>{featuredProject.title}</h2>
                <p>{featuredProject.description}</p>
                <div className="tag-row">
                  {["UE5", "C++", "Blueprints", "AI", "Gameplay Systems"].map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <a className="inline-link" href={featuredProject.githubUrl} target="_blank" rel="noopener noreferrer">
                  View project <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </motion.section>

          <motion.section {...cardMotion} id="building" className="dash-card focus-card">
            <CardHeader icon={<MapPin size={17} />} label="Current focus" />
            <p className="focus-intro">The questions I&apos;m exploring in my current builds.</p>
            <div className="focus-list">
              {focusItems.map(({ label, icon: Icon }, index) => (
                <div className="focus-item" key={label}>
                  <span className="focus-index">0{index + 1}</span>
                  <Icon size={17} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <a className="inline-link" href="#contact">Let&apos;s build something <ArrowUpRight size={15} /></a>
          </motion.section>

          <motion.section {...cardMotion} className="quote-banner">
            <Image src="/images/projects/zombie-hunter.svg" alt="" fill className="quote-image" sizes="(max-width: 900px) 100vw, 66vw" />
            <div className="quote-overlay" />
            <div className="quote-content">
              <span className="eyebrow">A personal north star</span>
              <p className="handwritten">&quot;Building interactive worlds,<br />one system at a time.&quot;</p>
            </div>
          </motion.section>

          <motion.section {...cardMotion} id="contact" className="dash-card connect-card">
            <CardHeader icon={<Send size={17} />} label="Connect with me" />
            <p>Open to gameplay programming roles, UE5 collaborations, and studio opportunities.</p>
            <div className="connect-links">
              <SocialLink href={siteConfig.linkedin} label="LinkedIn" icon={<FaLinkedin size={17} />} />
              <SocialLink href={siteConfig.github} label="GitHub" icon={<FaGithub size={17} />} />
              <SocialLink href={`mailto:${siteConfig.email}`} label="Email" icon={<Mail size={17} />} />
              <SocialLink href={siteConfig.resumePath} label="Resume" icon={<ArrowDownRight size={17} />} download />
            </div>
            <p className="connect-email">{siteConfig.email}</p>
          </motion.section>
        </div>
      </div>
    </div>
  );
}

function CardHeader({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="card-header">
      <span className="card-icon">{icon}</span>
      <span>{label}</span>
      <span className="header-rule" />
    </div>
  );
}

function SocialLink({
  href,
  label,
  icon,
  download,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      className={cn("social-link", download && "social-link-resume")}
      aria-label={label}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      download={download}
    >
      {icon}<span>{label}</span><ExternalLink size={12} />
    </a>
  );
}
