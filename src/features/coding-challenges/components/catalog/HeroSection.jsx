import { motion as Motion } from "framer-motion";
import EyebrowBadge from "@/components/ui/EyebrowBadge";
import TextType from "@/components/effects/TextType";
import StatCell from "./StatCell";
import StatCellSkeleton from "./StatCellSkeleton";
import DailyChallengeCard from "./DailyChallengeCard";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: "easeOut", delay },
});

// No global rank here — ranking needs a scoring rule defined across every
// user, which is a separate feature from "what did I personally do."
const buildStats = (stats) => [
  {
    value: String(stats?.solved ?? 0),
    unit: "solved",
    label: "TOTAL PROBLEMS",
    sub: stats?.solvedThisWeek ? `+${stats.solvedThisWeek} this week` : "",
  },
  {
    value: String(stats?.accuracy ?? 0),
    unit: "%",
    label: "ACCURACY",
    sub: stats?.attempted ? `${stats.attempted} attempted` : "",
  },
  {
    value: String(stats?.streakDays ?? 0),
    unit: "d",
    label: "SOLVE STREAK",
    sub: stats?.streakDays ? "keep it going" : "",
  },
  {
    value: String(stats?.xpTotal ?? 0),
    unit: "xp",
    label: "XP TOTAL",
    sub: "",
  },
];

export default function HeroSection({ daily, stats, loading, challengeCount, heroRef }) {
  const statCells = buildStats(stats);
  return (
    <div ref={heroRef} className="px-6 sm:px-10 lg:px-14 pt-10 pb-8 lg:mb-14">
      <div className="flex flex-col lg:mr-10 lg:flex-row lg:items-start gap-8 lg:gap-0">
        <div className="flex-1 min-w-0">
          <Motion.div {...fadeUp(0)} className="mb-6">
            {/* A live count instead of a made-up version number: it tells the
                visitor something true. The pulse dot reads as "live". */}
            <EyebrowBadge
              dot
              text={`${challengeCount > 0 ? `${challengeCount} challenges · ` : ""}tied to your roadmap · mentor-guided`}
              color="purple"
            />
          </Motion.div>

          <Motion.div {...fadeUp(0.08)} className="mb-4">
            <h1 className="text-4xl min-[400px]:text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-white">
              Coding
              <TextType
                as="span"
                text={[
                  " challenges",
                  " problems",
                  " exercises",
                  " algorithms",
                  " puzzles",
                ]}
                typingSpeed={109}
                deletingSpeed={40}
                pauseDuration={1700}
                showCursor={true}
                cursorCharacter="|"
                className="text-purple-600"
                style={{ minWidth: "10ch" }}
              />
              <br />
              that actually
              <br />
              teach and grind.
            </h1>
          </Motion.div>

          <Motion.p {...fadeUp(0.16)} className="text-[14px] max-w-lg mb-8 text-[#666]">
            Not random DSA grinding. Every challenge is tied to your current
            roadmap layer. Solve them to raise your test readiness, and the AI
            agent steps in with progressive hints — never the answer.
          </Motion.p>

          <div className="grid grid-cols-2 sm:grid-cols-4">
            {/* Skeletons until the first response: real zeros would count up
                and then jump to the real numbers. */}
            {loading && !stats
              ? statCells.map(({ label }) => <StatCellSkeleton key={label} />)
              : statCells.map(({ value, unit, label, sub }, i) => (
                  <StatCell
                    key={label}
                    value={value}
                    unit={unit}
                    label={label}
                    sub={sub}
                    index={i}
                  />
                ))}
          </div>
        </div>

        <DailyChallengeCard daily={daily} loading={loading} fadeUp={fadeUp} />
      </div>
    </div>
  );
}
