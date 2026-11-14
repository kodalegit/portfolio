"""Blind-score the three arms' answers with one judge call per question.

Labels are shuffled per question so the judge cannot tell which arm wrote which answer.
Run from the Uwazo backend folder:  .venv/bin/python /path/to/judge.py
"""
import asyncio
import json
import os
import random
import sys
from pathlib import Path
from typing import List, Literal

os.environ["LANGSMITH_TRACING"] = "false"
sys.path.insert(0, os.getcwd())

from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field

from app.core.config import get_settings
from app.services.utils.agent_workflow.model_config import openai_reasoning_kwargs

HERE = Path(__file__).resolve().parent
ARMS = ("pipeline", "agent", "deep")


class Score(BaseModel):
    label: Literal["A", "B", "C"]
    accuracy: int = Field(ge=1, le=5, description="Is what it says correct for Kenya today? 5 = no errors.")
    usefulness: int = Field(ge=1, le=5, description="Does it answer the actual question, with the specifics a practitioner needs?")
    grounding: int = Field(ge=1, le=5, description="Are specific figures, sections and rules backed by citation markers, with no confident unsupported specifics?")
    declined: bool = Field(description="True if the answer says it could not find the information instead of answering.")
    errors: str = Field(description="Any factual errors or risky claims, or 'none'.")


class Verdict(BaseModel):
    scores: List[Score]
    best: Literal["A", "B", "C"]
    reason: str = Field(description="One or two sentences on why the best answer is best.")


PROMPT = """You are reviewing answers from a Kenyan tax research assistant used by tax professionals.
Each answer may contain markers like [CITATION_ID: K_1], which link to statute text (K_), or web pages (W_).
You cannot see the sources, so judge accuracy from your own knowledge of Kenyan tax law and say when you are unsure.
For a greeting or vague request, the best answer is short, friendly and asks what the user needs.

Question:
{question}

{answers}

Score every answer, then pick the best one."""


async def main():
    s = get_settings()
    llm = ChatOpenAI(model=s.workflow_model_name, api_key=s.openai_api_key, **openai_reasoning_kwargs("medium"))
    judge = llm.with_structured_output(Verdict)
    runs = [json.loads(l) for l in (HERE / "runs.jsonl").read_text().splitlines()]
    by_q = {}
    for r in runs:
        if "error" not in r:
            by_q.setdefault(r["id"], {})[r["arm"]] = r
    out_path = HERE / "judge.jsonl"
    done = {json.loads(l)["id"] for l in out_path.read_text().splitlines()} if out_path.exists() else set()
    rng = random.Random(11)
    sem = asyncio.Semaphore(4)

    async def one(qid, arms):
        order = list(ARMS)
        rng.shuffle(order)
        labels = dict(zip("ABC", order))
        answers = "\n\n".join(f"<answer label=\"{l}\">\n{arms[a]['answer']}\n</answer>" for l, a in labels.items())
        async with sem:
            v = await judge.ainvoke(PROMPT.format(question=arms[order[0]]["question"], answers=answers))
        rec = {"id": qid, "labels": labels, "best": labels[v.best], "reason": v.reason,
               "scores": {labels[sc.label]: sc.model_dump(exclude={"label"}) for sc in v.scores}}
        with out_path.open("a") as f:
            f.write(json.dumps(rec) + "\n")
        print(qid, "best:", rec["best"], flush=True)

    await asyncio.gather(*(one(q, a) for q, a in by_q.items() if q not in done and len(a) == 3))


if __name__ == "__main__":
    asyncio.run(main())
