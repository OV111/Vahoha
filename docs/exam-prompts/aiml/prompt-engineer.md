You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Prompt Engineer" (prompt-engineer, category aiml). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: prompt-engineer-1
Title: LLM & Prompting Foundations
Technologies: LLMs, Tokens, Prompts
Description: Effective prompting starts with understanding how models work. Build the mental model behind every good prompt.
Topics:
- How LLMs generate text
- Tokens & context windows
- Temperature & sampling
- Model capabilities & limits
- The anatomy of a prompt
- Hallucination & why it happens

### Layer 2 of 10 — id: prompt-engineer-2
Title: Core Prompting Techniques
Technologies: Zero-shot, Few-shot, Roles
Description: Learn the techniques that reliably improve outputs. These are the bread and butter of prompt engineering.
Topics:
- Clear instructions & specificity
- Zero-shot vs few-shot
- Role & persona prompting
- Delimiters & formatting
- Providing context & constraints
- Iterative refinement

### Layer 3 of 10 — id: prompt-engineer-3
Title: Advanced Prompting
Technologies: Chain-of-Thought, ReAct, Self-Consistency
Description: Unlock reasoning. Apply advanced techniques that help models tackle complex, multi-step problems.
Topics:
- Chain-of-thought prompting
- Self-consistency
- ReAct (reason + act)
- Tree-of-thought
- Decomposition & planning
- Reflection & self-critique

### Layer 4 of 10 — id: prompt-engineer-4
Title: Structured Outputs & Function Calling
Technologies: JSON, Schemas, Function Calling
Description: Make outputs machine-readable. Get reliable JSON and tool calls that integrate into real apps.
Topics:
- Requesting structured output
- JSON mode & schemas
- Function/tool calling
- Validating & repairing output
- Constrained decoding
- Handling failures

### Layer 5 of 10 — id: prompt-engineer-5
Title: RAG for Grounded Answers
Technologies: RAG, Retrieval, Citations
Description: Ground responses in real data. Learn how retrieval changes prompting and how to prompt over context.
Topics:
- Why grounding matters
- Prompting with retrieved context
- Context formatting & ordering
- Citations & attribution
- Handling missing answers
- Reducing context-induced errors

### Layer 6 of 10 — id: prompt-engineer-6
Title: Prompt Chaining & Workflows
Technologies: LangChain, Chaining, Pipelines
Description: Compose prompts into pipelines. Break complex tasks into chained steps with LangChain.
Topics:
- Decomposing tasks into steps
- Prompt chaining patterns
- LangChain LCEL
- Routing & conditional flows
- Combining tools & prompts
- Managing intermediate state

### Layer 7 of 10 — id: prompt-engineer-7
Title: Evaluation & Testing Prompts
Technologies: Evals, Testing, Metrics
Description: Prompts need testing like code. Build evaluation sets and measure whether changes actually help.
Topics:
- Building evaluation datasets
- Manual vs automated evaluation
- LLM-as-judge
- Regression testing prompts
- Metrics for quality
- A/B testing prompts

### Layer 8 of 10 — id: prompt-engineer-8
Title: Guardrails & Safety
Technologies: Safety, Injection, Moderation
Description: Make prompt systems safe. Defend against prompt injection and keep outputs within bounds.
Topics:
- Prompt injection & jailbreaks
- Input/output guardrails
- Content moderation
- System prompt hardening
- PII & data leakage
- Refusals & safe completions

### Layer 9 of 10 — id: prompt-engineer-9
Title: Optimization & Cost Control
Technologies: Cost, Caching, Compression
Description: Great prompts are also efficient. Reduce tokens, latency and cost without losing quality.
Topics:
- Token counting & budgeting
- Prompt compression
- Caching responses
- Choosing the right model per task
- Batching & streaming
- Quality vs cost trade-offs

### Layer 10 of 10 — id: prompt-engineer-10
Title: Productionizing Prompt Systems
Technologies: Versioning, Monitoring, Deployment
Description: Operate prompts at scale. Version, deploy and monitor prompt systems like real software.
Topics:
- Prompt versioning & management
- Prompt templates in code
- Monitoring quality in production
- Logging & feedback loops
- Rolling out prompt changes safely
- Collaboration & documentation

Start now with Layer 1.
