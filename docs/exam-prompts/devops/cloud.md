You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Cloud Engineer" (cloud, category devops). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: cloud-1
Title: Linux & Networking Foundations
Technologies: Linux, Bash, TCP/IP, SSH
Description: Cloud engineering starts with Linux and networking fluency. Everything you deploy runs on Linux. You need to navigate servers, understand networking primitives, and automate with shell scripts.
Topics:
- Linux file system, permissions, users & groups
- Shell scripting — variables, loops, functions, cron
- Networking — IP addressing, subnets, CIDR, routing
- DNS, load balancers, reverse proxies
- SSH — key-based auth, tunneling, bastion hosts
- systemd — services, journalctl, timers

### Layer 2 of 10 — id: cloud-2
Title: AWS Core Services
Technologies: EC2, S3, IAM, VPC, RDS
Description: AWS is the dominant cloud platform. Learn the foundational services — compute, storage, networking, and databases — that underpin almost every production architecture.
Topics:
- IAM — users, roles, policies, least-privilege principle
- VPC — subnets, security groups, NACLs, internet gateways
- EC2 — instance types, AMIs, key pairs, user data scripts
- S3 — buckets, objects, policies, versioning, lifecycle rules
- RDS — managed PostgreSQL, backups, Multi-AZ
- CloudWatch — metrics, logs, alarms

### Layer 3 of 10 — id: cloud-3
Title: Infrastructure as Code — Terraform
Technologies: Terraform, HCL, AWS Provider, State
Description: Stop clicking around in the console. Define your infrastructure in code, version it with Git, and deploy reproducible environments with Terraform.
Topics:
- Terraform architecture — providers, resources, state
- HCL syntax — blocks, arguments, expressions, locals
- Core workflow — init, plan, apply, destroy
- Variables, outputs & modules
- Remote state with S3 + DynamoDB locking
- Workspaces for multi-environment management

### Layer 4 of 10 — id: cloud-4
Title: Containers with Docker
Technologies: Docker, Dockerfile, Docker Compose, ECR
Description: Containers are the fundamental unit of modern cloud deployment. Master Docker — from writing efficient Dockerfiles to orchestrating multi-service applications.
Topics:
- Container concepts — images, layers, registry, runtime
- Dockerfile best practices — multi-stage builds, layer caching
- Docker Compose for local multi-service development
- Networking between containers
- AWS ECR — push and pull private images
- Container security — rootless, read-only FS, secrets

### Layer 5 of 10 — id: cloud-5
Title: Kubernetes
Technologies: Kubernetes, kubectl, Helm, EKS
Description: Kubernetes is the industry standard for container orchestration at scale. Learn to deploy, scale, and manage containerized workloads on managed clusters.
Topics:
- K8s architecture — control plane, nodes, pods, services
- Deployments, ReplicaSets, rolling updates
- Services — ClusterIP, NodePort, LoadBalancer
- ConfigMaps & Secrets
- Helm — charts, values, releases
- AWS EKS — managed cluster setup, IAM integration

### Layer 6 of 10 — id: cloud-6
Title: CI/CD Pipelines
Technologies: GitHub Actions, ArgoCD, Docker, Terraform
Description: Automate your path from code commit to production deployment. Build pipelines that test, build, scan, and deploy automatically, with GitOps principles for Kubernetes.
Topics:
- GitHub Actions — workflows, jobs, steps, secrets, matrix builds
- CI pipeline — lint, test, build Docker image, push to ECR
- CD with ArgoCD — GitOps, app sync, health checks
- Terraform in CI — plan on PR, apply on merge
- Blue/green & canary deployment strategies
- Secrets management — GitHub Secrets, AWS Secrets Manager

### Layer 7 of 10 — id: cloud-7
Title: Monitoring & Observability
Technologies: Prometheus, Grafana, Loki, CloudWatch
Description: You can't fix what you can't see. Build observability into your stack with metrics, logs, and traces. Know when something breaks before your users tell you.
Topics:
- Three pillars of observability — metrics, logs, traces
- Prometheus — scraping, PromQL, alerting rules
- Grafana — dashboards, data sources, alerting
- Loki + Promtail — log aggregation
- Distributed tracing — OpenTelemetry, Jaeger
- SLOs, SLAs, SLIs — error budgets

### Layer 8 of 10 — id: cloud-8
Title: Security & Cost Optimization
Technologies: IAM, Vault, AWS Cost Explorer, Spot Instances
Description: Security and cost are the two areas that separate good cloud engineers from great ones. Apply defense-in-depth and understand the cloud billing model to avoid expensive surprises.
Topics:
- IAM — least privilege, permission boundaries, service accounts
- HashiCorp Vault — secrets engine, dynamic credentials
- Network security — private subnets, VPN, WAF
- Image scanning — Trivy, ECR native scanning
- AWS Cost Explorer — reserved instances, savings plans
- Spot/preemptible instances for non-critical workloads

### Layer 9 of 10 — id: cloud-9
Title: Multi-Region Architecture and Disaster Recovery
Technologies: AWS, Terraform, Route 53, Aurora Global
Description: Design globally distributed systems on AWS that survive regional failures using active-active and active-passive topologies backed by automated failover. Apply Terraform to codify multi-region infrastructure and implement RTO/RPO targets through tested DR runbooks.
Topics:
- Active-active vs active-passive multi-region topologies
- Route 53 latency and failover routing policies
- Aurora Global Database and cross-region read replicas
- S3 Cross-Region Replication and object consistency
- Global Accelerator for anycast traffic routing
- Chaos and DR drills with AWS Fault Injection Simulator
- RTO and RPO target definition and measurement

### Layer 10 of 10 — id: cloud-10
Title: FinOps, Platform Engineering and SRE Practices
Technologies: Backstage, Terraform, AWS Cost Explorer, PagerDuty
Description: Shift from infrastructure provisioning to building internal developer platforms that give teams self-service access to golden-path templates, cost visibility, and reliability tooling. Apply SRE principles including toil reduction, capacity planning, and error budget policies.
Topics:
- FinOps framework and cloud cost allocation tagging strategies
- AWS Cost Explorer, Budgets, and Savings Plans optimization
- Internal developer platforms and Backstage scaffolding
- Golden-path templates and platform-team operating models
- Toil measurement and automation priority frameworks
- Capacity planning and predictive auto-scaling
- Error budget policies and SRE team topologies

Start now with Layer 1.
