"""Build a real-text corpus and embed it locally.

20 Newsgroups gives 20 topics, which stand in for different subjects users upload.
Chunks of ~120 words, like a RAG pipeline. bge-small-en-v1.5 (384-d) runs on CPU.
"""
import re
import time

import numpy as np
from fastembed import TextEmbedding
from sklearn.datasets import fetch_20newsgroups


def chunks(text, size=120, min_words=40):
    words = re.sub(r"\s+", " ", text).split(" ")
    for i in range(0, len(words), size):
        piece = words[i : i + size]
        if len(piece) >= min_words:
            yield " ".join(piece)


train = fetch_20newsgroups(subset="train", remove=("headers", "footers", "quotes"))
test = fetch_20newsgroups(subset="test", remove=("headers", "footers", "quotes"))

texts, topics, doc_ids = [], [], []
for doc_id, (text, topic) in enumerate(zip(train.data, train.target)):
    for c in chunks(text):
        texts.append(c)
        topics.append(topic)
        doc_ids.append(doc_id)

rng = np.random.default_rng(0)
queries, q_topics = [], []
for i in rng.permutation(len(test.data)):
    words = re.sub(r"\s+", " ", test.data[i]).split(" ")
    if len(words) >= 25:
        queries.append(" ".join(words[:40]))
        q_topics.append(test.target[i])
    if len(queries) == 300:
        break

print(f"{len(texts)} chunks from {len(set(doc_ids))} docs, {len(queries)} queries", flush=True)
model = TextEmbedding("BAAI/bge-small-en-v1.5")
t = time.time()
emb = np.array(list(model.embed(texts, batch_size=32)), dtype=np.float32)
qemb = np.array(list(model.query_embed(queries)), dtype=np.float32)
print(f"embedded in {time.time() - t:.0f}s", flush=True)
np.savez(
    "corpus.npz",
    emb=emb,
    topics=np.array(topics),
    doc_ids=np.array(doc_ids),
    qemb=qemb,
    q_topics=np.array(q_topics),
)
