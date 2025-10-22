import type { Metadata } from "next";

import { SITE_BASE_URL } from "@/config";

import {
  FeatureSection,
  FeatureSectionItem,
} from "@/components/marketing/FeatureSection";
import { Hero } from "@/components/marketing/Hero";

export default function LandingPage() {
  return (
    <main className="flex flex-col">
      <section className="min-h-section flex">
        <Hero
          titleLine1="The future of"
          titleLine2="Motion Control"
          description="Make your robots move with ease. Aether is a motion control platform that allows you to control like you never have before."
          mainButtonText="Get started"
          mainButtonHref="/docs/lib"
          altButtonText="I came here for 3D printing"
          altButtonHref="/docs/printer"
          background={{ from: "#fc6ff7", to: "#fc6ff7" }}
          className="flex-1"
        />
      </section>

      <FeatureSection title="Batteries included? We think so.">
        <FeatureSectionItem title="Precision Control">
          Advanced algorithms for smooth and accurate motion control.
        </FeatureSectionItem>
        <FeatureSectionItem title="Easy Integration">
          Simple APIs and SDKs to get your robots moving quickly.
        </FeatureSectionItem>
        <FeatureSectionItem title="Real-time Feedback">
          Monitor and adjust motion parameters on the fly.
        </FeatureSectionItem>
      </FeatureSection>
    </main>
  );
}

export async function generateMetadata(
  _props: PageProps<"/">,
): Promise<Metadata> {
  return {
    title: "Aether",
    description:
      "Aether is a motion control ecosystem for the robotics of tomorrow.",
    metadataBase: new URL(SITE_BASE_URL),
  };
}
