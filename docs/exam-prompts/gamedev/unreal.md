You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Unreal Dev" (unreal, category gamedev). It has 11 layers, listed at the bottom.

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
### Layer 1 of 11 — id: unreal-1
Title: Editor and Blueprint Basics
Technologies: Unreal Engine, Blueprints, Editor
Description: This layer introduces the Unreal editor and visual scripting with Blueprints. These fundamentals let you prototype gameplay before writing any C++.
Topics:
- Editor viewport and panels
- Actors and components
- Blueprint event graphs
- Variables and functions
- Levels and the world outliner
- Play in editor workflow

### Layer 2 of 11 — id: unreal-2
Title: Player Input and Characters
Technologies: Unreal Engine, Blueprints, Enhanced Input
Description: This layer covers the Character class, possession, and the Enhanced Input system. Responsive character control is the core of any Unreal game.
Topics:
- Pawns and Characters
- Player controller and possession
- Enhanced Input actions
- Character movement component
- Camera and spring arm
- Input mapping contexts

### Layer 3 of 11 — id: unreal-3
Title: C++ Gameplay Fundamentals
Technologies: C++, Unreal Engine, Visual Studio
Description: This layer transitions from Blueprints into Unreal C++ and the reflection system. C++ unlocks performance and control needed for serious gameplay code.
Topics:
- UCLASS UPROPERTY and UFUNCTION
- Actor lifecycle in C++
- Exposing variables to Blueprints
- Garbage collection and pointers
- Modules and build files
- Mixing C++ and Blueprints

### Layer 4 of 11 — id: unreal-11
Title: Unreal C++ Gameplay Framework, Subsystems, and Delegates
Technologies: Unreal Engine, C++, Blueprints
Description: Go beyond basic Unreal C++ and learn how a project is actually structured. You will use GameMode, GameState and PlayerController correctly, write subsystems for shared services, communicate with delegates, and load assets asynchronously.
Topics:
- GameMode, GameState, PlayerController and PlayerState
- Components and composition over inheritance
- Subsystems for game-wide services
- Delegates and event dispatchers
- Data assets and data-driven gameplay
- Asynchronous asset loading and soft references

### Layer 5 of 11 — id: unreal-4
Title: Collisions and Physics
Technologies: C++, Unreal Engine, Chaos
Description: This layer explores collision channels, traces, and the Chaos physics system. Reliable collision and physics drive combat, interaction, and destruction.
Topics:
- Collision presets and channels
- Line and sphere traces
- Overlap and hit events
- Physics simulation on actors
- Chaos destruction basics
- Damage and apply force

### Layer 6 of 11 — id: unreal-5
Title: UI with UMG
Technologies: Unreal Engine, UMG, Blueprints
Description: This layer teaches building menus and HUDs with the Unreal Motion Graphics system. Strong UI communicates state and ties mechanics into a full game loop.
Topics:
- Widget Blueprints
- Anchors and layout panels
- Health and ammo bars
- Binding data to widgets
- Menus and button events
- HUD class and viewport

### Layer 7 of 11 — id: unreal-6
Title: Animation and Skeletal Meshes
Technologies: Unreal Engine, Animation Blueprint, Control Rig
Description: This layer covers animation blueprints, blend spaces, and state machines for characters. Quality animation sells movement and gives combat its impact.
Topics:
- Skeletal meshes and skeletons
- Animation blueprints
- Blend spaces
- State machines for locomotion
- Montages and notifies
- Retargeting animations

### Layer 8 of 11 — id: unreal-7
Title: Materials and Nanite
Technologies: Unreal Engine, Nanite, Lumen
Description: This layer dives into the material editor plus Nanite geometry and Lumen lighting. Modern rendering features deliver high fidelity scenes efficiently.
Topics:
- Material editor nodes
- Material instances and parameters
- Nanite virtualized geometry
- Lumen global illumination
- Texture maps and PBR
- Post process volumes

### Layer 9 of 11 — id: unreal-8
Title: Gameplay Ability System
Technologies: C++, Unreal Engine, GAS
Description: This layer introduces the Gameplay Ability System for abilities, attributes, and effects. GAS provides a scalable framework for complex combat and RPG mechanics.
Topics:
- Ability system component
- Gameplay abilities
- Attribute sets
- Gameplay effects and tags
- Cooldowns and costs
- Replication awareness

### Layer 10 of 11 — id: unreal-9
Title: Multiplayer and Replication
Technologies: C++, Unreal Engine, Replication
Description: This layer covers the Unreal networking model, replication, and RPCs. Networked play is a defining strength of Unreal for multiplayer titles.
Topics:
- Client server model
- Replicated properties
- Remote procedure calls
- Authority and roles
- Replication of movement
- Listen and dedicated servers

### Layer 11 of 11 — id: unreal-10
Title: Packaging and Optimization
Technologies: Unreal Engine, Insights, Packaging
Description: This layer focuses on profiling with Unreal Insights and packaging shippable builds. Optimizing and packaging is the last mile that delivers a playable product.
Topics:
- Unreal Insights profiling
- Stat commands and GPU profiling
- Level of detail and culling
- Cooking and packaging
- Platform target settings
- Build configurations

Start now with Layer 1.
