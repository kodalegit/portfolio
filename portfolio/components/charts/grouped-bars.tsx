import { Figure, SeriesLegend } from "./figure";
import styles from "./charts.module.css";

interface Props {
  title: string;
  subtitle?: string;
  caption?: string;
  series: string[];
  rows: { label: string; values: number[] }[];
  max?: number;
  digits?: number;
  wide?: boolean;
}

/** Horizontal bars grouped by row, one bar per series, for comparing a few measures across many setups. */
export function GroupedBars({ title, subtitle, caption, series, rows, max = 1, digits = 2, wide }: Props) {
  return (
    <Figure
      title={title}
      subtitle={subtitle}
      caption={caption}
      wide={wide}
      legend={<SeriesLegend series={series.map((name, i) => ({ name, color: i + 1 }))} />}
    >
      <ul className={styles.groups}>
        {rows.map((r) => (
          <li key={r.label} className={styles.group}>
            <span className={styles.groupLabel}>{r.label}</span>
            <span className={styles.groupBars}>
              {r.values.map((v, i) => {
                const label = v.toFixed(digits);
                return (
                  <span key={series[i]} className={styles.track} tabIndex={0} aria-label={`${r.label}, ${series[i]}: ${label}`}>
                    <span className={`${styles.bar} ${styles.thin} c${i + 1}`} style={{ width: `calc((100% - 3rem) * ${v / max})` }} />
                    <span className={`${styles.value} ${i ? styles.quiet : ""}`}>{label}</span>
                    <span className={styles.tip} role="presentation">
                      {series[i]}: {label}
                    </span>
                  </span>
                );
              })}
            </span>
          </li>
        ))}
      </ul>
    </Figure>
  );
}
