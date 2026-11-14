export const blob = "https://gi9pozqnuexhf2qt.public.blob.vercel-storage.com";

export const site = {
  name: "Victor Kimani",
  role: "Applied AI engineer",
  location: "Kenya",
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://victorkimani.vercel.app"
  ).replace(/\/$/, ""),
  description:
    "Applied AI engineer in Kenya. I build agents, retrieval systems and the evaluations that show whether they work.",
  email: "victorkimani77@gmail.com",
  github: "https://github.com/kodalegit",
  linkedin: "https://www.linkedin.com/in/victorkimani77/",
  resume: `${blob}/Resume.pdf`,
  /** Where the experiment folders live once the repo is pushed. Change this one line to move them. */
  experiments: "https://github.com/kodalegit/portfolio/tree/main/experiments",
};

/** What I'm working on. No date, so it never looks stale; edit when it changes. */
export const now = {
  items: [
    "Piloting Pelmio with teachers",
    "Writing up the experiments behind Uwazo and Pelmio",
    "Looking for my next applied AI role",
  ],
};

export const topics = {
  agents: "Agents",
  evaluation: "Evaluation",
  retrieval: "Retrieval",
  "product-engineering": "Product engineering",
} as const;

export type Topic = keyof typeof topics;

export const projectLinks = {
  uwazo: { name: "Uwazo", href: "https://uwazo.com/" },
  pelmio: { name: "Pelmio", href: "https://www.pelmio.app/" },
} as const;

export type ProjectId = keyof typeof projectLinks;
