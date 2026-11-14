import { blob } from "./site";

export type SpanKind = "product" | "contract" | "freelance";

export const kindLabels: Record<SpanKind, string> = {
  product: "My products",
  contract: "Contract roles",
  freelance: "Freelance clients",
};

export interface SpanEvent {
  /** YYYY-MM */
  date: string;
  label: string;
}

export interface WorkSpan {
  id: string;
  name: string;
  /** Shorter name for narrow screens. */
  short?: string;
  role: string;
  /** Shorter role for the trace row, where space is tight. */
  roleShort?: string;
  kind: SpanKind;
  /** YYYY-MM, first month of the engagement. */
  start: string;
  /** YYYY-MM, last month of the engagement. Leave out while it is ongoing. */
  end?: string;
  /** Overrides the computed period label, for when the start month is approximate. */
  period?: string;
  summary: string[];
  stack?: string;
  note?: string;
  links?: { label: string; href: string }[];
  demo?: { src: string; title: string };
  /** Dated milestones, drawn as span events on the bar. */
  events?: SpanEvent[];
  /** Article slugs related to this span. */
  articles?: string[];
}

/** Ordered by start date, like spans in a trace. */
export const spans: WorkSpan[] = [
  {
    id: "freelance",
    name: "Freelance",
    role: "Independent software engineer",
    roleShort: "Independent engineer",
    kind: "freelance",
    start: "2023-08",
    summary: [
      "Software for business clients across operations, machine learning, property management and e-commerce.",
      "An operations platform in Next.js and Supabase with roles, audit trails, analytics and automated wage calculations. It replaced about 8 hours of manual reconciliation a week.",
      "Ujenzi, an XGBoost model that predicts concrete strength from mix proportions, built from an engineering consultancy engagement.",
    ],
    stack: "TypeScript, Next.js, Supabase, Python, XGBoost",
  },
  {
    id: "islet",
    name: "Islet Group",
    short: "Islet",
    role: "Software engineering consultant",
    roleShort: "Engineering consultant",
    kind: "contract",
    start: "2024-03",
    end: "2026-05",
    summary: [
      "Built and launched the digital platform for a national pharmaceutical association with 13,000+ members.",
      "REST integrations that track certification for 10,000+ professionals, and automated conference administration through synchronised data workflows.",
    ],
  },
  {
    id: "uwazo",
    name: "Uwazo",
    role: "Founder and lead engineer",
    kind: "product",
    start: "2025-02",
    summary: [
      "A multi-tenant research platform for tax and legal professionals in Kenya.",
      "Agentic research with streaming answers, a citation for each claim, and retrieval across statutes, the user’s own documents and past conversations.",
      "17 accounts onboarded through direct outreach, with their feedback shaping the research workflows.",
    ],
    stack: "FastAPI, Next.js, Supabase, pgvector, LangGraph",
    links: [{ label: "uwazo.com", href: "https://uwazo.com/" }],
    demo: { src: `${blob}/Videos/Uwazo%20Project%20Demo.mp4`, title: "Uwazo" },
    events: [
      { date: "2025-02", label: "First version: a fixed prompt chain" },
      { date: "2025-07", label: "Planner, parallel searches and a writer, a gatekeeper in front, and deep research behind a toggle" },
      { date: "2025-09", label: "Gatekeeper cut to two routes, and a 50-question evaluation set" },
    ],
    articles: ["workflow-to-agent", "pgvector-empty-index", "branching-chat-message-tree"],
  },
  {
    id: "crafted",
    name: "Crafted Systems",
    short: "Crafted",
    role: "Lead AI engineer, contract",
    roleShort: "Lead AI engineer",
    kind: "contract",
    start: "2025-12",
    end: "2026-04",
    summary: [
      "Architected and deployed the AI backend for an enterprise debt-recovery platform that banks and SACCOs use to work through thousands of debtor case files.",
      "Case-summary agents that turn debt histories, messages and account records into recommended next steps.",
      "An agent that writes SQL, retrieves records, charts data and drafts SMS, email and WhatsApp messages, with a person approving every outbound message.",
      "RAG pipelines and evaluation harnesses for correctness, retrieval quality and reliability. Date-range errors fell from about 30% to zero on targeted tests.",
      "Access controls and PII safeguards for sensitive financial data.",
    ],
    note: "Client work, so there is no public demo.",
  },
  {
    id: "pelmio",
    name: "Pelmio",
    role: "Founder and engineer",
    kind: "product",
    start: "2026-08",
    summary: [
      "Turns a teacher’s lesson notes into source-grounded objectives and interactive activities for learners aged 12 to 14.",
      "A model drafts each activity, code checks it against a model of the subject, and the teacher approves it before a learner sees it.",
      "Document processing, objective review, activity generation, a learner runtime and evidence collection.",
    ],
    stack: "Next.js, FastAPI, PostgreSQL",
    links: [{ label: "pelmio.app", href: "https://www.pelmio.app/" }],
    articles: ["agent-loop-or-second-try", "passing-checks-is-where-review-starts"],
  },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const toIndex = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + (m - 1);
};

const monthLabel = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
};

const duration = (months: number) => {
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (!y) return `${m}m`;
  return m ? `${y}y ${m}m` : `${y}y`;
};

export interface PlacedEvent extends SpanEvent {
  at: number;
  when: string;
}

export interface PlacedSpan extends Omit<WorkSpan, "events"> {
  left: number;
  width: number;
  ongoing: boolean;
  periodLabel: string;
  durationLabel: string;
  events: PlacedEvent[];
}

export interface TraceLayout {
  spans: PlacedSpan[];
  ticks: { label: string; at: number }[];
  now: number;
}

/** Lays the spans out on a month axis that runs from a month before the first span to just past today. */
export function layoutTrace(today: Date): TraceLayout {
  const first = Math.min(...spans.map((s) => toIndex(s.start)));
  const nowIndex = today.getFullYear() * 12 + today.getMonth();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const nowFrac = nowIndex + today.getDate() / daysInMonth;
  const axisStart = first - 1;
  const axisEnd = nowIndex + 1.4;
  const pct = (i: number) => ((i - axisStart) / (axisEnd - axisStart)) * 100;

  const placed = spans.map<PlacedSpan>(({ events = [], ...s }) => {
    const start = toIndex(s.start);
    const ongoing = !s.end;
    const end = ongoing ? nowFrac : toIndex(s.end!) + 1;
    const months = (ongoing ? nowIndex : toIndex(s.end!)) - start + 1;
    return {
      ...s,
      ongoing,
      left: pct(start),
      width: pct(end) - pct(start),
      periodLabel: s.period ?? `${monthLabel(s.start)} – ${ongoing ? "now" : monthLabel(s.end!)}`,
      durationLabel: duration(months),
      events: events.map((e) => ({ ...e, at: pct(toIndex(e.date) + 0.5), when: monthLabel(e.date) })),
    };
  });

  const ticks: TraceLayout["ticks"] = [];
  for (let y = Math.ceil(axisStart / 12); y * 12 < axisEnd; y++) {
    if (y * 12 > axisStart) ticks.push({ label: String(y), at: pct(y * 12) });
  }
  return { spans: placed, ticks, now: pct(nowFrac) };
}
