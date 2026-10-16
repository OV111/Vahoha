You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Observability Engineer" (observability-engineer, category cloud). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: observability-engineer-1
Title: Observability Fundamentals
Technologies: Metrics, Logs, Traces, Observability
Description: Understand the three pillars of observability and how they differ from traditional monitoring. Learn the difference between black-box and white-box monitoring and when to apply each.
Topics:
- Three pillars metrics logs traces
- Observability vs monitoring distinction
- Black-box vs white-box monitoring
- RED method rate errors duration
- USE method utilization saturation errors
- MTTD and MTTR improvement with observability

### Layer 2 of 10 — id: observability-engineer-2
Title: Prometheus Metrics
Technologies: Prometheus, PromQL, Exporters, Alertmanager
Description: Set up Prometheus to scrape metrics from applications and infrastructure exporters. Write PromQL queries for aggregation and alerting, and configure Alertmanager notification routing.
Topics:
- Prometheus architecture and data model
- Four metric types counter gauge histogram summary
- Scrape configs and service discovery
- PromQL operators functions and aggregations
- Alertmanager routing inhibition silencing
- Recording rules for pre-computation

### Layer 3 of 10 — id: observability-engineer-3
Title: Grafana Dashboards and Alerting
Technologies: Grafana, Dashboards, Panels, Grafana Alerting
Description: Build operational dashboards in Grafana with best-practice panel choices, variables, and drill-down links. Configure Grafana-native alerting with multi-datasource support.
Topics:
- Grafana panel types and when to use each
- Dashboard variables and template queries
- Dashboard as code with Grafonnet
- Grafana unified alerting architecture
- Alert contact points and notification policies
- Grafana dashboard best practices and anti-patterns

### Layer 4 of 10 — id: observability-engineer-4
Title: Distributed Tracing
Technologies: Jaeger, Tempo, OpenTelemetry, Trace Context
Description: Implement distributed tracing to follow requests across microservices. Use OpenTelemetry SDK to instrument applications and store traces in Jaeger or Grafana Tempo.
Topics:
- Distributed tracing concepts spans and traces
- W3C Trace Context propagation
- OpenTelemetry SDK instrumentation
- Auto-instrumentation vs manual spans
- Jaeger architecture and storage backends
- Grafana Tempo for cost-effective trace storage

### Layer 5 of 10 — id: observability-engineer-5
Title: Log Management with Loki
Technologies: Loki, Promtail, LogQL, Log Aggregation
Description: Aggregate and query application and infrastructure logs using Grafana Loki with Promtail agents. Write LogQL queries for filtering, parsing, and creating metrics from log data.
Topics:
- Loki architecture and chunk storage
- Promtail scrape configs and pipeline stages
- LogQL filter and metric queries
- Log parsing with regex and JSON stage
- Loki labels and cardinality management
- Correlating logs with metrics and traces in Grafana

### Layer 6 of 10 — id: observability-engineer-6
Title: OpenTelemetry Collector and Pipelines
Technologies: OpenTelemetry Collector, OTLP, Processors, Exporters
Description: Deploy and configure the OpenTelemetry Collector as a central telemetry pipeline for receiving, processing, and exporting metrics, logs, and traces to multiple backends.
Topics:
- OTel Collector architecture receivers processors exporters
- OTLP protocol and transport formats
- Batch and memory limiter processors
- Attribute processing and data enrichment
- Fan-out to multiple backends
- Collector deployment patterns agent vs gateway

### Layer 7 of 10 — id: observability-engineer-7
Title: SLOs and Error Budgets
Technologies: SLOs, SLIs, Error Budgets, Sloth
Description: Define service level objectives and automate error budget burn rate alerts using Prometheus recording rules and tools like Sloth. Align on-call practices with error budget consumption.
Topics:
- SLI SLO SLA definitions and hierarchy
- Choosing meaningful SLIs for user journeys
- Error budget calculation and policies
- Multi-window multi-burn-rate alerts
- Sloth for SLO as code
- SLO dashboards in Grafana

### Layer 8 of 10 — id: observability-engineer-8
Title: Datadog and Commercial Observability
Technologies: Datadog, APM, Datadog Agent, Monitors
Description: Implement end-to-end observability using Datadog APM, infrastructure monitoring, and log management. Configure Datadog monitors, dashboards, and synthetic tests.
Topics:
- Datadog Agent installation and configuration
- APM tracing and service catalog
- Datadog log management and parsing
- Infrastructure metrics and host maps
- Datadog monitors and composite alerts
- Synthetic monitoring and browser tests

### Layer 9 of 10 — id: observability-engineer-9
Title: Observability for Kubernetes
Technologies: kube-state-metrics, cAdvisor, Prometheus Operator, Kubernetes Events
Description: Build comprehensive Kubernetes observability covering node, pod, and control plane metrics with the kube-prometheus-stack. Create cluster health dashboards and capacity planning views.
Topics:
- kube-state-metrics for Kubernetes object metrics
- cAdvisor container resource usage
- Prometheus Operator CRDs ServiceMonitor PodMonitor
- Kubernetes control plane monitoring
- Cluster capacity planning metrics
- Kubernetes event tracking and alerting

### Layer 10 of 10 — id: observability-engineer-10
Title: Production Observability Platform Engineering
Technologies: Thanos, Mimir, Observability as Code, Multi-Tenant
Description: Design and operate a production-grade multi-tenant observability platform with long-term metric storage using Thanos or Grafana Mimir, and manage the full stack as code.
Topics:
- Thanos architecture for long-term storage
- Grafana Mimir for scalable Prometheus
- Multi-tenant observability with tenant isolation
- Observability as code with Terraform and Jsonnet
- Alertmanager high availability configuration
- Observability platform cost management

Start now with Layer 1.
