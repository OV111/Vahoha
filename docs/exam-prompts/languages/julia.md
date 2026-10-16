You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Julia" (julia, category languages). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: julia-1
Title: Julia Syntax and Basics
Technologies: Julia, REPL, Pkg, Pluto
Description: Learn Julia's syntax, type system fundamentals, and how to manage packages and environments with the built-in Pkg manager.
Topics:
- Variables, types, and type annotations
- Control flow (if/for/while/break/continue)
- Functions and multiple return values
- Pkg.jl environments and Project.toml
- Using the Julia REPL and Pluto notebooks
- Unicode identifiers and math notation

### Layer 2 of 10 — id: julia-2
Title: Type System and Multiple Dispatch
Technologies: Julia, types, dispatch, abstract
Description: Understand Julia's type hierarchy, concrete vs abstract types, and how multiple dispatch enables highly composable, high-performance code.
Topics:
- Abstract and concrete types
- Composite types with struct
- Parametric types
- Multiple dispatch mechanics
- Method tables and specialization
- Type stability and performance

### Layer 3 of 10 — id: julia-3
Title: Arrays and Linear Algebra
Technologies: Julia, LinearAlgebra, BLAS, SparseArrays
Description: Work with Julia's native multi-dimensional arrays, the LinearAlgebra stdlib, and high-performance BLAS/LAPACK routines.
Topics:
- Array construction, indexing, and slicing
- Broadcasting with dot syntax
- Matrix factorizations (LU, QR, SVD, Cholesky)
- Sparse matrices with SparseArrays
- In-place operations and memory layout
- StaticArrays for fixed-size performance

### Layer 4 of 10 — id: julia-4
Title: Data Analysis with DataFrames.jl
Technologies: DataFrames.jl, CSV.jl, Query.jl, Plots.jl
Description: Load, manipulate, and analyze tabular data in Julia using DataFrames.jl with a workflow comparable to pandas or R's dplyr.
Topics:
- Loading data with CSV.jl
- Selecting, filtering, and transforming columns
- GroupBy and aggregation
- Joining DataFrames
- Missing value handling
- Plotting with Plots.jl and Makie.jl

### Layer 5 of 10 — id: julia-5
Title: Scientific Computing and Differential Equations
Technologies: DifferentialEquations.jl, Optim.jl, Roots.jl, QuadGK.jl
Description: Solve ODEs, PDEs, and optimization problems using the SciML ecosystem — one of Julia's key strengths over Python.
Topics:
- ODE problem definition and solvers
- Stiff vs non-stiff problem selection
- Parameter estimation with SciML
- Numerical integration with QuadGK
- Root finding with Roots.jl
- Unconstrained optimization with Optim.jl

### Layer 6 of 10 — id: julia-6
Title: Machine Learning with Flux.jl
Technologies: Flux.jl, Zygote.jl, CUDA.jl, MLUtils.jl
Description: Build and train neural networks in Julia using Flux.jl, leveraging Zygote for automatic differentiation and CUDA.jl for GPU acceleration.
Topics:
- Defining layers and models with Chain
- Loss functions and optimizers
- Automatic differentiation with Zygote
- Training loops and callbacks
- GPU acceleration with CUDA.jl
- Saving and loading models

### Layer 7 of 10 — id: julia-7
Title: Performance and Profiling
Technologies: BenchmarkTools.jl, ProfileView.jl, @simd, @inbounds
Description: Profile Julia code with BenchmarkTools and ProfileView, identify bottlenecks, and apply performance best practices for type-stable, allocation-free hot paths.
Topics:
- Benchmarking with @btime and @benchmark
- Profiling with @profile and ProfileView
- Type instability and @code_warntype
- @inbounds and @simd annotations
- Avoiding unnecessary allocations
- Memory layout: column-major array access

### Layer 8 of 10 — id: julia-8
Title: Metaprogramming and Macros
Technologies: Julia, Expr, macros, generated functions
Description: Leverage Julia's Lisp-like metaprogramming to write macros, manipulate ASTs, and generate specialized code at compile time.
Topics:
- Expressions and the AST
- quote and interpolation ($)
- Writing hygienic macros with @macro
- Generated functions with @generated
- eval and world age
- Macro hygiene and escape

### Layer 9 of 10 — id: julia-9
Title: Parallel and Distributed Computing
Technologies: Threads, Distributed, MPI.jl, CUDA.jl
Description: Scale Julia computations across CPU threads and multiple processes using the built-in Threads and Distributed modules.
Topics:
- Multi-threading with Threads.@threads
- Thread safety and atomic operations
- Distributed computing with @spawnat and @everywhere
- SharedArrays and distributed data
- MPI.jl for HPC clusters
- Task-based concurrency with @async

### Layer 10 of 10 — id: julia-10
Title: Julia in Production – Packages, Testing, and Deployment
Technologies: Pkg.jl, Test.jl, Documenter.jl, Docker
Description: Structure Julia code as a registered package, write comprehensive tests, generate docs with Documenter.jl, and deploy with Docker or Genie.jl.
Topics:
- Package structure and Project.toml
- Unit testing with Test.jl
- Continuous integration with GitHub Actions
- Documentation with Documenter.jl
- Building REST APIs with Genie.jl
- Dockerizing Julia applications

Start now with Layer 1.
