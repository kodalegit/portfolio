import { Figure, SeriesLegend } from "./figure";
import styles from "./charts.module.css";

export interface Panel {
  title: string;
  values: number[];
  /** Printed values, when a plain number is not the right label (for example "8,189" or "22 s"). */
  labels?: string[];
  /** Axis maximum. Defaults to the largest value. */
  max?: number;
  note?: string;
}

interface Props {
  title: string;
  subtitle?: string;
  caption?: string;
  /** The things being compared, in the order they appear in every panel. */
  entities: string[];
  panels: Panel[];
  /** One colour per entity, or a single colour for every bar. */
  colorBy?: "entity" | "single";
  /** An entity to call out, for example the design that was adopted. */
  highlight?: string;
  wide?: boolean;
}

/**
 * Small multiples of horizontal bars. Each panel compares the same entities on
 * one measure, so measures with different units never share an axis.
 */
export function BarPanels({ title, subtitle, caption, entities, panels, colorBy = "entity", highlight, wide }: Props) {
  const color = (i: number) => (colorBy === "entity" ? `c${(i % 3) + 1}` : "c1");
  return (
    <Figure
      title={title}
      subtitle={subtitle}
      caption={caption}
      wide={wide}
      legend={colorBy === "entity" ? <SeriesLegend series={entities.map((name, i) => ({ name, color: (i % 3) + 1 }))} /> : undefined}
    >
      <div className={styles.panels} data-multi={panels.length > 1 || undefined}>
        {panels.map((p) => {
          const max = p.max ?? Math.max(...p.values);
          return (
            <div key={p.title} className={styles.panel}>
              <p className={styles.panelTitle}>{p.title}</p>
              <ul className={styles.bars}>
                {p.values.map((v, i) => {
                  const label = p.labels?.[i] ?? v.toLocaleString("en-GB");
                  const name = entities[i];
                  return (
                    <li key={name} className={styles.barRow}>
                      <span className={`${styles.barLabel} ${name === highlight ? styles.on : ""}`}>{name}</span>
                      <span className={styles.track} tabIndex={0} aria-label={`${name}: ${label}`}>
                        <span className={`${styles.bar} ${color(i)}`} style={{ width: `calc((100% - 3.75rem) * ${v / max})` }} />
                        <span className={styles.value}>{label}</span>
                        <span className={styles.tip} role="presentation">
                          {name}: {label}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
              {p.note && <p className={styles.panelNote}>{p.note}</p>}
            </div>
          );
        })}
      </div>
    </Figure>
  );
}
