import { remarkMdxMermaid } from "fumadocs-core/mdx-plugins";
import {
  defineCollections,
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config";

import { z } from "zod";

export const docs = defineDocs({
  docs: {
    schema: frontmatterSchema.extend({
      authors: z.array(z.string()),
      keywords: z.optional(z.array(z.string())),
    }),
    postprocess: { includeProcessedMarkdown: true },
  },
  meta: { schema: metaSchema },
});

export const people = defineCollections({
  dir: "content/people",
  type: "doc",
  schema: frontmatterSchema.extend({
    nickname: z.optional(z.string()),
    picture: z.optional(z.string()),
    location: z.optional(z.string()),
    socials: z.optional(
      z.object({
        website: z.optional(z.string()),
        github: z.optional(z.string()),
      }),
    ),
  }),
});

export default defineConfig({
  lastModifiedTime: "git",
  mdxOptions: {
    remarkCodeTabOptions: { parseMdx: true },
    remarkPlugins: [remarkMdxMermaid],
  },
});
