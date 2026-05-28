import { fetchGitHubRepos } from "@/lib/github";
import { NextResponse } from "next/server";

export async function GET() {
  const repos = await fetchGitHubRepos();
  return NextResponse.json(repos);
}
