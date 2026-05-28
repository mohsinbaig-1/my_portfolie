import { navLinks, siteConfig } from "@/data/site";
import { Code2, Link2, Mail } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#030510] py-12" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold text-white">{siteConfig.name}</h3>
            <p className="mt-2 text-sm text-gray-400">{siteConfig.title}</p>
            <p className="mt-1 text-sm text-gray-500">{siteConfig.location}</p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cyan-400">
              Quick Links
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
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cyan-400">
              Connect
            </h4>
            <div className="flex gap-4">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/10 p-3 text-gray-400 transition-all hover:border-cyan-400/40 hover:text-cyan-400"
                aria-label="GitHub profile"
              >
                <Code2 className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/10 p-3 text-gray-400 transition-all hover:border-cyan-400/40 hover:text-cyan-400"
                aria-label="LinkedIn profile"
              >
                <Link2 className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="rounded-lg border border-white/10 p-3 text-gray-400 transition-all hover:border-cyan-400/40 hover:text-cyan-400"
                aria-label="Send email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-white/5 pt-6 text-center text-sm text-gray-500">
          © {year} {siteConfig.name}. Built with Next.js, TypeScript & Unreal Engine passion.
        </p>
      </div>
    </footer>
  );
}
