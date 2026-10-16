You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Go Developer" (go-dev, category backend). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: go-dev-1
Title: Go Fundamentals
Technologies: Go, Variables, Functions
Description: Start with Go's clean, minimal syntax. Learn the type system, control flow, and how Go's simplicity is its superpower.
Topics:
- Variables, constants & basic types
- Functions, multiple returns & defer
- Control flow — if, for, switch
- Arrays, slices & maps
- Pointers & value vs reference semantics
- Packages & the go command

### Layer 2 of 10 — id: go-dev-2
Title: Tooling & Project Structure
Technologies: Go Modules, gofmt, go test
Description: Learn the toolchain that makes Go productive — modules, formatting, linting and the standard project layout.
Topics:
- Go modules & dependency management
- Standard project layout
- gofmt, go vet & golangci-lint
- Error handling idioms & wrapping
- Reading the standard library
- Documentation with godoc

### Layer 3 of 10 — id: go-dev-3
Title: Structs, Interfaces & Generics
Technologies: Structs, Interfaces, Generics
Description: Model your domain the Go way. Compose behavior with interfaces and write reusable code with generics.
Topics:
- Structs, methods & embedding
- Interfaces & implicit satisfaction
- Composition over inheritance
- Generics — type parameters & constraints
- The empty interface & type assertions
- Designing small, focused interfaces

### Layer 4 of 10 — id: go-dev-4
Title: Concurrency — Goroutines & Channels
Technologies: Goroutines, Channels, sync
Description: Concurrency is Go's headline feature. Master goroutines, channels and the patterns for safe concurrent code.
Topics:
- Goroutines & the scheduler
- Channels — buffered & unbuffered
- select statements & timeouts
- sync.WaitGroup, Mutex & once
- context for cancellation & deadlines
- Common concurrency patterns & pitfalls

### Layer 5 of 10 — id: go-dev-5
Title: Building HTTP Services
Technologies: net/http, Gin, Chi
Description: Build web services with Go's standard library, then add a router like Gin or Chi for ergonomics.
Topics:
- net/http server & handlers
- Routing with Gin or Chi
- Request parsing & JSON encoding
- Middleware & handler composition
- Graceful shutdown
- Structuring a service codebase

### Layer 6 of 10 — id: go-dev-6
Title: Working with Databases
Technologies: database/sql, pgx, sqlc
Description: Persist data from Go. Use database/sql and pgx for PostgreSQL, and generate type-safe queries with sqlc.
Topics:
- database/sql & connection pooling
- pgx driver for PostgreSQL
- Type-safe queries with sqlc
- Migrations with golang-migrate
- Transactions & error handling
- Repository pattern in Go

### Layer 7 of 10 — id: go-dev-7
Title: API Design, Middleware & Auth
Technologies: REST, JWT, Validation
Description: Turn a working service into a robust API with consistent design, authentication and request validation.
Topics:
- RESTful design & versioning
- JWT authentication middleware
- Request validation
- Structured error responses
- Rate limiting & CORS
- Configuration & secrets management

### Layer 8 of 10 — id: go-dev-8
Title: Testing & Benchmarking
Technologies: go test, testify, Benchmarks
Description: Write tests the idiomatic Go way — table-driven tests, mocks, benchmarks and coverage.
Topics:
- Table-driven tests
- httptest for handler testing
- Mocks & interfaces for test seams
- Benchmarks & profiling
- Test coverage & race detector
- Integration tests with a real database

### Layer 9 of 10 — id: go-dev-9
Title: Observability & Performance
Technologies: pprof, slog, Prometheus
Description: Make your service observable and fast. Add structured logging, metrics and tracing, and profile hot paths.
Topics:
- Structured logging with slog
- Metrics with Prometheus
- Distributed tracing with OpenTelemetry
- Profiling with pprof
- Memory & allocation optimization
- Load testing your API

### Layer 10 of 10 — id: go-dev-10
Title: Containers, gRPC & Deployment
Technologies: Docker, gRPC, GitHub Actions
Description: Ship your Go service. Build tiny container images, expose a gRPC interface, and automate deployment.
Topics:
- Multi-stage Docker builds for tiny images
- gRPC & protocol buffers
- Service-to-service communication
- GitHub Actions CI/CD for Go
- Deploying to a container platform
- Health checks & zero-downtime deploys

Start now with Layer 1.
