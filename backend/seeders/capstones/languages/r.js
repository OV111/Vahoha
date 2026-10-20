/**
 * Capstone brief — r track (languages), v1.
 *
 * Drafted by Claude, 2026-10-21; NOT yet reviewed by a human.
 * The seeder refuses to publish a brief whose `reviewed` flag is false.
 *
 * Shape notes: see go.js. Rubric weights sum to 100; layerId maps to this track's roadmap layers.
 */

import { DEFAULT_PASS_THRESHOLDS } from "../../../modules/capstone/lib/constants.js";
import { CHECKS, COMMON_RULES } from "../shared.js";

export default {
  trackId: "r",
  categoryId: "languages",
  slug: "r-analysis-package-and-dashboard",
  version: 1,
  status: "draft",
  reviewed: false,
  title: "Reproducible Public-Data Analysis: R Package, Report and Shiny Dashboard",
  summary:
    "Pick a real open dataset and deliver an end-to-end analysis as an installable R package. Wrangle it with the " +
    "tidyverse, visualise with ggplot2, fit and evaluate a model with tidymodels, publish a Quarto report, " +
    "and serve the results in a Shiny dashboard, with testthat tests and renv for reproducibility.",
  stack: ["R 4.3+", "tidyverse", "ggplot2", "tidymodels", "Quarto", "Shiny", "testthat", "renv"],

  requirements: [
    {
      id: "package-layout",
      text: "The project is a valid R package with DESCRIPTION, NAMESPACE and an R/ directory of documented functions (roxygen2).",
      check: { type: "file", glob: "DESCRIPTION" },
    },
    {
      id: "renv",
      text: "Dependencies are locked with renv (renv.lock committed) so the analysis reproduces on another machine.",
      check: { type: "file", glob: "renv.lock" },
    },
    {
      id: "data-provenance",
      text: "Raw data is downloaded or documented with its source and licence; cleaning is a scripted, rerunnable tidyverse pipeline, never manual edits.",
    },
    {
      id: "functional",
      text: "Repeated work uses small pure functions and purrr (map family) instead of copy-pasted code or manual loops.",
    },
    {
      id: "visualisation",
      text: "At least four ggplot2 figures with labelled axes, a consistent theme and accessible colours, each supporting a stated question.",
    },
    {
      id: "statistics",
      text: "At least one statistical test or regression with assumptions checked, results tidied with broom, and effect sizes and uncertainty reported.",
    },
    {
      id: "model",
      text: "A predictive model built with tidymodels: train/test split, resampling, a baseline comparison, and a metric chosen and justified.",
    },
    {
      id: "report",
      text: "A Quarto (or R Markdown) report that renders from the package and explains method, results and limitations.",
      check: { type: "file", glob: "**/*.{qmd,Rmd}" },
    },
    {
      id: "shiny",
      text: "A Shiny app with at least two reactive inputs, a table and a plot, with logic kept in package functions rather than inside server().",
      check: { type: "file", glob: "**/app.R" },
    },
    {
      id: "tests",
      text: "testthat tests cover the cleaning and modelling functions.",
      check: { type: "file", glob: "tests/testthat/**/*.R" },
    },
    {
      id: "readme",
      text: "README explains the question, data source, how to reproduce, and key findings.",
      check: CHECKS.readme,
    },
    {
      id: "ci",
      text: "GitHub Actions runs R CMD check (for example with r-lib/actions) on every push.",
      check: CHECKS.ci,
    },
  ],

  rubric: [
    { id: "wrangling", name: "Data wrangling", weight: 15, layerId: "r-3", description: "Tidy, scripted, reproducible cleaning with sensible handling of missing values." },
    { id: "viz", name: "Visualisation", weight: 15, layerId: "r-4", description: "Clear, honest, well-labelled ggplot2 figures." },
    { id: "stats", name: "Statistical analysis", weight: 15, layerId: "r-5", description: "Appropriate tests, assumptions checked, uncertainty reported." },
    { id: "functional", name: "Functional programming", weight: 10, layerId: "r-6", description: "Reusable functions and purrr instead of repetition." },
    { id: "reporting", name: "Reporting", weight: 10, layerId: "r-7", description: "A report that renders cleanly and tells a coherent story." },
    { id: "ml", name: "Machine learning", weight: 15, layerId: "r-8", description: "Leak-free tidymodels workflow with resampling and a baseline." },
    { id: "shiny", name: "Shiny app", weight: 10, layerId: "r-9", description: "Working reactive app with logic separated from UI." },
    { id: "production", name: "Packaging & testing", weight: 10, layerId: "r-10", description: "R CMD check passes, testthat coverage and documented functions." },
  ],

  twistPool: [
    { id: "plumber-api", text: "Expose the trained model through a plumber API with a /predict endpoint and a Dockerfile." },
    { id: "pkgdown", text: "Publish a pkgdown documentation site from CI to GitHub Pages." },
    { id: "targets", text: "Orchestrate the pipeline with the targets package so only changed steps rerun." },
    { id: "bootstrap", text: "Add bootstrapped confidence intervals (rsample) for your headline metric and show them in the report." },
  ],

  rules: COMMON_RULES,
  passThresholds: DEFAULT_PASS_THRESHOLDS,
};
