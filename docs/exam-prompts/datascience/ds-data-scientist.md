You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Data Scientist" (ds-data-scientist, category datascience). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: ds-data-scientist-1
Title: Python and Data Science Environment
Technologies: Python, Jupyter, NumPy, Anaconda
Description: Set up a professional data science environment and gain fluency in Python and NumPy for numerical computing. Understand how Jupyter notebooks support exploratory, reproducible analysis workflows.
Topics:
- Anaconda and virtual environments
- Jupyter notebook workflow
- NumPy arrays and operations
- Broadcasting and vectorization
- Slicing and indexing
- Random number generation

### Layer 2 of 10 — id: ds-data-scientist-2
Title: Exploratory Data Analysis
Technologies: Python, Pandas, Seaborn, Matplotlib
Description: Perform systematic EDA to understand distributions, relationships, and anomalies in data before modeling. Use visualization to surface patterns and guide analytical decisions.
Topics:
- Summary statistics
- Distribution analysis
- Correlation matrices
- Pair plots
- Missing value analysis
- Outlier detection
- Feature relationships

### Layer 3 of 10 — id: ds-data-scientist-3
Title: Statistics for Data Science
Technologies: Python, SciPy, Statsmodels, NumPy
Description: Apply probability theory and statistical inference to make data-driven conclusions. Understand sampling, distributions, and hypothesis testing in an analytics context.
Topics:
- Probability and Bayes theorem
- Common distributions
- Central limit theorem
- Confidence intervals
- Hypothesis tests
- p-values and effect sizes

### Layer 4 of 10 — id: ds-data-scientist-4
Title: Data Cleaning and Feature Engineering
Technologies: Python, Pandas, Scikit-learn, NumPy
Description: Transform raw data into analysis-ready features by applying cleaning, encoding, and scaling techniques. Understand how feature quality directly impacts analytical and reporting accuracy.
Topics:
- Imputation strategies
- Encoding categorical variables
- Feature scaling
- Date feature extraction
- Binning and discretization
- Interaction features

### Layer 5 of 10 — id: ds-data-scientist-5
Title: Descriptive Modeling and Segmentation
Technologies: Python, Scikit-learn, Pandas, Matplotlib
Description: Use clustering and dimensionality reduction to segment data and find natural groupings for reporting and targeting. Interpret cluster outputs in business terms for non-technical audiences.
Topics:
- K-Means clustering
- Hierarchical clustering
- Silhouette scores
- PCA for visualization
- Customer segmentation
- Cluster profiling

### Layer 6 of 10 — id: ds-data-scientist-6
Title: Regression Analysis for Forecasting
Technologies: Python, Scikit-learn, Statsmodels, Pandas
Description: Build linear and polynomial regression models to quantify relationships and produce forecasts for business reporting. Diagnose model fit and communicate coefficients as business insights.
Topics:
- Linear regression
- Multiple regression
- Polynomial features
- Residual analysis
- R-squared and MAE
- Confidence intervals for predictions

### Layer 7 of 10 — id: ds-data-scientist-7
Title: Classification for Analytical Reporting
Technologies: Python, Scikit-learn, Pandas, Matplotlib
Description: Train classification models to support analytical use cases like churn prediction and lead scoring for reporting dashboards. Evaluate models with appropriate metrics for imbalanced datasets.
Topics:
- Logistic regression
- Decision trees
- Random forests
- Precision, recall, F1
- ROC and AUC
- Confusion matrix interpretation
- Class imbalance handling

### Layer 8 of 10 — id: ds-data-scientist-8
Title: Time Series Analysis
Technologies: Python, Pandas, Statsmodels, Prophet
Description: Analyze time-indexed data to identify trends, seasonality, and anomalies for business reporting. Build forecasting models and visualize projections with uncertainty bands.
Topics:
- Resampling and rolling windows
- Trend and seasonality decomposition
- Autocorrelation
- ARIMA modeling
- Prophet forecasting
- Anomaly detection in time series

### Layer 9 of 10 — id: ds-data-scientist-9
Title: Reporting Pipelines and Automation
Technologies: Python, Pandas, Jupyter, Jinja2
Description: Automate recurring analysis and report generation so stakeholders receive fresh insights without manual effort. Use parameterized notebooks and templated HTML or PDF outputs.
Topics:
- Parameterized Jupyter notebooks
- Scheduled script execution
- Jinja2 report templates
- HTML and PDF report output
- Email delivery of reports
- Data refresh patterns

### Layer 10 of 10 — id: ds-data-scientist-10
Title: Capstone - Analytics Reporting Project
Technologies: Python, Scikit-learn, Pandas, Jupyter
Description: Deliver a complete data science project scoped to a business analytics use case: from EDA and modeling through automated reporting and stakeholder presentation. Demonstrate the full analytics lifecycle.
Topics:
- Problem scoping
- End-to-end EDA
- Model selection and evaluation
- Insight narrative writing
- Automated report delivery
- Stakeholder presentation

Start now with Layer 1.
