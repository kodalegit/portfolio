# pgvector recall: an IVFFlat index built on an empty table

Code and results for [Our search got worse as we added documents. The cause was an index built on an empty table.](https://victorkimani.vercel.app/writing/pgvector-empty-index)

It rebuilds Uwazo’s document search in a fresh database: the same schema, the same per-user query and the same index migrations. Documents arrive in stages, and each stage measures recall against exact nearest neighbours computed in NumPy.

## Files

| File | Contents |
| --- | --- |
| `embed.py` | Splits 20 Newsgroups into about 19,375 chunks of 120 words, picks 300 held-out questions, and embeds both with bge-small-en-v1.5. Writes `corpus.npz`. |
| `experiment.py` | Builds an IVFFlat table (index created on the empty table, as in Uwazo) and an HNSW table, adds documents in four stages, measures recall with and without the per-user filter, then tries the fixes at full size. Writes `results.json`. |
| `results.json` | The run the article reports: 40 users, 384-dimension embeddings. |

## Run it

You need Docker and [uv](https://docs.astral.sh/uv/). The article used pgvector 0.8.6 on Postgres 17.

```bash
docker run -d --name pgv-experiment -e POSTGRES_PASSWORD=exp -p 55432:5432 pgvector/pgvector:pg17
uv run embed.py
uv run experiment.py
```

`embed.py` downloads the dataset and the embedding model the first time, and embeds on the CPU. `experiment.py` connects to `localhost:55432`.

Two settings change the run:

- `N_USERS=10 uv run experiment.py` runs with fewer simulated users. The article’s selectivity table uses 1, 4, 10 and 40.
- `QUICK=1 uv run experiment.py` loads the whole corpus at once and only checks HNSW with iterative scans.

## Reading the results

Each entry in `results.json` has a `filtered` and an `unfiltered` block:

- `recall`: the share of the exact top five the database returned.
- `zero_hit_share`: the share of questions that got none of the top five.
- `short_results_share`: the share of questions that got fewer than five rows.
- `uses_index`: whether `explain` showed the vector index in the plan.

Timings are in the file but not in the article. Below 20,000 rows, every setup answered in a few milliseconds.
