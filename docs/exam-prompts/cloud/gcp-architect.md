You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "GCP Architect" (gcp-architect, category cloud). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: gcp-architect-1
Title: GCP Fundamentals
Technologies: GCP, Compute Engine, Cloud Storage, IAM
Description: Learn Google Cloud Platform core services, resource hierarchy, and identity management. Use the gcloud CLI and Cloud Console to provision and manage GCP resources.
Topics:
- GCP resource hierarchy projects folders org
- IAM roles members and policies
- Compute Engine VM instances and machine types
- Cloud Storage buckets and object lifecycle
- gcloud CLI and Cloud Shell
- GCP pricing and billing accounts

### Layer 2 of 10 — id: gcp-architect-2
Title: GCP Networking
Technologies: VPC, Cloud Load Balancing, Cloud DNS, Cloud Interconnect
Description: Design GCP Virtual Private Cloud networks with shared VPC, VPC peering, and hybrid connectivity. Configure Cloud Load Balancing for global and regional traffic distribution.
Topics:
- GCP VPC and subnets auto vs custom mode
- Shared VPC and VPC Network Peering
- Cloud Load Balancing types and use cases
- Cloud Armor WAF and DDoS protection
- Cloud DNS managed zones
- Cloud Interconnect and VPN tunnels

### Layer 3 of 10 — id: gcp-architect-3
Title: Google Kubernetes Engine
Technologies: GKE, Autopilot, Workload Identity, Config Connector
Description: Deploy and manage Kubernetes workloads on GKE Standard and Autopilot clusters. Use Workload Identity to securely access GCP services from pods without static credentials.
Topics:
- GKE cluster modes Standard vs Autopilot
- Node pools and node auto-provisioning
- Workload Identity Federation for pods
- GKE Config Connector for GCP resources
- Binary Authorization for image signing
- GKE logging and monitoring integration

### Layer 4 of 10 — id: gcp-architect-4
Title: Data and Analytics with BigQuery
Technologies: BigQuery, Dataflow, Pub/Sub, Looker Studio
Description: Design data pipelines and analytical workloads using GCP managed data services. Understand BigQuery cost optimization, partitioning, and streaming inserts.
Topics:
- BigQuery datasets tables and schemas
- BigQuery partitioning clustering and cost
- Pub/Sub topics and subscriptions
- Dataflow streaming and batch pipelines
- Cloud Composer for orchestration
- Looker Studio dashboards

### Layer 5 of 10 — id: gcp-architect-5
Title: Security and Compliance
Technologies: Cloud KMS, Secret Manager, VPC Service Controls, Security Command Center
Description: Implement GCP security controls including data encryption, secret management, and perimeter security using VPC Service Controls. Monitor threats with Security Command Center.
Topics:
- Cloud KMS key rings and keys
- Secret Manager versions and rotation
- VPC Service Controls access policies
- Organization Policy constraints
- Security Command Center findings
- Binary Authorization and Artifact Registry

### Layer 6 of 10 — id: gcp-architect-6
Title: Infrastructure as Code with Terraform on GCP
Technologies: Terraform, Google Provider, Cloud Build, Config Validator
Description: Manage GCP infrastructure as code using Terraform with the Google provider. Use Cloud Build for automated apply pipelines and Config Validator for policy enforcement.
Topics:
- Terraform Google provider resources
- GCP service account for Terraform
- Remote state in Cloud Storage
- Terraform modules for GCP patterns
- Cloud Build triggers for Terraform CI/CD
- Forseti or Config Validator policies

### Layer 7 of 10 — id: gcp-architect-7
Title: Serverless and App Modernization
Technologies: Cloud Run, Cloud Functions, Eventarc, Firebase
Description: Build event-driven and HTTP-triggered serverless workloads on GCP using Cloud Run and Cloud Functions. Connect services with Eventarc and integrate with Firebase for mobile backends.
Topics:
- Cloud Run containers and scaling to zero
- Cloud Functions gen1 vs gen2
- Eventarc triggers and event routing
- Cloud Tasks and Cloud Scheduler
- Firebase Realtime Database and Firestore
- Identity Platform for authentication

### Layer 8 of 10 — id: gcp-architect-8
Title: Reliability and Observability
Technologies: Cloud Monitoring, Cloud Logging, Cloud Trace, SLOs
Description: Define and track SLOs for GCP workloads using Cloud Monitoring and create error budgets for reliability targets. Implement distributed tracing and structured logging at scale.
Topics:
- Cloud Monitoring metrics and dashboards
- Alerting policies and notification channels
- Cloud Logging log sinks and exclusions
- Cloud Trace and distributed tracing
- SLO definitions and error budgets
- Uptime checks and synthetic monitors

### Layer 9 of 10 — id: gcp-architect-9
Title: Cost Optimization and Resource Management
Technologies: Cost Management, Recommender API, Committed Use Discounts, Budgets
Description: Analyze and optimize GCP spending using billing exports, recommender insights, and committed use discounts. Implement budget alerts and spend controls at the project and folder level.
Topics:
- Billing export to BigQuery
- Cost breakdown by project service label
- Committed use discounts for compute
- Sustained use discounts mechanics
- Recommender API for right-sizing
- Budget alerts and programmatic spend controls

### Layer 10 of 10 — id: gcp-architect-10
Title: Professional Cloud Architect and Enterprise Patterns
Technologies: GCP, Anthos, Cloud Foundation Toolkit, Landing Zone
Description: Design enterprise GCP environments using the Cloud Foundation Toolkit and Anthos for multi-cluster and hybrid workloads. Apply the Google Cloud Architecture Framework to all five pillars.
Topics:
- GCP landing zone with Cloud Foundation Toolkit
- Anthos Config Management and Policy Controller
- Anthos Service Mesh for multi-cluster traffic
- Google Cloud Architecture Framework pillars
- Cross-project service account delegation
- Multi-region architecture patterns on GCP

Start now with Layer 1.
