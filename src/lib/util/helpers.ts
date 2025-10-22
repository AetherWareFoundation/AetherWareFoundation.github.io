import { SITE_BASE_URL } from "@/config";

export function isLinkExternal(href: string): boolean {
  return !!href?.match(/^https?:\/\//) && !href?.includes(SITE_BASE_URL);
}
