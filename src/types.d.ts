declare module "remark-admonitions" {
  // This wrapper exists because JS in TS can’t export a `@type` of a function.
  import type { Root } from "mdast";
  import type { Plugin } from "unified";

  declare const remarkAdmonitions: Plugin<void[], string, Root>;
  export default remarkAdmonitions;
}
