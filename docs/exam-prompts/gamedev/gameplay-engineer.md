You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Gameplay Engineer" (gameplay-engineer, category gamedev). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: gameplay-engineer-1
Title: Programming Foundations
Technologies: C++, C#, Algorithms
Description: This layer solidifies core programming and the languages of game engines. Strong fundamentals are the bedrock of gameplay engineering.
Topics:
- C++ and C# basics
- Memory and references
- Object oriented design
- Data structures
- Debugging techniques
- Version control with Git

### Layer 2 of 10 — id: gameplay-engineer-2
Title: Game Loops and Architecture
Technologies: C++, Unity, Patterns
Description: This layer covers the core game loop and common architectural patterns. Clean architecture keeps gameplay code scalable and testable.
Topics:
- Update and render loops
- Fixed and variable timestep
- Component patterns
- Game state management
- Event systems
- Decoupling with messaging

### Layer 3 of 10 — id: gameplay-engineer-3
Title: Character Controllers
Technologies: C#, Unity, Physics
Description: This layer focuses on building responsive character movement and controllers. The character controller is the player primary connection to the game.
Topics:
- Kinematic and physics controllers
- Ground detection
- Jumping and coyote time
- Slopes and steps
- Acceleration and friction
- Input buffering

### Layer 4 of 10 — id: gameplay-engineer-4
Title: Combat and Abilities
Technologies: C#, Unity, C++
Description: This layer covers building combat systems, abilities, and damage. Combat systems are a core expression of gameplay engineering.
Topics:
- Hitboxes and hurtboxes
- Damage and health systems
- Ability cooldowns
- Combos and timing
- Status effects
- Data driven abilities

### Layer 5 of 10 — id: gameplay-engineer-5
Title: Animation Programming
Technologies: C#, Unity, C++
Description: This layer covers driving animation from gameplay code and state machines. Animation programming ties player intent to visible motion.
Topics:
- Animation state machines
- Blend trees
- Animation events
- Procedural animation
- Inverse kinematics
- Root motion

### Layer 6 of 10 — id: gameplay-engineer-6
Title: Gameplay Systems and Data
Technologies: C#, Unity, ScriptableObject
Description: This layer covers data driven systems for inventory, quests, and progression. Data driven design lets designers build content without code changes.
Topics:
- Inventory systems
- Quest and dialogue systems
- Progression and leveling
- Data driven configuration
- Save and load
- Designer friendly tools

### Layer 7 of 10 — id: gameplay-engineer-7
Title: Multiplayer Gameplay
Technologies: C++, Unreal, Netcode
Description: This layer covers replicating gameplay and handling networked play. Networked gameplay is a demanding and valuable engineering skill.
Topics:
- Client server model
- Replication of state
- Remote procedure calls
- Prediction and reconciliation
- Lag compensation
- Authority and ownership

### Layer 8 of 10 — id: gameplay-engineer-8
Title: Tools and Workflow
Technologies: C#, Unity Editor, C++
Description: This layer covers building editor tools and debugging aids for the team. Good tooling multiplies the productivity of an entire studio.
Topics:
- Custom editor windows
- Inspectors and gizmos
- Debug visualization
- Cheat and test commands
- Automated workflows
- Designer facing tools

### Layer 9 of 10 — id: gameplay-engineer-9
Title: Performance and Memory
Technologies: C++, Profiler, C#
Description: This layer covers profiling, optimizing, and managing memory in gameplay code. Performance work ensures gameplay runs smoothly at scale.
Topics:
- Profiling tools
- CPU and memory hotspots
- Object pooling
- Cache friendly data
- Garbage collection control
- Multithreading basics

### Layer 10 of 10 — id: gameplay-engineer-10
Title: Polish and Shipping
Technologies: C++, Unity, Unreal
Description: This layer focuses on game feel polish, bug fixing, and shipping. The final pass is what separates a prototype from a finished game.
Topics:
- Game feel and juice
- Screen shake and feedback
- Bug triage and fixing
- Build pipelines
- Platform certification
- Postlaunch support

Start now with Layer 1.
