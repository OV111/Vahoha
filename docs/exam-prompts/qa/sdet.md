You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "SDET" (sdet, category qa). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: sdet-1
Title: Core Java for Test Engineering
Technologies: Java, IntelliJ IDEA, Maven, JUnit 5
Description: Build a strong Java programming foundation specifically oriented toward test engineering. Learn OOP principles, collections, exception handling, and project structure with Maven.
Topics:
- Java OOP: classes, inheritance, interfaces
- Collections: List, Map, Set usage
- Exception handling in test code
- Java Streams and Lambdas
- Maven project structure and dependencies
- JUnit 5 basics and lifecycle

### Layer 2 of 10 — id: sdet-2
Title: Selenium WebDriver with Java
Technologies: Selenium, Java, ChromeDriver, TestNG
Description: Automate web browsers using Selenium WebDriver with Java bindings. Apply professional patterns like Page Object Model from day one.
Topics:
- WebDriver setup with WebDriverManager
- Selenium locator strategies
- Synchronization: explicit and fluent waits
- Page Object Model with Java
- TestNG integration with Selenium
- Screenshot capture and logging on failure

### Layer 3 of 10 — id: sdet-3
Title: TestNG Advanced Features and Framework Design
Technologies: TestNG, Java, Maven, Extent Reports
Description: Master advanced TestNG features for building production-quality test frameworks. Design a framework foundation that other engineers can contribute to.
Topics:
- TestNG data providers and parameterization
- Test grouping and dependency management
- TestNG listeners for custom logging
- Retry analyzer for flaky test handling
- Extent Reports for rich HTML reports
- Maven Surefire plugin configuration

### Layer 4 of 10 — id: sdet-4
Title: API Testing with REST Assured and Java
Technologies: REST Assured, Java, TestNG, Jackson
Description: Write comprehensive API tests in Java using REST Assured. Use Jackson for POJO serialization and build an API test layer that integrates with your UI framework.
Topics:
- REST Assured DSL mastery
- POJO-based request and response handling with Jackson
- JSON Schema validation
- API test base classes and utilities
- Chaining API calls in test setup
- REST Assured with OAuth2 authentication

### Layer 5 of 10 — id: sdet-5
Title: Design Patterns in Test Automation
Technologies: Java, Selenium, TestNG, Spring
Description: Apply software design patterns to test automation code to improve reusability, maintainability, and scalability. Learn the patterns that appear most frequently in enterprise test frameworks.
Topics:
- Singleton for WebDriver management
- Factory pattern for browser instantiation
- Builder pattern for test data
- Fluent interface pattern
- Strategy pattern for test environments
- Dependency injection basics

### Layer 6 of 10 — id: sdet-6
Title: Unit and Integration Testing for Production Code
Technologies: JUnit 5, Mockito, Spring Boot Test, Java
Description: Write unit and integration tests for production Java code using JUnit 5 and Mockito. Understand the testing pyramid and how SDETs contribute to developer test coverage.
Topics:
- JUnit 5 parameterized tests and extensions
- Mockito for dependency mocking
- Testing Spring Boot controllers with MockMvc
- Integration tests with Testcontainers
- Test coverage measurement with JaCoCo
- Mutation testing with PIT

### Layer 7 of 10 — id: sdet-7
Title: BDD with Cucumber and Gherkin
Technologies: Cucumber, Java, Gherkin, Selenium
Description: Implement Behavior-Driven Development using Cucumber to bridge communication between business and technical teams. Write Gherkin scenarios that drive Selenium test execution.
Topics:
- Gherkin syntax: Feature, Scenario, Given/When/Then
- Cucumber step definitions in Java
- Cucumber hooks and data tables
- Cucumber and Selenium integration
- Cucumber reporting plugins
- Living documentation with Cucumber

### Layer 8 of 10 — id: sdet-8
Title: Test Data Management and Environments
Technologies: Java, Faker, SQL, Docker
Description: Design a robust test data strategy that supports isolated, repeatable test execution across multiple environments. Use Docker to create ephemeral test environments on demand.
Topics:
- Test data strategies: static, dynamic, on-demand
- Java Faker for synthetic data generation
- Database seeding and teardown
- Environment configuration management
- Docker Compose for test environments
- Data isolation between parallel tests

### Layer 9 of 10 — id: sdet-9
Title: Performance and Security Testing Integration
Technologies: Gatling, OWASP ZAP, Java, Maven
Description: Expand SDET scope to include performance and security test contributions. Integrate Gatling performance tests and ZAP DAST scans into the Java Maven build.
Topics:
- Gatling Java DSL for performance tests
- Integrating Gatling with Maven lifecycle
- ZAP Maven plugin for DAST scanning
- Defining performance thresholds in tests
- Security test gates in build pipeline
- Combined test reporting

### Layer 10 of 10 — id: sdet-10
Title: CI/CD Pipeline Ownership and Production Quality
Technologies: Jenkins, GitHub Actions, Docker, SonarQube
Description: Own the CI/CD quality gates for your team, ensuring test automation runs reliably on every build and release. Use code quality tools to keep test code as maintainable as production code.
Topics:
- Jenkins declarative pipeline authoring
- GitHub Actions for Java Maven projects
- Parallel and matrix test execution in CI
- SonarQube for test code quality
- Test flakiness detection and quarantine
- Release quality gate definition

Start now with Layer 1.
