You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "ML Engineer" (ml-engineer, category aiml). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: ml-1
Title: Python & Math Foundations
Technologies: Python, NumPy, Linear Algebra, Statistics
Description: ML is applied math in code. You need fluent Python and enough linear algebra, calculus, and statistics to understand why algorithms work — not just how to call them.
Topics:
- Python — functions, classes, list comprehensions, generators
- NumPy — arrays, broadcasting, vectorized operations
- Linear algebra — vectors, matrices, dot product, eigenvalues
- Calculus — derivatives, gradients, chain rule
- Statistics — mean, variance, normal distribution, Bayes' theorem
- Jupyter notebooks workflow

### Layer 2 of 10 — id: ml-2
Title: Data Manipulation & EDA
Technologies: Pandas, Matplotlib, Seaborn, Jupyter
Description: Real-world data is messy. Learn to load, clean, transform, and visualize data with Pandas and Matplotlib — skills you'll use in every single ML project.
Topics:
- Pandas — DataFrames, Series, indexing, groupby, merge
- Data cleaning — missing values, duplicates, outliers
- Feature engineering — encoding, scaling, binning
- EDA — correlation matrices, distributions, pair plots
- Matplotlib & Seaborn for visualization
- Data pipelines with sklearn Pipeline

### Layer 3 of 10 — id: ml-3
Title: Classical Machine Learning
Technologies: Scikit-learn, XGBoost, Cross-Validation, Feature Importance
Description: Before deep learning, master the classical algorithms. Linear regression, decision trees, ensembles — these still power most production ML systems and are faster to train and explain.
Topics:
- Supervised learning — linear/logistic regression, decision trees, SVMs
- Ensemble methods — Random Forest, Gradient Boosting, XGBoost
- Model evaluation — accuracy, precision, recall, F1, ROC-AUC
- Cross-validation — k-fold, stratified k-fold
- Hyperparameter tuning — GridSearchCV, RandomizedSearchCV, Optuna
- Feature selection & importance

### Layer 4 of 10 — id: ml-4
Title: Deep Learning with PyTorch
Technologies: PyTorch, Neural Networks, CNNs, GPU Training
Description: PyTorch is the leading deep learning framework. Understand how neural networks learn, build architectures from scratch, and train models on GPU.
Topics:
- Tensors — creation, operations, autograd
- Neural network anatomy — layers, activations, loss functions
- Training loop — forward pass, loss, backward pass, optimizer step
- CNNs — conv layers, pooling, feature maps
- Transfer learning — torchvision pretrained models, fine-tuning
- GPU training with CUDA — .to(device)

### Layer 5 of 10 — id: ml-5
Title: NLP & Transformers
Technologies: HuggingFace, Transformers, BERT, Fine-tuning
Description: NLP is one of the hottest areas in ML. Learn to work with text data, understand the Transformer architecture, and fine-tune pre-trained models with HuggingFace.
Topics:
- Text preprocessing — tokenization, padding, special tokens
- Word embeddings — Word2Vec, GloVe, contextual embeddings
- Transformer architecture — attention, positional encoding
- HuggingFace Transformers — AutoModel, AutoTokenizer, pipeline
- Fine-tuning BERT/DistilBERT for classification
- Evaluation — BLEU, ROUGE, perplexity

### Layer 6 of 10 — id: ml-6
Title: MLOps & Experiment Tracking
Technologies: MLflow, DVC, Weights & Biases, Optuna
Description: Production ML is 90% engineering. Track experiments, version your data and models, and build reproducible pipelines so your team can collaborate on ML projects.
Topics:
- MLflow — tracking, model registry, projects, artifacts
- Weights & Biases — experiment tracking, hyperparameter sweeps
- DVC — data versioning, pipelines, remote storage
- Feature stores — Feast basics
- Optuna for automated hyperparameter optimization
- ML pipelines with Prefect or Airflow

### Layer 7 of 10 — id: ml-7
Title: Model Deployment
Technologies: FastAPI, Docker, ONNX, TorchServe
Description: A model that isn't deployed doesn't deliver value. Package your model as a production REST API, optimize for inference speed, and deploy to the cloud.
Topics:
- Model serving with FastAPI — async inference endpoint
- Model optimization — ONNX export, quantization, pruning
- TorchServe or Triton Inference Server
- Batch inference vs real-time inference
- Containerizing ML services with Docker
- A/B testing and shadow mode deployment

### Layer 8 of 10 — id: ml-8
Title: LLMs & Generative AI
Technologies: LangChain, RAG, Vector DBs, OpenAI API
Description: LLMs are reshaping what's possible in software. Learn to build AI-powered applications with LangChain, implement RAG for grounded generation, and work with vector databases.
Topics:
- LLM APIs — OpenAI, Anthropic, Groq, HuggingFace Inference
- Prompt engineering — system prompts, few-shot, chain-of-thought
- LangChain — chains, agents, tools, memory
- RAG — embeddings, vector databases (Chroma, Qdrant, Pinecone)
- LlamaIndex for document Q&A
- Evaluation — RAGAS, LLM-as-judge

### Layer 9 of 10 — id: ml-engineer-9
Title: Large-Scale Distributed Training
Technologies: PyTorch, DeepSpeed, CUDA, Hugging Face Accelerate
Description: Train large models efficiently across multiple GPUs and nodes using data parallelism, model parallelism, and ZeRO optimizer stages. Master mixed-precision training and gradient checkpointing to push throughput while staying within memory budgets.
Topics:
- Data parallelism with DistributedDataParallel and FSDP
- Model parallelism and pipeline parallelism strategies
- ZeRO stages 1-3 with DeepSpeed
- Mixed-precision training with bfloat16 and fp16
- Gradient checkpointing and activation recomputation
- Multi-node training with NCCL and RDMA networking
- Profiling GPU utilization with PyTorch Profiler and Nsight

### Layer 10 of 10 — id: ml-engineer-10
Title: Production ML Systems and Responsible AI
Technologies: Feast, MLflow, Great Expectations, Python
Description: Build robust production ML pipelines that include feature stores, automated retraining triggers, model governance workflows, and bias monitoring. Apply responsible AI practices including fairness auditing, explainability, and compliance documentation.
Topics:
- Feature store design and online/offline serving with Feast
- Model governance and approval workflows in MLflow
- Automated retraining pipelines triggered by data drift
- Data quality checks with Great Expectations in pipelines
- Fairness metrics and bias auditing techniques
- Model explainability with SHAP and LIME
- ML compliance documentation and model cards

Start now with Layer 1.
