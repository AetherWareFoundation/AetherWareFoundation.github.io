import type { NextConfig } from "next/types";

import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const config: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  images: { unoptimized: true },
  output: "export",
};

export default withMDX(config);
