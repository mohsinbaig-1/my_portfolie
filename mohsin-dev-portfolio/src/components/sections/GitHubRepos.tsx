import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";
import { fetchGitHubRepos } from "@/lib/github";
import { ExternalLink, GitBranch, Star } from "lucide-react";

export async function GitHubRepos() {
  const repos = await fetchGitHubRepos();

  return (
    <section id="github" className="py-24 px-4 sm:px-6 lg:px-8 bg-white/[0.02]" aria-labelledby="github-heading">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Open Source"
          title="GitHub Repositories"
          description={`Live repositories from @mohsinbaig-1 — stars, languages, and links.`}
        />

        {repos.length === 0 ? (
          <GlassCard className="text-center">
            <p className="text-gray-400">
              Repositories are loading from GitHub. Visit my profile directly:
            </p>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
            >
              {siteConfig.github}
              <ExternalLink className="h-4 w-4" />
            </a>
          </GlassCard>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo, index) => (
              <GlassCard key={repo.id} delay={index * 0.06}>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-bold text-white">{repo.name}</h3>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-gray-400 hover:text-cyan-400"
                    aria-label={`Open ${repo.name} on GitHub`}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-gray-400">
                  {repo.description ?? "No description provided."}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-400" />
                    {repo.stargazers_count}
                  </span>
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <GitBranch className="h-4 w-4 text-cyan-400" />
                      {repo.language}
                    </span>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        <p className="mt-8 text-center">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-cyan-400 hover:text-cyan-300"
          >
            View all repositories on GitHub →
          </a>
        </p>
      </div>
    </section>
  );
}
