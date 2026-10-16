You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "DevSecOps Engineer" (devsecops, category devops). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: devsecops-1
Title: Security Fundamentals for DevOps
Technologies: Linux, Git, OWASP
Description: This layer introduces core security concepts within a DevOps workflow. It matters because shifting security left starts with understanding threats, risk, and the secure development lifecycle.
Topics:
- CIA triad and threat modeling
- Common vulnerability classes
- OWASP Top Ten
- Shift-left security mindset
- Secure development lifecycle
- Least privilege principles

### Layer 2 of 10 — id: devsecops-2
Title: Dependency and SCA Scanning with Snyk
Technologies: Snyk, npm, Git
Description: This layer covers finding vulnerabilities in third-party dependencies. It matters because most modern applications inherit risk from open-source libraries.
Topics:
- Software composition analysis
- Scanning dependencies with Snyk
- Understanding CVEs and severity
- License compliance
- Fixing and upgrading packages
- Ignoring and triaging findings

### Layer 3 of 10 — id: devsecops-3
Title: Static Analysis with SonarQube
Technologies: SonarQube, Git, GitHub Actions
Description: This layer teaches scanning source code for bugs and security flaws. It matters because static analysis catches insecure code before it ever runs.
Topics:
- Static application security testing
- Quality gates and rules
- Detecting security hotspots
- Code smells and coverage
- Integrating scans in pipelines
- Triaging and tracking issues

### Layer 4 of 10 — id: devsecops-4
Title: Container and Image Security with Trivy
Technologies: Trivy, Docker, Kubernetes
Description: This layer covers scanning container images and configurations for vulnerabilities. It matters because containers can ship known vulnerabilities and misconfigurations into production.
Topics:
- Image vulnerability scanning
- Base image hardening
- Scanning IaC with Trivy
- Misconfiguration detection
- SBOM generation
- Failing builds on findings

### Layer 5 of 10 — id: devsecops-5
Title: Secrets Management with Vault
Technologies: HashiCorp Vault, Kubernetes, OIDC
Description: This layer teaches storing and distributing secrets securely. It matters because hardcoded credentials are a frequent and dangerous source of breaches.
Topics:
- Vault architecture and auth methods
- Static and dynamic secrets
- Encryption as a service
- Secret rotation
- Injecting secrets into workloads
- Audit logging

### Layer 6 of 10 — id: devsecops-6
Title: Secure CI/CD Pipelines
Technologies: GitHub Actions, Snyk, Trivy
Description: This layer covers hardening the delivery pipeline itself. It matters because pipelines are a high-value target and a single weak step can compromise everything.
Topics:
- Pipeline threat modeling
- Least privilege for runners
- OIDC for cloud access
- Integrating security scans
- Signing artifacts
- Protecting pipeline secrets

### Layer 7 of 10 — id: devsecops-7
Title: Dynamic Testing and Runtime Security
Technologies: OWASP ZAP, Falco, Kubernetes
Description: This layer covers testing running applications and detecting threats at runtime. It matters because some vulnerabilities only appear when systems are actually executing.
Topics:
- Dynamic application security testing
- Scanning APIs with ZAP
- Runtime threat detection
- Behavioral monitoring with Falco
- Intrusion detection
- Incident triage

### Layer 8 of 10 — id: devsecops-8
Title: Policy as Code and Compliance
Technologies: OPA, Kubernetes, Terraform
Description: This layer teaches enforcing security and compliance rules automatically. It matters because manual policy enforcement does not scale and is easily bypassed.
Topics:
- Policy as code concepts
- Open Policy Agent and Rego
- Admission control policies
- IaC policy scanning
- Compliance frameworks
- Continuous compliance

### Layer 9 of 10 — id: devsecops-9
Title: Supply Chain Security
Technologies: Sigstore, Trivy, SLSA
Description: This layer covers securing the software supply chain end to end. It matters because attackers increasingly target build systems and dependencies rather than running apps.
Topics:
- Supply chain attack vectors
- Software bill of materials
- Artifact signing with Sigstore
- Provenance and attestation
- SLSA levels
- Verifying signatures in deployment

### Layer 10 of 10 — id: devsecops-10
Title: Security Operations at Scale
Technologies: Vault, Falco, SIEM
Description: This layer covers running security operations across a production organization. It matters because security must be continuous, measurable, and integrated into daily operations at scale.
Topics:
- Centralized logging and SIEM
- Vulnerability management programs
- Incident response playbooks
- Security metrics and reporting
- Continuous compliance auditing
- Security culture and training

Start now with Layer 1.
