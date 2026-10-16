You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "MEAN Developer" (mean, category fullstack). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: mean-1
Title: JavaScript and Web Fundamentals
Technologies: JavaScript, HTML, CSS
Description: This layer grounds you in the JavaScript and web basics that the whole MEAN stack shares. A strong foundation makes both the Angular frontend and Node backend approachable.
Topics:
- Variables, functions, and scope
- Arrays, objects, and iteration
- DOM and events
- Promises and async/await
- ES modules
- Responsive layout basics

### Layer 2 of 10 — id: mean-2
Title: TypeScript for Angular
Technologies: TypeScript, JavaScript, Node.js
Description: This layer introduces TypeScript, which Angular uses throughout. Understanding types and decorators prepares you for Angular's structured, class-based approach.
Topics:
- Types, interfaces, and enums
- Classes and access modifiers
- Generics
- Decorators
- Modules and imports
- tsconfig essentials

### Layer 3 of 10 — id: mean-3
Title: Angular Fundamentals
Technologies: Angular, TypeScript, RxJS
Description: This layer covers building component-driven applications with the Angular framework. Angular provides the structured frontend for the MEAN stack.
Topics:
- Components and templates
- Data binding and directives
- Services and dependency injection
- The Angular router
- Pipes
- Lifecycle hooks

### Layer 4 of 10 — id: mean-4
Title: Reactive Programming with RxJS
Technologies: RxJS, Angular, TypeScript
Description: This layer teaches observables and reactive data flow that power Angular's HTTP and forms. RxJS lets you handle async streams cleanly across the app.
Topics:
- Observables and observers
- Common operators like map and filter
- Subjects and behavior subjects
- Combining streams
- Unsubscribing and memory leaks
- Async pipe usage

### Layer 5 of 10 — id: mean-5
Title: Node and Express Backend
Technologies: Node.js, Express, JavaScript
Description: This layer covers building the API server with Node and Express. Express is the application framework that serves data to the Angular frontend.
Topics:
- Express routing and middleware
- REST endpoint design
- Request parsing and responses
- Environment configuration
- CORS setup
- Error handling

### Layer 6 of 10 — id: mean-6
Title: MongoDB and Mongoose
Technologies: MongoDB, Mongoose, Node.js
Description: This layer teaches storing and querying data in MongoDB through Mongoose models. The document database completes the data layer of the MEAN stack.
Topics:
- Documents and collections
- Mongoose schemas and models
- CRUD operations
- Querying and projections
- References and population
- Indexes and validation

### Layer 7 of 10 — id: mean-7
Title: Connecting Angular to the API
Technologies: Angular, HttpClient, Express
Description: This layer wires the Angular client to the Express and MongoDB backend. Connecting the layers makes the application a working end-to-end product.
Topics:
- HttpClient and services
- Observable-based data fetching
- Error handling and retries
- Interceptors
- Environment-based API URLs
- Loading states

### Layer 8 of 10 — id: mean-8
Title: Authentication with JWT
Technologies: JWT, Express, Angular
Description: This layer secures the stack with token-based login and protected routes. Authentication lets users manage their own private task data.
Topics:
- Password hashing
- Issuing JSON Web Tokens
- Express auth middleware
- Angular route guards
- Storing tokens safely
- Refresh and logout flows

### Layer 9 of 10 — id: mean-9
Title: Advanced Angular and Forms
Technologies: Angular, Reactive Forms, RxJS
Description: This layer covers reactive forms, state management, and performance patterns. These skills make complex Angular apps maintainable and responsive.
Topics:
- Reactive forms and validation
- Form arrays and dynamic fields
- State management patterns
- Lazy loading modules
- Change detection strategies
- Reusable components

### Layer 10 of 10 — id: mean-10
Title: Testing and Deployment
Technologies: Jasmine, Karma, MongoDB Atlas
Description: This layer covers testing the app and deploying it to production. Tests and a hosted environment turn the project into a real, reliable product.
Topics:
- Unit testing Angular with Jasmine
- Backend tests with Jest
- End-to-end testing
- Building Angular for production
- Deploying Node and Angular
- MongoDB Atlas hosting

Start now with Layer 1.
