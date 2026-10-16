You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Edge Computing Engineer" (edge-engineer, category cloud). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: edge-engineer-1
Title: Edge Computing Fundamentals
Technologies: CDN, Edge, Latency, Cloudflare
Description: Understand the edge computing model, how CDNs work, and why moving computation closer to users reduces latency. Compare centralized cloud with edge and CDN delivery.
Topics:
- Edge computing vs cloud computing
- CDN points of presence and caching
- DNS resolution and anycast routing
- HTTP caching headers and Cache-Control
- Cloudflare network overview
- Edge use cases low-latency real-time

### Layer 2 of 10 — id: edge-engineer-2
Title: Cloudflare Workers Basics
Technologies: Cloudflare Workers, JavaScript, Wrangler, Service Bindings
Description: Write and deploy serverless JavaScript functions at the Cloudflare edge using Workers. Understand the Workers runtime, request lifecycle, and how it differs from Node.js.
Topics:
- Cloudflare Workers runtime model
- Fetch event handler and request response
- Wrangler CLI for local dev and deployment
- Environment variables and secrets
- Workers routes and patterns
- Service bindings between Workers

### Layer 3 of 10 — id: edge-engineer-3
Title: Edge Storage and State
Technologies: KV Store, Durable Objects, R2, D1
Description: Persist data at the edge using Cloudflare KV, Durable Objects, R2 object storage, and D1 SQLite databases. Understand consistency trade-offs of eventually consistent KV vs strongly consistent Durable Objects.
Topics:
- Cloudflare KV eventual consistency model
- KV namespaces and key-value patterns
- Durable Objects for stateful coordination
- Durable Objects WebSocket hibernation
- R2 storage vs S3 cost comparison
- D1 SQLite at the edge queries and migrations

### Layer 4 of 10 — id: edge-engineer-4
Title: WebAssembly at the Edge
Technologies: WASM, Rust, AssemblyScript, Edge WASM
Description: Compile Rust or AssemblyScript to WebAssembly and run it inside Cloudflare Workers for near-native performance at the edge. Understand WASM module instantiation and memory management.
Topics:
- WebAssembly concepts and binary format
- Compiling Rust to WASM with wasm-pack
- AssemblyScript for TypeScript developers
- WASM in Cloudflare Workers and Workers WASM bindings
- WASM performance vs JS trade-offs
- WASM Component Model and WASI

### Layer 5 of 10 — id: edge-engineer-5
Title: Edge Functions on Vercel and Netlify
Technologies: Vercel Edge Functions, Netlify Edge Functions, Next.js, Middleware
Description: Deploy edge middleware and functions on Vercel and Netlify platforms to personalize content and handle authentication at the CDN layer. Integrate with popular front-end frameworks.
Topics:
- Vercel Edge Functions vs serverless functions
- Next.js middleware for edge routing
- Netlify Edge Functions with Deno runtime
- Geolocation and personalization at edge
- A/B testing at the edge with feature flags
- Edge authentication with JWT validation

### Layer 6 of 10 — id: edge-engineer-6
Title: Edge Security and WAF
Technologies: WAF, DDoS Protection, Bot Management, Cloudflare Access
Description: Protect applications at the edge using Web Application Firewall rules, DDoS mitigation, and bot management. Implement Zero Trust access policies with Cloudflare Access.
Topics:
- WAF rule sets and custom rules
- DDoS protection layers 3 4 and 7
- Bot score and bot fight mode
- Rate limiting at the edge
- Cloudflare Access Zero Trust policies
- mTLS at the edge for API security

### Layer 7 of 10 — id: edge-engineer-7
Title: CDN Performance Optimization
Technologies: Cache Rules, Image Optimization, HTTP3, Prefetch
Description: Tune CDN cache rules for maximum offload and implement edge-side image optimization and format conversion. Measure and improve Core Web Vitals scores using edge capabilities.
Topics:
- Cache key design and variation rules
- Edge-side image transformation and WebP conversion
- HTTP/3 and QUIC protocol benefits
- Resource hints prefetch preconnect
- Cache purging strategies and cache tags
- Core Web Vitals and edge optimization

### Layer 8 of 10 — id: edge-engineer-8
Title: Edge AI and Inference
Technologies: Cloudflare AI, Workers AI, ONNX, Edge Inference
Description: Run machine learning inference at the edge using Cloudflare Workers AI and ONNX runtime to reduce latency and avoid sending data to centralized inference servers.
Topics:
- Edge AI inference trade-offs vs cloud
- Cloudflare Workers AI model catalog
- ONNX model format and runtime
- Text classification and embedding at edge
- Image classification inference in Workers
- Privacy benefits of edge inference

### Layer 9 of 10 — id: edge-engineer-9
Title: IoT and Edge Protocols
Technologies: MQTT, WebSockets, AWS Greengrass, Azure IoT Edge
Description: Extend edge computing to IoT devices using MQTT, WebSockets, and cloud-managed edge runtimes. Design architectures that process sensor data locally before syncing to the cloud.
Topics:
- MQTT protocol pub/sub and QoS levels
- AWS Greengrass local compute and ML
- Azure IoT Edge modules and routes
- WebSocket connections through Durable Objects
- Edge-to-cloud synchronization patterns
- Offline-first edge device design

### Layer 10 of 10 — id: edge-engineer-10
Title: Production Edge Architecture
Technologies: Cloudflare, Multi-CDN, Edge Orchestration, Observability
Description: Design and operate production edge platforms with multi-CDN failover, edge observability, and sophisticated request orchestration logic. Apply edge-first architecture patterns at scale.
Topics:
- Multi-CDN strategy and DNS-based failover
- Edge observability with Workers Analytics Engine
- Request coalescing and cache stampede prevention
- Cloudflare Pages and Workers combined deployments
- Edge configuration as code with Wrangler and Terraform
- SLAs and incident response for edge platforms

Start now with Layer 1.
