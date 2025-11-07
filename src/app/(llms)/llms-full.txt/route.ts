import { docsSource, getDocsLLMText } from "@/lib/content";

export const revalidate = false;

export async function GET() {
  const scan = docsSource.getPages().map(getDocsLLMText);
  const scanned = await Promise.all(scan);

  return new Response(scanned.join("\n\n"));
}
