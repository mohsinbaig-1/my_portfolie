import { AnimatedBorder } from "@/components/effects/AnimatedBorder";
import { CounterAnimation } from "@/components/effects/CounterAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";
import {
  fetchGitHubStats,
  getContributionGraphUrl,
  GITHUB_USERNAME,
} from "@/lib/github";
import { ExternalLink, GitBranch, Star } from "lucide-react";
import Image from "next/image";

export async function GitHubRepos() {
  const stats = await fetchGitHubStats();

  return (
    <section id="github" className="py-28 px-4 sm:px-6 lg:px-8" aria-labelledby="github-heading">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Open Source"
          title="GitHub Activity"
          description={`Live data from @${GITHUB_USERNAME} — repositories, languages, and contribution activity.`}
        />

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Public Repos" value={stats.profile?.public_repos ?? stats.repos.length} />
          <StatCard label="Total Stars" value={stats.totalStars} />
          <StatCard label="Recent Pushes (30d)" value={stats.recentActivity} />
          <StatCard label="Followers" value={stats.profile?.followers ?? 0} />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <AnimatedBorder className="lg:col-span-2">
            <div className="p-6">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-400">
                Contribution Graph
              </h3>
              <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5 p-4">
                <Image
                  src={getContributionGraphUrl(GITHUB_USERNAME)}
                  alt="GitHub contribution graph"
                  width={722}
                  height={112}
                  className="h-auto w-full min-w-[500px]"
                  unoptimized
                />
              </div>
            </div>
          </AnimatedBorder>

          <AnimatedBorder>
            <div className="p-6">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-400">
                Top Languages
              </h3>
              {stats.languages.length === 0 ? (
                <p className="text-sm text-gray-500">Loading language data...</p>
              ) : (
                <div className="space-y-3">
                  {stats.languages.map((lang) => (
                    <div key={lang.name}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="text-gray-300">{lang.name}</span>
                        <span className="text-gray-500">{lang.count} repos</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${(lang.count / (stats.languages[0]?.count ?? 1)) * 100}%`,
                            backgroundColor: lang.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </AnimatedBorder>
        </div>

        <h3 className="mb-6 mt-12 text-sm font-bold uppercase tracking-widest text-gray-400">
          Latest Repositories
        </h3>

        {stats.repos.length === 0 ? (
          <AnimatedBorder>
            <div className="p-8 text-center">
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
            </div>
          </AnimatedBorder>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {stats.repos.map((repo) => (
              <AnimatedBorder key={repo.id}>
                <div className="group p-6 transition-all duration-300 hover:bg-white/[0.02]">
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="font-bold text-white group-hover:text-cyan-300">{repo.name}</h4>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-gray-400 transition-colors hover:text-cyan-400"
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
                </div>
              </AnimatedBorder>
            ))}
          </div>
        )}

        <p className="mt-10 text-center">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
          >
            View all repositories on GitHub →
          </a>
        </p>
      </div>
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <AnimatedBorder>
      <div className="p-5 text-center">
        <p className="text-3xl font-black text-white">
          <CounterAnimation value={value} />
        </p>
        <p className="mt-1 text-xs font-medium uppercase tracking-widest text-gray-500">{label}</p>
      </div>
    </AnimatedBorder>
  );
}
