import type { Metadata } from "next";
import { ImageResponse } from "next/og";

import {
  METADATA_KEYWORDS_DEFAULT,
  METADATA_KEYWORDS_DEFAULT_DOCS,
  SITE_BASE_URL,
} from "@/config";

import type { DocsPage } from "../content";
import { MetaImage } from "./MetaImage";

export type GenerateOgImageProps = {
  title: string;
  description?: string;
};

export function ogImageGenerate({
  title,
  description,
}: GenerateOgImageProps): ImageResponse {
  return new ImageResponse(
    <MetaImage title={title} description={description} />,
    { width: 1200, height: 630 },
  );
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
  let imageUrl: string | undefined;
  if (docsPage) imageUrl = `/og/docs/${docsPage.slugs.join("/")}/image.png`;

  const md: Metadata = {
    title,
    description,
    keywords: kw,
    openGraph: { images: imageUrl ? [{ url: imageUrl }] : undefined },
    twitter: { images: imageUrl ? [{ url: imageUrl }] : undefined },
    metadataBase: new URL(SITE_BASE_URL),
  };
  return () => md;
}
