import path from "node:path";

import type { Metadata, Route } from "next";
import { notFound } from "next/navigation";
import { type ComponentPropsWithoutRef, Fragment } from "react";

import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  EditOnGitHub,
} from "fumadocs-ui/page";

import { DotIcon } from "lucide-react";

import { getDocsMdxPath, getDocsPageImage, source } from "@/lib/content";
import { SafeLink } from "@/components/SafeLink";
import {
  DOCS_GITHUB_BRANCH,
  DOCS_GITHUB_OWNER,
  DOCS_GITHUB_REPO,
  SITE_BASE_URL,
} from "@/config";
import { getMDXComponents } from "@/mdx-components";

import { AiActions, CopyMarkdownButton } from "@/components/docs/PageActions";
import { PageLink } from "@/components/docs/PageLink";

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
      <DocsDescription className="mb-0">
        {page.data.description}

        {(page.data.authors?.length ?? 0) > 0 && (
          <span className="text-xs text-fd-muted-foreground pt-2 flex items-center gap-2">
            <span className="font-semibold">Written by</span>
            <span className="flex items-center gap-[0.1rem]">
              {page.data.authors?.map((author, i) => (
                <Fragment key={author}>
                  {i > 0 && <DotIcon className="size-3 -mx-0.5" />}
                  {author}
                </Fragment>
              ))}
            </span>
          </span>
        )}
      </DocsDescription>

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

      <DocsBody className="docs-body">
        <MDX
          components={getMDXComponents({
            a: ({ href, ...props }: ComponentPropsWithoutRef<"a">) => {
              const found = source.getPageByHref(href ?? "", {
                dir: path.dirname(page.path),
              });

              // link is not a docs page
              if (!found) return <SafeLink href={href as Route} {...props} />;
              return <PageLink page={found} {...props} />;
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
