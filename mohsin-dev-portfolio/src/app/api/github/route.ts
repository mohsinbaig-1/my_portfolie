import { fetchGitHubStats } from "@/lib/github";
import { NextResponse } from "next/server";

export async function GET() {
  const stats = await fetchGitHubStats();
  return NextResponse.json(stats);
}
