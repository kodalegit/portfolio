import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { BarPanels } from "./charts/bar-panels";
import { CentroidIllustration } from "./charts/centroid-illustration";
import { Diagram } from "./charts/diagram";
import { GroupedBars } from "./charts/grouped-bars";
import { LineChart } from "./charts/line-chart";
import { Clip, Screenshot } from "./charts/media";
import { site } from "@/lib/site";

function A({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/")) return <Link href={href} {...props} />;
  if (href.startsWith("#")) return <a href={href} {...props} />;
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
}

function Table(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="table-wrap" tabIndex={0} role="region" aria-label="Table, scrolls sideways on small screens">
      <table {...props} />
    </div>
  );
}

/** "Limits of this test" and similar caveats get their own panel. */
function Limits({ children }: { children: ReactNode }) {
  return <section className="limits">{children}</section>;
}

/** A design rule worth quoting on its own. */
function Rule({ children, source }: { children: ReactNode; source?: string }) {
  return (
    <blockquote className="rule">
      {children}
      {source && <cite>{source}</cite>}
    </blockquote>
  );
}

/** Links to an experiment folder, so the base URL lives in one place (lib/site.ts). */
function Experiment({ path, children }: { path: string; children: ReactNode }) {
  return <a target="_blank" rel="noopener noreferrer" href={`${site.experiments}/${path}`}>{children}</a>;
}

export const mdxComponents = {
  Experiment,
  a: A,
  table: Table,
  Limits,
  Rule,
  BarPanels,
  GroupedBars,
  LineChart,
  Diagram,
  CentroidIllustration,
  Screenshot,
  Clip,
};
