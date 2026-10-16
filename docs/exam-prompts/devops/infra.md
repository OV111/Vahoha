You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Infrastructure Dev" (infra, category devops). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: infra-1
Title: Linux and Infrastructure Basics
Technologies: Linux, Bash, SSH
Description: This layer builds the operating system and networking foundation every infrastructure engineer needs. It matters because infrastructure tooling ultimately manages Linux hosts, networks, and processes.
Topics:
- Linux filesystem and permissions
- Process and service management
- Shell scripting with Bash
- Networking fundamentals
- SSH and remote access
- Package management

### Layer 2 of 10 — id: infra-2
Title: Infrastructure as Code Concepts
Technologies: Terraform, Linux, Git
Description: This layer introduces the principles of declaring infrastructure in version-controlled code. It matters because manual infrastructure changes are error-prone and impossible to reproduce reliably.
Topics:
- Declarative versus imperative IaC
- Idempotency and desired state
- State and drift concepts
- Provider and resource model
- Storing infrastructure in Git
- Plan and apply workflow

### Layer 3 of 10 — id: infra-3
Title: Provisioning with Terraform
Technologies: Terraform, HCL, Cloud Provider
Description: This layer deepens Terraform usage for real provisioning workflows. It matters because Terraform is the dominant tool for cloud infrastructure provisioning.
Topics:
- HCL syntax and expressions
- Variables, outputs, and locals
- Resource dependencies
- Data sources
- Provisioners and lifecycle rules
- Workspaces

### Layer 4 of 10 — id: infra-4
Title: Configuration Management with Ansible
Technologies: Ansible, YAML, Linux
Description: This layer covers automating server configuration after provisioning. It matters because consistent configuration prevents snowflake servers and configuration drift.
Topics:
- Inventories and hosts
- Playbooks and tasks
- Modules and idempotency
- Variables and templates
- Handlers and notifications
- Ad hoc commands

### Layer 5 of 10 — id: infra-5
Title: Reusable Modules and Roles
Technologies: Terraform, Ansible, Git
Description: This layer teaches structuring infrastructure code for reuse and maintainability. It matters because modular code scales across teams and reduces duplication.
Topics:
- Terraform modules and composition
- Ansible roles and galaxy
- Input validation and defaults
- Versioning shared modules
- Module registries
- DRY infrastructure patterns

### Layer 6 of 10 — id: infra-6
Title: Programmatic IaC with Pulumi
Technologies: Pulumi, TypeScript, Python
Description: This layer introduces defining infrastructure using general-purpose programming languages. It matters because programmatic IaC unlocks loops, conditionals, and richer abstractions.
Topics:
- Pulumi programming model
- Languages and SDKs
- Stacks and configuration
- Resource graph and dependencies
- Reusable component resources
- Comparing Pulumi and Terraform

### Layer 7 of 10 — id: infra-7
Title: State, Secrets, and Remote Backends
Technologies: Terraform, HashiCorp Vault, S3
Description: This layer covers managing infrastructure state and sensitive values safely. It matters because corrupted state or leaked secrets can cause outages and breaches.
Topics:
- Remote state backends
- State locking and consistency
- Importing existing resources
- Managing secrets with Vault
- Encrypting sensitive variables
- State recovery and backups

### Layer 8 of 10 — id: infra-8
Title: Infrastructure CI/CD and Testing
Technologies: Terraform, GitHub Actions, Terratest
Description: This layer teaches automating and validating infrastructure changes in pipelines. It matters because applying infrastructure by hand at scale is slow and risky.
Topics:
- Plan and apply in pipelines
- Policy as code and validation
- Linting and formatting checks
- Automated infrastructure tests
- Approval workflows for changes
- Preview environments

### Layer 9 of 10 — id: infra-9
Title: Multi-Environment and Multi-Cloud
Technologies: Terraform, Pulumi, Ansible
Description: This layer covers structuring infrastructure across environments and providers. It matters because real organizations run separate environments and sometimes multiple clouds.
Topics:
- Environment isolation strategies
- Workspaces and directory layouts
- Promoting changes across stages
- Provider abstractions
- Cost and tagging governance
- Cross-cloud networking basics

### Layer 10 of 10 — id: infra-10
Title: Operating Infrastructure in Production
Technologies: Terraform, Ansible, Linux
Description: This layer covers running, scaling, and recovering infrastructure reliably in production. It matters because infrastructure must remain stable, recoverable, and compliant under real workloads.
Topics:
- Drift detection and remediation
- Disaster recovery and backups
- Scaling and capacity changes
- Patching and maintenance windows
- Compliance and audit
- Cost optimization at scale

Start now with Layer 1.
