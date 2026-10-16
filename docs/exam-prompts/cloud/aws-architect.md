You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "AWS Solutions Architect" (aws-architect, category cloud). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: aws-architect-1
Title: Cloud and AWS Fundamentals
Technologies: AWS, EC2, S3, IAM
Description: Learn the core concepts of cloud computing and the AWS global infrastructure. Understand regions, availability zones, and the shared responsibility model.
Topics:
- Cloud computing models IaaS PaaS SaaS
- AWS global infrastructure
- IAM users groups roles policies
- EC2 instance types and pricing
- S3 buckets and storage classes
- AWS CLI and console basics

### Layer 2 of 10 — id: aws-architect-2
Title: Networking in AWS
Technologies: VPC, Subnets, Route Tables, Security Groups
Description: Design and build virtual private clouds with public and private subnets. Configure routing, security groups, and network ACLs to control traffic flow.
Topics:
- VPC design and CIDR blocks
- Public and private subnets
- Internet gateways and NAT gateways
- Route tables and routing rules
- Security groups vs network ACLs
- VPC peering and endpoints

### Layer 3 of 10 — id: aws-architect-3
Title: Compute and Auto Scaling
Technologies: EC2, Auto Scaling, ELB, Launch Templates
Description: Architect scalable and highly available compute layers using EC2 auto scaling groups and elastic load balancers. Understand horizontal scaling patterns and health checks.
Topics:
- EC2 launch templates and AMIs
- Auto Scaling groups and policies
- Application Load Balancer vs Network Load Balancer
- Target groups and health checks
- Spot instances and savings plans
- Placement groups

### Layer 4 of 10 — id: aws-architect-4
Title: Storage and Database Services
Technologies: RDS, DynamoDB, EBS, EFS
Description: Select appropriate storage and database solutions for different workload requirements. Understand consistency models, replication, and backup strategies.
Topics:
- RDS multi-AZ and read replicas
- Aurora serverless and global databases
- DynamoDB tables keys and indexes
- EBS volume types and snapshots
- EFS shared file systems
- S3 lifecycle policies and versioning

### Layer 5 of 10 — id: aws-architect-5
Title: Security and Identity
Technologies: IAM, KMS, Secrets Manager, GuardDuty
Description: Implement defense-in-depth security using AWS native security services. Apply the principle of least privilege and encrypt data at rest and in transit.
Topics:
- IAM policies and permission boundaries
- KMS key management and rotation
- Secrets Manager and Parameter Store
- AWS Organizations and SCPs
- GuardDuty and Security Hub
- CloudTrail and Config rules

### Layer 6 of 10 — id: aws-architect-6
Title: Infrastructure as Code with CloudFormation
Technologies: CloudFormation, CDK, StackSets, Drift Detection
Description: Define and manage AWS infrastructure declaratively using CloudFormation templates and the AWS CDK. Implement change sets, nested stacks, and multi-account deployments.
Topics:
- CloudFormation template anatomy
- Parameters mappings outputs
- Nested stacks and stack sets
- Change sets and rollback triggers
- AWS CDK constructs and apps
- Drift detection and remediation

### Layer 7 of 10 — id: aws-architect-7
Title: Serverless and Managed Services
Technologies: Lambda, API Gateway, SQS, SNS
Description: Integrate serverless compute with managed messaging and API services to build event-driven architectures. Understand throttling, dead-letter queues, and fan-out patterns.
Topics:
- Lambda functions triggers and layers
- API Gateway REST and HTTP APIs
- SQS standard and FIFO queues
- SNS topics and subscriptions
- EventBridge rules and buses
- Step Functions state machines

### Layer 8 of 10 — id: aws-architect-8
Title: High Availability and Disaster Recovery
Technologies: Route 53, CloudFront, Backup, Global Accelerator
Description: Design systems that meet RTO and RPO targets using AWS global services and cross-region replication strategies. Implement failover routing and content distribution.
Topics:
- Route 53 routing policies and health checks
- CloudFront distributions and origins
- Multi-region active-active vs active-passive
- AWS Backup policies and vaults
- RTO and RPO targets
- Chaos engineering and fault injection

### Layer 9 of 10 — id: aws-architect-9
Title: Cost Optimization and Performance
Technologies: Cost Explorer, Trusted Advisor, Compute Optimizer, Savings Plans
Description: Apply the AWS Well-Architected cost optimization pillar to identify waste and right-size resources. Use savings plans, reserved instances, and spot strategically.
Topics:
- AWS Cost Explorer and budgets
- Reserved instances vs savings plans
- Spot instance strategies and interruption handling
- Compute Optimizer recommendations
- S3 intelligent tiering
- Tagging strategies for cost allocation

### Layer 10 of 10 — id: aws-architect-10
Title: Advanced Architecture and AWS Professional
Technologies: AWS Organizations, Control Tower, Service Catalog, Well-Architected Tool
Description: Design enterprise-grade multi-account AWS landing zones with governance, compliance, and self-service capabilities. Apply all five Well-Architected pillars at scale.
Topics:
- AWS Landing Zone and Control Tower
- Service Control Policies and guardrails
- AWS Service Catalog products and portfolios
- Well-Architected reviews and remediation
- Transit Gateway and network hub-and-spoke
- AWS Outposts and hybrid architectures

Start now with Layer 1.
