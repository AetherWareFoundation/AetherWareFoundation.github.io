import type { ReactNode } from "react";

export type ShowcasesProps = {
  children: ReactNode;
};

export const Showcases = ({ children }: ShowcasesProps) => {
  return (
    <div className="flex flex-col gap-6 lg:gap-10 my-6 lg:my-8">{children}</div>
  );
};

export type ShowcaseProps = {
  title: ReactNode;
  icon: ReactNode;
  children: ReactNode;
};

export const Showcase = ({ title, icon, children }: ShowcaseProps) => {
  return (
    <div className="flex gap-6 items-start">
      <div className="flex-shrink-0 size-6 lg:size-10 flex items-center justify-center [&>svg]:text-(--doc-color-lib)">
        {icon}
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <span className="text-lg font-semibold text-white">{title}</span>
        <div className="text-md text-fd-muted-foreground leading-relaxed [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
          {children}
        </div>
      </div>
    </div>
  );
};
