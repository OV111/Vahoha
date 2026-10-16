You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Laravel + Vue Dev" (laravel-vue, category fullstack). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: laravel-vue-1
Title: PHP Fundamentals
Technologies: PHP, Composer, Web
Description: This layer establishes modern PHP skills that Laravel is built on. A solid language base makes the framework far easier to adopt.
Topics:
- Variables, types, and control flow
- Functions and arrays
- Classes, interfaces, and traits
- Namespaces and autoloading
- Composer and packages
- Error handling

### Layer 2 of 10 — id: laravel-vue-2
Title: Laravel Basics and Routing
Technologies: Laravel, PHP, Blade
Description: This layer introduces Laravel structure, routing, controllers, and views. Understanding the request lifecycle is the foundation for the backend.
Topics:
- Project structure and Artisan
- Routing and controllers
- Blade templates
- Request and response handling
- Configuration and environment
- Middleware basics

### Layer 3 of 10 — id: laravel-vue-3
Title: Eloquent and Databases
Technologies: Eloquent, MySQL, Laravel
Description: This layer covers modeling and querying data with the Eloquent ORM. Eloquent and migrations give the app reliable persistent storage.
Topics:
- Migrations and schema
- Eloquent models and CRUD
- Relationships
- Query builder
- Seeders and factories
- Connecting MySQL

### Layer 4 of 10 — id: laravel-vue-4
Title: Validation, Forms, and Auth
Technologies: Laravel, Blade, PHP
Description: This layer covers request validation, forms, and built-in authentication. Secure forms and login are essential to a usable application.
Topics:
- Form requests and validation
- CSRF protection
- Flash messages and old input
- Laravel Breeze authentication
- Authorization with gates and policies
- Sessions

### Layer 5 of 10 — id: laravel-vue-5
Title: Vue 3 Fundamentals
Technologies: Vue 3, JavaScript, Vite
Description: This layer introduces building reactive interfaces with Vue 3 and the Composition API. Vue provides the dynamic frontend half of the stack.
Topics:
- Template syntax and directives
- Reactivity with ref and reactive
- Components and props
- Events and v-model
- Computed and watchers
- Composition API

### Layer 6 of 10 — id: laravel-vue-6
Title: Building APIs with Laravel
Technologies: Laravel, Sanctum, JSON
Description: This layer covers exposing Laravel as a JSON API for the Vue frontend. A clean API decouples the backend from the client.
Topics:
- API routes and controllers
- API resources and transformers
- Pagination and filtering
- Token auth with Sanctum
- Rate limiting
- Error responses

### Layer 7 of 10 — id: laravel-vue-7
Title: Connecting Vue to Laravel
Technologies: Vue 3, Axios, Pinia
Description: This layer wires the Vue frontend to the Laravel API and manages client state. Integration produces a complete single-page application.
Topics:
- API calls with Axios
- State management with Pinia
- Vue Router
- Handling auth tokens
- Loading and error states
- Protected client routes

### Layer 8 of 10 — id: laravel-vue-8
Title: Queues, Jobs, and Email
Technologies: Laravel, Redis, Mailable
Description: This layer covers background processing and sending email in Laravel. Offloading slow work keeps the app fast and responsive.
Topics:
- Queues and workers
- Jobs and dispatching
- Scheduling tasks
- Mailables and notifications
- Events and listeners
- Failed job handling

### Layer 9 of 10 — id: laravel-vue-9
Title: Advanced Patterns and Performance
Technologies: Laravel, Redis, Eloquent
Description: This layer covers caching, optimization, and clean architecture in larger apps. These practices keep a growing Laravel codebase fast and maintainable.
Topics:
- Eager loading and N plus one
- Caching with Redis
- Service classes and repositories
- Database indexing
- API resource optimization
- Profiling and debugging

### Layer 10 of 10 — id: laravel-vue-10
Title: Testing and Deployment
Technologies: PHPUnit, Pest, Docker
Description: This layer covers testing the stack and deploying it to production. Tests and a deploy pipeline turn the project into a maintainable product.
Topics:
- Feature and unit tests with Pest
- Vue component testing
- Database testing
- Containerizing with Docker and Sail
- Building Vue for production
- Deploying to a cloud host

Start now with Layer 1.
