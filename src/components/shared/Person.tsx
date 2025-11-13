import type { Route } from "next";
import Image from "next/image";
import type { FunctionComponent } from "react";

import { cn } from "fumadocs-ui/utils/cn";

import { GlobeIcon, MapPinIcon } from "lucide-react";

import { type PersonPage, peopleSource } from "@/lib/content";

import { SafeLink } from "./SafeLink";
import {
  GitHubIcon,
  InstagramIcon,
  YouTubeIcon,
} from "@/components/shared/icons";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export type PersonProps = {
  personId: string;
  disableUnderline?: boolean;
  className?: string;
};

function authorMeta(person: PersonPage): { initials: string; color: string } {
  let hash = 0;
  for (const c of person.data.title.split("")) {
    hash = c.charCodeAt(0) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  let initials = "";
  const nameParts = person.data.title.split(" ");
  initials += nameParts[0].charAt(0).toUpperCase();
  if (nameParts.length > 1)
    initials += nameParts[nameParts.length - 1].charAt(0).toUpperCase();

  return { initials, color };
}

export const Person: FunctionComponent<PersonProps> = ({
  personId,
  disableUnderline,
  className,
}) => {
  const authorSlug = personId.toLowerCase().replaceAll(" ", "-");

  const a = peopleSource.getPage([authorSlug]);

  if (!a) return <span className={className}>{personId}</span>;

  const { initials, color } = authorMeta(a);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span
          className={cn(
            !disableUnderline && "underline underline-offset-2",
            className,
          )}
        >
          {a.data.nickname ?? a.data.title}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="text-sm min-w-64 max-w-96">
        <div className="flex flex-col justify-between items-center">
          <div className="flex flex-row items-center">
            {a.data.picture ? (
              <Image
                className="rounded-full size-24 object-cover border-4 border-primary"
                src={a.data.picture}
                alt="Author"
                width={64}
                height={64}
              />
            ) : (
              <div
                className="flex items-center justify-center rounded-full size-24 border-4 border-primary"
                style={{ backgroundColor: color }}
              >
                <span className="text-white text-4xl font-bold tracking-wide">
                  {initials}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center">
            <div className="font-semibold text-xl">{a.data.title}</div>

            {a.data.location && (
              <span className="text-xs text-muted-foreground align-baseline">
                <MapPinIcon className="size-3 mr-1 inline-block" />
                {a.data.location}
              </span>
            )}

            {Object.values(a.data.socials ?? {}).filter(Boolean).length > 0 && (
              <div className="mt-2 w-full flex flex-row items-center justify-center gap-3 text-muted-foreground *:hover:text-foreground transition">
                {a.data.socials?.website && (
                  <SafeLink
                    href={a.data.socials.website as Route}
                    forceExternal
                    disableIcon
                  >
                    <GlobeIcon className="size-5" />
                  </SafeLink>
                )}
                {a.data.socials?.github && (
                  <SafeLink
                    href={a.data.socials.github as Route}
                    forceExternal
                    disableIcon
                  >
                    <GitHubIcon className="size-5" />
                  </SafeLink>
                )}
                {a.data.socials?.instagram && (
                  <SafeLink
                    href={a.data.socials.instagram as Route}
                    forceExternal
                    disableIcon
                  >
                    <InstagramIcon className="size-5" />
                  </SafeLink>
                )}
                {a.data.socials?.youtube && (
                  <SafeLink
                    href={a.data.socials.youtube as Route}
                    forceExternal
                    disableIcon
                  >
                    <YouTubeIcon className="size-5" />
                  </SafeLink>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-1 mt-4">
            {a.data.description && (
              <p className="text-xs text-muted-foreground">
                {a.data.description}
              </p>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
