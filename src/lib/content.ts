import type { Route } from "next";

import type { InferPageType } from "fumadocs-core/source";
import { loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";

import { docs } from "@/.source";

export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export function getDocsPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, "image.png"];
  return {
    segments,
    url: `/og/docs/${segments.join("/")}`,
  };
}

export function getDocsMdxPath(
  page: InferPageType<typeof source>,
): Route<`/docs-llm/${string}`> {
  return `/docs-llm/${page.slugs.join("/")}.md`;
}

export function getDocsMdxSlug(
  page: InferPageType<typeof source>,
): Array<string> {
  const slugs = [...page.slugs]; // make a copy, messes with the build otherwise

  // add md extension
  const last = slugs.pop();
  slugs.push(`${last}.md`);

  return slugs;
}

export function getDocsPageFromMdxUrl(
  slug: Array<string>,
): InferPageType<typeof source> | undefined {
  const slugs = [...slug];
  if (slugs.length > 0) {
    const s = slugs.pop();
    if (s) slugs.push(s.replace(".md", ""));
  }
  console.log(slugs);
  return source.getPage(slugs);
}

export async function getDocsLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText("processed");
  return `# ${page.data.title} (${page.url})\n\n${processed}`;
}
