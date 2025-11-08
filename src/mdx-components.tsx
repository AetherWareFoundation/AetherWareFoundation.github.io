import {
  ImageZoom,
  type ImageZoomProps,
} from "fumadocs-ui/components/image-zoom";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import defaultMdxComponents from "fumadocs-ui/mdx";

import type { MDXComponents } from "mdx/types";

import { Mermaid } from "./components/mdx/Mermaid";
import * as ShowcaseComponents from "./components/mdx/Showcase";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,

    // fumadocs extensions
    img: (props) => <ImageZoom {...(props as unknown as ImageZoomProps)} />,
    ...TabsComponents,

    // custom components
    Mermaid,
    ...ShowcaseComponents,

    // passthrough and overrides
    ...components,
  };
}
