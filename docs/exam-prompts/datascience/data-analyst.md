You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Data Analyst" (data-analyst, category datascience). It has 10 layers, listed at the bottom.

## HOW TO ANSWER
Write the bank for ONE layer per reply, in the order listed. Each reply must contain exactly 60 questions for that layer. After each reply, stop and wait; I will type "next".

## OUTPUT FORMAT — follow exactly
First line of EVERY reply, including every reply after "next": the layer marker, exactly like this, with the layer id from the list. A reply without it is thrown away by the importer.
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
5. LENGTH BIAS IS THE MOST COMMON FAILURE, and earlier banks failed it badly (the correct answer was the longest choice in up to 95% of questions, so learners passed by picking the longest). Follow this plan exactly. Number the questions 1 to 60; the position of question N in a cycle of 4 fixes how long its CORRECT choice is compared with its three wrong choices:
   - N = 1, 5, 9, ...: the correct choice is the SHORTEST of the four.
   - N = 2, 6, 10, ...: the correct choice is the second shortest.
   - N = 3, 7, 11, ...: the correct choice is the second longest.
   - N = 4, 8, 12, ...: the correct choice is the LONGEST of the four.
   Write the wrong choices with the same level of detail, specific terms and qualifiers as the right one; never make the right one the only careful, hedged or complete-sounding choice. Wrong choices must sound like a real technical claim, never absurd ("compiles HTML into machine code").
6. Spread "answerIdx" evenly across 0, 1, 2 and 3 (about 15 each). Do not put the answer at index 0 or 1 most of the time.
7. Difficulty mix per layer: about one third easy, half medium, the rest hard.
8. Cover every topic of the layer, roughly evenly. Never repeat or rephrase a question within the layer.
9. Each question must stand alone: no "see the diagram", no references to earlier questions. Short code snippets inside the stem are fine (use plain text, \n for line breaks, no markdown fences inside the JSON strings).
10. Stay accurate for current stable versions of the technologies. Avoid questions whose answer changed recently or is opinion.
11. Escape quotes properly so the JSON parses. No trailing commas, no comments.

## CHECK BEFORE YOU SEND EACH REPLY
Silently verify all of these, and fix the reply until every one holds. Do not print the check.
- The first line is LAYER: <the right layer id>.
- The array has exactly 60 questions.
- Count the questions whose correct choice is the longest of its four: at most 15. If more, lengthen wrong choices or shorten the right one until it holds.
- Each answerIdx value (0, 1, 2, 3) appears about 15 times.

## LAYERS
### Layer 1 of 10 — id: data-analyst-1
Title: Spreadsheet and Data Fundamentals
Technologies: Excel, Google Sheets, CSV, Basic Statistics
Description: Learn to organize, clean, and summarize data using spreadsheets. Understand core statistical concepts like mean, median, variance, and distributions.
Topics:
- Cell formulas and functions
- Pivot tables
- Data types and formats
- Descriptive statistics
- Sorting and filtering
- Basic charting

### Layer 2 of 10 — id: data-analyst-2
Title: SQL for Data Analysis
Technologies: SQL, PostgreSQL, SQLite
Description: Write queries to extract, filter, and aggregate data from relational databases. Learn JOINs, subqueries, and window functions for analytical tasks.
Topics:
- SELECT, WHERE, GROUP BY
- JOINs (INNER, LEFT, RIGHT)
- Aggregate functions
- Subqueries and CTEs
- Window functions
- NULL handling

### Layer 3 of 10 — id: data-analyst-3
Title: Python for Data Analysis
Technologies: Python, Pandas, NumPy, Jupyter
Description: Use Python and Pandas to manipulate and explore datasets beyond what spreadsheets can handle. Set up a Jupyter notebook workflow for reproducible analysis.
Topics:
- DataFrames and Series
- Reading CSV, JSON, Excel
- Filtering and indexing
- GroupBy and aggregation
- Handling missing data
- Merging datasets

### Layer 4 of 10 — id: data-analyst-4
Title: Data Cleaning and Wrangling
Technologies: Python, Pandas, OpenRefine, Regex
Description: Apply systematic techniques to detect and fix data quality issues such as duplicates, outliers, and inconsistent formats. Use regular expressions to parse and transform text fields.
Topics:
- Duplicate detection and removal
- Outlier identification
- String normalization
- Date parsing and formatting
- Type casting
- Data validation checks

### Layer 5 of 10 — id: data-analyst-5
Title: Data Visualization with Python
Technologies: Matplotlib, Seaborn, Plotly, Python
Description: Create clear and informative charts that communicate findings to both technical and non-technical audiences. Learn to choose the right chart type for each data relationship.
Topics:
- Line, bar, and scatter charts
- Histograms and box plots
- Heatmaps and correlation plots
- Interactive charts with Plotly
- Chart formatting and annotations
- Color and accessibility

### Layer 6 of 10 — id: data-analyst-6
Title: Tableau for Business Dashboards
Technologies: Tableau, Tableau Public, CSV, SQL
Description: Connect Tableau to data sources and build interactive dashboards that allow stakeholders to explore data without writing code. Learn to design for clarity and usability.
Topics:
- Connecting data sources
- Calculated fields and parameters
- Filters and actions
- Dashboard layout and design
- Maps and geographic data
- Publishing to Tableau Public

### Layer 7 of 10 — id: data-analyst-7
Title: Statistical Analysis and Hypothesis Testing
Technologies: Python, SciPy, Pandas, Statsmodels
Description: Apply inferential statistics to draw conclusions from samples and validate business hypotheses. Understand p-values, confidence intervals, and common statistical tests.
Topics:
- Probability distributions
- t-tests and chi-square tests
- ANOVA
- Correlation and regression basics
- p-values and significance
- A/B test analysis

### Layer 8 of 10 — id: data-analyst-8
Title: Business Metrics and KPI Reporting
Technologies: Python, Pandas, Excel, Tableau
Description: Translate business questions into measurable KPIs and build automated reporting pipelines. Learn to communicate findings through structured reports and executive summaries.
Topics:
- KPI definition frameworks
- Funnel and cohort analysis
- Churn and retention metrics
- Revenue and growth metrics
- Automated report generation
- Executive summary writing

### Layer 9 of 10 — id: data-analyst-9
Title: Advanced SQL and Data Modeling
Technologies: SQL, PostgreSQL, dbt, Data Warehouse
Description: Design dimensional data models and write advanced analytical queries against a data warehouse. Learn star schemas and how dbt is used to manage transformation logic.
Topics:
- Star and snowflake schemas
- Fact and dimension tables
- Advanced window functions
- dbt models and tests
- Query optimization basics
- Data warehouse concepts

### Layer 10 of 10 — id: data-analyst-10
Title: End-to-End Analytics Project
Technologies: Python, Pandas, SQL, Tableau
Description: Deliver a complete analytics project from raw data ingestion through cleaning, analysis, and a stakeholder-facing Tableau dashboard. Document methodology and present findings clearly.
Topics:
- Project scoping and requirements
- Data pipeline design
- EDA and hypothesis formulation
- Dashboard production
- Insight storytelling
- Presentation and documentation

Start now with Layer 1.
