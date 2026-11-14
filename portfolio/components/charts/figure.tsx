import type { ReactNode } from "react";

import styles from "./charts.module.css";

interface FigureProps {
  title: string;
  subtitle?: string;
  caption?: ReactNode;
  /** Lets the figure use the extra width beside the text column on wide screens. */
  wide?: boolean;
  legend?: ReactNode;
  children: ReactNode;
}

/** The frame every chart and diagram sits in: title, optional legend, the plot, then a caption. */
export function Figure({ title, subtitle, caption, wide, legend, children }: FigureProps) {
  return (
    <figure className={`${styles.figure} ${wide ? "wide" : ""}`}>
      <div className={styles.head}>
        <p className={styles.title}>{title}</p>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {legend}
      </div>
      {children}
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}

export function SeriesLegend({ series }: { series: { name: string; color: number }[] }) {
  return (
    <div className={`legend ${styles.legend}`}>
      {series.map((s) => (
        <span key={s.name}>
          <i className={`key c${s.color}`} />
          {s.name}
        </span>
      ))}
    </div>
  );
}
