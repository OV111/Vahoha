You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Data Modeler" (data-modeler, category database). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: data-modeler-1
Title: Relational Data Modeling Basics
Technologies: ER Diagrams, SQL, Normalization, ERD tools
Description: Learn the fundamentals of relational data modeling including entities, attributes, and relationships. Draw entity-relationship diagrams and translate them to SQL tables.
Topics:
- Entities and attributes
- Relationships (one-to-one, one-to-many, many-to-many)
- ER diagram notation
- Primary and foreign keys
- Translating ERD to SQL DDL
- Naming conventions

### Layer 2 of 10 — id: data-modeler-2
Title: Normalization Forms
Technologies: SQL, Normalization, Functional Dependencies, 1NF-3NF
Description: Understand the first through third normal forms and how to apply normalization to remove data redundancy and update anomalies. Practice decomposing denormalized tables.
Topics:
- 1NF - eliminating repeating groups
- 2NF - removing partial dependencies
- 3NF - removing transitive dependencies
- Boyce-Codd normal form (BCNF)
- Functional dependency analysis
- When to denormalize

### Layer 3 of 10 — id: data-modeler-3
Title: Advanced ER Modeling
Technologies: ER Modeling, UML, draw.io, Crow's Foot Notation
Description: Apply advanced ER modeling concepts including weak entities, generalization, and specialization hierarchies. Use Crow's Foot and UML notations in professional tools.
Topics:
- Weak entities and identifying relationships
- Generalization and specialization (ISA)
- Aggregation
- Crow's Foot notation
- UML class diagrams for data
- Using draw.io and ERD tools

### Layer 4 of 10 — id: data-modeler-4
Title: Dimensional Modeling for Analytics
Technologies: Star Schema, Snowflake Schema, Fact Tables, Dimension Tables
Description: Design data warehouse schemas using dimensional modeling techniques. Understand fact and dimension tables and choose between star and snowflake schemas.
Topics:
- Fact table design
- Dimension table design
- Star schema vs snowflake schema
- Slowly changing dimensions (SCD Type 1, 2, 3)
- Degenerate dimensions
- Conformed dimensions

### Layer 5 of 10 — id: data-modeler-5
Title: SQL DDL and Schema Implementation
Technologies: SQL, DDL, Constraints, PostgreSQL
Description: Translate data models into production SQL schemas using proper DDL with constraints, defaults, and domain types. Manage schema changes safely.
Topics:
- CREATE TABLE with constraints
- CHECK, UNIQUE, NOT NULL constraints
- DEFAULT values and sequences
- Composite primary keys
- Domain types and enums
- Altering tables in production

### Layer 6 of 10 — id: data-modeler-6
Title: NoSQL and Polyglot Data Modeling
Technologies: MongoDB, DynamoDB, Document Modeling, Access Patterns
Description: Learn how data modeling differs for document, key-value, and wide-column stores. Design schemas driven by access patterns rather than normalization rules.
Topics:
- Access pattern analysis
- Document embedding vs referencing
- DynamoDB single-table design
- Key-value data patterns
- Denormalization strategies
- Hybrid relational and NoSQL models

### Layer 7 of 10 — id: data-modeler-7
Title: Data Integrity and Referential Integrity
Technologies: SQL, Foreign Keys, Triggers, Check Constraints
Description: Enforce data integrity at the database level using foreign key constraints, check constraints, and triggers. Understand cascading actions and deferrable constraints.
Topics:
- Foreign key cascade actions
- Deferrable constraints
- CHECK constraints for business rules
- Triggers for derived data
- Partial and filtered constraints
- Application vs database-level integrity

### Layer 8 of 10 — id: data-modeler-8
Title: Temporal and Historical Data Modeling
Technologies: SQL, Temporal Tables, Bitemporal Modeling, SCD
Description: Model data that changes over time using temporal tables and bitemporal design. Track both valid time and transaction time for full audit history.
Topics:
- Valid time vs transaction time
- Slowly changing dimensions revisited
- Temporal table SQL extensions
- Bitemporal data modeling
- Audit log table patterns
- Event sourcing as a data model

### Layer 9 of 10 — id: data-modeler-9
Title: Schema Migration and Evolution
Technologies: Flyway, Liquibase, SQL, CI/CD
Description: Manage schema changes in a team environment using migration tools. Design schemas that can evolve safely without downtime using expand-contract patterns.
Topics:
- Flyway migration scripts
- Liquibase changesets
- Expand-contract (parallel change) pattern
- Zero-downtime schema changes
- Schema version control
- Rollback strategies

### Layer 10 of 10 — id: data-modeler-10
Title: Enterprise Data Architecture and Governance
Technologies: Data Catalog, Metadata Management, MDM, Data Lineage
Description: Apply data modeling at enterprise scale with canonical data models, master data management, and data governance practices. Document and govern schemas using data catalogs.
Topics:
- Canonical data models
- Master data management (MDM)
- Data catalog tools (Amundsen, DataHub)
- Data lineage tracking
- Schema registries
- Data governance policies

Start now with Layer 1.
