You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Quantum Simulation" (quantum-simulation, category quantum). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: quantum-simulation-1
Title: Quantum Simulation Fundamentals
Technologies: Python, Qiskit, NumPy, Hamiltonians
Description: Understand why quantum computers are naturally suited for simulating quantum systems and what computational advantage this provides. Survey simulation targets from chemistry to condensed matter.
Topics:
- Feynman's simulation proposal
- Exponential classical simulation cost
- First vs second quantization
- Quantum simulation use cases
- Chemistry simulation targets
- Condensed matter simulation targets
- Types of quantum simulation - digital vs analog

### Layer 2 of 10 — id: quantum-simulation-2
Title: Second Quantization and Fermionic Systems
Technologies: Qiskit, Python, Chemistry, Hamiltonians
Description: Learn the second quantization formalism for fermionic and bosonic systems and how to represent molecular Hamiltonians computationally. Map fermionic operators to qubit operators.
Topics:
- Creation and annihilation operators
- Fock space construction
- Molecular Hamiltonian
- Jordan-Wigner transformation
- Bravyi-Kitaev transformation
- Parity mapping
- Fermion-to-qubit mapping comparison

### Layer 3 of 10 — id: quantum-simulation-3
Title: Variational Quantum Eigensolver
Technologies: VQE, Qiskit, Python, Chemistry
Description: Implement the Variational Quantum Eigensolver algorithm to find molecular ground state energies. Study ansatz choices including hardware-efficient and chemically motivated UCC forms.
Topics:
- VQE algorithm derivation
- Expectation value estimation
- UCCSD ansatz
- Hardware-efficient ansatz
- Gradient computation
- Classical optimizer choices
- Shot noise and measurement overhead

### Layer 4 of 10 — id: quantum-simulation-4
Title: Hamiltonian Simulation Methods
Technologies: Hamiltonians, Qiskit, Python, VQE
Description: Study digital Hamiltonian simulation methods including Trotter decomposition, LCU, and quantum signal processing. Implement and compare error bounds.
Topics:
- Product formula Trotter methods
- First vs second order Trotter
- Suzuki-Trotter higher orders
- Linear combination of unitaries LCU
- Quantum signal processing for simulation
- Simulation error analysis
- Resource comparison of methods

### Layer 5 of 10 — id: quantum-simulation-5
Title: Quantum Phase Estimation for Simulation
Technologies: Qiskit, Hamiltonians, Python, VQE
Description: Study quantum phase estimation as a method for extracting energy eigenvalues of molecular Hamiltonians with exponential precision. Implement QPE for a simple system.
Topics:
- QPE algorithm for eigenvalues
- Controlled unitary evolution
- QPE precision and qubit count
- Iterative phase estimation
- QPE vs VQE tradeoffs
- Quantum advantage regime for QPE
- Resource estimation for molecular simulation

### Layer 6 of 10 — id: quantum-simulation-6
Title: Excited States and Quantum Subspace Expansion
Technologies: VQE, Qiskit, Chemistry, Python
Description: Extend VQE and quantum simulation to excited states using quantum subspace expansion, QEOM, and multistate methods. Simulate absorption spectra for small molecules.
Topics:
- Excited state simulation challenges
- Quantum equation of motion QEOM
- Quantum subspace expansion QSE
- Folded spectrum method
- Multistate contracted VQE
- Quantum defect theory
- Simulating photochemistry

### Layer 7 of 10 — id: quantum-simulation-7
Title: Quantum Dynamics and Real-Time Simulation
Technologies: Qiskit, Hamiltonians, Python, VQE
Description: Simulate real-time quantum dynamics of many-body systems including spin chains and molecular dynamics. Study McLachlan variational principle for time-dependent VQE.
Topics:
- Real-time vs imaginary time evolution
- Variational real-time dynamics
- McLachlan variational principle
- Time-dependent VQE TDVQE
- Quantum chaos signatures
- Loschmidt echo simulation
- Many-body localization dynamics

### Layer 8 of 10 — id: quantum-simulation-8
Title: Condensed Matter Quantum Simulation
Technologies: Qiskit, Hamiltonians, Python, VQE
Description: Apply quantum simulation to condensed matter systems including Hubbard models and topological phases. Study signatures of quantum phase transitions on quantum hardware.
Topics:
- Hubbard model simulation
- Fermi-Hubbard mapping to qubits
- Heisenberg spin chain
- Quantum phase transitions
- Order parameters on quantum hardware
- Topological invariants
- Symmetry-protected phases simulation

### Layer 9 of 10 — id: quantum-simulation-9
Title: Noise-Aware Quantum Simulation
Technologies: Qiskit, VQE, Python, Hamiltonians
Description: Develop strategies for quantum simulation in the presence of hardware noise, including error mitigation tailored to simulation workflows. Compare simulated and hardware results.
Topics:
- Noise impact on energy estimates
- Zero-noise extrapolation for simulation
- Probabilistic error cancellation
- Symmetry verification post-processing
- Purification-based error mitigation
- Virtual distillation
- Benchmark noise mitigation for chemistry

### Layer 10 of 10 — id: quantum-simulation-10
Title: Towards Quantum Advantage in Simulation
Technologies: VQE, Hamiltonians, Chemistry, Qiskit
Description: Survey the current state of quantum advantage in simulation, identify the near-term and fault-tolerant milestones, and propose a simulation experiment at the quantum advantage frontier.
Topics:
- Quantum advantage criteria for simulation
- Current simulation records on hardware
- Catalysis and strongly correlated systems
- Active space approximations
- Fault-tolerant simulation resources
- Quantum chemistry accuracy goals
- Roadmap to utility-scale simulation

Start now with Layer 1.
