"use client";

import "./global.css";

import { useParams } from "next/navigation";

import { RootProvider } from "fumadocs-ui/provider/next";
import { cn } from "fumadocs-ui/utils/cn";

import { StaticSearchDialog } from "@/components/StaticSearchDialog";

function useDocsAccent(): string | undefined {
  const { slug } = useParams<{ slug?: string[] }>();
  return Array.isArray(slug) && slug.length > 0 ? slug[0] : undefined;
}

export default function Layout({ children }: LayoutProps<"/">) {
  const mode = useDocsAccent();

  return (
    <html lang="en" suppressHydrationWarning>
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
    </html>
  );
}
