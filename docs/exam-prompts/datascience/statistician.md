You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Statistician" (statistician, category datascience). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: statistician-1
Title: Statistical Foundations and R Environment
Technologies: R, RStudio, base R, R Markdown
Description: Set up an R development environment and learn the foundational statistical concepts that underpin all quantitative analysis. Understand data types, probability, and the R language syntax.
Topics:
- R syntax and data types
- Vectors, lists, and data frames
- Probability fundamentals
- Descriptive statistics
- Frequency distributions
- R Markdown for reports

### Layer 2 of 10 — id: statistician-2
Title: Probability Distributions and Sampling
Technologies: R, Python, SciPy, stats package
Description: Master the probability distributions most commonly encountered in statistical practice and understand the central limit theorem. Simulate sampling distributions to build intuition.
Topics:
- Normal, binomial, Poisson distributions
- Sampling distributions
- Central limit theorem
- Law of large numbers
- Quantiles and percentiles
- Monte Carlo simulation

### Layer 3 of 10 — id: statistician-3
Title: Inferential Statistics and Hypothesis Testing
Technologies: R, Python, SciPy, Statsmodels
Description: Apply inferential statistics to draw conclusions from sample data and test business and scientific hypotheses rigorously. Control Type I and Type II errors with appropriate test selection.
Topics:
- Null and alternative hypotheses
- t-tests (one-sample, two-sample, paired)
- Chi-square tests
- ANOVA
- p-values and significance levels
- Effect sizes and power

### Layer 4 of 10 — id: statistician-4
Title: Regression Analysis
Technologies: R, Python, Statsmodels, ggplot2
Description: Build and interpret simple and multiple regression models, checking all assumptions rigorously. Apply transformations and diagnostics to handle violations.
Topics:
- Simple linear regression
- Multiple regression
- Assumption checking (LINE)
- Residual diagnostics
- Influential observations
- Polynomial and interaction terms

### Layer 5 of 10 — id: statistician-5
Title: Experimental Design and A/B Testing
Technologies: R, Python, SciPy, Power Analysis
Description: Design statistically valid experiments and analyze results with appropriate tests. Compute required sample sizes and manage multiple comparison problems.
Topics:
- Randomization and control
- Sample size and power calculation
- Factorial designs
- A/B and A/A tests
- Multiple comparisons (Bonferroni, FDR)
- Sequential testing

### Layer 6 of 10 — id: statistician-6
Title: Bayesian Statistics
Technologies: R, Python, PyMC, Stan
Description: Apply Bayesian reasoning to statistical inference, expressing uncertainty through posterior distributions rather than binary reject/fail-to-reject decisions. Use MCMC sampling for complex models.
Topics:
- Bayes theorem
- Prior, likelihood, and posterior
- Conjugate priors
- MCMC fundamentals
- Credible intervals
- Bayesian A/B testing

### Layer 7 of 10 — id: statistician-7
Title: Multivariate Statistics
Technologies: R, Python, Scikit-learn, FactoMineR
Description: Apply multivariate methods to datasets with many variables, reducing dimensionality and uncovering latent structure. Use PCA, factor analysis, and MANOVA for statistical analysis.
Topics:
- Principal component analysis
- Factor analysis
- Cluster analysis
- MANOVA
- Discriminant analysis
- Canonical correlation

### Layer 8 of 10 — id: statistician-8
Title: Time Series and Forecasting
Technologies: R, Python, forecast package, Prophet
Description: Analyze time-indexed data using classical and modern methods, accounting for trend, seasonality, and autocorrelation. Produce forecasts with formal uncertainty quantification.
Topics:
- Decomposition (STL, classical)
- Stationarity and differencing
- ACF and PACF
- ARIMA identification and fitting
- Exponential smoothing (ETS)
- Model evaluation (AIC, MASE)

### Layer 9 of 10 — id: statistician-9
Title: Survival Analysis and Specialized Methods
Technologies: R, Python, survival package, lifelines
Description: Apply survival analysis to time-to-event data and extend statistical skills to generalized linear models for non-normal outcomes. Handle censored data correctly.
Topics:
- Kaplan-Meier estimator
- Log-rank test
- Cox proportional hazards
- GLMs (logistic, Poisson, negative binomial)
- Censoring mechanisms
- Survival curve interpretation

### Layer 10 of 10 — id: statistician-10
Title: Capstone - Statistical Consulting Project
Technologies: R, Python, SPSS, SAS
Description: Deliver a complete statistical analysis project mimicking a consulting engagement: define the research question, select methods, conduct analysis, validate assumptions, and present findings in a formal statistical report.
Topics:
- Research question formulation
- Study design review
- Full statistical analysis
- Assumption validation
- Results interpretation
- Formal statistical report writing

Start now with Layer 1.
