import { useRef } from "react";
import VoiceBubble from "./VoiceBubble";
import { ImageMessage, FileMessage } from "./AttachmentMessages";
import { ReactionPicker, ReactButton, ReactionChips } from "./MessageReactions";

const LONG_PRESS_MS = 450;

const formatTime = (date) =>
  date ? new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";

/**
 * One message with its reactions. `senderName` is shown above other people's
 * messages in groups. `onReact(emoji)` toggles the viewer's reaction.
 */
const MessageBubble = ({ msg, isMine, senderName, myId, isPickerOpen, onOpenPicker, onClosePicker, onReact }) => {
  const longPressTimer = useRef(null);
  const myEmoji = msg.reactions?.[String(myId)];

  // Touch has no hover, so a long press opens the picker instead.
  const startLongPress = () => {
    clearTimeout(longPressTimer.current);
    longPressTimer.current = setTimeout(onOpenPicker, LONG_PRESS_MS);
  };
  const cancelLongPress = () => clearTimeout(longPressTimer.current);

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div className={`flex w-auto max-w-[85%] flex-col sm:max-w-[70%] lg:max-w-[56%] ${isMine ? "items-end" : "items-start"}`}>
        {senderName && <span className="mb-0.5 px-2 text-[11px] font-medium text-fuchsia-400/80">{senderName}</span>}
        <div className={`group relative flex max-w-full items-center gap-1 ${isMine ? "flex-row-reverse" : ""}`}>
          <div
            onDoubleClick={() => myEmoji !== "❤️" && onReact("❤️")}
            onTouchStart={startLongPress}
            onTouchEnd={cancelLongPress}
            onTouchMove={cancelLongPress}
            onContextMenu={(e) => {
              e.preventDefault();
              onOpenPicker();
            }}
            className={`inline-block w-fit max-w-full select-none break-words rounded-3xl text-sm [-webkit-touch-callout:none] md:select-text ${
              msg.type === "image" ? "p-1" : "px-3 py-2"
            } ${
              isMine
                ? "rounded-br-sm bg-fuchsia-600 text-white"
                : "rounded-bl-sm border border-white/10 bg-white/5 text-white/90"
            }`}
          >
            {msg.type === "image" && msg.image ? (
              <ImageMessage image={msg.image} />
            ) : msg.type === "file" && msg.file ? (
              <FileMessage file={msg.file} isMine={isMine} />
            ) : msg.type === "voice" && msg.audio ? (
              <VoiceBubble url={msg.audio.url} durationMs={msg.audio.durationMs} isMine={isMine} />
            ) : (
              msg.text
            )}
          </div>
          <ReactButton onClick={onOpenPicker} />
          {isPickerOpen && (
            <ReactionPicker alignRight={isMine} myEmoji={myEmoji} onPick={onReact} onClose={onClosePicker} />
          )}
        </div>
        <ReactionChips reactions={msg.reactions} myId={myId} onToggle={onReact} />
        <span className="mt-1 px-2 text-[11px] text-[#8A8A93]">{formatTime(msg.createdAt)}</span>
      </div>
    </div>
  );
};

export default MessageBubble;
