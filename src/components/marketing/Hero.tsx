import type { Route } from "next";
import type { ReactNode } from "react";

import { cn } from "fumadocs-ui/utils/cn";

import { SafeLink } from "../SafeLink";

export type HeroProps<TMain extends string, TAlt extends string> = {
  titleLine1: ReactNode;
  titleLine2: ReactNode;
  description: ReactNode;
  mainButtonText: ReactNode;
  mainButtonHref: Route<TMain>;
  altButtonText: ReactNode;
  altButtonHref: Route<TAlt>;
  background: { youtubeUrl: string } | { from: string; to: string };
  className?: string;
  children?: ReactNode;
};

export function Hero<TMain extends string, TAlt extends string>({
  titleLine1,
  titleLine2,
  description,
  mainButtonText,
  mainButtonHref,
  altButtonText,
  altButtonHref,
  background,
  className,
  children,
}: HeroProps<TMain, TAlt>) {
  const getYouTubeVideoId = (url: string): string | null => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden flex items-center justify-center",
        className,
      )}
    >
      <div className="absolute inset-0">
        {"from" in background && "to" in background && (
          <>
            <div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage: `linear-gradient(to bottom right, ${background.from}, transparent, ${background.to})`,
              }}
            ></div>
            <div className="absolute inset-0 backdrop-blur-[50px] sm:backdrop-blur-[100px]"></div>
            <div className="absolute top-1/4 -left-20 w-[20rem] sm:w-[30rem] lg:w-[40rem] h-[20rem] sm:h-[30rem] lg:h-[40rem] bg-gradient-to-br from-violet-600/30 to-fuchsia-600/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 -right-20 w-[20rem] sm:w-[30rem] lg:w-[40rem] h-[20rem] sm:h-[30rem] lg:h-[40rem] bg-gradient-to-br from-cyan-600/30 to-blue-600/30 rounded-full blur-3xl"></div>
          </>
        )}

        {"youtubeUrl" in background && background.youtubeUrl && (
          <div className="absolute inset-0">
            <iframe
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] pointer-events-none"
              src={
                `https://www.youtube.com/embed/${getYouTubeVideoId(background.youtubeUrl)}` +
                `?playlist=${getYouTubeVideoId(background.youtubeUrl)}` +
                `&autoplay=1&mute=1&loop=1&controls=0&showinfo=0&playsinline=1&modestbranding=1&rel=0`
              }
              allow="autoplay; fullscreen"
              title="Background video"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute inset-0 backdrop-blur-[5px] sm:backdrop-blur-[10px]"></div>
          </div>
        )}
      </div>

      <div className="relative w-full max-w-[80dvw] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                <span className="inline-block bg-gradient-to-r from-violet-300 via-cyan-300 to-violet-300 bg-[length:200%_auto] bg-clip-text text-transparent">
                  {titleLine1}
                </span>
                <span className="block mt-2 text-white">{titleLine2}</span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-white/60 max-w-xl mx-auto lg:mx-0">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <SafeLink
                href={mainButtonHref as Route}
                disableIcon
                className="group relative w-full sm:w-auto px-6 py-3 min-w-[160px] cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-lg"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-lg blur-lg group-hover:opacity-60 transition-opacity duration-500"></div>
                <div className="relative flex items-center justify-center gap-2">
                  <span className="text-white font-medium">
                    {mainButtonText}
                  </span>
                  <svg
                    className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <title>Arrow Right</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </SafeLink>

              <SafeLink
                href={altButtonHref as Route}
                disableIcon
                className="w-full sm:w-auto px-6 py-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-lg text-white/70 hover:bg-white/10 hover:text-white transition-all min-w-[160px] cursor-pointer"
              >
                {altButtonText}
              </SafeLink>
            </div>
          </div>

          <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] mt-8 lg:mt-0 flex flex-col items-center justify-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
