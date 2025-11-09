import { notFound } from "next/navigation";

import { docsSource } from "@/lib/content";

import { ogImageGenerate } from "@/lib/util/metadata";

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<"/og/docs/[...slug]">,
) {
  const { slug } = await params;
  const page = docsSource.getPage(slug.slice(0, -1));
  if (!page) notFound();

  return ogImageGenerate({
    title: page.data.title,
    description: page.data.description,
  });
}

export function generateStaticParams() {
  return docsSource.getPages().map((page) => ({
    lang: page.locale,
    slug: [...page.slugs, "image.png"],
  }));
}
