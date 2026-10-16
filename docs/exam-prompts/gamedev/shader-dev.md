You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Shader / Graphics Dev" (shader-dev, category gamedev). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: shader-dev-1
Title: Graphics and Math Foundations
Technologies: HLSL, GLSL, Linear Algebra
Description: This layer covers the rendering pipeline and the math shaders rely on. A solid foundation in vectors and matrices is essential for graphics work.
Topics:
- Rendering pipeline overview
- Vectors and matrices
- Coordinate spaces
- Vertex and fragment stages
- Color and gamma
- Rasterization basics

### Layer 2 of 10 — id: shader-dev-2
Title: Fragment Shader Fundamentals
Technologies: GLSL, HLSL, Shaders
Description: This layer dives into fragment shaders, uniforms, and procedural color. Fragment shaders are where most visual magic happens.
Topics:
- Uniforms and varyings
- UV coordinates
- Math functions in shaders
- Mixing and stepping
- Procedural shapes
- Time based animation

### Layer 3 of 10 — id: shader-dev-3
Title: Texturing and Sampling
Technologies: HLSL, GLSL, Textures
Description: This layer covers sampling textures, blending, and UV manipulation. Texturing brings detail and material variety to surfaces.
Topics:
- Texture sampling
- UV transforms and tiling
- Texture blending
- Normal maps
- Mipmaps and filtering
- Triplanar mapping

### Layer 4 of 10 — id: shader-dev-4
Title: Lighting Models
Technologies: HLSL, GLSL, PBR
Description: This layer teaches lighting from diffuse and specular to physically based rendering. Lighting determines how believable a surface appears.
Topics:
- Diffuse and specular
- Normals and lighting math
- Phong and Blinn-Phong
- Physically based rendering
- Metalness and roughness
- Ambient and environment light

### Layer 5 of 10 — id: shader-dev-5
Title: Unity URP Shaders
Technologies: Unity URP, HLSL, Shader Graph
Description: This layer covers writing shaders for the Universal Render Pipeline in Unity. URP is a common target for stylized and performant game visuals.
Topics:
- URP shader structure
- Shader Graph and code
- Lit and unlit shaders
- Custom lighting in URP
- Render features
- Keywords and variants

### Layer 6 of 10 — id: shader-dev-6
Title: Vertex Shaders and Deformation
Technologies: HLSL, GLSL, Shaders
Description: This layer explores vertex shaders for animation and mesh deformation. Vertex work enables waves, wind, and dynamic geometry effects.
Topics:
- Vertex position manipulation
- Wave and wind effects
- Vertex colors
- World and object space
- Billboarding
- GPU vertex animation

### Layer 7 of 10 — id: shader-dev-7
Title: Post Processing Effects
Technologies: HLSL, GLSL, Unity URP
Description: This layer covers full screen post processing like bloom and color grading. Post effects unify and elevate the overall look of a scene.
Topics:
- Full screen shaders
- Bloom and glow
- Color grading
- Vignette and chromatic aberration
- Depth and normal buffers
- Edge detection outlines

### Layer 8 of 10 — id: shader-dev-8
Title: Compute and GPU Programming
Technologies: HLSL, Compute Shaders, GPU
Description: This layer introduces compute shaders for general GPU computation. Compute unlocks particles, simulations, and heavy parallel work.
Topics:
- Compute shader basics
- Thread groups
- Structured buffers
- GPU particle systems
- Parallel algorithms
- Reading back results

### Layer 9 of 10 — id: shader-dev-9
Title: Vulkan and Modern APIs
Technologies: Vulkan, GLSL, SPIR-V
Description: This layer covers the explicit Vulkan API and modern graphics pipelines. Low level APIs give maximum control over rendering performance.
Topics:
- Vulkan pipeline objects
- Command buffers
- Descriptor sets
- SPIR-V shader compilation
- Render passes
- Synchronization

### Layer 10 of 10 — id: shader-dev-10
Title: Optimization and Profiling
Technologies: HLSL, RenderDoc, GPU
Description: This layer focuses on profiling and optimizing shaders for shipping. Efficient shaders are what allow rich visuals to run at target frame rates.
Topics:
- GPU profiling with RenderDoc
- Shader instruction cost
- Reducing overdraw
- Branching and precision
- LOD and shader variants
- Platform considerations

Start now with Layer 1.
