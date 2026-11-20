You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "MERN Developer" (mern, category fullstack). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: mern-1
Title: Web Fundamentals
Technologies: HTML, CSS, JavaScript
Description: The foundation of everything web. Learn how browsers render pages, how to structure content with HTML, style it with CSS, and add interactivity with JavaScript.
Topics:
- HTML5 semantic elements & accessibility
- CSS box model, flexbox, grid
- CSS responsive design & media queries
- JavaScript variables, types, functions
- DOM manipulation & events
- Browser DevTools basics

### Layer 2 of 10 — id: mern-2
Title: JavaScript Deep Dive
Technologies: ES6+, Async/Await, Fetch API
Description: Go beyond the basics. Master modern JavaScript features, asynchronous patterns, and how to communicate with external APIs.
Topics:
- ES6+ — destructuring, spread, arrow functions, modules
- Closures, scope & the prototype chain
- Promises & async/await
- Fetch API & error handling
- Array methods — map, filter, reduce
- Event loop & call stack

### Layer 3 of 10 — id: mern-3
Title: React Fundamentals
Technologies: React, JSX, Props, useState
Description: Learn how to think in components. Build dynamic UIs with React, understand the component lifecycle, and manage local state.
Topics:
- JSX syntax & expressions
- Functional components & props
- useState & useEffect hooks
- Conditional rendering & lists
- Handling forms & controlled inputs
- Component composition patterns

### Layer 4 of 10 — id: mern-4
Title: React Advanced
Technologies: useContext, React Router, Custom Hooks
Description: Level up your React skills with global state management, client-side routing, and reusable hook patterns.
Topics:
- useContext & the Context API
- useReducer for complex state
- Custom hooks & reusability
- React Router v6 — nested routes, params
- Code splitting & lazy loading
- Performance — useMemo, useCallback, React.memo

### Layer 5 of 10 — id: mern-5
Title: Node.js & Express
Technologies: Node.js, Express.js, REST, Middleware
Description: Move to the server. Build REST APIs with Node.js and Express, understand middleware, and handle routing and error management.
Topics:
- Node.js runtime & module system (CommonJS / ESM)
- Express setup, routing & controllers
- Middleware — logging, validation, error handling
- RESTful API design & HTTP methods
- Environment variables & dotenv
- Working with the file system

### Layer 6 of 10 — id: mern-6
Title: MongoDB & Mongoose
Technologies: MongoDB, Mongoose, Atlas
Description: Persist your data. Learn NoSQL database design, connect MongoDB to your Express app, and model data with Mongoose schemas.
Topics:
- NoSQL vs SQL — when to use MongoDB
- MongoDB Atlas setup & cloud hosting
- CRUD operations with the MongoDB driver
- Mongoose schemas, models & validation
- Relationships — embedding vs referencing
- Indexing & query performance basics

### Layer 7 of 10 — id: mern-7
Title: Authentication & Security
Technologies: JWT, bcrypt, Cookies, CORS
Description: Secure your app. Implement user registration and login, hash passwords, issue JWTs, and protect routes.
Topics:
- Password hashing with bcrypt
- JWT — signing, verifying, refresh tokens
- Auth middleware & protected routes
- HTTP-only cookies vs localStorage
- CORS configuration
- Input sanitization & basic OWASP awareness

### Layer 8 of 10 — id: mern-8
Title: Full Stack Integration
Technologies: Axios, React Query, Zustand
Description: Connect your React frontend to your Express backend. Handle API calls, loading states, caching, and global state across the full stack.
Topics:
- Axios setup & interceptors
- React Query — queries, mutations, caching
- Global state with Zustand
- Handling auth tokens on the client
- Proxy config for local dev (Vite / CRA)
- Error boundaries & toast notifications

### Layer 9 of 10 — id: mern-9
Title: Testing
Technologies: Jest, React Testing Library, Supertest
Description: Write tests that give you confidence. Cover your React components, API endpoints, and async logic.
Topics:
- Unit testing with Jest
- React Testing Library — render, queries, events
- Testing async code & mocking
- API endpoint testing with Supertest
- Test coverage & CI integration
- Test-driven development basics

### Layer 10 of 10 — id: mern-10
Title: Deployment & DevOps
Technologies: Vercel, Railway, Docker, GitHub Actions
Description: Ship your app to the world. Deploy your frontend and backend, automate with CI/CD, and containerize with Docker.
Topics:
- Deploying React to Vercel / Netlify
- Deploying Express API to Railway / Render
- Environment variables in production
- Docker basics — Dockerfile, images, containers
- GitHub Actions — CI pipeline on push
- Domain setup & HTTPS basics

Start now with Layer 1.
