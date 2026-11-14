"""Summarize runs.jsonl and judge.jsonl into summary.json and a printed table."""
import json
import statistics as st
from collections import Counter, defaultdict
from pathlib import Path

HERE = Path(__file__).resolve().parent
runs = [json.loads(l) for l in (HERE / "runs.jsonl").read_text().splitlines()]
judge = [json.loads(l) for l in (HERE / "judge.jsonl").read_text().splitlines()]
ARMS = ("pipeline", "agent", "deep")
MAIN = "gpt-6-luna"


def agg(rs):
    research = [r for r in rs if r["level"] != "Chat"]
    calls = [r["calls"].get(MAIN, 0) for r in research]
    tin = [r["tokens"].get(MAIN, {}).get("in", 0) for r in research]
    tout = [r["tokens"].get(MAIN, {}).get("out", 0) for r in research]
    side = [sum(v["in"] + v["out"] for k, v in r["tokens"].items() if k != MAIN) for r in research]
    ntools = [len(r["tools"]) for r in research]
    web = [sum(t["name"] == "web_search" for t in r["tools"]) for r in research]
    secs = [r["seconds"] for r in research]
    chat = [r for r in rs if r["level"] == "Chat"]
    return {
        "research_runs": len(research),
        "median_seconds": st.median(secs), "p90_seconds": sorted(secs)[int(0.9 * len(secs)) - 1],
        "mean_main_calls": round(st.mean(calls), 2),
        "mean_main_input_tokens": round(st.mean(tin)), "mean_main_output_tokens": round(st.mean(tout)),
        "mean_summarizer_tokens": round(st.mean(side)),
        "mean_tool_calls": round(st.mean(ntools), 2), "share_using_web": round(sum(w > 0 for w in web) / len(web), 2),
        "no_tool_calls": sum(n == 0 for n in ntools),
        "chat_tool_calls": [len(r["tools"]) for r in chat],
        "chat_seconds": [r["seconds"] for r in chat],
        "recursion_errors": sum("unable to complete" in r.get("answer", "") or "error during deep" in r.get("answer", "") for r in rs),
    }


def tool_rounds(r):
    ts = sorted(t["t"] for t in r["tools"])
    rounds, last = 0, None
    for t in ts:
        if last is None or t - last > 1.5:
            rounds += 1
        last = t
    return rounds


out = {}
for a in ARMS:
    rs = [r for r in runs if r["arm"] == a]
    out[a] = agg(rs)
    out[a]["multi_round_share"] = round(sum(tool_rounds(r) > 1 for r in rs if r["level"] != "Chat") / out[a]["research_runs"], 2)

sc = defaultdict(lambda: defaultdict(list))
best = Counter()
best_research = Counter()
for j in judge:
    best[j["best"]] += 1
    if not j["id"].startswith("C"):
        best_research[j["best"]] += 1
    for a, s in j["scores"].items():
        if j["id"].startswith("C"):
            continue
        for k in ("accuracy", "usefulness", "grounding"):
            sc[a][k].append(s[k])
        sc[a]["declined"].append(s["declined"])
for a in ARMS:
    out[a]["judge"] = {k: round(st.mean(v), 2) for k, v in sc[a].items() if k != "declined"}
    out[a]["judge"]["declined"] = sum(sc[a]["declined"])
    out[a]["judge"]["best_research"] = best_research[a]
    out[a]["judge"]["best_all"] = best[a]

routes = Counter((r["arm"], r.get("route")) for r in runs)
out["routes"] = {f"{a}:{rt}": n for (a, rt), n in routes.items()}
(HERE / "summary.json").write_text(json.dumps(out, indent=1))
print(json.dumps(out, indent=1))
