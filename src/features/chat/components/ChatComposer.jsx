import { useRef, useState } from "react";
import { LoaderCircle, Mic, Send, Smile, Trash2 } from "lucide-react";
import { toast } from "sonner";
import EmojiPicker from "./EmojiPicker";
import AttachMenu, { MAX_ATTACHMENT_BYTES } from "./AttachMenu";
import useVoiceRecorder, { formatClock } from "../hooks/useVoiceRecorder";

const iconBtn =
  "relative h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-[#8A8A93] transition-colors after:absolute after:-inset-1 hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-purple-500";

/**
 * Message input with emoji, attachments and voice recording. Render it with
 * key={conversation id}: switching chats then drops the picker and any
 * recording in progress (the recorder cancels on unmount).
 */
const ChatComposer = ({ draftMessage, setDraftMessage, onSendMessage, onSendVoice, onSendAttachment }) => {
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [isSendingVoice, setIsSendingVoice] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef(null);
  const emojiBtnRef = useRef(null);

  const sendRecording = async (recording) => {
    if (!recording) return;
    setIsSendingVoice(true);
    try {
      await onSendVoice(recording.blob, recording.durationMs);
    } finally {
      setIsSendingVoice(false);
    }
  };
  // Hitting the 2-minute cap sends what was recorded, like Telegram.
  const recorder = useVoiceRecorder({ onAutoStop: sendRecording });

  const startRecording = async () => {
    setIsEmojiOpen(false);
    try {
      await recorder.start();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleAttachFile = async (file) => {
    if (file.size > MAX_ATTACHMENT_BYTES) return toast.error("File is too large. Maximum size is 10 MB.");
    setIsUploading(true);
    try {
      await onSendAttachment(file);
    } finally {
      setIsUploading(false);
    }
  };

  // Insert at the caret (replacing any selection), then put the caret back
  // after the emoji once React has re-rendered the controlled input.
  const insertEmoji = (emoji) => {
    const el = inputRef.current;
    const start = el?.selectionStart ?? draftMessage.length;
    const end = el?.selectionEnd ?? draftMessage.length;
    setDraftMessage(draftMessage.slice(0, start) + emoji + draftMessage.slice(end));
    const caret = start + emoji.length;
    requestAnimationFrame(() => el?.setSelectionRange(caret, caret));
  };

  return (
    // A real <form>: Enter submits natively, so no key handler is needed.
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSendMessage();
      }}
      className="relative border-t border-white/10 bg-black p-2"
    >
      {isEmojiOpen && <EmojiPicker anchorRef={emojiBtnRef} onPick={insertEmoji} onClose={() => setIsEmojiOpen(false)} />}
      {recorder.isRecording || isSendingVoice ? (
        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/3 px-2.5 py-1.5">
          <button
            type="button"
            aria-label="Cancel recording"
            disabled={isSendingVoice}
            onClick={recorder.cancel}
            className="relative flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-red-400 transition-colors after:absolute after:-inset-1 hover:bg-red-950/40 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Trash2 size={20} />
          </button>
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
          <span className="flex-1 text-sm text-white/90 tabular-nums">
            {isSendingVoice ? "Sending…" : formatClock(recorder.seconds)}
          </span>
          <button
            type="button"
            aria-label="Send voice message"
            disabled={isSendingVoice}
            onClick={async () => sendRecording(await recorder.stop())}
            className="relative flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-fuchsia-600 text-white transition-colors after:absolute after:-inset-1 hover:bg-fuchsia-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSendingVoice ? <LoaderCircle size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/3 px-1.5 py-1.5 sm:gap-1.5 sm:px-2.5">
          <AttachMenu onFile={handleAttachFile} busy={isUploading} />
          <input
            ref={inputRef}
            type="text"
            value={draftMessage}
            placeholder="Write your message..."
            aria-label="Message"
            onChange={(e) => setDraftMessage(e.target.value)}
            className="w-full bg-transparent px-1 py-1 text-base text-white outline-none placeholder:text-[#8A8A93] md:text-sm"
          />
          <button
            ref={emojiBtnRef}
            type="button"
            aria-label="Add emoji"
            aria-expanded={isEmojiOpen}
            onClick={() => setIsEmojiOpen((o) => !o)}
            className={`flex ${iconBtn}`}
          >
            <Smile size={20} />
          </button>
          <button
            type="button"
            aria-label="Record voice message"
            onClick={startRecording}
            className={`${draftMessage.trim() ? "hidden sm:flex" : "flex"} ${iconBtn}`}
          >
            <Mic size={20} />
          </button>
          {/* Grey while empty, filled purple once there is something to send. */}
          <button
            type="submit"
            aria-label="Send message"
            disabled={!draftMessage.trim()}
            className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-fuchsia-600 text-white transition-colors after:absolute after:-inset-1 hover:bg-fuchsia-500 focus-visible:outline-2 focus-visible:outline-purple-500 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-[#8A8A93] disabled:hover:bg-white/10"
          >
            <Send size={16} />
          </button>
        </div>
      )}
    </form>
  );
};

export default ChatComposer;
