# Portfolio app

The site is Next.js 16 with the App Router. Every page is generated at build time. The home page rebuilds daily so the work-history trace stays current.

## Local development

Use Node.js 20.9 or later and pnpm. From this folder:

```bash
pnpm install --frozen-lockfile
```

```bash
pnpm dev
```

Then open [localhost:3000](http://localhost:3000).

| Command | What it does |
| --- | --- |
| `pnpm dev` | Starts the development server |
| `pnpm build` | Builds the production site |
| `pnpm start` | Serves the production build |
| `pnpm lint` | Runs ESLint |
| `pnpm typecheck` | Runs TypeScript without emitting files |
| `pnpm diagrams` | Regenerates the article diagrams (needs Python 3, no packages) |

Set `NEXT_PUBLIC_SITE_URL` in production if the site moves off `victorkimani.vercel.app`. It is used for canonical links, RSS, the sitemap and social images.

## Where things live

| To change | Edit |
| --- | --- |
| Name, links, résumé, the “Now” list | `lib/site.ts` |
| Work history trace: roles, dates, milestones, linked articles | `lib/work.ts` |
| Project gallery, demo videos, the “Also” line | `lib/projects.ts` and `components/projects.tsx` |
| Colours, spacing and the light and dark themes | `app/globals.css` |
| Article body styles | `styles/prose.css` |
| Where experiment links point | `site.experiments` in `lib/site.ts` |

## Adding an article

Create `content/writing/<slug>.mdx`. The file name is the URL. Frontmatter is checked at build time, so a missing field fails the build with a clear message.

```yaml
---
title: "The full headline, which states the finding"
short: "A short title for lists and links"
dek: "One or two sentences on what the article covers."
result: "The finding in one sentence. Used for search results, social cards and RSS."
date: "2026-11-13"
topics: ["agents", "evaluation"]   # agents | evaluation | retrieval | product-engineering
project: "uwazo"                    # optional: uwazo | pelmio
metric: { value: "10 → 2", label: "questions refused, pipeline vs agent" }  # optional
findingsTitle: "Findings"           # optional
numbered: false                     # optional: numbers the findings
findings:
  - "Each key finding, one sentence or two."
decision: "What you decided."       # optional
setupTitle: "Setup"                 # optional: for example "Scope" or "Stack"
setup:
  - label: "Model"
    value: "gpt-6-luna"
code:                               # optional: a folder in ../experiments
  path: "uwazo-agent-design"
  label: "Runner, judge and raw runs"
  note: "One line on how to use it."
---
```

Write the body in Markdown. The table of contents is built from the `##` headings. These components are available without importing them:

| Component | Use |
| --- | --- |
| `<BarPanels>` | Small multiples of horizontal bars, one panel per measure |
| `<GroupedBars>` | Several measures across many setups |
| `<LineChart>` | A line chart with hover and keyboard read-outs |
| `<Diagram name="folder/file">` | A diagram from `content/diagrams` |
| `<Screenshot>` and `<Clip>` | Images and screen recordings, for example from the Blob store |
| `<Limits>` | Wraps a “Limits of this test” section in its own panel |
| `<Rule source="…">` | A design rule worth quoting on its own |
| `<Experiment path="…">` | A link to an experiment folder |

Look at the existing articles for examples of each. Notes about visuals that are still to make are kept as `{/* VISUAL TO MAKE: … */}` comments, which do not render.

## Diagrams

Diagrams are drawn by `scripts/make_diagrams.py` into `content/diagrams`. Every colour is a CSS variable, so they follow the theme when the page inlines them. Edit the script and run `pnpm diagrams`, then commit the SVG files.

## Social images

Each article gets a 1200 × 630 card from `app/writing/[slug]/opengraph-image.tsx`, showing its title and result. The fonts for the card are in `assets/fonts`.
