import { HomeLayout } from "fumadocs-ui/layouts/home";

import { GITHUB_URL, SITE_NAME } from "@/config";
import { linkItems } from "@/config.layout";

import { Footer } from "@/components/marketing/Footer";
import { LogoText } from "@/components/shared/Logo";
import { metadataGenerator } from "@/lib/util/metadata";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <HomeLayout
      nav={{ title: <LogoText /> }}
      githubUrl={GITHUB_URL}
      links={[...linkItems]}
    >
      {children}

      <Footer />
    </HomeLayout>
  );
}

export const generateMetadata = metadataGenerator({
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME}`,
  },
  description: `${SITE_NAME} is a motion control ecosystem for the robotics of tomorrow.`,
});
