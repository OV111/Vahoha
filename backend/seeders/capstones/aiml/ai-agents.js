/**
 * Capstone brief — ai-agents track (aiml), v1.
 *
 * Drafted by Claude, 2026-10-21; NOT yet reviewed by a human.
 * The seeder refuses to publish a brief whose `reviewed` flag is false.
 *
 * Shape notes:
 * - requirements[].check is for the stage-2 automated checks. `file` is a glob
 *   matched against the repo tree at the pinned commit. Requirements without a
 *   check are judged only by the AI rubric review.
 * - rubric[].weight values sum to 100. rubric[].layerId maps a weak criterion
 *   back to the roadmap layer that teaches it, for weak-spot tracking.
 * - Bump `version` for any change that affects grading; never edit a
 *   published version in place (attempts point at the exact brief document).
 */

import { DEFAULT_PASS_THRESHOLDS } from "../../../modules/capstone/lib/constants.js";
import { CHECKS, COMMON_RULES } from "../shared.js";

export default {
  trackId: "ai-agents",
  categoryId: "aiml",
  slug: "ai-agents-support-triage-agent",
  version: 1,
  status: "draft",
  reviewed: false,
  title: "Evaluated Support Triage Agent with an MCP Tool Server",
  summary:
    "Build a support-triage agent in Python that reads an incoming customer message, looks things up through tools " +
    "served by your own MCP server (order lookup, knowledge-base search, refund draft), keeps conversation memory, " +
    "and either answers with citations or escalates to a human. It must be defended against prompt injection, " +
    "traced and cost-accounted, and, above all, measured by an eval suite that can fail your build. All tests run " +
    "offline against a recorded or fake model client, so grading needs no paid API key.",
  stack: [
    "Python 3.12+",
    "Any LLM API (Anthropic, OpenAI or compatible)",
    "Model Context Protocol (official Python SDK)",
    "Pydantic",
    "SQLite or Postgres with pgvector",
    "pytest",
    "OpenTelemetry",
  ],

  requirements: [
    {
      id: "agent-loop",
      text: "Implement the tool-use loop yourself (call model, execute requested tools, return results, repeat) with a maximum step count, a token budget and a clear stop condition; do not hide it inside a framework.",
    },
    {
      id: "structured-output",
      text: "The final agent result is a Pydantic-validated object (decision: answer or escalate, reply text, citations, confidence); invalid model output triggers one repair attempt and then a safe escalation.",
    },
    {
      id: "tool-schemas",
      text: "Every tool has a precise name, description and JSON Schema for its inputs; tool failures are returned to the model as useful error messages rather than raised, and tool calls with bad arguments are rejected by validation.",
    },
    {
      id: "mcp-server",
      text: "Expose at least three tools and one resource through an MCP server using the official SDK (stdio transport), and have the agent consume them as an MCP client.",
      check: { type: "file", glob: "**/*mcp*/**/*.py" },
    },
    {
      id: "retrieval",
      text: "A knowledge-base search tool over at least 20 documents uses embeddings (or hybrid keyword plus vector search); answers cite the document ids they used and the agent says so when nothing relevant is found.",
    },
    {
      id: "memory",
      text: "Conversation history is trimmed or summarized to stay inside a context budget, and durable customer facts are stored and retrieved across sessions.",
    },
    {
      id: "routing-planning",
      text: "A cheap first step classifies the message (billing, shipping, technical, abuse) and routes it to a specialised prompt or toolset; the README explains why this beats one giant prompt.",
    },
    {
      id: "human-in-the-loop",
      text: "Any action with side effects (such as drafting a refund over a configured amount) requires explicit approval before execution and is logged with who approved it.",
    },
    {
      id: "injection-defence",
      text: "Customer text and tool outputs are treated as untrusted data: delimited from instructions, the agent has least-privilege tools, and a test set of at least 10 prompt-injection attempts (including one hidden in a knowledge-base document) shows none causes an unauthorised action.",
    },
    {
      id: "guardrails",
      text: "Input and output checks block leaking another customer's data and redact personal data (emails, card numbers) from logs and traces.",
    },
    {
      id: "eval-dataset",
      text: "An eval dataset of at least 30 labelled cases (answerable, needs-escalation, adversarial, out-of-scope) lives in the repo as versioned data.",
      check: {
        type: "file",
        glob: "{evals,eval,tests/evals}/**/*.{jsonl,json,yaml,yml,csv}",
      },
    },
    {
      id: "eval-graders",
      text: "Evals use code graders for tool choice, arguments and final decision, plus one LLM-as-judge grader for reply quality whose agreement with at least 10 human labels you measured and reported.",
    },
    {
      id: "eval-gate",
      text: "A single command runs the offline eval suite and exits non-zero when pass rate or a safety metric drops below a stated threshold; CI runs it on every push.",
      check: CHECKS.ci,
    },
    {
      id: "observability",
      text: "Each run produces a trace (spans for model calls and tool calls) with token counts and a cost estimate per run and per customer; the README shows one real trace.",
    },
    {
      id: "reliability",
      text: "Model and tool calls have timeouts and retries with backoff and jitter, tool calls with side effects are idempotent, and a run interrupted mid-way can resume from a saved checkpoint.",
    },
    {
      id: "offline-tests",
      text: "Unit tests use a recorded or fake model client so the suite runs with no network or API key.",
      check: { type: "file", glob: "tests/**/test_*.py" },
    },
    {
      id: "env-example",
      text: "Secrets come from environment variables, with a documented .env.example and no keys in git history.",
      check: CHECKS.envExample,
    },
    {
      id: "readme",
      text: "README explains the architecture, how to run the agent and the evals, the eval results table, and three failures you found by evaluating and how you fixed them.",
      check: CHECKS.readme,
    },
  ],

  rubric: [
    {
      id: "tool-use",
      name: "Tool Use & Structured Output",
      weight: 15,
      layerId: "ai-agents-3",
      description:
        "Well-designed tool schemas, a correct hand-written loop, validated outputs and helpful failure handling.",
    },
    {
      id: "architecture",
      name: "Agent Architecture & Routing",
      weight: 15,
      layerId: "ai-agents-4",
      description:
        "Sensible control flow with routing, step limits, and human approval for risky actions.",
    },
    {
      id: "retrieval",
      name: "Retrieval & Grounding",
      weight: 10,
      layerId: "ai-agents-5",
      description:
        "Retrieval quality, citations, and honest behaviour when the knowledge base has no answer.",
    },
    {
      id: "memory",
      name: "Memory & Context Management",
      weight: 5,
      layerId: "ai-agents-6",
      description:
        "Context stays within budget and durable facts are stored and recalled correctly.",
    },
    {
      id: "mcp",
      name: "MCP Server & Client",
      weight: 10,
      layerId: "ai-agents-7",
      description:
        "A correct MCP server with tools and a resource, consumed through a real client session.",
    },
    {
      id: "evals",
      name: "Evaluation",
      weight: 20,
      layerId: "ai-agents-9",
      description:
        "Representative dataset, mixed graders, a validated judge, and a gate that actually blocks regressions.",
    },
    {
      id: "safety",
      name: "Safety & Prompt-Injection Defence",
      weight: 15,
      layerId: "ai-agents-10",
      description:
        "Untrusted-input handling, least privilege, PII redaction and an adversarial test set that passes.",
    },
    {
      id: "observability",
      name: "Observability, Cost & Latency",
      weight: 5,
      layerId: "ai-agents-11",
      description:
        "Useful traces, per-run cost accounting and at least one measured latency or cost optimisation.",
    },
    {
      id: "shipping",
      name: "Reliability & Shipping",
      weight: 5,
      layerId: "ai-agents-12",
      description:
        "Timeouts, retries, idempotent actions, resumable runs and documented configuration.",
    },
  ],

  twistPool: [
    {
      id: "multi-agent-review",
      text: "Add a second reviewer agent with isolated context that checks every drafted reply against policy before sending, and show in the evals whether it reduces bad replies and what it costs.",
    },
    {
      id: "model-routing",
      text: "Route easy messages to a small, cheap model and hard ones to a larger model, and report the cost saving and any eval pass-rate change.",
    },
    {
      id: "streaming-ui",
      text: "Stream the reply and visible tool activity to a minimal web or terminal UI, with cancellation that stops the in-flight run and its tool calls.",
    },
    {
      id: "regression-from-prod",
      text: "Add a command that turns a failed real conversation transcript into a new eval case, and use it to add three cases from failures you found.",
    },
  ],

  rules: COMMON_RULES,

  passThresholds: DEFAULT_PASS_THRESHOLDS,
};
