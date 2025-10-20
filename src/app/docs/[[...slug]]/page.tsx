import path from "node:path";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  EditOnGitHub,
} from "fumadocs-ui/page";

import { getDocsMdxPath, getDocsPageImage, source } from "@/lib/content";
import { DynamicLucideIcon } from "@/components/DynamicLucideIcon";
import {
  DOCS_GITHUB_BRANCH,
  DOCS_GITHUB_OWNER,
  DOCS_GITHUB_REPO,
  SITE_BASE_URL,
} from "@/config";
import { getMDXComponents } from "@/mdx-components";

import { AiActions, CopyMarkdownButton } from "@/components/docs/PageActions";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const mdxUrl = getDocsMdxPath(page);

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      lastUpdate={
        page.data.lastModified ? new Date(page.data.lastModified) : undefined
      }
      tableOfContent={{ style: "clerk" }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>

      <div className="flex flex-row items-center justify-between border-b pb-6">
        <div className="flex flex-row gap-2 items-center">
          <AiActions markdownUrl={mdxUrl} />
          <CopyMarkdownButton markdownUrl={mdxUrl} />
        </div>

        <div className="flex flex-row gap-2 items-center">
          <EditOnGitHub
            href={`https://github.com/${DOCS_GITHUB_OWNER}/${DOCS_GITHUB_REPO}/edit/${DOCS_GITHUB_BRANCH}/${page.absolutePath}`}
          />
        </div>
      </div>

      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: ({ href, ...props }) => {
              const found = source.getPageByHref(href ?? "", {
                dir: path.dirname(page.path),
              });

              if (!found) return <Link href={href} {...props} />;
              const pageHref = found.hash
                ? `${found.page.url}#${found.hash}`
                : found.page.url;

              return (
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Link href={pageHref} {...props} />
                  </HoverCardTrigger>
                  <HoverCardContent className="text-sm w-96">
                    <div className="flex justify-between gap-4">
                      {found.page.data.icon && (
                        <DynamicLucideIcon
                          icon={found.page.data.icon}
                          className="size-6"
                        />
                      )}
                      <div className="space-y-1 flex-1">
                        <h4 className="font-semibold">
                          {found.page.data.title}
                        </h4>
                        <p className="text-sm text-fd-muted-foreground">
                          {found.page.data.description}
                        </p>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              );
            },
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/docs/[[...slug]]">,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const image = getDocsPageImage(page);

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: image.url,
    },
    twitter: {
      images: image.url,
    },
    metadataBase: new URL(SITE_BASE_URL),
  };
}
