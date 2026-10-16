You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Godot Developer" (godot, category gamedev). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: godot-1
Title: Godot and GDScript Basics
Technologies: Godot, GDScript, Editor
Description: This layer introduces the Godot editor and the GDScript language. These fundamentals let you build and script nodes for any game.
Topics:
- Editor interface and docks
- Nodes and scenes
- GDScript syntax
- The scene tree
- Signals basics
- Running and debugging

### Layer 2 of 10 — id: godot-2
Title: Nodes, Scenes, and Signals
Technologies: Godot, GDScript, Signals
Description: This layer explores composing reusable scenes and connecting them with signals. The node and signal model is the heart of Godot architecture.
Topics:
- Scene composition
- Instancing scenes
- Custom signals
- Node references and groups
- Autoload singletons
- Scene inheritance

### Layer 3 of 10 — id: godot-3
Title: 2D Physics and Movement
Technologies: Godot, GDScript, Physics2D
Description: This layer covers the 2D physics bodies and building a character controller. Reliable movement and collision drive a satisfying platformer.
Topics:
- CharacterBody2D
- RigidBody and StaticBody
- Collision shapes and layers
- move_and_slide
- Area2D detection
- Gravity and jumping

### Layer 4 of 10 — id: godot-4
Title: UI and Game Flow
Technologies: Godot, GDScript, Control
Description: This layer teaches building menus and HUDs using Control nodes. UI and scene switching turn mechanics into a full game loop.
Topics:
- Control nodes and containers
- Anchors and layout
- Labels buttons and bars
- Scene switching
- Score and health UI
- Pause and game over

### Layer 5 of 10 — id: godot-5
Title: Animation and Tweens
Technologies: Godot, GDScript, AnimationPlayer
Description: This layer covers AnimationPlayer, AnimatedSprite, and tweening for motion. Animation adds polish and clear feedback to gameplay.
Topics:
- AnimationPlayer tracks
- AnimatedSprite2D
- AnimationTree state machines
- Tweens for movement
- Animation callbacks
- Sprite frames

### Layer 6 of 10 — id: godot-6
Title: Audio and Particles
Technologies: Godot, GDScript, GPUParticles
Description: This layer adds sound, music, and particle effects for immersion. Audio and effects make interactions feel responsive and alive.
Topics:
- AudioStreamPlayer nodes
- Audio buses and effects
- Positional 2D audio
- GPUParticles2D
- Effect timing
- Volume and music management

### Layer 7 of 10 — id: godot-7
Title: Shaders in Godot
Technologies: Shaders, Godot, GDScript
Description: This layer introduces the Godot shading language for custom 2D effects. Shaders let you craft a distinctive visual identity.
Topics:
- Godot shading language
- Canvas item shaders
- Uniforms and parameters
- Screen and texture effects
- Dissolve and outline shaders
- Shader performance

### Layer 8 of 10 — id: godot-8
Title: C# in Godot and Architecture
Technologies: C#, Godot, Mono
Description: This layer adds C# scripting and clean project architecture in Godot. C# brings strong typing and tooling for larger codebases.
Topics:
- C# setup and bindings
- Calling engine APIs from C#
- State machines
- Resource files for data
- Saving and loading
- Project structure

### Layer 9 of 10 — id: godot-9
Title: Enemy AI and Levels
Technologies: Godot, GDScript, Navigation2D
Description: This layer builds enemy AI with navigation and assembles full levels. Reactive enemies and varied levels make a complete experience.
Topics:
- State based enemy AI
- Navigation2D pathfinding
- Player detection
- TileMap level building
- Spawning systems
- Level transitions

### Layer 10 of 10 — id: godot-10
Title: Exporting and Optimization
Technologies: Godot, GDScript, Export Templates
Description: This layer covers profiling, optimizing, and exporting to platforms. Producing a shippable build is the final step to release.
Topics:
- Godot profiler
- Reducing draw calls
- Object pooling
- Export templates and presets
- Platform export settings
- itch.io publishing

Start now with Layer 1.
