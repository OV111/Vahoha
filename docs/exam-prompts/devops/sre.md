You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Site Reliability Engineer" (sre, category devops). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: sre-1
Title: SRE Fundamentals
Technologies: Linux, Go, Git
Description: This layer introduces the principles and mindset of site reliability engineering. It matters because reliability work is grounded in shared definitions of risk, toil, and service objectives.
Topics:
- What SRE is and how it relates to DevOps
- Error budgets and risk tolerance
- Toil and automation
- Service level indicators and objectives
- Reliability versus feature velocity
- Blameless culture basics

### Layer 2 of 10 — id: sre-2
Title: Metrics and Monitoring with Prometheus
Technologies: Prometheus, PromQL, Linux
Description: This layer teaches how to collect and query time series metrics. It matters because metrics are the foundation of understanding system behavior and health.
Topics:
- Metric types and exposition format
- Scraping and service discovery
- PromQL querying basics
- Instrumenting applications
- Recording rules
- Cardinality and label design

### Layer 3 of 10 — id: sre-3
Title: Dashboards and Visualization with Grafana
Technologies: Grafana, Prometheus, PromQL
Description: This layer covers turning metrics into actionable dashboards. It matters because clear visualization is how teams spot trends and diagnose problems quickly.
Topics:
- Building panels and dashboards
- Templating and variables
- Visualizing SLIs and SLOs
- Annotations and time ranges
- Dashboard provisioning as code
- Sharing and access control

### Layer 4 of 10 — id: sre-4
Title: Service Level Objectives
Technologies: Prometheus, Grafana, PromQL
Description: This layer focuses on defining and measuring SLOs and error budgets. It matters because SLOs translate reliability goals into concrete, enforceable targets.
Topics:
- Choosing meaningful SLIs
- Setting realistic SLO targets
- Error budget calculation
- Burn rate alerting
- Multi-window multi-burn-rate alerts
- SLO reporting to stakeholders

### Layer 5 of 10 — id: sre-5
Title: Alerting and On-Call with PagerDuty
Technologies: PagerDuty, Prometheus, Alertmanager
Description: This layer teaches how to route alerts and run sustainable on-call rotations. It matters because well-designed alerting protects both systems and the humans who operate them.
Topics:
- Alertmanager routing and grouping
- Integrating PagerDuty
- Escalation policies and schedules
- Actionable versus noisy alerts
- On-call hygiene and handoffs
- Silences and maintenance windows

### Layer 6 of 10 — id: sre-6
Title: Logging and Distributed Tracing
Technologies: Loki, OpenTelemetry, Go
Description: This layer covers collecting logs and traces to understand request flows. It matters because metrics alone cannot explain why a specific request failed.
Topics:
- Structured logging practices
- Log aggregation and querying
- Distributed tracing concepts
- Instrumenting with OpenTelemetry
- Correlating logs, metrics, and traces
- Sampling strategies

### Layer 7 of 10 — id: sre-7
Title: Incident Management
Technologies: PagerDuty, Grafana, Runbooks
Description: This layer focuses on responding to and learning from production incidents. It matters because how an organization handles incidents shapes its long-term reliability.
Topics:
- Incident command roles
- Severity classification
- Communication during incidents
- Writing and using runbooks
- Blameless postmortems
- Tracking action items

### Layer 8 of 10 — id: sre-8
Title: Reliability Engineering in Go
Technologies: Go, Prometheus, gRPC
Description: This layer teaches building resilient services and tooling in Go. It matters because SREs often write automation and reliability features directly into services.
Topics:
- Timeouts, retries, and backoff
- Circuit breakers and bulkheads
- Graceful shutdown and health checks
- Rate limiting and load shedding
- Writing operational tooling in Go
- Profiling and performance tuning

### Layer 9 of 10 — id: sre-9
Title: Capacity Planning and Chaos Engineering
Technologies: Prometheus, Grafana, Chaos Mesh
Description: This layer covers forecasting demand and proactively testing failure modes. It matters because resilient systems are validated under stress rather than assumed.
Topics:
- Load testing and benchmarking
- Capacity forecasting from metrics
- Autoscaling strategies
- Chaos experiments and hypotheses
- Failure injection
- Game days

### Layer 10 of 10 — id: sre-10
Title: Operating Reliability at Scale
Technologies: Prometheus, Grafana, Thanos
Description: This layer covers running observability and reliability practices across a large production fleet. It matters because reliability programs must scale with the organization without collapsing under toil.
Topics:
- Long-term metrics storage with Thanos
- Federated and multi-cluster monitoring
- Reducing toil through automation
- Reliability reviews and scorecards
- Cost-aware observability
- Continuous improvement programs

Start now with Layer 1.
