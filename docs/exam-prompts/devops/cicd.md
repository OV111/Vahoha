You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "CI/CD Engineer" (cicd, category devops). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: cicd-1
Title: CI/CD Foundations
Technologies: Git, GitHub Actions, YAML
Description: This layer introduces the core ideas behind continuous integration and continuous delivery. It matters because every modern delivery pipeline builds on these foundational concepts and version control habits.
Topics:
- What CI and CD mean and how they differ
- Version control workflows and branching
- Pipeline stages and triggers
- Build artifacts and caching basics
- Reading and writing YAML
- Fast feedback loops for developers

### Layer 2 of 10 — id: cicd-2
Title: Build and Test Automation
Technologies: GitHub Actions, Docker, Make
Description: This layer focuses on automating builds and running test suites inside pipelines. It matters because reliable automated testing is what makes continuous integration trustworthy.
Topics:
- Defining build steps and matrices
- Running unit and integration tests
- Dependency caching for speed
- Building container images in CI
- Test reporting and coverage
- Failing fast on broken builds

### Layer 3 of 10 — id: cicd-3
Title: Pipeline as Code with Jenkins
Technologies: Jenkins, Groovy, Docker
Description: This layer covers declarative and scripted pipelines using Jenkins. It matters because many enterprises run Jenkins and pipeline as code keeps delivery reproducible.
Topics:
- Jenkins architecture and agents
- Declarative versus scripted pipelines
- Writing a Jenkinsfile
- Stages, steps, and post actions
- Credentials and secrets handling
- Plugins and shared libraries

### Layer 4 of 10 — id: cicd-4
Title: Artifact Management and Versioning
Technologies: GitHub Actions, Docker Registry, Semantic Versioning
Description: This layer teaches how to publish, version, and store build outputs. It matters because traceable artifacts are essential for reliable releases and rollbacks.
Topics:
- Semantic versioning strategies
- Tagging container images
- Publishing to artifact registries
- Immutable artifacts and provenance
- Release notes automation
- Retention and cleanup policies

### Layer 5 of 10 — id: cicd-5
Title: Deployment Strategies
Technologies: GitHub Actions, CircleCI, Kubernetes
Description: This layer explores how to ship code safely to environments. It matters because the deployment strategy directly controls user-facing risk during releases.
Topics:
- Environment promotion flows
- Blue-green deployments
- Canary releases
- Rolling updates
- Manual approvals and gates
- Rollback automation

### Layer 6 of 10 — id: cicd-6
Title: GitOps with ArgoCD
Technologies: ArgoCD, Kubernetes, Git
Description: This layer introduces declarative continuous delivery driven by Git as the source of truth. It matters because GitOps makes deployments auditable, reversible, and self-healing.
Topics:
- GitOps principles and workflow
- ArgoCD applications and sync
- Declarative manifests in Git
- Automated drift detection
- Sync waves and hooks
- Rollbacks through Git history

### Layer 7 of 10 — id: cicd-7
Title: Secrets and Security in Pipelines
Technologies: GitHub Actions, HashiCorp Vault, OIDC
Description: This layer covers securely handling credentials and signing artifacts in delivery pipelines. It matters because pipelines are a prime target for supply chain attacks.
Topics:
- Storing and rotating secrets
- OIDC federation for cloud access
- Least privilege for runners
- Dependency and image scanning
- Signing artifacts and provenance
- Auditing pipeline access

### Layer 8 of 10 — id: cicd-8
Title: Pipeline Observability and Metrics
Technologies: GitHub Actions, Prometheus, Grafana
Description: This layer teaches how to measure and visualize pipeline health and delivery performance. It matters because you cannot improve delivery speed without measuring it.
Topics:
- DORA metrics and lead time
- Pipeline duration tracking
- Failure rate dashboards
- Flaky test detection
- Notifications and alerting
- Bottleneck analysis

### Layer 9 of 10 — id: cicd-9
Title: Scaling and Reusable Pipelines
Technologies: GitHub Actions, Jenkins, Reusable Workflows
Description: This layer focuses on sharing and standardizing pipelines across many repositories. It matters because consistency at scale reduces maintenance and enforces best practices.
Topics:
- Reusable workflows and composite actions
- Shared Jenkins libraries
- Self-hosted runner scaling
- Templating and policy enforcement
- Monorepo and matrix pipelines
- Cost and concurrency management

### Layer 10 of 10 — id: cicd-10
Title: Production Delivery Operations
Technologies: ArgoCD, GitHub Actions, Kubernetes
Description: This layer covers operating delivery systems reliably in production at organizational scale. It matters because a delivery platform must stay available, secure, and fast under real load.
Topics:
- Multi-environment release governance
- Progressive delivery automation
- Incident handling for failed deploys
- Disaster recovery for pipelines
- Compliance and audit trails
- Continuous improvement of delivery

Start now with Layer 1.
