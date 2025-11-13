import type { CSSProperties } from "react";

import { DocsLayout } from "fumadocs-ui/layouts/docs";

import { docsSource } from "@/lib/content";
import { SITE_NAME } from "@/config";
import { linkItems } from "@/config.layout";

import { LogoText } from "@/components/shared/Logo";
import { metadataGenerator } from "@/lib/util/metadata";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout
      tree={docsSource.pageTree}
      links={linkItems.filter((item) => item.type === "icon")}
      nav={{ title: <LogoText /> }}
      sidebar={{
        tabs: {
          transform: (option, node) => {
            const meta = docsSource.getNodeMeta(node);
            if (!meta || !node.icon) return option;
            const docSection = meta.path.split("/")[0];

            const color = `var(--doc-color-${docSection}, var(--color-fd-foreground))`;

            return {
              ...option,
              icon: (
                <div
                  className="[&_svg]:size-full rounded-lg size-full text-(--tab-color) max-md:bg-(--tab-color)/10 max-md:border max-md:p-1.5"
                  style={{ "--tab-color": color } as CSSProperties}
                >
                  {node.icon}
                </div>
              ),
            };
          },
        },
      }}
    >
      {children}
    </DocsLayout>
  );
}

export const generateMetadata = metadataGenerator({
  title: {
    template: `%s | ${SITE_NAME} Documentation`,
    default: `${SITE_NAME} Documentation`,
  },
});
