import type { Route } from "next";
import type { CSSProperties, FunctionComponent, ReactNode } from "react";

import { cn } from "fumadocs-ui/utils/cn";
import type { Folder } from "fumadocs-core/page-tree";

import { source } from "@/lib/content";

import { LogoText } from "../Logo";
import { SafeLink } from "../SafeLink";
import { isLinkExternal } from "@/lib/util/helpers";

type SocialIconProps = {
  href: Route | (string & {});
  forceExternal?: boolean;
  name: ReactNode;
  children: ReactNode;
};

const SocialIcon: FunctionComponent<SocialIconProps> = ({
  href,
  forceExternal,
  name,
  children,
}) => (
  <li>
    <SafeLink
      href={href as Route}
      forceExternal={forceExternal}
      disableIcon
      rel="noreferrer"
      className="text-fd-muted-foreground hover:text-fd-foreground transition"
    >
      <span className="sr-only">{name}</span>
      {children}
    </SafeLink>
  </li>
);

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
      target={isLinkExternal(href ?? "") ? "_blank" : undefined}
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
              Open Source Motion Control with the feeling of a best-in-class
              product.
            </p>

            <ul className="mt-8 flex gap-6">
              <SocialIcon href="https://instagram.com/#" name="Instagram">
                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
                  <title>Instagram</title>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  />
                </svg>
              </SocialIcon>

              <SocialIcon href="/discord" name="Discord" forceExternal>
                <svg
                  className="size-6"
                  fill="currentColor"
                  viewBox="0 -28.5 256 256"
                >
                  <title>Discord</title>
                  <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" />
                </svg>
              </SocialIcon>

              <SocialIcon
                href="https://github.com/AetherWareFoundation"
                name="GitHub"
              >
                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
                  <title>GitHub</title>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              </SocialIcon>
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
              {source.pageTree.children
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
