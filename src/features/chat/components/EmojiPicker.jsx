import { useEffect, useRef, useState } from "react";

// Thin scrollbar inside emoji-mart's shadow DOM (page CSS can't reach it).
const SHADOW_CSS = `
  .scroll { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,.2) transparent; }
  .scroll::-webkit-scrollbar { width: 4px; }
  .scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,.2); border-radius: 9999px; }
  .scroll::-webkit-scrollbar-track { background: transparent; }
`;

// Full emoji keyboard (search, skin tones, categories, "frequently used")
// powered by emoji-mart. The picker and its ~3,700-emoji dataset are loaded
// with dynamic import(), so they only download the first time someone opens
// the panel. We mount the framework-agnostic core Picker directly because
// @emoji-mart/react doesn't declare React 19 support.
export default function EmojiPicker({ onPick, onClose, anchorRef }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  // Latest callback without re-creating the picker on every keystroke.
  const onPickRef = useRef(onPick);
  useEffect(() => {
    onPickRef.current = onPick;
  }, [onPick]);

  useEffect(() => {
    let cancelled = false;
    const host = ref.current;

    Promise.all([import("emoji-mart"), import("@emoji-mart/data")])
      .then(([{ Picker }, { default: data }]) => {
        if (cancelled || !host) return;
        const picker = new Picker({
          data,
          theme: "dark",
          set: "native",
          dynamicWidth: true,
          previewPosition: "none",
          skinTonePosition: "search",
          maxFrequentRows: 2,
          emojiSize: 22,
          emojiButtonSize: 34,
          autoFocus: false,
          onEmojiSelect: (emoji) => onPickRef.current(emoji.native),
        });
        picker.style.height = "22rem";
        picker.style.width = "100%";
        host.appendChild(picker);
        const style = document.createElement("style");
        style.textContent = SHADOW_CSS;
        picker.shadowRoot?.appendChild(style);
        setReady(true);
      })
      .catch((err) => console.error("Failed to load emoji picker:", err));

    return () => {
      cancelled = true;
      if (host) host.replaceChildren();
    };
  }, []);

  useEffect(() => {
    const onDown = (e) => {
      if (ref.current?.contains(e.target) || anchorRef?.current?.contains(e.target)) return;
      onClose();
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
  }, [onClose, anchorRef]);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label="Emoji picker"
      className="absolute bottom-full right-0 z-10 mb-2 w-[min(21rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-white/10 bg-black/95 shadow-xl shadow-black/40"
    >
      {!ready && (
        <p className="flex h-24 items-center justify-center text-xs text-[#8A8A93]">
          Loading emojis…
        </p>
      )}
    </div>
  );
}
