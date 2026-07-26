"use client";

import { AnimatedBorder } from "@/components/effects/AnimatedBorder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";
import type { GitHubRepo, GitHubStats } from "@/types";
import {
  ArrowUpRight,
  GitFork,
  Star,
  RefreshCw,
  CircleDot,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const sectionLabelClass =
  "mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80";

export function GitHubRepos() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadStats() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/github", { signal: controller.signal });

        if (!response.ok) {
          throw new Error("Unable to load GitHub data right now.");
        }

        const payload = (await response.json()) as GitHubStats;
        setStats(payload);
      } catch (fetchError) {
        if (!controller.signal.aborted) {
          setError(fetchError instanceof Error ? fetchError.message : "GitHub data failed to load.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadStats();

    return () => controller.abort();
  }, []);

  const publicRepos = stats?.profile?.public_repos ?? stats?.latestRepos.length ?? 0;
  const pinnedReposCount = stats?.pinnedRepos.length ?? 0;
  const totalStars = stats?.totalStars ?? 0;
  const commitsLast30Days = stats?.commitActivity.commitsLast30Days ?? 0;

  return (
    <section id="github" className="section-shell relative" aria-labelledby="github-heading">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Open Source"
          title="GitHub Activity"
          description={`Live API data from @${siteConfig.githubUsername} with pinned repositories, languages, recent work, and contribution history.`}
        />

        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Public Repos" value={publicRepos} isLoading={isLoading} />
          <StatCard label="Pinned Repos" value={pinnedReposCount} isLoading={isLoading} />
          <StatCard label="Total Stars" value={totalStars} isLoading={isLoading} />
          <StatCard label="Commits (30d)" value={commitsLast30Days} isLoading={isLoading} />
        </div>

        {error ? (
          <AnimatedBorder>
            <div className="p-8 text-center">
              <p className="text-lg font-semibold text-white">GitHub data could not be loaded.</p>
              <p className="mt-2 text-sm text-gray-400">{error}</p>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
              >
                Open GitHub profile
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </AnimatedBorder>
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <DashboardCard title="Pinned Repositories" subtitle="Curated from GitHub API data and portfolio relevance.">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <CardSkeletonGrid count={4} compact={false} />
                ) : (
                  <motion.div
                    key="pinned-repos"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="grid gap-4 md:grid-cols-2"
                  >
                    {(stats?.pinnedRepos ?? []).map((repo) => (
                      <RepoCard key={repo.id} repo={repo} pinned />
                    ))}
                    {(stats?.pinnedRepos ?? []).length === 0 && (
                      <EmptyState message="No pinned repositories were found in the current GitHub data." />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </DashboardCard>

            <DashboardCard title="Latest Repositories" subtitle="Most recently pushed public repositories.">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <CardSkeletonGrid count={6} compact />
                ) : (
                  <motion.div
                    key="latest-repos"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="grid gap-4 md:grid-cols-2"
                  >
                    {(stats?.latestRepos ?? []).map((repo) => (
                      <RepoCard key={repo.id} repo={repo} compact />
                    ))}
                    {(stats?.latestRepos ?? []).length === 0 && (
                      <EmptyState message="Latest repository data is unavailable right now." />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </DashboardCard>
          </div>

          <div className="space-y-6">
            <DashboardCard title="Languages" subtitle="Most used languages across public repositories.">
              {isLoading ? (
                <LanguageSkeleton />
              ) : (stats?.languages.length ?? 0) > 0 ? (
                <div className="space-y-4">
                  {stats?.languages.map((language) => (
                    <LanguageRow key={language.name} name={language.name} count={language.count} color={language.color} total={stats.languages[0]?.count ?? language.count} />
                  ))}
                </div>
              ) : (
                <EmptyState message="Language breakdown is empty for the current account." />
              )}
            </DashboardCard>

            <DashboardCard title="Commit Activity" subtitle="Recent GitHub push activity summarized from the API.">
              {isLoading ? (
                <ActivitySkeleton />
              ) : (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-3">
                    <MiniMetric label="Active days" value={stats?.commitActivity.activeDaysLast30Days ?? 0} />
                    <MiniMetric label="Current streak" value={stats?.commitActivity.currentStreak ?? 0} />
                    <MiniMetric label="Push events" value={stats?.commitActivity.pushEventsLast30Days ?? 0} />
                    <MiniMetric label="Peak day" value={stats?.commitActivity.peakDayCount ?? 0} />
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.26em] text-gray-500">
                      <span>Weekly commits</span>
                      <span>{stats?.commitActivity.lastPushDate ? new Date(stats.commitActivity.lastPushDate).toLocaleDateString() : "No recent push"}</span>
                    </div>

                    <div className="flex items-end gap-2 overflow-x-auto pb-1">
                      {(() => {
                        const peakWeeklyTotal = Math.max(
                          ...(stats?.commitActivity.weeklyTotals.map((week) => week.count) ?? [1]),
                        );

                        return stats?.commitActivity.weeklyTotals.map((week) => {
                          const height = Math.max(16, (week.count / Math.max(peakWeeklyTotal, 1)) * 100);

                          return (
                            <div key={week.label} className="flex min-w-[56px] flex-1 flex-col items-center gap-2">
                              <div className="flex h-24 w-full items-end justify-center rounded-xl bg-[#050816]/50 p-2">
                                <div
                                  className="w-full rounded-lg bg-gradient-to-t from-cyan-500 to-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.22)] transition-transform duration-300 hover:scale-[1.03]"
                                  style={{ height: `${height}%` }}
                                />
                              </div>
                              <span className="text-[11px] text-gray-500">{week.label}</span>
                              <span className="text-xs font-semibold text-white">{week.count}</span>
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </div>
                </div>
              )}
            </DashboardCard>

            <DashboardCard title="Contribution Graph" subtitle="A heatmap view of recent contribution activity.">
              {isLoading ? (
                <ContributionSkeleton />
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4 text-sm text-gray-400">
                    <p>{stats?.commitActivity.commitsLast30Days ?? 0} commits in the last 30 days</p>
                    <p>{stats?.contributionGraph.totalContributions ?? 0} contributions shown</p>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="grid min-w-[560px] grid-flow-col gap-1.5">
                      {stats?.contributionGraph.weeks.map((week) => (
                        <div key={week.startDate} className="grid grid-rows-7 gap-1.5">
                          {week.days.map((day) => (
                            <div
                              key={day.date}
                              title={`${day.date} · ${day.count} contributions`}
                              className="h-3.5 w-3.5 rounded-[3px] border border-white/5 transition-transform duration-300 hover:scale-110 hover:border-cyan-300/50 sm:h-4 sm:w-4"
                              style={{ backgroundColor: day.color }}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1.5"><CircleDot className="h-3 w-3" /> Less</span>
                    <span className="h-3 w-3 rounded-[3px] bg-[#132033]" />
                    <span className="h-3 w-3 rounded-[3px] bg-[#164e63]" />
                    <span className="h-3 w-3 rounded-[3px] bg-[#0ea5e9]" />
                    <span className="h-3 w-3 rounded-[3px] bg-[#22d3ee]" />
                    <span className="h-3 w-3 rounded-[3px] bg-[#67e8f9]" />
                    <span>More</span>
                  </div>
                </div>
              )}
            </DashboardCard>
          </div>
        </div>

        <p className="mt-10 text-center">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
          >
            View all repositories on GitHub
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </p>
      </div>
    </section>
  );
}

function DashboardCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatedBorder>
      <div className="p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className={sectionLabelClass}>{title}</p>
            {subtitle && <p className="max-w-2xl text-sm text-gray-400">{subtitle}</p>}
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 p-2 text-cyan-300">
            <RefreshCw className="h-4 w-4" />
          </div>
        </div>
        {children}
      </div>
    </AnimatedBorder>
  );
}

function StatCard({ label, value, isLoading }: { label: string; value: number; isLoading: boolean }) {
  return (
    <AnimatedBorder>
      <div className="p-5 text-center">
        {isLoading ? (
          <div className="mx-auto h-10 w-20 animate-pulse rounded-xl bg-white/10" />
        ) : (
          <p className="text-3xl font-black text-white">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {value.toLocaleString()}
            </motion.span>
          </p>
        )}
        <p className="mt-2 text-xs font-medium uppercase tracking-widest text-gray-500">{label}</p>
      </div>
    </AnimatedBorder>
  );
}

function RepoCard({ repo, pinned = false, compact = false }: { repo: GitHubRepo; pinned?: boolean; compact?: boolean }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`group rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-cyan-400/30 hover:bg-white/[0.07] ${compact ? "" : "p-5"}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {pinned && (
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-300">
                Pinned
              </span>
            )}
            {repo.language && (
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-300">
                {repo.language}
              </span>
            )}
          </div>
          <h3 className="text-base font-bold text-white transition-colors group-hover:text-cyan-300">
            {repo.name}
          </h3>
        </div>

        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full border border-white/10 bg-white/5 p-2 text-gray-300 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
          aria-label={`Open ${repo.name} on GitHub`}
        >
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-gray-400">
        {repo.description ?? "No description provided."}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5 text-amber-400" />
          {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1.5">
          <GitFork className="h-3.5 w-3.5 text-cyan-400" />
          {repo.forks_count}
        </span>
        {repo.pushed_at && <span>{new Date(repo.pushed_at).toLocaleDateString()}</span>}
      </div>
    </motion.article>
  );
}

function LanguageRow({
  name,
  count,
  color,
  total,
}: {
  name: string;
  count: number;
  color: string;
  total: number;
}) {
  const width = Math.max(12, (count / Math.max(total, 1)) * 100);

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="text-gray-300">{name}</span>
        <span className="text-gray-500">{count} repos</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${width}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-2xl font-black text-white">{value.toLocaleString()}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.22em] text-gray-500">{label}</p>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-5 text-sm text-gray-400">
      {message}
    </div>
  );
}

function CardSkeletonGrid({ count, compact }: { count: number; compact: boolean }) {
  return (
    <div className={`grid gap-4 ${compact ? "md:grid-cols-2" : "md:grid-cols-2"}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={`rounded-2xl border border-white/10 bg-white/5 p-${compact ? "4" : "5"} animate-pulse`}>
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="h-4 w-24 rounded bg-white/10" />
              <div className="h-3 w-16 rounded bg-white/10" />
            </div>
            <div className="h-8 w-8 rounded-full bg-white/10" />
          </div>
          <div className="h-3 w-full rounded bg-white/10" />
          <div className="mt-2 h-3 w-3/4 rounded bg-white/10" />
          <div className="mt-4 flex gap-3">
            <div className="h-4 w-12 rounded bg-white/10" />
            <div className="h-4 w-12 rounded bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

function LanguageSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index}>
          <div className="mb-2 flex justify-between">
            <div className="h-4 w-24 rounded bg-white/10" />
            <div className="h-4 w-14 rounded bg-white/10" />
          </div>
          <div className="h-2 rounded-full bg-white/10" />
        </div>
      ))}
    </div>
  );
}

function ActivitySkeleton() {
  return (
    <div className="space-y-5 animate-pulse">
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="h-8 w-16 rounded bg-white/10" />
            <div className="mt-2 h-3 w-24 rounded bg-white/10" />
          </div>
        ))}
      </div>
      <div className="h-40 rounded-2xl border border-white/10 bg-white/5 p-4" />
    </div>
  );
}

function ContributionSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex justify-between">
        <div className="h-4 w-40 rounded bg-white/10" />
        <div className="h-4 w-28 rounded bg-white/10" />
      </div>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="grid min-w-[560px] grid-flow-col gap-1.5">
          {Array.from({ length: 12 }).map((_, column) => (
            <div key={column} className="grid grid-rows-7 gap-1.5">
              {Array.from({ length: 7 }).map((__, row) => (
                <div key={row} className="h-3.5 w-3.5 rounded-[3px] bg-white/10 sm:h-4 sm:w-4" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}