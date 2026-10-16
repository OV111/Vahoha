You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Azure Architect" (azure-architect, category cloud). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: azure-architect-1
Title: Azure Fundamentals
Technologies: Azure, Resource Groups, ARM, Azure Portal
Description: Understand Azure global infrastructure, core services, and the Azure Resource Manager model. Navigate the portal, CLI, and PowerShell to provision and manage resources.
Topics:
- Azure regions and availability zones
- Resource groups and subscriptions
- Azure Resource Manager model
- Azure CLI and PowerShell basics
- Azure Free Tier and pricing calculator
- Management groups and hierarchy

### Layer 2 of 10 — id: azure-architect-2
Title: Azure Networking
Technologies: Virtual Network, NSG, Azure DNS, ExpressRoute
Description: Design Azure virtual networks with proper segmentation, routing, and connectivity. Understand hybrid connectivity options including VPN Gateway and ExpressRoute.
Topics:
- Virtual networks and subnets
- Network security groups and application security groups
- Azure Load Balancer and Application Gateway
- VPN Gateway site-to-site and point-to-site
- ExpressRoute circuits and peering
- Azure DNS public and private zones

### Layer 3 of 10 — id: azure-architect-3
Title: Identity and Access with Entra ID
Technologies: Entra ID, RBAC, Conditional Access, PIM
Description: Implement enterprise identity management using Microsoft Entra ID including conditional access policies and privileged identity management. Federate external identity providers and manage app registrations.
Topics:
- Entra ID tenants users and groups
- Role-based access control and custom roles
- Conditional access policies and MFA
- Privileged Identity Management just-in-time
- App registrations and service principals
- Managed identities for Azure resources

### Layer 4 of 10 — id: azure-architect-4
Title: Compute and Containers
Technologies: VM Scale Sets, AKS, Container Instances, App Service
Description: Deploy and scale workloads across Azure virtual machine scale sets, App Service plans, and Azure Kubernetes Service. Choose the right compute abstraction for each workload pattern.
Topics:
- VM scale sets and autoscaling
- Azure App Service tiers and deployment slots
- Azure Container Instances for batch
- AKS cluster creation and node pools
- Azure Container Registry
- Azure Functions consumption vs premium plans

### Layer 5 of 10 — id: azure-architect-5
Title: Storage and Databases
Technologies: Azure Storage, Azure SQL, Cosmos DB, Azure Cache
Description: Select and configure Azure storage and database services for performance, consistency, and cost. Design geo-redundant and zone-redundant data tiers.
Topics:
- Azure Blob, File, Queue, and Table storage
- Storage tiers and lifecycle management
- Azure SQL Database elastic pools
- Cosmos DB APIs and consistency levels
- Azure Database for PostgreSQL and MySQL
- Azure Cache for Redis patterns

### Layer 6 of 10 — id: azure-architect-6
Title: Infrastructure as Code with Bicep
Technologies: Bicep, ARM Templates, Azure DevOps, GitHub Actions
Description: Author and deploy Azure infrastructure using Bicep templates with modules and parameter files. Integrate IaC into CI/CD pipelines for automated deployments.
Topics:
- Bicep syntax resources modules and outputs
- Bicep vs ARM templates comparison
- Parameter files and environment configs
- Deployment scopes subscription and tenant
- Azure DevOps pipelines for Bicep
- GitHub Actions OIDC authentication to Azure

### Layer 7 of 10 — id: azure-architect-7
Title: Monitoring and Security
Technologies: Azure Monitor, Defender for Cloud, Sentinel, Log Analytics
Description: Build a comprehensive observability and security posture using Azure Monitor, Defender for Cloud, and Microsoft Sentinel. Configure alerting, dashboards, and SIEM rules.
Topics:
- Log Analytics workspaces and KQL
- Azure Monitor metrics and alerts
- Application Insights for APM
- Defender for Cloud secure score
- Microsoft Sentinel analytics rules
- Azure Policy and compliance initiatives

### Layer 8 of 10 — id: azure-architect-8
Title: High Availability and Business Continuity
Technologies: Azure Site Recovery, Traffic Manager, Availability Zones, Geo-Redundancy
Description: Design Azure solutions that meet strict availability SLAs using availability zones, Traffic Manager routing, and Azure Site Recovery for disaster recovery.
Topics:
- Availability sets vs availability zones
- Azure Traffic Manager routing methods
- Azure Front Door for global HTTP traffic
- Azure Site Recovery replication and failover
- Backup policies and recovery vaults
- RTO RPO design for Azure workloads

### Layer 9 of 10 — id: azure-architect-9
Title: Azure Kubernetes Service Advanced
Technologies: AKS, Azure CNI, KEDA, Workload Identity
Description: Operate production-grade AKS clusters with advanced networking, autoscaling, and security configurations. Integrate Azure services using workload identity and KEDA event-driven scaling.
Topics:
- AKS Azure CNI and Cilium networking
- Workload identity and pod-level permissions
- KEDA event-driven autoscaling
- AKS node pool upgrades and maintenance windows
- Azure Policy for Kubernetes
- GitOps with Flux on AKS

### Layer 10 of 10 — id: azure-architect-10
Title: Enterprise Architecture and Azure Landing Zones
Technologies: Azure Landing Zones, Management Groups, Azure Lighthouse, Enterprise Scale
Description: Design and implement enterprise-scale Azure architectures using the Cloud Adoption Framework landing zone accelerators. Govern multi-subscription environments with policy-driven guardrails.
Topics:
- Cloud Adoption Framework phases
- Enterprise-scale landing zone design
- Management group hierarchy and policies
- Azure Lighthouse for multi-tenant management
- Cost management and chargeback at scale
- Well-Architected Framework for Azure

Start now with Layer 1.
