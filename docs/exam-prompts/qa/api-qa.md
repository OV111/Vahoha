You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "API Tester" (api-qa, category qa). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: api-qa-1
Title: HTTP and REST API Fundamentals
Technologies: Postman, HTTP, JSON, REST
Description: Build a solid understanding of how REST APIs work including HTTP methods, status codes, headers, and request/response bodies. Learn to read API documentation and send your first requests with Postman.
Topics:
- HTTP methods: GET, POST, PUT, DELETE, PATCH
- HTTP status codes and their meaning
- Request and response headers
- JSON request and response bodies
- REST architectural constraints
- Reading Swagger and OpenAPI docs

### Layer 2 of 10 — id: api-qa-2
Title: Postman Collections and Test Scripts
Technologies: Postman, JavaScript, JSON, Environment Variables
Description: Organize API requests into Postman collections and write JavaScript test scripts that automatically validate responses. Use environment variables to manage multiple environments.
Topics:
- Collection and folder organization
- Environment and global variables
- pm.test and pm.expect assertions
- Pre-request scripts for setup
- Chaining requests with variable extraction
- Postman test results and assertions

### Layer 3 of 10 — id: api-qa-3
Title: REST Assured for Java API Testing
Technologies: REST Assured, Java, TestNG, Maven
Description: Write expressive, readable API tests in Java using REST Assured with its fluent Given-When-Then DSL. Integrate with TestNG for test organization and reporting.
Topics:
- REST Assured setup with Maven
- Given/When/Then DSL structure
- Path and query parameter testing
- Response body extraction with JsonPath
- Schema validation with JSON Schema
- Authentication handling in REST Assured

### Layer 4 of 10 — id: api-qa-4
Title: API Test Design and Coverage Strategies
Technologies: Postman, REST Assured, Swagger, TestRail
Description: Apply systematic test design techniques to APIs to achieve comprehensive coverage without redundancy. Learn to derive test cases from API contracts and OpenAPI specs.
Topics:
- Positive and negative API test cases
- Boundary value testing for API parameters
- Error handling and error response validation
- API contract testing concepts
- Test case traceability to API spec
- Edge cases: empty body, null values, large payloads

### Layer 5 of 10 — id: api-qa-5
Title: Newman for CLI and Automated Postman Runs
Technologies: Newman, Node.js, Postman, JSON
Description: Run Postman collections from the command line using Newman so they can be executed in automated pipelines. Generate JUnit and HTML reports from Newman runs.
Topics:
- Newman installation and CLI usage
- Running collections with environments
- Newman reporters: CLI, JUnit, HTML
- Newman with multiple environment files
- Exit codes for CI integration
- Newman custom reporters

### Layer 6 of 10 — id: api-qa-6
Title: API Authentication Testing
Technologies: Postman, REST Assured, OAuth2, JWT
Description: Test all common authentication mechanisms used by modern APIs including API keys, JWT, OAuth2 client credentials, and session cookies. Validate token expiration and refresh flows.
Topics:
- API key authentication testing
- Bearer token handling and validation
- JWT structure and claims validation
- OAuth2 authorization code and client credentials flows
- Token expiration and refresh testing
- MFA and two-step auth API testing

### Layer 7 of 10 — id: api-qa-7
Title: Contract Testing with Pact
Technologies: Pact, Java, REST Assured, Pact Broker
Description: Implement consumer-driven contract testing with Pact to catch API breaking changes before they reach production. Learn the consumer-provider workflow and Pact Broker for contract sharing.
Topics:
- Consumer-driven contract testing concept
- Pact consumer test authoring
- Pact provider verification
- Pact Broker for contract storage
- Can-I-Deploy checks in CI
- Versioning and tagging Pact contracts

### Layer 8 of 10 — id: api-qa-8
Title: GraphQL API Testing
Technologies: Postman, GraphQL, REST Assured, Apollo
Description: Extend your API testing skills to GraphQL, understanding queries, mutations, subscriptions, and schema introspection. Identify GraphQL-specific vulnerabilities and test patterns.
Topics:
- GraphQL query and mutation structure
- Testing with introspection queries
- Variable and argument validation
- Error handling in GraphQL responses
- GraphQL-specific issues: N+1, over-fetching
- Postman for GraphQL requests

### Layer 9 of 10 — id: api-qa-9
Title: Mocking and Service Virtualization
Technologies: WireMock, Postman Mock Server, Java, REST Assured
Description: Create API mocks and stubs to enable testing when downstream services are unavailable or unpredictable. Learn service virtualization for isolated, repeatable API testing.
Topics:
- WireMock setup and stub configuration
- Request matching in WireMock
- Response templating and dynamic responses
- Postman Mock Server setup
- Fault injection with WireMock
- Recording and playback of API interactions

### Layer 10 of 10 — id: api-qa-10
Title: CI/CD Integration and API Test Pipelines
Technologies: GitHub Actions, Newman, REST Assured, Docker
Description: Automate your API test suites in CI/CD pipelines that run on every pull request and deployment. Use Docker to package test environments for consistent execution.
Topics:
- GitHub Actions for API test automation
- Newman in CI pipelines
- REST Assured with Maven in CI
- Parallel API test execution
- API test result reporting in CI
- Environment promotion testing strategy

Start now with Layer 1.
