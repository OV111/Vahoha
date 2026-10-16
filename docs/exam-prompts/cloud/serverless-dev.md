You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Serverless Developer" (serverless-dev, category cloud). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: serverless-dev-1
Title: Serverless Fundamentals
Technologies: Lambda, API Gateway, IAM, CloudWatch
Description: Understand the serverless computing model, its trade-offs, and how AWS Lambda executes functions. Create and test Lambda functions with different triggers and execution roles.
Topics:
- Serverless model benefits and trade-offs
- Lambda function anatomy handler runtime
- IAM execution roles and least privilege
- Lambda triggers and event sources
- CloudWatch Logs for Lambda
- Lambda pricing and free tier

### Layer 2 of 10 — id: serverless-dev-2
Title: API Gateway and HTTP APIs
Technologies: API Gateway, Lambda, CORS, API Keys
Description: Build RESTful and HTTP APIs using API Gateway integrated with Lambda. Configure authentication, CORS, request validation, and usage plans.
Topics:
- REST vs HTTP API in API Gateway
- Lambda proxy integration
- CORS configuration
- API keys and usage plans
- Request and response mapping templates
- API Gateway logging and tracing

### Layer 3 of 10 — id: serverless-dev-3
Title: Data Storage for Serverless
Technologies: DynamoDB, S3, ElastiCache, Parameter Store
Description: Design serverless-compatible data storage patterns using DynamoDB single-table design and S3. Understand connection reuse patterns and avoid cold-start penalties from connection pools.
Topics:
- DynamoDB single-table design
- DynamoDB Streams for change data capture
- S3 event notifications and presigned URLs
- Connection reuse in Lambda for external services
- SSM Parameter Store and Secrets Manager
- DynamoDB DAX for read caching

### Layer 4 of 10 — id: serverless-dev-4
Title: AWS SAM and Local Development
Technologies: SAM, SAM CLI, LocalStack, CloudFormation
Description: Use the AWS Serverless Application Model framework to define, test, and deploy serverless applications. Run Lambda and API Gateway locally using SAM CLI and LocalStack.
Topics:
- SAM template resources and globals
- sam build sam local invoke and start-api
- Environment variables and configuration
- SAM policy templates
- LocalStack for offline development
- SAM pipeline for CI/CD

### Layer 5 of 10 — id: serverless-dev-5
Title: Event-Driven Patterns with SQS and SNS
Technologies: SQS, SNS, EventBridge, Lambda
Description: Design event-driven serverless architectures using SQS for reliable queuing, SNS for fan-out, and EventBridge for event routing. Handle failures with dead-letter queues and retry policies.
Topics:
- SQS standard vs FIFO queues
- Lambda event source mapping for SQS
- Dead-letter queues and redrive policies
- SNS fan-out to multiple SQS queues
- EventBridge custom buses and rules
- Idempotency in event-driven systems

### Layer 6 of 10 — id: serverless-dev-6
Title: Orchestration with Step Functions
Technologies: Step Functions, Lambda, SAM, CloudWatch
Description: Orchestrate multi-step workflows and handle complex business logic using AWS Step Functions state machines. Implement error handling, retries, and parallel branches.
Topics:
- Step Functions Standard vs Express workflows
- Task catch retry and error handling
- Parallel and map states
- Wait for callback pattern
- Step Functions local testing
- Service integrations without Lambda

### Layer 7 of 10 — id: serverless-dev-7
Title: Performance and Cold Starts
Technologies: Lambda, Provisioned Concurrency, Lambda Layers, SnapStart
Description: Diagnose and mitigate Lambda cold start latency using provisioned concurrency, SnapStart for Java, and Lambda Layers. Profile function memory and CPU allocation for cost-performance balance.
Topics:
- Lambda cold start causes and measurement
- Provisioned concurrency configuration
- Lambda SnapStart for Java runtimes
- Lambda Layers for shared dependencies
- Memory and CPU allocation tuning
- Lambda Power Tuning tool

### Layer 8 of 10 — id: serverless-dev-8
Title: Security for Serverless Applications
Technologies: IAM, Cognito, WAF, Secrets Manager
Description: Secure serverless applications with fine-grained IAM permissions, Cognito user pools for authentication, and WAF for API protection. Manage secrets without hardcoding credentials.
Topics:
- Least privilege Lambda execution roles
- Cognito user pools and identity pools
- JWT validation in Lambda authorizers
- WAF rules and managed rule groups on API Gateway
- Secrets rotation in Secrets Manager
- OWASP serverless top 10

### Layer 9 of 10 — id: serverless-dev-9
Title: Observability and Debugging
Technologies: X-Ray, CloudWatch, Lambda Insights, Powertools
Description: Implement end-to-end distributed tracing and structured observability using AWS X-Ray and Lambda Powertools. Create dashboards and alarms for serverless operational visibility.
Topics:
- AWS X-Ray tracing and service maps
- Lambda Insights for enhanced metrics
- AWS Lambda Powertools for Python and TypeScript
- Structured logging with correlation IDs
- Custom CloudWatch metrics from Lambda
- Canary deployments and rollback for Lambda

### Layer 10 of 10 — id: serverless-dev-10
Title: Production Serverless Architecture
Technologies: Lambda, SAM, CDK, EventBridge Pipes
Description: Architect production-ready serverless platforms with multi-stage deployments, traffic shifting, and event-driven integration patterns. Apply the AWS Serverless Application Lens of the Well-Architected Framework.
Topics:
- AWS Serverless Application Lens review
- Multi-stage SAM and CDK deployments
- Lambda traffic shifting with aliases
- EventBridge Pipes for integration
- Serverless cost modeling at scale
- Chaos engineering for serverless

Start now with Layer 1.
