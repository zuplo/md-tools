import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { unified } from "unified";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import rehypePrism from "@mapbox/rehype-prism";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkHeadings from "./extract-toc.js";

const aria = ["ariaDescribedBy", "ariaLabel", "ariaLabelledBy"];

export interface Heading {
  depth: number;
  value: string;
}

export interface RenderResult {
  html: Uint8Array | string;
  headings: Heading[];
}

export async function render(markdown: string): Promise<RenderResult> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkHeadings)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSanitize, {
      ...defaultSchema,
      attributes: {
        ...defaultSchema.attributes,
        form: [...aria, "className", "action", "method"],
        button: [...aria, "className", "type", "role"],
      },
      tagNames: [...(defaultSchema.tagNames ?? []), "form", "button"],
    })
    .use(rehypePrism)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeStringify)
    .process(markdown);

  return { html: result.value, headings: result.data.headings as Heading[] };
}
