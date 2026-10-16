You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Quantum Optimization" (quantum-optimization, category quantum). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: quantum-optimization-1
Title: Classical Optimization Foundations
Technologies: Python, QAOA, SciPy, NumPy
Description: Review classical combinatorial and continuous optimization to understand the problems that quantum approaches target. Study NP-hard problems and heuristic methods.
Topics:
- Combinatorial optimization landscape
- NP-hard problem taxonomy
- Traveling salesman problem
- Max-Cut problem
- Classical heuristics - SA and GA
- Convex vs non-convex optimization
- Branch and bound

### Layer 2 of 10 — id: quantum-optimization-2
Title: Ising Model and QUBO Formulations
Technologies: Ising, Python, D-Wave, QAOA
Description: Learn to formulate combinatorial optimization problems as Ising models and Quadratic Unconstrained Binary Optimization problems. Convert real-world problems to QUBO form.
Topics:
- Ising model definition
- QUBO formulation
- Penalty terms for constraints
- Max-Cut as Ising
- Graph coloring to QUBO
- Portfolio optimization as QUBO
- Logical to physical variable mapping

### Layer 3 of 10 — id: quantum-optimization-3
Title: Quantum Annealing and D-Wave Systems
Technologies: D-Wave, Annealing, Python, Ising
Description: Understand quantum annealing theory and how D-Wave machines implement it using transverse-field Ising Hamiltonians. Submit real jobs to D-Wave Leap.
Topics:
- Adiabatic quantum computation
- Transverse-field Ising Hamiltonian
- Annealing schedule design
- D-Wave QPU topology - Pegasus
- Minor embedding
- Chain strength tuning
- D-Wave Ocean SDK

### Layer 4 of 10 — id: quantum-optimization-4
Title: QAOA Theory and Implementation
Technologies: QAOA, Qiskit, Python, Ising
Description: Derive the Quantum Approximate Optimization Algorithm from first principles and implement it for Max-Cut. Analyze the role of circuit depth p and the approximation ratio.
Topics:
- QAOA ansatz construction
- Cost and mixer Hamiltonians
- QAOA p=1 analysis
- Parameter optimization landscape
- Approximation ratio theory
- Comparison to classical algorithms
- Warm-starting QAOA

### Layer 5 of 10 — id: quantum-optimization-5
Title: QAOA Variants and Mixer Designs
Technologies: QAOA, Qiskit, Python, Ising
Description: Study advanced QAOA variants including QAOA with Grover mixers, constrained QAOA, and recursive QAOA. Implement a constraint-preserving mixer for a knapsack problem.
Topics:
- Grover mixer for constrained problems
- X-mixer vs XY-mixer
- Recursive QAOA RQAOA
- Constraint-preserving mixers
- QAOA for Maximum Independent Set
- Multi-angle QAOA
- Fermionic QAOA

### Layer 6 of 10 — id: quantum-optimization-6
Title: Variational Quantum Optimization Beyond QAOA
Technologies: Qiskit, Python, QAOA, Annealing
Description: Explore non-QAOA variational optimization strategies including QITE, FALQON, and counterdiabatic driving. Compare convergence and hardware requirements.
Topics:
- Quantum imaginary time evolution QITE
- FALQON algorithm
- Counterdiabatic driving
- Variational fast forwarding
- Local cost function design
- Trainability of variational optimizers
- Benchmarking variational optimization

### Layer 7 of 10 — id: quantum-optimization-7
Title: Quantum Optimization for Finance
Technologies: QAOA, D-Wave, Python, Qiskit
Description: Apply quantum optimization algorithms to financial problems including portfolio selection, risk management, and options pricing. Formulate and solve a portfolio optimization with constraints.
Topics:
- Markowitz portfolio optimization
- Mean-variance to QUBO
- Cardinality constraints
- Risk measures CVaR
- Quantum Monte Carlo for pricing
- Asset allocation with D-Wave
- Backtesting quantum portfolios

### Layer 8 of 10 — id: quantum-optimization-8
Title: Quantum Optimization for Logistics
Technologies: D-Wave, QAOA, Python, Ising
Description: Solve logistics optimization problems including vehicle routing, scheduling, and supply chain using quantum annealing and gate-based methods. Formulate VRP as a QUBO.
Topics:
- Vehicle routing problem
- VRP to QUBO conversion
- Job shop scheduling
- Bin packing QUBO
- Flight gate assignment
- Traffic flow optimization
- Benchmark comparison to classical solvers

### Layer 9 of 10 — id: quantum-optimization-9
Title: Quantum Optimization Benchmarking and Limits
Technologies: QAOA, D-Wave, Python, Ising
Description: Critically evaluate claims of quantum optimization advantage using rigorous benchmarking methodology. Understand when quantum optimization may or may not outperform classical methods.
Topics:
- Benchmarking methodology design
- Instance hardness metrics
- Comparison to Gurobi and CPLEX
- QA vs QAOA performance
- Time-to-solution metric
- Quantum advantage criteria for optimization
- Classical simulation of QAOA

### Layer 10 of 10 — id: quantum-optimization-10
Title: Quantum Optimization Research and Applications
Technologies: QAOA, D-Wave, Annealing, Ising
Description: Engage with cutting-edge quantum optimization research and design a novel application for a real-world optimization problem. Produce an end-to-end demonstration with rigorous evaluation.
Topics:
- Open problems in quantum optimization
- Quantum advantage thresholds
- Overcoming barren plateaus in optimization
- Quantum-inspired classical algorithms
- Tensor network optimization
- QAOA on fault-tolerant hardware prospects
- Research publication workflow

Start now with Layer 1.
