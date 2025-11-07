import { notFound } from "next/navigation";
import { type NextRequest, NextResponse } from "next/server";

import {
  docsSource,
  getDocsLLMText,
  getDocsMdxSlug,
  getDocsPageFromMdxUrl,
} from "@/lib/content";

export const revalidate = false;

export async function GET(
  _req: NextRequest,
  { params }: RouteContext<"/docs-llm/[[...slug]]">,
) {
  const { slug } = await params;
  const page = getDocsPageFromMdxUrl(slug ?? []);
  if (!page) notFound();

  const mdxText = await getDocsLLMText(page);

  return new NextResponse(mdxText, {
    headers: { "Content-Type": "text/markdown" },
  });
}

export function generateStaticParams() {
  const mapped = docsSource
    .generateParams()
    .map((p) => {
      type Params = typeof p;
      const page = docsSource.getPage(p.slug);
      if (!page) return null;

      return { ...p, slug: getDocsMdxSlug(page) } satisfies Params;
    })
    .filter((p) => !!p);
  return mapped;
}
