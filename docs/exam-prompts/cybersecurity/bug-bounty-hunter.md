You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Bug Bounty Hunter" (bug-bounty-hunter, category cybersecurity). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: bug-bounty-hunter-1
Title: Bug Bounty Foundations and Ethics
Technologies: HackerOne, Bugcrowd, Scope rules, Responsible disclosure
Description: Understand the legal, ethical, and operational framework of authorized bug bounty hunting before touching any target. Learn how programs define scope, safe harbor protections, and responsible disclosure standards.
Topics:
- What bug bounty programs are and how they work
- Reading and respecting program scope and rules
- Safe harbor and legal protections for hunters
- Responsible disclosure vs full disclosure
- Setting up HackerOne and Bugcrowd profiles
- Common report writing expectations and quality standards

### Layer 2 of 10 — id: bug-bounty-hunter-2
Title: Reconnaissance and Attack Surface Mapping
Technologies: Amass, Subfinder, Shodan, Recon-ng
Description: Build a systematic recon methodology to map the full attack surface of a target before attempting any exploitation. Discover subdomains, open ports, exposed services, and technology fingerprints within authorized scope.
Topics:
- Passive vs active reconnaissance trade-offs
- Subdomain enumeration with Amass and Subfinder
- Port and service scanning within authorized scope
- Technology fingerprinting with Wappalyzer and Whatweb
- Google Dorks and search engine recon
- Shodan and Censys for asset discovery
- Organizing and managing recon output

### Layer 3 of 10 — id: bug-bounty-hunter-3
Title: Web Vulnerability Fundamentals with Burp Suite
Technologies: Burp Suite Community, HTTP interception, Repeater, Intruder
Description: Master Burp Suite as the primary tool for intercepting, modifying, and replaying HTTP traffic to test web application security controls. Learn the core workflow for manually testing web vulnerabilities in authorized programs.
Topics:
- Burp Suite proxy setup and browser configuration
- Intercepting and modifying HTTP requests
- Using Repeater for manual vulnerability testing
- Sitemap and crawling within authorized scope
- Intruder for brute force and parameter fuzzing
- Saving and organizing Burp project files

### Layer 4 of 10 — id: bug-bounty-hunter-4
Title: OWASP Top 10 in Practice
Technologies: OWASP Top 10, DVWA, WebGoat, Juice Shop
Description: Gain hands-on experience exploiting every OWASP Top 10 vulnerability category in legal practice environments before hunting in real authorized programs. Build muscle memory for identifying these issues during recon and testing.
Topics:
- Injection attacks (SQLi, command injection, SSTI)
- Broken authentication and session management
- Cross-Site Scripting (XSS) - reflected, stored, DOM
- Insecure Direct Object References (IDOR)
- Security misconfiguration and exposed admin panels
- Vulnerable and outdated components
- Cryptographic failures and sensitive data exposure

### Layer 5 of 10 — id: bug-bounty-hunter-5
Title: Authentication and Authorization Bugs
Technologies: IDOR, BOLA, OAuth testing, JWT analysis
Description: Develop expertise in finding authentication flaws and authorization bypasses - consistently among the highest-paid vulnerability classes in bug bounty programs. Learn to systematically test IDOR, BOLA, and broken OAuth implementations.
Topics:
- IDOR discovery methodology and horizontal vs vertical privilege escalation
- Testing multi-step workflows for authorization gaps
- OAuth 2.0 common vulnerabilities (open redirect, state bypass, token leakage)
- JWT algorithm confusion and signature bypass
- Password reset flow vulnerabilities
- Multi-tenancy isolation bypass testing

### Layer 6 of 10 — id: bug-bounty-hunter-6
Title: Fuzzing and Automated Vulnerability Discovery
Technologies: ffuf, Nuclei, Param Miner, Turbo Intruder
Description: Automate vulnerability discovery at scale using fuzzing and template-based scanning to find issues across large scopes faster than manual testing alone. Learn to build custom Nuclei templates and ffuf wordlists for specific targets.
Topics:
- Directory and parameter fuzzing with ffuf
- Nuclei template-based scanning within authorized scope
- Parameter discovery with Param Miner
- High-speed fuzzing with Turbo Intruder
- Building custom wordlists from target technology
- Interpreting and triaging automated scan results

### Layer 7 of 10 — id: bug-bounty-hunter-7
Title: Server-Side Vulnerabilities
Technologies: SSRF, XXE, Deserialization, Path traversal
Description: Master server-side vulnerability classes that often lead to critical and high severity findings with major business impact in authorized programs. Learn to identify and exploit SSRF, XXE, and insecure deserialization issues.
Topics:
- Server-Side Request Forgery (SSRF) identification and exploitation
- Cloud metadata endpoint abuse via SSRF
- XML External Entity (XXE) injection
- Insecure deserialization identification and gadget chains
- Path traversal and local file inclusion
- Template injection (SSTI) in common frameworks

### Layer 8 of 10 — id: bug-bounty-hunter-8
Title: API Security Testing
Technologies: REST API testing, GraphQL, Postman, API fuzzing
Description: Test REST and GraphQL APIs for security issues using the OWASP API Security Top 10 as a guide, with specialized tooling for API-specific attack classes. Many modern programs have large API attack surfaces with fewer eyes on them.
Topics:
- OWASP API Security Top 10 overview
- REST API testing methodology with Burp and Postman
- GraphQL introspection and injection testing
- Excessive data exposure in API responses
- API rate limiting and resource exhaustion testing
- Mass assignment and parameter pollution
- API key leakage and authentication bypass

### Layer 9 of 10 — id: bug-bounty-hunter-9
Title: Business Logic and High-Impact Chaining
Technologies: Business logic testing, Vulnerability chaining, Impact analysis, PoC development
Description: Find and exploit business logic vulnerabilities that automated scanners miss entirely, and chain multiple low-severity bugs into high or critical severity findings through creative impact analysis. Learn to maximize bounty rewards by demonstrating full impact.
Topics:
- Business logic flaw identification methodology
- Common logic flaws (price manipulation, workflow bypass, race conditions)
- Race condition testing and exploitation
- Chaining low-severity bugs for maximum impact
- Escalating SSRF to RCE or credential theft
- Writing PoC code that demonstrates real-world impact
- Impact justification in reports to increase bounty value

### Layer 10 of 10 — id: bug-bounty-hunter-10
Title: Advanced Techniques and Program Scaling
Technologies: Automation pipelines, Custom tooling, Program selection strategy, Reputation building
Description: Operate as a professional bug bounty hunter with systematic workflows, custom automation, and a strong reputation on major platforms. Build sustainable hunting processes that scale across multiple programs and bug classes.
Topics:
- Building a personal bug bounty automation pipeline
- Program selection and ROI analysis
- Continuous monitoring for new assets and changes
- Writing top-tier reports that maximize bounty rewards
- Building platform reputation and private program access
- Collaborating with other hunters on team bounties
- Tax, legal, and business considerations for full-time hunters

Start now with Layer 1.
