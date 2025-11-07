import type { Route } from "next";
// biome-ignore lint/style/noRestrictedImports: type only
import type { LinkProps } from "next/link";
import type { FunctionComponent } from "react";

import type { DocsPage } from "@/lib/content";
import { DynamicLucideIcon } from "@/components/icons";
import { SafeLink } from "@/components/SafeLink";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export type PageLinkProps = {
  page: { page: DocsPage; hash?: string };
} & Omit<LinkProps<Route>, "href">;

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
        <SafeLink {...props} href={href} />
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
