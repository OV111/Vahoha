You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Digital Forensics Analyst" (forensics-analyst, category cybersecurity). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: forensics-analyst-1
Title: Digital Forensics Fundamentals
Technologies: Forensic principles, Chain of custody, Evidence handling, Legal basics
Description: Establish the principles and legal context of digital forensics including evidence integrity, chain of custody, and courtroom admissibility standards. Understand the investigative process from first response through reporting.
Topics:
- Forensic investigation lifecycle
- Chain of custody documentation and evidence handling
- Forensic soundness and write-blocking
- Legal and jurisdictional considerations
- Types of digital evidence (disk, memory, network, cloud)
- Documenting and reporting findings

### Layer 2 of 10 — id: forensics-analyst-2
Title: Disk Imaging and Acquisition
Technologies: dd, FTK Imager, Guymager, Write blockers
Description: Perform forensically sound disk and drive acquisitions using hardware write blockers and trusted imaging tools that preserve original evidence. Verify image integrity with cryptographic hashing.
Topics:
- Forensic imaging formats (RAW/dd, E01, AFF)
- Hardware and software write-blocking
- Acquiring with FTK Imager and Guymager
- Cryptographic hash verification (MD5, SHA-256)
- Partial and triage acquisition strategies
- Acquiring from SSDs, encrypted drives, and mobile devices

### Layer 3 of 10 — id: forensics-analyst-3
Title: File System Forensics
Technologies: NTFS, FAT32, Autopsy, Sleuth Kit
Description: Analyze file system structures to recover deleted files, examine metadata, and identify timeline artifacts left by user and attacker activity. Use Autopsy and The Sleuth Kit to navigate and carve file system data.
Topics:
- NTFS structures (MFT, $LogFile, $USN journal)
- File metadata and MAC times (Modified, Accessed, Created)
- Deleted file recovery techniques
- File carving from unallocated space
- Autopsy case setup and evidence analysis
- Timeline creation from file system metadata

### Layer 4 of 10 — id: forensics-analyst-4
Title: Windows Artifact Analysis
Technologies: Registry, Prefetch, LNK files, Event Logs
Description: Extract and interpret the rich set of forensic artifacts that Windows leaves behind to reconstruct user actions, program execution, and attacker activity. Analyze registry hives, prefetch files, jump lists, and event logs.
Topics:
- Windows Registry forensic artifacts (UserAssist, RecentDocs, MRU)
- Prefetch file analysis for program execution evidence
- LNK file and jump list analysis
- Windows Event Log forensic review
- Shellbag analysis for folder access history
- Recycle Bin and Volume Shadow Copy analysis

### Layer 5 of 10 — id: forensics-analyst-5
Title: Memory Forensics with Volatility
Technologies: Volatility 3, RAM acquisition, Process analysis, Network artifacts
Description: Capture and analyze volatile memory to uncover running malware, injected code, network connections, and credentials that leave no disk trace. Master Volatility 3 plugins for process, network, and malware artifact extraction.
Topics:
- Memory acquisition methods and tools (WinPmem, LiME)
- Volatility 3 setup and profile identification
- Process list and process tree analysis (pslist, pstree)
- Detecting process injection (malfind, cmdline)
- Network connection and socket analysis
- Extracting registry hives and credentials from memory

### Layer 6 of 10 — id: forensics-analyst-6
Title: Network Forensics
Technologies: Wireshark, NetworkMiner, Zeek logs, PCAP analysis
Description: Reconstruct network-based attacker activity from packet captures and flow data to establish timelines of intrusion, data theft, and lateral movement. Carve transferred files and credentials from PCAP evidence.
Topics:
- Full packet capture collection and preservation
- Protocol analysis and session reconstruction
- File carving from network captures
- Identifying C2 and exfiltration patterns in PCAP
- Zeek log analysis for network forensics
- Correlating network and host-based evidence

### Layer 7 of 10 — id: forensics-analyst-7
Title: Mobile and Cloud Forensics
Technologies: Cellebrite UFED, Android ADB, AWS CloudTrail, M365 logs
Description: Extend forensic investigation skills to mobile devices and cloud platforms where modern attackers increasingly operate. Understand logical and physical acquisition of iOS/Android devices and forensic analysis of cloud audit logs.
Topics:
- iOS and Android acquisition methods (logical, filesystem, physical)
- Mobile artifact categories (call logs, messages, app data, location)
- Cloud forensics concepts and challenges
- AWS CloudTrail log analysis for intrusion evidence
- Microsoft 365 audit log investigation
- Preserving and authenticating cloud evidence

### Layer 8 of 10 — id: forensics-analyst-8
Title: Malware Forensics and Anti-Forensics Detection
Technologies: Malware artifacts, Timestamp manipulation, Log clearing, Steganography
Description: Identify and counter techniques attackers use to destroy or manipulate forensic evidence including log clearing, timestamp tampering, and data hiding. Detect malware presence through artifact analysis even when the binary is removed.
Topics:
- Detecting log clearing events and tampered logs
- Timestamp analysis and MACE manipulation detection
- Detecting evidence of file wiping tools
- Steganography detection techniques
- Identifying malware through persistence artifacts without the binary
- Recovering overwritten evidence with carving

### Layer 9 of 10 — id: forensics-analyst-9
Title: Forensic Reporting and Expert Testimony
Technologies: Report writing, Case management, Evidence presentation, Legal standards
Description: Produce legally defensible forensic reports that clearly communicate findings to non-technical attorneys, law enforcement, and executives. Prepare for and survive cross-examination as an expert witness.
Topics:
- Technical report structure for forensic cases
- Writing findings for legal vs executive audiences
- Maintaining investigative notes and documentation
- Expert witness qualification and standards
- Daubert standard and scientific methodology
- Presenting digital evidence in court
- Case management tools and workflows

### Layer 10 of 10 — id: forensics-analyst-10
Title: Enterprise DFIR Operations
Technologies: DFIR platforms, Velociraptor, GRR, Forensic triage at scale
Description: Lead digital forensics and incident response operations at enterprise scale using remote forensic tools that enable simultaneous investigation across thousands of endpoints. Build and manage a DFIR program with defined playbooks and SLAs.
Topics:
- Remote forensic collection at scale with Velociraptor
- Building forensic triage workflows for SOC escalations
- DFIR playbook development for common scenarios
- Evidence management and retention policies
- DFIR program metrics and SLA tracking
- Cross-functional coordination with legal, HR, and law enforcement
- Threat intel integration into DFIR operations

Start now with Layer 1.
