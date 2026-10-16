You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "NLP Engineer" (nlp-engineer, category aiml). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: nlp-engineer-1
Title: NLP Foundations
Technologies: Python, Linguistics, NLP
Description: Start with how machines process language. Understand the core tasks and challenges of natural language processing.
Topics:
- What NLP is & its applications
- Tokens, types & vocabularies
- Morphology & syntax basics
- Common NLP tasks
- Corpora & datasets
- The NLP pipeline

### Layer 2 of 10 — id: nlp-engineer-2
Title: Text Preprocessing
Technologies: Tokenization, Normalization, Regex
Description: Clean text is the foundation of NLP. Master tokenization, normalization and the preprocessing pipeline.
Topics:
- Tokenization approaches
- Stemming & lemmatization
- Stopwords & normalization
- Regular expressions
- Subword tokenization (BPE)
- Handling multilingual text

### Layer 3 of 10 — id: nlp-engineer-3
Title: Classical NLP
Technologies: spaCy, NLTK, TF-IDF
Description: Before transformers, classical methods solved real problems — and still do. Learn the techniques and when they shine.
Topics:
- Bag-of-words & TF-IDF
- POS tagging & parsing
- Named entity recognition with spaCy
- Text classification (Naive Bayes, SVM)
- Topic modeling (LDA)
- Rule-based pipelines

### Layer 4 of 10 — id: nlp-engineer-4
Title: Word Embeddings
Technologies: Word2Vec, GloVe, Embeddings
Description: Represent meaning as vectors. Learn how embeddings capture semantic relationships between words.
Topics:
- From one-hot to dense vectors
- Word2Vec & GloVe
- Cosine similarity & analogies
- Contextual vs static embeddings
- Sentence embeddings
- Visualizing embeddings

### Layer 5 of 10 — id: nlp-engineer-5
Title: Deep Learning for NLP
Technologies: PyTorch, RNNs, LSTMs
Description: Add neural networks to your toolkit. Build sequence models with PyTorch for language tasks.
Topics:
- Neural network basics
- PyTorch tensors & autograd
- RNNs, LSTMs & GRUs
- Sequence modeling
- Training loops & loss functions
- Handling variable-length sequences

### Layer 6 of 10 — id: nlp-engineer-6
Title: Transformers & Attention
Technologies: Transformers, Attention, BERT
Description: Understand the architecture that changed NLP. Learn self-attention and the transformer that powers modern models.
Topics:
- The attention mechanism
- Self-attention & multi-head attention
- Transformer architecture
- Encoder vs decoder models
- BERT, GPT & T5 families
- Positional encoding

### Layer 7 of 10 — id: nlp-engineer-7
Title: Hugging Face Transformers
Technologies: HuggingFace, Pipelines, Datasets
Description: Use the de facto NLP library. Load pretrained models and run real tasks with the Transformers ecosystem.
Topics:
- The Transformers library
- Pipelines for common tasks
- Tokenizers & model classes
- The Datasets library
- Inference & batching
- The Model Hub

### Layer 8 of 10 — id: nlp-engineer-8
Title: Fine-Tuning & Transfer Learning
Technologies: Fine-tuning, LoRA, Trainer
Description: Adapt models to your domain. Fine-tune transformers efficiently with transfer learning and PEFT.
Topics:
- Transfer learning concepts
- Fine-tuning with the Trainer API
- Parameter-efficient tuning (LoRA)
- Data preparation & labeling
- Evaluation metrics for NLP
- Avoiding overfitting

### Layer 9 of 10 — id: nlp-engineer-9
Title: NLP Tasks in Production
Technologies: NER, QA, Summarization
Description: Apply NLP to real product problems. Implement the high-value tasks teams actually ship.
Topics:
- Named entity recognition systems
- Question answering
- Summarization (extractive & abstractive)
- Semantic search & retrieval
- Text generation & control
- Multilingual & domain adaptation

### Layer 10 of 10 — id: nlp-engineer-10
Title: Deployment & MLOps for NLP
Technologies: FastAPI, ONNX, Docker
Description: Ship NLP models efficiently. Optimize, serve and monitor them in production.
Topics:
- Model optimization & quantization
- Exporting with ONNX
- Serving with FastAPI / Triton
- Batching & latency tuning
- Monitoring & drift
- Containerized deployment

Start now with Layer 1.
