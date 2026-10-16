You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Vector DB Engineer" (vector-db-engineer, category database). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: vector-db-engineer-1
Title: Embeddings and Vector Representations
Technologies: Python, OpenAI Embeddings, Sentence Transformers, NumPy
Description: Understand what vector embeddings are, how they encode semantic meaning, and how they are generated using pre-trained models. Compare embedding model outputs for different inputs.
Topics:
- What are vector embeddings
- Dense vs sparse vectors
- OpenAI text-embedding models
- Sentence Transformers library
- Cosine similarity
- Euclidean distance vs cosine similarity

### Layer 2 of 10 — id: vector-db-engineer-2
Title: Approximate Nearest Neighbor (ANN) Algorithms
Technologies: FAISS, HNSW, IVF, ScaNN
Description: Learn the algorithms that power fast vector similarity search including HNSW, IVF, and product quantization. Understand the accuracy vs speed trade-offs.
Topics:
- Brute-force vs approximate search
- HNSW (Hierarchical Navigable Small World)
- IVF (Inverted File Index)
- Product quantization
- FAISS library basics
- Recall vs throughput trade-offs

### Layer 3 of 10 — id: vector-db-engineer-3
Title: pgvector Fundamentals
Technologies: PostgreSQL, pgvector, SQL, HNSW index
Description: Install the pgvector extension and store, index, and query vector embeddings directly in PostgreSQL. Integrate vector search with relational filtering.
Topics:
- Installing pgvector
- Vector column type
- Exact and approximate search operators
- HNSW and IVF indexes in pgvector
- Combining vector search with SQL WHERE clauses
- Indexing parameters tuning

### Layer 4 of 10 — id: vector-db-engineer-4
Title: Pinecone and Managed Vector Databases
Technologies: Pinecone, Python SDK, Namespaces, Metadata Filtering
Description: Use Pinecone as a fully managed vector database to store and query embeddings at scale. Understand namespaces, metadata filtering, and the upsert/query API.
Topics:
- Pinecone index creation
- Upsert and query API
- Metadata filtering
- Namespaces for multi-tenancy
- Sparse-dense hybrid search
- Pod vs serverless indexes

### Layer 5 of 10 — id: vector-db-engineer-5
Title: RAG (Retrieval Augmented Generation) Patterns
Technologies: LangChain, pgvector, OpenAI, Python
Description: Build Retrieval Augmented Generation (RAG) pipelines that combine vector search with large language models. Understand chunking strategies and retrieval quality evaluation.
Topics:
- RAG pipeline architecture
- Text chunking strategies
- Embedding generation pipeline
- Retrieval and re-ranking
- LangChain vector store integration
- RAG evaluation metrics

### Layer 6 of 10 — id: vector-db-engineer-6
Title: Weaviate and Qdrant
Technologies: Weaviate, Qdrant, GraphQL, REST API
Description: Work with Weaviate and Qdrant as alternative vector databases offering different features like native GraphQL querying and payload-based filtering.
Topics:
- Weaviate schema definition
- Weaviate GraphQL query API
- Qdrant collection creation
- Qdrant payload filtering
- Weaviate modules (text2vec, img2vec)
- Qdrant vs Weaviate trade-offs

### Layer 7 of 10 — id: vector-db-engineer-7
Title: Multi-modal and Hybrid Search
Technologies: CLIP, Weaviate, BM25, Hybrid Search
Description: Build search systems that combine semantic vector search with traditional keyword BM25 scoring. Extend to multi-modal search combining text and image embeddings.
Topics:
- Hybrid search scoring (alpha weighting)
- BM25 for keyword retrieval
- CLIP for image-text embeddings
- Multi-modal search pipelines
- Re-ranking with cross-encoders
- Reciprocal rank fusion

### Layer 8 of 10 — id: vector-db-engineer-8
Title: Scaling Vector Search
Technologies: Pinecone, Weaviate, Sharding, Distributed ANN
Description: Scale vector search to hundreds of millions of vectors by understanding distributed indexing, sharding strategies, and serving architectures for low-latency search.
Topics:
- Sharding strategies for vector indexes
- Distributed HNSW
- Quantization for memory reduction
- Serving latency vs index size trade-offs
- Batch vs real-time indexing
- Caching for vector search

### Layer 9 of 10 — id: vector-db-engineer-9
Title: Monitoring and Operational Best Practices
Technologies: Prometheus, Grafana, Qdrant, Recall Evaluation
Description: Monitor vector database performance and search quality over time. Set up metrics for query latency, indexing throughput, and recall drift as embeddings evolve.
Topics:
- Vector DB metrics (QPS, latency, index size)
- Prometheus exporter for vector DBs
- Recall evaluation pipeline
- Embedding drift detection
- Index rebuild triggers
- Canary queries for quality monitoring

### Layer 10 of 10 — id: vector-db-engineer-10
Title: Production Vector Search Platform
Technologies: Kubernetes, Weaviate, MLflow, CI/CD
Description: Deploy a production-grade vector search platform on Kubernetes with automated embedding model versioning, index lifecycle management, and continuous quality evaluation.
Topics:
- Weaviate on Kubernetes
- Embedding model versioning with MLflow
- Index migration strategies for model upgrades
- CI/CD for embedding pipelines
- A/B testing for retrieval changes
- Cost optimization for vector infrastructure

Start now with Layer 1.
