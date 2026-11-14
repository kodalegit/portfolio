"""Compare Uwazo's routed pipeline with a single tool-calling agent.

Arms, all on the same questions, model, tools and knowledge base:
  pipeline  production graph, deep_research=False: gatekeeper -> plan -> parallel tools -> synthesis
  deep      production graph, deep_research=True: gatekeeper -> deep research agent
  agent     prototype: one tool-calling agent, no gatekeeper, standard synthesis rules as its prompt

Run from the Uwazo backend folder so the app imports and .env resolve:
  LANGSMITH_TRACING=false .venv/bin/python /path/to/run.py [N_PER_ARM_LIMIT]
Writes runs.jsonl next to this file. Re-running skips finished (arm, id) pairs.
"""
import asyncio
import csv
import json
import os
import random
import sys
import time
from collections import defaultdict
from datetime import datetime
from pathlib import Path
from uuid import uuid4

os.environ["LANGSMITH_TRACING"] = "false"
sys.path.insert(0, os.getcwd())

from langchain.agents import create_agent
from langchain.agents.middleware import ToolCallLimitMiddleware
from langchain_core.callbacks import AsyncCallbackHandler
from langchain_core.messages import HumanMessage, AIMessage
from supabase import acreate_client

from app.core.config import get_settings
from app.services.memory_service import MemoryManager
from app.services.utils.memory_store import SupabaseMemoryStore
from app.services.web_search_service import WebSearchService
from app.services.utils.agent_workflow.citations import CitationManager
from app.services.utils.agent_workflow.context import TaxAgentContext, TaxAgentState
from app.services.utils.agent_workflow.graph import create_tax_agent_graph
from app.services.utils.agent_workflow.helpers import _get_allowed_tools, _stringify_message_content
from app.services.utils.agent_workflow.llm import pick_llm_for_complexity
from app.services.utils.agent_workflow import prompts

HERE = Path(__file__).resolve().parent
OUT = HERE / "runs.jsonl"
DATASET = Path("app/services/utils/agent_workflow/evals/dataset.csv")

CHAT_TURNS = [
    ("C01", "Hello"),
    ("C02", "Can you help me with my taxes?"),
    ("C03", "Thanks, that was helpful!"),
]

AGENT_TOOL_RULES = """
---
## 6. Gathering evidence ##
You have search tools. Their outputs are your `<ResearchEvidence>`.
- For any question about Kenyan tax, law or regulation, search before you answer.
- Run independent searches in the same turn.
- If results are thin or off-topic, search again with different terms or another source.
- For greetings, thanks, or requests too vague to research, answer directly without tools and ask what the user needs.
- You can make at most 5 tool calls in total.
"""


def pick_questions(n_basic=4, n_applied=9, n_complex=5, seed=7):
    rows = list(csv.DictReader(DATASET.open()))
    rng = random.Random(seed)
    out = []
    for level, n in (("Basic Factual", n_basic), ("Applied Knowledge", n_applied), ("Complex Analysis", n_complex)):
        pool = [r for r in rows if r["Complexity"] == level]
        out += rng.sample(pool, n)
    return [(r["ID"], r["Question"], r["Complexity"]) for r in out] + [(i, q, "Chat") for i, q in CHAT_TURNS]


class Meter(AsyncCallbackHandler):
    def __init__(self):
        self.calls = defaultdict(int)
        self.tokens = defaultdict(lambda: {"in": 0, "out": 0})
        self.tools = []
        self.t0 = time.perf_counter()

    async def on_llm_end(self, response, **kw):
        for gen in response.generations:
            for g in gen:
                msg = getattr(g, "message", None)
                usage = getattr(msg, "usage_metadata", None) or {}
                model = (getattr(msg, "response_metadata", {}) or {}).get("model_name") or "unknown"
                self.calls[model] += 1
                self.tokens[model]["in"] += usage.get("input_tokens", 0)
                self.tokens[model]["out"] += usage.get("output_tokens", 0)

    async def on_tool_start(self, serialized, input_str, **kw):
        self.tools.append({"name": (serialized or {}).get("name"), "t": round(time.perf_counter() - self.t0, 2),
                           "input": str(input_str)[:200]})


def make_context(settings, supabase, mm, web):
    return TaxAgentContext(
        user_id=str(uuid4()), client_id=None, document_id=None, supabase=supabase,
        memory_manager=mm, subscription_service=None, settings=settings,
        citation_manager=CitationManager(), web_search_service=web,
        knowledge_source_mode="central", enable_web_search=True, include_documents=False,
        max_research_tools=5, default_llm_provider=settings.workflow_llm_provider.lower(), temperature=0.7,
    )


def build_agent(ctx):
    system = prompts._STANDARD_SYNTHESIS_PROMPT.format(
        current_date=datetime.now().strftime("%Y-%m-%d"), relevant_context="",
        research_results="(gathered with your tools, see section 6)",
    ) + AGENT_TOOL_RULES
    return create_agent(
        model=pick_llm_for_complexity(ctx, complexity="medium", purpose="workflow"),
        tools=_get_allowed_tools(ctx), system_prompt=system,
        middleware=[ToolCallLimitMiddleware(run_limit=5, exit_behavior="continue")],
    )


async def run_one(arm, qid, question, deps):
    ctx = make_context(*deps)
    meter = Meter()
    cfg = {"callbacks": [meter], "recursion_limit": 30}
    t0 = time.perf_counter()
    rec = {"arm": arm, "id": qid, "question": question}
    try:
        if arm == "agent":
            res = await build_agent(ctx).ainvoke({"messages": [HumanMessage(question)]}, context=ctx, config=cfg)
            msgs = res["messages"]
            rec["answer"] = _stringify_message_content(msgs[-1].content)
            rec["route"] = "tools" if meter.tools else "direct"
        else:
            graph = create_tax_agent_graph()
            state = TaxAgentState(messages=[HumanMessage(question)], input=question, deep_research=(arm == "deep"))
            res = await graph.ainvoke(state, context=ctx, config=cfg)
            ans = res.get("final_answer") or res.get("gatekeeper_response") or ""
            if not ans:
                ais = [m for m in res.get("messages", []) if isinstance(m, AIMessage)]
                ans = _stringify_message_content(ais[-1].content) if ais else ""
            rec["answer"] = ans
            rec["route"] = res.get("gatekeeper_action")
            rec["complexity"] = res.get("query_complexity")
            rec["planned_tools"] = res.get("planned_tools")
    except Exception as e:
        rec["error"] = repr(e)[:500]
    rec["seconds"] = round(time.perf_counter() - t0, 1)
    rec["calls"] = dict(meter.calls)
    rec["tokens"] = {k: dict(v) for k, v in meter.tokens.items()}
    rec["tools"] = meter.tools
    rec["citations"] = len(ctx.citation_manager.get_sources_for_frontend())
    return rec


async def main():
    settings = get_settings()
    supabase = await acreate_client(settings.supabase_url, settings.supabase_key)
    mm = MemoryManager(memory_store=SupabaseMemoryStore(supabase=supabase), supabase=supabase, settings=settings)
    web = WebSearchService(settings=settings)
    deps = (settings, supabase, mm, web)

    limit = int(sys.argv[1]) if len(sys.argv) > 1 else None
    questions = pick_questions()[:limit] if limit else pick_questions()
    done = set()
    if OUT.exists():
        for line in OUT.read_text().splitlines():
            r = json.loads(line)
            if "error" not in r:
                done.add((r["arm"], r["id"]))
    jobs = [(a, q) for q in questions for a in ("pipeline", "agent", "deep") if (a, q[0]) not in done]
    print(f"{len(jobs)} runs to do", flush=True)
    sem = asyncio.Semaphore(int(os.environ.get("CONCURRENCY", 4)))

    async def go(arm, q):
        async with sem:
            rec = await run_one(arm, q[0], q[1], deps)
            rec["level"] = q[2]
            with OUT.open("a") as f:
                f.write(json.dumps(rec) + "\n")
            print(arm, q[0], rec["seconds"], "s", rec.get("route"), len(rec["tools"]), "tools",
                  rec.get("error", "")[:120], flush=True)

    await asyncio.gather(*(go(a, q) for a, q in jobs))


if __name__ == "__main__":
    asyncio.run(main())
