import type { Route } from "next";
import type { CSSProperties, FunctionComponent, ReactNode } from "react";

import { cn } from "fumadocs-ui/utils/cn";
import type { Folder } from "fumadocs-core/page-tree";

import type { LucideIcon } from "lucide-react";

import { docsSource } from "@/lib/content";
import { DiscordIcon, GitHubIcon, InstagramIcon } from "@/components/icons";
import { LogoText } from "@/components/Logo";
import { SafeLink } from "@/components/SafeLink";

type SocialIconProps = {
  href: Route | (string & {});
  forceExternal?: boolean;
  name: ReactNode;
  node: LucideIcon;
};

const SocialIcon: FunctionComponent<SocialIconProps> = ({
  href,
  forceExternal,
  name,
  node,
}) => {
  const IconNode = node;
  return (
    <li>
      <SafeLink
        href={href as Route}
        forceExternal={forceExternal}
        disableTooltip
        disableIcon
        rel="noreferrer"
        className="text-fd-muted-foreground hover:text-fd-foreground transition"
      >
        <span className="sr-only">{name}</span>
        <IconNode className="size-6" />
      </SafeLink>
    </li>
  );
};

type FooterColumnProps = { title: ReactNode; children: ReactNode };

const FooterColumn: FunctionComponent<FooterColumnProps> = ({
  title,
  children,
}) => (
  <div>
    <p className="font-medium text-fd-primary">{title}</p>
    <ul className="mt-6 space-y-4 text-sm">{children}</ul>
  </div>
);

type FooterColumnLinkProps = {
  href: Route | (string & {});
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

const FooterColumnLink: FunctionComponent<FooterColumnLinkProps> = ({
  href,
  className,
  style,
  children,
}) => (
  <li className={cn(className)} style={style}>
    <SafeLink
      href={href as Route}
      className="text-fd-muted-foreground hover:text-fd-foreground transition"
    >
      {children}
    </SafeLink>
  </li>
);

export type FooterProps = {
  className?: string;
};

export const Footer: FunctionComponent<FooterProps> = ({ className }) => {
  return (
    <footer className={cn("bg-fd-background", className)}>
      <div className="mx-auto max-w-fd-container space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <LogoText />

            <p className="mt-4 max-w-xs text-muted-foreground">
              At least for now, step/dir is a distraction.
            </p>

            <ul className="mt-8 flex gap-6">
              <SocialIcon
                href="https://instagram.com/#"
                name="Instagram"
                node={InstagramIcon}
              />

              <SocialIcon
                href="/discord"
                name="Discord"
                forceExternal
                node={DiscordIcon}
              />

              <SocialIcon
                href="https://github.com/AetherWareFoundation"
                name="GitHub"
                node={GitHubIcon}
              />
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <FooterColumn title="Other">
              <FooterColumnLink href="#">Test</FooterColumnLink>
            </FooterColumn>

            <FooterColumn title="AetherWare Foundation">
              <FooterColumnLink href="#">Test</FooterColumnLink>
            </FooterColumn>

            <FooterColumn title="Documentation">
              {docsSource.pageTree.children
                .filter(
                  (c): c is Folder => c.type === "folder" && c.root === true,
                )
                .map((p) => (
                  <FooterColumnLink
                    key={p.name?.toString()}
                    href={`/docs/${p.$id}`}
                    className="group"
                    style={
                      {
                        "--item-color": `var(--doc-color-${p.$id}, --color-fd-foreground)`,
                      } as CSSProperties
                    }
                  >
                    {p.icon && (
                      <div className="size-4 mr-1 inline-block align-middle [&>svg]:size-3.5 text-muted-foreground group-hover:text-(--item-color)">
                        {p.icon}
                      </div>
                    )}
                    {p.name}
                  </FooterColumnLink>
                ))}
            </FooterColumn>

            <FooterColumn title="Legal">
              <FooterColumnLink href="#">Privacy Policy</FooterColumnLink>
            </FooterColumn>
          </div>
        </div>

        <p className="text-xs text-fd-muted-foreground/40">
          &copy; {new Date().getFullYear()}. AetherWare. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
