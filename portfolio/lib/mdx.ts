import "server-only";

import { evaluate } from "@mdx-js/mdx";
import rehypeShiki from "@shikijs/rehype";
import * as runtime from "react/jsx-runtime";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { createCssVariablesTheme } from "shiki";

/** Code colours come from the --shiki-* variables in app/globals.css, so they follow the theme. */
const theme = createCssVariablesTheme({
  name: "site",
  variablePrefix: "--shiki-",
  fontStyle: true,
});

/** Compiles an article's MDX body at build time. */
export async function compileArticle(source: string) {
  const { default: Content } = await evaluate(source, {
    ...runtime,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypeShiki, { theme, defaultLanguage: "text" }]],
  });
  return Content;
}
