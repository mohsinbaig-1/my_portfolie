import { navLinks, siteConfig } from "@/data/site";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa6";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-[#030510] py-16" role="contentinfo">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.05),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="font-[family-name:var(--font-orbitron)] text-lg font-bold text-white">
              {siteConfig.name}
            </h3>
            <p className="mt-2 text-sm text-gray-400">{siteConfig.title}</p>
            <p className="mt-1 text-sm text-gray-500">{siteConfig.subtitle}</p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-cyan-400">
              Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 transition-colors hover:text-cyan-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-cyan-400">
              Connect
            </h4>
            <div className="flex gap-3">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/10 p-3 text-gray-400 transition-all hover:border-cyan-400/40 hover:text-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                aria-label="GitHub profile"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/10 p-3 text-gray-400 transition-all hover:border-cyan-400/40 hover:text-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                aria-label="LinkedIn profile"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="rounded-xl border border-white/10 p-3 text-gray-400 transition-all hover:border-cyan-400/40 hover:text-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                aria-label="Send email"
              >
                <FaEnvelope className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <p className="mt-12 border-t border-white/5 pt-8 text-center text-sm text-gray-600">
          © {year} {siteConfig.name}. Gameplay Programmer · Unreal Engine 5 · Built with Next.js
        </p>
      </div>
    </footer>
  );
}
