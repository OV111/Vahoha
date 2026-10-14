import Badge from "./Badge";
import { DIFFICULTY } from "../lib/challengeTones";

// Older seeds have no `difficulty`; their XP tiers map onto the same scale.
const difficultyOf = (c) =>
  DIFFICULTY[c.difficulty] ? c.difficulty : c.xp >= 60 ? "hard" : c.xp >= 50 ? "med" : "easy";

/** Difficulty with a 1-3 bar meter, shared by the catalog card and the Arena. */
export default function DifficultyBadge({ challenge }) {
  const difficulty = difficultyOf(challenge);
  const { tone, level } = DIFFICULTY[difficulty];

  return (
    <Badge tone={tone}>
      <span className="flex items-end gap-px" aria-hidden="true">
        {[1, 2, 3].map((l) => (
          <span
            key={l}
            className={`w-[2px] rounded-sm bg-current ${l <= level ? "" : "opacity-25"}`}
            style={{ height: `${l * 2 + 2}px` }}
          />
        ))}
      </span>
      {difficulty}
    </Badge>
  );
}
