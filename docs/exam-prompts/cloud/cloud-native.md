You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Cloud Native Engineer" (cloud-native, category cloud). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: cloud-native-1
Title: Containers and Docker Fundamentals
Technologies: Docker, Dockerfile, Docker Compose, Container Registry
Description: Build, run, and manage containerized applications using Docker. Understand image layers, multi-stage builds, and container networking basics.
Topics:
- Container vs VM architecture
- Dockerfile instructions and best practices
- Multi-stage builds for smaller images
- Docker volumes and bind mounts
- Docker networking bridge and host
- Docker Compose for local multi-service apps

### Layer 2 of 10 — id: cloud-native-2
Title: Kubernetes Fundamentals
Technologies: Kubernetes, kubectl, Pods, Services
Description: Deploy and manage containerized workloads on Kubernetes using core objects like Pods, Deployments, Services, and ConfigMaps. Understand the control plane and worker node architecture.
Topics:
- Kubernetes architecture control plane and nodes
- Pods ReplicaSets and Deployments
- Services ClusterIP NodePort LoadBalancer
- ConfigMaps and Secrets
- Namespaces and resource quotas
- kubectl commands and context management

### Layer 3 of 10 — id: cloud-native-3
Title: Helm and Package Management
Technologies: Helm, Helm Charts, Values, Helm Hooks
Description: Package Kubernetes applications as Helm charts with parameterized values for different environments. Manage release lifecycle with upgrades, rollbacks, and hooks.
Topics:
- Helm chart structure templates and values
- Helm templating with Go templates
- Chart dependencies and subcharts
- Helm lifecycle hooks pre-install post-upgrade
- Helm repositories and OCI registries
- Helmfile for multi-chart management

### Layer 4 of 10 — id: cloud-native-4
Title: Kubernetes Networking and Ingress
Technologies: Ingress, NetworkPolicy, CoreDNS, CNI
Description: Configure external access to Kubernetes services using Ingress controllers and implement network policies for microsegmentation. Understand CNI plugins and DNS resolution.
Topics:
- Ingress controllers nginx and Traefik
- Ingress rules TLS and path routing
- NetworkPolicy for pod-to-pod isolation
- CNI plugins Calico Cilium Flannel
- CoreDNS configuration and troubleshooting
- Service mesh vs Ingress trade-offs

### Layer 5 of 10 — id: cloud-native-5
Title: Kubernetes Storage and Stateful Workloads
Technologies: PersistentVolumes, StatefulSets, Storage Classes, CSI
Description: Deploy stateful applications on Kubernetes using StatefulSets, PersistentVolumeClaims, and CSI storage drivers. Understand storage class provisioners and volume expansion.
Topics:
- PersistentVolumes and PersistentVolumeClaims
- Storage classes and dynamic provisioning
- StatefulSets stable network identities
- CSI drivers for cloud storage
- Volume snapshots and clones
- Backup strategies for stateful apps

### Layer 6 of 10 — id: cloud-native-6
Title: Service Mesh with Istio
Technologies: Istio, Envoy, VirtualService, Kiali
Description: Implement a service mesh using Istio to provide traffic management, mutual TLS, and observability without changing application code. Configure traffic shifting and circuit breaking.
Topics:
- Istio architecture control plane and data plane
- VirtualService and DestinationRule
- Mutual TLS with PeerAuthentication
- Traffic shifting and canary releases
- Circuit breaking and fault injection
- Kiali Jaeger and Grafana integration

### Layer 7 of 10 — id: cloud-native-7
Title: GitOps and Continuous Delivery
Technologies: ArgoCD, Flux, Kustomize, Helm
Description: Implement GitOps workflows using ArgoCD or Flux to declaratively manage Kubernetes deployments from Git repositories. Use Kustomize overlays for environment-specific configurations.
Topics:
- GitOps principles and benefits
- ArgoCD applications and app-of-apps pattern
- Flux Kustomization and HelmRelease
- Kustomize bases and overlays
- Secrets management with Sealed Secrets or ESO
- Progressive delivery with Argo Rollouts

### Layer 8 of 10 — id: cloud-native-8
Title: Security and Policy Enforcement
Technologies: OPA Gatekeeper, Falco, RBAC, Pod Security Standards
Description: Enforce security policies on Kubernetes workloads using OPA Gatekeeper admission webhooks and runtime threat detection with Falco. Implement RBAC and pod security standards.
Topics:
- Kubernetes RBAC roles and role bindings
- Pod Security Standards baseline restricted
- OPA Gatekeeper constraints and templates
- Falco rules and alert channels
- Image scanning in CI with Trivy
- Supply chain security with Sigstore Cosign

### Layer 9 of 10 — id: cloud-native-9
Title: Observability for Kubernetes
Technologies: Prometheus, Grafana, OpenTelemetry, Loki
Description: Build full-stack observability for cloud native applications using the Prometheus and Grafana ecosystem, OpenTelemetry for instrumentation, and Loki for log aggregation.
Topics:
- Prometheus scraping and relabeling
- ServiceMonitor and PodMonitor with Prometheus Operator
- Grafana dashboards and alerting rules
- OpenTelemetry SDK instrumentation
- Loki log aggregation and LogQL
- Distributed tracing with Tempo or Jaeger

### Layer 10 of 10 — id: cloud-native-10
Title: Production Cloud Native Platform Engineering
Technologies: Kubernetes, Platform Engineering, Backstage, CNCF
Description: Build and operate a production-grade internal developer platform on Kubernetes with self-service capabilities, golden paths, and CNCF project integrations. Apply cloud native maturity model principles.
Topics:
- Platform engineering concepts and IDP
- Backstage developer portal setup
- Golden path templates and scaffolding
- CNCF landscape project selection
- Multi-cluster management with Cluster API
- Cloud native maturity model assessment

Start now with Layer 1.
