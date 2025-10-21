import { notFound } from "next/navigation";
import { type NextRequest, NextResponse } from "next/server";

import { getDocsLLMText, source } from "@/lib/content";

export const revalidate = false;

export async function GET(
  _req: NextRequest,
  { params }: RouteContext<"/docs/llms.mdx/[[...slug]]">,
) {
  let { slug } = await params;
  if (slug && slug.length > 0 && slug.at(-1) === "index.mdx")
    slug = slug.slice(0, -1);
  const page = source.getPage(slug);
  if (!page) notFound();

  return new NextResponse(await getDocsLLMText(page), {
    headers: { "Content-Type": "text/markdown" },
  });
}

export function generateStaticParams() {
  const mapped = source
    .generateParams()
    .map((p) => {
      type Params = typeof p;
      const page = source.getPage(p.slug);
      if (!page) return null;

      const slugs = [...page.slugs]; // make a copy, messes with the build otherwise

      // index would collide with directories
      if (page.absolutePath.endsWith("/index.mdx")) slugs.push("index");

      // add mdx extension
      const last = slugs.pop();
      slugs.push(`${last}.mdx`);

      return { ...p, slug: slugs } satisfies Params;
    })
    .filter((p) => !!p);
  return mapped;
}
