import type { ReactNode } from "react";

import { RootProvider } from "fumadocs-ui/provider";

import { StaticSearchDialog } from "@/components/root/StaticSearchDialog";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <RootProvider search={{ SearchDialog: StaticSearchDialog }}>
      {children}
    </RootProvider>
  );
}
