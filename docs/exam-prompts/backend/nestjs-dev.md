You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "NestJS Developer" (nestjs-dev, category backend). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: nestjs-dev-1
Title: TypeScript & Node.js for Nest
Technologies: TypeScript, Node.js, npm
Description: Get fluent in the TypeScript and Node.js features NestJS is built on: classes, decorators, generics and the async event loop.
Topics:
- Types, interfaces & generics
- Classes, access modifiers & inheritance
- Decorators & metadata
- Promises, async/await & the event loop
- Modules, npm & tsconfig
- Error handling in async code

### Layer 2 of 10 — id: nestjs-dev-2
Title: Nest Core: Modules, Controllers & Providers
Technologies: NestJS, Nest CLI, REST
Description: Learn the three building blocks of every Nest app and how the framework turns them into a running HTTP API.
Topics:
- Nest CLI & project structure
- Controllers & routing
- Request data: params, query & body
- Providers & services
- Feature modules
- Exporting and importing providers

### Layer 3 of 10 — id: nestjs-dev-3
Title: Dependency Injection in Depth
Technologies: NestJS, IoC, Dynamic Modules
Description: Go beyond @Injectable: custom providers, injection scopes, dynamic modules and the lifecycle hooks that make Nest apps configurable and testable.
Topics:
- Inversion of control
- Custom providers: useClass, useValue, useFactory
- Injection tokens
- Injection scopes
- Dynamic & configurable modules
- Lifecycle hooks & circular dependencies

### Layer 4 of 10 — id: nestjs-dev-4
Title: The Request Pipeline
Technologies: NestJS, Pipes, Guards
Description: Control what happens to a request before and after your handler runs: middleware, guards, pipes, interceptors and exception filters.
Topics:
- The request lifecycle order
- Middleware
- Guards
- Pipes & validation
- Interceptors
- Exception filters & error responses

### Layer 5 of 10 — id: nestjs-dev-5
Title: Data with Prisma & TypeORM
Technologies: PostgreSQL, Prisma, TypeORM
Description: Connect Nest to PostgreSQL, model your data, run migrations and write queries that stay correct and fast under load.
Topics:
- Prisma schema & client in Nest
- TypeORM entities & repositories
- Migrations
- Relations & the N+1 problem
- Transactions
- Pagination & indexes

### Layer 6 of 10 — id: nestjs-dev-6
Title: Authentication & Authorization
Technologies: Passport, JWT, bcrypt
Description: Secure a Nest API: password storage, JWT access and refresh tokens, role-based guards and the security headers and limits every public API needs.
Topics:
- Password hashing
- JWT access & refresh tokens
- Passport strategies
- Role & permission guards
- Rate limiting
- Helmet, CORS & secure defaults

### Layer 7 of 10 — id: nestjs-dev-7
Title: Configuration, Docs & API Design
Technologies: ConfigModule, OpenAPI, Swagger
Description: Make the API production-shaped: validated configuration, generated OpenAPI docs, versioning and a clean architecture that holds up as features grow.
Topics:
- ConfigModule & env validation
- OpenAPI / Swagger generation
- API versioning
- Serialization & response shaping
- Layered architecture
- Events inside the app

### Layer 8 of 10 — id: nestjs-dev-8
Title: Testing NestJS Apps
Technologies: Jest, Supertest, Testcontainers
Description: Test Nest code at the right level: fast unit tests with mocked providers, integration tests against a real database and end-to-end HTTP tests.
Topics:
- Testing module & overrides
- Unit testing services
- Mocking providers
- E2E tests with Supertest
- Real databases in tests
- What to test and what not to

### Layer 9 of 10 — id: nestjs-dev-9
Title: Microservices, Queues & Real-Time
Technologies: BullMQ, Redis, WebSockets
Description: Move work out of the request: background jobs, scheduled tasks, message-based microservices and real-time updates over WebSockets.
Topics:
- Background jobs with BullMQ
- Scheduled tasks
- Nest microservices & transporters
- Message patterns & events
- WebSocket gateways
- Idempotency & retries

### Layer 10 of 10 — id: nestjs-dev-10
Title: Performance, Observability & Deployment
Technologies: Docker, OpenTelemetry, Redis
Description: Run Nest in production: caching, structured logs, health checks, tracing, containers and safe deploys.
Topics:
- Caching with Redis
- Structured logging
- Health checks with Terminus
- Tracing & metrics
- Docker builds for Nest
- Graceful shutdown & zero-downtime deploys

Start now with Layer 1.
