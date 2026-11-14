# Portfolio redesign

A recommendation for the new site, plus three mockups to choose from. Open the HTML files in a browser. Each one has a home page and an article page; use the small switcher in the bottom-right corner, or the theme button in the header.

| File | Design language | Article shown |
| --- | --- | --- |
| [a-quiet.html](a-quiet.html) | Quiet: prose-first, one serif, one column | Uwazo agent design |
| [b-trace.html](b-trace.html) | Trace: AI-native, work history drawn as an agent trace | Uwazo pgvector |
| [c-hivis.html](c-hivis.html) | Hi-vis: bold editorial, signal yellow, condensed type | Pelmio agent loops |

---

## 1. What the site has to do

Two kinds of reader arrive, and they want different things.

- **A hiring manager or recruiter**, from your résumé or LinkedIn. They give it about 30 seconds. They need to know what you do, see proof, and find your email or résumé.
- **An engineer**, from an article you shared. They read one piece end to end. If it's good, they look at who wrote it.

The current site is a résumé split into sections, and its claims are general ("I build systems that think, adapt, and solve real problems"). The case studies give you something better: specific decisions, with numbers, and an honest account of what didn't work. The new site should lead with that.

**The personality is already in your writing.** You trained as a civil engineer, you test things before you trust them, and you write down what you haven't proven. "A design decision has a date on it" and "If the flowchart is known before the model runs, it is code" are the kind of lines people remember. The design should give that voice room, not compete with it.

## 2. Site structure

```
/                      Home
/writing               All articles, newest first, filterable by topic once there are more
/writing/[slug]        Article
/about                 Longer story, experience, education, photo
/resume.pdf            One-page PDF, linked from the header
/rss.xml               Feed
```

Keep the nav to **Writing, Work, About**, plus a résumé link. "Work" can be a section of the home page at launch. Give Uwazo and Pelmio their own pages (`/work/uwazo`) later, once there's enough to say that the articles don't already cover: problem, architecture, what you'd change, and links to the related articles.

### Home page, top to bottom

1. **One sentence on what you do,** in plain words. For example: "I build AI agents and retrieval systems, and the tests that show whether they work."
2. **Two or three sentences of context:** your most recent production work (the debt-recovery platform), your two products, and the civil engineering through-line.
3. **A dated "Now" line.** What you're working on, and that you're open to roles. Remove the last part when you're not looking.
4. **Writing.** Every article, each with a one-line result under the title. This is the strongest proof on the site, so it comes before projects.
5. **Work.** The debt-recovery platform (no screenshot, since it's client work), Uwazo, Pelmio, Sentinel and Ujenzi, then one line for the rest.
6. **Experience.** A compact list with dates. Education goes here too.
7. **Contact.** Email, GitHub, LinkedIn, résumé.

For backend roles, the pgvector and branching-chat articles show database and API depth. The topic labels let a reader find them.

### The article page

This page matters most, because it's what you'll link from LinkedIn. Each mockup has its own version, but they share the same parts:

- **The title states the finding.** Yours already do.
- **A short summary at the top**: question, test, result, decision. A hiring manager gets the point in 15 seconds without reading 13 minutes.
- **Metadata:** date, reading time, project, topic. For experiments, also the setup: model, data and sample size. Your own argument is that results depend on the model, so the model name and date belong on the page.
- **Good handling of tables, code, charts and quotes,** in both themes.
- **"Limits of this test" gets its own visual treatment.** It's a signature of how you write, and it builds trust.
- **A link to the experiment code.**
- **At the end:** a short author note with your email, and the next article.
- **A social preview image per article** (title plus the key result), generated automatically. This is what people see on LinkedIn before they click.

## 3. Content to prepare

Each article needs a few extra fields beyond its body. Suggested frontmatter:

```yaml
title: "My research assistant started as a workflow. Better models made an agent the right default."
short: "From workflow to agent"          # for lists, "read next" and "From …" links
slug: workflow-to-agent
date: 2026-11-13
topic: agents                          # agents | evaluation | retrieval | product-engineering
project: uwazo
result: "A single tool-calling agent refused 2 of 18 research questions where my routed pipeline refused 10, at the same median speed."
summary:
  question: "Should Uwazo's research path be a fixed workflow or a tool-calling agent?"
  test: "18 research questions and 3 chat messages through three designs, same model and tools."
  result: "The pipeline refused 10 of 18. The agent refused 2, at the same median speed."
  decision: "Make one tool-calling agent the default; rebuild deep research with subagents."
setup:
  model: gpt-6-luna
  sample: "18 questions, 3 chat messages"
code: https://github.com/kodalegit/…/uwazo-agent-experiment
```

Short titles I'd use:

| Article | Short title | Topic |
| --- | --- | --- |
| uwazo-agent-design | From workflow to agent | Agents |
| pelmio-agent-loops | Agent loop or a second try? | Agents |
| pelmio-eval-lessons | Passing every check is where review starts | Evaluation |
| uwazo-pgvector-index | The index built on an empty table | Retrieval |
| uwazo-chat-branching | Branching chat on a message tree | Product engineering |

Other things to sort out before launch:

- **Charts in dark mode.** The SVGs in `case-studies/visuals` have a hard-coded white background and fixed colours, so they'll show up as white boxes in dark mode. Either change `make_charts.py` and `make_diagrams.py` to output transparent backgrounds with CSS classes the site can colour, or draw the simple bar and line charts as small components from the table data (the mockups do this).
- **The `[Visual, to make: …]` placeholders.** Skip per-article cover images. The generated social preview does that job, and it's less work.
- **Before you publish the experiment folders,** check `runs.jsonl` and `judge.jsonl` for anything from real users. Remove the local path in `uwazo-agent-experiment/README.md` (`~/projects/rami/taxagent/backend`), and leave out `uwazo-pgvector-experiment/.venv`.
- **A real photo** for the About section. It adds more personality than any colour choice.
- **A custom domain.** It's a small credibility signal, and the links on your résumé will survive a move away from `vercel.app`.
- **Leave your phone number off the site.**

## 4. Build notes

- **Keep Next.js on Vercel,** and upgrade from 14.2 to the current release. Write articles as MDX files in the repo (`content/writing/*.mdx`), with the frontmatter above checked by a schema (Velite, Content Collections, or gray-matter with zod).
- **Code highlighting:** Shiki through `rehype-pretty-code`, with a light and a dark theme.
- **Theme:** `next-themes` with the system setting as the default and a manual toggle, so there's no flash on load. All three mockups use the same pattern of tokens on `:root`, a `prefers-color-scheme` block, and a `[data-theme]` override.
- **Fonts:** `next/font`, so they're self-hosted.
- **Social images:** `next/og`, one template filled from the frontmatter.
- **Also add:** RSS, a sitemap, and Vercel Analytics, so you can see which articles get read.
- **Remove** `framer-motion` and the scroll-reveal sections. Fading every section in slows reading and adds nothing. None of the mockups animate on load.

## 5. The three mockups

### A. Quiet ([a-quiet.html](a-quiet.html))

The closest to leerob.com and emilkowal.ski. One narrow column, set entirely in Newsreader (a text serif with optical sizes), on white or deep slate, with classic blue links. The home page reads like a short letter, then lists the writing, with each title followed by its result.

- **Memorable part:** "Rules I learned the hard way", five one-line rules taken from the articles, each linking back to the article it came from. It shows judgement and personality in the same place.
- **Article:** a calm reading page with the summary in a tinted box, a native bar chart, and "Limits of this test" set apart.
- **Choose it if** you want the writing to carry the site. It's the lowest-risk option and the quickest to build and maintain.
- **Watch out for:** all the personality comes from the copy, so the copy has to stay good.

### B. Trace ([b-trace.html](b-trace.html))

Built for AI engineering roles. Mona Sans, with its wide cut for the name, plus JetBrains Mono for numbers only. Cool greys.

- **Memorable part:** your work history drawn as an agent-trace waterfall, the view people know from LangSmith or Langfuse. Each engagement is a span on a timeline from 2023 to now. Click one to open an inspector with what you built.
- **Writing:** topic filters, and each article's headline number on the right, such as "0.22 → 0.99, recall on per-user searches".
- **Article:** a contents list on the left, a "Setup" panel on the right (database, data, embeddings, sample size, code link), a numbered findings summary, and a line chart with a hover crosshair and a table view.
- **Choose it if** you mainly want AI engineering hiring managers to recognise you as one of them within seconds.
- **Watch out for:** the waterfall makes five overlapping commitments very visible. Some readers will see range, others might see someone spread thin. It's also the most work to build.

### C. Hi-vis ([c-hivis.html](c-hivis.html))

The most personality. Archivo in a condensed heavy cut for headlines, Source Serif 4 for reading, and signal yellow taken from site-safety gear. It links back to civil engineering and the line "I test them before they carry load."

- **Memorable part:** the yellow band with your name set huge, and the same yellow used as a highlighter on the key result of each article.
- **Home:** a featured article with its chart, more writing as a magazine grid, work as case-study rows (with a small flow diagram showing the human approval step for the client project you can't screenshot), and About with a photo, a "Now" list and experience. It closes with a yellow call to action.
- **Article:** a big condensed headline, a "What I found / What I decided" strip, the design rule set as a large pull quote, small-multiple charts, and an "adopted" tag on the chosen row of the results table.
- **Choose it if** you want people to remember the site and the person behind it.
- **Watch out for:** it's the loudest of the three. The yellow only works if it stays limited to the band, highlights and links. In dark mode, the band is a bright block on a dark page.

### My pick

**C, with two pieces borrowed:** A's rules list on the home page, and B's Setup panel on experiment articles. C is the only one where the personality comes from your real story, not just from typography, and its article pages are still quiet enough for 13-minute reads. If C feels too loud once you've lived with it for a day, A with the same borrowed pieces is the safe choice.

Pieces from any mockup carry over to the others: the rules list (A), the findings and Setup panels and topic filters (B), and the highlighted result and case-study rows (C).

## Notes on the mockups

- Only one article is built per mockup, so every article link opens that one.
- Publication dates are placeholders. Pelmio's start date (January 2026) is a guess for the trace in B.
- Résumé and RSS links are placeholders. Project screenshots load from your existing Vercel Blob storage.
- The article text is shortened from the drafts in `case-studies/`.
- I didn't open `design-mockups/`, `site-mockups/` or `portfolio-concepts/`.
