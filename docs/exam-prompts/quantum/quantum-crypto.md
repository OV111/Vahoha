You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Quantum Cryptography" (quantum-crypto, category quantum). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: quantum-crypto-1
Title: Classical Cryptography and Quantum Threats
Technologies: Python, Post-Quantum, Lattices, Math
Description: Review the classical cryptographic primitives that quantum computers will break and understand why they are vulnerable. Survey the landscape of post-quantum cryptographic approaches.
Topics:
- RSA and ECC overview
- Shor's threat to public key crypto
- Grover's threat to symmetric crypto
- Harvest-now-decrypt-later attacks
- NIST PQC competition overview
- Migration timeline
- Crypto agility concept

### Layer 2 of 10 — id: quantum-crypto-2
Title: BB84 Quantum Key Distribution
Technologies: QKD, BB84, Python, Qiskit
Description: Understand the BB84 protocol and the physical principles that make quantum key distribution unconditionally secure. Implement a simulation of BB84 including eavesdropper detection.
Topics:
- BB84 protocol steps
- Conjugate bases
- Sifting and reconciliation
- Eavesdropper detection rate
- Quantum bit error rate
- Privacy amplification overview
- No-cloning theorem proof

### Layer 3 of 10 — id: quantum-crypto-3
Title: Advanced QKD Protocols
Technologies: QKD, Python, Qiskit, BB84
Description: Study E91, B92, and continuous-variable QKD protocols and compare their practical advantages. Implement E91 using entangled pairs and Bell inequality verification.
Topics:
- E91 Ekert protocol
- B92 two-state protocol
- Six-state QKD
- Continuous-variable QKD
- Measurement-device-independent QKD
- Twin-field QKD
- QKD network architectures

### Layer 4 of 10 — id: quantum-crypto-4
Title: Lattice-Based Cryptography
Technologies: Lattices, Post-Quantum, Python, Math
Description: Study the hardness of lattice problems SVP and LWE and how they underpin post-quantum cryptographic schemes. Implement basic lattice operations and understand CRYSTALS-Kyber.
Topics:
- Lattice definition and properties
- Shortest vector problem SVP
- Learning with errors LWE
- Ring-LWE variant
- CRYSTALS-Kyber KEM
- CRYSTALS-Dilithium signatures
- LWE security reductions

### Layer 5 of 10 — id: quantum-crypto-5
Title: Hash-Based and Code-Based Signatures
Technologies: Post-Quantum, Python, Lattices, Math
Description: Study hash-based signature schemes SPHINCS+ and XMSS and code-based cryptography including Classic McEliece. Implement a Merkle tree authentication scheme.
Topics:
- Merkle tree signatures
- XMSS stateful hash signatures
- SPHINCS+ stateless signatures
- McEliece code-based KEM
- Error-correcting codes
- Syndrome decoding hardness
- NIST PQC round 4 selections

### Layer 6 of 10 — id: quantum-crypto-6
Title: Quantum Random Number Generation
Technologies: QKD, Python, Qiskit, BB84
Description: Understand how quantum mechanics provides true randomness and how QRNGs differ from pseudo-random generators. Implement a simple QRNG using measurement outcomes.
Topics:
- Randomness sources in quantum mechanics
- QRNG vs PRNG
- Certified randomness expansion
- Device-independent QRNG
- Randomness extraction
- Statistical tests for randomness
- QRNG hardware implementations

### Layer 7 of 10 — id: quantum-crypto-7
Title: Quantum Authentication and Secret Sharing
Technologies: QKD, Python, Post-Quantum, Qiskit
Description: Study quantum authentication protocols and quantum secret sharing schemes that use entanglement for information-theoretic security. Implement a (2,3) quantum threshold secret sharing scheme.
Topics:
- Quantum message authentication
- Quantum one-time pad
- Quantum secret sharing
- Threshold schemes
- Quantum teleportation for crypto
- Quantum digital signatures
- Composability in quantum crypto

### Layer 8 of 10 — id: quantum-crypto-8
Title: Post-Quantum TLS and Protocol Migration
Technologies: Post-Quantum, Python, Lattices, QKD
Description: Study how TLS and other internet protocols are being updated to use post-quantum algorithms. Implement a hybrid classical/post-quantum handshake using liboqs.
Topics:
- TLS 1.3 overview
- PQ hybrid key exchange
- liboqs and OQS-OpenSSL
- Kyber in TLS
- Hybrid signature schemes
- Certificate migration challenges
- IETF PQC working groups

### Layer 9 of 10 — id: quantum-crypto-9
Title: Security Proofs in Quantum Settings
Technologies: Post-Quantum, Math, Lattices, Python
Description: Study formal security models for quantum adversaries including the quantum random oracle model and post-quantum security reductions. Understand how QROM proofs differ from classical ROM proofs.
Topics:
- Classical random oracle model
- Quantum random oracle model QROM
- Quantum adversary model
- Reduction-based security proofs
- One-way to hiding lemma
- Post-quantum CCA security
- Tight security bounds

### Layer 10 of 10 — id: quantum-crypto-10
Title: Quantum Cryptography Research and Deployment
Technologies: QKD, Post-Quantum, Lattices, BB84
Description: Survey deployed QKD networks and the current state of post-quantum cryptography rollout in industry. Design a cryptographic migration plan for a hypothetical enterprise system.
Topics:
- Global QKD network deployments
- Satellite QKD - Micius experiments
- NIST PQC standard finalists analysis
- Enterprise crypto migration strategy
- Quantum-safe PKI design
- Side-channel attacks on PQC
- Long-term security planning

Start now with Layer 1.
