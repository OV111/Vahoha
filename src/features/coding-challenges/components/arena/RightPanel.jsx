import { lazy, Suspense, useState } from "react";
import { Lightbulb, MessageSquare, PanelRightClose, PanelRightOpen } from "lucide-react";
import { C } from "../../lib/arenaTheme";
import HintsPanel from "./HintsPanel";
import LoadingSuspense from "../../../../components/feedback/LoadingSuspense";

// Loaded on first use: most arena visits never open the mentor.
const AiAgent = lazy(() => import("../../../ai-agent/AiAgent"));

const TABS = [
  { key: "hints", label: "Hints", icon: Lightbulb },
  { key: "mentor", label: "Mentor", icon: MessageSquare },
];

/**
 * The Arena's right column: Hints and the AI mentor as tabs, collapsible to a
 * rail. The mentor stays mounted once opened (just hidden), so switching to
 * Hints and back doesn't lose the conversation or its scroll position.
 *
 * Both the rail and the full panel are rendered; the Arena's CSS picks one on
 * wide screens and always shows the full panel on narrow ones, where the
 * layout stacks and there is no column to collapse.
 */
export default function RightPanel({
  tab,
  onTabChange,
  collapsed,
  onToggle,
  hints,
  onReveal,
  challengeContext,
}) {
  const [mentorSeen, setMentorSeen] = useState(tab === "mentor");
  if (tab === "mentor" && !mentorSeen) setMentorSeen(true);

  const revealed = hints.filter((h) => h.revealed).length;

  return (
    <div className="flex h-full flex-col" style={{ background: C.surface }} data-collapsed={collapsed}>
      <button
        type="button"
        onClick={onToggle}
        aria-label="Show side panel"
        title="Show side panel"
        className="hints-rail hidden h-full w-full cursor-pointer flex-col items-center gap-3 py-3 transition-colors hover:bg-white/5"
      >
        <PanelRightOpen size={15} style={{ color: C.purple }} aria-hidden="true" />
        <span className="text-[11px] font-semibold" style={{ color: C.muted, writingMode: "vertical-rl" }}>
          Hints {revealed}/{hints.length}
        </span>
      </button>

      <div className="hints-full flex min-h-0 flex-1 flex-col">
        <div
          role="tablist"
          aria-label="Side panel"
          className="flex shrink-0 items-center border-b px-2"
          style={{ borderColor: C.border }}
        >
          {TABS.map(({ key, label, icon: Icon }) => {
            const active = tab === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onTabChange(key)}
                className="flex cursor-pointer items-center gap-1.5 border-b-2 px-3 py-2.5 text-[12px] font-medium transition-colors"
                style={{
                  borderColor: active ? C.purple : "transparent",
                  color: active ? C.text : C.muted,
                }}
              >
                <Icon size={13} aria-hidden="true" />
                {label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={onToggle}
            aria-label="Hide side panel"
            title="Hide side panel"
            className="hints-toggle ml-auto cursor-pointer rounded p-1.5 transition-colors hover:bg-white/10"
          >
            <PanelRightClose size={14} style={{ color: C.muted }} aria-hidden="true" />
          </button>
        </div>

        <div role="tabpanel" className={`min-h-0 flex-1 ${tab === "hints" ? "block" : "hidden"}`}>
          <HintsPanel hints={hints} onReveal={onReveal} />
        </div>
        {mentorSeen && (
          <div role="tabpanel" className={`min-h-0 flex-1 ${tab === "mentor" ? "block" : "hidden"}`}>
            <Suspense fallback={<LoadingSuspense fill />}>
              <AiAgent embedded challengeContext={challengeContext} />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}
