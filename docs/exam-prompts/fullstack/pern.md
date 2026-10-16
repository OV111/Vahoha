You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "PERN Developer" (pern, category fullstack). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: pern-1
Title: Web Fundamentals
Technologies: HTML, CSS, JavaScript
Description: Every PERN app ships HTML, CSS and JavaScript to the browser. Learn how pages are structured, styled and made interactive before touching any framework.
Topics:
- HTML5 semantic elements & forms
- CSS box model, flexbox & grid
- Responsive design & media queries
- JavaScript types, functions & scope
- DOM manipulation & events
- Browser DevTools & debugging

### Layer 2 of 10 — id: pern-2
Title: Modern JavaScript & TypeScript
Technologies: ES2022+, TypeScript, Async/Await
Description: Write the kind of JavaScript a PERN codebase actually uses, then add static types with TypeScript to catch bugs before runtime.
Topics:
- ES modules, destructuring & spread
- Promises, async/await & the event loop
- Array & object methods — map, filter, reduce
- TypeScript types, interfaces & generics
- Type narrowing & utility types
- tsconfig & compiling to JavaScript

### Layer 3 of 10 — id: pern-3
Title: React Fundamentals
Technologies: React, JSX, Hooks
Description: Build the 'R' in PERN. Think in components, manage local state, and render dynamic UIs with React and modern hooks.
Topics:
- JSX, props & component composition
- useState & useEffect
- Conditional rendering & lists
- Controlled forms & inputs
- Lifting state & data flow
- Fetching data from an API

### Layer 4 of 10 — id: pern-4
Title: React Advanced & State
Technologies: React Router, Zustand, React Query
Description: Scale your React app with routing, global state and server-state caching — the patterns real production frontends rely on.
Topics:
- React Router — nested routes & params
- Global state with Zustand
- Server state with TanStack Query
- Custom hooks & reusability
- Performance — memo, useMemo, useCallback
- Code splitting & lazy loading

### Layer 5 of 10 — id: pern-5
Title: Node.js & Express APIs
Technologies: Node.js, Express.js, REST
Description: Build the 'E' and 'N' in PERN. Create RESTful APIs with Express, structure controllers and middleware, and handle errors cleanly.
Topics:
- Node runtime & module system
- Express routing & controllers
- Middleware — logging, validation, errors
- RESTful API design & status codes
- Environment config with dotenv
- Structuring a scalable project

### Layer 6 of 10 — id: pern-6
Title: Relational Databases & SQL
Technologies: SQL, Relational Modeling, Normalization
Description: PERN is relational at its core. Learn to model data into tables and query it fluently with SQL before wiring it to Node.
Topics:
- Tables, rows, columns & data types
- SELECT, WHERE, ORDER BY, LIMIT
- JOINs — inner, left, right, full
- Aggregations & GROUP BY
- Normalization & relationships
- Primary keys, foreign keys & constraints

### Layer 7 of 10 — id: pern-7
Title: PostgreSQL in Depth
Technologies: PostgreSQL, psql, Indexing
Description: Go beyond basic SQL into the features that make PostgreSQL powerful — indexing, transactions, JSON and performance.
Topics:
- psql, roles & database administration
- Indexes — B-tree, partial, composite
- Transactions, ACID & isolation levels
- JSONB & array columns
- Views, CTEs & window functions
- EXPLAIN ANALYZE & query tuning

### Layer 8 of 10 — id: pern-8
Title: Data Access Layer
Technologies: Prisma, node-postgres, Migrations
Description: Connect Express to PostgreSQL through a typed data layer. Run migrations, model relations, and avoid SQL injection.
Topics:
- node-postgres (pg) & connection pooling
- Prisma schema, client & relations
- Migrations & seeding
- Parameterized queries & SQL injection
- Transactions across multiple writes
- Repository pattern & separation of concerns

### Layer 9 of 10 — id: pern-9
Title: Auth, Security & Validation
Technologies: JWT, bcrypt, Zod
Description: Secure the full stack. Implement registration and login, protect routes, validate input, and follow OWASP basics.
Topics:
- Password hashing with bcrypt
- JWT issuance, refresh & protected routes
- HTTP-only cookies vs localStorage
- Input validation with Zod
- CORS, helmet & rate limiting
- OWASP Top 10 awareness

### Layer 10 of 10 — id: pern-10
Title: Testing, CI/CD & Deployment
Technologies: Vitest, Docker, GitHub Actions
Description: Ship your PERN app with confidence. Test the stack, containerize it, automate CI, and deploy frontend, API and database.
Topics:
- Unit & integration tests with Vitest
- API testing with Supertest
- Dockerizing Node + PostgreSQL with Compose
- GitHub Actions CI pipeline
- Deploying React to Vercel & API to Railway/Render
- Managed Postgres & connection strings in prod

Start now with Layer 1.
