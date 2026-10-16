You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Remix Developer" (remix-dev, category fullstack). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: remix-dev-1
Title: TypeScript and React Foundations
Technologies: TypeScript, React, JavaScript
Description: This layer grounds you in TypeScript and React, the core of Remix development. These skills underpin every route and component you build.
Topics:
- TypeScript types and interfaces
- React components and props
- State and hooks
- Typing props and events
- Composition patterns
- Modern JavaScript syntax

### Layer 2 of 10 — id: remix-dev-2
Title: Remix Basics and Routing
Technologies: Remix, React, Vite
Description: This layer introduces Remix structure, nested routing, and the web fundamentals it embraces. Routing is the backbone of every Remix application.
Topics:
- Project structure
- File-based nested routes
- Layouts and the Outlet
- Links and navigation
- Route parameters
- The web platform mindset

### Layer 3 of 10 — id: remix-dev-3
Title: Loaders and Data Loading
Technologies: Remix, TypeScript, Fetch
Description: This layer covers loading data on the server with loaders. Loaders are how Remix fetches data before rendering each route.
Topics:
- Loader functions
- useLoaderData
- Type-safe loader data
- URL params and search params
- Deferred data and streaming
- Error and not-found handling

### Layer 4 of 10 — id: remix-dev-4
Title: Actions, Forms, and Mutations
Technologies: Remix, TypeScript, Zod
Description: This layer covers handling form submissions and mutations with actions. Remix uses standard forms and actions for progressive, resilient data changes.
Topics:
- Action functions
- The Form component
- Validation with Zod
- useNavigation pending states
- Optimistic UI
- Revalidation after mutations

### Layer 5 of 10 — id: remix-dev-5
Title: Databases and Persistence
Technologies: Prisma, PostgreSQL, Remix
Description: This layer covers persisting data through a database and ORM in Remix. Real storage turns the contacts demo into a durable application.
Topics:
- Prisma schema and models
- Migrations
- Querying in loaders and actions
- Relations
- Environment variables
- Seeding data

### Layer 6 of 10 — id: remix-dev-6
Title: Authentication and Sessions
Technologies: Remix, Sessions, Cookies
Description: This layer adds login, sessions, and protected routes using Remix's session helpers. Authentication enables per-user data and secure access control.
Topics:
- Cookie-based sessions
- Login and signup flows
- Password hashing
- Protecting loaders and actions
- Reading the user in routes
- Logout and security

### Layer 7 of 10 — id: remix-dev-7
Title: Error Handling and Resilience
Technologies: Remix, React, TypeScript
Description: This layer covers error boundaries, status handling, and resilient UX. Graceful error handling is a core strength of the Remix model.
Topics:
- Error boundaries
- Catch and thrown responses
- Status codes and headers
- Not-found handling
- Nested error isolation
- Logging errors

### Layer 8 of 10 — id: remix-dev-8
Title: Advanced Data Patterns
Technologies: Remix, React, TypeScript
Description: This layer covers advanced fetching, caching, and optimistic patterns. These techniques make Remix apps feel fast and stay in sync.
Topics:
- useFetcher for background work
- Optimistic UI patterns
- HTTP caching headers
- Prefetching
- Resource routes
- Pagination and infinite lists

### Layer 9 of 10 — id: remix-dev-9
Title: Styling and Performance
Technologies: Tailwind, Remix, Lighthouse
Description: This layer covers building a responsive UI and optimizing performance. A clean, fast interface makes the application feel professional.
Topics:
- Tailwind integration
- Responsive and dark mode
- Reusable styled components
- Asset and link optimization
- Core Web Vitals
- SEO meta and links

### Layer 10 of 10 — id: remix-dev-10
Title: Testing and Deployment
Technologies: Vitest, Playwright, Fly.io
Description: This layer covers testing the app and deploying it to production. Tests and an adapter-based deploy make the project a real, reliable product.
Topics:
- Unit testing with Vitest
- End-to-end tests with Playwright
- Choosing a deployment target
- Environment variables in production
- Production database setup
- Monitoring and previews

Start now with Layer 1.
