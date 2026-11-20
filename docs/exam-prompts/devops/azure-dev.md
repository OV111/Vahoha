You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Azure Specialist" (azure-dev, category devops). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: azure-dev-1
Title: Azure Cloud Fundamentals
Technologies: Azure AD, Resource Groups, Azure CLI
Description: This layer introduces the Azure account structure and identity model. It matters because subscriptions, resource groups, and identity govern everything you build on Azure.
Topics:
- Subscriptions and resource groups
- Azure Active Directory basics
- Regions and availability zones
- Role-based access control
- Billing and cost management
- Azure CLI and portal

### Layer 2 of 10 — id: azure-dev-2
Title: Compute and App Services
Technologies: Virtual Machines, App Service, Azure Functions
Description: This layer covers Azure compute options from virtual machines to serverless. It matters because selecting the right hosting model shapes scalability and operational cost.
Topics:
- Virtual machines and scale sets
- App Service web apps
- Azure Functions basics
- Deployment slots
- Scaling options
- Compute tradeoffs

### Layer 3 of 10 — id: azure-dev-3
Title: Storage and Databases
Technologies: Blob Storage, Azure SQL, Cosmos DB
Description: This layer teaches storing files and structured data on Azure. It matters because durable storage and appropriate database choices are central to most applications.
Topics:
- Blob storage and containers
- Storage tiers and lifecycle
- Azure SQL Database
- Cosmos DB models
- Access keys and SAS tokens
- Backups and replication

### Layer 4 of 10 — id: azure-dev-4
Title: Serverless with Azure Functions
Technologies: Azure Functions, Event Grid, Service Bus
Description: This layer covers building event-driven serverless solutions on Azure. It matters because serverless lowers operational overhead and is a core modern Azure pattern.
Topics:
- Triggers and bindings
- Durable Functions
- Event Grid events
- Service Bus messaging
- Scaling and consumption plans
- Function security

### Layer 5 of 10 — id: azure-dev-5
Title: Networking and Security
Technologies: Virtual Network, Key Vault, Azure AD
Description: This layer deepens Azure networking and access control. It matters because secure, segmented networks and managed secrets are required for production workloads.
Topics:
- Virtual networks and subnets
- Network security groups
- Load Balancer and Application Gateway
- Private endpoints
- Managed identities
- Key Vault for secrets

### Layer 6 of 10 — id: azure-dev-6
Title: Infrastructure as Code with Bicep
Technologies: Bicep, ARM Templates, Azure CLI
Description: This layer teaches declaring Azure infrastructure with Bicep. It matters because reproducible, version-controlled infrastructure is essential for reliable Azure environments.
Topics:
- Bicep syntax and resources
- Parameters and variables
- Modules and reuse
- Deployment scopes
- What-if and validation
- Bicep versus ARM templates

### Layer 7 of 10 — id: azure-dev-7
Title: Kubernetes with AKS
Technologies: AKS, Kubernetes, Helm
Description: This layer covers running containerized workloads on managed Kubernetes. It matters because AKS is the standard way to run scalable container platforms on Azure.
Topics:
- AKS cluster provisioning
- Node pools and autoscaling
- Deploying workloads
- Azure AD integration
- Ingress and networking
- Cluster upgrades

### Layer 8 of 10 — id: azure-dev-8
Title: Observability and Operations
Technologies: Azure Monitor, Application Insights, Log Analytics
Description: This layer teaches monitoring, logging, and tracing Azure workloads. It matters because visibility into systems is required to operate them reliably.
Topics:
- Azure Monitor metrics and alerts
- Application Insights tracing
- Log Analytics queries
- Dashboards and workbooks
- Availability tests
- Cost monitoring

### Layer 9 of 10 — id: azure-dev-9
Title: CI/CD with Azure DevOps
Technologies: Azure DevOps, Bicep, Azure Pipelines
Description: This layer covers automating builds and deployments with Azure DevOps. It matters because automated delivery is what makes cloud iteration fast and reliable.
Topics:
- Repos and boards
- Azure Pipelines YAML
- Build and release stages
- Deploying Bicep templates
- Environments and approvals
- Artifacts and feeds

### Layer 10 of 10 — id: azure-dev-10
Title: Production Architecture and Scaling
Technologies: AKS, Azure Functions, Bicep
Description: This layer covers running well-architected, scalable systems in production on Azure. It matters because production systems must balance reliability, cost, and security under real load.
Topics:
- Azure Well-Architected Framework
- Multi-region high availability
- Disaster recovery
- Cost optimization
- Governance and policy
- Security and compliance at scale

Start now with Layer 1.
