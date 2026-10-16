You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Security Tester" (security-qa, category qa). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: security-qa-1
Title: Web Security Fundamentals for Testers
Technologies: Chrome DevTools, Burp Suite Community, OWASP, HTTP
Description: Build a mental model of web application security by studying the OWASP Top 10 and common vulnerability classes. Learn how HTTP, cookies, and sessions work from an attacker perspective.
Topics:
- OWASP Top 10 overview
- HTTP request and response anatomy
- Cookies, sessions, and tokens
- Same-origin policy and CORS
- TLS and certificate basics
- Attacker mindset and threat modeling intro

### Layer 2 of 10 — id: security-qa-2
Title: Burp Suite for Manual Security Testing
Technologies: Burp Suite, HTTP, Browser, OWASP
Description: Use Burp Suite Community Edition as an intercepting proxy to manually inspect, modify, and replay HTTP requests. Understand the Burp Suite workflow for manual vulnerability hunting.
Topics:
- Burp Suite proxy setup
- Intercepting and modifying requests
- Repeater for manual request manipulation
- Intruder for parameter fuzzing
- Decoder for encoding analysis
- Burp target site map

### Layer 3 of 10 — id: security-qa-3
Title: OWASP ZAP for DAST Scanning
Technologies: OWASP ZAP, Python, REST API, HTML Reports
Description: Automate security scanning using OWASP ZAP as a Dynamic Application Security Testing tool. Learn to run passive and active scans and interpret ZAP reports.
Topics:
- ZAP installation and daemon mode
- Spider and AJAX spider configuration
- Passive vs active scanning
- ZAP alerts: risk and confidence levels
- ZAP HTML report generation
- ZAP API for scripted scans

### Layer 4 of 10 — id: security-qa-4
Title: Injection Vulnerabilities: SQL, XSS, Command
Technologies: Burp Suite, OWASP ZAP, DVWA, SQLMap
Description: Deep-dive into the most impactful injection vulnerability classes including SQL injection, Cross-Site Scripting, and OS command injection. Practice in safe lab environments.
Topics:
- SQL injection types: classic, blind, time-based
- XSS: reflected, stored, DOM-based
- OS command injection patterns
- CSRF fundamentals
- Input validation and encoding defenses
- Testing payloads and bypass techniques

### Layer 5 of 10 — id: security-qa-5
Title: Authentication and Authorization Testing
Technologies: Burp Suite, Postman, JWT, OWASP
Description: Test authentication mechanisms for weaknesses including brute force susceptibility, session fixation, and insecure token handling. Validate authorization controls to prevent privilege escalation.
Topics:
- Brute force and account lockout testing
- Session token entropy and fixation
- JWT vulnerability testing
- Vertical and horizontal privilege escalation
- IDOR detection techniques
- OAuth and OpenID Connect security

### Layer 6 of 10 — id: security-qa-6
Title: Security Test Automation with Selenium
Technologies: Selenium, Python, OWASP ZAP, Pytest
Description: Combine functional UI automation with security scanning by running ZAP as a proxy behind Selenium tests. Detect security issues that only appear during authenticated user flows.
Topics:
- ZAP as Selenium proxy setup
- Authenticated scanning with session tokens
- Passive scanning during functional tests
- Integrating ZAP alerts into test results
- Python ZAP API client
- Security assertions in Pytest

### Layer 7 of 10 — id: security-qa-7
Title: API Security Testing
Technologies: Burp Suite, Postman, OWASP ZAP, REST
Description: Apply OWASP API Security Top 10 guidance to systematically test REST APIs for vulnerabilities specific to API endpoints. Focus on broken object-level auth and mass assignment.
Topics:
- OWASP API Security Top 10
- Broken Object Level Authorization testing
- Mass assignment vulnerability testing
- Rate limiting and throttling bypass
- API versioning security issues
- GraphQL security testing basics

### Layer 8 of 10 — id: security-qa-8
Title: Security Regression and Compliance Testing
Technologies: OWASP ZAP, Selenium, GitHub Actions, HTML Reports
Description: Ensure that previously identified and fixed vulnerabilities do not reappear by building a security regression suite. Map tests to compliance frameworks like PCI-DSS or SOC 2.
Topics:
- Security regression test suite design
- Mapping tests to compliance requirements
- PCI-DSS relevant security controls
- OWASP ASVS for test coverage
- Vulnerability re-test procedures
- Compliance evidence documentation

### Layer 9 of 10 — id: security-qa-9
Title: Threat Modeling and Security Test Planning
Technologies: STRIDE, OWASP Threat Dragon, Confluence, JIRA
Description: Proactively identify security risks during design by applying threat modeling frameworks. Translate threat model outputs into actionable security test cases.
Topics:
- STRIDE threat modeling methodology
- Data flow diagrams for threat modeling
- OWASP Threat Dragon tool
- Attack trees and abuse cases
- Security test case derivation from threats
- Threat model review in agile sprints

### Layer 10 of 10 — id: security-qa-10
Title: CI/CD DAST Integration and Secure SDLC
Technologies: GitHub Actions, OWASP ZAP, Docker, Snyk
Description: Embed DAST scanning into CI/CD pipelines so security tests run automatically on every deployment. Champion a shift-left security culture by integrating security gates early in the SDLC.
Topics:
- ZAP Docker image in CI/CD pipelines
- GitHub Actions security workflows
- Threshold-based security gates
- SAST vs DAST in a pipeline
- Dependency scanning with Snyk
- Security champion program fundamentals

Start now with Layer 1.
