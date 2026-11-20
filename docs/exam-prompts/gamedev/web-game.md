You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Web Game Dev" (web-game, category gamedev). It has 10 layers, listed at the bottom.

## HOW TO ANSWER
Write the bank for ONE layer per reply, in the order listed. Each reply must contain exactly 60 questions for that layer. After each reply, stop and wait; I will type "next".

## OUTPUT FORMAT — follow exactly
First line of EVERY reply, including every reply after "next": the layer marker, exactly like this, with the layer id from the list. A reply without it is thrown away by the importer.
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
5. LENGTH BIAS IS THE MOST COMMON FAILURE, and earlier banks failed it badly (the correct answer was the longest choice in up to 95% of questions, so learners passed by picking the longest). Follow this plan exactly. Number the questions 1 to 60; the position of question N in a cycle of 4 fixes how long its CORRECT choice is compared with its three wrong choices:
   - N = 1, 5, 9, ...: the correct choice is the SHORTEST of the four.
   - N = 2, 6, 10, ...: the correct choice is the second shortest.
   - N = 3, 7, 11, ...: the correct choice is the second longest.
   - N = 4, 8, 12, ...: the correct choice is the LONGEST of the four.
   Write the wrong choices with the same level of detail, specific terms and qualifiers as the right one; never make the right one the only careful, hedged or complete-sounding choice. Wrong choices must sound like a real technical claim, never absurd ("compiles HTML into machine code").
6. Spread "answerIdx" evenly across 0, 1, 2 and 3 (about 15 each). Do not put the answer at index 0 or 1 most of the time.
7. Difficulty mix per layer: about one third easy, half medium, the rest hard.
8. Cover every topic of the layer, roughly evenly. Never repeat or rephrase a question within the layer.
9. Each question must stand alone: no "see the diagram", no references to earlier questions. Short code snippets inside the stem are fine (use plain text, \n for line breaks, no markdown fences inside the JSON strings).
10. Stay accurate for current stable versions of the technologies. Avoid questions whose answer changed recently or is opinion.
11. Escape quotes properly so the JSON parses. No trailing commas, no comments.

## CHECK BEFORE YOU SEND EACH REPLY
Silently verify all of these, and fix the reply until every one holds. Do not print the check.
- The first line is LAYER: <the right layer id>.
- The array has exactly 60 questions.
- Count the questions whose correct choice is the longest of its four: at most 15. If more, lengthen wrong choices or shorten the right one until it holds.
- Each answerIdx value (0, 1, 2, 3) appears about 15 times.

## LAYERS
### Layer 1 of 10 — id: web-game-1
Title: JavaScript and Canvas Basics
Technologies: JavaScript, HTML5 Canvas, DOM
Description: This layer establishes JavaScript fundamentals and drawing to the HTML5 canvas. These basics underpin every browser-based game you will build.
Topics:
- JavaScript syntax and functions
- Canvas 2D context
- The game loop and requestAnimationFrame
- Drawing shapes and images
- Keyboard and mouse events
- Coordinate systems

### Layer 2 of 10 — id: web-game-2
Title: Phaser Game Framework
Technologies: Phaser.js, JavaScript, Webpack
Description: This layer introduces Phaser for scenes, sprites, and arcade physics. A framework speeds up development and handles common 2D game plumbing.
Topics:
- Phaser scene structure
- Loading and displaying sprites
- Arcade physics bodies
- Sprite groups
- Tilemaps
- Scene transitions

### Layer 3 of 10 — id: web-game-3
Title: Sprites, Animation, and Audio
Technologies: Phaser.js, JavaScript, Web Audio
Description: This layer covers sprite sheets, animations, and sound for richer 2D games. Animation and audio give a web game its feel and feedback.
Topics:
- Sprite sheets and atlases
- Animation frames and keys
- Sound effects and music
- Web Audio basics
- Particle emitters
- Tweening movement

### Layer 4 of 10 — id: web-game-4
Title: Game State and UI
Technologies: Phaser.js, JavaScript, HTML
Description: This layer manages score, lives, and menus across multiple scenes. Clear UI and state flow turn a prototype into a complete game loop.
Topics:
- Scene management and data passing
- Score and lives tracking
- Text and bitmap fonts
- Menu and pause scenes
- Local storage for high scores
- Restart and game over flow

### Layer 5 of 10 — id: web-game-5
Title: WebGL and 3D with Three.js
Technologies: Three.js, WebGL, JavaScript
Description: This layer introduces 3D rendering in the browser using Three.js over WebGL. Moving to 3D opens a new dimension of web game possibilities.
Topics:
- Scene camera and renderer
- Meshes and geometries
- Materials and lights
- Loading 3D models
- Animation loop in 3D
- Orbit and follow cameras

### Layer 6 of 10 — id: web-game-6
Title: 3D Physics and Interaction
Technologies: Three.js, Cannon-es, JavaScript
Description: This layer adds a physics engine and raycasting for 3D interaction. Physics and picking make 3D web games tangible and playable.
Topics:
- Physics world and bodies
- Syncing physics to meshes
- Collision detection
- Raycasting for selection
- Forces and impulses
- Character controllers

### Layer 7 of 10 — id: web-game-7
Title: Shaders and Visual Effects
Technologies: GLSL, Three.js, WebGL
Description: This layer introduces GLSL shaders and post processing for custom visuals. Shaders give web games a distinct and polished look.
Topics:
- Vertex and fragment shaders
- Uniforms and attributes
- Shader materials in Three.js
- Post processing passes
- Procedural patterns
- Performance of shaders

### Layer 8 of 10 — id: web-game-8
Title: Networking and Multiplayer
Technologies: WebSockets, Node.js, JavaScript
Description: This layer connects browsers to a server for real-time multiplayer. Networking enables shared sessions and competitive web games.
Topics:
- WebSocket connections
- Server authoritative state
- Client side prediction
- Broadcasting updates
- Room and lobby systems
- Latency and interpolation

### Layer 9 of 10 — id: web-game-9
Title: Asset Pipeline and Tooling
Technologies: Vite, JavaScript, Webpack
Description: This layer covers bundling, asset loading, and build tooling for web games. A solid pipeline keeps load times low and the project maintainable.
Topics:
- Bundlers and modules
- Texture and model compression
- Asset preloading strategies
- Code splitting
- Sprite atlas generation
- Source control of assets

### Layer 10 of 10 — id: web-game-10
Title: Optimization and Deployment
Technologies: JavaScript, WebGL, Netlify
Description: This layer focuses on performance profiling and deploying a web game to the public. Shipping a fast loading playable build completes the journey.
Topics:
- Browser performance profiling
- Frame budget and draw calls
- Memory and garbage collection
- Progressive loading
- Hosting and CDNs
- itch.io and web deployment

Start now with Layer 1.
