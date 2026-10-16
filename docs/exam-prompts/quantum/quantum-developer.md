You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Quantum Developer" (quantum-developer, category quantum). It has 11 layers, listed at the bottom.

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
### Layer 1 of 11 — id: quantum-developer-1
Title: Foundations of Quantum Computing
Technologies: Python, Linear Algebra, Qiskit, Jupyter
Description: Understand the mathematical and physical principles that underpin quantum computing. Learn how qubits, superposition, and entanglement differ from classical bits.
Topics:
- Qubit representation
- Superposition principle
- Entanglement basics
- Bra-ket notation
- Bloch sphere
- Quantum vs classical computing

### Layer 2 of 11 — id: quantum-developer-2
Title: Qiskit Setup and First Circuits
Technologies: Qiskit, Python, IBM Q, Jupyter
Description: Install and configure Qiskit and connect to IBM Q simulators. Build and run your first quantum circuits using basic gates.
Topics:
- Qiskit installation
- QuantumCircuit API
- Single-qubit gates
- Multi-qubit gates
- Circuit visualization
- Statevector simulator

### Layer 3 of 11 — id: quantum-developer-3
Title: Quantum Gates and Unitary Operations
Technologies: Qiskit, NumPy, Quantum Gates, Python
Description: Master single- and multi-qubit gate operations and understand their matrix representations. Learn how to compose gates to form arbitrary unitary transformations.
Topics:
- Pauli gates X Y Z
- Phase and T gates
- CNOT and CZ gates
- Toffoli gate
- Unitary matrix math
- Gate decomposition
- Custom unitary gates

### Layer 4 of 11 — id: quantum-developer-4
Title: Quantum Measurement and Probability
Technologies: Qiskit, Python, IBM Q, Statistics
Description: Understand the Born rule, projective measurement, and how measurement collapses quantum states. Learn to interpret shot-based results from real and simulated hardware.
Topics:
- Projective measurement
- Born rule
- Shot noise
- Density matrices
- Partial measurement
- Classical register operations
- Measurement error mitigation intro

### Layer 5 of 11 — id: quantum-developer-5
Title: Quantum Algorithms Primer
Technologies: Qiskit, Python, Quantum Gates, Complexity
Description: Survey the landscape of foundational quantum algorithms and their computational advantages. Implement Deutsch-Jozsa and Bernstein-Vazirani algorithms in Qiskit.
Topics:
- Deutsch-Jozsa algorithm
- Bernstein-Vazirani algorithm
- Simon's algorithm
- Oracle construction
- Quantum speedup intuition
- Complexity classes BQP vs P

### Layer 6 of 11 — id: quantum-developer-6
Title: Variational Quantum Circuits
Technologies: Qiskit, Python, Parameterized Circuits, SciPy
Description: Learn how parameterized quantum circuits are used in variational algorithms for optimization and machine learning. Build ansatz circuits and optimize parameters using classical optimizers.
Topics:
- Parameterized circuits
- Ansatz design
- VQE overview
- QAOA overview
- Gradient estimation
- Classical-quantum hybrid loop
- Barren plateau problem

### Layer 7 of 11 — id: quantum-developer-7
Title: Quantum Error and Noise
Technologies: Qiskit, Aer, Noise Models, Python
Description: Understand the sources of noise in quantum hardware and how to model them in simulation. Apply basic error mitigation strategies to improve output fidelity.
Topics:
- Bit-flip and phase-flip errors
- Depolarizing noise
- T1 and T2 relaxation
- Aer noise models
- Zero-noise extrapolation
- Measurement error mitigation
- Readout calibration

### Layer 8 of 11 — id: quantum-developer-8
Title: Running on IBM Quantum Hardware
Technologies: IBM Q, Qiskit Runtime, Python, Transpiler
Description: Submit quantum jobs to real IBM Quantum devices using Qiskit Runtime. Understand transpilation, qubit mapping, and how device topology affects circuit performance.
Topics:
- IBM Quantum account setup
- Qiskit Runtime primitives
- Circuit transpilation
- Qubit coupling maps
- Backend properties
- Job monitoring
- Result post-processing

### Layer 9 of 11 — id: quantum-developer-11
Title: Beyond Qiskit: Cirq, PennyLane, and Amazon Braket
Technologies: Python, Cirq, PennyLane
Description: Learn that quantum programs are not tied to one toolkit. You will build the same circuits in Cirq and PennyLane, see how each models circuits and gradients, and run on a second cloud provider through Amazon Braket.
Topics:
- Cirq circuits, moments and devices
- PennyLane QNodes and automatic differentiation
- Hybrid quantum-classical models with PennyLane
- Amazon Braket devices and tasks
- OpenQASM as an exchange format
- Choosing an SDK for a project

### Layer 10 of 11 — id: quantum-developer-9
Title: Quantum Software Engineering Patterns
Technologies: Qiskit, Python, Testing, CI/CD
Description: Apply software engineering best practices to quantum programs including testing, modular design, and reproducibility. Build reusable quantum circuit libraries and integrate them into classical pipelines.
Topics:
- Unit testing quantum circuits
- Mocking quantum backends
- Circuit optimization passes
- Quantum software design patterns
- Versioning quantum experiments
- Benchmarking fidelity
- Reproducible quantum experiments

### Layer 11 of 11 — id: quantum-developer-10
Title: End-to-End Quantum Application Development
Technologies: Qiskit, IBM Q, Python, REST APIs
Description: Design and deploy a full quantum-classical application that solves a real-world problem using IBM Quantum hardware. Integrate quantum subroutines into production-quality software architecture.
Topics:
- Problem formulation for quantum
- Quantum-classical interface design
- REST API for quantum jobs
- Result interpretation and visualization
- Scalability considerations
- Quantum advantage benchmarking
- Deployment and monitoring

Start now with Layer 1.
