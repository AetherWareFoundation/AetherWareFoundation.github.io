import type { Route } from "next";
// biome-ignore lint/style/noRestrictedImports: this is the SafeLink component
import Link, { type LinkProps } from "next/link";
import type { FunctionComponent, ReactNode } from "react";

import { cn } from "fumadocs-ui/utils/cn";

import { ExternalLinkIcon } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { isLinkExternal } from "@/lib/util/helpers";

export type SafeLinkProps = {
  iconClassName?: string;
  forceExternal?: boolean;
  disableIcon?: boolean;
  disablePrivacy?: boolean;
} & LinkProps<Route>;

export const SafeLink: FunctionComponent<SafeLinkProps> = ({
  // LinkProps
  href,
  rel,
  className,
  iconClassName,
  // own props
  forceExternal,
  disableIcon,
  disablePrivacy,
  // LinkProps rest
  ...props
}) => {
  const isExternal = forceExternal || isLinkExternal(href.toString() ?? "");
  const computedRel =
    isExternal && !disablePrivacy ? `${rel} noreferrer noopener` : rel;

  const Wrapper = ({ children }: { children: ReactNode }) =>
    isExternal ? (
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{href.toString()}</TooltipContent>
      </Tooltip>
    ) : (
      children
    );

  return (
    <Wrapper>
      <span className={cn("relative inline-block", className)}>
        <Link
          {...props}
          rel={computedRel}
          href={href as Route}
          target={isExternal ? "_blank" : undefined}
        />
        {isExternal && !disableIcon && (
          <ExternalLinkIcon
            className={cn(
              "inline-block ml-0.5 size-2.5 align-super text-current",
              iconClassName,
            )}
          />
        )}
      </span>
    </Wrapper>
  );
};
