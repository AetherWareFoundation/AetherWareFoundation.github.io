import type { MetadataRoute } from "next";

import { docsSource, getDocsMdxPath } from "@/lib/content";
import { SITE_BASE_URL } from "@/config";

export const revalidate = false;

type Sitemap = MetadataRoute.Sitemap;
type SitemapEntry = Sitemap[number];

function url(path: string): string {
  return new URL(path, SITE_BASE_URL).toString();
}

export default async function sitemap(): Promise<Sitemap> {
  const docsPages = docsSource.getPages();
  return [
    // marketing
    {
      url: url("/"),
      changeFrequency: "monthly",
      priority: 1,
    },

    // docs (pages and mdx)
    ...docsPages.flatMap((page) => {
      const { lastModified } = page.data;
      const entryPage: SitemapEntry = {
        url: url(page.url),
        lastModified: lastModified ? new Date(lastModified) : undefined,
        changeFrequency: "weekly",
        priority: 0.5,
      };
      const entryMdx: SitemapEntry = {
        ...entryPage,
        url: url(getDocsMdxPath(page)),
        priority: 0.2,
      };

      return [entryPage, entryMdx];
    }),
  ];
}
