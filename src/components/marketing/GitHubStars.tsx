"use client";

import { type FunctionComponent, useEffect, useMemo, useState } from "react";

import {
  type ButtonProps,
  buttonVariants,
} from "fumadocs-ui/components/ui/button";
import { cn } from "fumadocs-ui/utils/cn";

import {
  fetchGitHubRepository,
  type GitHubRepository,
} from "@/lib/apis/github-api";
import { useLocalStorageCache } from "@/lib/util/useLocalStorageCache";

export type GitHubStarsProps = {
  repoTuple: string;
  nameMode?: "owner" | "repo" | "full" | "github" | "none";
  className?: string;
} & ButtonProps;

export const GitHubStars: FunctionComponent<GitHubStarsProps> = ({
  repoTuple,
  nameMode = "none",
  color,
  size,
  variant = "outline",
  className,
}) => {
  const cache = useLocalStorageCache("github-repository");
  const [_isLoading, setIsLoading] = useState(true);
  const [_failed, setFailed] = useState(false);
  const [stars, setStars] = useState(0);

  const cacheKey = useMemo(() => repoTuple.toLowerCase(), [repoTuple]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: ignore
  useEffect(() => {
    const cached = cache.get<GitHubRepository>(cacheKey, 300);

    if (cached) {
      setStars(cached.stargazers_count);

      setFailed(false);
      setIsLoading(false);
      return;
    }

    fetchGitHubRepository(repoTuple)
      .then((data) => {
        setStars(data.stargazers_count);

        cache.set(cacheKey, data);
        setFailed(false);
        setIsLoading(false);
      })
      .catch(() => {
        setFailed(true);
        setIsLoading(false);
      });
  }, [repoTuple, cacheKey]);

  const starsFormatted = useMemo(() => {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
    }).format(stars);
  }, [stars]);

  const displayName = useMemo(() => {
    if (nameMode === "owner") return repoTuple.split("/")[0];
    if (nameMode === "repo") return repoTuple.split("/")[1];
    if (nameMode === "github") return `GitHub`;
    if (nameMode === "none") return null;
    return repoTuple;
  }, [repoTuple, nameMode]);

  return (
    <button
      type="button"
      className={cn(
        "h-8 shadow-none",
        buttonVariants({ size, color, variant, className }),
      )}
    >
      <a
        href={`https://github.com/${repoTuple}`}
        rel="noreferrer"
        target="_blank"
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-label="GitHub"
        >
          <title>GitHub</title>
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
        {displayName && (
          <span className="text-muted-foreground text-xs mr-1">
            {displayName}
          </span>
        )}
        <span className="text-muted-foreground text-xs tabular-nums">
          {starsFormatted}
        </span>
      </a>
    </button>
  );
};
