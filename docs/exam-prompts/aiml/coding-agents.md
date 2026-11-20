You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "AI Coding Agents Engineer" (coding-agents, category aiml). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: coding-agents-1
Title: How Coding Agents Work
Technologies: Agent Loop, Tool Calls, Tokens
Description: Look inside the loop that every coding agent runs: the model reads, calls a tool, sees the result and decides again. You will learn what the agent can touch, what each step costs and which settings change how carefully it thinks.
Topics:
- The agent loop: gather context, act, verify
- Built-in tools: read, search, edit and shell
- Permission modes and approval prompts
- Choosing a model for the task
- Tokens, context and cost per session
- Reasoning effort and extended thinking

### Layer 2 of 10 — id: coding-agents-2
Title: Project Context and Instruction Files
Technologies: AGENTS.md, CLAUDE.md, Rules Files
Description: Give the agent the project knowledge a new teammate would need on day one. You will write instruction files that make output consistent and learn what belongs in them and what only wastes context.
Topics:
- Why agents need written project context
- AGENTS.md and CLAUDE.md conventions
- Rules files and scoped instructions
- User, project and folder-level memory
- What to write: commands, conventions, traps
- What to leave out and how to keep files short

### Layer 3 of 10 — id: coding-agents-3
Title: Context Management
Technologies: Compaction, Subagents, Prompt Caching
Description: Keep the agent focused as tasks grow longer than its context window. You will learn how history is summarized, how to isolate side work, and how caching and budgets keep sessions fast and cheap.
Topics:
- Context window limits and context rot
- Compaction and summarization
- Clearing and starting fresh sessions
- Subagents to isolate exploration
- Scratchpads and notes outside the window
- Token budgets and prompt caching

### Layer 4 of 10 — id: coding-agents-4
Title: Tools and MCP in the Harness
Technologies: MCP, Allowlists, Tool Permissions
Description: Extend a coding agent with outside tools like issue trackers, databases and browsers. You will connect MCP servers, control which tools run without asking and judge whether a third-party server is safe to install.
Topics:
- What MCP adds to a coding agent
- Local stdio and remote HTTP servers
- Project and user scoped server config
- Tool permissions, allowlists and denylists
- Tool output size and context cost
- Trusting third-party servers

### Layer 5 of 10 — id: coding-agents-5
Title: Skills
Technologies: SKILL.md, Progressive Disclosure, Scripts
Description: Package repeatable know-how into skills the agent loads only when needed. You will write skills with clear triggers, bundled scripts and references, and test that they load at the right moment.
Topics:
- What a skill is and why it exists
- SKILL.md structure and frontmatter
- Progressive disclosure: name, body, files
- Writing descriptions that trigger correctly
- Bundling scripts and reference files
- Skills vs instruction files vs MCP

### Layer 6 of 10 — id: coding-agents-6
Title: Hooks and Settings
Technologies: Hooks, settings.json, Guardrails
Description: Make the harness enforce rules instead of hoping the model remembers them. You will configure settings at each level and write hooks that block risky actions and run lint and tests automatically.
Topics:
- Settings hierarchy: managed, user, project, local
- Hook events: before and after tool use
- Blocking dangerous commands and file paths
- Auto-formatting and linting after edits
- Running tests when the agent stops
- Hook security and debugging

### Layer 7 of 10 — id: coding-agents-7
Title: Subagents and Plugins
Technologies: Subagents, Plugins, Marketplaces
Description: Split work across focused agents and package your setup so others can install it. You will define subagents with their own tools and prompts, then bundle skills, agents, hooks and MCP servers into a plugin.
Topics:
- When to delegate to a subagent
- Defining subagents: prompt, tools, model
- Parallel work and merging results
- Plugin structure and manifest
- Bundling skills, agents, hooks and MCP
- Marketplaces, versioning and trust

### Layer 8 of 10 — id: coding-agents-8
Title: Reviewing AI-Written Code
Technologies: Code Review, Tests, Security Review
Description: Become the person who can tell when agent output is right, almost right or dangerously wrong. You will review diffs with a checklist, use tests as proof and catch the mistakes agents make most often.
Topics:
- Reading diffs instead of trusting summaries
- Tests as verification, not decoration
- Hallucinated APIs and invented packages
- Security review of generated code
- Scope creep and silent behavior changes
- When not to trust the output

### Layer 9 of 10 — id: coding-agents-9
Title: Agents in CI and Headless Mode
Technologies: Headless Mode, GitHub Actions, PR Bots
Description: Run coding agents without a person at the keyboard. You will script non-interactive runs, wire an agent into CI for reviews and fixes, and set the cost, permission and secret limits that keep it safe.
Topics:
- Non-interactive runs and structured output
- Agents in GitHub Actions
- PR review and issue triage bots
- Cloud coding agents that open pull requests
- Cost limits, timeouts and turn caps
- Secrets, permissions and untrusted input

### Layer 10 of 10 — id: coding-agents-10
Title: Building Your Own Harness
Technologies: Agent SDK, Evals, Sandboxing
Description: Put everything together by building a small coding agent of your own. You will write the tool loop, choose a context strategy, measure it with evals and run it inside a sandbox.
Topics:
- Agent SDKs and what they handle for you
- Writing the tool loop from scratch
- Designing tools the model can use well
- Context strategy for long tasks
- Evals: task suites, graders and regressions
- Sandboxing file system and network access

Start now with Layer 1.
