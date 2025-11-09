import type { FunctionComponent, SVGProps } from "react";

import { cn } from "fumadocs-ui/utils/cn";

import { SITE_NAME } from "@/config";

export type LogoProps = SVGProps<SVGSVGElement>;

export const Logo: FunctionComponent<LogoProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Logo"
      viewBox="0 0 24 24"
      {...props}
      className={cn("size-6", props.className)}
    >
      <circle cx={12} cy={12} r={12} fill="currentColor" />
    </svg>
  );
};

export type LogoTextProps = {
  className?: string;
  logoClassName?: string;
  textClassName?: string;
};

export const LogoText: FunctionComponent<LogoTextProps> = ({
  className,
  logoClassName,
  textClassName,
}) => {
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-start gap-2.5",
        className,
      )}
    >
      <Logo className={cn("size-6", logoClassName)} />
      <span
        className={cn(
          "text-lg font-bold spacing tracking-[0.2rem]",
          textClassName,
        )}
      >
        {SITE_NAME}
      </span>
    </div>
  );
};
