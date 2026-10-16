You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Database Reliability Eng" (db-reliability, category database). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: db-reliability-1
Title: Database Reliability Fundamentals
Technologies: SRE, SLO, Error Budgets, Observability
Description: Understand SRE principles applied to database systems, including SLOs, error budgets, and the reliability mindset. Learn how databases fail and how to reason about reliability.
Topics:
- SLO and SLA for databases
- Error budgets
- Common database failure modes
- Observability pillars (metrics, logs, traces)
- Toil and its reduction
- Incident response basics

### Layer 2 of 10 — id: db-reliability-2
Title: Monitoring and Alerting
Technologies: Prometheus, Grafana, AlertManager, mysql_exporter
Description: Set up a full monitoring stack for database systems using Prometheus, Grafana, and exporters. Create actionable alerts based on golden signals.
Topics:
- Golden signals (latency, traffic, errors, saturation)
- Prometheus scrape configuration
- Database-specific exporters
- PromQL query language
- Grafana dashboard design
- AlertManager routing and silences

### Layer 3 of 10 — id: db-reliability-3
Title: Backup Strategies and Validation
Technologies: pg_basebackup, XtraBackup, pgBackRest, Checksum
Description: Design and implement comprehensive backup strategies for multiple database systems. Validate backups regularly by performing test restores in isolated environments.
Topics:
- Backup types (full, incremental, differential)
- Physical vs logical backups
- Backup retention policies
- Automated backup validation
- Checksum verification
- Offsite backup storage

### Layer 4 of 10 — id: db-reliability-4
Title: Replication Health and Lag Management
Technologies: PostgreSQL, MySQL, Replication Lag, Monitoring
Description: Monitor and manage replication lag across PostgreSQL and MySQL replica sets. Implement lag-based alerting and automated corrective actions.
Topics:
- Measuring replication lag accurately
- Causes of replication lag
- Lag alerting thresholds
- Semi-sync replication for durability
- Replica health checks
- Automatic lag-based read routing

### Layer 5 of 10 — id: db-reliability-5
Title: High Availability Architecture
Technologies: Patroni, MHA, ProxySQL, Keepalived
Description: Design and deploy high-availability database architectures with automatic failover. Understand the role of VIPs, proxies, and consensus systems in HA setups.
Topics:
- HA patterns for RDBMS
- Automatic failover tools (Patroni, MHA)
- Virtual IP and DNS-based failover
- Connection proxy HA with ProxySQL
- Health check design
- Failover testing

### Layer 6 of 10 — id: db-reliability-6
Title: Incident Response for Databases
Technologies: Runbooks, PagerDuty, Postmortems, On-call
Description: Build incident response processes specific to database outages and degradations. Write runbooks, conduct blameless postmortems, and improve MTTR over time.
Topics:
- On-call rotation design
- Runbook writing for common database incidents
- Incident severity levels
- Blameless postmortem process
- MTTR and MTBF tracking
- Oncall tooling (PagerDuty, Opsgenie)

### Layer 7 of 10 — id: db-reliability-7
Title: Capacity Planning and Scaling
Technologies: Prometheus, forecasting, Vertical Scaling, Read Replicas
Description: Forecast database growth using historical metrics and plan capacity additions before thresholds are breached. Decide between vertical scaling, read replicas, and sharding.
Topics:
- Growth rate analysis from metrics
- Disk, CPU, and connection capacity models
- Vertical scaling considerations
- Read replica provisioning
- Sharding decision framework
- Cost modeling for cloud databases

### Layer 8 of 10 — id: db-reliability-8
Title: Database Change Management
Technologies: Flyway, pt-online-schema-change, gh-ost, CI/CD
Description: Manage schema and data changes in production safely using migration tools and online DDL tools. Integrate database migrations into CI/CD pipelines.
Topics:
- Online schema change with gh-ost
- pt-online-schema-change for MySQL
- Flyway in CI/CD pipelines
- Backward-compatible migration patterns
- Feature flags for data migrations
- Rollback strategies

### Layer 9 of 10 — id: db-reliability-9
Title: Security and Compliance for Databases
Technologies: Encryption at Rest, TLS, Audit Logging, Vault
Description: Implement database security controls required for compliance frameworks including encryption at rest, audit logging, credential rotation, and access reviews.
Topics:
- Encryption at rest configuration
- TLS for in-transit encryption
- Database audit logging
- Dynamic secrets with HashiCorp Vault
- Credential rotation automation
- SOC2 and PCI DSS database controls

### Layer 10 of 10 — id: db-reliability-10
Title: Chaos Engineering and DR Validation
Technologies: Chaos Monkey, Gremlin, DR Runbooks, RTO/RPO
Description: Use chaos engineering to proactively test database resilience under failure conditions. Conduct regular DR drills and measure actual RTO and RPO against targets.
Topics:
- Chaos engineering principles
- Database-specific chaos experiments
- Network partition simulation
- DR drill planning and execution
- RTO and RPO measurement
- Resilience score tracking

Start now with Layer 1.
