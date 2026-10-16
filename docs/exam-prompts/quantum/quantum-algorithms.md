You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Quantum Algorithms" (quantum-algorithms, category quantum). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: quantum-algorithms-1
Title: Mathematical Prerequisites for Quantum Algorithms
Technologies: Linear Algebra, Complexity, Python, NumPy
Description: Establish the mathematical foundation required to understand and analyze quantum algorithms. Cover vector spaces, tensor products, and computational complexity basics.
Topics:
- Complex vector spaces
- Tensor products
- Inner products and norms
- Unitary matrices
- Big-O notation
- P vs NP overview
- Probability amplitudes

### Layer 2 of 10 — id: quantum-algorithms-2
Title: Query Complexity and Oracle Models
Technologies: Complexity, Python, Qiskit, Linear Algebra
Description: Understand the oracle model of computation and how quantum algorithms achieve query complexity advantages. Implement simple oracle-based algorithms from scratch.
Topics:
- Oracle model definition
- Decision vs function problems
- Deutsch algorithm
- Deutsch-Jozsa algorithm
- Query complexity lower bounds
- Quantum parallelism
- Phase kickback

### Layer 3 of 10 — id: quantum-algorithms-3
Title: Quantum Fourier Transform
Technologies: Linear Algebra, Qiskit, Python, Complexity
Description: Derive and implement the Quantum Fourier Transform and understand its role as a subroutine in major quantum algorithms. Analyze its exponential speedup over the classical FFT.
Topics:
- Classical DFT definition
- QFT circuit construction
- Phase estimation algorithm
- QFT on n qubits
- Inverse QFT
- QFT complexity analysis
- Applications in period finding

### Layer 4 of 10 — id: quantum-algorithms-4
Title: Shor's Factoring Algorithm
Technologies: Shor, Python, Qiskit, Number Theory
Description: Understand the mathematical structure of Shor's algorithm and how order-finding via QFT enables integer factorization in polynomial time. Implement a small-scale version end to end.
Topics:
- RSA cryptography overview
- Period finding reduction
- Continued fractions algorithm
- Quantum order finding
- Modular exponentiation circuits
- Classical post-processing
- Complexity analysis O(log^3 N)

### Layer 5 of 10 — id: quantum-algorithms-5
Title: Grover's Search Algorithm
Technologies: Grover, Qiskit, Python, Linear Algebra
Description: Derive Grover's amplitude amplification algorithm and analyze its quadratic speedup for unstructured search. Implement it for database search and satisfiability problems.
Topics:
- Amplitude amplification
- Oracle inversion about mean
- Geometric rotation picture
- Optimal iteration count
- Multi-target Grover
- Grover for SAT
- Lower bound proof

### Layer 6 of 10 — id: quantum-algorithms-6
Title: Quantum Walk Algorithms
Technologies: Linear Algebra, Python, Complexity, Qiskit
Description: Study discrete and continuous quantum walks and their algorithmic applications including element distinctness and triangle finding. Compare quantum walk speedups to classical random walks.
Topics:
- Classical random walks
- Discrete quantum walks
- Continuous-time quantum walks
- Hitting time analysis
- Element distinctness problem
- Spatial search via quantum walk
- MNRS framework

### Layer 7 of 10 — id: quantum-algorithms-7
Title: HHL and Quantum Linear Systems
Technologies: Linear Algebra, Qiskit, Python, Complexity
Description: Study the Harrow-Hassidim-Lloyd algorithm for solving linear systems exponentially faster than classical methods under specific conditions. Analyze its caveats and practical limitations.
Topics:
- Linear systems problem formulation
- Phase estimation subroutine in HHL
- Controlled rotations for inversion
- Sparsity and condition number requirements
- HHL complexity analysis
- Quantum RAM caveats
- Dequantization results

### Layer 8 of 10 — id: quantum-algorithms-8
Title: Variational and Hybrid Algorithms
Technologies: Qiskit, Python, SciPy, Complexity
Description: Study NISQ-era variational algorithms including VQE and QAOA and understand their optimization landscapes. Analyze when variational approaches can outperform classical heuristics.
Topics:
- VQE algorithm
- QAOA algorithm
- Ansatz expressibility
- Barren plateaus in depth
- Quantum natural gradient
- COBYLA and SPSA optimizers
- Benchmarking variational circuits

### Layer 9 of 10 — id: quantum-algorithms-9
Title: Quantum Simulation Algorithms
Technologies: Qiskit, Linear Algebra, Python, Complexity
Description: Study Hamiltonian simulation algorithms including Trotter-Suzuki decompositions and qubitization. Understand how quantum simulation enables exponential speedup for physics problems.
Topics:
- Hamiltonian simulation problem
- Trotter-Suzuki decomposition
- Product formula error bounds
- LCU method
- Qubitization and quantum signal processing
- Resource estimation
- Simulation vs optimization

### Layer 10 of 10 — id: quantum-algorithms-10
Title: Fault-Tolerant Algorithm Design and Resource Estimation
Technologies: Linear Algebra, Complexity, Python, Qiskit
Description: Analyze quantum algorithms in the fault-tolerant setting and produce rigorous resource estimates for T-gate and qubit counts. Understand which algorithms are viable on future fault-tolerant hardware.
Topics:
- Clifford + T gate set
- T-gate resource estimation
- Magic state distillation overhead
- Surface code requirements
- Logical vs physical qubits
- Algorithm benchmarking for FT hardware
- Quantum advantage criteria

Start now with Layer 1.
