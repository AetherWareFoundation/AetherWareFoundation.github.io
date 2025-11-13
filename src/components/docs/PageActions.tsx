"use client";

import { useMemo, useState } from "react";

import { buttonVariants } from "fumadocs-ui/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "fumadocs-ui/components/ui/popover";
import { cn } from "fumadocs-ui/utils/cn";
import { useCopyButton } from "fumadocs-ui/utils/use-copy-button";

import {
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  ExternalLinkIcon,
} from "lucide-react";

import { AnthropicClaudeIcon, OpenAiIcon } from "../shared/icons";

// cache for the duration of the pageload
const cache = new Map<string, string>();

export function CopyMarkdownButton({ markdownUrl }: { markdownUrl: string }) {
  const [isLoading, setLoading] = useState(false);
  const [checked, onClick] = useCopyButton(async () => {
    const cached = cache.get(markdownUrl);
    if (cached) return navigator.clipboard.writeText(cached);

    setLoading(true);

    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/plain": fetch(markdownUrl).then(async (res) => {
            const content = await res.text();
            cache.set(markdownUrl, content);

            return content;
          }),
        }),
      ]);
    } finally {
      setLoading(false);
    }
  });

  return (
    <button
      type="button"
      disabled={isLoading}
      className={cn(
        buttonVariants({
          color: "secondary",
          size: "sm",
          className: cn(
            "gap-2 [&_svg]:size-3.5 [&_svg]:text-fd-muted-foreground",
            "cursor-pointer",
          ),
        }),
      )}
      onClick={onClick}
    >
      {checked ? <CheckIcon /> : <CopyIcon />}
      Copy Markdown
    </button>
  );
}

export function AiActions({ markdownUrl }: { markdownUrl: string }) {
  const resolvedMarkdownUrl = useMemo(() => {
    if (typeof window === "undefined") return "Loading...";
    const url = new URL(
      `${window.location.protocol}//${window.location.host}${markdownUrl}`,
    );
    url.pathname = markdownUrl;
    return url.toString();
  }, [markdownUrl]);

  const items = useMemo(() => {
    const q = `Read this web page: ${resolvedMarkdownUrl}\nI want to ask questions about it.`;

    return [
      {
        title: "Open in ChatGPT",
        href: `https://chatgpt.com/?${new URLSearchParams({
          hints: "search",
          q,
        })}`,
        icon: <OpenAiIcon />,
      },
      {
        title: "Open in Claude",
        href: `https://claude.ai/new?${new URLSearchParams({
          q,
        })}`,
        icon: <AnthropicClaudeIcon />,
      },
    ];
  }, [resolvedMarkdownUrl]);

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          buttonVariants({
            color: "secondary",
            size: "sm",
            className: cn("gap-2", "cursor-pointer"),
          }),
        )}
      >
        <ExternalLinkIcon className="size-3.5 text-fd-muted-foreground" />
        Ask AI...
        <ChevronDownIcon className="size-3.5 text-fd-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            rel="noreferrer noopener"
            target="_blank"
            className="text-sm p-2 rounded-lg inline-flex items-center gap-2 hover:text-fd-accent-foreground hover:bg-fd-accent [&_svg]:size-4"
          >
            {item.icon}
            {item.title}
            <ExternalLinkIcon className="text-fd-muted-foreground size-3.5 ms-auto" />
          </a>
        ))}
      </PopoverContent>
    </Popover>
  );
}
