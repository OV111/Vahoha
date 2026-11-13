import { Download } from "lucide-react";
import { exportConversation } from "../lib/exportConversation";
import ContextMeter from "./ContextMeter";

/** Chat header: the conversation title, the context meter and an export action. */
export default function ChatTopBar({ title, messages = [] }) {
  // Nothing to label and nothing to export on a fresh chat, so the bar isn't
  // rendered at all — same as Claude, where the header stays empty until a
  // conversation exists. No placeholder title, no disabled button.
  if (!title) return null;

  const canExport = messages.some((m) => m.role === "user" || m.role === "assistant");

  return (
    <div className="flex items-center justify-between gap-2 sm:gap-4 pl-14 pr-3 py-2 md:px-5 md:py-3 shrink-0 bg-black">
      <h1
        className="text-[15px] tracking-tight truncate min-w-0"
        style={{ color: "#e5e5e5" }}
        title={title}
      >
        {title}
      </h1>

      <ContextMeter />

      <button
        onClick={() => exportConversation(title, messages)}
        disabled={!canExport}
        aria-label="Export conversation as Markdown"
        title={canExport ? "Export as Markdown" : "Nothing to export yet"}
        className={`flex items-center gap-1.5 text-[13px] px-2.5 py-1.5 min-h-9 md:min-h-0 relative max-md:after:absolute max-md:after:-inset-1 rounded-lg shrink-0 transition-colors ${
          canExport
            ? "text-white/50 hover:text-white hover:bg-white/8 cursor-pointer"
            : "text-white/20 cursor-not-allowed"
        }`}
      >
        <Download size={14} strokeWidth={1.5} />
        {/* Icon only on phones, so the chat title keeps the room. */}
        <span className="max-sm:sr-only">Export</span>
      </button>
    </div>
  );
}
