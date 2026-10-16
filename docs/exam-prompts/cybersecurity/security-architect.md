You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Security Architect" (security-architect, category cybersecurity). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: security-architect-1
Title: Security Architecture Fundamentals
Technologies: Security frameworks, Architecture documentation, Threat concepts, Design principles
Description: Establish the foundational mindset and vocabulary of security architecture, separating it from engineering and operations roles. Learn classic architecture frameworks and security design principles used throughout a career.
Topics:
- Role of a security architect vs engineer vs analyst
- Core security design principles (least privilege, defense in depth, fail-safe defaults)
- SABSA and TOGAF architecture frameworks overview
- Security architecture documentation artifacts
- CIA triad and beyond in architecture decisions
- Stakeholder communication and architecture governance

### Layer 2 of 10 — id: security-architect-2
Title: Threat Modeling
Technologies: STRIDE, PASTA, Attack trees, Data Flow Diagrams
Description: Apply structured threat modeling methodologies to identify, prioritize, and mitigate threats during the design phase rather than after deployment. Practice building Data Flow Diagrams and using STRIDE to enumerate threats systematically.
Topics:
- Threat modeling process and when to apply it
- Drawing accurate Data Flow Diagrams (DFDs)
- STRIDE threat enumeration per element
- PASTA risk-centric threat modeling
- Building and using attack trees
- Prioritizing mitigations by risk
- Integrating threat modeling into SDLC

### Layer 3 of 10 — id: security-architect-3
Title: Identity and Access Management Architecture
Technologies: IAM, OAuth 2.0, SAML, MFA
Description: Design identity and access management systems that enforce least-privilege access across users, services, and machines. Understand federation, SSO, and modern identity protocols that underpin enterprise and cloud environments.
Topics:
- Identity lifecycle management (joiner-mover-leaver)
- Authentication protocols (SAML, OIDC, OAuth 2.0)
- Single Sign-On architecture patterns
- MFA methods and assurance levels
- Privileged Access Management (PAM) design
- Machine identity and service account governance
- Directory services (LDAP, Active Directory, Azure AD)

### Layer 4 of 10 — id: security-architect-4
Title: Network Security Architecture
Technologies: Firewalls, Segmentation, VPN, DMZ design
Description: Design resilient network security architectures that isolate sensitive assets, control traffic flows, and limit lateral movement. Apply segmentation, demilitarized zones, and encrypted tunnels to real enterprise topologies.
Topics:
- Defense-in-depth network layering
- Firewall architecture and rule design principles
- DMZ patterns for public-facing services
- Network segmentation and micro-segmentation
- VPN and remote access architecture
- East-west traffic inspection and lateral movement prevention
- DNS and email security architecture

### Layer 5 of 10 — id: security-architect-5
Title: Cloud Security Architecture
Technologies: AWS Security, Azure Security, Shared Responsibility, CSPM
Description: Architect secure cloud environments using native security services and well-architected framework principles across AWS and Azure. Apply cloud security posture management and enforce guardrails through Infrastructure as Code.
Topics:
- Cloud shared responsibility model
- AWS Security Hub and Azure Security Center
- Identity and access in cloud (roles, policies, managed identity)
- Cloud network security (VPC, security groups, NSGs)
- Encryption at rest and in transit in cloud
- CSPM tools and misconfiguration detection
- Landing zone and security baseline design

### Layer 6 of 10 — id: security-architect-6
Title: Zero Trust Architecture
Technologies: Zero Trust, BeyondCorp, ZTNA, Microsegmentation
Description: Design and implement Zero Trust architectures that eliminate implicit trust for users, devices, and network location. Apply the NIST ZTA model and understand modern ZTNA products replacing legacy VPN models.
Topics:
- Zero Trust principles (verify explicitly, least privilege, assume breach)
- NIST SP 800-207 Zero Trust Architecture
- Identity-centric perimeter vs network-centric perimeter
- Device health and posture verification
- ZTNA products and deployment patterns
- Microsegmentation strategies in ZTA
- Migration path from legacy to Zero Trust

### Layer 7 of 10 — id: security-architect-7
Title: Application Security Architecture
Technologies: OWASP, SSDLC, Secrets management, API security
Description: Embed security into application design by applying OWASP principles, defining security requirements, and selecting appropriate security controls for web, mobile, and API surfaces. Lead security reviews of application designs.
Topics:
- OWASP Top 10 and ASVS framework
- Security requirements definition
- Secure SDLC integration points
- Secrets management architecture (Vault, KMS)
- API security design (OAuth scopes, rate limiting, input validation)
- Session management and CSRF protection design
- Third-party library and supply chain risk

### Layer 8 of 10 — id: security-architect-8
Title: Cryptography in Architecture
Technologies: TLS, PKI, Key management, HSM
Description: Select and implement the right cryptographic mechanisms for data protection, integrity, and non-repudiation across complex system designs. Understand PKI, key lifecycle management, and emerging post-quantum considerations.
Topics:
- Symmetric vs asymmetric cryptography in system design
- TLS 1.3 configuration and certificate management
- PKI design, CA hierarchy, and certificate lifecycle
- Key management systems and HSM integration
- Encryption at rest patterns (application vs database vs disk level)
- Digital signatures and non-repudiation architecture
- Post-quantum cryptography planning

### Layer 9 of 10 — id: security-architect-9
Title: Security Architecture Review and Governance
Technologies: Architecture review boards, Risk acceptance, Design patterns, Security by design
Description: Establish and run a Security Architecture Review process that evaluates designs at scale without becoming a bottleneck to development teams. Build a library of approved patterns and a risk acceptance framework for exceptions.
Topics:
- Architecture review board (ARB) setup and process
- Tiered review process based on risk level
- Security design pattern library creation
- Risk acceptance and exception frameworks
- Measuring architecture review program effectiveness
- Integrating architecture review into agile delivery
- Security champion programs and developer enablement

### Layer 10 of 10 — id: security-architect-10
Title: Enterprise Security Architecture Leadership
Technologies: Enterprise architecture, CISO partnership, Roadmapping, Resilience design
Description: Lead an enterprise security architecture function that aligns security investments with business strategy and drives multi-year architecture transformation programs. Communicate architecture risk and vision to C-suite and board audiences.
Topics:
- Aligning security architecture to business strategy
- Building and communicating a multi-year security roadmap
- Architecture metrics and maturity measurement
- Resilience and business continuity architecture
- Emerging technology threat assessment (AI, quantum)
- Managing a team of security architects
- Influencing without authority across engineering and product

Start now with Layer 1.
