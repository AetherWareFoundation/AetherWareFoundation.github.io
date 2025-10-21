import { remarkMdxMermaid } from "fumadocs-core/mdx-plugins";
import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config";

import { z } from "zod";

// https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  docs: {
    schema: frontmatterSchema.extend({
      authors: z.optional(z.array(z.string())),
    }),
    postprocess: { includeProcessedMarkdown: true },
  },
  meta: { schema: metaSchema },
});

export default defineConfig({
  lastModifiedTime: "git",
  mdxOptions: {
    remarkCodeTabOptions: { parseMdx: true },
    remarkPlugins: [remarkMdxMermaid],
  },
});
