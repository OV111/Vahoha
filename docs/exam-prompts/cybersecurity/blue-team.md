You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Blue Team Defender" (blue-team, category cybersecurity). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: blue-team-1
Title: Networking and OS Security Basics
Technologies: TCP/IP, Windows, Linux, Firewalls
Description: Build the foundational networking and operating system knowledge needed for defensive security work. Blue teamers must deeply understand normal system behavior to detect deviations.
Topics:
- TCP/IP fundamentals
- Windows security model
- Linux hardening basics
- Firewall rule logic
- Common attack vectors overview

### Layer 2 of 10 — id: blue-team-2
Title: Hardening and Secure Configuration
Technologies: CIS Benchmarks, Group Policy, Lynis, AppArmor
Description: Apply industry-standard hardening baselines to operating systems and applications. Reducing attack surface through hardening is the most cost-effective defensive control.
Topics:
- CIS Benchmark application
- Windows Group Policy hardening
- Linux hardening with Lynis
- Disabling unnecessary services
- Patch management basics

### Layer 3 of 10 — id: blue-team-3
Title: Log Analysis and Monitoring
Technologies: Windows Event Logs, Syslog, Elastic Stack, Graylog
Description: Collect and analyze logs from endpoints, servers, and network devices to detect threats. Centralized logging is the foundation of any effective defensive monitoring capability.
Topics:
- Windows Event IDs for security
- Syslog centralization
- Elastic Stack setup
- Creating log alerts
- Baseline behavior analysis

### Layer 4 of 10 — id: blue-team-4
Title: EDR and Endpoint Security
Technologies: Microsoft Defender, CrowdStrike, Carbon Black, Sysmon
Description: Deploy and configure endpoint detection and response tools to monitor and protect endpoints. EDR provides deep visibility into endpoint activity that traditional AV cannot match.
Topics:
- EDR architecture
- Sysmon deployment and config
- Endpoint alert triage
- Behavioral detection rules
- Isolating infected endpoints

### Layer 5 of 10 — id: blue-team-5
Title: Network Defense
Technologies: Zeek, Suricata, pfSense, NetFlow
Description: Monitor and protect network infrastructure using network security tools and traffic analysis. Network-based controls complement endpoint defenses and catch threats that bypass EDR.
Topics:
- Network segmentation
- IDS/IPS with Suricata
- Zeek network logging
- NetFlow analysis
- Firewall rule management

### Layer 6 of 10 — id: blue-team-6
Title: Incident Response
Technologies: IR Playbooks, Volatility, FTK Imager, TheHive
Description: Execute structured incident response procedures to contain and eradicate threats quickly. A well-rehearsed IR process minimizes attacker dwell time and business impact.
Topics:
- IR lifecycle phases
- Evidence preservation
- Memory acquisition
- Containment strategies
- Post-incident review

### Layer 7 of 10 — id: blue-team-7
Title: Digital Forensics
Technologies: Autopsy, Volatility, FTK, KAPE
Description: Investigate compromised systems using digital forensics tools to reconstruct attacker activity. Forensic evidence supports legal proceedings and improves detection after an incident.
Topics:
- Disk image acquisition
- File system forensics
- Memory forensics with Volatility
- Artifact collection with KAPE
- Timeline analysis

### Layer 8 of 10 — id: blue-team-8
Title: Threat Intelligence Integration
Technologies: MISP, OpenCTI, VirusTotal, STIX/TAXII
Description: Ingest and operationalize threat intelligence to proactively block and detect known threats. Integrating intelligence feeds with SIEM and firewalls automates response to known indicators.
Topics:
- STIX and TAXII standards
- MISP platform setup
- IOC ingestion into SIEM
- Threat intel sharing
- Intel-driven hunting

### Layer 9 of 10 — id: blue-team-9
Title: Detection Engineering
Technologies: Sigma, YARA, Splunk SPL, ATT&CK
Description: Build and maintain high-fidelity detection rules mapped to the MITRE ATT&CK framework. Detection engineering reduces noise and ensures critical attacker techniques reliably trigger alerts.
Topics:
- Sigma rule writing
- YARA rule development
- ATT&CK coverage mapping
- Alert tuning and baselining
- Detection lifecycle management

### Layer 10 of 10 — id: blue-team-10
Title: Blue Team Program Maturity
Technologies: Purple Teaming, SOC Metrics, SOAR, Tabletop Exercises
Description: Lead a mature defensive security program by measuring effectiveness and continuously improving through purple teaming. Senior blue teamers drive organizational resilience through data-driven decision making.
Topics:
- SOAR platform automation
- SOC KPIs and metrics
- Purple team exercises
- Tabletop exercise design
- Blue team maturity models

Start now with Layer 1.
