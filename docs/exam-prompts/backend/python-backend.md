You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Python Backend Dev" (python-backend, category backend). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: py-1
Title: Python Fundamentals
Technologies: Python, pip, venv, Data Types
Description: Python is the most readable language in backend development. Master its syntax, type system, built-in data structures, and the packaging ecosystem before diving into frameworks.
Topics:
- Variables, types, strings, numbers, booleans
- Lists, tuples, sets, dicts — operations and comprehensions
- Control flow — if/else, for/while, break/continue
- Functions — args, kwargs, default values, return
- Modules & packages — import, __init__, pip, venv
- File I/O — open, read, write, with statement

### Layer 2 of 10 — id: py-2
Title: Python Advanced
Technologies: OOP, Decorators, Generators, Type Hints
Description: Go deeper into Python's powerful features. Writing idiomatic Python — with clean OOP, decorators, generators, and type hints — is what separates junior from senior Python developers.
Topics:
- OOP — classes, inheritance, dunder methods, dataclasses
- Decorators — function decorators, wraps, parameterized decorators
- Generators & iterators — yield, send, StopIteration
- Context managers — __enter__/__exit__, contextlib
- Type hints — annotations, Optional, Union, TypedDict, mypy
- Error handling — custom exceptions, exception chaining

### Layer 3 of 10 — id: py-3
Title: FastAPI & API Design
Technologies: FastAPI, Pydantic, Uvicorn, OpenAPI
Description: FastAPI is the modern Python web framework — it's fast, typed, async-first, and auto-generates OpenAPI documentation. Learn to build clean, validated REST APIs.
Topics:
- FastAPI project structure — routers, dependencies, lifespan
- Pydantic models — BaseModel, validators, field types
- Path parameters, query params, request body
- Dependency injection — Depends(), shared resources
- HTTPException & custom exception handlers
- Automatic OpenAPI & Swagger UI

### Layer 4 of 10 — id: py-4
Title: Databases & SQLAlchemy
Technologies: PostgreSQL, SQLAlchemy, Alembic, psycopg2
Description: Persist your data reliably. Learn PostgreSQL, the most powerful open-source relational database, and SQLAlchemy's async ORM to model your data with migrations.
Topics:
- PostgreSQL basics — schemas, tables, constraints, indexes
- SQLAlchemy Core vs ORM — declarative models
- Async SQLAlchemy with asyncpg
- Alembic migrations — creating, applying, rolling back
- Relationships — one-to-many, many-to-many, eager/lazy loading
- Query optimization — EXPLAIN ANALYZE, N+1 avoidance

### Layer 5 of 10 — id: py-5
Title: Authentication & Security
Technologies: JWT, passlib, python-jose, OAuth2
Description: Secure your FastAPI backend. Implement OAuth2 password flow, hash passwords with bcrypt, issue JWTs, and protect routes with dependency-based authentication.
Topics:
- Password hashing — passlib with bcrypt
- JWT creation & verification — python-jose
- FastAPI OAuth2PasswordBearer dependency
- Role-based access control (RBAC)
- CORS middleware configuration
- Rate limiting with slowapi

### Layer 6 of 10 — id: py-6
Title: Async Python & Celery
Technologies: asyncio, Celery, Redis, Background Tasks
Description: Python's async capabilities are powerful for I/O-heavy backends. Learn asyncio deeply, then use Celery and Redis to offload background processing.
Topics:
- asyncio — event loop, coroutines, async/await, gather
- async context managers & iterators
- FastAPI background tasks vs Celery
- Celery setup — broker (Redis), worker, beat
- Celery tasks — delay, apply_async, retry, ETA
- Task monitoring with Flower

### Layer 7 of 10 — id: py-7
Title: Testing with pytest
Technologies: pytest, pytest-asyncio, httpx, Coverage
Description: pytest is the gold standard for Python testing. Write clean, readable tests for your FastAPI endpoints, database operations, and background tasks.
Topics:
- pytest basics — fixtures, parametrize, markers
- Testing FastAPI with TestClient (httpx)
- Async test support with pytest-asyncio
- Test database — SQLite in-memory or test PostgreSQL
- Mocking with unittest.mock & pytest-mock
- Coverage reporting with pytest-cov

### Layer 8 of 10 — id: py-8
Title: Docker & Deployment
Technologies: Docker, Gunicorn, Fly.io, GitHub Actions
Description: Ship your Python backend to production. Containerize with Docker, configure Gunicorn/Uvicorn for production serving, and automate deployment with CI/CD.
Topics:
- Dockerfile for Python — slim base image, multi-stage build
- docker-compose — app + postgres + redis + worker
- Gunicorn + Uvicorn workers configuration
- Environment management in production
- Fly.io / Railway / Render — Python deployment
- GitHub Actions — run pytest, build Docker image, deploy

### Layer 9 of 10 — id: python-backend-9
Title: Microservices and Advanced Architecture
Technologies: Python, gRPC, RabbitMQ, FastAPI
Description: Design and implement production-grade microservice systems using Python with event-driven communication and CQRS patterns. Learn how gRPC enables efficient inter-service contracts and how to decompose monoliths into bounded contexts.
Topics:
- Microservice decomposition and bounded contexts
- Event-driven architecture with message brokers
- gRPC service definitions and protobuf schemas
- CQRS and event sourcing patterns
- Service mesh basics and sidecar proxies
- Saga pattern for distributed transactions
- API gateway patterns and BFF design

### Layer 10 of 10 — id: python-backend-10
Title: Scaling, Observability and Production Operations
Technologies: OpenTelemetry, Prometheus, Grafana, Nginx
Description: Operate Python services at scale by implementing distributed tracing, structured logging, and SLO-driven alerting pipelines. Understand load balancing strategies, incident management, and on-call processes that keep production healthy.
Topics:
- Distributed tracing with OpenTelemetry and Jaeger
- Structured logging and log aggregation pipelines
- Prometheus metrics instrumentation and alerting rules
- Defining and measuring SLOs and error budgets
- Horizontal scaling and load balancer configuration
- Chaos engineering and failure injection basics
- On-call runbooks and incident post-mortems

Start now with Layer 1.
