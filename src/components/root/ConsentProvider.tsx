import type { FunctionComponent, ReactNode } from "react";

import {
  ConsentManagerDialog,
  ConsentManagerProvider,
  CookieBanner,
} from "@c15t/nextjs/client";
import { useTheme } from "next-themes";

export const ConsentProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const { resolvedTheme } = useTheme();

  return children;

  // biome-ignore lint/correctness/noUnreachable: not yet used
  return (
    <ConsentManagerProvider
      options={{
        mode: "offline",
        react: {
          colorScheme: resolvedTheme === "dark" ? "dark" : "light",
          scrollLock: true,
        },
        // add scripts here when needed
      }}
    >
      <CookieBanner />
      <ConsentManagerDialog />
      {children}
    </ConsentManagerProvider>
  );
};
