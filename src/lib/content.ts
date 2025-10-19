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

export async function getDocsLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText("processed");
  return `# ${page.data.title} (${page.url})\n\n${processed}`;
}
