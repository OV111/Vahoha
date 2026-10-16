You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Red Team Operator" (red-team, category cybersecurity). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: red-team-1
Title: Foundations and Legal Framework
Technologies: Rules of Engagement, Legal Docs, PTES, Scoping
Description: Understand the legal, ethical, and operational framework that governs red team engagements. All red team activity must occur only against authorized targets under a signed rules of engagement.
Topics:
- Rules of engagement
- Scope definition
- Authorization documents
- Deconfliction procedures
- Red team vs pentest differences

### Layer 2 of 10 — id: red-team-2
Title: Pentesting Prerequisites
Technologies: Kali Linux, Metasploit, Nmap, Burp Suite
Description: Ensure solid penetration testing fundamentals before progressing to red team tradecraft. Red teamers build on pentesting skills with added emphasis on stealth and persistence.
Topics:
- Network scanning
- Exploitation basics
- Web app testing
- Password attacks
- Post-exploitation basics

### Layer 3 of 10 — id: red-team-3
Title: OPSEC and Tradecraft
Technologies: OPSEC, Logging Awareness, Infrastructure Setup, Redirectors
Description: Learn operational security practices that prevent detection during authorized red team engagements. Good OPSEC simulates real adversary behavior and tests blue team detection capabilities.
Topics:
- OPSEC principles
- Avoiding log artifacts
- Redirector infrastructure
- Domain fronting basics
- Attack infrastructure design

### Layer 4 of 10 — id: red-team-4
Title: Command and Control
Technologies: Cobalt Strike, Havoc, Sliver, Mythic
Description: Learn to operate C2 frameworks to manage implants and execute post-exploitation tasks during authorized engagements. C2 infrastructure forms the backbone of red team operations.
Topics:
- C2 architecture
- Beacon configuration
- Listener types
- Payload staging
- C2 profiles and evasion

### Layer 5 of 10 — id: red-team-5
Title: Active Directory Attacks
Technologies: BloodHound, Impacket, Rubeus, PowerView
Description: Master Active Directory attack techniques including enumeration, privilege escalation, and lateral movement in authorized lab environments. AD attacks are central to most enterprise red team engagements.
Topics:
- AD enumeration with BloodHound
- Kerberoasting
- AS-REP roasting
- Pass-the-hash
- DCSync attacks

### Layer 6 of 10 — id: red-team-6
Title: Phishing and Initial Access
Technologies: GoPhish, Evilginx, Macro Payloads, HTML Smuggling
Description: Learn social engineering and phishing techniques used to simulate real-world initial access in authorized engagements. Phishing remains the most common initial access vector in enterprise breaches.
Topics:
- Phishing campaign setup
- Evilginx reverse proxy
- Payload delivery methods
- HTML smuggling
- Spear phishing pretexting

### Layer 7 of 10 — id: red-team-7
Title: Evasion and AV Bypass
Technologies: Shellcode, Obfuscation, AMSI Bypass, EDR Evasion
Description: Learn payload obfuscation and AV/EDR evasion techniques for authorized lab use. Bypassing security controls tests the real-world effectiveness of a target organizations defenses.
Topics:
- AMSI bypass techniques
- Shellcode injection methods
- EDR hook evasion
- Payload obfuscation
- Living-off-the-land binaries

### Layer 8 of 10 — id: red-team-8
Title: Lateral Movement and Persistence
Technologies: WMI, PsExec, Scheduled Tasks, Registry
Description: Execute lateral movement and establish persistence mechanisms as part of authorized adversary simulation. These techniques test whether blue teams can detect long-dwell threats.
Topics:
- WMI lateral movement
- SMB-based movement
- Scheduled task persistence
- Registry run key persistence
- Service-based persistence

### Layer 9 of 10 — id: red-team-9
Title: Reporting and Adversary Emulation
Technologies: VECTR, ATT&CK Navigator, Executive Reports, Technical Reports
Description: Document red team findings with precision and map techniques to ATT&CK for blue team improvement. Red team reports must communicate risk clearly to both executive and technical audiences.
Topics:
- Adversary emulation plans
- ATT&CK Navigator mapping
- Attack path narrative
- Executive summary writing
- Remediation recommendations

### Layer 10 of 10 — id: red-team-10
Title: Advanced Adversary Simulation
Technologies: APT Emulation, Custom Implants, Purple Teaming, TIBER-EU
Description: Simulate advanced persistent threat actor TTPs in authorized purple team and TIBER-style engagements. Elite red teamers collaborate directly with blue teams to rapidly improve enterprise defenses.
Topics:
- APT campaign emulation
- Custom C2 implant development
- Purple team exercises
- TIBER-EU methodology
- Continuous red team programs

Start now with Layer 1.
