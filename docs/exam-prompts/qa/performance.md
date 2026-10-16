You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Performance Tester" (performance, category qa). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: performance-1
Title: Performance Testing Fundamentals
Technologies: JMeter, Java, HTTP, Browser DevTools
Description: Understand the goals, types, and key metrics of performance testing before writing a single test. Learn to distinguish load, stress, spike, soak, and scalability tests.
Topics:
- Performance test types and when to use them
- Key metrics: throughput, latency, error rate
- Response time percentiles: p50, p90, p99
- Bottleneck identification concepts
- JMeter installation and UI walkthrough
- HTTP protocol basics for performance testers

### Layer 2 of 10 — id: performance-2
Title: JMeter Test Plan Design
Technologies: JMeter, CSV, HTTP, Java
Description: Build structured JMeter test plans with thread groups, samplers, listeners, and timers. Learn to parameterize tests with CSV data and use assertions for correctness.
Topics:
- Thread groups and ramp-up configuration
- HTTP Request samplers
- Config elements: HTTP Header Manager, Cookie Manager
- CSV Data Set Config for parameterization
- Response assertions
- View Results Tree and Summary Report listeners

### Layer 3 of 10 — id: performance-3
Title: k6 for Modern Load Testing
Technologies: k6, JavaScript, InfluxDB, Grafana
Description: Adopt k6 as a developer-friendly load testing tool where tests are written as JavaScript scripts. Integrate k6 output with InfluxDB and Grafana for real-time dashboards.
Topics:
- k6 installation and script structure
- Virtual users and stages configuration
- k6 checks and thresholds
- Custom metrics in k6
- k6 output to InfluxDB
- Grafana dashboard for k6 results

### Layer 4 of 10 — id: performance-4
Title: Gatling for Scala-Based Load Testing
Technologies: Gatling, Scala, Maven, HTML Reports
Description: Use Gatling to write expressive load test scenarios in Scala with a DSL designed for readability. Generate rich HTML reports automatically after each test run.
Topics:
- Gatling project setup with Maven
- Simulation structure and scenarios
- Feeders for test data injection
- Gatling DSL: exec, pause, repeat
- HTML report analysis
- Assertions in Gatling simulations

### Layer 5 of 10 — id: performance-5
Title: Grafana Dashboards and Observability
Technologies: Grafana, InfluxDB, Prometheus, k6
Description: Build Grafana dashboards that provide real-time visibility into load test runs and application performance. Learn to correlate load patterns with application metrics.
Topics:
- Grafana panels, queries, and variables
- InfluxDB data model and queries
- Prometheus metrics and exporters
- Correlating load test data with app metrics
- Alerting in Grafana
- Exporting and sharing dashboards

### Layer 6 of 10 — id: performance-6
Title: Profiling and Bottleneck Analysis
Technologies: JMeter, Java VisualVM, Grafana, Linux
Description: Go beyond collecting metrics to diagnosing the root cause of performance problems. Learn to profile JVM applications, analyze slow SQL queries, and identify resource saturation.
Topics:
- CPU, memory, I/O bottleneck identification
- JVM heap and GC analysis
- Thread dump analysis
- Slow query identification with EXPLAIN
- USE method: utilization, saturation, errors
- Flame graph interpretation basics

### Layer 7 of 10 — id: performance-7
Title: Stress, Spike, and Soak Testing
Technologies: k6, Grafana, JMeter, InfluxDB
Description: Design specialized test scenarios beyond simple load tests to validate system resilience under extreme conditions. Learn what to measure and when to stop each test type.
Topics:
- Stress testing to find the breaking point
- Spike test design and interpretation
- Soak test duration and monitoring
- Defining pass/fail criteria per test type
- System recovery validation after stress
- Capacity planning from stress test data

### Layer 8 of 10 — id: performance-8
Title: API and Microservices Performance Testing
Technologies: k6, Postman, Grafana, Docker
Description: Test performance at the API and microservice layer independently of the UI to get faster, more targeted results. Learn distributed tracing concepts to follow requests across services.
Topics:
- API-level performance test design
- Isolating microservice performance
- Distributed tracing with Jaeger basics
- Contract and integration performance tests
- Containerized test environments
- Service mesh performance considerations

### Layer 9 of 10 — id: performance-9
Title: Performance Test Reporting and SLA Definition
Technologies: Grafana, JMeter, HTML Reports, Confluence
Description: Translate raw performance numbers into actionable insights for development teams and management. Learn to define SLAs, write performance test reports, and track trends over releases.
Topics:
- Defining SLAs and SLOs for APIs
- Performance baseline establishment
- Trend analysis across releases
- Writing executive performance reports
- Grafana annotations for test events
- Performance test result archiving

### Layer 10 of 10 — id: performance-10
Title: CI/CD Integration and Continuous Performance Testing
Technologies: GitHub Actions, k6, Grafana, Docker
Description: Embed performance tests into your CI/CD pipeline so every deployment is automatically validated against performance thresholds. Block releases that violate SLA automatically.
Topics:
- k6 in GitHub Actions pipelines
- Automated threshold-based pass/fail
- Nightly performance regression runs
- Performance trend dashboards for CI
- Docker-based test environments for CI
- Alerting on performance regressions

Start now with Layer 1.
