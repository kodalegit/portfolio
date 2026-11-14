"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";

import { kindLabels, type TraceLayout } from "@/lib/work";
import { DemoButton, PlayIcon } from "./demo-button";
import styles from "./trace.module.css";

interface Props {
  layout: TraceLayout;
  /** Short titles for the article slugs a span links to. */
  articles: Record<string, string>;
  initial?: string;
}

/**
 * Work history drawn like an agent trace: one span per engagement on a shared
 * time axis, with an inspector that shows the selected span's details.
 */
export function Trace({ layout, articles, initial = "crafted" }: Props) {
  const { spans, ticks, now } = layout;
  const [selected, setSelected] = useState(initial);
  const rows = useRef<(HTMLButtonElement | null)[]>([]);
  const span = spans.find((s) => s.id === selected) ?? spans[0];

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = spans.length - 1;
    const next =
      e.key === "ArrowDown"
        ? Math.min(i + 1, last)
        : e.key === "ArrowUp"
          ? Math.max(i - 1, 0)
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    rows.current[next]?.focus();
    setSelected(spans[next].id);
  };

  return (
    <div className={styles.trace}>
      <div className={`${styles.axis} mono`} aria-hidden="true">
        <span />
        <div className={styles.ticks}>
          {ticks.map((t) => (
            <span
              key={t.label}
              className={styles.tick}
              style={{ left: `${t.at}%` }}
            >
              {t.label}
            </span>
          ))}
          <span
            className={`${styles.tick} ${styles.nowTick}`}
            style={{ left: `${now}%` }}
          >
            now
          </span>
        </div>
        <span />
      </div>

      <div className={styles.body}>
        <div className={styles.grid} aria-hidden="true">
          {ticks.map((t) => (
            <i key={t.label} style={{ left: `${t.at}%` }} />
          ))}
          <i className={styles.nowLine} style={{ left: `${now}%` }} />
        </div>
        <div
          role="group"
          aria-label="Work history. Use the up and down arrow keys to move between roles."
        >
          {spans.map((s, i) => (
            <button
              key={s.id}
              ref={(el) => {
                rows.current[i] = el;
              }}
              type="button"
              className={styles.row}
              aria-pressed={s.id === selected}
              aria-controls="trace-inspector"
              aria-label={`${s.name}, ${s.role}, ${s.periodLabel}`}
              onClick={() => setSelected(s.id)}
              onKeyDown={(e) => onKey(e, i)}
            >
              <span className={styles.label}>
                <b>
                  <span className={styles.full}>{s.name}</span>
                  <span className={styles.abbr}>{s.short ?? s.name}</span>
                </b>
                <small>{s.roleShort ?? s.role}</small>
              </span>
              <span className={styles.track}>
                <span
                  className={`${styles.bar} c-${s.kind}`}
                  data-ongoing={s.ongoing || undefined}
                  style={{ left: `${s.left}%`, width: `${s.width}%` }}
                />
                {s.events.map((e) => (
                  <span
                    key={e.date}
                    className={styles.event}
                    style={{ left: `${e.at}%` }}
                  />
                ))}
                <span className={styles.tip} style={{ left: `${s.left}%` }}>
                  {s.periodLabel}
                </span>
              </span>
              <span className={`${styles.dur} mono`}>{s.durationLabel}</span>
            </button>
          ))}
        </div>
      </div>

      <div id="trace-inspector" className={styles.inspector} aria-live="polite">
        <div className={styles.insHead}>
          <h3>{span.name}</h3>
          <p className={styles.meta}>
            {span.role}
            <br />
            {span.periodLabel}
          </p>
          <span className={styles.kind}>
            <i className={`key c-${span.kind}`} />
            {kindLabels[span.kind]}
          </span>
          {(span.links?.length || span.demo) && (
            <div className={styles.actions}>
              {span.links?.map((l) => (
                <a target="_blank" rel="noopener noreferrer" key={l.href} href={l.href}>
                  {l.label}
                </a>
              ))}
              {span.demo && (
                <DemoButton
                  src={span.demo.src}
                  title={span.demo.title}
                  className={`link-button ${styles.demo}`}
                >
                  <PlayIcon />
                  Watch the demo
                </DemoButton>
              )}
            </div>
          )}
        </div>
        <div className={styles.insBody}>
          <ul className={styles.summary}>
            {span.summary.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          {span.events.length > 0 && (
            <>
              <h4>Milestones</h4>
              <ol className={styles.events}>
                {span.events.map((e) => (
                  <li key={e.date}>
                    <span className="mono">{e.when}</span>
                    <span>{e.label}</span>
                  </li>
                ))}
              </ol>
            </>
          )}
          {span.articles && span.articles.length > 0 && (
            <>
              <h4>Writing about it</h4>
              <ul className={styles.articles}>
                {span.articles
                  .filter((slug) => articles[slug])
                  .map((slug) => (
                    <li key={slug}>
                      <Link href={`/writing/${slug}`}>{articles[slug]}</Link>
                    </li>
                  ))}
              </ul>
            </>
          )}
          {(span.stack || span.note) && (
            <p className={styles.foot}>
              {span.stack}
              {span.stack && span.note ? <br /> : null}
              {span.note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
