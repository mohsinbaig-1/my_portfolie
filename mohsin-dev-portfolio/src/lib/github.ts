import type { GitHubStats } from "@/types";

const GITHUB_USERNAME = "mohsinbaig-1";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  C: "#555555",
  "C++": "#f34b7d",
  Java: "#b07219",
  PHP: "#4F5D95",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Dart: "#00B4AB",
  Shell: "#89e051",
  Blueprint: "#a855f7",
};

export async function fetchGitHubStats(): Promise<GitHubStats> {
  const empty: GitHubStats = {
    profile: null,
    repos: [],
    languages: [],
    totalStars: 0,
    recentActivity: 0,
  };

  try {
    const [profileRes, reposRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        next: { revalidate: 3600 },
        headers: { Accept: "application/vnd.github+json" },
      }),
      fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
        {
          next: { revalidate: 3600 },
          headers: { Accept: "application/vnd.github+json" },
        },
      ),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=30`, {
        next: { revalidate: 3600 },
        headers: { Accept: "application/vnd.github+json" },
      }),
    ]);

    const profile = profileRes.ok ? await profileRes.json() : null;
    const allRepos = reposRes.ok ? await reposRes.json() : [];
    const events = eventsRes.ok ? await eventsRes.json() : [];

    const repos = (allRepos as GitHubStats["repos"])
      .filter((repo) => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6);

    const languageCounts: Record<string, number> = {};
    for (const repo of allRepos as GitHubStats["repos"]) {
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] ?? 0) + 1;
      }
    }

    const languages = Object.entries(languageCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([name, count]) => ({
        name,
        count,
        color: LANGUAGE_COLORS[name] ?? "#22d3ee",
      }));

    const totalStars = (allRepos as GitHubStats["repos"]).reduce(
      (sum, repo) => sum + repo.stargazers_count,
      0,
    );

    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const recentActivity = (events as { type: string; created_at: string }[]).filter(
      (event) =>
        event.type === "PushEvent" && new Date(event.created_at).getTime() > thirtyDaysAgo,
    ).length;

    return {
      profile: profile
        ? {
            public_repos: profile.public_repos,
            followers: profile.followers,
            following: profile.following,
            created_at: profile.created_at,
          }
        : null,
      repos,
      languages,
      totalStars,
      recentActivity,
    };
  } catch {
    return empty;
  }
}

export function getContributionGraphUrl(username: string) {
  return `https://ghchart.rshah.org/${username}`;
}

export { GITHUB_USERNAME };
