You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Data Architect" (data-architect, category datascience). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: data-architect-1
Title: Data Architecture Foundations
Technologies: SQL, Data Modeling, ERD, Architecture Diagrams
Description: Understand the scope of the data architect role and the layers of a modern enterprise data platform. Learn to diagram systems, evaluate patterns, and speak the language of data infrastructure.
Topics:
- Data architecture patterns
- Operational vs analytical systems
- Data platform layers
- Architecture diagrams with draw.io
- Data governance overview
- Stakeholder communication

### Layer 2 of 10 — id: data-architect-2
Title: Relational Database Design and SQL
Technologies: SQL, PostgreSQL, ERD, Normalization
Description: Design normalized relational schemas and write the advanced SQL needed to query and transform data across complex table structures. Master indexing and query performance fundamentals.
Topics:
- 3NF normalization
- Primary and foreign keys
- Index types and usage
- Advanced joins
- Partitioning
- Query plan analysis

### Layer 3 of 10 — id: data-architect-3
Title: Dimensional Modeling and Data Warehousing
Technologies: SQL, Star Schema, Snowflake, BigQuery
Description: Design dimensional models that balance query performance with maintainability for analytical workloads. Apply Kimball methodology to real business domains.
Topics:
- Star schema design
- Slowly changing dimensions
- Conformed dimensions
- Factless fact tables
- Aggregate tables
- Data mart vs enterprise warehouse

### Layer 4 of 10 — id: data-architect-4
Title: Cloud Data Platforms - Snowflake and BigQuery
Technologies: Snowflake, BigQuery, SQL, Cloud Storage
Description: Configure and administer cloud data warehouses including compute scaling, storage organization, and cost controls. Understand the architectural differences between Snowflake and BigQuery.
Topics:
- Snowflake architecture (VW, storage)
- BigQuery slots and reservations
- Data loading patterns
- Partitioning and clustering
- Cost monitoring
- Security and access control

### Layer 5 of 10 — id: data-architect-5
Title: Data Transformation with dbt
Technologies: dbt, SQL, Jinja, YAML
Description: Design dbt project structures that reflect a well-governed transformation layer, with clear staging, intermediate, and mart conventions. Apply dbt patterns for large, multi-domain projects.
Topics:
- Multi-project dbt design
- Package management
- Materializations at scale
- dbt docs and lineage
- Cross-database dbt
- Testing strategy at each layer

### Layer 6 of 10 — id: data-architect-6
Title: Data Governance and Metadata Management
Technologies: Collibra, Apache Atlas, dbt docs, Data Catalog
Description: Implement data governance frameworks including data cataloging, lineage tracking, ownership assignment, and data classification. Ensure regulatory and compliance requirements are met.
Topics:
- Data catalog design
- Business glossary
- Data lineage tracking
- Data classification (PII, etc.)
- Ownership and stewardship
- Data quality SLAs

### Layer 7 of 10 — id: data-architect-7
Title: Data Security and Compliance
Technologies: Snowflake, BigQuery, SQL, IAM
Description: Design and enforce data security controls including column-level masking, row-level access policies, and audit logging for compliance with GDPR and SOC 2. Apply least-privilege access models.
Topics:
- Column masking policies
- Row access policies
- Role-based access control
- Dynamic data masking
- Audit logs and monitoring
- GDPR and CCPA compliance patterns

### Layer 8 of 10 — id: data-architect-8
Title: Data Mesh and Modern Architecture Patterns
Technologies: Snowflake, dbt, Terraform, Cloud IAM
Description: Evaluate and design data mesh architectures that decentralize data ownership to domain teams while maintaining interoperability. Compare with centralized warehouse and data lakehouse patterns.
Topics:
- Data mesh principles
- Data products
- Federated governance
- Data lakehouse architecture
- Data sharing across domains
- Infrastructure as code for data

### Layer 9 of 10 — id: data-architect-9
Title: Performance, Scalability, and Cost Optimization
Technologies: Snowflake, BigQuery, dbt, Query Profiling
Description: Diagnose and resolve performance bottlenecks in cloud data platforms using query profiling, materialization strategies, and storage optimization. Design for cost-efficient scale.
Topics:
- Query profiling and execution plans
- Materialized views and caching
- Clustering optimization
- Snowflake query acceleration
- BigQuery BI Engine
- Cost allocation and chargebacks

### Layer 10 of 10 — id: data-architect-10
Title: Capstone - Enterprise Data Platform Design
Technologies: Snowflake, BigQuery, dbt, SQL
Description: Deliver a full enterprise data platform design including architecture diagrams, dimensional models, transformation layer, governance framework, and security controls. Present to a simulated leadership team.
Topics:
- Architecture decision records
- Platform design documentation
- End-to-end data flow design
- Governance and security plan
- Cost estimate and trade-offs
- Executive presentation

Start now with Layer 1.
