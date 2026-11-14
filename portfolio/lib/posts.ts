import "server-only";

import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { cache } from "react";
import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import { z } from "zod";

import { topics, projectLinks, type Topic, type ProjectId } from "./site";

const DIR = path.join(process.cwd(), "content", "writing");

const topicIds = Object.keys(topics) as [Topic, ...Topic[]];
const projectIds = Object.keys(projectLinks) as [ProjectId, ...ProjectId[]];

const Frontmatter = z.object({
  title: z.string(),
  /** Used in lists, "read next" and anywhere the full title is too long. */
  short: z.string(),
  /** What the article covers. Shown under the title. */
  dek: z.string(),
  /** The finding in one sentence. Used for search results, social cards and RSS. */
  result: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  topics: z.array(z.enum(topicIds)).min(1),
  project: z.enum(projectIds).optional(),
  metric: z.object({ value: z.string(), label: z.string() }).optional(),
  findingsTitle: z.string().default("Findings"),
  numbered: z.boolean().default(false),
  findings: z.array(z.string()).min(1),
  decision: z.string().optional(),
  setupTitle: z.string().default("Setup"),
  setup: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
  code: z
    .object({ path: z.string(), label: z.string(), note: z.string().optional() })
    .optional(),
});

export type PostMeta = z.infer<typeof Frontmatter> & {
  slug: string;
  minutes: number;
  toc: { id: string; text: string }[];
};

export type Post = PostMeta & { body: string };

/** Strips inline markdown so heading text matches what rehype-slug sees. */
const plain = (s: string) =>
  s
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, "$1")
    .trim();

function tableOfContents(body: string) {
  const slugger = new GithubSlugger();
  const toc: PostMeta["toc"] = [];
  let fenced = false;
  for (const line of body.split("\n")) {
    if (/^\s*```/.test(line)) fenced = !fenced;
    if (fenced) continue;
    const h = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!h) continue;
    const text = plain(h[2]);
    const id = slugger.slug(text);
    if (h[1].length === 2) toc.push({ id, text });
  }
  return toc;
}

function readingMinutes(body: string) {
  const words = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

function load(file: string): Post {
  const raw = readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  const parsed = Frontmatter.safeParse(data);
  if (!parsed.success) {
    throw new Error(`Bad frontmatter in ${file}:\n${parsed.error.message}`);
  }
  return {
    ...parsed.data,
    slug: file.replace(/\.mdx$/, ""),
    minutes: readingMinutes(content),
    toc: tableOfContents(content),
    body: content,
  };
}

export const getAllPosts = cache((): PostMeta[] =>
  readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file): PostMeta => {
      const { body, ...meta } = load(file);
      void body;
      return meta;
    })
    .sort((a, b) => b.date.localeCompare(a.date)),
);

export const getPost = cache((slug: string): Post | undefined => {
  const file = `${slug}.mdx`;
  if (!readdirSync(DIR).includes(file)) return undefined;
  return load(file);
});

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "13 November 2026", or "Nov 2026" for lists. */
export function formatDate(date: string, style: "long" | "short" = "long") {
  const [y, m, d] = date.split("-").map(Number);
  return style === "long" ? `${d} ${MONTHS[m - 1]} ${y}` : `${MONTHS[m - 1].slice(0, 3)} ${y}`;
}
