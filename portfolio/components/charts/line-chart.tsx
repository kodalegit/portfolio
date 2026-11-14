"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

import { Figure } from "./figure";
import styles from "./charts.module.css";

interface Series {
  name: string;
  /** Categorical slot, 1 to 3. */
  color: number;
  values: number[];
  /** Points drawn hollow, for example where the index was not used. */
  hollow?: boolean[];
}

interface Props {
  title: string;
  subtitle?: string;
  caption?: string;
  x: { values: number[]; labels: string[]; sublabels?: string[]; log?: boolean; name?: string };
  y: { max: number; ticks: number[]; digits?: number };
  series: Series[];
  /** Legend text for hollow points. */
  hollowNote?: string;
  /** Extra tooltip text per x position, per series. */
  notes?: (string | null)[][];
  wide?: boolean;
}

const H = 270;

/**
 * A line chart drawn at its real pixel width, so labels stay a readable size on
 * any screen. Hover or use the arrow keys to read every value at an x position.
 */
export function LineChart({ title, subtitle, caption, x, y, series, hollowNote, notes, wide }: Props) {
  const box = useRef<HTMLDivElement>(null);
  // Until the real width is measured, the SVG scales from this width, so nothing is clipped.
  const [w, setW] = useState(600);
  const [at, setAt] = useState<number | null>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const endLabels = w >= 520;
  const m = { l: 44, r: endLabels ? 168 : 16, t: 12, b: x.sublabels ? 50 : 34 };
  const pw = Math.max(w - m.l - m.r, 80);
  const ph = H - m.t - m.b;
  const n = x.values.length;
  const lo = x.log ? Math.log10(x.values[0]) : 0;
  const hi = x.log ? Math.log10(x.values[n - 1]) : n - 1;
  const pad = x.log ? 0 : 0.15;
  const px = (i: number) => {
    const v = x.log ? Math.log10(x.values[i]) : i;
    return m.l + ((v - lo + pad) / (hi - lo + pad * 2)) * pw;
  };
  const py = (v: number) => m.t + (1 - v / y.max) * ph;
  const fmt = (v: number) => v.toFixed(y.digits ?? 2);

  const nearest = (clientX: number) => {
    const rect = box.current!.getBoundingClientRect();
    const cx = clientX - rect.left;
    let best = 0;
    for (let i = 1; i < n; i++) if (Math.abs(px(i) - cx) < Math.abs(px(best) - cx)) best = i;
    return best;
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") setAt((a) => (a === null ? 0 : Math.min(a + 1, n - 1)));
    else if (e.key === "ArrowLeft") setAt((a) => (a === null ? 0 : Math.max(a - 1, 0)));
    else if (e.key === "Escape") setAt(null);
    else return;
    e.preventDefault();
  };

  // Spread end labels that would overlap.
  const ends = series
    .map((s, i) => ({ i, y: py(s.values[n - 1]) }))
    .sort((a, b) => a.y - b.y);
  for (let k = 1; k < ends.length; k++) if (ends[k].y - ends[k - 1].y < 16) ends[k].y = ends[k - 1].y + 16;
  const endY = Object.fromEntries(ends.map((e) => [e.i, e.y]));

  const legend = (
    <div className={`legend ${styles.legend}`}>
      {series.map((s) => (
        <span key={s.name}>
          <i className={`${styles.lineKey} c${s.color}`} />
          {s.name}
        </span>
      ))}
      {hollowNote && (
        <span>
          <i className={styles.hollowKey} />
          {hollowNote}
        </span>
      )}
    </div>
  );

  const tipLeft = at === null ? 0 : Math.min(Math.max(px(at), 110), w - 110);

  return (
    <Figure title={title} subtitle={subtitle} caption={caption} wide={wide} legend={legend}>
      <div
        ref={box}
        className={styles.lineBox}
        tabIndex={0}
        role="img"
        aria-label={`${title}. ${series
          .map((s) => `${s.name}: ${s.values.map((v, i) => `${fmt(v)} at ${x.labels[i]}`).join(", ")}`)
          .join(". ")}`}
        onPointerMove={(e: PointerEvent) => setAt(nearest(e.clientX))}
        onPointerLeave={() => setAt(null)}
        onKeyDown={onKey}
        onBlur={() => setAt(null)}
      >
        <svg viewBox={`0 0 ${w} ${H}`} className={styles.lineSvg} aria-hidden="true">
          {y.ticks.map((t) => (
            <g key={t}>
              <line className={t === 0 ? styles.axisLine : styles.gridLine} x1={m.l} x2={m.l + pw} y1={py(t)} y2={py(t)} />
              <text className={styles.tickText} x={m.l - 8} y={py(t) + 4} textAnchor="end">
                {fmt(t)}
              </text>
            </g>
          ))}
          {x.labels.map((l, i) => (
            <g key={l}>
              <text className={styles.tickText} x={px(i)} y={H - m.b + 18} textAnchor="middle">
                {l}
              </text>
              {x.sublabels && (
                <text className={styles.tickSub} x={px(i)} y={H - m.b + 34} textAnchor="middle">
                  {x.sublabels[i]}
                </text>
              )}
            </g>
          ))}
          {at !== null && <line className={styles.crosshair} x1={px(at)} x2={px(at)} y1={m.t} y2={m.t + ph} />}
          {series.map((s) => (
            <path
              key={s.name}
              className={`${styles.line} ${styles[`s${s.color}`]}`}
              d={s.values.map((v, i) => `${i ? "L" : "M"}${px(i).toFixed(1)} ${py(v).toFixed(1)}`).join(" ")}
            />
          ))}
          {series.map((s) =>
            s.values.map((v, i) => (
              <circle
                key={`${s.name}-${i}`}
                className={`${styles.point} ${styles[`s${s.color}`]} ${s.hollow?.[i] ? styles.hollow : ""}`}
                cx={px(i)}
                cy={py(v)}
                r={at === i ? 6 : 4.5}
              />
            )),
          )}
          {endLabels &&
            series.map((s, k) => (
              <text key={s.name} className={styles.endLabel} x={px(n - 1) + 12} y={endY[k] + 4}>
                {s.name} {fmt(s.values[n - 1])}
              </text>
            ))}
        </svg>
        {at !== null && (
          <div className={styles.lineTip} style={{ left: tipLeft }}>
            <strong>
              {x.labels[at]}
              {x.name ? ` ${x.name}` : ""}
            </strong>
            {series.map((s, k) => (
              <span key={s.name}>
                <i className={`${styles.lineKey} c${s.color}`} />
                {s.name}: {fmt(s.values[at])}
                {notes?.[k]?.[at] ? ` (${notes[k][at]})` : ""}
              </span>
            ))}
          </div>
        )}
      </div>
    </Figure>
  );
}
