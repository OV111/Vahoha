You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Threat Hunter" (threat-hunter, category cybersecurity). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: threat-hunter-1
Title: Threat Hunting Foundations
Technologies: SOC concepts, Log analysis, Hypothesis thinking, SIEM basics
Description: Understand what threat hunting is, how it differs from reactive detection, and what a structured hunting program looks like. Build the analytical mindset required to generate and test hypotheses about adversary behavior.
Topics:
- Threat hunting vs incident response vs detection engineering
- The threat hunting maturity model
- Intelligence-driven vs technique-driven hunting
- Introduction to SIEM platforms
- Log source fundamentals (Windows events, network logs)
- Developing a hunt hypothesis

### Layer 2 of 10 — id: threat-hunter-2
Title: MITRE ATT&CK Framework for Hunters
Technologies: MITRE ATT&CK, ATT&CK Navigator, TTP mapping, Adversary emulation
Description: Master the MITRE ATT&CK framework as the primary language for describing, hunting, and detecting adversary techniques. Use ATT&CK Navigator to visualize coverage gaps and prioritize hunting campaigns.
Topics:
- ATT&CK matrix structure (tactics, techniques, sub-techniques)
- Using ATT&CK Navigator for coverage mapping
- Mapping observed behaviors to ATT&CK
- Top techniques used by tracked threat groups
- ATT&CK-based detection gap analysis
- Adversary emulation plans (CTID)

### Layer 3 of 10 — id: threat-hunter-3
Title: Windows Event Log Analysis
Technologies: Windows Event Logs, Sysmon, PowerShell logging, Audit policy
Description: Develop expertise in Windows telemetry by learning which event IDs expose adversary activity and how to tune logging to catch attacker techniques. Deploy Sysmon for deep process, network, and file telemetry.
Topics:
- Critical Windows Event IDs for security (4624, 4688, 7045, etc.)
- Sysmon configuration and deployment
- PowerShell Script Block logging and transcription
- Command-line auditing and process creation logging
- Detecting lateral movement via Windows events
- Audit policy configuration best practices

### Layer 4 of 10 — id: threat-hunter-4
Title: SIEM Hunting with Splunk or Elastic
Technologies: Splunk SPL, Elastic KQL, Dashboards, Alert tuning
Description: Write effective hunt queries in Splunk SPL or Elastic KQL to surface anomalous patterns across large log datasets. Build hunt dashboards that help analysts rapidly triage suspicious activity.
Topics:
- SPL and KQL fundamentals for security use cases
- Searching, filtering, and aggregating security events
- Statistical hunting techniques (rare, outlier, baseline deviation)
- Building hunt dashboards and saved searches
- Alert threshold tuning to reduce false positives
- Documenting and sharing hunt queries

### Layer 5 of 10 — id: threat-hunter-5
Title: Network Traffic Analysis for Hunting
Technologies: Wireshark, Zeek, Suricata, Network baselines
Description: Analyze network traffic to detect command-and-control beaconing, data exfiltration, lateral movement, and protocol abuse. Use Zeek to generate structured network metadata at scale for hunt queries.
Topics:
- Network baseline establishment and anomaly detection
- Identifying C2 beaconing patterns
- DNS query analysis for tunneling and DGA detection
- TLS certificate and JA3 fingerprinting
- Zeek log schema and query patterns
- Detecting data exfiltration via network telemetry

### Layer 6 of 10 — id: threat-hunter-6
Title: Endpoint Detection and Response (EDR) Hunting
Technologies: CrowdStrike Falcon, Microsoft Defender for Endpoint, EDR telemetry, Process trees
Description: Leverage EDR platforms to hunt for adversary behavior across endpoints using rich process, file, and registry telemetry unavailable in traditional SIEMs. Understand process tree analysis and timeline reconstruction.
Topics:
- EDR telemetry sources and query languages
- Process tree analysis for suspicious chains
- Hunting with CrowdStrike Falcon or MDE Advanced Hunting
- Detecting Living-off-the-Land (LotL) techniques
- Memory-based threat hunting via EDR
- EDR alert triage and investigation workflow

### Layer 7 of 10 — id: threat-hunter-7
Title: Threat Intelligence Integration
Technologies: STIX/TAXII, MISP, OpenCTI, IOC enrichment
Description: Integrate threat intelligence feeds and platforms into the hunt workflow to focus hunts on relevant adversary infrastructure and TTPs. Learn to evaluate, enrich, and operationalize intelligence for proactive detection.
Topics:
- Types of threat intelligence (strategic, tactical, operational)
- STIX/TAXII protocol and data model
- Consuming threat feeds in MISP and OpenCTI
- IOC-based vs TTP-based hunting trade-offs
- Enriching alerts and hunt pivots with CTI
- Tracking threat actor groups and campaigns
- Producing actionable intelligence from hunt findings

### Layer 8 of 10 — id: threat-hunter-8
Title: Detection Engineering and Sigma Rules
Technologies: Sigma, Detection as Code, SOAR, Alert lifecycle
Description: Convert hunt findings into durable, portable detection rules using the Sigma format that can be deployed across multiple SIEM backends. Build a detection lifecycle that tracks rules from hypothesis through retirement.
Topics:
- Sigma rule syntax and structure
- Converting hunt queries to Sigma rules
- Sigma backends for Splunk, Elastic, and QRadar
- Detection as Code: versioning and CI/CD for rules
- Alert fatigue management and rule quality metrics
- SOAR playbook integration for automated triage
- Detection coverage heat mapping

### Layer 9 of 10 — id: threat-hunter-9
Title: Advanced Adversary Simulation and Purple Teaming
Technologies: Atomic Red Team, Caldera, Purple teaming, Gap analysis
Description: Run controlled adversary simulations using Atomic Red Team and MITRE Caldera to validate detection coverage and identify blind spots. Conduct purple team exercises that directly improve hunt and detection capabilities.
Topics:
- Atomic Red Team test execution and logging
- MITRE Caldera adversary emulation platform
- Purple team exercise planning and scope
- Mapping simulation results to detection gaps
- Iterating detection rules based on simulation output
- Reporting purple team findings to stakeholders
- Continuous validation pipelines

### Layer 10 of 10 — id: threat-hunter-10
Title: Hunt Program Operations and Leadership
Technologies: Hunt program management, KPIs, Playbook development, Team enablement
Description: Build and operate a mature threat hunting program with defined processes, metrics, and continuous improvement cycles integrated into the broader SOC. Lead a team of hunters and communicate program value to leadership.
Topics:
- Hunt program framework and maturity model
- Hunt campaign planning and tracking
- KPIs: dwell time, hypothesis validation rate, detection uplift
- Hunt playbook library development
- Cross-team collaboration with IR and detection engineering
- Communicating hunt findings to executive stakeholders
- Continuous training and knowledge sharing

Start now with Layer 1.
