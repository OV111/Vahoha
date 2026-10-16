You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Chaos Engineer" (chaos-engineer, category qa). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: chaos-engineer-1
Title: Reliability Engineering Foundations
Technologies: Linux, Kubernetes, Prometheus, Grafana
Description: Understand the principles of site reliability engineering and why chaos engineering exists. Learn to define and measure reliability through SLIs, SLOs, and error budgets.
Topics:
- SRE principles and culture
- SLI, SLO, SLA definitions
- Error budget concept and management
- MTTR, MTBF, and availability math
- Kubernetes architecture overview
- Observability: metrics, logs, traces

### Layer 2 of 10 — id: chaos-engineer-2
Title: Chaos Engineering Principles and Hypothesis
Technologies: Confluence, Grafana, Kubernetes, Postman
Description: Study the scientific method applied to chaos engineering and learn to design rigorous experiments with clear hypotheses. Understand the steady state, blast radius, and minimal experiment concepts.
Topics:
- Chaos engineering principles from Netflix
- Steady state hypothesis definition
- Blast radius minimization
- Experiment design methodology
- Gameday planning and execution
- Chaos maturity model

### Layer 3 of 10 — id: chaos-engineer-3
Title: Chaos Monkey and Simian Army
Technologies: Chaos Monkey, Spinnaker, AWS, Java
Description: Implement Netflix-style instance termination chaos using Chaos Monkey. Understand the Simian Army family of tools and their roles in resilience engineering.
Topics:
- Chaos Monkey installation and configuration
- Spinnaker integration requirements
- Chaos Monkey scheduling and opt-in groups
- Janitor Monkey for resource cleanup
- Conformity Monkey for best practices
- Chaos Monkey in AWS environments

### Layer 4 of 10 — id: chaos-engineer-4
Title: Gremlin for Targeted Chaos Experiments
Technologies: Gremlin, Kubernetes, Linux, Grafana
Description: Use Gremlin as a enterprise-grade chaos platform to run targeted resource, network, and state attacks with safety controls. Learn Gremlin attack types and scenario composition.
Topics:
- Gremlin installation on Kubernetes and VMs
- Resource attacks: CPU, memory, disk, IO
- Network attacks: latency, packet loss, blackhole
- State attacks: shutdown, process killer
- Gremlin scenarios for multi-step experiments
- Gremlin TeamID and safety controls

### Layer 5 of 10 — id: chaos-engineer-5
Title: Kubernetes Chaos with LitmusChaos
Technologies: LitmusChaos, Kubernetes, Helm, Prometheus
Description: Run cloud-native chaos experiments directly in Kubernetes using LitmusChaos. Use ChaosEngine and ChaosExperiment custom resources to declaratively define experiments.
Topics:
- LitmusChaos architecture and components
- ChaosEngine and ChaosExperiment CRDs
- Pod delete and pod CPU hog experiments
- Node drain and node taint experiments
- LitmusPortal for experiment management
- Observability hooks in Litmus experiments

### Layer 6 of 10 — id: chaos-engineer-6
Title: Observability for Chaos Engineering
Technologies: Prometheus, Grafana, Jaeger, OpenTelemetry
Description: Build the observability foundation required to measure chaos experiment impact and confirm steady state. Implement distributed tracing to see how failures propagate across services.
Topics:
- Prometheus metrics instrumentation
- Grafana dashboard design for chaos
- Distributed tracing with Jaeger
- OpenTelemetry SDK instrumentation
- Correlation of chaos events with traces
- Alerting during chaos experiments

### Layer 7 of 10 — id: chaos-engineer-7
Title: Network and Dependency Failure Testing
Technologies: Gremlin, Toxiproxy, Kubernetes, Istio
Description: Simulate realistic network degradation and dependency failures to test service resilience patterns like circuit breakers, retries, and timeouts. Use service mesh for controlled traffic manipulation.
Topics:
- Toxiproxy for network fault injection
- Circuit breaker pattern testing
- Retry and timeout configuration testing
- Istio fault injection with VirtualService
- Dependency blackhole experiments
- Cascading failure prevention validation

### Layer 8 of 10 — id: chaos-engineer-8
Title: Database and Stateful Service Chaos
Technologies: Gremlin, LitmusChaos, PostgreSQL, Redis
Description: Test how applications handle database outages, disk failures, and stateful service disruptions. Validate data integrity and consistency after chaos events.
Topics:
- Database connection pool exhaustion testing
- Primary/replica failover testing
- Disk IO saturation experiments
- Redis cache failure scenarios
- Data consistency validation post-chaos
- Backup and restore validation

### Layer 9 of 10 — id: chaos-engineer-9
Title: Chaos Automation and GameDay Facilitation
Technologies: LitmusChaos, GitHub Actions, Gremlin, Confluence
Description: Automate routine chaos experiments to run on a schedule and facilitate cross-team GameDay events that build resilience culture. Document learnings and track reliability improvements.
Topics:
- Scheduled chaos in LitmusChaos workflows
- GitHub Actions for automated chaos
- GameDay planning: scope, timeline, roles
- Incident simulation exercises
- Post-GameDay retrospective format
- Chaos experiment result tracking

### Layer 10 of 10 — id: chaos-engineer-10
Title: Production Chaos and Chaos Maturity
Technologies: Gremlin, Chaos Monkey, Kubernetes, PagerDuty
Description: Graduate to running controlled chaos experiments in production environments with proper safety controls and on-call integration. Build a chaos engineering program that improves reliability over time.
Topics:
- Production chaos safety requirements
- Automated rollback triggers
- PagerDuty integration during chaos
- Chaos experiment result trending
- Chaos maturity model assessment
- Building a chaos engineering culture

Start now with Layer 1.
