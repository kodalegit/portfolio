# Experiments

The code and raw results behind the articles on [victorkimani.vercel.app/writing](https://victorkimani.vercel.app/writing). Each folder belongs to one article.

| Folder | Article | Runs on its own? |
| --- | --- | --- |
| [uwazo-pgvector](uwazo-pgvector/) | [Our search got worse as we added documents. The cause was an index built on an empty table.](https://victorkimani.vercel.app/writing/pgvector-empty-index) | Yes. Postgres in Docker and Python with uv. |
| [uwazo-agent-design](uwazo-agent-design/) | [My research assistant started as a workflow. Better models made an agent the right default.](https://victorkimani.vercel.app/writing/workflow-to-agent) | No. It imports Uwazo’s private backend, so it is here to read. The raw runs and scores are complete. |

The Pelmio articles have no folder here, because their tests run inside Pelmio’s private codebase.
