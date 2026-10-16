You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Cloud Migration Specialist" (cloud-migration, category cloud). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: cloud-migration-1
Title: Migration Fundamentals and Strategy
Technologies: Migration, 7Rs Framework, Discovery, Assessment
Description: Understand the cloud migration journey using the 7Rs strategy framework and learn how to build a migration business case. Identify migration drivers and stakeholder concerns.
Topics:
- 7Rs migration strategies rehost replatform refactor
- Migration business case and ROI
- Total cost of ownership comparison
- Migration risk assessment matrix
- Stakeholder alignment and communication
- Migration wave planning concepts

### Layer 2 of 10 — id: cloud-migration-2
Title: Discovery and Portfolio Assessment
Technologies: AWS Application Discovery, Azure Migrate, Movere, Dependency Mapping
Description: Conduct application portfolio discovery using automated tools to collect inventory, performance data, and dependency maps. Produce a rationalized portfolio view for migration planning.
Topics:
- AWS Application Discovery Service agent vs agentless
- Azure Migrate discovery and assessment
- Dependency mapping and visualization
- Performance baseline collection
- Application portfolio rationalization
- Migration readiness assessment scoring

### Layer 3 of 10 — id: cloud-migration-3
Title: Landing Zone and Foundation Setup
Technologies: AWS Control Tower, Azure Landing Zones, Networking, Security Baseline
Description: Build the cloud landing zone foundation that target workloads will migrate into. Establish networking, identity, logging, and security baselines before the first migration wave.
Topics:
- Landing zone design principles
- Hub-and-spoke network topology for migration
- Directory service integration AD Connector
- Centralized logging and audit trails
- Security baseline and compliance guardrails
- DNS and hybrid connectivity setup

### Layer 4 of 10 — id: cloud-migration-4
Title: Lift and Shift Migration
Technologies: AWS MGN, Azure Migrate, VM Import, CloudEndure
Description: Execute rehost migrations moving virtual machines to the cloud with minimal changes using AWS Application Migration Service and Azure Migrate. Perform cutover with minimal downtime.
Topics:
- AWS Application Migration Service MGN setup
- Continuous block-level replication
- Test migrations and cutover planning
- Azure Migrate VM assessment and migration
- Post-migration validation testing
- Rollback planning for failed migrations

### Layer 5 of 10 — id: cloud-migration-5
Title: Database Migration
Technologies: AWS DMS, Azure Database Migration Service, Schema Conversion Tool, RDS
Description: Migrate on-premises databases to cloud managed database services using AWS DMS and the Schema Conversion Tool. Handle heterogeneous migrations from Oracle and SQL Server to open source engines.
Topics:
- AWS Database Migration Service architecture
- Schema Conversion Tool for heterogeneous migrations
- Continuous data replication with CDC
- Azure Database Migration Service
- Database cutover and minimal downtime strategies
- Post-migration data validation

### Layer 6 of 10 — id: cloud-migration-6
Title: Replatforming and Modernization
Technologies: Elastic Beanstalk, ECS, RDS, Managed Services
Description: Replatform applications to take advantage of managed cloud services without full refactoring. Move from self-managed databases and servers to PaaS offerings for reduced operational burden.
Topics:
- Replatforming patterns and decision criteria
- Migrating to managed databases RDS Aurora
- Containerizing existing apps for ECS
- App Service migration for .NET apps
- Replatform testing and validation
- Operational runbook updates for cloud

### Layer 7 of 10 — id: cloud-migration-7
Title: Refactoring and Application Modernization
Technologies: Microservices, Lambda, Event-Driven, Strangler Fig
Description: Apply the strangler fig pattern to incrementally decompose monolithic applications into cloud-native microservices and serverless functions. Prioritize decomposition by business capability.
Topics:
- Strangler fig pattern for monolith decomposition
- Domain-driven design for microservice boundaries
- Event sourcing and CQRS patterns
- Database per service pattern
- API gateway as strangler entry point
- Incremental migration with feature flags

### Layer 8 of 10 — id: cloud-migration-8
Title: Data Center Exit and Decommissioning
Technologies: Asset Management, Decommissioning, Migration Hub, Cost Tracking
Description: Plan and execute the final data center exit including decommissioning physical assets, terminating colocation contracts, and validating all workloads are stable in the cloud.
Topics:
- Data center exit planning and timeline
- Asset tracking and decommission checklist
- Workload stability validation criteria
- License reclamation and software inventory
- Colocation contract termination planning
- Post-migration cost validation

### Layer 9 of 10 — id: cloud-migration-9
Title: Post-Migration Optimization
Technologies: Cost Optimization, Performance Tuning, Well-Architected, Tagging
Description: Optimize migrated workloads for cloud-native performance and cost efficiency after migration is complete. Conduct Well-Architected reviews and right-size resources based on actual usage data.
Topics:
- Post-migration performance benchmarking
- Right-sizing based on cloudwatch metrics
- Reserved instance and savings plan purchases
- Well-Architected review post-migration
- Implementing cloud-native patterns in migrated apps
- Tagging cleanup and cost allocation

### Layer 10 of 10 — id: cloud-migration-10
Title: Migration Program Management at Scale
Technologies: Migration Hub, Wave Planning, Cloud COE, Governance
Description: Lead a large-scale cloud migration program across hundreds of applications with wave planning, governance, and a cloud center of excellence. Measure and report migration velocity and outcomes.
Topics:
- Migration program governance framework
- Wave planning and dependency management
- Cloud center of excellence structure
- Migration velocity tracking and KPIs
- Change management for cloud adoption
- Cloud operating model transformation

Start now with Layer 1.
