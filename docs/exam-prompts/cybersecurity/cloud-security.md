You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Cloud Security Engineer" (cloud-security, category cybersecurity). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: cloud-security-1
Title: Cloud Computing Fundamentals
Technologies: AWS, Azure, GCP, Shared Responsibility Model
Description: Understand cloud service models, deployment types, and the shared responsibility model. Cloud security engineers must know what security obligations fall to the customer versus the provider.
Topics:
- IaaS PaaS SaaS differences
- Shared responsibility model
- AWS global infrastructure
- Cloud pricing basics
- Cloud account setup

### Layer 2 of 10 — id: cloud-security-2
Title: Identity and Access Management
Technologies: AWS IAM, Azure AD, RBAC, Least Privilege
Description: Master cloud IAM concepts including roles, policies, and the principle of least privilege. IAM misconfiguration is the most common cause of cloud security breaches.
Topics:
- IAM users roles and policies
- Policy evaluation logic
- Cross-account roles
- Service control policies
- IAM access analyzer

### Layer 3 of 10 — id: cloud-security-3
Title: Network Security in the Cloud
Technologies: VPC, Security Groups, NACLs, AWS WAF
Description: Design and implement secure cloud network architectures using VPCs, security groups, and access control lists. Network segmentation in the cloud prevents lateral movement between workloads.
Topics:
- VPC design patterns
- Security group rules
- Network ACL differences
- Private vs public subnets
- VPC flow log analysis

### Layer 4 of 10 — id: cloud-security-4
Title: Cloud Security Posture Management
Technologies: AWS Security Hub, Prisma Cloud, Wiz, Scout Suite
Description: Use CSPM tools to continuously assess cloud environment configurations against security benchmarks. CSPM catches misconfigurations before attackers discover them.
Topics:
- CSPM concepts
- CIS cloud benchmarks
- Security Hub setup
- Findings prioritization
- Remediation automation

### Layer 5 of 10 — id: cloud-security-5
Title: Data Security and Encryption
Technologies: AWS KMS, S3 Encryption, Secrets Manager, Macie
Description: Protect data at rest and in transit using cloud-native encryption and secrets management services. Unencrypted data stores and exposed secrets are leading causes of cloud data breaches.
Topics:
- Encryption key management
- S3 bucket encryption policies
- Secrets rotation
- AWS Macie for data discovery
- TLS enforcement

### Layer 6 of 10 — id: cloud-security-6
Title: Logging, Monitoring, and Alerting
Technologies: AWS CloudTrail, CloudWatch, GuardDuty, EventBridge
Description: Implement comprehensive cloud logging and threat detection using native and third-party tools. Without proper logging, cloud incidents go undetected for months.
Topics:
- CloudTrail configuration
- CloudWatch log groups
- GuardDuty findings
- EventBridge alert routing
- Log retention policies

### Layer 7 of 10 — id: cloud-security-7
Title: Zero Trust Architecture
Technologies: Zero Trust, BeyondCorp, mTLS, AWS Verified Access
Description: Design and implement Zero Trust network access patterns that assume breach at all times. Zero Trust replaces perimeter-based security with identity-centric continuous verification.
Topics:
- Zero Trust principles
- Microsegmentation
- Mutual TLS
- Identity-aware proxies
- AWS Verified Access setup

### Layer 8 of 10 — id: cloud-security-8
Title: Container and Kubernetes Security
Technologies: Docker, Kubernetes, Trivy, Falco
Description: Secure containerized workloads from image build through runtime using cloud-native tools. Container escape and cluster misconfiguration are critical risks in modern cloud deployments.
Topics:
- Container image hardening
- Kubernetes RBAC
- Pod security standards
- Runtime threat detection with Falco
- Image scanning with Trivy

### Layer 9 of 10 — id: cloud-security-9
Title: Cloud Incident Response
Technologies: AWS CloudTrail, Forensics, IR Runbooks, Isolation
Description: Execute cloud-specific incident response procedures to investigate and contain cloud security incidents. Cloud IR requires different tooling and skills compared to traditional endpoint-based response.
Topics:
- Cloud IR methodology
- Preserving CloudTrail evidence
- Isolating compromised resources
- IAM forensics
- Cloud IR runbooks

### Layer 10 of 10 — id: cloud-security-10
Title: Cloud Security Architecture and Governance
Technologies: AWS Organizations, Landing Zone, SCPs, Cloud Governance
Description: Design enterprise-scale cloud security architectures with multi-account governance and policy automation. Senior cloud security engineers build guardrails that enforce security at scale across hundreds of accounts.
Topics:
- AWS Organizations setup
- Service control policies
- AWS Landing Zone
- Cloud security benchmarks
- FinOps and security alignment

Start now with Layer 1.
