import type { Route } from "next";

import type { LinkItemType } from "fumadocs-ui/layouts/shared";

import { FileTextIcon, HandHeartIcon, HandshakeIcon } from "lucide-react";

import { DiscordIcon } from "@/components/icons";

export const linkItems: Array<LinkItemType> = [
  // main navigation
  {
    icon: <FileTextIcon />,
    text: "Documentation",
    url: "/docs/lib",
  },
  {
    icon: <HandshakeIcon />,
    text: "About us",
    url: "/about",
  },
  {
    icon: <HandHeartIcon />,
    text: "Sponsors",
    url: "/funding",
  },

  // small icons to the right
  {
    type: "icon",
    icon: <DiscordIcon />,
    text: "Discord",
    url: "/discord" satisfies Route,
    external: true,
    secondary: true,
  },
];
