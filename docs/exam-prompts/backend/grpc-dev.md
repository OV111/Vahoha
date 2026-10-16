You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "gRPC Engineer" (grpc-dev, category backend). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: grpc-dev-1
Title: RPC & Protocol Buffers Foundations
Technologies: RPC, Protobuf, Serialization
Description: Understand remote procedure calls and the binary format that powers gRPC. Learn why Protobuf beats JSON for service-to-service traffic.
Topics:
- What RPC is & how it differs from REST
- Protocol Buffers vs JSON
- Binary serialization basics
- Installing protoc & plugins
- HTTP/2 fundamentals
- The gRPC ecosystem overview

### Layer 2 of 10 — id: grpc-dev-2
Title: Defining Services with Protobuf
Technologies: Protobuf, proto3, Schemas
Description: Design clean, evolvable APIs with Protocol Buffers. Master messages, services and the proto3 syntax.
Topics:
- Messages, fields & scalar types
- Enums, nested & repeated fields
- Service & RPC definitions
- Field numbers & wire compatibility
- Well-known types & timestamps
- Packages & imports

### Layer 3 of 10 — id: grpc-dev-3
Title: gRPC Fundamentals
Technologies: gRPC, Unary, Stubs
Description: Build your first working gRPC service and client. Understand stubs, channels and the unary call lifecycle.
Topics:
- Generating stubs from proto
- Servers & service implementations
- Channels & clients
- Unary RPC end to end
- Status codes & basic errors
- Reflection & grpcurl

### Layer 4 of 10 — id: grpc-dev-4
Title: Streaming RPCs
Technologies: Streaming, Flow Control, HTTP/2
Description: Go beyond request/response. Implement server, client and bidirectional streaming over HTTP/2.
Topics:
- Server-side streaming
- Client-side streaming
- Bidirectional streaming
- Flow control & backpressure
- Streaming error handling
- When to stream vs unary

### Layer 5 of 10 — id: grpc-dev-5
Title: gRPC in Go
Technologies: Go, grpc-go, protoc-gen-go
Description: Implement high-performance gRPC services in Go, the language gRPC feels most at home in.
Topics:
- protoc-gen-go & grpc plugins
- Implementing servers in Go
- Go clients & connection management
- Context, deadlines & cancellation
- Concurrency with goroutines
- Project structure for Go services

### Layer 6 of 10 — id: grpc-dev-6
Title: gRPC in Node.js
Technologies: Node.js, grpc-js, TypeScript
Description: Bring gRPC to the Node ecosystem. Generate types and build services and clients in TypeScript.
Topics:
- @grpc/grpc-js & proto loading
- Static vs dynamic codegen
- TypeScript types from proto
- Implementing Node servers
- Node clients & promisified calls
- Interop with the Go service

### Layer 7 of 10 — id: grpc-dev-7
Title: Interceptors, Auth & Metadata
Technologies: Interceptors, Metadata, TLS
Description: Add cross-cutting concerns to gRPC. Use interceptors and metadata for auth, logging and tracing, secured with TLS.
Topics:
- Metadata & headers
- Unary & streaming interceptors
- Authentication with tokens
- TLS & mutual TLS
- Logging & tracing interceptors
- Per-RPC credentials

### Layer 8 of 10 — id: grpc-dev-8
Title: Error Handling & Deadlines
Technologies: Status, Deadlines, Retries
Description: Make gRPC robust. Use rich error models, propagate deadlines, and add retries for reliability.
Topics:
- Status codes & error details
- The richer error model (google.rpc)
- Deadlines & cancellation propagation
- Retry policies & backoff
- Health checking protocol
- Graceful shutdown

### Layer 9 of 10 — id: grpc-dev-9
Title: gRPC-Web, Gateways & Testing
Technologies: gRPC-Web, grpc-gateway, Testing
Description: Bridge gRPC to browsers and REST clients, and test your services thoroughly.
Topics:
- gRPC-Web for browsers
- grpc-gateway — REST from proto
- Envoy as a gRPC proxy
- Unit testing services
- Integration & load testing (ghz)
- Mocking clients

### Layer 10 of 10 — id: grpc-dev-10
Title: Performance & Deployment
Technologies: Docker, Load Balancing, Buf
Description: Ship and scale gRPC in production. Manage schemas, load balance, and deploy on Kubernetes.
Topics:
- Schema management with Buf
- Channel pooling & keepalive
- Load balancing gRPC (proxy & client-side)
- Deploying gRPC on Kubernetes
- Observability with OpenTelemetry
- Versioning & backward compatibility

Start now with Layer 1.
