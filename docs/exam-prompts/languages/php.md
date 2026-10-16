You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "PHP" (php, category languages). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: php-1
Title: PHP Syntax and Basics
Technologies: PHP, Variables, Control Flow, Functions
Description: Learn PHP syntax, data types, operators, and control flow structures. Understand how PHP scripts execute in a server context.
Topics:
- Variables and data types
- Strings and string functions
- Arrays and array functions
- Control flow: if, switch, loops
- Functions and scope
- Include and require

### Layer 2 of 10 — id: php-2
Title: Forms, Superglobals, and HTTP
Technologies: PHP, GET, POST, Sessions
Description: Handle HTTP requests and user input using PHP superglobals. Learn session and cookie management for stateful web interactions.
Topics:
- $_GET, $_POST, $_REQUEST
- Form validation and sanitization
- Sessions and cookies
- Header redirects
- File uploads
- Error handling basics

### Layer 3 of 10 — id: php-3
Title: Object-Oriented PHP
Technologies: PHP, OOP, Classes, Interfaces
Description: Master PHP classes, inheritance, interfaces, and traits. Apply OOP principles to structure reusable and maintainable code.
Topics:
- Classes and objects
- Constructors and destructors
- Inheritance and abstract classes
- Interfaces and traits
- Static methods and properties
- Magic methods

### Layer 4 of 10 — id: php-4
Title: Composer and Dependency Management
Technologies: Composer, PSR-4, Autoloading, Packagist
Description: Use Composer to manage packages and autoload classes following PSR-4 conventions. Understand the composer.json lifecycle.
Topics:
- Installing and using Composer
- composer.json and composer.lock
- PSR-4 autoloading
- Requiring packages from Packagist
- Semantic versioning
- Scripts and hooks

### Layer 5 of 10 — id: php-5
Title: Databases and PDO
Technologies: PHP, PDO, MySQL, Prepared Statements
Description: Connect PHP to relational databases using PDO with prepared statements to prevent SQL injection. Perform CRUD operations safely.
Topics:
- PDO connection and DSN
- Prepared statements and binding
- Fetching results
- Transactions
- Error handling with PDO
- Basic query builder pattern

### Layer 6 of 10 — id: php-6
Title: PSR Standards and Clean Architecture
Technologies: PSR, PHP-FIG, Coding Standards, Logging
Description: Follow PSR-1, PSR-2, PSR-3, and PSR-12 coding standards to write interoperable PHP. Integrate a PSR-3 compliant logger.
Topics:
- PSR-1 and PSR-12 coding style
- PSR-3 logger interface
- PSR-7 HTTP messages overview
- PHP_CodeSniffer
- Monolog integration
- Separation of concerns

### Layer 7 of 10 — id: php-7
Title: Testing PHP Applications
Technologies: PHPUnit, Mocking, TDD, Code Coverage
Description: Write unit and integration tests with PHPUnit using mocks and assertions. Practice test-driven development on your domain logic.
Topics:
- PHPUnit setup and assertions
- Test doubles and mocking
- Data providers
- Integration tests
- Code coverage reports
- TDD workflow

### Layer 8 of 10 — id: php-8
Title: Modern PHP 8 Features
Technologies: PHP 8, Named Arguments, Fibers, Enums
Description: Leverage PHP 8 features including named arguments, union types, match expressions, enums, and fibers. Write expressive modern PHP.
Topics:
- Named arguments
- Union and intersection types
- Match expressions
- Null safe operator
- Enums
- Fibers and async basics

### Layer 9 of 10 — id: php-9
Title: Security and Performance
Technologies: PHP, Security, Caching, Opcache
Description: Harden your PHP application against common vulnerabilities including XSS, CSRF, and injection. Apply caching strategies to improve throughput.
Topics:
- XSS prevention and output escaping
- CSRF tokens
- Password hashing with bcrypt
- Opcache configuration
- APCu and Redis caching
- Rate limiting patterns

### Layer 10 of 10 — id: php-10
Title: Production PHP - APIs, Queues, and Deployment
Technologies: PHP, REST API, Job Queues, Docker
Description: Build and deploy a production-grade PHP REST API with background job processing and containerized infrastructure. Apply monitoring and zero-downtime deployment strategies.
Topics:
- Building REST APIs in plain PHP or micro-framework
- JSON serialization and content negotiation
- Background queues with database or Redis
- Dockerizing PHP-FPM and Nginx
- Environment configuration and secrets
- CI/CD pipeline and health checks

Start now with Layer 1.
