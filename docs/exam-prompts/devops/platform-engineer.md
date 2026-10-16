You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Platform Engineer" (platform-engineer, category devops). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: platform-engineer-1
Title: Platform Engineering Foundations
Technologies: Kubernetes, Git, Linux
Description: This layer introduces the goals and mindset of internal developer platforms. It matters because platform engineering aims to reduce cognitive load and accelerate every developer in the organization.
Topics:
- What an internal developer platform is
- Cognitive load and golden paths
- Platform as a product
- Self-service principles
- Developer experience metrics
- Platform team operating model

### Layer 2 of 10 — id: platform-engineer-2
Title: Kubernetes as a Platform Base
Technologies: Kubernetes, Helm, Docker
Description: This layer establishes Kubernetes as the runtime substrate for the platform. It matters because most internal platforms build their abstractions on top of Kubernetes.
Topics:
- Cluster architecture for platforms
- Workloads and namespaces
- Multi-tenancy basics
- Packaging with Helm
- Resource quotas
- Platform versus application concerns

### Layer 3 of 10 — id: platform-engineer-3
Title: Infrastructure as Code for Platforms
Technologies: Terraform, Kubernetes, Git
Description: This layer covers provisioning platform infrastructure declaratively. It matters because the platform itself must be reproducible, versioned, and reviewable.
Topics:
- Terraform for platform infrastructure
- Reusable infrastructure modules
- Environment provisioning
- State and backends
- Infrastructure review workflows
- Standardizing cloud resources

### Layer 4 of 10 — id: platform-engineer-4
Title: Developer Portals with Backstage
Technologies: Backstage, React, Node.js
Description: This layer introduces building a developer portal as the platform front door. It matters because a portal centralizes discovery, documentation, and self-service for developers.
Topics:
- Backstage architecture
- Software catalog
- Component and entity model
- TechDocs documentation
- Plugins and integrations
- Authentication and access

### Layer 5 of 10 — id: platform-engineer-5
Title: Golden Paths and Templates
Technologies: Backstage, Cookiecutter, GitHub Actions
Description: This layer covers building paved roads that let developers create services quickly. It matters because templated golden paths encode best practices and reduce setup friction.
Topics:
- Software templates and scaffolding
- Backstage software templates
- Standardized repository setup
- Embedding CI/CD in templates
- Opinionated defaults
- Maintaining templates over time

### Layer 6 of 10 — id: platform-engineer-6
Title: GitOps Delivery with ArgoCD
Technologies: ArgoCD, Kubernetes, Helm
Description: This layer covers delivering platform and tenant workloads through GitOps. It matters because GitOps gives the platform auditable, self-healing, declarative deployments.
Topics:
- GitOps for platform delivery
- ArgoCD applications and projects
- App of apps pattern
- Multi-cluster delivery
- Self-service deployments
- Drift detection and sync

### Layer 7 of 10 — id: platform-engineer-7
Title: Self-Service APIs and Operators
Technologies: Kubernetes, Crossplane, CRDs
Description: This layer teaches exposing infrastructure as self-service Kubernetes APIs. It matters because custom abstractions let developers request resources without learning the underlying tools.
Topics:
- Custom resource definitions
- Operators and controllers
- Provisioning with Crossplane
- Platform abstractions and claims
- Composition of resources
- Guardrails and defaults

### Layer 8 of 10 — id: platform-engineer-8
Title: Observability and Golden Signals
Technologies: Prometheus, Grafana, OpenTelemetry
Description: This layer covers building observability into the platform for all tenants. It matters because a platform must give every team consistent visibility without each reinventing it.
Topics:
- Platform-wide metrics and logs
- Golden signals dashboards
- Tracing across services
- Self-service alerting
- Multi-tenant observability
- SLOs as a platform feature

### Layer 9 of 10 — id: platform-engineer-9
Title: Policy, Security, and Governance
Technologies: OPA, Kubernetes, Vault
Description: This layer covers enforcing standards and security across the platform. It matters because platforms must keep all tenants compliant and secure without slowing them down.
Topics:
- Policy as code for platforms
- Admission control guardrails
- Secrets management for tenants
- Role-based access control
- Cost and resource governance
- Audit and compliance

### Layer 10 of 10 — id: platform-engineer-10
Title: Operating the Platform at Scale
Technologies: Backstage, ArgoCD, Kubernetes
Description: This layer covers running and evolving the platform as a product in production. It matters because a platform must scale to many teams while staying reliable, adopted, and continuously improved.
Topics:
- Platform reliability and SLOs
- Onboarding many teams
- Versioning platform capabilities
- Measuring adoption and DX
- Feedback loops and roadmaps
- Cost and capacity at scale

Start now with Layer 1.
