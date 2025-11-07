"use client";

import { useParams, usePathname } from "next/navigation";
import { type ReactNode, useMemo } from "react";

import { RootProvider } from "fumadocs-ui/provider/next";
import { cn } from "fumadocs-ui/utils/cn";

import { StaticSearchDialog } from "@/components/StaticSearchDialog";

export function ClientBody({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { slug } = useParams<{ slug?: string[] }>();

  const mode = useMemo<string | undefined>(() => {
    if (pathname.startsWith("/docs") && Array.isArray(slug) && slug.length > 0)
      return slug[0];

    return undefined;
  }, [pathname, slug]);

  return (
    <body
      className={cn(
        "relative flex flex-col min-h-screen",
        mode && `doc-accent-${mode}`,
      )}
    >
      <RootProvider search={{ SearchDialog: StaticSearchDialog }}>
        {children}
      </RootProvider>
    </body>
  );
}
