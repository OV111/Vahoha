You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Quantum Hardware Engineer" (quantum-hardware, category quantum). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: quantum-hardware-1
Title: Physics of Quantum Hardware Platforms
Technologies: Superconducting, Ion Traps, Python, Math
Description: Survey the major physical platforms for quantum computing including superconducting qubits and trapped ions. Understand the key figures of merit for each platform.
Topics:
- Superconducting qubit types
- Transmon qubit physics
- Ion trap fundamentals
- Photonic quantum computing
- Neutral atom arrays
- Coherence time T1 T2
- Gate fidelity benchmarks

### Layer 2 of 10 — id: quantum-hardware-2
Title: Superconducting Qubit Circuit Theory
Technologies: Superconducting, Python, Pulse, Math
Description: Study the circuit quantum electrodynamics framework for superconducting qubits. Understand Josephson junctions, LC oscillators, and the transmon qubit Hamiltonian.
Topics:
- LC oscillator quantization
- Josephson junction physics
- Cooper pair box qubit
- Transmon regime
- Circuit QED framework
- Qubit-resonator coupling
- Dispersive readout

### Layer 3 of 10 — id: quantum-hardware-3
Title: Quantum Gate Implementation and Pulse Design
Technologies: Pulse, Superconducting, Python, Calibration
Description: Learn how quantum gates are physically implemented as microwave pulses on superconducting hardware. Design and simulate gate pulses using Qiskit Pulse.
Topics:
- Rabi oscillations
- Microwave pulse shaping
- DRAG pulses for leakage reduction
- Cross-resonance gate
- Qiskit Pulse framework
- Pulse calibration basics
- IQ mixer and signal generation

### Layer 4 of 10 — id: quantum-hardware-4
Title: Qubit Readout and State Discrimination
Technologies: Superconducting, Calibration, Python, Pulse
Description: Study dispersive readout of superconducting qubits and the signal processing chain for state discrimination. Implement IQ plane classification and calibration.
Topics:
- Dispersive readout mechanism
- Cavity-qubit coupling for readout
- IQ plane measurement
- State discrimination algorithms
- Readout fidelity optimization
- Parametric amplification
- Readout error mitigation

### Layer 5 of 10 — id: quantum-hardware-5
Title: Quantum Characterization and Benchmarking
Technologies: Calibration, Qiskit, Python, Superconducting
Description: Master standard characterization protocols for quantum hardware including process tomography and randomized benchmarking. Quantify gate fidelities and coherence times.
Topics:
- Rabi experiment
- T1 measurement
- T2 Ramsey and echo
- Quantum process tomography
- Randomized benchmarking
- Simultaneous RB
- Gate set tomography intro

### Layer 6 of 10 — id: quantum-hardware-6
Title: Crosstalk and Hardware Error Characterization
Technologies: Calibration, Superconducting, Python, Pulse
Description: Study crosstalk between qubits on multi-qubit chips and methods for characterizing and mitigating it. Understand leakage to non-computational states and its effects.
Topics:
- ZZ crosstalk coupling
- Simultaneous gate errors
- Leakage to higher levels
- Crosstalk characterization protocols
- Dynamical decoupling for crosstalk
- Echo sequences
- Hardware-aware circuit compilation

### Layer 7 of 10 — id: quantum-hardware-7
Title: Trapped Ion Hardware Engineering
Technologies: Ion Traps, Python, Math, Calibration
Description: Study the engineering of trapped ion quantum computers including Paul traps, laser interactions, and motional mode gates. Compare engineering challenges to superconducting platforms.
Topics:
- Paul trap mechanics
- Laser cooling methods
- Raman transitions
- Molmer-Sorensen gate
- Cirac-Zoller gate
- Ion chain motional modes
- Shuttling for scaling

### Layer 8 of 10 — id: quantum-hardware-8
Title: Quantum Hardware Calibration Pipelines
Technologies: Calibration, Python, Pulse, Superconducting
Description: Design automated calibration pipelines for quantum hardware including drift tracking and closed-loop optimization. Understand the workflow used in production quantum systems.
Topics:
- Calibration pipeline architecture
- Frequency drift tracking
- Automated gate recalibration
- Bayesian optimization for calibration
- Hardware abstraction layers
- Calibration scheduling
- Cross-calibration between qubits

### Layer 9 of 10 — id: quantum-hardware-9
Title: Cryogenic Engineering and Hardware Integration
Technologies: Superconducting, Ion Traps, Calibration, Python
Description: Study the cryogenic infrastructure required for superconducting quantum computers and the full signal chain from room-temperature electronics to the quantum chip. Understand thermalization and shielding.
Topics:
- Dilution refrigerator operation
- Cryogenic wiring and filtering
- Microwave engineering at millikelvin
- Thermal anchoring stages
- Josephson parametric amplifiers
- Magnetic shielding
- Vibration isolation

### Layer 10 of 10 — id: quantum-hardware-10
Title: Scaling Quantum Hardware and Next-Generation Architectures
Technologies: Superconducting, Ion Traps, Pulse, Calibration
Description: Study the engineering challenges and proposed solutions for scaling quantum hardware to fault-tolerant regimes. Analyze modular architectures, 3D integration, and photonic interconnects.
Topics:
- Modular quantum computing architectures
- 3D integration for superconducting qubits
- Quantum interconnects via photons
- Neutral atom reconfigurable arrays
- Topological qubits overview
- Crossbar architectures
- Roadmap to fault tolerance

Start now with Layer 1.
