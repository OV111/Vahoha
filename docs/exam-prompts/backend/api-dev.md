You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "API Developer" (api-dev, category backend). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: api-dev-1
Title: Internet & How the Web Works
Technologies: HTTP, DNS, TCP/IP, REST
Description: Before writing a single line of backend code, understand the infrastructure you're building on. Learn how data travels across the internet, what happens when you hit an API endpoint, and the protocols that power the web.
Topics:
- How the internet works — packets, routers, ISPs
- DNS — domain resolution, A records, TTL
- HTTP/HTTPS — methods, status codes, headers
- TCP vs UDP — connections, handshakes, reliability
- REST architecture — resources, statelessness, uniform interface
- Browsers vs API clients — curl, Postman, Insomnia

### Layer 2 of 10 — id: api-dev-2
Title: OS, Terminal & Linux Basics
Technologies: Linux, Bash, SSH, Process Management
Description: APIs run on servers. You need to be comfortable with the command line, file system navigation, process management, and basic Linux administration to work effectively on any backend.
Topics:
- File system navigation — ls, cd, mkdir, rm, chmod
- Text processing — grep, awk, sed, cat, pipe
- Process management — ps, kill, top, background jobs
- SSH — key generation, remote login, scp
- Shell scripting basics — variables, loops, conditionals
- Environment variables & .env patterns

### Layer 3 of 10 — id: api-dev-3
Title: Node.js Fundamentals
Technologies: Node.js, npm, ESM, Events
Description: Node.js is the runtime your API will live in. Learn how it works under the hood — the event loop, async I/O, module systems — and build confidence writing server-side JavaScript.
Topics:
- Node.js architecture — event loop, libuv, non-blocking I/O
- ESM vs CommonJS — import/require, module resolution
- npm — packages, package.json, semantic versioning
- Built-in modules — fs, path, http, events, stream
- Error handling patterns — try/catch, Promise rejection
- Debugging Node.js — inspector, VS Code debugger

### Layer 4 of 10 — id: api-dev-4
Title: Express & REST API Design
Technologies: Express.js, Router, Middleware, Validation
Description: Build well-structured, maintainable REST APIs with Express. Learn routing patterns, middleware chains, request validation, and how to structure a production-grade API codebase.
Topics:
- Express routing — router.get/post/put/delete, params, query strings
- Middleware — logging (morgan), body parsing, error handling
- Controller pattern — separating route logic from business logic
- Input validation with Zod or Joi
- REST conventions — resource naming, status codes, HATEOAS basics
- API versioning strategies

### Layer 5 of 10 — id: api-dev-5
Title: Databases — SQL & NoSQL
Technologies: PostgreSQL, MongoDB, SQL, Indexing
Description: Choose the right database for the job. Understand relational vs document models, write efficient queries, design schemas, and connect databases to your Node.js API.
Topics:
- Relational model — tables, primary/foreign keys, normalization
- SQL — SELECT, JOIN, GROUP BY, transactions, EXPLAIN
- PostgreSQL with node-postgres (pg) driver
- MongoDB — collections, BSON, aggregation pipeline
- MongoDB with the native driver or Mongoose
- Indexing strategies — B-tree, compound, partial indexes
- Database design patterns — 1-N, N-M, embedding vs referencing

### Layer 6 of 10 — id: api-dev-6
Title: Authentication & Security
Technologies: JWT, bcrypt, OAuth 2.0, HTTPS
Description: Secure your API against real-world threats. Implement auth flows, hash passwords properly, understand OAuth, and apply OWASP principles to harden your endpoints.
Topics:
- Password hashing — bcrypt, argon2, why salts matter
- JWT — structure, signing algorithms (HS256 / RS256), expiry
- Refresh token pattern & token rotation
- OAuth 2.0 flows — authorization code, client credentials
- OWASP API Top 10 — injection, broken auth, rate limiting
- CORS, HTTPS, helmet.js, input sanitization

### Layer 7 of 10 — id: api-dev-7
Title: Caching & Performance
Technologies: Redis, HTTP Caching, Rate Limiting, Compression
Description: Make your API fast and resilient. Learn caching at the application and HTTP layers, use Redis for session storage and rate limiting, and optimize response times.
Topics:
- Redis data structures — strings, hashes, sorted sets, TTL
- Application-level caching with Redis
- HTTP cache headers — Cache-Control, ETag, Last-Modified
- Rate limiting strategies — fixed window, sliding window, token bucket
- Compression — gzip/brotli with compression middleware
- N+1 query problem & DataLoader pattern

### Layer 8 of 10 — id: api-dev-8
Title: Testing & API Documentation
Technologies: Jest, Supertest, OpenAPI, Swagger
Description: Ensure your API works correctly and is understandable to consumers. Write integration tests, automate test runs, and generate interactive documentation with OpenAPI/Swagger.
Topics:
- Unit testing with Jest — describe, it, expect
- Integration testing with Supertest — test real HTTP endpoints
- Test database setup — in-memory SQLite or test MongoDB
- Mocking external services with Jest spies
- OpenAPI 3.0 specification — paths, schemas, components
- Swagger UI integration with swagger-jsdoc

### Layer 9 of 10 — id: api-dev-9
Title: Message Queues & Background Jobs
Technologies: BullMQ, Redis, Workers, Webhooks
Description: Not every operation needs to be synchronous. Learn how to offload heavy tasks to background workers, use message queues, and implement webhooks for event-driven integrations.
Topics:
- Why queues — decoupling, retries, backpressure
- BullMQ — queues, workers, jobs, events
- Delayed jobs & scheduled tasks (cron-like)
- Dead-letter queues & error handling
- Webhooks — sending & receiving with signature verification
- Event-driven architecture basics

### Layer 10 of 10 — id: api-dev-10
Title: Deployment & Production Readiness
Technologies: Docker, Railway, GitHub Actions, Monitoring
Description: Ship your API to production with confidence. Containerize with Docker, automate deployments with CI/CD, and set up logging and monitoring so you can observe your running service.
Topics:
- Docker — Dockerfile, multi-stage builds, .dockerignore
- Docker Compose — local multi-service dev (app + db + redis)
- Railway / Render / Fly.io — zero-config cloud deployment
- GitHub Actions CI — lint, test, build on every push
- Structured logging with Pino or Winston
- Health check endpoints & graceful shutdown
- APM basics — error tracking with Sentry

Start now with Layer 1.
