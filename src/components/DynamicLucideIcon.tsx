import { createElement, type FunctionComponent, type SVGProps } from "react";

import { icons } from "lucide-react";

export const DynamicLucideIcon: FunctionComponent<
  {
    icon: keyof typeof icons | (string & {});
  } & SVGProps<SVGSVGElement>
> = ({ icon, ...props }) => {
  const Icon = icons[icon as keyof typeof icons];
  if (!icon) return null;

  return createElement(Icon, props);
};
