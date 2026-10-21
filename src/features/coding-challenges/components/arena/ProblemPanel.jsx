import { Star, CheckCircle2, Zap } from "lucide-react";
import { C } from "../../lib/arenaTheme";
import ChallengeText from "./ChallengeText";
import Badge from "../Badge";
import DifficultyBadge from "../DifficultyBadge";
import SectionHead from "./SectionHead";
import ExampleBlock from "./ExampleBlock";
import { formatTitle } from "../../lib/formatTitle";

export default function ProblemPanel({ challenge }) {
  return (
    <div className="thin-scrollbar flex flex-col h-full overflow-y-auto gap-5 px-5 py-5">
      {challenge.weakTopic && (
        <div
          className="flex items-center gap-1.5 self-start px-3 py-1 rounded-full"
          style={{ background: "#1c1200", border: `1px solid #4a3200`, color: C.amber }}
        >
          <Star size={10} fill={C.amber} />
          <span className="text-[10px] font-bold tracking-widest uppercase">Your weak topic</span>
        </div>
      )}

      <h1 className="text-[20px] font-bold leading-snug" style={{ color: C.text }}>
        {formatTitle(challenge.title)}
      </h1>

      <div className="flex flex-wrap items-center gap-1.5">
        <DifficultyBadge challenge={challenge} />
        <Badge tone="xp" icon={Zap}>+{challenge.xp} xp</Badge>
        {challenge.done && (
          <Badge tone="green" icon={CheckCircle2}>solved</Badge>
        )}
        {(challenge.tags ?? []).map((t) => (
          <Badge key={t} mono>{t}</Badge>
        ))}
      </div>

      <ChallengeText text={challenge.description} className="text-[14px] leading-7 text-[#b4b4b4]" />

      <div>
        <SectionHead>The task</SectionHead>
        <div
          className="rounded-r-md border-l py-3 pl-4 pr-3"
          style={{ borderColor: C.purple, background: "rgba(168,85,247,0.06)" }}
        >
          <ChallengeText text={challenge.task} className="text-[14px] leading-7 text-[#d0d0d0]" />
        </div>
      </div>

      <div>
        <SectionHead>Constraints</SectionHead>
        <ul className="flex flex-col gap-2.5">
          {challenge.constraints.map((c, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[14px] leading-relaxed" style={{ color: "#b4b4b4" }}>
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: C.purple }} />
              <ChallengeText text={c} className="min-w-0 text-[14px] leading-relaxed text-[#b4b4b4]" />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <SectionHead>Example</SectionHead>
        <ExampleBlock code={challenge.example} />
      </div>
    </div>
  );
}
