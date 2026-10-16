You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Kubernetes Engineer" (kubernetes, category devops). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: kubernetes-1
Title: Containers and Docker Fundamentals
Technologies: Docker, Linux, OCI
Description: This layer establishes the container fundamentals that Kubernetes builds upon. It matters because you cannot operate Kubernetes well without understanding images, containers, and isolation.
Topics:
- Container versus virtual machine
- Images, layers, and registries
- Writing Dockerfiles
- Container networking and volumes
- Namespaces and cgroups
- Running multi-container apps

### Layer 2 of 10 — id: kubernetes-2
Title: Kubernetes Core Concepts
Technologies: Kubernetes, kubectl, YAML
Description: This layer introduces the Kubernetes architecture and core objects. It matters because pods, services, and the control plane are the vocabulary of all later work.
Topics:
- Cluster architecture and components
- Pods and containers
- ReplicaSets and Deployments
- Services and basic networking
- Namespaces and labels
- kubectl basics

### Layer 3 of 10 — id: kubernetes-3
Title: Configuration and Storage
Technologies: Kubernetes, ConfigMaps, PersistentVolumes
Description: This layer covers managing application configuration and persistent data. It matters because real applications need configuration, secrets, and durable storage.
Topics:
- ConfigMaps and Secrets
- Environment and volume injection
- PersistentVolumes and claims
- Storage classes
- StatefulSets
- Init containers

### Layer 4 of 10 — id: kubernetes-4
Title: Packaging with Helm
Technologies: Helm, Kubernetes, YAML
Description: This layer teaches templating and packaging Kubernetes applications with Helm. It matters because Helm makes complex deployments repeatable and configurable.
Topics:
- Charts and templates
- Values and overrides
- Releases and upgrades
- Template functions and helpers
- Dependencies and subcharts
- Chart repositories

### Layer 5 of 10 — id: kubernetes-5
Title: Networking and Ingress
Technologies: Kubernetes, Ingress, CoreDNS
Description: This layer explores how traffic flows in and across a cluster. It matters because exposing and securing services correctly is central to running real workloads.
Topics:
- Cluster networking model
- Service types in depth
- Ingress controllers and rules
- DNS and service discovery
- Network policies
- TLS termination

### Layer 6 of 10 — id: kubernetes-6
Title: Service Mesh with Istio
Technologies: Istio, Kubernetes, Envoy
Description: This layer introduces advanced traffic management and security with a service mesh. It matters because meshes provide observability, mTLS, and traffic control without code changes.
Topics:
- Service mesh architecture
- Sidecar proxies and Envoy
- Traffic routing and splitting
- Mutual TLS and security
- Observability and telemetry
- Resilience features

### Layer 7 of 10 — id: kubernetes-7
Title: Security and RBAC
Technologies: Kubernetes, RBAC, OPA
Description: This layer covers securing clusters and workloads. It matters because misconfigured permissions and pods are a leading cause of cluster breaches.
Topics:
- Authentication and authorization
- Role-based access control
- Service accounts
- Pod security standards
- Admission control and policies
- Secrets management

### Layer 8 of 10 — id: kubernetes-8
Title: Observability and Autoscaling
Technologies: Kubernetes, Prometheus, HPA
Description: This layer teaches monitoring clusters and scaling workloads automatically. It matters because clusters must adapt to load while remaining observable and cost-efficient.
Topics:
- Metrics server and resource metrics
- Horizontal pod autoscaling
- Vertical and cluster autoscaling
- Monitoring with Prometheus
- Logging in clusters
- Resource requests and limits

### Layer 9 of 10 — id: kubernetes-9
Title: GitOps and Cluster Delivery
Technologies: ArgoCD, Helm, Kubernetes
Description: This layer covers deploying to clusters declaratively from Git. It matters because GitOps makes cluster changes auditable, repeatable, and self-healing.
Topics:
- GitOps workflow for clusters
- Declarative app delivery
- Helm with GitOps tools
- Progressive delivery
- Multi-cluster delivery
- Drift detection and sync

### Layer 10 of 10 — id: kubernetes-10
Title: Production Cluster Operations
Technologies: Kubernetes, Istio, etcd
Description: This layer covers operating clusters reliably at production scale. It matters because production clusters must stay available, upgradeable, and recoverable under real traffic.
Topics:
- Cluster upgrades and versioning
- etcd backup and restore
- Disaster recovery
- Multi-tenancy and quotas
- Capacity and cost management
- Incident response for clusters

Start now with Layer 1.
