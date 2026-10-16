You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Microservices Engineer" (microservices, category backend). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: microservices-1
Title: Microservices Foundations
Technologies: Architecture, Monolith, SOA
Description: Understand what microservices are and when they help. Compare them with monoliths and learn the trade-offs before building.
Topics:
- Monolith vs microservices vs SOA
- Bounded contexts & service boundaries
- Benefits, costs & fallacies of distributed systems
- The twelve-factor app
- Synchronous vs asynchronous communication
- When NOT to use microservices

### Layer 2 of 10 — id: microservices-2
Title: Service Design & DDD
Technologies: DDD, Bounded Contexts, APIs
Description: Design services that own their domain. Apply domain-driven design to find boundaries and define clean contracts.
Topics:
- Domain-driven design essentials
- Aggregates & bounded contexts
- Defining service contracts
- API versioning & backward compatibility
- Database-per-service
- Decomposition strategies

### Layer 3 of 10 — id: microservices-3
Title: Inter-Service Communication
Technologies: REST, gRPC, Protobuf
Description: Connect services reliably. Choose between REST and gRPC and design robust synchronous communication.
Topics:
- REST vs gRPC trade-offs
- Protocol Buffers & schemas
- Client libraries & service discovery
- Timeouts, retries & idempotency
- Contract testing
- Backward-compatible evolution

### Layer 4 of 10 — id: microservices-4
Title: Messaging & Event-Driven
Technologies: RabbitMQ, Kafka, Events
Description: Decouple services with asynchronous messaging. Use RabbitMQ or Kafka to build event-driven architectures.
Topics:
- Message brokers — RabbitMQ vs Kafka
- Pub/sub & work queues
- Event-driven architecture
- Event sourcing & CQRS basics
- Delivery guarantees & ordering
- Dead-letter queues & retries

### Layer 5 of 10 — id: microservices-5
Title: Containerization with Docker
Technologies: Docker, Compose, Images
Description: Package each service as a container. Build images, run multi-service stacks locally, and standardize environments.
Topics:
- Dockerfiles & multi-stage builds
- Images, layers & registries
- Docker Compose for local stacks
- Networking between containers
- Volumes & persistence
- Image security & size optimization

### Layer 6 of 10 — id: microservices-6
Title: Orchestration with Kubernetes
Technologies: Kubernetes, Helm, Deployments
Description: Run services at scale. Deploy, scale and self-heal your containers with Kubernetes.
Topics:
- Pods, deployments & services
- ConfigMaps & secrets
- Scaling & rolling updates
- Ingress & networking
- Health probes & resource limits
- Packaging with Helm

### Layer 7 of 10 — id: microservices-7
Title: API Gateway & Service Mesh
Technologies: API Gateway, Istio, Envoy
Description: Manage cross-cutting concerns at the edge and between services with gateways and a service mesh.
Topics:
- API gateway responsibilities
- Routing, auth & rate limiting at the edge
- Service mesh concepts (Istio/Linkerd)
- mTLS & traffic management
- Observability via the mesh
- Canary & blue-green routing

### Layer 8 of 10 — id: microservices-8
Title: Data Management & Saga
Technologies: Saga, CQRS, Outbox
Description: Handle data consistency across services. Implement distributed transactions with the saga pattern.
Topics:
- Database-per-service consequences
- Distributed transactions & the saga pattern
- Choreography vs orchestration
- The transactional outbox pattern
- Eventual consistency
- Idempotency & deduplication

### Layer 9 of 10 — id: microservices-9
Title: Observability & Resilience
Technologies: Prometheus, Grafana, OpenTelemetry
Description: Operate distributed systems with confidence. Add metrics, logs and traces, and build in resilience.
Topics:
- Centralized logging
- Metrics with Prometheus & Grafana
- Distributed tracing with OpenTelemetry
- Circuit breakers, retries & bulkheads
- Health checks & graceful degradation
- SLOs & alerting

### Layer 10 of 10 — id: microservices-10
Title: CI/CD & Deployment
Technologies: GitHub Actions, ArgoCD, GitOps
Description: Automate delivery of many services. Build pipelines, adopt GitOps, and deploy safely and often.
Topics:
- Per-service CI pipelines
- Container registries & versioning
- GitOps with ArgoCD
- Progressive delivery — canary & blue-green
- Secrets & environment promotion
- Rollbacks & release strategies

Start now with Layer 1.
