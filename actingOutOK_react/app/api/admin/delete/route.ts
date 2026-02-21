import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken, getAdminCookieName } from "@/lib/auth";
import { Octokit } from "@octokit/rest";

/** Delete a file from the repo. Used when removing a casting call so the detail file is removed too. */
export async function POST(request: NextRequest) {
  const token = request.cookies.get(getAdminCookieName())?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const payload = await verifyAdminToken(token);
  if (!payload) {
    return NextResponse.json({ error: "Invalid or expired session" }, { status: 401 });
  }

  const githubToken = process.env.GITHUB_TOKEN;
  const githubRepo = process.env.GITHUB_REPO;
  const pathPrefix = process.env.GITHUB_PATH_PREFIX || "";

  if (!githubToken || !githubRepo) {
    return NextResponse.json(
      { error: "GitHub not configured (GITHUB_TOKEN, GITHUB_REPO)" },
      { status: 503 }
    );
  }

  const [owner, repo] = githubRepo.split("/");
  if (!owner || !repo) {
    return NextResponse.json(
      { error: "GITHUB_REPO must be owner/repo" },
      { status: 503 }
    );
  }

  let body: { path: string; message: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { path: filePath, message } = body;
  if (!filePath || !message) {
    return NextResponse.json(
      { error: "path and message are required" },
      { status: 400 }
    );
  }

  const repoPath = pathPrefix ? `${pathPrefix}/${filePath}`.replace(/\/+/g, "/") : filePath;
  const octokit = new Octokit({ auth: githubToken });
  const branch = process.env.GITHUB_BRANCH || undefined;

  try {
    const { data: existing } = await octokit.repos.getContent({
      owner,
      repo,
      path: repoPath,
      ...(branch ? { ref: branch } : {}),
    }).catch(() => ({ data: null }));

    if (!existing || Array.isArray(existing)) {
      return NextResponse.json(
        { error: "File not found or path is a directory" },
        { status: 404 }
      );
    }

    const sha = existing.sha;
    await octokit.repos.deleteFile({
      owner,
      repo,
      path: repoPath,
      message,
      sha,
      ...(branch ? { branch } : {}),
    });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "GitHub API error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
