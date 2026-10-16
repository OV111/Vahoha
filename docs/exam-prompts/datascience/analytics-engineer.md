You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Analytics Engineer" (analytics-engineer, category datascience). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: analytics-engineer-1
Title: Analytics Engineering Role and SQL Foundations
Technologies: SQL, PostgreSQL, CSV, Data Warehouse Concepts
Description: Understand where analytics engineering sits between data engineering and data analysis, and the responsibilities it owns. Build the SQL foundation required for robust data transformation work.
Topics:
- Analytics engineering role overview
- Modern data stack context
- SQL SELECT and filtering
- Aggregations and GROUP BY
- JOINs and relationships
- CTEs and subqueries

### Layer 2 of 10 — id: analytics-engineer-2
Title: dbt Core Fundamentals
Technologies: dbt, SQL, YAML, Jinja
Description: Set up a dbt project connected to a cloud warehouse and build your first staging and mart models. Understand dbt's compile and run cycle and how ref() creates the lineage graph.
Topics:
- dbt project structure
- Sources and staging models
- ref() and lineage
- Materializations (table, view, incremental)
- dbt run and dbt test
- Schema YAML files

### Layer 3 of 10 — id: analytics-engineer-3
Title: Advanced SQL for Analytics
Technologies: SQL, dbt, BigQuery, Snowflake
Description: Write the advanced SQL patterns used in production analytics engineering: window functions, pivoting, date spines, and complex aggregations. Apply these inside dbt models.
Topics:
- Window functions (LAG, LEAD, RANK)
- Date spines and series generation
- Pivoting and unpivoting
- Sessionization logic
- Funnel queries
- Recursive CTEs

### Layer 4 of 10 — id: analytics-engineer-4
Title: dbt Testing, Documentation, and Data Contracts
Technologies: dbt, YAML, Great Expectations, SQL
Description: Implement a comprehensive testing strategy across dbt model layers to enforce data quality guarantees for downstream consumers. Write dbt documentation that serves as a living data dictionary.
Topics:
- Schema tests (unique, not-null, accepted-values)
- Singular SQL tests
- Custom generic tests
- dbt docs generate
- Data freshness tests
- Source freshness

### Layer 5 of 10 — id: analytics-engineer-5
Title: Looker and LookML Fundamentals
Technologies: Looker, LookML, SQL, JSON
Description: Define a semantic layer in Looker using LookML views, dimensions, and measures that enable self-service analytics for business users. Understand Explores and the Looker data modeling philosophy.
Topics:
- LookML views and fields
- Dimensions and measures
- Explores and joins
- Derived tables in LookML
- Filters and parameters
- Dashboards in Looker

### Layer 6 of 10 — id: analytics-engineer-6
Title: Incremental Models and Performance
Technologies: dbt, SQL, Snowflake, BigQuery
Description: Design and implement incremental dbt models that process only new or changed data to keep warehouse costs low and tables fresh. Understand merge strategies and idempotency.
Topics:
- Incremental model strategies (append, merge, delete-insert)
- Unique keys and merge logic
- Backfill patterns
- Partition pruning alignment
- Testing incremental models
- Cost impact

### Layer 7 of 10 — id: analytics-engineer-7
Title: Airflow for Analytics Orchestration
Technologies: Airflow, dbt, Python, DAGs
Description: Orchestrate dbt project runs and surrounding data tasks with Apache Airflow DAGs. Manage dependencies between ingestion jobs, dbt runs, and downstream exports reliably.
Topics:
- Airflow DAG structure
- DbtRunOperator patterns
- Task dependencies
- Retry and alerting
- Parameterized DAGs
- dbt Cloud API integration

### Layer 8 of 10 — id: analytics-engineer-8
Title: Semantic Layer and Metric Definitions
Technologies: dbt, dbt Semantic Layer, MetricFlow, SQL
Description: Define business metrics centrally in the dbt semantic layer using MetricFlow so that every tool in the stack computes them consistently. Understand dimension and measure grain.
Topics:
- dbt metrics and MetricFlow
- Measure and dimension grain
- Time grain configurations
- Metric filtering
- Semantic layer querying
- Governance of metric definitions

### Layer 9 of 10 — id: analytics-engineer-9
Title: CI/CD and Analytics Engineering Best Practices
Technologies: dbt, GitHub Actions, dbt Cloud, YAML
Description: Apply software engineering practices to analytics code: version control, code review, automated testing in CI, and deployment pipelines. Ensure production dbt changes are safe and auditable.
Topics:
- Git branching for analytics
- dbt Cloud CI jobs
- GitHub Actions for dbt
- Slim CI with state comparison
- Code review for SQL
- Deployment environments

### Layer 10 of 10 — id: analytics-engineer-10
Title: Capstone - Production Analytics Platform
Technologies: dbt, SQL, Looker, Airflow
Description: Build and deploy a production analytics engineering stack: dbt project with staging and mart layers, semantic layer metrics, Looker explores and dashboard, and Airflow orchestration. Document for team handoff.
Topics:
- End-to-end dbt project
- Semantic layer metrics
- Looker dashboard delivery
- Orchestration setup
- CI/CD pipeline
- Documentation and handoff

Start now with Layer 1.
