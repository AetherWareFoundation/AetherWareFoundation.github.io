export const SITE_NAME = "Aether";

export const GITHUB_URL = "https://github.com/AetherWareFoundation";
export const DISCORD_URL = "https://discord.gg/aetherware";

export const DOCS_GITHUB_OWNER = "AetherWareFoundation";
export const DOCS_GITHUB_REPO = "AetherWareFoundation.github.io";
export const DOCS_GITHUB_BRANCH = "main";

export const SITE_HOST = process.env.NEXT_PUBLIC_SITE_HOST ?? "localhost:3000";
export const SITE_PROTOCOL = `http${process.env.NODE_ENV === "production" ? "s" : ""}:`;
export const SITE_BASE_URL = `${SITE_PROTOCOL}//${SITE_HOST}`;
