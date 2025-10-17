import { HomeLayout } from "fumadocs-ui/layouts/home";

import { GITHUB_URL } from "@/config";
import { linkItems, sharedBaseLayoutOptions } from "@/config.layout";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <HomeLayout
      {...sharedBaseLayoutOptions}
      githubUrl={GITHUB_URL}
      links={[...linkItems]}
    >
      {children}
    </HomeLayout>
  );
}
