import "server-only";

import { readFileSync } from "node:fs";
import path from "node:path";

import { Figure } from "./figure";
import styles from "./charts.module.css";

interface Props {
  /** Path under content/diagrams, without the .svg extension. */
  name: string;
  title: string;
  subtitle?: string;
  caption?: string;
  /** Describes the diagram for screen readers. */
  alt: string;
}

/**
 * Inlines a diagram made by scripts/make_diagrams.py. Inlining lets the
 * diagram's CSS variables follow the light and dark themes.
 */
export function Diagram({ name, title, subtitle, caption, alt }: Props) {
  const file = path.join(process.cwd(), "content", "diagrams", `${name}.svg`);
  const svg = readFileSync(file, "utf8");
  return (
    <Figure title={title} subtitle={subtitle} caption={caption} wide>
      <div className={styles.diagram} role="img" aria-label={alt} dangerouslySetInnerHTML={{ __html: svg }} />
      <p className={styles.scrollHint} aria-hidden="true">
        Scroll sideways to see the whole diagram.
      </p>
    </Figure>
  );
}
