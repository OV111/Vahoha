You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "SOC Analyst" (soc-analyst, category cybersecurity). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: soc-analyst-1
Title: IT and Networking Foundations
Technologies: TCP/IP, DNS, HTTP, Wireshark
Description: Establish core networking and IT knowledge required for monitoring and incident analysis. SOC analysts must understand normal traffic to identify anomalies.
Topics:
- TCP/IP fundamentals
- DNS and HTTP protocols
- Common ports and services
- Packet analysis basics
- Log types overview

### Layer 2 of 10 — id: soc-analyst-2
Title: Security Fundamentals
Technologies: CIA Triad, CVE, MITRE ATT&CK, IOCs
Description: Learn foundational security concepts and threat frameworks used daily in SOC operations. Familiarity with MITRE ATT&CK accelerates alert triage and investigation.
Topics:
- CIA Triad
- Threat actors and motives
- MITRE ATT&CK framework
- Indicators of compromise
- Kill chain model

### Layer 3 of 10 — id: soc-analyst-3
Title: Log Analysis
Technologies: Windows Event Logs, Syslog, Linux Logs, Grep
Description: Develop skills in reading and parsing logs from operating systems and applications. Log analysis is the primary daily activity for Tier 1 and Tier 2 SOC analysts.
Topics:
- Windows Event IDs
- Linux auth logs
- Apache access logs
- Log parsing with grep and awk
- Identifying failed logins

### Layer 4 of 10 — id: soc-analyst-4
Title: SIEM Fundamentals
Technologies: Splunk, Elastic SIEM, QRadar, Alerts
Description: Learn to ingest, search, and correlate security events using a SIEM platform. Splunk and Elastic SIEM are the most common platforms in enterprise SOC environments.
Topics:
- SIEM architecture
- Log ingestion and parsing
- Search queries
- Creating dashboards
- Correlation rules basics

### Layer 5 of 10 — id: soc-analyst-5
Title: IDS and IPS
Technologies: Snort, Suricata, Zeek, Alert Rules
Description: Understand how intrusion detection and prevention systems generate and classify alerts. Analysts must tune IDS rules to minimize false positives while catching real threats.
Topics:
- IDS vs IPS
- Snort rule syntax
- Suricata deployment
- Alert categories
- Reducing false positives

### Layer 6 of 10 — id: soc-analyst-6
Title: Threat Intelligence
Technologies: MISP, VirusTotal, OTX, Threat Feeds
Description: Learn to consume and apply threat intelligence to improve detection and investigation quality. Threat intel enriches alerts with context about known adversaries and indicators.
Topics:
- Threat intel types
- IOC feeds
- VirusTotal analysis
- MISP platform basics
- Enriching SIEM alerts with intel

### Layer 7 of 10 — id: soc-analyst-7
Title: Incident Triage and Response
Technologies: Playbooks, Ticketing, TheHive, Escalation
Description: Learn structured incident triage workflows and how to escalate and document security events. Following playbooks ensures consistent and thorough response to common alert types.
Topics:
- Alert triage process
- Severity classification
- Escalation criteria
- Incident documentation
- SOC ticketing workflows

### Layer 8 of 10 — id: soc-analyst-8
Title: Malware Analysis Basics
Technologies: Any.run, Cuckoo, PEStudio, Strings
Description: Develop basic malware analysis skills to enrich SOC investigations without a dedicated reverse engineering role. Static and dynamic analysis helps classify threats quickly.
Topics:
- Static vs dynamic analysis
- PE header analysis
- Sandboxing with Any.run
- Extracting strings
- Behavioral indicators

### Layer 9 of 10 — id: soc-analyst-9
Title: Advanced SIEM and Detection Engineering
Technologies: Splunk SPL, Sigma Rules, YARA, KQL
Description: Build custom detection rules and advanced queries to proactively find threats in SIEM data. Detection engineering reduces analyst fatigue by automating high-confidence alert logic.
Topics:
- Advanced Splunk SPL queries
- Writing Sigma rules
- YARA rule syntax
- KQL for Microsoft Sentinel
- Tuning detection logic

### Layer 10 of 10 — id: soc-analyst-10
Title: Threat Hunting and SOC Maturity
Technologies: Threat Hunting, Splunk, MITRE ATT&CK, Hypothesis-Based Hunting
Description: Move from reactive alert-handling to proactive threat hunting using hypothesis-driven methodologies. Senior SOC analysts lead hunting initiatives that surface threats before they trigger alerts.
Topics:
- Threat hunting methodology
- Hypothesis development
- Hunting with ATT&CK
- Documenting hunt results
- Feeding hunt outcomes into detections

Start now with Layer 1.
