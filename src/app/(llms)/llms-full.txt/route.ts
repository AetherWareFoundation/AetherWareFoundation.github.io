import { getDocsLLMText, source } from "@/lib/content";

export const revalidate = false;

export async function GET() {
  const scan = source.getPages().map(getDocsLLMText);
  const scanned = await Promise.all(scan);

  return new Response(scanned.join("\n\n"));
}
