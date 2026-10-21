import { useEffect, useMemo, useRef } from "react";
import { SmilePlus } from "lucide-react";

// Keep in sync with ALLOWED_REACTIONS in backend/modules/chat/services/chatService.js.
const QUICK_REACTIONS = ["👍", "❤️", "😂", "😮", "😢", "🙏", "🔥", "🎉"];

// Floating bar of quick reactions. Closes on outside click / Escape.
export function ReactionPicker({ myEmoji, onPick, onClose, alignRight }) {
  const ref = useRef(null);

  useEffect(() => {
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      role="menu"
      aria-label="Pick a reaction"
      className={`absolute bottom-full z-10 mb-1 flex w-max max-w-[calc(100vw-3.5rem)] flex-wrap justify-center gap-0.5 rounded-2xl border border-white/10 bg-black/95 p-1 shadow-xl shadow-black/40 backdrop-blur-sm ${
        alignRight ? "right-0" : "left-0"
      }`}
    >
      {QUICK_REACTIONS.map((emoji) => (
        <button
          key={emoji}
          type="button"
          role="menuitem"
          aria-label={`React ${emoji}`}
          onClick={() => onPick(emoji)}
          className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-lg transition-transform hover:scale-125 hover:bg-white/10 ${
            myEmoji === emoji ? "bg-fuchsia-600/30" : ""
          }`}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}

// Small "add reaction" button shown beside a bubble on hover (desktop).
export function ReactButton({ onClick }) {
  return (
    <button
      type="button"
      aria-label="Add reaction"
      onClick={onClick}
      className="relative flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-white/50 opacity-0 transition-opacity after:absolute after:-inset-2.5 hover:text-white focus-visible:opacity-100 group-hover:opacity-100 [@media(hover:none)]:hidden"
    >
      <SmilePlus size={16} />
    </button>
  );
}

// Grouped chips under a bubble: "❤️ 2". Highlighted when it includes my own
// reaction; clicking it toggles mine off/on like Telegram.
export function ReactionChips({ reactions, myId, onToggle }) {
  const groups = useMemo(() => {
    const counts = new Map();
    Object.entries(reactions ?? {}).forEach(([userId, emoji]) => {
      const g = counts.get(emoji) ?? { emoji, count: 0, mine: false };
      g.count += 1;
      if (userId === String(myId)) g.mine = true;
      counts.set(emoji, g);
    });
    return [...counts.values()];
  }, [reactions, myId]);

  if (groups.length === 0) return null;

  return (
    <div className="-mt-1.5 flex flex-wrap gap-1 px-1">
      {groups.map(({ emoji, count, mine }) => (
        <button
          key={emoji}
          type="button"
          aria-pressed={mine}
          aria-label={`${emoji} ${count}`}
          onClick={() => onToggle(emoji)}
          className={`relative flex cursor-pointer items-center gap-1 rounded-full border px-1.5 py-0.5 text-xs transition-colors after:absolute after:-inset-1.5 ${
            mine
              ? "border-fuchsia-500/60 bg-fuchsia-600/25 text-white"
              : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
          }`}
        >
          <span>{emoji}</span>
          {count > 1 && <span className="text-[11px]">{count}</span>}
        </button>
      ))}
    </div>
  );
}
