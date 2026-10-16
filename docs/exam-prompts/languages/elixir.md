You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Elixir" (elixir, category languages). It has 11 layers, listed at the bottom.

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
### Layer 1 of 11 — id: elixir-1
Title: Elixir Syntax and Basics
Technologies: Elixir, iex, Atoms, Pattern Matching
Description: Learn Elixir syntax, immutable data types, and the interactive shell iex. Understand the role of atoms and the functional, dynamic nature of Elixir.
Topics:
- Basic types: integers, floats, atoms, strings, lists, tuples
- Variables and immutability
- iex interactive shell
- Anonymous functions
- Modules and named functions
- The pipe operator |>

### Layer 2 of 11 — id: elixir-2
Title: Pattern Matching and Control Flow
Technologies: Elixir, Pattern Matching, case, Guards
Description: Master Elixir pattern matching in function heads, case expressions, and with macros. Use guards to add conditional logic to pattern matches.
Topics:
- Match operator =
- Pattern matching in function heads
- case and cond
- Guards with when
- with macro for chaining
- Destructuring maps and tuples

### Layer 3 of 11 — id: elixir-3
Title: Recursion and the Enum Module
Technologies: Elixir, Recursion, Enum, Stream
Description: Write recursive algorithms idiomatically with tail-call optimization and use the Enum and Stream modules for declarative data processing.
Topics:
- Tail-call recursion
- Enum.map, filter, reduce, sort
- Stream for lazy evaluation
- Comprehensions with for
- Flat_map and group_by
- Enum vs Stream tradeoffs

### Layer 4 of 11 — id: elixir-4
Title: Mix and Project Structure
Technologies: Elixir, Mix, Hex, ExDoc
Description: Use Mix to create, build, and test Elixir projects. Manage dependencies from Hex and generate documentation with ExDoc.
Topics:
- mix new and project layout
- mix.exs and dependency management
- Hex packages
- mix compile, mix run, mix test
- ExDoc documentation
- mix release for deployments

### Layer 5 of 11 — id: elixir-5
Title: Processes and Message Passing
Technologies: Elixir, spawn, send/receive, Process
Description: Work directly with Elixir processes using spawn, send, and receive. Understand the actor model and how process isolation enables fault tolerance.
Topics:
- Spawning processes with spawn and spawn_link
- send and receive for messaging
- Process mailboxes
- Process.register and named processes
- Monitoring with Process.monitor
- Handling process death

### Layer 6 of 11 — id: elixir-6
Title: OTP - GenServer, Supervisor, and Agent
Technologies: Elixir, OTP, GenServer, Supervisor
Description: Build fault-tolerant systems using OTP behaviours: GenServer for stateful processes, Supervisor for error recovery, and Agent for simple shared state.
Topics:
- GenServer callbacks: init, handle_call, handle_cast
- Supervisor strategies: one_for_one, rest_for_one
- Dynamic supervisors
- Agent for simple state
- Application module
- Supervision trees

### Layer 7 of 11 — id: elixir-11
Title: Web Development with Phoenix, LiveView, and Ecto
Technologies: Elixir, Phoenix, Ecto
Description: Build a real web application with Elixir's main framework. You will use Phoenix for routing and contexts, Ecto for the database, and LiveView for interactive pages without writing JavaScript.
Topics:
- Phoenix request lifecycle: endpoint, router, plugs
- Contexts and organizing a Phoenix app
- Ecto schemas, migrations and queries
- Changesets and validation
- Phoenix LiveView and server-rendered interactivity
- PubSub, channels and real-time updates

### Layer 8 of 11 — id: elixir-7
Title: Metaprogramming and Macros
Technologies: Elixir, Macros, AST, quote/unquote
Description: Extend Elixir using macros that manipulate the AST at compile time. Use quote and unquote to generate code, and understand when not to use macros.
Topics:
- Elixir AST representation
- quote and unquote
- Writing a custom macro
- use and __using__ macro
- Compile-time vs runtime
- Macro hygiene

### Layer 9 of 11 — id: elixir-8
Title: Testing with ExUnit and Property Testing
Technologies: Elixir, ExUnit, StreamData, Mox
Description: Test Elixir applications with ExUnit, use Mox for behaviour-based mocking, and apply property-based testing with StreamData to find edge cases.
Topics:
- ExUnit assertions and setup
- async tests
- Mox for defining and verifying mocks
- StreamData for property-based tests
- Testing GenServers
- Test coverage with mix test --cover

### Layer 10 of 11 — id: elixir-9
Title: Distributed Elixir and ETS
Technologies: Elixir, Distributed, ETS, Mnesia
Description: Connect Elixir nodes into a distributed cluster and use ETS for high-performance in-memory storage. Understand the BEAM distribution model.
Topics:
- Node.connect and distributed messaging
- Global process registration
- ETS tables: types and access
- ETS read/write performance
- Mnesia for distributed storage
- pg for process groups

### Layer 11 of 11 — id: elixir-10
Title: Production Elixir - Phoenix, Releases, and Deployment
Technologies: Elixir, Phoenix, mix release, Docker
Description: Deploy a production Elixir application using Phoenix for HTTP, mix release for self-contained OTP releases, and Docker for containerized deployment.
Topics:
- Phoenix router, controllers, and views
- Phoenix LiveView basics
- mix release and runtime.exs
- Clustering with libcluster
- Telemetry and observability
- Docker and CI with GitHub Actions

Start now with Layer 1.
