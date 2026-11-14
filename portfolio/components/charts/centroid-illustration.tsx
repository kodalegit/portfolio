import { Figure } from "./figure";
import styles from "./charts.module.css";

/** Small deterministic random generator, so the illustration is the same on every build. */
function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type P = [number, number];

const CLUSTERS: P[] = [
  [0.3, 0.72],
  [0.74, 0.7],
  [0.6, 0.28],
];

function points(): { p: P; c: number }[] {
  const r = rng(7);
  const gauss = () => {
    const u = Math.max(r(), 1e-9);
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * r());
  };
  return CLUSTERS.flatMap((c, ci) =>
    Array.from({ length: 34 }, () => ({ p: [c[0] + gauss() * 0.075, c[1] + gauss() * 0.075] as P, c: ci })),
  );
}

const dist = (a: P, b: P) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;
const nearest = (p: P, centres: P[]) => centres.reduce((best, c, i) => (dist(p, c) < dist(p, centres[best]) ? i : best), 0);

function Panel({ title, centres, pts }: { title: string; centres: P[]; pts: { p: P; c: number }[] }) {
  const S = 220;
  const pad = 10;
  const sx = (v: number) => pad + v * (S - pad * 2);
  const sy = (v: number) => S - pad - v * (S - pad * 2);
  return (
    <div className={styles.scatterPanel}>
      <p className={styles.panelTitle}>{title}</p>
      <svg viewBox={`0 0 ${S} ${S}`} className={styles.scatter} aria-hidden="true">
        <rect x="0.5" y="0.5" width={S - 1} height={S - 1} rx="6" className={styles.scatterFrame} />
        {pts.map(({ p }, i) => (
          <circle key={i} cx={sx(p[0])} cy={sy(p[1])} r="3.4" className={`${styles.dot} ${styles[`s${nearest(p, centres) + 1}`]}`} />
        ))}
        {centres.map((c, i) => (
          <g key={i} transform={`translate(${sx(c[0])} ${sy(c[1])})`} className={styles.centre}>
            <path d="M-6 -6 L6 6 M6 -6 L-6 6" />
          </g>
        ))}
      </svg>
    </div>
  );
}

/**
 * Why an IVFFlat index built on an empty table misses results. Points are
 * coloured by the list whose centre is nearest. This is an illustration with
 * made-up points, not data from the experiment.
 */
export function CentroidIllustration() {
  const pts = points();
  const sampled: P[] = [
    [0.33, 0.69],
    [0.71, 0.73],
    [0.58, 0.31],
  ];
  // Close together, the way random numbers between 0 and 1 all point into one region of embedding space.
  const random: P[] = [
    [0.066, 0.238],
    [0.11, 0.218],
    [0.181, 0.135],
  ];
  return (
    <Figure
      title="Where IVFFlat puts its list centres"
      subtitle="Three topics of chunks, coloured by the list each chunk lands in. Crosses are list centres."
      caption="An illustration with made-up points in two dimensions, not data from the experiment. With centres sampled from real data, each topic lands in one list. With random centres from an empty table, the boundaries between lists run through the topics, so related chunks end up in different lists and a query that scans one list misses many of its neighbours."
    >
      <div className={styles.scatterPair}>
        <Panel title="Built after the data exists" centres={sampled} pts={pts} />
        <Panel title="Built on an empty table" centres={random} pts={pts} />
      </div>
    </Figure>
  );
}
