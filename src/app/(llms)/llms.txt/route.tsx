import { docsSource } from "@/lib/content";
import { SITE_NAME } from "@/config";

export const revalidate = false;

export async function GET() {
  const scanned: string[] = [];
  scanned.push(`# ${SITE_NAME} Documentation`);
  const map = new Map<string, string[]>();

  for (const page of docsSource.getPages()) {
    const dir = page.slugs[0];
    const list = map.get(dir) ?? [];
    list.push(`- [${page.data.title}](${page.url}): ${page.data.description}`);
    map.set(dir, list);
  }

  for (const [key, value] of map) {
    scanned.push(`## ${key}`);
    scanned.push(value.join("\n"));
  }

  return new Response(scanned.join("\n\n"));
}
