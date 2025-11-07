import { SITE_NAME } from "@/config";

import { Hero } from "@/components/marketing/Hero";
import { metadataGenerator } from "@/lib/util/metadata";

export default function FundingPage() {
  return (
    <Hero
      titleLine1="Funding"
      titleLine2="Aether"
      description="Aether is a motion control platform that allows you to control like you never have before."
      mainButtonText="Get started"
      mainButtonHref="/docs/lib"
      altButtonText="I came here for 3D printing"
      altButtonHref="/docs/printer"
      background={{ from: "#fc6ff7", to: "#fc6ff7" }}
    />
  );
}

export const generateMetadata = metadataGenerator({
  title: { absolute: `Funding ${SITE_NAME}` },
  description: `${SITE_NAME} is a motion control platform that allows you to control like you never have before.`,
});
