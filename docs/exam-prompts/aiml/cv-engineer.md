You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Computer Vision Engineer" (cv-engineer, category aiml). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: cv-engineer-1
Title: Image Processing Foundations
Technologies: Images, Pixels, NumPy
Description: Computer vision starts with understanding images as data. Learn how pixels, channels and color spaces work.
Topics:
- Images as arrays of pixels
- Color spaces — RGB, HSV, grayscale
- Image I/O with NumPy
- Histograms & thresholding
- Resolution & sampling
- Basic transformations

### Layer 2 of 10 — id: cv-engineer-2
Title: OpenCV Essentials
Technologies: OpenCV, Filters, Contours
Description: OpenCV is the workhorse of classical CV. Master the operations you'll use in every pipeline.
Topics:
- Filtering & convolution
- Edge detection (Canny)
- Morphological operations
- Contours & shape analysis
- Geometric transforms
- Working with video streams

### Layer 3 of 10 — id: cv-engineer-3
Title: Feature Detection & Classical CV
Technologies: Features, SIFT, Matching
Description: Learn how classical CV finds and matches structure in images — the basis of tracking and stitching.
Topics:
- Corner & keypoint detection
- SIFT / ORB descriptors
- Feature matching
- Image alignment & stitching
- Optical flow
- Camera calibration basics

### Layer 4 of 10 — id: cv-engineer-4
Title: Deep Learning with PyTorch
Technologies: PyTorch, Tensors, Training
Description: Modern CV is deep learning. Build the PyTorch foundation you'll use to train vision models.
Topics:
- Tensors & autograd
- Building models with nn.Module
- Datasets & DataLoaders
- Training & validation loops
- Loss functions & optimizers
- Using the GPU

### Layer 5 of 10 — id: cv-engineer-5
Title: Convolutional Neural Networks
Technologies: CNNs, Pooling, Architectures
Description: CNNs are the backbone of image models. Understand convolutions and the architectures that won ImageNet.
Topics:
- Convolution & pooling layers
- Feature maps & receptive fields
- Classic architectures (ResNet, VGG)
- Batch norm & regularization
- Transfer learning with pretrained CNNs
- Visualizing what CNNs learn

### Layer 6 of 10 — id: cv-engineer-6
Title: Image Classification
Technologies: Classification, Augmentation, Metrics
Description: Master the canonical CV task. Build robust image classifiers with augmentation and solid evaluation.
Topics:
- Building a classification pipeline
- Data augmentation
- Handling class imbalance
- Metrics & confusion matrices
- Vision transformers (ViT) intro
- Error analysis

### Layer 7 of 10 — id: cv-engineer-7
Title: Object Detection
Technologies: YOLO, Bounding Boxes, Detection
Description: Find and localize objects. Learn detection concepts and build real detectors with YOLO.
Topics:
- Detection vs classification
- Bounding boxes & IoU
- Anchors & non-max suppression
- The YOLO family
- Training YOLO on custom data
- Evaluation with mAP

### Layer 8 of 10 — id: cv-engineer-8
Title: Segmentation & Advanced CV
Technologies: Segmentation, U-Net, SAM
Description: Go beyond boxes to pixel-level understanding. Learn semantic and instance segmentation.
Topics:
- Semantic vs instance segmentation
- U-Net & encoder-decoder models
- Mask R-CNN
- Segment Anything (SAM)
- Pose estimation overview
- 3D & depth basics

### Layer 9 of 10 — id: cv-engineer-9
Title: Datasets, Augmentation & Training
Technologies: Datasets, Labeling, MLOps
Description: Great models need great data and disciplined training. Build datasets and reproducible training runs.
Topics:
- Collecting & labeling images
- Annotation tools & formats
- Advanced augmentation
- Experiment tracking
- Handling large datasets
- Reproducible training

### Layer 10 of 10 — id: cv-engineer-10
Title: Deployment & Edge Inference
Technologies: ONNX, TensorRT, Edge
Description: Run vision models where they're needed. Optimize and deploy to servers and edge devices.
Topics:
- Model export (ONNX)
- Optimization & quantization
- TensorRT & acceleration
- Real-time video inference
- Edge deployment (Jetson, mobile)
- Serving & monitoring

Start now with Layer 1.
