You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Game AI Developer" (game-ai, category gamedev). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: game-ai-1
Title: AI Foundations
Technologies: C++, Algorithms, Math
Description: This layer introduces game AI concepts and the math behind agent behavior. A grounding in fundamentals prepares you for advanced techniques.
Topics:
- What game AI is
- Agents and perception
- Vectors and steering basics
- Decision making overview
- Update loops for AI
- Determinism and randomness

### Layer 2 of 10 — id: game-ai-2
Title: Finite State Machines
Technologies: C++, FSM, Algorithms
Description: This layer covers finite state machines for structuring agent behavior. FSMs are the most common and approachable AI architecture.
Topics:
- States and transitions
- FSM implementation patterns
- Hierarchical state machines
- Enter update and exit
- Guard conditions
- Debugging state flow

### Layer 3 of 10 — id: game-ai-3
Title: Pathfinding and Navigation
Technologies: C++, A Star, NavMesh
Description: This layer teaches grid and navmesh pathfinding with the A star algorithm. Pathfinding lets agents move intelligently through the world.
Topics:
- Graphs and grids
- A star algorithm
- Dijkstra and heuristics
- Navigation meshes
- Path smoothing
- Dynamic obstacles

### Layer 4 of 10 — id: game-ai-4
Title: Steering Behaviors
Technologies: C++, Steering, Vectors
Description: This layer covers steering behaviors like seek, flee, and flocking. Steering produces smooth lifelike movement that pathfinding alone lacks.
Topics:
- Seek and flee
- Arrive and pursue
- Wander behavior
- Obstacle avoidance
- Flocking and separation
- Combining steering forces

### Layer 5 of 10 — id: game-ai-5
Title: Behavior Trees
Technologies: C++, Behavior Trees, Algorithms
Description: This layer introduces behavior trees as a scalable decision architecture. Behavior trees handle complex AI more cleanly than large state machines.
Topics:
- Nodes selectors and sequences
- Composite and decorator nodes
- Blackboards
- Tick and node status
- Reactive behavior
- Tree design patterns

### Layer 6 of 10 — id: game-ai-6
Title: Perception and Sensing
Technologies: C++, Raycasting, Algorithms
Description: This layer covers giving agents sight, hearing, and memory of the world. Perception systems make AI react believably to the player.
Topics:
- Vision cones and line of sight
- Hearing and sound events
- Raycasting for sensing
- Memory and last known position
- Stimulus and awareness
- Spatial queries

### Layer 7 of 10 — id: game-ai-7
Title: GOAP and Planning
Technologies: C++, GOAP, Planning
Description: This layer introduces Goal Oriented Action Planning for flexible behavior. Planning lets agents choose actions dynamically to reach goals.
Topics:
- Goals and actions
- Preconditions and effects
- Planning search
- World state representation
- Cost based action selection
- Replanning

### Layer 8 of 10 — id: game-ai-8
Title: Utility AI and Tactics
Technologies: C++, Utility AI, Algorithms
Description: This layer covers utility based decision making and tactical reasoning. Utility AI scores options for nuanced and adaptive behavior.
Topics:
- Utility scoring
- Response curves
- Weighing competing actions
- Influence maps
- Tactical positioning
- Cover selection

### Layer 9 of 10 — id: game-ai-9
Title: Group and Coordinated AI
Technologies: C++, Influence Maps, Algorithms
Description: This layer teaches coordinating multiple agents for squad and crowd behavior. Coordinated AI creates emergent and memorable encounters.
Topics:
- Squad coordination
- Role assignment
- Flanking and formations
- Shared blackboards
- Crowd simulation
- Communication between agents

### Layer 10 of 10 — id: game-ai-10
Title: Profiling and Shipping AI
Technologies: C++, Profiling, Optimization
Description: This layer focuses on profiling, optimizing, and debugging AI at scale. Performant and tunable AI is what ships in a real game.
Topics:
- Profiling AI cost
- Time slicing and budgets
- Level of detail for AI
- Debug visualization
- Tuning and designer tools
- Shipping considerations

Start now with Layer 1.
