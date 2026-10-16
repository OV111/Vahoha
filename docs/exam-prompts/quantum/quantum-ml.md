You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Quantum ML" (quantum-ml, category quantum). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: quantum-ml-1
Title: Classical ML and Quantum Computing Basics
Technologies: Python, PyTorch, PennyLane, NumPy
Description: Review classical machine learning fundamentals and understand how quantum computing concepts map onto ML workflows. Set up PennyLane and run your first quantum node.
Topics:
- Supervised learning recap
- Loss functions and gradients
- Quantum state encoding
- PennyLane installation
- QNode basics
- Quantum vs classical neurons
- Hybrid computation graphs

### Layer 2 of 10 — id: quantum-ml-2
Title: Data Encoding Strategies
Technologies: PennyLane, Python, NumPy, Qiskit ML
Description: Study the main methods for encoding classical data into quantum states, including amplitude, angle, and basis encodings. Understand the tradeoffs in expressiveness and circuit depth.
Topics:
- Basis encoding
- Amplitude encoding
- Angle encoding
- IQP encoding
- Quantum feature maps
- Encoding circuit depth tradeoffs
- Data re-uploading

### Layer 3 of 10 — id: quantum-ml-3
Title: Variational Quantum Classifiers
Technologies: PennyLane, PyTorch, VQC, Python
Description: Build variational quantum classifiers by combining parameterized quantum circuits with classical optimizers. Train a VQC on a binary classification task and evaluate accuracy.
Topics:
- VQC architecture
- StronglyEntanglingLayers
- Parameter shift rule
- Binary and multiclass encoding
- Overfitting in VQC
- Circuit depth vs accuracy
- Gradient-based optimization

### Layer 4 of 10 — id: quantum-ml-4
Title: Quantum Kernels and Support Vector Machines
Technologies: PennyLane, Qiskit ML, Python, SciKit-Learn
Description: Understand quantum kernel methods where quantum circuits compute inner products in exponentially large feature spaces. Train a quantum kernel SVM and compare to classical RBF kernels.
Topics:
- Kernel methods recap
- Quantum feature map circuits
- Fidelity kernel
- Projected quantum kernel
- Quantum advantage conditions for kernels
- Kernel alignment training
- Inductive bias in quantum kernels

### Layer 5 of 10 — id: quantum-ml-5
Title: Quantum Neural Networks
Technologies: PennyLane, PyTorch, VQC, Python
Description: Design quantum neural network architectures using alternating layers of encoding and variational circuits. Analyze expressibility and entangling power of different QNN designs.
Topics:
- QNN architecture design
- Expressibility metric
- Entangling power
- Barren plateaus in QNNs
- Equivariant QNNs
- Quantum convolutional layers
- Hybrid QNN-CNN models

### Layer 6 of 10 — id: quantum-ml-6
Title: Quantum Generative Models
Technologies: PennyLane, PyTorch, Python, Qiskit ML
Description: Study quantum generative adversarial networks and quantum Boltzmann machines for data generation tasks. Implement a QGAN to generate synthetic data distributions.
Topics:
- Classical GAN recap
- Quantum GAN architecture
- Quantum Boltzmann machines
- Born machine training
- Quantum circuit Born sampling
- Training instability in QGANs
- Fidelity metrics for generative models

### Layer 7 of 10 — id: quantum-ml-7
Title: Quantum Natural Language Processing
Technologies: PennyLane, Python, Qiskit ML, PyTorch
Description: Explore quantum approaches to NLP including DisCoCat compositional models and quantum sentence classification. Implement a small quantum text classifier.
Topics:
- DisCoCat framework
- Pregroup grammars
- lambeq library
- Quantum sentence circuits
- Word meaning as quantum state
- Compositional semantics
- Quantum NLP benchmarks

### Layer 8 of 10 — id: quantum-ml-8
Title: Quantum Transfer Learning
Technologies: PennyLane, PyTorch, VQC, Python
Description: Apply transfer learning techniques to quantum ML by combining pretrained classical networks with trainable quantum layers. Fine-tune hybrid models on small datasets.
Topics:
- Transfer learning fundamentals
- Hybrid classical-quantum architectures
- Quantum layer as fine-tuning head
- Dress and undress techniques
- Feature extraction with CNNs
- Few-shot learning with QML
- Benchmarking hybrid vs classical transfer

### Layer 9 of 10 — id: quantum-ml-9
Title: Quantum ML on Real Hardware
Technologies: PennyLane, IBM Q, Qiskit ML, Python
Description: Deploy quantum ML models onto real quantum hardware and analyze the effect of noise on model performance. Apply noise-aware training and error mitigation techniques.
Topics:
- Running PennyLane on IBM Q
- Noise impact on QML models
- Noise-aware training strategies
- Zero-noise extrapolation for QML
- Probabilistic error cancellation
- Hardware-efficient ansatz design
- Calibration drift effects

### Layer 10 of 10 — id: quantum-ml-10
Title: Quantum Advantage in ML and Research Frontiers
Technologies: PennyLane, Python, Qiskit ML, PyTorch
Description: Critically evaluate claimed quantum advantages in ML, study dequantization results, and explore open research problems. Reproduce a recent QML paper and propose an improvement.
Topics:
- Quantum advantage criteria in ML
- Dequantization theorems
- Classical simulation limits
- QML on non-Euclidean data
- Quantum graph neural networks
- Fault-tolerant QML prospects
- Open problems in QML theory

Start now with Layer 1.
