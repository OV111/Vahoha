You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "ASP.NET Core Dev" (aspnet-dev, category backend). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: aspnet-dev-1
Title: C# & .NET for Web Development
Technologies: C#, .NET, dotnet CLI
Description: Get fluent in the C# and .NET features ASP.NET Core is built on: types, async/await, LINQ and the dotnet toolchain.
Topics:
- Types, classes, records & structs
- Nullable reference types
- async/await & Tasks
- LINQ basics
- The dotnet CLI, SDK & NuGet
- Exceptions & error handling

### Layer 2 of 10 — id: aspnet-dev-2
Title: ASP.NET Core Fundamentals
Technologies: ASP.NET Core, Kestrel, DI
Description: Learn how an ASP.NET Core app starts and handles a request: the host, the middleware pipeline, dependency injection, configuration and logging.
Topics:
- The host & Program.cs
- The middleware pipeline
- Dependency injection & lifetimes
- Configuration & the options pattern
- Environments
- Logging

### Layer 3 of 10 — id: aspnet-dev-3
Title: Building Web APIs
Technologies: Minimal APIs, Controllers, OpenAPI
Description: Build REST APIs with minimal APIs and controllers: routing, model binding, validation, consistent errors and OpenAPI docs.
Topics:
- Minimal APIs vs controllers
- Routing & route groups
- Model binding
- Validation
- ProblemDetails & error handling
- OpenAPI documentation

### Layer 4 of 10 — id: aspnet-dev-4
Title: Data with Entity Framework Core
Technologies: EF Core, SQL Server, PostgreSQL
Description: Persist data with EF Core: DbContext, modelling entities and relationships, migrations and writing queries EF can translate to good SQL.
Topics:
- DbContext & its lifetime
- Modelling entities
- Relationships
- Migrations
- Querying with LINQ
- Saving data & change tracking

### Layer 5 of 10 — id: aspnet-dev-5
Title: Advanced EF Core & Data Performance
Technologies: EF Core, Dapper, SQL
Description: Keep data access correct and fast under load: transactions, concurrency, pagination, indexes, compiled queries and when to drop to raw SQL.
Topics:
- Transactions
- Optimistic concurrency
- Pagination
- Indexes & query plans
- Performance diagnostics
- Raw SQL & Dapper

### Layer 6 of 10 — id: aspnet-dev-6
Title: Authentication & Authorization
Technologies: Identity, JWT, OAuth 2.0
Description: Secure ASP.NET Core APIs: who the caller is, what they may do, and the protections every public API needs.
Topics:
- Authentication schemes
- ASP.NET Core Identity
- JWT bearer tokens
- Policy-based authorization
- Resource-based authorization
- CORS, HTTPS & rate limiting

### Layer 7 of 10 — id: aspnet-dev-7
Title: Testing ASP.NET Core Apps
Technologies: xUnit, WebApplicationFactory, Testcontainers
Description: Test at the right level: unit tests for business rules, integration tests through the real pipeline and a real database in a container.
Topics:
- Unit testing with xUnit
- Test doubles
- Integration tests with WebApplicationFactory
- Replacing services in tests
- Real databases with Testcontainers
- Testing authenticated endpoints

### Layer 8 of 10 — id: aspnet-dev-8
Title: Background Work, Caching & Resilience
Technologies: BackgroundService, HybridCache, Polly
Description: Handle work outside the request, cache what is expensive and survive slow or failing dependencies.
Topics:
- Hosted services
- Queues & background jobs
- In-memory & distributed caching
- Output caching
- HttpClientFactory
- Retries, timeouts & circuit breakers

### Layer 9 of 10 — id: aspnet-dev-9
Title: Real-Time & Distributed .NET
Technologies: SignalR, gRPC, MassTransit
Description: Connect services and clients: real-time updates with SignalR, fast service-to-service calls with gRPC and reliable messaging between services.
Topics:
- SignalR hubs
- Scaling SignalR
- gRPC services
- Messaging with a broker
- Outbox & idempotent consumers
- .NET Aspire for local orchestration

### Layer 10 of 10 — id: aspnet-dev-10
Title: Observability, Containers & Deployment
Technologies: OpenTelemetry, Docker, Azure
Description: Run ASP.NET Core in production: health checks, logs, metrics and traces, container images and safe deploys.
Topics:
- Health checks
- OpenTelemetry logs, metrics & traces
- Container images for .NET
- Publishing & trimming
- CI/CD pipelines
- Graceful shutdown & zero-downtime deploys

Start now with Layer 1.
