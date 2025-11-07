import "./global.css";

import { ThemedBody } from "@/app/ThemedBody";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ThemedBody>{children}</ThemedBody>
    </html>
  );
}
