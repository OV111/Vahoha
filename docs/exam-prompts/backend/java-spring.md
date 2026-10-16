You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Java Spring Dev" (java-spring, category backend). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: java-spring-1
Title: Java Fundamentals
Technologies: Java, JVM, JDK
Description: Start with the Java language and the JVM. Learn syntax, types and the compile-run cycle that underpins Spring.
Topics:
- Variables, types & operators
- Control flow & loops
- Methods & parameters
- Arrays & strings
- The JVM, JDK & JRE
- Compiling & running with javac/java

### Layer 2 of 10 — id: java-spring-2
Title: OOP & Core Java
Technologies: OOP, Interfaces, Exceptions
Description: Model your domain with object-oriented Java. Master classes, inheritance, interfaces and exception handling.
Topics:
- Classes, objects & encapsulation
- Inheritance & polymorphism
- Interfaces & abstract classes
- Records, enums & sealed classes
- Exception handling
- equals, hashCode & toString

### Layer 3 of 10 — id: java-spring-3
Title: Collections, Generics & Streams
Technologies: Collections, Generics, Streams
Description: Use Java's powerful standard library. Work with collections, write generic code, and process data with the Stream API.
Topics:
- List, Set, Map & their implementations
- Generics & bounded types
- The Stream API — map, filter, collect
- Optional & null handling
- Lambdas & functional interfaces
- Comparators & sorting

### Layer 4 of 10 — id: java-spring-4
Title: Build Tools & Spring Basics
Technologies: Maven, Spring, DI
Description: Enter the Spring ecosystem. Manage builds with Maven and understand dependency injection — Spring's core idea.
Topics:
- Maven project structure & lifecycle
- Dependencies & the POM
- Inversion of Control & DI
- Spring beans & the application context
- Configuration & profiles
- Spring Boot starters & auto-configuration

### Layer 5 of 10 — id: java-spring-5
Title: Spring Boot & REST APIs
Technologies: Spring Boot, REST, Validation
Description: Build production REST APIs with Spring Boot. Create controllers, handle requests, and validate input.
Topics:
- REST controllers & request mapping
- Request/response bodies & DTOs
- Bean validation
- Exception handling with @ControllerAdvice
- Configuration properties
- API documentation with OpenAPI

### Layer 6 of 10 — id: java-spring-6
Title: Spring Data & JPA/Hibernate
Technologies: Spring Data, JPA, Hibernate
Description: Persist data the Spring way. Map entities with JPA/Hibernate and query effortlessly with Spring Data repositories.
Topics:
- JPA entities & relationships
- Hibernate & the persistence context
- Spring Data repositories
- Derived & custom queries (JPQL)
- Transactions with @Transactional
- Migrations with Flyway

### Layer 7 of 10 — id: java-spring-7
Title: Spring Security
Technologies: Spring Security, JWT, OAuth2
Description: Secure your Spring application. Configure authentication and authorization with Spring Security and JWT.
Topics:
- Spring Security architecture
- Authentication & user details
- JWT-based stateless auth
- Method & URL authorization
- OAuth2 & resource servers
- Password encoding & CSRF

### Layer 8 of 10 — id: java-spring-8
Title: Testing
Technologies: JUnit5, Mockito, Testcontainers
Description: Test Spring applications thoroughly with JUnit, Mockito and Testcontainers for realistic integration tests.
Topics:
- JUnit 5 fundamentals
- Mocking with Mockito
- @SpringBootTest & slices
- MockMvc for controller tests
- Integration tests with Testcontainers
- Test coverage & CI

### Layer 9 of 10 — id: java-spring-9
Title: Messaging & Microservices
Technologies: Spring Cloud, Kafka, Resilience4j
Description: Scale Spring into distributed systems. Communicate via messaging and adopt microservice patterns with Spring Cloud.
Topics:
- Event-driven design with Kafka/RabbitMQ
- Spring Cloud config & discovery
- API gateway & load balancing
- Resilience with Resilience4j
- Distributed tracing
- Service-to-service communication

### Layer 10 of 10 — id: java-spring-10
Title: Packaging & Deployment
Technologies: Docker, Actuator, CI/CD
Description: Ship your Spring app. Build container images, expose health and metrics, and automate deployment.
Topics:
- Building fat jars & layered images
- Spring Boot Actuator — health & metrics
- Dockerizing a Spring Boot app
- Externalized configuration & secrets
- GitHub Actions CI/CD
- Deploying to the cloud

Start now with Layer 1.
