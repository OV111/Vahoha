You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "AI Developer" (ai-developer, category aiml). It has 11 layers, listed at the bottom.

## HOW TO ANSWER
Write the bank for ONE layer per reply, in the order listed. Each reply must contain exactly 60 questions for that layer. After each reply, stop and wait; I will type "next".

## OUTPUT FORMAT — follow exactly
First line of EVERY reply, including every reply after "next": the layer marker, exactly like this, with the layer id from the list. A reply without it is thrown away by the importer.
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
5. LENGTH BIAS IS THE MOST COMMON FAILURE, and earlier banks failed it badly (the correct answer was the longest choice in up to 95% of questions, so learners passed by picking the longest). Follow this plan exactly. Number the questions 1 to 60; the position of question N in a cycle of 4 fixes how long its CORRECT choice is compared with its three wrong choices:
   - N = 1, 5, 9, ...: the correct choice is the SHORTEST of the four.
   - N = 2, 6, 10, ...: the correct choice is the second shortest.
   - N = 3, 7, 11, ...: the correct choice is the second longest.
   - N = 4, 8, 12, ...: the correct choice is the LONGEST of the four.
   Write the wrong choices with the same level of detail, specific terms and qualifiers as the right one; never make the right one the only careful, hedged or complete-sounding choice. Wrong choices must sound like a real technical claim, never absurd ("compiles HTML into machine code").
6. Spread "answerIdx" evenly across 0, 1, 2 and 3 (about 15 each). Do not put the answer at index 0 or 1 most of the time.
7. Difficulty mix per layer: about one third easy, half medium, the rest hard.
8. Cover every topic of the layer, roughly evenly. Never repeat or rephrase a question within the layer.
9. Each question must stand alone: no "see the diagram", no references to earlier questions. Short code snippets inside the stem are fine (use plain text, \n for line breaks, no markdown fences inside the JSON strings).
10. Stay accurate for current stable versions of the technologies. Avoid questions whose answer changed recently or is opinion.
11. Escape quotes properly so the JSON parses. No trailing commas, no comments.

## CHECK BEFORE YOU SEND EACH REPLY
Silently verify all of these, and fix the reply until every one holds. Do not print the check.
- The first line is LAYER: <the right layer id>.
- The array has exactly 60 questions.
- Count the questions whose correct choice is the longest of its four: at most 15. If more, lengthen wrong choices or shorten the right one until it holds.
- Each answerIdx value (0, 1, 2, 3) appears about 15 times.

## LAYERS
### Layer 1 of 11 — id: ai-developer-1
Title: Python & APIs for AI
Technologies: Python, REST, JSON
Description: AI developers glue models to applications. Get comfortable with Python and consuming HTTP APIs.
Topics:
- Python essentials for AI
- Async Python & httpx
- Working with JSON
- Environment & secrets management
- Rate limits & retries
- Tokens & basic cost awareness

### Layer 2 of 11 — id: ai-developer-2
Title: Working with LLM APIs
Technologies: LLM APIs, Chat, Streaming
Description: Learn the building blocks of LLM apps. Use chat completions, system prompts and streaming responses.
Topics:
- Chat completions & roles
- Reasoning models & thinking settings
- Temperature & sampling params
- Streaming responses
- Multimodal inputs
- Handling context windows

### Layer 3 of 11 — id: ai-developer-3
Title: Prompt Engineering for Developers
Technologies: Prompting, Few-shot, Structured Outputs
Description: Get reliable results from models. Apply prompting techniques that make outputs accurate and parseable.
Topics:
- Zero-shot & few-shot prompting
- Reasoning models vs chain-of-thought prompting
- Structured outputs with JSON Schema
- Function/tool calling
- Prompt templates
- Reducing hallucination

### Layer 4 of 11 — id: ai-developer-4
Title: LangChain Fundamentals
Technologies: LangChain, LCEL, LangGraph
Description: Compose LLM applications with LangChain. Build chains, manage prompts and keep conversation state with LangGraph.
Topics:
- LangChain core concepts
- Models, prompts & output parsers
- Chains & the LCEL
- Conversation state with LangGraph
- Document loaders
- Callbacks & tracing

### Layer 5 of 11 — id: ai-developer-6
Title: Embeddings & Vector Stores
Technologies: Embeddings, Vector DBs, Search
Description: Power semantic search and retrieval. Generate embeddings and store them in a vector database.
Topics:
- How embeddings work
- Vector databases (Pinecone, Chroma, pgvector)
- Similarity metrics
- Indexing & metadata filtering
- Hybrid search
- Scaling & cost considerations

### Layer 6 of 11 — id: ai-developer-5
Title: Retrieval-Augmented Generation
Technologies: RAG, Embeddings, Chunking
Description: Ground LLMs in your own data. Build a RAG pipeline that retrieves relevant context before answering.
Topics:
- Why RAG — grounding & freshness
- Document chunking strategies
- Embeddings & similarity search
- Building the retrieval step
- Context injection & prompting
- Citations & source tracking

### Layer 7 of 11 — id: ai-developer-7
Title: Building AI Agents & Tools
Technologies: Agents, Tools, Function Calling
Description: Let models take actions. Build agents that use tools, call functions and follow multi-step plans.
Topics:
- Tool/function calling
- The ReAct pattern
- Agent loops & planning
- Connecting external APIs & databases
- Multi-tool orchestration
- Guarding against loops & misuse

### Layer 8 of 11 — id: ai-developer-8
Title: Serving AI with FastAPI
Technologies: FastAPI, Streaming, WebSockets
Description: Expose your AI features as a production API. Build endpoints with FastAPI, including streaming.
Topics:
- FastAPI fundamentals
- Request validation with Pydantic
- Streaming responses (SSE)
- WebSockets for chat
- Background tasks & queues
- Auth & rate limiting

### Layer 9 of 11 — id: ai-developer-9
Title: Evaluation, Guardrails & Cost
Technologies: Evals, Guardrails, Caching
Description: Make AI apps reliable and affordable. Evaluate quality, add safety guardrails, and control cost.
Topics:
- Evaluating LLM outputs
- LLM-as-judge & test sets
- Guardrails & content moderation
- Prompt injection defense
- Caching & token optimization
- Monitoring quality over time

### Layer 10 of 11 — id: ai-developer-10
Title: Deployment & Observability
Technologies: Docker, Tracing, CI/CD
Description: Ship and operate AI applications. Containerize, trace requests, and deploy with confidence.
Topics:
- Dockerizing AI services
- Tracing with LangSmith / OpenTelemetry
- Logging prompts & responses
- Cost & latency monitoring
- Deploying to the cloud
- CI/CD & environment management

### Layer 11 of 11 — id: ai-developer-11
Title: Shipping a Paid AI Product
Technologies: Stripe, Usage Limits, Analytics
Description: You will take an AI feature from side project to a small product people pay for. You will price it so each user is profitable, protect it from abuse and launch it to your first users.
Topics:
- Scoping a niche AI product
- Usage vs subscription pricing and LLM unit economics
- Auth and billing with Stripe
- Usage limits and abuse protection
- Launching and getting first users
- Retention, quality and legal basics

Start now with Layer 1.
