# Uwazo: routed pipeline, deep research and one tool-calling agent

Code and results for [My research assistant started as a workflow. Better models made an agent the right default.](https://victorkimani.com/writing/workflow-to-agent)

It compares three designs on the same 18 research questions and 3 chat messages, with the same model, tools and knowledge base:

- **pipeline**: Uwazo’s production graph with deep research off. A gatekeeper, then plan, parallel searches and a writer.
- **deep**: the production graph with deep research on. The gatekeeper, then the deep research agent.
- **agent**: a prototype. One tool-calling agent with no gatekeeper, using the pipeline writer’s prompt plus a short section on tool use.

## Files

| File | Contents |
| --- | --- |
| `run.py` | Runs every question through all three designs and records the answer, time, model calls, tokens and tool calls |
| `judge.py` | Blind scoring. Each question’s three answers are shuffled and labelled A, B and C before one judge call scores them |
| `summarize.py` | Builds `summary.json` from the two result files |
| `runs.jsonl` | 63 runs, one per line |
| `judge.jsonl` | One verdict per question |
| `summary.json` | The numbers in the article’s results table |

## Running it

The scripts import Uwazo’s backend (`app.services…`), which is private, so they will not run on their own. They are published so you can read exactly what was measured and how.

The raw data stands on its own. Each line of `runs.jsonl` has the question, the design (`arm`), the full answer, the route the gatekeeper chose, seconds, model calls and tokens per model, and every tool call with its start time. `summarize.py` only needs the two `.jsonl` files:

```bash
python3 summarize.py
```

## How the article’s numbers map to `summary.json`

| Article | `summary.json` |
| --- | --- |
| Refused to answer | `judge.declined` |
| Usefulness, accuracy, grounding | `judge.usefulness`, `judge.accuracy`, `judge.grounding` |
| Picked as best answer | `judge.best_research` |
| Median time, slowest 10% | `median_seconds`, `p90_seconds` |
| Main model calls and tokens | `mean_main_calls`, `mean_main_input_tokens` + `mean_main_output_tokens` |
| Summariser tokens | `mean_summarizer_tokens` |
| Searches per question | `mean_tool_calls` |
