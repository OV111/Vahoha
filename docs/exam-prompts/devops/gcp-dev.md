You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "GCP Specialist" (gcp-dev, category devops). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: gcp-dev-1
Title: GCP Cloud Fundamentals
Technologies: IAM, VPC, gcloud
Description: This layer introduces the Google Cloud platform structure and identity model. It matters because projects, IAM, and networking are the foundation of every GCP service.
Topics:
- Projects and resource hierarchy
- IAM roles and members
- Regions and zones
- VPC basics
- Billing and quotas
- gcloud CLI and console

### Layer 2 of 10 — id: gcp-dev-2
Title: Compute and Cloud Run
Technologies: Cloud Run, Compute Engine, Docker
Description: This layer covers running workloads from virtual machines to serverless containers. It matters because choosing the right compute option shapes cost and operational effort.
Topics:
- Compute Engine basics
- Containers on Cloud Run
- Serverless request handling
- Scaling to zero
- Service configuration
- Compute option tradeoffs

### Layer 3 of 10 — id: gcp-dev-3
Title: Storage and Databases
Technologies: Cloud Storage, Firestore, Cloud SQL
Description: This layer teaches storing objects and structured data on GCP. It matters because durable storage and the right database choice are central to most applications.
Topics:
- Cloud Storage buckets
- Storage classes and lifecycle
- Cloud SQL managed databases
- Firestore document model
- Access control and signed URLs
- Backups and durability

### Layer 4 of 10 — id: gcp-dev-4
Title: Messaging with Pub/Sub
Technologies: Pub/Sub, Cloud Run, Eventarc
Description: This layer covers asynchronous, event-driven communication on GCP. It matters because decoupling services with messaging is essential for scalable systems.
Topics:
- Topics and subscriptions
- Push and pull delivery
- Ordering and deduplication
- Dead-letter topics
- Eventarc triggers
- Backpressure and retries

### Layer 5 of 10 — id: gcp-dev-5
Title: Networking and Security
Technologies: VPC, Cloud Load Balancing, IAM
Description: This layer deepens VPC networking and access control on GCP. It matters because secure, well-structured networks are required for production workloads.
Topics:
- Subnets and firewall rules
- Cloud Load Balancing
- Private Google Access
- VPC peering and Shared VPC
- Service accounts and IAM
- Secret Manager

### Layer 6 of 10 — id: gcp-dev-6
Title: Data Analytics with BigQuery
Technologies: BigQuery, Pub/Sub, Dataflow
Description: This layer introduces large-scale analytics and data warehousing. It matters because BigQuery enables fast analysis over huge datasets without managing infrastructure.
Topics:
- Datasets and tables
- SQL queries at scale
- Streaming inserts
- Partitioning and clustering
- Cost control and slots
- Loading and exporting data

### Layer 7 of 10 — id: gcp-dev-7
Title: Kubernetes with GKE
Technologies: GKE, Kubernetes, Helm
Description: This layer covers running containerized workloads on managed Kubernetes. It matters because GKE is the standard way to run complex, scalable container platforms on GCP.
Topics:
- GKE cluster types
- Node pools and autoscaling
- Deploying workloads
- Workload Identity
- Ingress and services
- Cluster upgrades

### Layer 8 of 10 — id: gcp-dev-8
Title: Observability and Operations
Technologies: Cloud Monitoring, Cloud Logging, Cloud Trace
Description: This layer teaches monitoring, logging, and tracing GCP workloads. It matters because operating services reliably requires deep visibility into their behavior.
Topics:
- Cloud Monitoring metrics and alerts
- Cloud Logging and log-based metrics
- Distributed tracing
- Uptime checks
- Dashboards and SLOs
- Error reporting

### Layer 9 of 10 — id: gcp-dev-9
Title: Infrastructure as Code and CI/CD
Technologies: Terraform, Cloud Build, Artifact Registry
Description: This layer covers automating GCP infrastructure and deployments. It matters because reproducible infrastructure and pipelines are required for safe, fast delivery.
Topics:
- Provisioning GCP with Terraform
- Cloud Build pipelines
- Artifact Registry
- Deploying to Cloud Run and GKE
- Approvals and triggers
- Pipeline security

### Layer 10 of 10 — id: gcp-dev-10
Title: Production Architecture and Scaling
Technologies: GKE, Cloud Run, BigQuery
Description: This layer covers running well-architected, scalable systems in production on GCP. It matters because production systems must balance reliability, cost, and security under real load.
Topics:
- Google Cloud Architecture Framework
- Multi-region high availability
- Disaster recovery
- Cost optimization
- Organization policies
- Security and compliance at scale

Start now with Layer 1.
