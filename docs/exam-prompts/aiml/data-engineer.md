You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Data Engineer" (data-engineer, category aiml). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: data-engineer-1
Title: Data Engineering Foundations
Technologies: Python, Linux, Data
Description: Data engineers build the pipelines that power analytics and ML. Start with the fundamentals and the big picture.
Topics:
- What data engineering is
- OLTP vs OLAP
- Batch vs streaming
- The modern data stack
- Linux & the command line
- File formats — CSV, Parquet, Avro

### Layer 2 of 10 — id: data-engineer-2
Title: SQL & Data Modeling
Technologies: SQL, Modeling, Warehousing
Description: SQL and data modeling are the core craft. Learn to model data for analytics at scale.
Topics:
- Advanced SQL & window functions
- Dimensional modeling (star schema)
- Normalization vs denormalization
- Slowly changing dimensions
- Fact & dimension tables
- Query performance

### Layer 3 of 10 — id: data-engineer-3
Title: Python for Data Engineering
Technologies: Python, Pandas, APIs
Description: Python glues data systems together. Build ingestion scripts and transformations that move data reliably.
Topics:
- Python for ETL
- Working with Pandas & Polars
- Connecting to databases & APIs
- Handling large files & memory
- Error handling & retries
- Packaging & scheduling scripts

### Layer 4 of 10 — id: data-engineer-4
Title: Batch Processing with Spark
Technologies: Spark, PySpark, Distributed
Description: Process data at scale. Learn distributed computing with Apache Spark for big batch jobs.
Topics:
- Distributed computing concepts
- Spark architecture & RDDs
- DataFrames & Spark SQL
- Transformations & actions
- Partitioning & shuffles
- Performance tuning

### Layer 5 of 10 — id: data-engineer-5
Title: Streaming with Kafka
Technologies: Kafka, Streaming, Events
Description: Handle data in motion. Build real-time pipelines with Apache Kafka and stream processing.
Topics:
- Kafka architecture — topics & partitions
- Producers & consumers
- Consumer groups & offsets
- Stream processing (Kafka Streams / Flink)
- Delivery guarantees
- Schema registry

### Layer 6 of 10 — id: data-engineer-6
Title: Orchestration with Airflow
Technologies: Airflow, DAGs, Scheduling
Description: Coordinate complex pipelines. Schedule, monitor and retry workflows with Apache Airflow.
Topics:
- DAGs, tasks & operators
- Scheduling & backfills
- Dependencies & sensors
- Retries & SLAs
- XComs & parameterization
- Monitoring & alerting

### Layer 7 of 10 — id: data-engineer-7
Title: Data Warehousing & dbt
Technologies: dbt, Warehouse, SQL
Description: Transform data where it lives. Use dbt to build tested, documented, version-controlled transformations.
Topics:
- Cloud warehouses (Snowflake, BigQuery)
- ELT vs ETL
- dbt models & materializations
- Tests & documentation
- Incremental models
- Lineage & DAGs in dbt

### Layer 8 of 10 — id: data-engineer-8
Title: Data Lakes & Lakehouse
Technologies: S3, Delta Lake, Iceberg
Description: Store everything affordably and query it flexibly. Learn data lake and lakehouse architectures.
Topics:
- Object storage & data lakes
- File formats & partitioning
- Table formats — Delta, Iceberg, Hudi
- The lakehouse architecture
- Schema evolution & time travel
- Query engines (Trino, DuckDB)

### Layer 9 of 10 — id: data-engineer-9
Title: Data Quality & Governance
Technologies: Quality, Lineage, Catalog
Description: Trustworthy data needs quality and governance. Add validation, lineage and cataloging to your pipelines.
Topics:
- Data quality testing
- Great Expectations / dbt tests
- Data lineage & catalogs
- Observability for data
- Access control & PII handling
- SLAs & data contracts

### Layer 10 of 10 — id: data-engineer-10
Title: Deployment & Scaling
Technologies: Docker, Terraform, Cloud
Description: Run data platforms in production. Containerize, provision infrastructure as code, and scale.
Topics:
- Dockerizing data jobs
- Infrastructure as code (Terraform)
- CI/CD for data pipelines
- Cost optimization
- Scaling compute & storage
- Monitoring & on-call

Start now with Layer 1.
