You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Data Engineer" (ds-data-engineer, category datascience). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: ds-data-engineer-1
Title: Data Engineering Fundamentals
Technologies: SQL, Python, CSV, Data Warehousing Concepts
Description: Understand the data engineering role and how data flows from source systems into a data warehouse. Learn the distinction between OLTP and OLAP systems and the layers of a modern data stack.
Topics:
- OLTP vs OLAP
- ETL vs ELT patterns
- Data warehouse concepts
- Batch vs streaming
- Data lake vs data warehouse
- Modern data stack overview

### Layer 2 of 10 — id: ds-data-engineer-2
Title: SQL and Dimensional Modeling
Technologies: SQL, PostgreSQL, Data Vault, Star Schema
Description: Design dimensional models and write the advanced SQL needed to populate fact and dimension tables in a warehouse. Master slowly changing dimensions and surrogate key patterns.
Topics:
- Star and snowflake schemas
- Fact and dimension tables
- Slowly changing dimensions
- Surrogate keys
- Bridge tables
- Window functions for ETL

### Layer 3 of 10 — id: ds-data-engineer-3
Title: Python for Data Pipelines
Technologies: Python, Pandas, SQLAlchemy, Psycopg2
Description: Write Python scripts that extract data from files and APIs, transform it, and load it into a relational database. Apply software engineering practices like logging, error handling, and modular design.
Topics:
- Reading flat files and APIs
- Pandas transformations
- SQLAlchemy ORM basics
- Bulk inserts and upserts
- Logging and error handling
- Configuration management

### Layer 4 of 10 — id: ds-data-engineer-4
Title: Cloud Data Warehouses
Technologies: BigQuery, Snowflake, Redshift, SQL
Description: Provision and query cloud data warehouse platforms and understand their cost and performance models. Learn to load data efficiently and manage users and schemas.
Topics:
- BigQuery architecture and pricing
- Snowflake virtual warehouses
- Loading data from cloud storage
- Partitioning and clustering
- User and role management
- Query cost optimization

### Layer 5 of 10 — id: ds-data-engineer-5
Title: dbt for Data Transformation
Technologies: dbt, SQL, Jinja, YAML
Description: Use dbt to build modular, tested, and documented SQL transformation pipelines inside a data warehouse. Understand dbt project structure, ref() patterns, and lineage graphs.
Topics:
- dbt project structure
- Models and ref()
- Sources and staging
- Tests and documentation
- Materializations
- Incremental models

### Layer 6 of 10 — id: ds-data-engineer-6
Title: Workflow Orchestration with Airflow
Technologies: Airflow, Python, DAGs, Cron
Description: Orchestrate multi-step data warehouse pipelines with Apache Airflow DAGs. Schedule, monitor, and retry tasks to ensure reliable nightly and intraday loads.
Topics:
- DAG definition and structure
- Operators (Python, Bash, SQL)
- Task dependencies
- Scheduling with cron
- XComs and task communication
- Monitoring and alerting

### Layer 7 of 10 — id: ds-data-engineer-7
Title: Spark for Batch Processing
Technologies: Spark, PySpark, HDFS, Parquet
Description: Use Apache Spark to process large datasets in batch for data warehouse loading at scale. Understand the Spark execution model, DataFrames API, and columnar file formats.
Topics:
- Spark architecture
- PySpark DataFrames
- Transformations and actions
- Reading and writing Parquet
- Partitioning strategies
- Spark on cloud (Dataproc, EMR)

### Layer 8 of 10 — id: ds-data-engineer-8
Title: Data Quality and Testing
Technologies: dbt, Great Expectations, SQL, Python
Description: Implement automated data quality checks at each layer of the pipeline to catch issues before they affect reports. Use Great Expectations and dbt tests to enforce contracts on data.
Topics:
- dbt schema tests
- dbt singular tests
- Great Expectations suites
- Row count and freshness checks
- Data contracts
- Alerting on failures

### Layer 9 of 10 — id: ds-data-engineer-9
Title: Incremental Loads and CDC
Technologies: dbt, SQL, Fivetran, Debezium
Description: Design efficient incremental loading patterns to keep warehouse tables fresh without reprocessing entire datasets. Understand change data capture as a source of warehouse updates.
Topics:
- Incremental dbt models
- High-watermark patterns
- Change data capture concepts
- Fivetran and data loaders
- Merge and upsert strategies
- Backfill patterns

### Layer 10 of 10 — id: ds-data-engineer-10
Title: Capstone - Data Warehouse Pipeline
Technologies: Spark, Airflow, dbt, BigQuery
Description: Deliver a production-grade data warehouse pipeline that ingests raw data, applies transformations through dbt layers, enforces data quality, and serves a reporting-ready mart. Document the design and deploy with orchestration.
Topics:
- End-to-end pipeline design
- Ingestion with Spark or Python
- dbt staging and mart layers
- Data quality gates
- Airflow orchestration
- Deployment documentation

Start now with Layer 1.
