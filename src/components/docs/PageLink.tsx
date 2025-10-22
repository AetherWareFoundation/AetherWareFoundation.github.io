import type { Route } from "next";
import Link, { type LinkProps } from "next/link";
import type { FunctionComponent } from "react";

import type { InferPageType } from "fumadocs-core/source";

import type { source } from "@/lib/content";

import { DynamicLucideIcon } from "../DynamicLucideIcon";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

export type PageLinkProps = {
  page: { page: InferPageType<typeof source>; hash?: string };
} & Omit<LinkProps<Route>, "children" | "href">;

export const PageLink: FunctionComponent<PageLinkProps> = ({
  page,
  ...props
}) => {
  const href = (
    page.hash ? `${page.page.url}#${page.hash}` : page.page.url
  ) as Route;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link href={href} {...props} />
      </HoverCardTrigger>
      <HoverCardContent className="text-sm w-96">
        <div className="flex justify-between gap-4">
          {page.page.data.icon && (
            <DynamicLucideIcon icon={page.page.data.icon} className="size-6" />
          )}
          <div className="space-y-1 flex-1">
            <h4 className="font-semibold">{page.page.data.title}</h4>
            <p className="text-sm text-fd-muted-foreground">
              {page.page.data.description}
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
