You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "AWS Specialist" (aws-dev, category devops). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: aws-dev-1
Title: AWS Cloud Fundamentals
Technologies: IAM, VPC, Region
Description: This layer introduces the AWS global infrastructure and core account concepts. It matters because regions, identity, and networking underpin every service you will use.
Topics:
- Regions and availability zones
- IAM users, roles, and policies
- Shared responsibility model
- VPC basics
- Billing and free tier
- AWS CLI and console

### Layer 2 of 10 — id: aws-dev-2
Title: Compute with EC2
Technologies: EC2, EBS, Auto Scaling
Description: This layer covers provisioning and managing virtual servers on AWS. It matters because EC2 remains a core compute primitive and teaches fundamental cloud operations.
Topics:
- Instance types and pricing
- AMIs and user data
- Security groups and key pairs
- EBS volumes and snapshots
- Auto Scaling groups
- Elastic Load Balancing

### Layer 3 of 10 — id: aws-dev-3
Title: Storage with S3
Technologies: S3, Glacier, CloudFront
Description: This layer teaches object storage and content delivery on AWS. It matters because S3 is the backbone of storage, backups, and static hosting in the AWS ecosystem.
Topics:
- Buckets and objects
- Storage classes and lifecycle
- Bucket policies and access
- Versioning and encryption
- Static website hosting
- CloudFront distribution

### Layer 4 of 10 — id: aws-dev-4
Title: Serverless with Lambda
Technologies: Lambda, API Gateway, DynamoDB
Description: This layer covers building event-driven serverless applications. It matters because serverless reduces operational overhead and is a key modern AWS pattern.
Topics:
- Lambda functions and runtimes
- Event sources and triggers
- API Gateway integration
- DynamoDB basics
- Permissions and execution roles
- Cold starts and limits

### Layer 5 of 10 — id: aws-dev-5
Title: Networking and Security
Technologies: VPC, IAM, Security Groups
Description: This layer deepens VPC networking and access control. It matters because secure, well-segmented networks are required for any production AWS workload.
Topics:
- Subnets and route tables
- Internet and NAT gateways
- Security groups versus NACLs
- VPC peering and endpoints
- IAM policy evaluation
- Secrets and parameter storage

### Layer 6 of 10 — id: aws-dev-6
Title: Infrastructure as Code with CloudFormation
Technologies: CloudFormation, YAML, CDK
Description: This layer teaches declaring AWS infrastructure as templates. It matters because reproducible, version-controlled infrastructure is essential for reliable AWS environments.
Topics:
- Template structure and resources
- Parameters, mappings, and outputs
- Stacks and change sets
- Nested and cross-stack references
- Drift detection
- Intro to AWS CDK

### Layer 7 of 10 — id: aws-dev-7
Title: Databases and Messaging
Technologies: RDS, DynamoDB, SQS
Description: This layer covers managed databases and asynchronous messaging on AWS. It matters because durable data and decoupled communication are core to scalable architectures.
Topics:
- RDS engines and Multi-AZ
- DynamoDB data modeling
- Read replicas and backups
- SQS and SNS messaging
- Event-driven decoupling
- Caching with ElastiCache

### Layer 8 of 10 — id: aws-dev-8
Title: Observability and Operations
Technologies: CloudWatch, X-Ray, CloudTrail
Description: This layer teaches monitoring, logging, and tracing AWS workloads. It matters because visibility into systems is required to operate them reliably.
Topics:
- CloudWatch metrics and alarms
- Logs and log insights
- Distributed tracing with X-Ray
- Auditing with CloudTrail
- Dashboards and notifications
- Cost monitoring

### Layer 9 of 10 — id: aws-dev-9
Title: CI/CD on AWS
Technologies: CodePipeline, CodeBuild, CloudFormation
Description: This layer covers automating builds and deployments using AWS native tooling. It matters because automated delivery is what makes cloud iteration fast and safe.
Topics:
- CodePipeline stages
- CodeBuild build specs
- CodeDeploy strategies
- Deploying via CloudFormation
- Approvals and rollbacks
- Pipeline security

### Layer 10 of 10 — id: aws-dev-10
Title: Production Architecture and Scaling
Technologies: EC2, Lambda, CloudFormation
Description: This layer covers running well-architected, scalable workloads in production. It matters because production AWS systems must balance reliability, cost, and security under real demand.
Topics:
- Well-Architected Framework
- High availability across zones
- Disaster recovery strategies
- Cost optimization
- Multi-account organization
- Security and compliance at scale

Start now with Layer 1.
