You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Node.js Developer" (node-dev, category backend). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: node-dev-1
Title: JavaScript & TypeScript Foundations
Technologies: JavaScript, TypeScript, ES2022+
Description: A Node developer lives in JavaScript and, increasingly, TypeScript. Solidify the language features the backend relies on every day.
Topics:
- ES modules, closures & scope
- Promises, async/await & the event loop
- Array & object methods
- TypeScript types, interfaces & generics
- Type narrowing & utility types
- tsconfig & compiling for Node

### Layer 2 of 10 — id: node-dev-2
Title: Node.js Runtime Internals
Technologies: Node.js, libuv, Modules
Description: Understand what makes Node tick — the event loop, the module system, and the core APIs you build everything on.
Topics:
- The event loop & libuv
- CommonJS vs ES modules in Node
- Core modules — fs, path, os, events
- Buffers & the global process object
- Environment variables & config
- npm, package.json & scripts

### Layer 3 of 10 — id: node-dev-3
Title: Async Patterns & Streams
Technologies: Streams, EventEmitter, Async
Description: Master Node's asynchronous nature. Work with streams for efficient I/O and avoid the common async pitfalls.
Topics:
- Callbacks, promises & async/await interplay
- Readable, writable & transform streams
- Piping & backpressure
- EventEmitter patterns
- Error handling in async code
- Worker threads & the cluster module

### Layer 4 of 10 — id: node-dev-4
Title: Building APIs with Fastify
Technologies: Fastify, REST, Plugins
Description: Build fast, well-structured HTTP APIs with Fastify — a high-performance, schema-first Node framework.
Topics:
- Fastify routing & lifecycle hooks
- Schema-based validation & serialization
- Plugins & encapsulation
- Decorators & dependency injection
- RESTful API design
- Structuring a scalable project

### Layer 5 of 10 — id: node-dev-5
Title: Data with Prisma & PostgreSQL
Technologies: Prisma, PostgreSQL, Migrations
Description: Persist data with a typed ORM. Model relations, run migrations, and query safely with Prisma against PostgreSQL.
Topics:
- Prisma schema & client
- Modeling relations
- Migrations & seeding
- Transactions & nested writes
- Query optimization & indexes
- Connection pooling

### Layer 6 of 10 — id: node-dev-6
Title: Authentication & Security
Technologies: JWT, OAuth, Helmet
Description: Secure your Node API. Implement authentication, protect routes, and apply standard hardening practices.
Topics:
- Password hashing & sessions
- JWT & refresh tokens
- OAuth2 & social login
- RBAC & route protection
- CORS, helmet & rate limiting
- OWASP Top 10 for Node

### Layer 7 of 10 — id: node-dev-7
Title: Validation, Errors & Architecture
Technologies: Zod, Error Handling, Layers
Description: Make your codebase robust and maintainable. Validate inputs, handle errors consistently, and structure layers cleanly.
Topics:
- Input validation with Zod
- Centralized error handling
- Layered architecture — routes, services, repos
- Dependency injection patterns
- Configuration & environment management
- Logging strategy

### Layer 8 of 10 — id: node-dev-8
Title: Testing
Technologies: Vitest, Supertest, Mocks
Description: Test your Node services with confidence. Cover units, integration, and full API flows.
Topics:
- Unit testing with Vitest/Jest
- API testing with Supertest
- Mocking modules & dependencies
- Test databases & fixtures
- Coverage & CI integration
- Contract & integration tests

### Layer 9 of 10 — id: node-dev-9
Title: Performance, Caching & Queues
Technologies: Redis, BullMQ, Caching
Description: Scale your Node app. Cache hot data, offload heavy work to background jobs, and tune performance.
Topics:
- Caching strategies with Redis
- Background jobs with BullMQ
- Rate limiting & throttling
- Clustering & load balancing
- Profiling & memory leaks
- Connection & resource pooling

### Layer 10 of 10 — id: node-dev-10
Title: Observability & Deployment
Technologies: Docker, OpenTelemetry, CI/CD
Description: Ship and operate your Node service. Add logging, metrics and tracing, containerize, and automate deployment.
Topics:
- Structured logging with Pino
- Metrics & tracing with OpenTelemetry
- Health checks & graceful shutdown
- Dockerizing a Node app
- GitHub Actions CI/CD
- Deploying to a cloud platform

Start now with Layer 1.
