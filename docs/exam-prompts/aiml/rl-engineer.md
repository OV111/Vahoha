You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Reinforcement Learning Engineer" (rl-engineer, category aiml). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: rl-engineer-1
Title: RL Foundations
Technologies: RL, Agents, Rewards
Description: Reinforcement learning teaches agents through trial and error. Learn the framework and where RL fits.
Topics:
- Agents, environments & rewards
- The RL problem vs supervised learning
- Exploration vs exploitation
- Episodes, returns & discounting
- On-policy vs off-policy
- RL applications & limits

### Layer 2 of 10 — id: rl-engineer-2
Title: Markov Decision Processes
Technologies: MDP, Value Functions, Policies
Description: MDPs are the mathematical core of RL. Master states, actions, policies and value functions.
Topics:
- States, actions & transitions
- Policies & value functions
- The Bellman equations
- Optimal policies
- Discount factor & horizons
- Markov property

### Layer 3 of 10 — id: rl-engineer-3
Title: Dynamic Programming & Monte Carlo
Technologies: DP, Monte Carlo, Estimation
Description: Learn the classical solution methods. Use dynamic programming and Monte Carlo to estimate values.
Topics:
- Policy evaluation & improvement
- Policy & value iteration
- Monte Carlo prediction
- Monte Carlo control
- Exploring starts & epsilon-greedy
- Bias vs variance

### Layer 4 of 10 — id: rl-engineer-4
Title: Temporal-Difference & Q-Learning
Technologies: TD, Q-Learning, SARSA
Description: TD learning combines the best of DP and Monte Carlo. Build tabular Q-learning agents.
Topics:
- TD(0) prediction
- SARSA (on-policy)
- Q-learning (off-policy)
- Epsilon-greedy exploration
- The exploration-exploitation trade-off
- Tabular limitations

### Layer 5 of 10 — id: rl-engineer-5
Title: Deep Q-Networks
Technologies: DQN, PyTorch, Replay
Description: Scale RL with neural networks. Build DQN agents that learn from high-dimensional states.
Topics:
- Function approximation
- The DQN algorithm
- Experience replay
- Target networks
- Double & dueling DQN
- Stability tricks

### Layer 6 of 10 — id: rl-engineer-6
Title: Policy Gradient Methods
Technologies: Policy Gradient, REINFORCE, Baselines
Description: Optimize policies directly. Learn policy gradient methods for continuous and stochastic control.
Topics:
- Policy parameterization
- The policy gradient theorem
- REINFORCE
- Baselines & variance reduction
- Continuous action spaces
- Entropy & exploration

### Layer 7 of 10 — id: rl-engineer-7
Title: Actor-Critic & PPO
Technologies: Actor-Critic, PPO, A2C
Description: Combine value and policy learning. Master the actor-critic family and PPO, the modern workhorse.
Topics:
- Actor-critic architecture
- Advantage estimation (GAE)
- A2C & A3C
- Proximal Policy Optimization (PPO)
- Clipping & trust regions
- Hyperparameter tuning

### Layer 8 of 10 — id: rl-engineer-8
Title: Environments with Gymnasium
Technologies: Gymnasium, Environments, Wrappers
Description: Standardize your RL workflow. Use Gymnasium environments and build custom ones for your problems.
Topics:
- The Gymnasium API
- Observation & action spaces
- Environment wrappers
- Vectorized environments
- Building a custom environment
- Reward shaping

### Layer 9 of 10 — id: rl-engineer-9
Title: Scaling RL with Ray RLlib
Technologies: Ray, RLlib, Distributed
Description: Train serious RL at scale. Use Ray RLlib to run distributed training across many workers.
Topics:
- Ray & distributed computing
- RLlib algorithms & config
- Distributed rollouts
- Hyperparameter tuning with Tune
- Checkpointing & resuming
- Scaling to clusters

### Layer 10 of 10 — id: rl-engineer-10
Title: Applications & Deployment
Technologies: Deployment, Sim2Real, Serving
Description: Take RL from notebook to product. Learn real-world applications and how to deploy trained policies.
Topics:
- Real-world RL applications
- Offline RL
- Sim-to-real transfer
- Serving trained policies
- Safety & constraints
- Monitoring deployed agents

Start now with Layer 1.
