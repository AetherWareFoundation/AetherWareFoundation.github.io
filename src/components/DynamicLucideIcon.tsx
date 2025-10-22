import { createElement, type FunctionComponent, type SVGProps } from "react";

import { icons } from "lucide-react";

export type LucideIconName = keyof typeof icons;

export const DynamicLucideIcon: FunctionComponent<
  {
    icon: LucideIconName | (string & {});
  } & SVGProps<SVGSVGElement>
> = ({ icon, ...props }) => {
  const Icon = icons[icon as LucideIconName];
  if (!icon) return null;

  return createElement(Icon, props);
};
