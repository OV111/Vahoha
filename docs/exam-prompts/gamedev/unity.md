You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Unity Dev" (unity, category gamedev). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: unity-1
Title: C# and Editor Fundamentals
Technologies: C#, Unity, Visual Studio
Description: This layer introduces the Unity editor interface and the C# language basics needed to script behavior. Mastering these foundations is essential before touching any game systems.
Topics:
- Unity editor layout and panels
- GameObjects and components
- C# variables and data types
- MonoBehaviour lifecycle methods
- Scenes and the hierarchy
- Prefabs and the inspector

### Layer 2 of 10 — id: unity-2
Title: Input and Movement
Technologies: C#, Unity, Input System
Description: This layer covers capturing player input and translating it into smooth character movement. Solid input handling is the backbone of any responsive game.
Topics:
- Legacy input versus new Input System
- Transform manipulation
- Frame rate independent movement
- Time.deltaTime usage
- Action maps and bindings
- Camera follow behavior

### Layer 3 of 10 — id: unity-3
Title: Physics and Collisions
Technologies: C#, Unity, Physics
Description: This layer explores the built-in physics engine for rigidbodies, colliders, and triggers. Understanding physics lets you create believable interactions and detection.
Topics:
- Rigidbody and forces
- Colliders and triggers
- Layer collision matrix
- Raycasting and overlap queries
- Physics materials and friction
- FixedUpdate and physics timing

### Layer 4 of 10 — id: unity-4
Title: UI and Game State
Technologies: C#, Unity, UI Toolkit
Description: This layer teaches building menus, HUDs, and managing game state across scenes. Clear UI and state flow turn mechanics into an actual playable game.
Topics:
- Canvas and anchoring
- Buttons sliders and text
- Score and health displays
- Scene loading and transitions
- Singletons and game managers
- Pause and restart logic

### Layer 5 of 10 — id: unity-5
Title: Animation and State Machines
Technologies: C#, Unity, Animator
Description: This layer covers the Animator controller, blend trees, and event-driven animation. Animation brings characters and feedback to life and signals state to the player.
Topics:
- Animation clips and keyframes
- Animator controllers and parameters
- Blend trees for movement
- Animation events and callbacks
- Root motion basics
- Transitions and conditions

### Layer 6 of 10 — id: unity-6
Title: Audio and Visual Effects
Technologies: C#, Unity, Particle System
Description: This layer adds sound, music, and particle effects to deepen immersion. Polished feedback through audio and effects makes mechanics feel satisfying.
Topics:
- AudioSource and AudioListener
- Mixers and volume groups
- Spatial 3D audio
- Particle System modules
- Trail and line renderers
- Effect pooling for performance

### Layer 7 of 10 — id: unity-7
Title: Shader Graph and Materials
Technologies: Shader Graph, Unity, URP
Description: This layer introduces node-based shaders and the rendering pipeline for custom visuals. Shaders let you craft a unique look without writing low-level code first.
Topics:
- Universal Render Pipeline setup
- Materials and properties
- Shader Graph nodes
- Dissolve and fresnel effects
- Vertex displacement
- Texture sampling and UVs

### Layer 8 of 10 — id: unity-8
Title: Data, Saving, and Scriptable Objects
Technologies: C#, Unity, ScriptableObject
Description: This layer covers persisting player progress and architecting data with Scriptable Objects. Clean data design keeps larger projects maintainable and decoupled.
Topics:
- ScriptableObject assets
- JSON serialization
- PlayerPrefs and save files
- Event channels with assets
- Inventory and item data
- Loading and validating saves

### Layer 9 of 10 — id: unity-9
Title: AI and Navigation
Technologies: C#, Unity, NavMesh
Description: This layer builds enemy behavior using the NavMesh pathfinding and simple state machines. Believable AI raises challenge and makes the world feel reactive.
Topics:
- NavMesh baking
- NavMeshAgent movement
- Patrol and chase states
- Line of sight detection
- Finite state machines
- Spawning and waves

### Layer 10 of 10 — id: unity-10
Title: Optimization and Publishing
Technologies: C#, Unity, Profiler
Description: This layer focuses on profiling, optimizing, and building for target platforms. Shipping a stable performant build is the final step that turns a project into a product.
Topics:
- Unity Profiler and frame debugger
- Draw call batching
- Object pooling and memory
- Build settings per platform
- Quality and graphics tiers
- Store submission basics

Start now with Layer 1.
