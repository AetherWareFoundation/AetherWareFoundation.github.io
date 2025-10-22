import type { FunctionComponent, ReactNode } from "react";

import { cn } from "fumadocs-ui/utils/cn";

export type FeatureSectionItemProps = {
  title: ReactNode;
  children: ReactNode;
  className?: string;
};

export const FeatureSectionItem: FunctionComponent<FeatureSectionItemProps> = ({
  title,
  children,
  className,
}) => (
  <div
    className={cn(
      "p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-lg",
      className,
    )}
  >
    <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
    <p className="text-white/60">{children}</p>
  </div>
);

export type FeatureSectionProps = {
  title?: ReactNode;
  children: ReactNode;
  className?: string;
};

export const FeatureSection: FunctionComponent<FeatureSectionProps> = ({
  title,
  children,
  className,
}) => (
  <section className={cn("relative py-24 px-4 sm:px-6 lg:px-8", className)}>
    <div className="mx-auto max-w-fd-container">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
        <span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    </div>
  </section>
);
