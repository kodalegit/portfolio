import { blob, type ProjectId } from "./site";

export interface Project {
  id: string;
  name: string;
  when: string;
  description: string;
  stack: string;
  image: { src: string; alt: string };
  links: { label: string; href: string }[];
  demo?: { src: string; title: string };
  /** Counts the articles tagged with this project. */
  writingFor?: ProjectId;
}

export const projects: Project[] = [
  {
    id: "uwazo",
    name: "Uwazo",
    when: "2025–now",
    description:
      "A research assistant for Kenyan tax and legal professionals. Agentic search over statutes, the user’s own documents and past chats, with a citation for each claim.",
    stack: "FastAPI, Next.js, Supabase, pgvector, LangGraph",
    image: {
      src: `${blob}/Uwazo%20Screenshot-GXxqFLtTg3BqcmUpVxbZpYBG8d3AMp`,
      alt: "Uwazo’s home page for legal, tax and finance research",
    },
    links: [{ label: "Visit uwazo.com", href: "https://uwazo.com/" }],
    demo: { src: `${blob}/Videos/Uwazo%20Project%20Demo.mp4`, title: "Uwazo" },
    writingFor: "uwazo",
  },
  {
    id: "pelmio",
    name: "Pelmio",
    when: "2026–now",
    description:
      "Turns lesson notes into interactive activities. Code checks every draft against a model of the subject, and the teacher approves it before a learner sees it.",
    stack: "Next.js, FastAPI, PostgreSQL",
    image: {
      src: `${blob}/Pelmio%20Screenshot-2U5ADr0YVgWOKtXv3n5gwpSLjFJpEI`,
      alt: "Pelmio showing lesson notes turned into an interactive learning mission",
    },
    links: [{ label: "Visit pelmio.app", href: "https://www.pelmio.app/" }],
    writingFor: "pelmio",
  },
  {
    id: "sentinel",
    name: "Sentinel",
    when: "Open source",
    description:
      "Helps auditors investigate Kenyan public procurement. Machine learning and a relationship graph flag unusual tenders and links between companies and officials, and a LangGraph agent grounds each case in procurement law.",
    stack: "FastAPI, Next.js, Neo4j, LangGraph, scikit-learn",
    image: {
      src: `${blob}/Sentinel%20Screenshot-LVszDV3oqZlAThNAoya28UzKtax7NF`,
      alt: "Sentinel dashboard with procurement risk scores and flagged tenders",
    },
    links: [{ label: "Source on GitHub", href: "https://github.com/kodalegit/sentinel" }],
    demo: { src: `${blob}/Videos/Sentinel%20Project%20Demo`, title: "Sentinel" },
  },
  {
    id: "ujenzi",
    name: "Ujenzi",
    when: "2024",
    description:
      "Predicts concrete strength from mix proportions with XGBoost, so engineers can plan before lab results come back. It started as an engineering consultancy engagement.",
    stack: "React, Django, XGBoost, GCP",
    image: {
      src: `${blob}/Ujenzi-47KC9J9e9Jy3R0Hw1jzkY0ffDgXV9E.png`,
      alt: "Ujenzi concrete mix design and strength prediction app",
    },
    links: [
      { label: "Try it", href: "https://monolith-935048637315.us-central1.run.app/" },
      { label: "Source", href: "https://github.com/kodalegit/mlvalidation" },
    ],
    demo: {
      src: `${blob}/Ujenzi%20-%20Trim%20-%20Google%20Chrome%202024-07-30%2023-52-24-qgSiO2dFedgcvWLkPDGWEkFq1HQQpA.mp4`,
      title: "Ujenzi",
    },
  },
];

export const baini = {
  site: "https://baini-images.web.app/",
  source: "https://github.com/kodalegit/baini-public",
  demo: {
    src: `${blob}/Videos/Baini%20-%20Google%20Chrome%202024-08-20%2000-56-19-m8c3fIblqgTPcztQnsLC4uTE7njTJZ.mp4`,
    title: "Baini",
  },
};

export const reactifyDjango = {
  source: "https://github.com/kodalegit/reactify-django",
  npm: "https://www.npmjs.com/package/reactify-django",
  article:
    "https://medium.com/@victorkimani77/integrate-react-into-django-seamlessly-with-the-reactify-django-cli-19594ecca1c4",
};
