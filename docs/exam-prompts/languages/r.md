You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "R" (r, category languages). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: r-1
Title: R Syntax and Basics
Technologies: R, RStudio, CRAN, renv
Description: Learn R syntax, vectors, data types, and how to set up a reproducible project environment with renv and RStudio.
Topics:
- Vectors, lists, and atomic types
- Control flow (if/for/while/repeat)
- Functions and scoping rules
- Installing and loading packages
- renv for reproducible environments
- Working directory and RStudio projects

### Layer 2 of 10 — id: r-2
Title: Data Structures and Manipulation
Technologies: R, data.frame, tibble, matrix
Description: Master R's core data structures — vectors, matrices, lists, and data frames — and learn to index, subset, and transform them efficiently.
Topics:
- Matrices and array indexing
- Named lists and nested structures
- data.frame creation and subsetting
- Factors and ordered factors
- Type coercion and NA handling
- apply family (lapply, sapply, vapply)

### Layer 3 of 10 — id: r-3
Title: Data Wrangling with tidyverse
Technologies: dplyr, tidyr, readr, stringr
Description: Use the tidyverse suite to import, reshape, filter, and summarise real-world datasets with readable pipe-based workflows.
Topics:
- filter, select, mutate, arrange, summarise
- group_by and grouped operations
- pivot_longer and pivot_wider
- Joining tables (left_join, inner_join)
- String manipulation with stringr
- Reading CSVs and Excel files with readr/readxl

### Layer 4 of 10 — id: r-4
Title: Data Visualization with ggplot2
Technologies: ggplot2, scales, ggthemes, patchwork
Description: Build publication-quality graphics using ggplot2's grammar of graphics, from simple scatter plots to faceted multi-panel figures.
Topics:
- aes mappings and geoms
- Scales, axes, and color palettes
- Faceting with facet_wrap and facet_grid
- Themes and custom styling
- Combining plots with patchwork
- Saving plots with ggsave

### Layer 5 of 10 — id: r-5
Title: Statistical Analysis
Technologies: R, stats, broom, infer
Description: Apply classical and modern statistical methods in R: hypothesis testing, regression modeling, and tidy model output with broom.
Topics:
- t-tests, chi-square, ANOVA
- Linear regression with lm()
- Logistic regression with glm()
- Model diagnostics and residual plots
- Tidy model results with broom
- Bootstrapping with infer

### Layer 6 of 10 — id: r-6
Title: Functional Programming in R
Technologies: purrr, R, rlang, functional
Description: Embrace functional programming patterns in R using purrr's map family, function factories, and tidy evaluation with rlang.
Topics:
- map, map2, pmap and type-safe variants
- walk for side effects
- Function factories and closures
- Partial application with partial()
- Tidy evaluation ({{ }}, .data pronoun)
- Error handling with safely() and possibly()

### Layer 7 of 10 — id: r-7
Title: R Markdown and Reporting
Technologies: R Markdown, knitr, Quarto, tinytex
Description: Create reproducible reports, notebooks, and presentations using R Markdown and Quarto with inline code, tables, and figures.
Topics:
- YAML front matter and output formats
- Code chunk options (echo, eval, cache)
- Parameterized reports
- Tables with knitr::kable and gt
- Quarto documents and projects
- Rendering to HTML, PDF, and Word

### Layer 8 of 10 — id: r-8
Title: Machine Learning with R
Technologies: tidymodels, caret, xgboost, ranger
Description: Build, tune, and evaluate machine learning models using the tidymodels framework for a consistent, tidy ML workflow.
Topics:
- Recipes for feature engineering
- Model specifications with parsnip
- Cross-validation with rsample
- Hyperparameter tuning with tune
- Model evaluation with yardstick
- Ensembles with stacks

### Layer 9 of 10 — id: r-9
Title: Shiny Web Applications
Technologies: Shiny, shinydashboard, reactable, bslib
Description: Build interactive web dashboards and data apps entirely in R using Shiny's reactive programming model.
Topics:
- ui and server structure
- Reactive expressions and observers
- Input and output widgets
- Modules for reusable components
- Theming with bslib
- Deploying to shinyapps.io

### Layer 10 of 10 — id: r-10
Title: R in Production – Packages, APIs, and Deployment
Technologies: plumber, devtools, testthat, Docker
Description: Ship R code as reusable packages, REST APIs with plumber, and containerized services with Docker.
Topics:
- R package structure (DESCRIPTION, NAMESPACE, R/)
- roxygen2 documentation
- Unit testing with testthat
- Building REST APIs with plumber
- Dockerizing R applications
- CI/CD for R packages with GitHub Actions

Start now with Layer 1.
