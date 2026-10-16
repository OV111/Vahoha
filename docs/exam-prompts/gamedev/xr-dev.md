You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "XR / AR / VR Dev" (xr-dev, category gamedev). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: xr-dev-1
Title: XR Foundations
Technologies: Unity XR, C#, OpenXR
Description: This layer introduces XR concepts, hardware, and the Unity XR toolkit. Understanding the landscape prepares you to build for AR and VR.
Topics:
- AR VR and MR concepts
- XR hardware and headsets
- Unity XR plugin setup
- OpenXR overview
- Tracking spaces
- Comfort and safety

### Layer 2 of 10 — id: xr-dev-2
Title: VR Interaction Basics
Technologies: Unity XR, C#, XR Interaction Toolkit
Description: This layer covers controllers, grabbing, and interaction in VR. Natural interaction is what makes virtual reality feel real.
Topics:
- XR Interaction Toolkit
- Controller input
- Grab and throw interactables
- Rays and pointers
- Hand presence
- Teleport locomotion

### Layer 3 of 10 — id: xr-dev-3
Title: Locomotion and Comfort
Technologies: Unity XR, C#, XR Interaction Toolkit
Description: This layer covers movement schemes and reducing motion sickness in VR. Comfortable locomotion keeps players immersed and well.
Topics:
- Continuous and teleport movement
- Snap and smooth turning
- Vignette comfort
- Climbing and grab movement
- Play area and boundaries
- Reducing nausea

### Layer 4 of 10 — id: xr-dev-4
Title: AR with ARKit and ARFoundation
Technologies: ARKit, ARFoundation, Unity
Description: This layer introduces mobile AR using ARFoundation, ARKit, and ARCore. AR places virtual content into the real world through the camera.
Topics:
- ARFoundation setup
- Plane and surface detection
- Placing virtual objects
- Light estimation
- Anchors
- ARKit and ARCore differences

### Layer 5 of 10 — id: xr-dev-5
Title: Hand and Body Tracking
Technologies: Unity XR, Hand Tracking, OpenXR
Description: This layer covers hand tracking, gestures, and body input. Hands free interaction deepens presence and accessibility.
Topics:
- Hand tracking setup
- Joint and pose data
- Gesture recognition
- Pinch and poke interactions
- Body and head tracking
- Hand interaction profiles

### Layer 6 of 10 — id: xr-dev-6
Title: Spatial UI and Audio
Technologies: Unity XR, C#, Spatial Audio
Description: This layer covers designing UI and audio that live in 3D space. Spatial UI and sound are key to comfortable and immersive XR.
Topics:
- World space canvases
- Diegetic UI
- Gaze and pointer UI
- Spatial 3D audio
- Readable text in XR
- Feedback and haptics

### Layer 7 of 10 — id: xr-dev-7
Title: WebXR and Cross Platform
Technologies: WebXR, Three.js, JavaScript
Description: This layer introduces browser based XR with the WebXR API. WebXR reaches users without app installs across many devices.
Topics:
- WebXR Device API
- VR and AR sessions
- Three.js XR integration
- Controller input on web
- Performance on web
- Cross device support

### Layer 8 of 10 — id: xr-dev-8
Title: Multiplayer and Social XR
Technologies: Unity XR, Netcode, Photon
Description: This layer covers shared XR spaces with avatars and voice. Social presence transforms XR into a connected experience.
Topics:
- Networked avatars
- Synchronizing head and hands
- Voice chat
- Shared object interaction
- Spatial anchors sharing
- Presence and avatars

### Layer 9 of 10 — id: xr-dev-9
Title: Performance and Optimization
Technologies: Unity XR, Profiler, URP
Description: This layer focuses on hitting strict XR frame rate and rendering budgets. Performance is critical for comfort and avoiding sickness in XR.
Topics:
- Frame rate targets
- Single pass stereo rendering
- Draw call reduction
- Foveated rendering
- Mobile XR constraints
- Profiling on device

### Layer 10 of 10 — id: xr-dev-10
Title: Publishing XR Apps
Technologies: Unity XR, Meta Quest, App Stores
Description: This layer covers building, testing, and publishing to XR stores. Shipping through store review is the final step for an XR title.
Topics:
- Build settings per device
- Meta Quest store requirements
- App Lab and sideloading
- App store submission
- Privacy and permissions
- Testing on hardware

Start now with Layer 1.
