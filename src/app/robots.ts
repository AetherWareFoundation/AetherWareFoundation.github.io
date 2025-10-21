import type { MetadataRoute } from "next";

import { SITE_BASE_URL } from "@/config";

export const revalidate = false;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_BASE_URL}/sitemap.xml`,
  };
}
