You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "GRC Analyst" (grc-analyst, category cybersecurity). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: grc-analyst-1
Title: Introduction to GRC and Compliance
Technologies: GRC concepts, Risk basics, Compliance frameworks, Documentation
Description: Understand the three pillars of GRC - Governance, Risk, and Compliance - and why organizations invest in structured programs. Learn how regulations and voluntary frameworks shape security programs.
Topics:
- What is GRC and why it matters
- Governance structures and accountability
- Compliance vs security mindset
- Overview of major frameworks (ISO, NIST, SOC 2)
- Regulatory landscape (GDPR, HIPAA, PCI-DSS)
- GRC analyst career paths and responsibilities

### Layer 2 of 10 — id: grc-analyst-2
Title: NIST Cybersecurity Framework
Technologies: NIST CSF, NIST SP 800-53, Control mapping, Gap analysis
Description: Deep-dive into the NIST Cybersecurity Framework and its five core functions - Identify, Protect, Detect, Respond, Recover. Apply the framework to assess an organization against target maturity profiles.
Topics:
- CSF Core, Tiers, and Profiles
- NIST SP 800-53 control catalog
- Conducting a CSF-based gap assessment
- Mapping controls to business outcomes
- Creating a Current and Target Profile
- Prioritizing roadmap items by risk

### Layer 3 of 10 — id: grc-analyst-3
Title: ISO 27001 Information Security Management
Technologies: ISO 27001, ISMS, Annex A controls, Internal audit
Description: Understand ISO 27001 as an internationally recognized ISMS standard and what achieving certification requires. Learn to scope an ISMS, perform gap analysis, and prepare documentation for certification audits.
Topics:
- ISO 27001 structure and clause requirements
- Defining ISMS scope and boundaries
- Risk assessment and Statement of Applicability
- Annex A control selection and justification
- ISMS documentation requirements
- Internal audit process and corrective actions

### Layer 4 of 10 — id: grc-analyst-4
Title: SOC 2 Trust Services Criteria
Technologies: SOC 2 Type I, SOC 2 Type II, Trust Services Criteria, Evidence collection
Description: Learn the AICPA Trust Services Criteria that form the basis of SOC 2 reports and how service organizations demonstrate control effectiveness. Understand the difference between Type I point-in-time and Type II over-time engagements.
Topics:
- Trust Services Criteria (Security, Availability, Confidentiality, Privacy, Processing Integrity)
- SOC 2 Type I vs Type II differences
- Selecting in-scope systems and services
- Control design vs operating effectiveness
- Preparing evidence packages for auditors
- Remediating exceptions and control gaps

### Layer 5 of 10 — id: grc-analyst-5
Title: Risk Management and Risk Registers
Technologies: Risk register, Qualitative scoring, Quantitative risk (FAIR), Heat maps
Description: Build and maintain risk registers using both qualitative and quantitative risk methodologies to support business decisions. Learn the FAIR model for translating cyber risk into financial terms executives understand.
Topics:
- Risk identification techniques and workshops
- Qualitative likelihood and impact scoring
- Introduction to FAIR quantitative risk analysis
- Building and maintaining a risk register
- Risk treatment options (accept, mitigate, transfer, avoid)
- Communicating risk to non-technical stakeholders
- KRI development and monitoring

### Layer 6 of 10 — id: grc-analyst-6
Title: Policy Development and Management
Technologies: Policy lifecycle, Templates, Exception management, Awareness programs
Description: Develop, maintain, and enforce information security policies that align business requirements with regulatory obligations. Learn the full policy lifecycle from drafting through annual review and exception handling.
Topics:
- Policy hierarchy (policy, standard, procedure, guideline)
- Writing clear and enforceable security policies
- Managing policy review and approval workflows
- Exception request and waiver processes
- Measuring policy compliance and adherence
- Security awareness program integration

### Layer 7 of 10 — id: grc-analyst-7
Title: Third-Party and Vendor Risk Management
Technologies: TPRM, SIG Questionnaire, Contract review, Vendor tiering
Description: Assess and manage the security risks introduced by third-party vendors, suppliers, and partners who access or process organizational data. Build a vendor risk program with tiering, questionnaires, and contractual requirements.
Topics:
- Vendor risk tiering and inherent risk classification
- Using SIG and CAIQ questionnaires
- Reviewing vendor SOC 2 reports and certifications
- Security requirements in contracts and BAAs
- Ongoing vendor monitoring and reassessment
- Managing fourth-party (sub-processor) risk

### Layer 8 of 10 — id: grc-analyst-8
Title: Audit Management and Evidence Programs
Technologies: Audit planning, Evidence management, Audit tools (Vanta, Drata), Control testing
Description: Manage internal and external audit engagements from scoping through remediation closure, using GRC platforms to automate evidence collection. Learn to write audit findings and track remediation plans.
Topics:
- Audit lifecycle (planning, fieldwork, reporting, closure)
- Writing clear and actionable audit findings
- Evidence collection and artifact management
- Using Vanta or Drata for continuous compliance
- Tracking corrective action plans (CAPs)
- Coordinating with external auditors
- Audit committee reporting and escalation

### Layer 9 of 10 — id: grc-analyst-9
Title: Privacy Regulations and Data Governance
Technologies: GDPR, CCPA, DPIA, Data mapping
Description: Navigate major privacy regulations and build data governance programs that align compliance obligations with data lifecycle management. Learn to conduct Data Protection Impact Assessments and manage data subject rights requests.
Topics:
- GDPR principles and lawful bases for processing
- CCPA and US state privacy law landscape
- Data mapping and Records of Processing Activities (RoPA)
- Conducting DPIAs for high-risk processing
- Data subject rights fulfilment processes
- Privacy by design principles
- Cross-border data transfer mechanisms

### Layer 10 of 10 — id: grc-analyst-10
Title: Integrated GRC Program Leadership
Technologies: Integrated controls, Board reporting, Metrics and dashboards, Continuous compliance
Description: Lead a mature, integrated GRC program that aligns multiple frameworks under a unified control library while reporting meaningful metrics to executive leadership and the board. Drive continuous compliance automation and culture of accountability.
Topics:
- Unified control framework and control mapping
- Building a GRC platform (ServiceNow GRC, Archer)
- Executive and board-level security reporting
- Developing GRC program metrics and OKRs
- Integrating GRC with DevSecOps pipelines
- Managing regulatory change and horizon scanning
- Building a culture of compliance across the organization

Start now with Layer 1.
