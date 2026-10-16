You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Data Scientist" (data-scientist, category aiml). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: data-scientist-1
Title: Python for Data Science
Technologies: Python, Jupyter, pip
Description: Python is the language of data science. Get fluent in the core language and the notebook workflow you'll use daily.
Topics:
- Python syntax, types & functions
- Lists, dicts & comprehensions
- Working in Jupyter notebooks
- Virtual environments & pip
- File & data I/O
- Pythonic idioms

### Layer 2 of 10 — id: data-scientist-2
Title: NumPy & Pandas
Technologies: NumPy, Pandas, DataFrames
Description: Master the two libraries at the heart of data work. Vectorize computations with NumPy and wrangle tables with Pandas.
Topics:
- NumPy arrays & broadcasting
- Vectorized operations
- Pandas Series & DataFrames
- Indexing, filtering & selection
- GroupBy & aggregation
- Merging & joining data

### Layer 3 of 10 — id: data-scientist-3
Title: Data Cleaning & Wrangling
Technologies: Cleaning, Missing Data, ETL
Description: Real data is messy. Learn to handle missing values, outliers and inconsistent formats to produce analysis-ready datasets.
Topics:
- Handling missing values
- Outlier detection & treatment
- Type conversion & parsing dates
- Deduplication & normalization
- Reshaping — pivot, melt
- Combining multiple sources

### Layer 4 of 10 — id: data-scientist-4
Title: EDA & Visualization
Technologies: Matplotlib, Seaborn, EDA
Description: Understand your data before modeling. Explore distributions and relationships and communicate them with clear visuals.
Topics:
- Exploratory data analysis workflow
- Matplotlib fundamentals
- Statistical plots with Seaborn
- Distributions & correlations
- Choosing the right chart
- Interactive plots (Plotly)

### Layer 5 of 10 — id: data-scientist-5
Title: Statistics & Probability
Technologies: Statistics, Probability, Inference
Description: Statistics is the foundation of sound conclusions. Learn the concepts that separate real signal from noise.
Topics:
- Descriptive statistics
- Probability distributions
- Sampling & the central limit theorem
- Hypothesis testing & p-values
- Confidence intervals
- Correlation vs causation

### Layer 6 of 10 — id: data-scientist-6
Title: SQL & Data Sources
Technologies: SQL, Databases, APIs
Description: Most data lives in databases. Learn to extract and join it with SQL and pull from APIs.
Topics:
- SQL SELECT, JOIN & GROUP BY
- Window functions for analytics
- Connecting Python to databases
- Pulling data from REST APIs
- Web scraping basics
- Working with large datasets

### Layer 7 of 10 — id: data-scientist-7
Title: Machine Learning Foundations
Technologies: Scikit-learn, Regression, Classification
Description: Start predicting. Learn the core supervised learning algorithms with scikit-learn and how to apply them.
Topics:
- Supervised vs unsupervised learning
- Linear & logistic regression
- Decision trees & random forests
- Train/test split & cross-validation
- The scikit-learn API
- Clustering basics (k-means)

### Layer 8 of 10 — id: data-scientist-8
Title: Model Evaluation & Features
Technologies: Metrics, Feature Engineering, Tuning
Description: Good models come from good features and honest evaluation. Learn to measure, tune and improve performance.
Topics:
- Classification & regression metrics
- Confusion matrix, ROC & AUC
- Feature engineering & selection
- Handling imbalanced data
- Hyperparameter tuning
- Avoiding leakage & overfitting

### Layer 9 of 10 — id: data-scientist-9
Title: Communicating Insights
Technologies: Storytelling, Dashboards, Notebooks
Description: An insight no one understands has no value. Learn to communicate findings to stakeholders clearly.
Topics:
- Data storytelling
- Building clear notebooks & reports
- Dashboards (Streamlit / Tableau)
- Choosing metrics that matter
- Presenting to non-technical audiences
- Reproducible analysis

### Layer 10 of 10 — id: data-scientist-10
Title: Capstone & Deployment
Technologies: End-to-End, FastAPI, MLflow
Description: Bring it together. Run a full project from question to deployed model and a reproducible pipeline.
Topics:
- Framing a data science problem
- End-to-end project workflow
- Tracking experiments with MLflow
- Serving a model with FastAPI
- Reproducibility & environments
- Documenting & sharing results

Start now with Layer 1.
