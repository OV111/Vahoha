You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "GraphQL Developer" (graphql-dev, category backend). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: graphql-dev-1
Title: Backend & API Foundations
Technologies: Node.js, HTTP, REST
Description: Before GraphQL, you need a solid backend base. Understand HTTP, build a basic Node service, and know what REST does well so you can see what GraphQL improves.
Topics:
- HTTP methods, status codes & headers
- Node.js runtime & npm
- Building a basic REST endpoint
- JSON & request/response cycles
- Environment config & project structure
- Why GraphQL — over-fetching & under-fetching

### Layer 2 of 10 — id: graphql-dev-2
Title: GraphQL Fundamentals
Technologies: GraphQL, SDL, Queries
Description: Learn the GraphQL query language and type system from the client's perspective before building a server.
Topics:
- Queries, fields & arguments
- The type system & scalars
- Variables & aliases
- Fragments & directives
- Introspection & the GraphQL Playground
- Mutations vs queries

### Layer 3 of 10 — id: graphql-dev-3
Title: Schema Design with SDL
Technologies: SDL, Types, Interfaces
Description: A GraphQL API is only as good as its schema. Design expressive, evolvable schemas with the Schema Definition Language.
Topics:
- Object types, fields & nullability
- Enums, interfaces & unions
- Input types & arguments
- Pagination patterns — cursors & connections
- Schema-first vs code-first
- Versionless evolution & deprecation

### Layer 4 of 10 — id: graphql-dev-4
Title: Resolvers & Context
Technologies: Resolvers, Context, Node.js
Description: Resolvers are where a schema meets your data. Learn the resolver chain, context, and how arguments flow through.
Topics:
- Resolver signature — parent, args, context, info
- The resolver execution chain
- Building & sharing context
- Default resolvers & trivial fields
- Error handling in resolvers
- Resolving nested & related data

### Layer 5 of 10 — id: graphql-dev-5
Title: Apollo Server
Technologies: Apollo Server, Express, TypeScript
Description: Stand up a real GraphQL server with Apollo Server, wire it to Express, and add typed schema and resolvers.
Topics:
- Apollo Server setup & integrations
- Wiring schema + resolvers
- TypeScript types from schema (codegen)
- Plugins & request lifecycle
- Error formatting & logging
- Apollo Sandbox & schema registry

### Layer 6 of 10 — id: graphql-dev-6
Title: Data Layer with Prisma & DataLoader
Technologies: Prisma, DataLoader, PostgreSQL
Description: Back your API with a real database and solve the infamous N+1 problem with batching and caching.
Topics:
- Prisma schema, client & relations
- Connecting resolvers to the database
- The N+1 problem in GraphQL
- Batching & caching with DataLoader
- Migrations & seeding
- Transactions across resolvers

### Layer 7 of 10 — id: graphql-dev-7
Title: Mutations, Subscriptions & Real-time
Technologies: Mutations, Subscriptions, WebSockets
Description: Make your API write data and push live updates. Implement mutations and real-time subscriptions over WebSockets.
Topics:
- Designing mutations & input types
- Optimistic responses & error states
- Subscriptions over WebSockets (graphql-ws)
- PubSub & event-driven updates
- File uploads
- Idempotency & validation

### Layer 8 of 10 — id: graphql-dev-8
Title: Authentication & Authorization
Technologies: JWT, Auth, Directives
Description: Secure a GraphQL API where a single endpoint exposes everything. Authenticate users and authorize at the field level.
Topics:
- Authentication via context
- JWT & sessions
- Field- & type-level authorization
- Auth directives & shields
- Role-based access control
- Protecting mutations & sensitive fields

### Layer 9 of 10 — id: graphql-dev-9
Title: Performance, Caching & Security
Technologies: Caching, Query Cost, Security
Description: Production GraphQL needs guards. Add caching, limit expensive queries, and defend against malicious operations.
Topics:
- Response & field-level caching
- Persisted queries & APQ
- Query depth & complexity limiting
- Rate limiting & timeouts
- Disabling introspection in production
- Monitoring & tracing

### Layer 10 of 10 — id: graphql-dev-10
Title: Testing, Federation & Deployment
Technologies: Testing, Federation, Docker
Description: Ship and scale your GraphQL API. Test operations, split a monolith with federation, and deploy.
Topics:
- Integration testing GraphQL operations
- Mocking & schema testing
- Apollo Federation & subgraphs
- Schema checks in CI
- Dockerizing the server
- Deploying & observability

Start now with Layer 1.
