import type { Metadata } from "next";

import { WritingList, type ListItem } from "@/components/writing-list";
import { formatDate, getAllPosts } from "@/lib/posts";
import styles from "./writing.module.css";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Experiments and lessons from building AI agents, retrieval systems and evaluations in production, with the numbers and the code.",
  alternates: { canonical: "/writing" },
};

export default function WritingPage() {
  const items: ListItem[] = getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    dek: p.dek,
    date: p.date,
    dateLabel: formatDate(p.date, "short"),
    topics: p.topics,
    metric: p.metric,
  }));

  return (
    <main id="main" className="wrap">
      <header className={styles.head}>
        <h1>Writing</h1>
        <p>
          Each article starts from a decision in a system I run: what I tried, how I tested it, what the numbers
          showed, and what the test does not prove. Most link to the code and raw results.
        </p>
        <p className={styles.feed}>
          Follow along with the <a href="/rss.xml">RSS feed</a>.
        </p>
      </header>
      <WritingList items={items} titleAs="h2" />
    </main>
  );
}
