import type { ReactNode } from "react";

import { cn } from "fumadocs-ui/utils/cn";

export type ShowcasesProps = {
  cols?: 1 | 2;
  children: ReactNode;
};

export const Showcases = ({ cols, children }: ShowcasesProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 lg:gap-10 my-6 lg:my-8",
        cols === 2 && "lg:grid-cols-2",
      )}
    >
      {children}
    </div>
  );
};

export type ShowcaseProps = {
  title: ReactNode;
  icon: ReactNode;
  children: ReactNode;
};

export const Showcase = ({ title, icon, children }: ShowcaseProps) => {
  return (
    <div className="flex gap-6 lg:gap-4 items-start">
      <div className="flex-shrink-0 size-8 flex items-center justify-center [&>svg]:size-full [&>svg]:text-(--doc-color-lib)">
        {icon}
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <span className="text-lg font-semibold text-fd-foreground">
          {title}
        </span>
        <div className="text-md text-fd-muted-foreground leading-relaxed [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
          {children}
        </div>
      </div>
    </div>
  );
};
