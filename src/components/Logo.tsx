import type { FunctionComponent } from "react";

export type LogoProps = {};

export const Logo: FunctionComponent<LogoProps> = () => {
  return (
    <svg
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Logo"
    >
      <title>Logo</title>
      <circle cx={12} cy={12} r={12} fill="currentColor" />
    </svg>
  );
};
