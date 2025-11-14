export const SITE_NAME = "Aether";

export const GITHUB_URL = "https://github.com/AetherWareFoundation";
export const DISCORD_URL = "https://discord.gg/aetherware";

export const DOCS_GITHUB_OWNER = "AetherWareFoundation";
export const DOCS_GITHUB_REPO = "AetherWareFoundation.github.io";
export const DOCS_GITHUB_BRANCH = "main";

export const SITE_HOST = process.env.NEXT_PUBLIC_SITE_HOST || "localhost:3000";
export const SITE_PROTOCOL = `http${process.env.NODE_ENV === "production" ? "s" : ""}:`;
export const SITE_BASE_URL = `${SITE_PROTOCOL}//${SITE_HOST}`;

export const IS_LIVE =
  process.env.NODE_ENV === "production" && !SITE_HOST.includes("localhost");

export const PLAUSIBLE_HOST = process.env.NEXT_PUBLIC_PLAUSIBLE_HOST || false;

export const METADATA_KEYWORDS_DEFAULT = [
  "AetherWare",
  "Aether",
  "Motion Control",
  "Rust",
  "Robotics",
  "OSS",
  "OSHW",
  "Open Source",
  "Open Source Hardware",
  "Open Source Software",
];
export const METADATA_KEYWORDS_DEFAULT_DOCS = [
  "Documentation",
  "Docs",
  "User Guide",
  "Documentation",
];
