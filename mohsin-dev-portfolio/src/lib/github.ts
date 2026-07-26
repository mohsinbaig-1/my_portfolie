import { pinnedRepoNames, ueRelevantKeywords } from "@/data/github-config";
import { siteConfig } from "@/data/site";
import type {
  GitHubCommitActivity,
  GitHubContributionGraph,
  GitHubContributionWeek,
  GitHubRepo,
  GitHubStats,
} from "@/types";

const GITHUB_USERNAME = siteConfig.githubUsername;

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

const GITHUB_HEADERS = {
  Accept: "application/vnd.github+json",
  "User-Agent": "mohsin-baig-portfolio",
};

type GitHubEvent = {
  type: string;
  created_at: string;
  payload?: {
    commits?: { sha: string }[];
  };
};

function toUtcDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function addUtcDays(date: Date, days: number) {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

function formatWeekLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function getActivityColor(count: number, maxCount: number) {
  if (count === 0) {
    return "#132033";
  }

  const ratio = count / Math.max(maxCount, 1);

  if (ratio <= 0.25) return "#164e63";
  if (ratio <= 0.5) return "#0ea5e9";
  if (ratio <= 0.75) return "#22d3ee";
  return "#67e8f9";
}

function getRepoText(repo: GitHubRepo) {
  return `${repo.name} ${repo.description ?? ""}`.toLowerCase();
}

function scoreRepo(repo: GitHubRepo) {
  const text = getRepoText(repo);
  let score = repo.stargazers_count * 100;

  if (repo.language) {
    score += 25;
  }

  for (const keyword of ueRelevantKeywords) {
    if (text.includes(keyword.toLowerCase())) {
      score += 150;
    }
  }

  if (repo.pushed_at) {
    const ageInDays = (Date.now() - Date.parse(repo.pushed_at)) / (24 * 60 * 60 * 1000);
    score += Math.max(0, 120 - ageInDays);
  }

  return score;
}

function selectPinnedRepos(repos: GitHubRepo[]) {
  const normalizedPinnedNames = new Set(pinnedRepoNames.map((name) => name.toLowerCase()));

  const manuallyPinned = repos.filter((repo) => normalizedPinnedNames.has(repo.name.toLowerCase()));
  if (manuallyPinned.length > 0) {
    return manuallyPinned.slice(0, 4);
  }

  return [...repos]
    .filter((repo) => !repo.fork)
    .sort((a, b) => scoreRepo(b) - scoreRepo(a))
    .slice(0, 4);
}

function buildContributionGraph(events: GitHubEvent[]): GitHubContributionGraph {
  const today = new Date();
  const endDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  const startDate = addUtcDays(endDate, -83);
  const countsByDate = new Map<string, number>();

  for (const event of events) {
    if (event.type !== "PushEvent") {
      continue;
    }

    const createdAt = new Date(event.created_at);
    const dayKey = toUtcDateKey(createdAt);

    if (createdAt < startDate || createdAt > endDate) {
      continue;
    }

    const commitCount = event.payload?.commits?.length ?? 1;
    countsByDate.set(dayKey, (countsByDate.get(dayKey) ?? 0) + commitCount);
  }

  const dayEntries: { date: string; count: number; weekday: number }[] = [];
  let totalContributions = 0;
  let maxCount = 0;

  for (let offset = 0; offset < 84; offset += 1) {
    const date = addUtcDays(startDate, offset);
    const key = toUtcDateKey(date);
    const count = countsByDate.get(key) ?? 0;

    totalContributions += count;
    maxCount = Math.max(maxCount, count);

    dayEntries.push({
      date: key,
      count,
      weekday: date.getUTCDay(),
    });
  }

  const days = dayEntries.map((day) => ({
    ...day,
    color: getActivityColor(day.count, maxCount),
  }));

  const weeks: GitHubContributionWeek[] = [];

  for (let index = 0; index < days.length; index += 7) {
    weeks.push({
      startDate: days[index].date,
      days: days.slice(index, index + 7),
    });
  }

  return {
    totalContributions,
    maxCount,
    weeks,
  };
}

function buildCommitActivity(graph: GitHubContributionGraph, events: GitHubEvent[]): GitHubCommitActivity {
  const last30Days = graph.weeks.flatMap((week) => week.days).slice(-30);
  const commitsLast30Days = last30Days.reduce((sum, day) => sum + day.count, 0);
  const activeDaysLast30Days = last30Days.filter((day) => day.count > 0).length;
  const peakDayCount = graph.maxCount;
  const weeklyTotals = graph.weeks.slice(-6).map((week) => ({
    label: formatWeekLabel(new Date(`${week.startDate}T00:00:00Z`)),
    count: week.days.reduce((sum, day) => sum + day.count, 0),
  }));

  let currentStreak = 0;
  for (let index = graph.weeks.flatMap((week) => week.days).length - 1; index >= 0; index -= 1) {
    if (graph.weeks.flatMap((week) => week.days)[index].count === 0) {
      break;
    }
    currentStreak += 1;
  }

  const pushEventsLast30Days = events.filter((event) => {
    if (event.type !== "PushEvent") {
      return false;
    }

    const createdAt = new Date(event.created_at).getTime();
    return createdAt >= Date.now() - 30 * 24 * 60 * 60 * 1000;
  }).length;

  const lastPushDate = [...events]
    .filter((event) => event.type === "PushEvent")
    .map((event) => event.created_at)
    .sort()
    .at(-1) ?? null;

  return {
    commitsLast30Days,
    pushEventsLast30Days,
    activeDaysLast30Days,
    currentStreak,
    peakDayCount,
    weeklyTotals,
    lastPushDate,
  };
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
  const emptyGraph = buildContributionGraph([]);
  const empty: GitHubStats = {
    profile: null,
    pinnedRepos: [],
    latestRepos: [],
    repos: [],
    languages: [],
    totalStars: 0,
    commitActivity: buildCommitActivity(emptyGraph, []),
    contributionGraph: emptyGraph,
  };

  try {
    const [profileRes, reposRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        next: { revalidate: 3600 },
        headers: GITHUB_HEADERS,
      }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, {
        next: { revalidate: 3600 },
        headers: GITHUB_HEADERS,
      }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=100`, {
        next: { revalidate: 3600 },
        headers: GITHUB_HEADERS,
      }),
    ]);

    const profile = profileRes.ok ? await profileRes.json() : null;
    const allRepos = (reposRes.ok ? await reposRes.json() : []) as GitHubRepo[];
    const events = (eventsRes.ok ? await eventsRes.json() : []) as GitHubEvent[];

    const latestRepos = [...allRepos]
      .filter((repo) => !repo.fork)
      .sort((a, b) => {
        const aTime = Date.parse(a.pushed_at ?? a.updated_at);
        const bTime = Date.parse(b.pushed_at ?? b.updated_at);
        return bTime - aTime;
      })
      .slice(0, 6);

    const languageCounts: Record<string, number> = {};
    for (const repo of allRepos) {
      if (!repo.language || repo.fork) {
        continue;
      }

      languageCounts[repo.language] = (languageCounts[repo.language] ?? 0) + 1;
    }

    const languages = Object.entries(languageCounts)
      .sort(([, left], [, right]) => right - left)
      .slice(0, 6)
      .map(([name, count]) => ({
        name,
        count,
        color: LANGUAGE_COLORS[name] ?? "#22d3ee",
      }));

    const pinnedRepos = selectPinnedRepos(allRepos);
    const contributionGraph = buildContributionGraph(events);
    const commitActivity = buildCommitActivity(contributionGraph, events);
    const totalStars = allRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

    return {
      profile: profile
        ? {
            public_repos: profile.public_repos,
            followers: profile.followers,
            following: profile.following,
            created_at: profile.created_at,
          }
        : null,
      pinnedRepos,
      latestRepos,
      repos: latestRepos,
      languages,
      totalStars,
      commitActivity,
      contributionGraph,
    };
  } catch {
    return empty;
  }
}

export function getContributionGraphUrl(username: string) {
  return `https://ghchart.rshah.org/${username}`;
}

export { GITHUB_USERNAME };