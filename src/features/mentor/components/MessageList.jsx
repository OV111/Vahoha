import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { FileText } from "lucide-react";
import useMentorStore from "@/stores/useMentorStore";
import ThinkingTraceView from "./ThinkingTrace";
import MarkdownMessage from "./MarkdownMessage";
import MessageSkeleton from "./MessageSkeleton";
import MessageActions from "./MessageActions";
import ContextCard from "./ContextCard";
import TeachBackCard from "./TeachBackCard";

// How close to the bottom (px) still counts as "following along". If the user
// has scrolled further up than this, we leave their scroll position alone.
const STICK_THRESHOLD = 120;

// Finished rows only re-render when their own props change, so a new tool step or
// a toggled streaming flag does not re-parse every earlier answer.
const ThinkingTrace = memo(ThinkingTraceView);
// One shared array, so the memo above can recognise the "no tools yet" trace as unchanged.
const EMPTY_CALLS = [];

function AttachmentChips({ attachments, align = "left" }) {
  if (!attachments?.length) return null;
  return (
    <div className={`flex flex-wrap gap-2 mb-2 ${align === "right" ? "justify-end" : ""}`}>
      {attachments.map((a) => (
        <span
          key={a.name}
          className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-white/10 bg-white/5 text-[12px] text-white/70 max-w-[220px]"
        >
          <FileText size={12} className="shrink-0 text-purple-400" />
          <span className="truncate">{a.name}</span>
        </span>
      ))}
    </div>
  );
}

/**
 * The user's own turn: a right-aligned bubble.
 *
 * Rendered as plain text with `whitespace-pre-wrap`, never as Markdown — the
 * user's literal input should never be reinterpreted as formatting.
 */
const UserMessage = memo(function UserMessage({ msg }) {
  return (
    <div className="flex flex-col items-end">
      <AttachmentChips attachments={msg.attachments} align="right" />
      <div className="max-w-[88%] sm:max-w-[80%] rounded-2xl rounded-br-md px-4 py-2.5 bg-white/8">
        <p className="text-[14px] whitespace-pre-wrap break-words text-white">{msg.content}</p>
      </div>
    </div>
  );
});

/**
 * The agent's turn: full width on the left, no bubble.
 *
 * Answers contain code blocks, tables and lists — boxing them in a bubble would
 * fight the Markdown rendering, which is why no serious chat product does it.
 */
const AssistantMessage = memo(function AssistantMessage({ content }) {
  return (
    <div className="group">
      <MarkdownMessage content={content} />
      <MessageActions content={content} />
    </div>
  );
});

/**
 * The reply as it types out. It alone subscribes to the streamed text, so a token
 * re-renders this one block instead of the whole transcript and page, and it
 * asks the list to keep following along as the text grows.
 */
function StreamingAnswer({ onGrow }) {
  const content = useMentorStore((s) => s.streamingContent);
  useEffect(() => {
    onGrow();
  }, [content, onGrow]);

  return (
    <div>
      <MarkdownMessage content={content} />
      <span className="animate-pulse text-[14px] text-white">▊</span>
    </div>
  );
}

/**
 * Consecutive tool_call messages are one turn's background work (tools run in
 * parallel and over several rounds, with no assistant message between), so they
 * render as a single trace instead of one row per call.
 */
function groupToolCalls(messages) {
  const items = [];
  messages.forEach((msg, i) => {
    const last = items.at(-1);
    if (msg.role !== "tool_call") items.push({ kind: "msg", key: i, msg });
    else if (last?.kind === "trace") last.calls.push(msg);
    else items.push({ kind: "trace", key: msg.id ?? i, calls: [msg] });
  });
  return items;
}

export default function MessageList({
  messages,
  isStreaming,
  isLoadingSession = false,
  onAnswerFollowUp,
  // ChatTopBar floats on top of this list (absolute + backdrop-blur) instead
  // of pushing it down, so without this the first message renders right under
  // the header with no way to scroll it into view.
  topInset = false,
}) {
  // Only whether any text has arrived (it flips once per reply); the text itself is
  // StreamingAnswer's business.
  const hasStreamText = useMentorStore((s) => s.streamingContent !== "");
  const containerRef = useRef(null);
  const prevLengthRef = useRef(messages.length);

  // Scroll the CONTAINER, never scrollIntoView(). scrollIntoView walks up and
  // scrolls every scrollable ancestor — including the document — which yanked
  // the whole page down when arriving from the landing page with a first message.
  const scrollToBottom = (smooth) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: smooth ? "smooth" : "auto" });
  };

  // Follow the answer as it grows, but only while the user is already at the
  // bottom — otherwise we'd fight them every time they scroll up to re-read.
  const followIfNearBottom = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (el.scrollHeight - el.scrollTop - el.clientHeight < STICK_THRESHOLD) {
      el.scrollTo({ top: el.scrollHeight, behavior: "auto" });
    }
  }, []);

  // Jump to the bottom on mount without animation, so a session opened with
  // existing history starts at the newest message instead of scrolling through it.
  useEffect(() => {
    scrollToBottom(false);
  }, []);

  useEffect(() => {
    if (messages.length <= prevLengthRef.current) {
      prevLengthRef.current = messages.length;
      return;
    }
    prevLengthRef.current = messages.length;
    scrollToBottom(true);
  }, [messages.length]);

  // Same while the steps stream in before any answer text: the trace grows
  // without adding a message, so the length-based effect above never fires. Once
  // text arrives, StreamingAnswer does the following.
  useEffect(() => {
    if (!isStreaming || hasStreamText) return;
    followIfNearBottom();
  }, [messages, isStreaming, hasStreamText, followIfNearBottom]);

  // Stable between renders that do not change the messages (a streaming flag
  // flipping), which is what lets the memoized rows below skip re-rendering.
  const items = useMemo(() => groupToolCalls(messages), [messages]);
  const traceIsLast = items.at(-1)?.kind === "trace";

  return (
    <div
      ref={containerRef}
      className={`flex-1 overflow-y-auto px-4 sm:px-8 pb-6 ${topInset ? "pt-20" : "pt-6"}`}
      style={{ scrollbarWidth: "none" }}
    >
      {/* A centred, width-capped column. Full-bleed text on a wide monitor is
          unreadable — this is the same reason every chat product caps it. */}
      <div className="max-w-3xl mx-auto w-full space-y-6">
        {isLoadingSession && <MessageSkeleton />}

        {/* Only claim the session is empty once we've actually finished loading it. */}
        {!isLoadingSession && messages.length === 0 && !isStreaming && (
          <p className="text-[13px] text-center mt-16" style={{ color: "#333" }}>
            start a conversation
          </p>
        )}

        {items.map((item, index) => {
          if (item.kind === "trace") {
            // Only the turn in progress can still be working, and it is "live" until
            // the first answer text arrives; after that (or in older turns) it collapses.
            const current = index === items.length - 1;
            return (
              <ThinkingTrace
                key={`trace-${item.key}`}
                calls={item.calls}
                live={current && isStreaming && !hasStreamText}
                streaming={current && isStreaming}
              />
            );
          }

          const { msg, key: i } = item;
          if (msg.role === "context") {
            return msg.loading ? (
              <div key={i} className="max-w-2xl rounded-xl border border-white/10 bg-white/3 p-4">
                <div className="h-3 w-24 rounded bg-white/8 animate-pulse" />
              </div>
            ) : (
              <ContextCard key={i} data={msg.data} error={msg.error} />
            );
          }

          if (msg.role === "teach_back") {
            return msg.loading ? (
              <div key={i} className="max-w-2xl rounded-xl border border-purple-700/40 bg-purple-950/10 p-4">
                <div className="h-3 w-32 rounded bg-white/8 animate-pulse" />
              </div>
            ) : (
              <TeachBackCard key={i} data={msg.data} error={msg.error} onAnswerFollowUp={onAnswerFollowUp} />
            );
          }

          if (msg.role === "user") return <UserMessage key={i} msg={msg} />;

          return <AssistantMessage key={i} content={msg.content} />;
        })}

        {isStreaming && hasStreamText && <StreamingAnswer onGrow={followIfNearBottom} />}

        {/* Before the first token and before any tool call there is no trace yet;
            show "Thinking…" so the wait reads as progress. Once tools run, the
            trace in the list above is the live one. */}
        {isStreaming && !hasStreamText && !traceIsLast && <ThinkingTrace calls={EMPTY_CALLS} live streaming />}
      </div>
    </div>
  );
}
