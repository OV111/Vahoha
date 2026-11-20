You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "LLM Engineer" (llm-engineer, category aiml). It has 12 layers, listed at the bottom.

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
### Layer 1 of 12 — id: llm-engineer-1
Title: LLM Foundations
Technologies: LLMs, Tokens, Transformers
Description: Understand what large language models are and how they work at a practical level before building with them.
Topics:
- How LLMs are trained & predict tokens
- Tokenization & context windows
- Capabilities & limitations
- Open vs closed models
- Temperature & sampling
- Hallucination & grounding

### Layer 2 of 12 — id: llm-engineer-2
Title: Prompting & Context
Technologies: Prompting, Few-shot, System Prompts
Description: Prompting is the primary interface to LLMs. Learn to steer models reliably with context and examples.
Topics:
- System, user & assistant roles
- Few-shot & in-context learning
- Chain-of-thought prompting
- Structured outputs
- Context window management
- Prompt templates & variables

### Layer 3 of 12 — id: llm-engineer-3
Title: Embeddings & Vector Databases
Technologies: Embeddings, Vector DBs, Search
Description: Retrieval is what makes LLMs useful on private data. Learn embeddings and vector search.
Topics:
- Embedding models
- Vector databases (Chroma, pgvector, Pinecone)
- Chunking strategies
- Similarity & hybrid search
- Metadata filtering
- Indexing at scale

### Layer 4 of 12 — id: llm-engineer-4
Title: RAG Architecture
Technologies: RAG, Retrieval, Grounding
Description: Build retrieval-augmented generation systems that answer from your data with citations.
Topics:
- RAG pipeline architecture
- Retrieval strategies & re-ranking
- Context assembly & prompting
- Citations & source attribution
- Handling long & multi-doc context
- Evaluating retrieval quality

### Layer 5 of 12 — id: llm-engineer-5
Title: LangChain & LlamaIndex
Technologies: LangChain, LlamaIndex, Orchestration
Description: Use the leading frameworks to compose LLM applications without reinventing the plumbing.
Topics:
- LangChain core & LCEL
- LlamaIndex data framework
- Loaders, indices & query engines
- Memory & state
- When to use which framework
- Tracing & debugging

### Layer 6 of 12 — id: llm-engineer-6
Title: Agents & Tool Use
Technologies: Agents, Tools, LangGraph
Description: Give LLMs the ability to act. Build agents that plan, call tools and complete multi-step tasks.
Topics:
- Tool/function calling
- ReAct & planning loops
- LangGraph state machines
- Multi-agent systems
- Memory & long-running tasks
- Safety & loop control

### Layer 7 of 12 — id: llm-engineer-7
Title: Fine-Tuning & PEFT
Technologies: Fine-tuning, LoRA, QLoRA
Description: When prompting isn't enough, fine-tune. Learn efficient adaptation of open models to your needs.
Topics:
- When to fine-tune vs RAG
- Instruction & preference data
- LoRA & QLoRA
- Training with PEFT & TRL
- Quantization basics
- Evaluating fine-tuned models

### Layer 8 of 12 — id: llm-engineer-8
Title: Evaluation & Observability
Technologies: Evals, Tracing, RAGAS
Description: You can't improve what you can't measure. Build evaluation and observability for LLM systems.
Topics:
- Evaluation strategies & test sets
- LLM-as-judge
- RAG evaluation (RAGAS)
- Tracing & logging
- Regression testing prompts
- Human feedback loops

### Layer 9 of 12 — id: llm-engineer-9
Title: Optimization, Caching & Cost
Technologies: Caching, Quantization, Latency
Description: Make LLM apps fast and affordable. Optimize latency, cache aggressively and control token spend.
Topics:
- Prompt & response caching
- Semantic caching
- Streaming & latency optimization
- Model routing & fallbacks
- Quantization & inference servers
- Token & cost budgeting

### Layer 10 of 12 — id: llm-engineer-10
Title: Production Deployment & Safety
Technologies: Deployment, Guardrails, Monitoring
Description: Ship LLM systems responsibly. Deploy, guard against misuse, and monitor in production.
Topics:
- Serving open models (vLLM, TGI)
- Guardrails & moderation
- Prompt injection defense
- Monitoring quality & cost
- Versioning prompts & models
- Scaling & reliability

### Layer 11 of 12 — id: llm-engineer-11
Title: How LLMs Are Built: Pretraining to Reasoning Models
Technologies: Transformers, RLHF, Reasoning Models
Description: You will follow a model from raw text to a chat assistant: attention, pretraining, scaling and post-training with SFT, RLHF and DPO. You will also learn how reasoning models spend extra compute at answer time, why models hallucinate and what limits context length.
Topics:
- Self-attention, multi-head attention and the decoder block
- Pretraining objective, compute and scaling laws
- Post-training: SFT, RLHF, RLAIF and DPO
- Reasoning models and test-time compute
- Why models hallucinate
- Context length, KV cache and multimodal inputs

### Layer 12 of 12 — id: llm-engineer-12
Title: Datasets for LLMs
Technologies: HF Datasets, Synthetic Data, Dataset Cards
Description: You will build the data that trains and tests LLMs, from sourcing and licensing to cleaning, labeling and synthetic generation. You will also format instruction and preference data, guard evals against contamination and version and document every dataset you ship.
Topics:
- Collecting data and checking licenses
- Cleaning, deduplication and PII removal
- Human labeling and synthetic data generation
- Instruction and preference dataset formats
- Eval datasets and contamination
- Versioning, datasheets and dataset cards

Start now with Layer 1.
