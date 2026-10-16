You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Full Stack Engineer" (fullstack-engineer, category fullstack). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: fullstack-engineer-1
Title: Web Fundamentals
Technologies: HTML, CSS, JavaScript
Description: This layer establishes the core building blocks of every web page and app. Solid fundamentals in markup, styling, and scripting are prerequisites for all full stack work.
Topics:
- Semantic HTML structure
- CSS layout with flexbox and grid
- JavaScript variables and functions
- DOM manipulation and events
- Fetch and the network tab
- Responsive design basics

### Layer 2 of 10 — id: fullstack-engineer-2
Title: Frontend with React
Technologies: React, JavaScript, Vite
Description: This layer teaches building dynamic interfaces with React components and hooks. React is the foundation for the interactive client of the full stack application.
Topics:
- Components, props, and state
- Hooks and the effect lifecycle
- Client-side routing
- Lifting state and prop drilling
- Fetching data in components
- Forms and controlled inputs

### Layer 3 of 10 — id: fullstack-engineer-3
Title: Backend with Node and Express
Technologies: Node.js, Express, JavaScript
Description: This layer covers building HTTP servers and REST endpoints with Node and Express. The backend is where business logic and data access live for the application.
Topics:
- Node runtime and modules
- Express routing and middleware
- Request and response handling
- REST conventions and status codes
- Environment configuration
- Error handling middleware

### Layer 4 of 10 — id: fullstack-engineer-4
Title: Relational Databases and SQL
Technologies: SQL, PostgreSQL, Node.js
Description: This layer teaches modeling and querying data in a relational database. Persistent storage with SQL is the backbone of most production applications.
Topics:
- Tables, columns, and keys
- SELECT, INSERT, UPDATE, DELETE
- Joins and relationships
- Indexes and constraints
- Normalization basics
- Connecting from Node

### Layer 5 of 10 — id: fullstack-engineer-5
Title: Connecting Frontend and Backend
Technologies: React, Express, REST
Description: This layer wires the React client to the Express API over HTTP. Understanding the full request lifecycle is what makes you a true full stack engineer.
Topics:
- CORS and cross-origin requests
- Fetching and posting JSON
- Loading and error states
- API client organization
- Proxy setup in development
- Pagination and query params

### Layer 6 of 10 — id: fullstack-engineer-6
Title: Authentication and Authorization
Technologies: JWT, Express, bcrypt
Description: This layer adds user accounts, secure login, and protected routes. Authentication is essential before users can own and manage their own data.
Topics:
- Password hashing with bcrypt
- JSON Web Tokens
- Sessions versus tokens
- Protected route middleware
- Role-based access control
- Secure cookie handling

### Layer 7 of 10 — id: fullstack-engineer-7
Title: API Design and Advanced Backend
Technologies: Express, SQL, Node.js
Description: This layer deepens backend skills with validation, layered architecture, and performance. Well-designed APIs scale better and are far easier to maintain.
Topics:
- Input validation and sanitization
- Service and repository layers
- Query optimization and indexing
- Caching strategies
- Rate limiting and security headers
- Logging and monitoring basics

### Layer 8 of 10 — id: fullstack-engineer-8
Title: Containers with Docker
Technologies: Docker, Docker Compose, PostgreSQL
Description: This layer teaches packaging the app and its database into reproducible containers. Docker removes works-on-my-machine problems and prepares the app for deployment.
Topics:
- Images, containers, and layers
- Writing a Dockerfile
- Volumes and networking
- Docker Compose for multi-service apps
- Environment variables in containers
- Building lean production images

### Layer 9 of 10 — id: fullstack-engineer-9
Title: Testing the Full Stack
Technologies: Jest, Supertest, Playwright
Description: This layer covers automated testing across the backend and frontend. A reliable test suite catches regressions and gives confidence to keep shipping.
Topics:
- Unit tests with Jest
- API tests with Supertest
- React component testing
- End-to-end tests with Playwright
- Mocking and test data
- Coverage and continuous testing

### Layer 10 of 10 — id: fullstack-engineer-10
Title: Deployment and CI/CD
Technologies: GitHub Actions, Docker, AWS
Description: This layer covers shipping the containerized app to the cloud with an automated pipeline. Continuous delivery is what turns a project into a maintained production service.
Topics:
- CI pipelines with GitHub Actions
- Building and pushing images
- Deploying to a cloud host
- Managed databases and secrets
- Monitoring and logging in production
- Zero-downtime deploy basics

Start now with Layer 1.
