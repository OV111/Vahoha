# Roadmap layer authoring

> Created 2026-10-16. Rules for adding or changing layers in `src/data/roadmaps/<category>.json`. The data model and its limits are in `docs/engineering/ARCHITECTURE.md` ("Roadmap data model").

## How many layers?

There is no fixed count. Pick the number the topic needs, usually 8 to 14. Decide before authoring, because every layer later needs an exam bank (60 questions, 15 drawn per exam), challenges, and a hand check of each answer key. A track with 14 layers costs 40% more content than one with 10.

Use more layers where the topic is deep (C++, Rust, blockchain core). Do not pad a short topic to reach 10.

## Layer ids

- Format today: `<trackId>-<n>`, unique across all tracks.
- Never renumber or reuse an id once a learner could hold progress on it. Progress, exams, challenges, mastery and blog tags all key on it.
- To add a layer to an existing track, append it with the next `order`. Do not insert in the middle until ids are stable slugs.

## Optional fields

Leave them out unless you need them. A layer with none needs the previous layer and is required.

```json
{
  "id": "cpp-10",
  "order": 10,
  "stage": "Production",
  "requires": ["cpp-9"],
  "required": true
}
```

- `requires`: ids of layers that must be done first. Only layers in the same track. Use it for a branch (two layers that both follow `x-3`) or to join branches. An empty array marks a root. An unknown id counts as not done, so a typo locks the layer.
- `required: false`: the capstone does not need this layer. Use for advanced or optional layers. It still needs an exam bank if you want it graded.
- `stage`: chapter name, for example "Foundations", "Core", "Production". Keep the set small and the same across a track.

## Checklist before merging a track change

1. `node -e "JSON.parse(require('fs').readFileSync('src/data/roadmaps/<category>.json'))"` parses.
2. `order` runs 1..n with no gaps and every `requires` id exists in the same track.
3. `npm run test:unit` passes, then run the roadmap seeder.
4. If the layer count changed, update the exam-prompt file in `docs/exam-prompts/<category>/<track>.md` (it states "It has 10 layers").
5. Check the track page renders the new layers.
