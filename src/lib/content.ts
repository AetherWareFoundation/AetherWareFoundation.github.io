import type { Route } from "next";

import type { InferPageType } from "fumadocs-core/source";
import { loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { createMDXSource } from "fumadocs-mdx";

import { docs, people } from "@/.source";

const LLM_MDX_SUFFIX = ".md";

export const peopleSource = loader(createMDXSource(people), {
  baseUrl: "/people",
  plugins: [lucideIconsPlugin()],
});

export type PersonPage = InferPageType<typeof peopleSource>;

export const docsSource = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export type DocsPage = InferPageType<typeof docsSource>;

export function getDocsMdxPath(page: DocsPage): Route<`/docs-llm/${string}`> {
  return `/docs-llm/${page.slugs.join("/")}${LLM_MDX_SUFFIX}`;
}

export function getDocsMdxSlug(page: DocsPage): Array<string> {
  const slugs = [...page.slugs]; // make a copy, messes with the build otherwise

  // add md extension
  const last = slugs.pop();
  slugs.push(`${last}${LLM_MDX_SUFFIX}`);

  return slugs;
}

export function getDocsPageFromMdxUrl(
  slug: Array<string>,
): DocsPage | undefined {
  const slugs = [...slug];
  if (slugs.length > 0) {
    const s = slugs.pop();
    if (s) slugs.push(s.replace(LLM_MDX_SUFFIX, ""));
  }
  return docsSource.getPage(slugs);
}

export async function getDocsLLMText(page: DocsPage) {
  const processed = await page.data.getText("processed");
  return `# ${page.data.title} (${page.url})\n\n${processed}`;
}
