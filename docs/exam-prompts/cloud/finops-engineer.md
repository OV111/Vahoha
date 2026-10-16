You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "FinOps Engineer" (finops-engineer, category cloud). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: finops-engineer-1
Title: FinOps Fundamentals
Technologies: Cloud Cost Management, FinOps Framework, Cost Explorer, Budgets
Description: Understand the FinOps framework, personas, and the crawl-walk-run maturity model. Learn how cloud billing works across AWS, Azure, and GCP at a conceptual level.
Topics:
- FinOps framework phases and personas
- Cloud billing models on-demand reserved spot
- Variable cost model vs fixed cost
- Unit economics and cost per transaction
- Cloud provider billing concepts
- FinOps team structure and responsibilities

### Layer 2 of 10 — id: finops-engineer-2
Title: Cloud Billing and Cost Visibility
Technologies: AWS Cost Explorer, Azure Cost Management, GCP Billing Export, Tagging
Description: Set up comprehensive cost visibility across cloud accounts using native billing tools and BigQuery exports. Identify the major cost drivers and understand how services are priced.
Topics:
- AWS Cost Explorer filters and grouping
- Azure Cost Management and budgets
- GCP billing export to BigQuery
- Cost allocation tags and labels
- Shared cost distribution methods
- Chargeback vs showback models

### Layer 3 of 10 — id: finops-engineer-3
Title: Tagging and Cost Allocation
Technologies: Resource Tagging, AWS Tag Policies, Azure Policy, Cost Allocation Labels
Description: Design and enforce a consistent tagging taxonomy across cloud resources for accurate cost attribution. Use policy enforcement to ensure tag compliance at resource creation.
Topics:
- Tagging taxonomy design team env cost-center
- AWS Tag Policies and enforcement
- Azure Policy for required tags
- GCP label requirements via Organization Policy
- Cost allocation for shared services
- Tag coverage monitoring and remediation

### Layer 4 of 10 — id: finops-engineer-4
Title: Commitments and Rate Optimization
Technologies: Savings Plans, Reserved Instances, Committed Use Discounts, Spot Instances
Description: Analyze usage patterns and purchase appropriate savings commitments to reduce on-demand rates by 30 to 70 percent. Model the trade-off between flexibility and savings.
Topics:
- AWS savings plans compute vs instance
- AWS reserved instances types and terms
- Azure reserved VM instances and AHB
- GCP committed use discounts 1 and 3 year
- Spot and preemptible instance strategies
- Commitment coverage and utilization tracking

### Layer 5 of 10 — id: finops-engineer-5
Title: Right-Sizing and Waste Elimination
Technologies: AWS Compute Optimizer, Azure Advisor, GCP Recommender, Idle Resources
Description: Identify and eliminate cloud waste through right-sizing under-utilized instances, deleting idle resources, and eliminating zombie workloads. Use cloud native recommenders and custom scripts.
Topics:
- EC2 right-sizing with Compute Optimizer
- Azure Advisor cost recommendations
- GCP Recommender API
- Identifying idle and unattached resources
- Orphaned snapshots and unused IPs
- Automated remediation of waste

### Layer 6 of 10 — id: finops-engineer-6
Title: Budget Management and Governance
Technologies: AWS Budgets, Azure Budgets, Cost Anomaly Detection, SNS
Description: Implement budget guardrails with automated alerting and cost anomaly detection to prevent unexpected spend. Design a governance framework for cloud cost approvals.
Topics:
- AWS Budgets actions and notifications
- Azure budget alerts and action groups
- GCP budget alerts and programmatic response
- Cost anomaly detection and thresholds
- Chargeback report automation
- Cloud cost governance policy framework

### Layer 7 of 10 — id: finops-engineer-7
Title: Unit Economics and Metrics
Technologies: Cost Metrics, FOCUS Spec, Unit Cost, FinOps Dashboards
Description: Build unit economic metrics that connect cloud costs to business value such as cost per customer, per API call, or per transaction. Automate metric collection and reporting.
Topics:
- Defining meaningful unit cost metrics
- FOCUS FinOps Open Cost and Usage Specification
- Connecting cost data to business metrics
- Cost per environment and per feature
- FinOps dashboard design and KPIs
- Benchmarking against industry standards

### Layer 8 of 10 — id: finops-engineer-8
Title: Kubernetes and Container Cost Allocation
Technologies: Kubecost, OpenCost, Kubernetes Labels, Node Groups
Description: Allocate Kubernetes cluster costs to teams and namespaces using OpenCost or Kubecost. Understand the challenge of shared resources and bin-packing efficiency.
Topics:
- Kubernetes cost allocation challenges
- OpenCost and Kubecost setup
- Namespace and label-based cost reports
- Node efficiency and bin packing
- Spot instance usage in Karpenter
- Chargeback for platform teams

### Layer 9 of 10 — id: finops-engineer-9
Title: FinOps Tooling and Automation
Technologies: Apptio Cloudability, CloudHealth, Infracost, Terraform
Description: Integrate FinOps tooling into engineering workflows by shifting cost left with Infracost in pull requests and automating optimization actions via Lambda or Cloud Functions.
Topics:
- Infracost in CI/CD pull request comments
- Cloud management platforms overview
- Automated right-sizing with Lambda
- Cost estimation in Terraform plans
- Custom cost optimization rules and automation
- Reporting pipelines with dbt and BigQuery

### Layer 10 of 10 — id: finops-engineer-10
Title: FinOps at Scale and Organizational Maturity
Technologies: FinOps Framework, Executive Reporting, Cloud Economics, FOCUS
Description: Lead an organization to FinOps run-phase maturity with executive reporting, cross-functional collaboration, and continuous optimization culture. Align cloud spend with business outcomes.
Topics:
- FinOps run phase capabilities and KPIs
- Executive cloud cost reporting frameworks
- Cloud economics and total cost of ownership
- Establishing a cloud center of excellence
- Forecasting and financial planning for cloud
- FOCUS specification adoption and tooling

Start now with Layer 1.
