"""Reproduce Uwazo's retrieval decay: IVFFlat built on an empty table, then data grows.

Mirrors Uwazo's schema and match_document_embeddings query: join documents, filter by
user and client, order by cosine distance, limit 5. Ground truth is exact KNN in numpy.
"""
import json
import os
import time

import numpy as np
import psycopg
from pgvector.psycopg import register_vector

K = 5
N_USERS = int(os.environ.get("N_USERS", 40))
TOPICS_PER_USER = 3
STAGES = [1_000, 3_000, 10_000, None] if not os.environ.get("QUICK") else [None]  # None = whole corpus
DSN = "host=localhost port=55432 user=postgres password=exp dbname=postgres"

rng = np.random.default_rng(42)
data = np.load("corpus.npz")
emb, topics, doc_ids = data["emb"], data["topics"], data["doc_ids"]
qemb, q_topics = data["qemb"], data["q_topics"]
dim = emb.shape[1]

# Each user works on 3 of the 20 topics; a document belongs to one user with its topic.
user_topics = [rng.choice(20, TOPICS_PER_USER, replace=False) for _ in range(N_USERS)]
users_by_topic = {t: [u for u in range(N_USERS) if t in user_topics[u]] for t in range(20)}
for t in range(20):
    if not users_by_topic[t]:
        users_by_topic[t] = [int(rng.integers(N_USERS))]
unique_docs = np.unique(doc_ids)
doc_user = {
    int(d): int(rng.choice(users_by_topic[int(topics[np.argmax(doc_ids == d)])]))
    for d in unique_docs
}
chunk_user = np.array([doc_user[int(d)] for d in doc_ids])
q_user = np.array([int(rng.choice(users_by_topic[int(t)])) for t in q_topics])

# Documents arrive in random order, like uploads over time.
doc_order = rng.permutation(unique_docs)
doc_rank = {int(d): i for i, d in enumerate(doc_order)}
chunk_order = np.argsort([doc_rank[int(d)] for d in doc_ids], kind="stable")

conn = psycopg.connect(DSN, autocommit=True)
conn.execute("create extension if not exists vector")
register_vector(conn)

TABLES = ["ivf", "hnsw"]


def setup():
    for t in TABLES:
        conn.execute(f"drop table if exists emb_{t}; drop table if exists docs_{t}")
        conn.execute(
            f"create table docs_{t} (id bigint primary key, user_id int, client_id int, deleted_at timestamptz)"
        )
        conn.execute(
            f"create table emb_{t} (id bigint primary key, document_id bigint references docs_{t}(id), embedding vector({dim}))"
        )
        conn.execute(f"create index on emb_{t} (document_id)")
        conn.execute(f"create index on docs_{t} (user_id)")
    # Exactly what Uwazo's migrations did: index created with the empty table, defaults.
    conn.execute("create index ivf_idx on emb_ivf using ivfflat (embedding vector_cosine_ops)")
    conn.execute("create index hnsw_idx on emb_hnsw using hnsw (embedding vector_cosine_ops)")


def insert(chunk_idx, seen_docs):
    for t in TABLES:
        with conn.cursor() as cur:
            new_docs = sorted({int(doc_ids[i]) for i in chunk_idx} - seen_docs[t])
            with cur.copy(f"copy docs_{t} (id, user_id) from stdin") as cp:
                for d in new_docs:
                    cp.write_row((d, doc_user[d]))
            seen_docs[t].update(new_docs)
            with cur.copy(f"copy emb_{t} (id, document_id, embedding) from stdin with (format binary)") as cp:
                cp.set_types(["int8", "int8", "vector"])
                for i in chunk_idx:
                    cp.write_row((int(i), int(doc_ids[i]), emb[i]))
        conn.execute(f"analyze emb_{t}; analyze docs_{t}")


FILTERED = """
select e.id from emb_{t} e join docs_{t} d on d.id = e.document_id
where d.deleted_at is null and d.user_id = %s and d.client_id is null
order by e.embedding <=> %s limit {k}"""
UNFILTERED = "select e.id from emb_{t} e order by e.embedding <=> %s limit {k}"


def truth(inserted, q, user=None):
    idx = inserted if user is None else inserted[chunk_user[inserted] == user]
    if len(idx) == 0:
        return set()
    d = 1 - emb[idx] @ q
    return set(idx[np.argsort(d)[:K]].tolist())


def run(t, inserted, settings=None, label=None):
    settings = settings or {}
    with conn.transaction():
        for k, v in settings.items():
            conn.execute(f"set local {k} = {v}")
        out = {}
        for mode in ("filtered", "unfiltered"):
            recalls, returned, times = [], [], []
            for qi, q in enumerate(qemb):
                user = int(q_user[qi]) if mode == "filtered" else None
                sql = (FILTERED if user is not None else UNFILTERED).format(t=t, k=K)
                args = (user, q) if user is not None else (q,)
                t0 = time.perf_counter()
                rows = [r[0] for r in conn.execute(sql, args).fetchall()]
                times.append((time.perf_counter() - t0) * 1000)
                exp = truth(inserted, q, user)
                if not exp:
                    continue
                recalls.append(len(exp & set(rows)) / len(exp))
                returned.append(len(rows))
            q0 = qemb[0]
            sql = (FILTERED if mode == "filtered" else UNFILTERED).format(t=t, k=K)
            args = (int(q_user[0]), q0) if mode == "filtered" else (q0,)
            plan = "\n".join(r[0] for r in conn.execute("explain " + sql, args).fetchall())
            out[mode] = {
                "recall": round(float(np.mean(recalls)), 3),
                "zero_hit_share": round(float(np.mean([r == 0 for r in recalls])), 3),
                "short_results_share": round(float(np.mean([n < K for n in returned])), 3),
                "ms": round(float(np.median(times)), 2),
                "uses_index": ("ivf_idx" in plan) or ("hnsw_idx" in plan),
            }
    return {"table": t, "label": label or t, "settings": settings, **out}


setup()
seen = {t: set() for t in TABLES}
results, done = [], 0
for stage in STAGES:
    end = len(chunk_order) if stage is None else stage
    insert(chunk_order[done:end], seen)
    done = end
    inserted = chunk_order[:done]
    for t in TABLES:
        r = run(t, inserted, label=f"{t} (built empty)" if t == "ivf" else "hnsw")
        r["rows"] = done
        results.append(r)
        print(json.dumps(r), flush=True)

# Fixes at full size.
if os.environ.get("QUICK"):
    print(json.dumps(run("hnsw", chunk_order[:done], {"hnsw.iterative_scan": "relaxed_order"}, "hnsw iterative scan")))
    raise SystemExit
inserted = chunk_order[:done]
variants = [
    ("ivf", {"ivfflat.probes": 10}, "ivf built empty, probes=10"),
    ("hnsw", {"hnsw.ef_search": 100}, "hnsw ef_search=100"),
    ("hnsw", {"hnsw.iterative_scan": "relaxed_order"}, "hnsw iterative scan"),
]
for t, s, label in variants:
    r = run(t, inserted, s, label)
    r["rows"] = done
    results.append(r)
    print(json.dumps(r), flush=True)

t0 = time.perf_counter()
conn.execute("reindex index ivf_idx")
print(f"reindex took {time.perf_counter() - t0:.1f}s", flush=True)
for s, label in [
    ({}, "ivf rebuilt, probes=1"),
    ({"ivfflat.probes": 10}, "ivf rebuilt, probes=10"),
    ({"ivfflat.probes": 10, "ivfflat.iterative_scan": "relaxed_order"}, "ivf rebuilt, probes=10, iterative"),
]:
    r = run("ivf", inserted, s, label)
    r["rows"] = done
    results.append(r)
    print(json.dumps(r), flush=True)

json.dump({"chunks": int(len(emb)), "dim": dim, "users": N_USERS, "results": results},
          open("results.json", "w"), indent=1)
