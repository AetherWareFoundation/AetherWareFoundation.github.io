import type { Metadata } from "next";
import { ImageResponse } from "next/og";

import {
  METADATA_KEYWORDS_DEFAULT,
  METADATA_KEYWORDS_DEFAULT_DOCS,
  SITE_BASE_URL,
} from "@/config";

import { type DocsPage, getDocsPageImage } from "../content";

export function generateOgImage(): string {
  const image = new ImageResponse(
    // ImageResponse JSX element
    <div
      style={{
        fontSize: 128,
        background: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      About Acme
    </div>,
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      width: 1200,
      height: 630,
    },
  );
  return image.url;
}

export type GenerateMetadataProps = {
  title?: Metadata["title"];
  description?: string;
  keywords?: Array<string>;
  noDefaultKeywords?: boolean;
  docsPage?: DocsPage;
};

export function metadataGenerator({
  title,
  description,
  keywords,
  noDefaultKeywords,
  docsPage,
}: GenerateMetadataProps): () => Metadata {
  // assemble keywords
  const kw: Array<string> = [];
  if (!noDefaultKeywords) kw.push(...METADATA_KEYWORDS_DEFAULT);
  if (docsPage && !noDefaultKeywords)
    kw.push(...METADATA_KEYWORDS_DEFAULT_DOCS);
  if (docsPage?.data.keywords) kw.push(...docsPage.data.keywords);
  if (keywords) kw.push(...keywords);

  // generate OG image
  let image: { segments: Array<string>; url: string } | undefined;
  if (docsPage) image = getDocsPageImage(docsPage);

  const md: Metadata = {
    title,
    description,
    keywords: kw,
    openGraph: { images: image?.url },
    twitter: { images: image?.url },
    metadataBase: new URL(SITE_BASE_URL),
  };
  return () => md;
}
