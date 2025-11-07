import { createFromSource } from "fumadocs-core/search/server";

import { docsSource } from "@/lib/content";

export const revalidate = false;

export const { staticGET: GET } = createFromSource(docsSource, {
  buildIndex: (page) => {
    return {
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      id: page.url,
      structuredData: page.data.structuredData,
      tag: page.slugs[0],
    };
  },
});
