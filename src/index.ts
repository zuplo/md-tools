import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { unified } from "unified";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import rehypePrism from "@mapbox/rehype-prism";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkHeadings from "./extract-toc.js";

export interface Heading {
  depth: number;
  value: string;
}

export interface RenderResult {
  html: string | Buffer;
  headings: Heading[];
}

export async function render(markdown: string): Promise<RenderResult> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkHeadings)
    .use(remarkRehype)
    .use(rehypePrism)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeStringify)
    .process(markdown);

  return { html: result.value, headings: result.data.headings as Heading[] };
}
