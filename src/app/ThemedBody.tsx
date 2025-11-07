"use client";

import { useParams } from "next/navigation";
import type { ReactNode } from "react";

import { cn } from "fumadocs-ui/utils/cn";

import { Providers } from "./Providers";

export function useDocsAccent(): string | undefined {
  const { slug } = useParams<{ slug?: string[] }>();
  return Array.isArray(slug) && slug.length > 0 ? slug[0] : undefined;
}

export function ThemedBody({ children }: { children: ReactNode }) {
  const mode = useDocsAccent();

  return (
    <body
      className={cn(
        "relative flex flex-col min-h-screen",
        mode && `doc-accent-${mode}`,
      )}
    >
      <Providers>{children}</Providers>
    </body>
  );
}
