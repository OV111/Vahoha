You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "ML Analyst" (ml-analyst, category datascience). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: ml-analyst-1
Title: Python and Analytics Environment Setup
Technologies: Python, Jupyter, Anaconda, pip
Description: Configure a Python analytics environment and learn the foundational Python skills needed for machine learning analysis. Understand package management and notebook-based workflows.
Topics:
- Virtual environments
- Jupyter notebooks
- Python data types and control flow
- Functions and modules
- List comprehensions
- File I/O

### Layer 2 of 10 — id: ml-analyst-2
Title: Data Manipulation with Pandas
Technologies: Pandas, NumPy, Python, CSV
Description: Manipulate structured datasets using Pandas DataFrames for the kinds of data preparation tasks ML analysis requires. Understand vectorized operations and efficient data handling.
Topics:
- DataFrame operations
- Merging and reshaping
- GroupBy and aggregation
- Apply and map
- Handling missing values
- Time series indexing

### Layer 3 of 10 — id: ml-analyst-3
Title: Exploratory Data Analysis and Visualization
Technologies: Pandas, Matplotlib, Seaborn, Python
Description: Systematically explore datasets to uncover distributions, correlations, and anomalies that guide feature selection and model design. Build publication-quality charts for analysis reports.
Topics:
- Univariate and bivariate analysis
- Correlation analysis
- Pair plots
- Box plots and outliers
- Feature importance intuition
- EDA reporting

### Layer 4 of 10 — id: ml-analyst-4
Title: Feature Engineering and Preprocessing
Technologies: Scikit-learn, Pandas, Python, NumPy
Description: Transform raw features into representations that improve ML model performance. Build reusable Scikit-learn pipelines that handle encoding, scaling, and imputation consistently.
Topics:
- Label and one-hot encoding
- StandardScaler and MinMaxScaler
- Imputation strategies
- Feature selection with variance and correlation
- Pipelines with ColumnTransformer
- Train-test split

### Layer 5 of 10 — id: ml-analyst-5
Title: Supervised Learning Fundamentals
Technologies: Scikit-learn, Python, Pandas, NumPy
Description: Train and evaluate core supervised learning models for both regression and classification analysis tasks. Understand the bias-variance tradeoff and cross-validation as evaluation strategy.
Topics:
- Linear and logistic regression
- Decision trees
- Cross-validation
- Bias-variance tradeoff
- Evaluation metrics (MSE, accuracy, F1)
- Overfitting and regularization

### Layer 6 of 10 — id: ml-analyst-6
Title: Ensemble Methods and Model Selection
Technologies: Scikit-learn, Python, XGBoost, Matplotlib
Description: Apply ensemble learning techniques to improve predictive performance and use systematic hyperparameter tuning to optimize models. Compare models using robust evaluation frameworks.
Topics:
- Random forests
- Gradient boosting and XGBoost
- GridSearchCV and RandomizedSearchCV
- Learning curves
- Feature importance
- Model comparison

### Layer 7 of 10 — id: ml-analyst-7
Title: Model Interpretability and Explainability
Technologies: Scikit-learn, SHAP, LIME, Matplotlib
Description: Explain model predictions to business stakeholders using SHAP values, partial dependence plots, and feature importance. Translate technical ML outputs into actionable business language.
Topics:
- SHAP values and summary plots
- LIME explanations
- Partial dependence plots
- Feature importance comparison
- Individual prediction explanations
- Communicating model insights

### Layer 8 of 10 — id: ml-analyst-8
Title: Unsupervised Analysis and Clustering
Technologies: Scikit-learn, Python, Pandas, Matplotlib
Description: Use clustering and dimensionality reduction to find hidden structure in unlabeled data for analytical purposes. Profile clusters in business terms and visualize high-dimensional data.
Topics:
- K-Means and DBSCAN
- Hierarchical clustering
- Silhouette and elbow analysis
- PCA for visualization
- t-SNE for exploration
- Cluster profiling and naming

### Layer 9 of 10 — id: ml-analyst-9
Title: Regression Analysis and Forecasting
Technologies: Scikit-learn, Statsmodels, Python, Pandas
Description: Apply regression models and time series methods for business forecasting and trend analysis. Validate forecast accuracy and communicate uncertainty with confidence intervals.
Topics:
- Polynomial and regularized regression
- ARIMA time series
- Prophet forecasting
- Forecast evaluation (MAPE, RMSE)
- Residual diagnostics
- Scenario forecasting

### Layer 10 of 10 — id: ml-analyst-10
Title: Capstone - ML Analysis Project
Technologies: Scikit-learn, Pandas, Matplotlib, Python
Description: Deliver a complete ML analysis project from problem definition through model building, interpretation, and stakeholder reporting. Document methodology, findings, and business recommendations.
Topics:
- Problem framing
- Full ML pipeline
- Model selection and tuning
- SHAP explanations
- Business recommendation writing
- Presentation and documentation

Start now with Layer 1.
