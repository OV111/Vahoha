You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Blockchain Security" (blockchain-security, category blockchain). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: blockchain-security-1
Title: Smart Contract Security Mindset
Technologies: Solidity, EVM, Auditing
Description: This layer introduces the adversarial mindset needed to review smart contracts. Thinking like an attacker is the core skill of every auditor.
Topics:
- Threat modeling basics
- Trust assumptions
- Common vulnerability classes
- Reading code critically
- Severity classification
- The audit lifecycle

### Layer 2 of 10 — id: blockchain-security-2
Title: Solidity Internals for Auditors
Technologies: Solidity, EVM, Yul
Description: This layer deepens Solidity and EVM knowledge from a security angle. Many bugs hide in low-level behavior that auditors must understand.
Topics:
- Storage layout
- Function selectors and calldata
- Delegatecall and context
- Integer behavior
- Visibility pitfalls
- Low-level calls

### Layer 3 of 10 — id: blockchain-security-3
Title: Common Vulnerability Patterns
Technologies: Solidity, Auditing, EVM
Description: This layer catalogs the most frequent exploit patterns with concrete examples. Recognizing these patterns quickly is what makes reviews efficient.
Topics:
- Reentrancy
- Access control flaws
- Oracle manipulation
- Unchecked external calls
- Front-running
- Denial of service

### Layer 4 of 10 — id: blockchain-security-4
Title: Static Analysis with Slither
Technologies: Slither, Solidity, Python
Description: This layer automates vulnerability detection using the Slither static analyzer. Tooling lets auditors cover more ground and catch obvious issues fast.
Topics:
- Running Slither
- Interpreting detectors
- Filtering false positives
- Inheritance and call graphs
- Writing custom detectors
- Integrating into CI

### Layer 5 of 10 — id: blockchain-security-5
Title: Fuzzing with Echidna
Technologies: Echidna, Solidity, Foundry
Description: This layer uses property-based fuzzing to find edge cases automatically. Fuzzers discover bugs that manual review and unit tests miss.
Topics:
- Property-based testing
- Writing invariants
- Configuring Echidna
- Foundry invariant tests
- Corpus and coverage
- Interpreting failures

### Layer 6 of 10 — id: blockchain-security-6
Title: Manual Review Methodology
Technologies: Auditing, Solidity, Foundry
Description: This layer formalizes a repeatable manual review process. A systematic methodology produces consistent and defensible audit results.
Topics:
- Scoping an engagement
- Reading specs and invariants
- Note taking and tracking
- Cross-function analysis
- Proof of concept writing
- Severity and likelihood

### Layer 7 of 10 — id: blockchain-security-7
Title: DeFi-Specific Attack Vectors
Technologies: Solidity, DeFi, Auditing
Description: This layer focuses on attacks unique to decentralized finance protocols. DeFi handles large value and presents complex economic risks.
Topics:
- Flash loan attacks
- Price oracle manipulation
- Liquidity and slippage abuse
- Reward accounting bugs
- Liquidation edge cases
- Governance attacks

### Layer 8 of 10 — id: blockchain-security-8
Title: Formal Verification and Symbolic Execution
Technologies: Solidity, Halmos, Echidna
Description: This layer applies symbolic execution and formal methods to prove properties. These techniques give the strongest assurances about contract correctness.
Topics:
- Symbolic execution basics
- Writing formal specifications
- Using Halmos
- Bounded model checking
- Comparing fuzzing and proofs
- Limits of verification

### Layer 9 of 10 — id: blockchain-security-9
Title: Reporting and Disclosure
Technologies: Auditing, Documentation, Solidity
Description: This layer covers writing clear audit reports and handling responsible disclosure. Communication is as important as finding the bug itself.
Topics:
- Report structure
- Writing clear findings
- Risk ratings
- Recommended fixes
- Responsible disclosure
- Bug bounty workflows

### Layer 10 of 10 — id: blockchain-security-10
Title: Competitive Auditing and Continuous Monitoring
Technologies: Auditing, Slither, Echidna
Description: This final layer prepares you for real engagements through competitive audits and on-chain monitoring. Ongoing vigilance protects protocols after launch.
Topics:
- Competitive audit platforms
- Triage under time pressure
- Post-deployment monitoring
- On-chain alerting
- Incident response playbooks
- Building an audit portfolio

Start now with Layer 1.
