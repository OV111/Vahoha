/**
 * Capstone brief — julia track (languages), v1.
 *
 * Drafted by Claude, 2026-10-21; NOT yet reviewed by a human.
 * The seeder refuses to publish a brief whose `reviewed` flag is false.
 *
 * Shape notes: see go.js. Rubric weights sum to 100; layerId maps to this track's roadmap layers.
 */

import { DEFAULT_PASS_THRESHOLDS } from "../../../modules/capstone/lib/constants.js";
import { CHECKS, COMMON_RULES } from "../shared.js";

export default {
  trackId: "julia",
  categoryId: "languages",
  slug: "julia-epidemic-simulation-package",
  version: 1,
  status: "draft",
  reviewed: false,
  title: "Epidemic Simulation Package with Differential Equations and Benchmarks",
  summary:
    "Build a Julia package that simulates disease spread two ways: an ODE compartmental model solved with " +
    "DifferentialEquations.jl and a stochastic agent-based model. Use multiple dispatch for model types, fit " +
    "parameters to data, profile and optimise the hot loop, run it in parallel, and ship with Test.jl and Documenter.jl.",
  stack: ["Julia 1.10+", "DifferentialEquations.jl", "DataFrames.jl", "Plots.jl", "Optim.jl", "BenchmarkTools.jl", "Documenter.jl"],

  requirements: [
    {
      id: "package-structure",
      text: "A valid Julia package: Project.toml with name, uuid, version and compat bounds, and src/<Name>.jl defining the module.",
      check: { type: "file", glob: "Project.toml" },
    },
    {
      id: "type-hierarchy",
      text: "Models are concrete structs under an abstract type, with behaviour added through multiple dispatch (for example simulate(::SIRModel, ...) and simulate(::AgentModel, ...)).",
    },
    {
      id: "ode-solver",
      text: "An SIR or SEIR model is solved with DifferentialEquations.jl, and results are compared across at least two solvers or tolerances.",
    },
    {
      id: "linear-algebra",
      text: "A contact-matrix or network step uses arrays and LinearAlgebra or SparseArrays, with in-place operations where it matters.",
    },
    {
      id: "data-analysis",
      text: "Real or published case data is loaded with CSV.jl and DataFrames.jl, cleaned, and compared to simulated output in a plot.",
    },
    {
      id: "parameter-fit",
      text: "Parameters (for example beta and gamma) are fitted to the data by minimising a loss with Optim.jl, and the fit quality is reported.",
    },
    {
      id: "performance",
      text: "The agent-based inner loop is type-stable (checked with @code_warntype or JET), benchmarked with BenchmarkTools before and after optimisation, and results are recorded in the README.",
    },
    {
      id: "parallel",
      text: "Monte Carlo runs execute in parallel with Threads (or Distributed), are reproducible with explicit seeds, and avoid data races.",
    },
    {
      id: "tests",
      text: "Test.jl tests in test/runtests.jl cover model correctness (for example population conservation) and dispatch behaviour.",
      check: { type: "file", glob: "test/runtests.jl" },
    },
    {
      id: "docs",
      text: "Documenter.jl docs with docstrings on all exported functions and at least one tutorial page.",
      check: { type: "file", glob: "docs/**/*.{jl,md}" },
    },
    {
      id: "readme",
      text: "README explains the models, install and run commands, and shows benchmark results.",
      check: CHECKS.readme,
    },
    {
      id: "ci",
      text: "GitHub Actions runs the Julia test suite (julia-actions/setup-julia and julia-runtest) on every push.",
      check: CHECKS.ci,
    },
  ],

  rubric: [
    { id: "dispatch", name: "Types & multiple dispatch", weight: 20, layerId: "julia-2", description: "A clean type hierarchy where dispatch, not if-chains, selects behaviour." },
    { id: "arrays", name: "Arrays & linear algebra", weight: 10, layerId: "julia-3", description: "Efficient array code, correct broadcasting and in-place operations." },
    { id: "data", name: "Data analysis", weight: 10, layerId: "julia-4", description: "Reproducible loading, cleaning and plotting with DataFrames.jl." },
    { id: "scientific", name: "Scientific computing", weight: 20, layerId: "julia-5", description: "Correct ODE modelling, solver comparison and parameter fitting." },
    { id: "performance", name: "Performance", weight: 15, layerId: "julia-7", description: "Type stability, fewer allocations and measured, documented speedups." },
    { id: "parallel", name: "Parallel computing", weight: 10, layerId: "julia-9", description: "Race-free parallel Monte Carlo with reproducible seeding." },
    { id: "production", name: "Package, tests & docs", weight: 15, layerId: "julia-10", description: "Valid Project.toml, passing tests, Documenter docs and working CI." },
  ],

  twistPool: [
    { id: "gpu", text: "Add an optional CUDA.jl (or KernelAbstractions.jl) version of the agent update and benchmark it against the CPU version." },
    { id: "macro", text: "Write a small macro that defines a compartmental model from a readable reaction list, and test its expansion." },
    { id: "uncertainty", text: "Propagate parameter uncertainty with ensemble simulations and plot prediction intervals." },
    { id: "neural-ode", text: "Fit a small neural ODE (Flux.jl or Lux.jl with DiffEqFlux) to the data and compare it with the mechanistic model." },
  ],

  rules: COMMON_RULES,
  passThresholds: DEFAULT_PASS_THRESHOLDS,
};
