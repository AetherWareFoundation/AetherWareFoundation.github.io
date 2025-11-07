"use client";

import type { Route } from "next";
// biome-ignore lint/style/noRestrictedImports: safe usage
import Link, { type LinkProps } from "next/link";
import type { FunctionComponent } from "react";

import { DynamicLucideIcon } from "@/components/icons";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export type PageLinkProps = {
  page: {
    url: string;
    data: { title: string; description?: string; icon?: string };
    hash?: string;
  };
} & Omit<LinkProps<Route>, "href">;

export const PageLink: FunctionComponent<PageLinkProps> = ({
  page,
  ...props
}) => {
  const href = (page.hash ? `${page.url}#${page.hash}` : page.url) as Route;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link {...props} href={href} />
      </HoverCardTrigger>
      <HoverCardContent className="text-sm w-96">
        <div className="flex justify-between gap-4">
          {page.data.icon && (
            <DynamicLucideIcon icon={page.data.icon} className="size-6" />
          )}
          <div className="space-y-1 flex-1">
            <h4 className="font-semibold">{page.data.title}</h4>
            {page.data.description && (
              <p className="text-sm text-fd-muted-foreground">
                {page.data.description}
              </p>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
