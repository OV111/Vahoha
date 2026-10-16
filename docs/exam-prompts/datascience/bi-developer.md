You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "BI Developer" (bi-developer, category datascience). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: bi-developer-1
Title: BI Fundamentals and Data Concepts
Technologies: SQL, Excel, CSV, Data Warehouse Concepts
Description: Understand the role of BI in organizations and how data flows from operational systems to reporting tools. Learn the vocabulary of data warehousing and dimensional modeling.
Topics:
- OLAP vs OLTP
- Dimensional modeling basics
- Star schema overview
- Measures vs dimensions
- KPI definition
- BI tool landscape

### Layer 2 of 10 — id: bi-developer-2
Title: SQL for BI Reporting
Technologies: SQL, PostgreSQL, Redshift, BigQuery
Description: Write the complex SQL queries needed to extract, aggregate, and prepare data for BI tool consumption. Master window functions, CTEs, and analytical functions.
Topics:
- Aggregate functions
- Window functions
- CTEs and subqueries
- Date functions
- CASE expressions
- Query optimization

### Layer 3 of 10 — id: bi-developer-3
Title: Power BI Desktop Essentials
Technologies: Power BI, Power Query, DAX, CSV
Description: Connect Power BI Desktop to data sources, shape data with Power Query, and build your first reports. Understand the Power BI data model and relationship engine.
Topics:
- Connecting data sources
- Power Query transformations
- Data model and relationships
- Building visuals
- Filters and slicers
- Report formatting

### Layer 4 of 10 — id: bi-developer-4
Title: DAX Fundamentals
Technologies: DAX, Power BI, Power Pivot
Description: Write DAX measures and calculated columns to create business metrics that go beyond what raw data provides. Understand filter context and row context - the core concepts behind DAX.
Topics:
- Measures vs calculated columns
- SUM, AVERAGE, COUNT
- Filter context
- CALCULATE and filters
- Time intelligence basics
- RELATED and RELATEDTABLE

### Layer 5 of 10 — id: bi-developer-5
Title: Advanced DAX and Data Modeling
Technologies: DAX, Power BI, Tabular Model, SSAS
Description: Apply advanced DAX patterns for complex business scenarios like dynamic segmentation, pareto analysis, and many-to-many relationships. Optimize data models for large datasets.
Topics:
- ALLSELECTED and context transition
- Many-to-many relationships
- Dynamic segmentation
- Pareto and ABC analysis
- Role-playing dimensions
- Model optimization

### Layer 6 of 10 — id: bi-developer-6
Title: Tableau for BI Dashboards
Technologies: Tableau, Tableau Server, SQL, Extracts
Description: Build production Tableau dashboards connected to live or extracted data sources and design for self-service analytics. Learn calculated fields, LOD expressions, and set actions.
Topics:
- Live vs extract connections
- LOD expressions
- Table calculations
- Set actions and parameter actions
- Dashboard design patterns
- Performance optimization

### Layer 7 of 10 — id: bi-developer-7
Title: BI Publishing and Governance
Technologies: Power BI Service, Tableau Server, Row-Level Security, Workspaces
Description: Publish reports to cloud BI platforms, configure row-level security, and manage workspaces for governed self-service analytics. Understand refresh schedules and capacity management.
Topics:
- Power BI Service workspaces
- Dataset refresh scheduling
- Row-level security
- Apps and distribution
- Endorsement and certification
- Audit logs

### Layer 8 of 10 — id: bi-developer-8
Title: Data Storytelling and Dashboard Design
Technologies: Power BI, Tableau, Figma, Color Theory
Description: Apply data visualization best practices and design principles to produce dashboards that communicate clearly and drive action. Learn layout, typography, color, and narrative flow.
Topics:
- Pre-attentive attributes
- Chart selection guide
- Color accessibility
- Dashboard layout patterns
- Annotation and callouts
- Narrative and executive summary design

### Layer 9 of 10 — id: bi-developer-9
Title: Performance Tuning and Large Data
Technologies: Power BI, DAX Studio, VertiPaq Analyzer, SQL
Description: Diagnose and fix slow Power BI reports and Tableau dashboards using profiling tools. Understand columnar storage, aggregations, and query folding to optimize at scale.
Topics:
- DAX Studio query analysis
- VertiPaq model inspection
- Query folding in Power Query
- Aggregation tables
- Tableau performance recorder
- Index optimization

### Layer 10 of 10 — id: bi-developer-10
Title: Capstone - Enterprise BI Solution
Technologies: Power BI, Tableau, SQL, DAX
Description: Deliver a full enterprise BI solution: model the data, build semantic layer measures, design multi-page dashboards, configure security, and present to a mock stakeholder group.
Topics:
- Requirements gathering
- Data model design
- Semantic layer build
- Multi-page dashboard development
- Security configuration
- Stakeholder presentation

Start now with Layer 1.
