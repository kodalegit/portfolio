"use client";

import Link from "next/link";
import { useState } from "react";

import { topics, type Topic } from "@/lib/site";
import styles from "./writing-list.module.css";

export interface ListItem {
  slug: string;
  title: string;
  dek: string;
  dateLabel: string;
  date: string;
  topics: Topic[];
  metric?: { value: string; label: string };
}

interface Props {
  items: ListItem[];
  /** Heading level used for each title, so the list nests correctly on any page. */
  titleAs?: "h2" | "h3";
  headingId?: string;
}

export function TopicFilter({
  items,
  value,
  onChange,
}: {
  items: ListItem[];
  value: Topic | "all";
  onChange: (t: Topic | "all") => void;
}) {
  const counts = (Object.keys(topics) as Topic[])
    .map((t) => ({ t, n: items.filter((i) => i.topics.includes(t)).length }))
    .filter((c) => c.n > 0);
  return (
    <div className={styles.chips} role="group" aria-label="Filter articles by topic">
      <button type="button" className={styles.chip} aria-pressed={value === "all"} onClick={() => onChange("all")}>
        All <span>{items.length}</span>
      </button>
      {counts.map(({ t, n }) => (
        <button key={t} type="button" className={styles.chip} aria-pressed={value === t} onClick={() => onChange(t)}>
          {topics[t]} <span>{n}</span>
        </button>
      ))}
    </div>
  );
}

export function WritingList({ items, titleAs: Title = "h3", headingId }: Props) {
  const [topic, setTopic] = useState<Topic | "all">("all");
  const shown = topic === "all" ? items : items.filter((i) => i.topics.includes(topic));

  return (
    <div>
      <div className={styles.bar}>
        <TopicFilter items={items} value={topic} onChange={setTopic} />
        <p className={styles.count} aria-live="polite">
          {topic === "all" ? `${items.length} articles` : `${shown.length} of ${items.length} articles`}
        </p>
      </div>
      <ol className={styles.list} aria-labelledby={headingId}>
        {shown.map((p) => (
          <li key={p.slug}>
            <Link className={styles.row} href={`/writing/${p.slug}`}>
              <time className={styles.date} dateTime={p.date}>
                {p.dateLabel}
              </time>
              <span>
                <Title className={styles.title}>{p.title}</Title>
                <span className={styles.dek}>{p.dek}</span>
                <span className={styles.topics}>{p.topics.map((t) => topics[t]).join(", ")}</span>
              </span>
              {p.metric ? (
                <span className={`${styles.metric} mono`}>
                  <b>{p.metric.value}</b>
                  <small>{p.metric.label}</small>
                </span>
              ) : (
                <span />
              )}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
