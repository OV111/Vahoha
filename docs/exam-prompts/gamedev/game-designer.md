You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Game Designer" (game-designer, category gamedev). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: game-designer-1
Title: Design Fundamentals
Technologies: GDD, Figma, Notion
Description: This layer introduces core design vocabulary, player motivation, and the role of a designer. A shared foundation in theory frames every decision that follows.
Topics:
- What game design is
- Player types and motivation
- Core loops and pillars
- Mechanics dynamics aesthetics
- Game feel and juice
- Design vocabulary

### Layer 2 of 10 — id: game-designer-2
Title: The Game Design Document
Technologies: GDD, Notion, Google Docs
Description: This layer teaches structuring a clear and living game design document. A good GDD aligns the team and turns ideas into actionable plans.
Topics:
- GDD structure and sections
- Scope and feature lists
- One page and full design docs
- Reference and mood boards
- Living documentation
- Communicating intent

### Layer 3 of 10 — id: game-designer-3
Title: Systems and Mechanics
Technologies: GDD, Machinations, Spreadsheets
Description: This layer explores designing interlocking systems and the rules that govern them. Strong systems thinking creates depth and emergent play.
Topics:
- Game systems and feedback loops
- Resources and economies
- Progression systems
- Risk and reward
- Emergent versus scripted
- Rule clarity

### Layer 4 of 10 — id: game-designer-4
Title: Level and Encounter Design
Technologies: Unity, Figma, Tiled
Description: This layer covers pacing, layout, and guiding players through space. Level design shapes the moment to moment experience of a game.
Topics:
- Pacing and difficulty curves
- Spatial layout and flow
- Guiding the player
- Teaching through levels
- Encounter composition
- Critical path and secrets

### Layer 5 of 10 — id: game-designer-5
Title: Prototyping in Unity
Technologies: Unity, C#, ProBuilder
Description: This layer gets designers building playable prototypes in Unity. Prototyping turns paper ideas into testable interactive experiences.
Topics:
- Unity editor basics
- Gray box prototyping
- Simple scripting for designers
- Rapid iteration
- Placeholder art
- Playable builds

### Layer 6 of 10 — id: game-designer-6
Title: Narrative and Branching
Technologies: Twine, Ink, GDD
Description: This layer covers story structure and branching narrative using Twine. Narrative design weaves meaning and choice into the player journey.
Topics:
- Story structure
- Branching and choices
- Twine passages and links
- Worldbuilding
- Character and dialogue
- Environmental storytelling

### Layer 7 of 10 — id: game-designer-7
Title: Balancing and Economy
Technologies: Spreadsheets, Machinations, GDD
Description: This layer teaches numerical balancing of stats, costs, and rewards. Balance keeps a game fair, challenging, and satisfying over time.
Topics:
- Balancing curves
- Spreadsheet modeling
- Currency and sinks
- Power and progression curves
- Difficulty tuning
- Tuning through data

### Layer 8 of 10 — id: game-designer-8
Title: UX and Interface Design
Technologies: Figma, Unity, GDD
Description: This layer covers usability, menus, and clear feedback for players. Good UX removes friction so players engage with the design directly.
Topics:
- Player onboarding
- Menu and HUD layout
- Feedback and affordances
- Accessibility options
- Wireframing in Figma
- Information hierarchy

### Layer 9 of 10 — id: game-designer-9
Title: Playtesting and Iteration
Technologies: Notion, Forms, Analytics
Description: This layer focuses on running playtests and iterating from feedback. Disciplined testing exposes problems no amount of theory can predict.
Topics:
- Playtest planning
- Observing players
- Surveys and metrics
- Synthesizing feedback
- Iteration loops
- Avoiding designer bias

### Layer 10 of 10 — id: game-designer-10
Title: Pitching and Shipping
Technologies: Figma, GDD, Slides
Description: This layer covers pitching, vertical slices, and preparing a design for release. Communicating and finalizing the vision is what gets a game made and shipped.
Topics:
- Pitch decks
- Vertical slice
- Marketing and hooks
- Production planning
- Final scope cuts
- Postmortems

Start now with Layer 1.
