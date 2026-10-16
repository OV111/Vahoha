You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Quantum Researcher" (quantum-researcher, category quantum). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: quantum-researcher-1
Title: Quantum Mechanics for Quantum Computing Research
Technologies: Q#, Math, Python, Cirq
Description: Build a rigorous mathematical foundation in quantum mechanics as it applies to quantum information science. Study Hilbert spaces, operators, and the postulates of quantum mechanics at a graduate level.
Topics:
- Hilbert space formalism
- Hermitian operators and observables
- Spectral theorem
- Density operator formalism
- Open quantum systems intro
- POVM measurements
- Quantum channels and Kraus operators

### Layer 2 of 10 — id: quantum-researcher-2
Title: Quantum Information Theory
Technologies: Math, Python, Q#, Cirq
Description: Study the theory of quantum information including entropy measures, quantum channel capacity, and entanglement measures. Implement von Neumann entropy and mutual information calculations.
Topics:
- Von Neumann entropy
- Quantum mutual information
- Entanglement entropy
- Holevo bound
- Quantum channel capacity
- Quantum discord
- Entanglement measures - concurrence and negativity

### Layer 3 of 10 — id: quantum-researcher-3
Title: Quantum Error Correction Theory
Technologies: Cirq, Q#, Python, Error Correction
Description: Study the theory of quantum error correcting codes including stabilizer formalism and the threshold theorem. Implement the 3-qubit bit-flip and Shor codes from scratch.
Topics:
- Classical error correction recap
- 3-qubit bit-flip code
- 9-qubit Shor code
- Stabilizer formalism
- Pauli group and stabilizers
- CSS codes
- Fault-tolerance threshold theorem

### Layer 4 of 10 — id: quantum-researcher-4
Title: Hamiltonian Engineering and Quantum Control
Technologies: Q#, Python, Hamiltonians, Cirq
Description: Study Hamiltonian engineering techniques for quantum computing including pulse-level control and the Magnus expansion. Simulate time-dependent quantum systems.
Topics:
- Schrodinger equation for quantum gates
- Magnus expansion
- Rotating wave approximation
- Pulse-level control basics
- Optimal control theory GRAPE
- Floquet engineering
- Dynamical decoupling

### Layer 5 of 10 — id: quantum-researcher-5
Title: Surface Codes and Topological Error Correction
Technologies: Cirq, Python, Error Correction, Q#
Description: Study the surface code and toric code in depth, including syndrome extraction, minimum-weight perfect matching decoding, and logical qubit operations. Simulate surface code cycles.
Topics:
- Toric code construction
- Surface code boundaries
- Syndrome measurement circuits
- MWPM decoding algorithm
- Logical X and Z operators
- Code distance and threshold
- Lattice surgery

### Layer 6 of 10 — id: quantum-researcher-6
Title: Q# and Quantum Program Verification
Technologies: Q#, Cirq, Python, Error Correction
Description: Write quantum programs in Q# and use the Microsoft Quantum Development Kit for resource estimation and verification. Develop formally verified quantum subroutines.
Topics:
- Q# language syntax
- Quantum development kit setup
- Qubit allocation and operations
- Adjoint and controlled functors
- Resource estimator in Q#
- Formal verification approaches
- Quantum program testing

### Layer 7 of 10 — id: quantum-researcher-7
Title: Quantum Complexity and Computational Models
Technologies: Math, Q#, Python, Cirq
Description: Study the quantum computational complexity hierarchy including BQP, QMA, and QCMA. Understand the limits of quantum speedup and the role of quantum proofs.
Topics:
- BQP complexity class
- QMA and quantum witnesses
- QCMA class
- Quantum PCP conjecture
- Local Hamiltonian problem
- Complexity of quantum simulation
- Oracle separations

### Layer 8 of 10 — id: quantum-researcher-8
Title: Quantum Communication and Nonlocality
Technologies: Python, Q#, Math, Cirq
Description: Study quantum communication protocols, Bell inequalities, and the role of entanglement in distributed quantum information processing. Implement CHSH and other Bell tests.
Topics:
- Bell inequalities
- CHSH game
- Tsirelson bound
- Quantum teleportation
- Superdense coding
- Entanglement distillation
- Quantum network protocols

### Layer 9 of 10 — id: quantum-researcher-9
Title: Open Quantum Systems and Decoherence
Technologies: Python, QuTiP, Hamiltonians, Math
Description: Study the Lindblad master equation, Markovian dynamics, and decoherence mechanisms in real quantum hardware. Simulate open quantum system dynamics using QuTiP.
Topics:
- Lindblad master equation
- Markovian approximation
- Lindblad operators
- T1 and T2 processes in Lindblad form
- Non-Markovian dynamics
- Quantum process tomography
- Decoherence-free subspaces

### Layer 10 of 10 — id: quantum-researcher-10
Title: Research Frontiers and Original Contribution
Technologies: Q#, Cirq, Hamiltonians, Error Correction
Description: Engage with the current research literature, identify an open problem, and produce an original research contribution. Learn to write and review quantum computing research papers.
Topics:
- Reading quantum research papers
- Identifying open problems
- Proof techniques in QC research
- arXiv preprint workflow
- Research paper writing structure
- Peer review process
- Quantum advantage verification methods

Start now with Layer 1.
