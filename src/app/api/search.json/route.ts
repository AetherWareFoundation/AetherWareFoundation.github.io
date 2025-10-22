import { createFromSource } from "fumadocs-core/search/server";

import { source } from "@/lib/content";

export const revalidate = false;

export const { staticGET: GET } = createFromSource(source, {
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
