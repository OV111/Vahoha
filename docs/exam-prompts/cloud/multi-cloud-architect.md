You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Multi-Cloud Architect" (multi-cloud-architect, category cloud). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: multi-cloud-architect-1
Title: Multi-Cloud Strategy Fundamentals
Technologies: AWS, Azure, GCP, Cloud Agnostic Patterns
Description: Understand why organizations adopt multi-cloud strategies and the associated trade-offs around complexity, vendor lock-in, and operational overhead. Compare core service equivalents across providers.
Topics:
- Multi-cloud vs poly-cloud vs hybrid cloud
- Vendor lock-in risks and mitigation
- Cloud provider service comparison matrix
- Networking topology across clouds
- Identity federation across providers
- Multi-cloud cost and complexity trade-offs

### Layer 2 of 10 — id: multi-cloud-architect-2
Title: Terraform for Multi-Cloud IaC
Technologies: Terraform, AWS Provider, Azure Provider, GCP Provider
Description: Manage infrastructure across AWS, Azure, and GCP from a single Terraform codebase using multiple provider configurations. Structure workspaces and modules for multi-cloud reusability.
Topics:
- Terraform multi-provider configuration
- Provider aliases for multiple accounts
- Module design for cloud-agnostic patterns
- Terraform workspaces for environment isolation
- Remote state with locking across clouds
- Terraform Cloud or Atlantis for team workflows

### Layer 3 of 10 — id: multi-cloud-architect-3
Title: Multi-Cloud Networking
Technologies: AWS Transit Gateway, Azure Virtual WAN, GCP NCC, SD-WAN
Description: Design network connectivity between AWS, Azure, and GCP environments using VPN tunnels, private interconnects, and SD-WAN solutions. Implement consistent security policies across cloud perimeters.
Topics:
- VPN between AWS and Azure and GCP
- Private connectivity with dedicated interconnects
- Multi-cloud DNS resolution
- Network security policy consistency
- SD-WAN solutions for multi-cloud
- BGP routing between cloud providers

### Layer 4 of 10 — id: multi-cloud-architect-4
Title: Multi-Cloud Identity and Security
Technologies: Okta, Entra ID, AWS IAM Identity Center, OIDC
Description: Federate identities across cloud providers using a central IdP such as Okta or Entra ID. Implement consistent RBAC patterns and secret management across AWS, Azure, and GCP.
Topics:
- Identity federation with SAML and OIDC
- Okta or Entra ID as central IdP
- AWS IAM Identity Center SSO
- Cross-cloud RBAC mapping
- Secrets management with HashiCorp Vault
- Multi-cloud audit logging and SIEM

### Layer 5 of 10 — id: multi-cloud-architect-5
Title: Multi-Cloud Kubernetes
Technologies: EKS, AKS, GKE, Cluster API
Description: Operate Kubernetes clusters across AWS EKS, Azure AKS, and GCP GKE with consistent tooling. Use Cluster API or a management plane to provision and lifecycle clusters uniformly.
Topics:
- EKS vs AKS vs GKE feature comparison
- Cluster API provider for each cloud
- Unified kubectl context management
- Consistent GitOps with ArgoCD ApplicationSets
- Cross-cluster service discovery
- Multi-cluster ingress and traffic management

### Layer 6 of 10 — id: multi-cloud-architect-6
Title: Multi-Cloud Data and Storage Patterns
Technologies: S3, Azure Blob, GCS, Delta Lake
Description: Design portable data architectures that span multiple cloud object stores using abstraction layers and open formats. Implement cross-cloud replication for disaster recovery.
Topics:
- Object storage comparison S3 Blob GCS
- Cross-cloud data replication patterns
- Open table formats Delta Lake Iceberg
- Multi-cloud data lakehouse architecture
- Data residency and compliance
- Rclone and cloud-agnostic data tools

### Layer 7 of 10 — id: multi-cloud-architect-7
Title: Multi-Cloud Observability
Technologies: OpenTelemetry, Grafana, Datadog, Prometheus
Description: Centralize observability across multi-cloud environments using OpenTelemetry for vendor-neutral instrumentation and a unified monitoring backend. Correlate metrics logs and traces across providers.
Topics:
- OpenTelemetry collector for multi-cloud
- Vendor-neutral instrumentation strategy
- Centralized Prometheus with Thanos or Cortex
- Grafana unified dashboards for all clouds
- Log aggregation across cloud providers
- Cross-cloud SLO tracking

### Layer 8 of 10 — id: multi-cloud-architect-8
Title: Multi-Cloud Cost Management
Technologies: CloudHealth, Apptio, FOCUS Spec, Unified Billing
Description: Build a unified view of cloud spend across AWS, Azure, and GCP using the FOCUS specification and multi-cloud cost management platforms. Implement consistent tagging and allocation.
Topics:
- FOCUS specification for normalized billing data
- Multi-cloud cost management platforms
- Unified tagging taxonomy across providers
- Cross-cloud chargeback and showback
- Multi-cloud savings commitment strategy
- Cost anomaly detection across all clouds

### Layer 9 of 10 — id: multi-cloud-architect-9
Title: Disaster Recovery and Business Continuity
Technologies: Multi-Cloud DR, Velero, Route 53, Traffic Manager
Description: Design multi-cloud disaster recovery architectures that span providers to achieve cloud-provider-level resilience. Test failover between AWS and Azure with automated runbooks.
Topics:
- Multi-cloud DR patterns active-active vs active-passive
- Velero for cross-cloud Kubernetes backup
- DNS-based traffic failover across clouds
- Data synchronization and RPO targets
- Automated runbooks for cloud failover
- Chaos engineering for multi-cloud resilience

### Layer 10 of 10 — id: multi-cloud-architect-10
Title: Enterprise Multi-Cloud Governance
Technologies: Terraform Enterprise, OPA, Cloud Custodian, CSPM
Description: Govern a large-scale multi-cloud environment with policy-as-code, cloud security posture management, and automated compliance reporting across all cloud providers.
Topics:
- Policy as code with OPA across clouds
- Cloud Custodian for multi-cloud automation
- CSPM tools for unified security posture
- Terraform Enterprise or Spacelift for governance
- Compliance frameworks CIS SOC2 ISO27001
- Multi-cloud landing zone reference architectures

Start now with Layer 1.
