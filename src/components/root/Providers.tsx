import type { ReactNode } from "react";

import { RootProvider } from "fumadocs-ui/provider";

import { ConsentProvider } from "./ConsentProvider";
import { StaticSearchDialog } from "@/components/root/StaticSearchDialog";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ConsentProvider>
      <RootProvider search={{ SearchDialog: StaticSearchDialog }}>
        {children}
      </RootProvider>
    </ConsentProvider>
  );
}
