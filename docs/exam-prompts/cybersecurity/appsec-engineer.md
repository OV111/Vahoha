You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "AppSec Engineer" (appsec-engineer, category cybersecurity). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: appsec-engineer-1
Title: Secure Development Foundations
Technologies: HTTP, REST APIs, Git, OWASP
Description: Understand web application architecture and how developers build modern applications. AppSec engineers must read and reason about code to find and fix security issues.
Topics:
- HTTP request and response cycle
- REST API basics
- Authentication flows
- Source control with Git
- Developer security mindset

### Layer 2 of 10 — id: appsec-engineer-2
Title: OWASP Top 10
Technologies: OWASP, DVWA, WebGoat, Burp Suite
Description: Study the OWASP Top 10 vulnerabilities and understand how each occurs and how to remediate them. Hands-on practice with intentionally vulnerable apps reinforces each concept.
Topics:
- Injection flaws
- Broken authentication
- Insecure deserialization
- SSRF
- Security misconfiguration

### Layer 3 of 10 — id: appsec-engineer-3
Title: Static Analysis and SAST
Technologies: Semgrep, SonarQube, Checkmarx, CodeQL
Description: Learn to use static application security testing tools to find vulnerabilities in source code. SAST shifts security left by catching issues before code reaches production.
Topics:
- SAST tool types
- Running Semgrep rules
- SonarQube setup
- Interpreting findings
- Reducing false positives

### Layer 4 of 10 — id: appsec-engineer-4
Title: Dynamic Analysis and DAST
Technologies: OWASP ZAP, Burp Suite, Nikto, API Fuzzing
Description: Use dynamic testing tools to find runtime vulnerabilities in running applications. DAST complements SAST by catching issues that only appear during execution.
Topics:
- DAST vs SAST
- OWASP ZAP automated scan
- Burp Suite active scanner
- API endpoint fuzzing
- Reporting DAST findings

### Layer 5 of 10 — id: appsec-engineer-5
Title: Threat Modeling
Technologies: STRIDE, PASTA, Microsoft Threat Modeling Tool, Data Flow Diagrams
Description: Learn structured threat modeling to identify security risks during the design phase. Early threat modeling prevents costly redesigns and reduces attack surface before code is written.
Topics:
- STRIDE methodology
- Data flow diagrams
- Trust boundaries
- Threat enumeration
- Mitigation mapping

### Layer 6 of 10 — id: appsec-engineer-6
Title: Secure Code Review
Technologies: Python, JavaScript, Java, Code Review Tools
Description: Develop the ability to manually review source code for security vulnerabilities across common languages. Manual review catches logic flaws that automated tools miss.
Topics:
- Input validation patterns
- SQL injection in code
- Insecure crypto usage
- Auth and session flaws
- Code review checklist

### Layer 7 of 10 — id: appsec-engineer-7
Title: API Security
Technologies: REST, GraphQL, JWT, OWASP API Top 10
Description: Learn the unique security challenges of modern REST and GraphQL APIs. APIs are a primary attack surface in modern applications and require dedicated security testing approaches.
Topics:
- OWASP API Top 10
- JWT vulnerabilities
- Broken object level authorization
- API fuzzing techniques
- API gateway security

### Layer 8 of 10 — id: appsec-engineer-8
Title: DevSecOps and CI/CD Security
Technologies: GitHub Actions, Jenkins, Semgrep, SCA
Description: Integrate security tooling into CI/CD pipelines so security checks run on every code change. DevSecOps embeds AppSec engineers as partners in the development workflow.
Topics:
- CI/CD pipeline stages
- Adding SAST to GitHub Actions
- Software composition analysis
- Container image scanning
- Security gates in pipelines

### Layer 9 of 10 — id: appsec-engineer-9
Title: Vulnerability Management and Triage
Technologies: CVSS, Jira, Risk Scoring, Bug Bounty
Description: Learn to prioritize and manage a vulnerability backlog across engineering teams. AppSec engineers must balance security risk against development velocity with clear communication.
Topics:
- CVSS scoring
- Risk-based prioritization
- Writing developer-friendly findings
- SLA and remediation tracking
- Bug bounty triage

### Layer 10 of 10 — id: appsec-engineer-10
Title: Advanced AppSec Program Leadership
Technologies: BSIMM, SAMM, Pentest Coordination, Security Champions
Description: Lead a mature application security program by building developer security culture and measuring program effectiveness. Senior AppSec engineers drive organizational security improvement through metrics and advocacy.
Topics:
- OWASP SAMM maturity model
- Security champions program
- AppSec metrics and KPIs
- Coordinating third-party pentests
- Secure design reviews at scale

Start now with Layer 1.
