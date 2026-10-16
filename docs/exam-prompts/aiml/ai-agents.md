You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "AI Agents Engineer" (ai-agents, category aiml). It has 12 layers, listed at the bottom.

## HOW TO ANSWER
Write the bank for ONE layer per reply, in the order listed. Each reply must contain exactly 60 questions for that layer. After each reply, stop and wait; I will type "next".

## OUTPUT FORMAT — follow exactly
First line: the layer marker, exactly like this, with the layer id from the list:
LAYER: <layer id>
Then ONE ```json code block containing a JSON array of exactly 60 objects. No text after the block. Each object has exactly these fields:

```json
{
  "stem": "the question text",
  "topic": "one topic copied word for word from that layer's Topics list",
  "choices": ["choice A", "choice B", "choice C", "choice D"],
  "answerIdx": 2
}
```

- "choices" has exactly 4 strings; "answerIdx" is the index (0-3) of the one correct choice.
- Do NOT add "id", "explanation" or any other field.

## QUESTION RULES
1. Test understanding of a concept a working developer must know, not trivia, version numbers or memorised syntax.
2. Exactly one choice is correct. Re-read each question and verify the key before you output it. If you are not sure of the answer, replace the question.
3. Distractors must be plausible mistakes a real learner would make, not jokes and not obviously wrong.
4. No "all of the above", "none of the above", "both A and B", and no negative stems ("which is NOT...").
5. LENGTH BIAS IS THE MOST COMMON FAILURE. Models write the correct answer as the longest, most detailed choice, and learners learn to pick it without knowing the material. Write the three wrong choices FIRST, with the same level of detail, specific terms and length as the right one. The correct choice may be the longest in only about 1 of every 4 questions; in about 1 of 4 it should be the shortest. Wrong choices must sound like a real technical claim, never absurd ("compiles HTML into machine code").
6. Spread "answerIdx" evenly across 0, 1, 2 and 3 (about 15 each). Do not put the answer at index 0 or 1 most of the time.
7. Difficulty mix per layer: about one third easy, half medium, the rest hard.
8. Cover every topic of the layer, roughly evenly. Never repeat or rephrase a question within the layer.
9. Each question must stand alone: no "see the diagram", no references to earlier questions. Short code snippets inside the stem are fine (use plain text, \n for line breaks, no markdown fences inside the JSON strings).
10. Stay accurate for current stable versions of the technologies. Avoid questions whose answer changed recently or is opinion.
11. Escape quotes properly so the JSON parses. No trailing commas, no comments.

## LAYERS
### Layer 1 of 12 — id: ai-agents-1
Title: LLM APIs and Agent Foundations
Technologies: LLM APIs, Python, Streaming
Description: Start with the building block: calling a language model reliably from code. You will manage messages, tokens and context windows, stream responses, handle errors and rate limits, and learn what an agent actually is.
Topics:
- Chat messages, roles and system prompts
- Tokens, context windows and pricing
- Sampling parameters and determinism
- Streaming responses and cancellation
- Errors, retries, rate limits and timeouts
- What makes something an agent versus a workflow

### Layer 2 of 12 — id: ai-agents-2
Title: Prompting and Structured Outputs
Technologies: Prompt Design, JSON Schema, Pydantic
Description: Get dependable, machine-readable results from a model. You will write clear instructions, give examples, constrain output with schemas, and validate everything before your code trusts it.
Topics:
- Clear instructions, roles and delimiters
- Few-shot examples and chain-of-thought
- Structured output with JSON schemas
- Validating and repairing model output
- Prompt versioning and testing
- Prompt caching and cost control

### Layer 3 of 12 — id: ai-agents-3
Title: Tool Use and Function Calling
Technologies: Tool Use, Function Calling, JSON Schema
Description: Give a model the ability to act. You will define tools with clear schemas, run the tool loop, handle errors and parallel calls, and design tool interfaces that models use correctly.
Topics:
- Defining tools: names, descriptions and input schemas
- The tool-use loop: request, execute, return result
- Parallel tool calls
- Tool errors and returning useful failures
- Designing tools for models, not humans
- Side effects, permissions and confirmation

### Layer 4 of 12 — id: ai-agents-4
Title: Agent Architectures and Planning
Technologies: ReAct, Planning, LangGraph
Description: Combine a model, tools and control flow into systems that complete multi-step tasks. You will study the main patterns (ReAct, plan-and-execute, routing, reflection) and implement an agent loop you fully understand.
Topics:
- ReAct: reasoning and acting
- Plan-and-execute and task decomposition
- Routing, prompt chaining and parallelization
- Reflection and self-correction
- State machines and graphs for control flow
- Choosing a framework versus writing the loop

### Layer 5 of 12 — id: ai-agents-5
Title: Retrieval and Knowledge for Agents
Technologies: RAG, Embeddings, Vector Search
Description: Connect agents to your data. You will chunk and embed documents, retrieve with hybrid search and reranking, and let the agent decide when and what to retrieve, with citations the user can verify.
Topics:
- Chunking strategies and metadata
- Embeddings and vector databases
- Hybrid search (keyword plus vector) and reranking
- Agentic retrieval: query rewriting and multi-step search
- Citations and grounding
- Measuring retrieval quality

### Layer 6 of 12 — id: ai-agents-6
Title: Memory and Context Management
Technologies: Context Engineering, Memory, Summarization
Description: Decide what the model sees at each step. You will manage short-term context, summarize long histories, add persistent memory across sessions, and control cost and quality as conversations grow.
Topics:
- Context engineering: what goes into each call
- Truncation, summarization and sliding windows
- Short-term versus long-term memory
- Storing and retrieving user facts
- Scratchpads and notes for long tasks
- Memory privacy, correction and deletion

### Layer 7 of 12 — id: ai-agents-7
Title: Model Context Protocol and Tool Ecosystems
Technologies: MCP, Tool Servers, OAuth
Description: Use the open standard for connecting models to tools and data. You will consume existing MCP servers, build your own, and handle authentication, permissions and trust when tools come from outside.
Topics:
- MCP architecture: hosts, clients and servers
- Tools, resources and prompts
- Building an MCP server with an SDK
- Transports: stdio and streamable HTTP
- Authorization and securing tool access
- Trusting third-party servers

### Layer 8 of 12 — id: ai-agents-8
Title: Multi-Agent Systems and Delegation
Technologies: Multi-Agent, Orchestration, Subagents
Description: Know when several agents beat one. You will split work across specialized agents with an orchestrator, manage handoffs and shared state, control cost, and recognize the failure modes unique to multi-agent systems.
Topics:
- When to use multiple agents
- Orchestrator-worker and handoff patterns
- Subagents with isolated context
- Shared state, messages and artifacts
- Coordination failures and runaway cost
- Human-in-the-loop checkpoints

### Layer 9 of 12 — id: ai-agents-9
Title: Evaluating and Testing Agents
Technologies: Evals, LLM-as-Judge, Regression Tests
Description: Know whether your agent is any good. You will build datasets, write graders including model-based ones, test tool use and trajectories, and run evaluations in CI so changes cannot silently make things worse.
Topics:
- Why evals are the core of agent development
- Building and growing a test dataset
- Code graders, human review and LLM-as-judge
- Evaluating tool calls and whole trajectories
- Regression testing prompts and models in CI
- Online monitoring and feedback loops

### Layer 10 of 12 — id: ai-agents-10
Title: Safety, Guardrails, and Prompt Injection
Technologies: Prompt Injection, Guardrails, OWASP LLM
Description: Build agents that stay safe when inputs are hostile. You will understand prompt injection and why it is hard, design with least privilege, add layered guardrails, and plan for abuse and misuse.
Topics:
- Direct and indirect prompt injection
- The lethal trifecta: private data, untrusted content, outbound action
- Least privilege and sandboxing tool execution
- Input and output guardrails and moderation
- Data leakage, secrets and PII handling
- Red teaming and abuse monitoring

### Layer 11 of 12 — id: ai-agents-11
Title: Observability, Cost, and Latency
Technologies: Tracing, OpenTelemetry, Langfuse
Description: Operate agents like any production service. You will trace every model and tool call, track cost and latency per task, find the slow or expensive step, and optimize without hurting quality.
Topics:
- Tracing agent runs end to end
- Logging prompts, tool calls and outputs safely
- Cost and token accounting per user and task
- Latency: streaming, parallel tools and caching
- Model routing: small models for easy steps
- Dashboards, alerts and debugging a bad run

### Layer 12 of 12 — id: ai-agents-12
Title: Shipping Agents: Deployment, Reliability, and Human Oversight
Technologies: Deployment, Queues, Durable Execution
Description: Take an agent from a notebook to a service people depend on. You will run long tasks reliably, handle failures and resumption, version and roll out changes safely, and design the human experience around an autonomous system.
Topics:
- Running agents as background jobs
- Durable execution, checkpoints and resuming
- Timeouts, retries and idempotent tool calls
- Versioning prompts, tools and models; staged rollout
- User experience: showing progress and asking for approval
- Incident response and graceful fallback

Start now with Layer 1.
