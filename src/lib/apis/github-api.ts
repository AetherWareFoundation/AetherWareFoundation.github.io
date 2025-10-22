import type { GitHubContributor, GitHubRepository } from "./github-types";

export async function fetchGitHubContributors(
  repoOwner: string,
  repoName: string,
): Promise<GitHubContributor[]> {
  const response = await fetch(
    `https://api.github.com/repos/${repoOwner}/${repoName}/contributors?per_page=50`,
  );

  if (!response.ok)
    throw new Error(`Failed to fetch contributors: ${response.statusText}`);

  const contributors = (await response.json()) as GitHubContributor[];
  return contributors
    .filter((contributor) => !contributor.login.endsWith("[bot]"))
    .sort((a, b) => b.contributions - a.contributions);
}

export async function fetchGitHubRepository(
  repoTuple: string,
): Promise<GitHubRepository> {
  const response = await fetch(`https://api.github.com/repos/${repoTuple}`);

  if (!response.ok)
    throw new Error(`Failed to fetch stats: ${response.statusText}`);

  return (await response.json()) as GitHubRepository;
}
