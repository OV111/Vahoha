You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Security Dev" (security-dev, category backend). It has 10 layers, listed at the bottom.

## HOW TO ANSWER
Write the bank for ONE layer per reply, in the order listed. Each reply must contain exactly 60 questions for that layer. After each reply, stop and wait; I will type "next".

## OUTPUT FORMAT — follow exactly
First line of EVERY reply, including every reply after "next": the layer marker, exactly like this, with the layer id from the list. A reply without it is thrown away by the importer.
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
5. LENGTH BIAS IS THE MOST COMMON FAILURE, and earlier banks failed it badly (the correct answer was the longest choice in up to 95% of questions, so learners passed by picking the longest). Follow this plan exactly. Number the questions 1 to 60; the position of question N in a cycle of 4 fixes how long its CORRECT choice is compared with its three wrong choices:
   - N = 1, 5, 9, ...: the correct choice is the SHORTEST of the four.
   - N = 2, 6, 10, ...: the correct choice is the second shortest.
   - N = 3, 7, 11, ...: the correct choice is the second longest.
   - N = 4, 8, 12, ...: the correct choice is the LONGEST of the four.
   Write the wrong choices with the same level of detail, specific terms and qualifiers as the right one; never make the right one the only careful, hedged or complete-sounding choice. Wrong choices must sound like a real technical claim, never absurd ("compiles HTML into machine code").
6. Spread "answerIdx" evenly across 0, 1, 2 and 3 (about 15 each). Do not put the answer at index 0 or 1 most of the time.
7. Difficulty mix per layer: about one third easy, half medium, the rest hard.
8. Cover every topic of the layer, roughly evenly. Never repeat or rephrase a question within the layer.
9. Each question must stand alone: no "see the diagram", no references to earlier questions. Short code snippets inside the stem are fine (use plain text, \n for line breaks, no markdown fences inside the JSON strings).
10. Stay accurate for current stable versions of the technologies. Avoid questions whose answer changed recently or is opinion.
11. Escape quotes properly so the JSON parses. No trailing commas, no comments.

## CHECK BEFORE YOU SEND EACH REPLY
Silently verify all of these, and fix the reply until every one holds. Do not print the check.
- The first line is LAYER: <the right layer id>.
- The array has exactly 60 questions.
- Count the questions whose correct choice is the longest of its four: at most 15. If more, lengthen wrong choices or shorten the right one until it holds.
- Each answerIdx value (0, 1, 2, 3) appears about 15 times.

## LAYERS
### Layer 1 of 10 — id: security-dev-1
Title: Security Foundations
Technologies: CIA Triad, Threats, Networking
Description: Build a mental model of security. Learn the core principles and the threat landscape every developer must understand.
Topics:
- Confidentiality, integrity & availability
- Threats, vulnerabilities & risk
- Defense in depth & least privilege
- Networking & HTTP basics for security
- Encoding vs encryption vs hashing
- The attacker mindset

### Layer 2 of 10 — id: security-dev-2
Title: Web Security & OWASP Top 10
Technologies: OWASP, XSS, SQLi
Description: Learn the most common web vulnerabilities by exploiting and then fixing them. The OWASP Top 10 is your map.
Topics:
- Injection — SQLi & command injection
- Cross-site scripting (XSS)
- Cross-site request forgery (CSRF)
- Broken access control
- Security misconfiguration
- SSRF & insecure deserialization

### Layer 3 of 10 — id: security-dev-3
Title: Authentication
Technologies: OAuth2, OIDC, JWT
Description: Get authentication right. Implement secure login flows with OAuth2, OpenID Connect and JSON Web Tokens.
Topics:
- Password storage — bcrypt, argon2
- Sessions vs tokens
- JWT structure, signing & pitfalls
- OAuth2 grant types
- OpenID Connect
- Multi-factor authentication

### Layer 4 of 10 — id: security-dev-4
Title: Authorization & Access Control
Technologies: RBAC, ABAC, Policies
Description: Control who can do what. Design robust authorization models and avoid the #1 web risk: broken access control.
Topics:
- RBAC vs ABAC vs ReBAC
- Principle of least privilege
- Object-level authorization
- Policy engines (OPA / Cedar)
- Multi-tenancy isolation
- Common access-control bugs

### Layer 5 of 10 — id: security-dev-5
Title: Cryptography Essentials
Technologies: Hashing, AES, TLS
Description: Use cryptography correctly. Learn the primitives, when to use each, and the dangers of rolling your own.
Topics:
- Hashing & HMAC
- Symmetric encryption (AES-GCM)
- Asymmetric encryption & key exchange
- Digital signatures & certificates
- TLS & the handshake
- Key management & secrets

### Layer 6 of 10 — id: security-dev-6
Title: Secure Coding Practices
Technologies: Validation, Sanitization, Secrets
Description: Write code that resists attack. Apply input validation, output encoding and safe defaults throughout your app.
Topics:
- Input validation & allow-lists
- Output encoding & escaping
- Parameterized queries
- Secrets management
- Secure defaults & error handling
- Dependency & supply-chain hygiene

### Layer 7 of 10 — id: security-dev-7
Title: API & Network Security
Technologies: TLS, CORS, Rate Limiting
Description: Protect data in transit and APIs at the edge. Configure TLS, CORS and defenses against abuse.
Topics:
- HTTPS & certificate management
- CORS done right
- Security headers & CSP
- Rate limiting & throttling
- API authentication & keys
- OWASP API Security Top 10

### Layer 8 of 10 — id: security-dev-8
Title: Threat Modeling & Pen Testing
Technologies: STRIDE, Burp Suite, Recon
Description: Think like an attacker. Model threats systematically and learn the basics of ethical penetration testing.
Topics:
- Threat modeling with STRIDE
- Attack surface mapping
- Recon & enumeration
- Using Burp Suite & proxies
- Exploiting then reporting findings
- Responsible disclosure

### Layer 9 of 10 — id: security-dev-9
Title: Security Testing & DevSecOps
Technologies: SAST, DAST, Dependency Scanning
Description: Automate security in the pipeline. Add static, dynamic and dependency scanning so issues are caught early.
Topics:
- SAST & DAST tools
- Dependency & SCA scanning
- Secret scanning
- Container image scanning
- Security gates in CI/CD
- Shifting security left

### Layer 10 of 10 — id: security-dev-10
Title: Incident Response & Compliance
Technologies: Logging, IR, Compliance
Description: Prepare for when things go wrong. Build logging, an incident response plan, and awareness of compliance regimes.
Topics:
- Security logging & monitoring
- Detection & alerting
- The incident response lifecycle
- Post-mortems & root-cause analysis
- GDPR, SOC 2 & PCI basics
- Security policies & training

Start now with Layer 1.
