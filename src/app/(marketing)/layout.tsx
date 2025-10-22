import { HomeLayout } from "fumadocs-ui/layouts/home";

import { LogoText } from "@/components/Logo";
import { GITHUB_URL } from "@/config";
import { linkItems } from "@/config.layout";

import { Footer } from "@/components/marketing/Footer";

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
