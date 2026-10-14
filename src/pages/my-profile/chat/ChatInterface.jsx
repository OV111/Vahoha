import React, { useEffect, useRef, useState } from "react";
import { Ellipsis, Mic, Send, ArrowLeft, Users, Smile, Trash2, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Skeleton from "react-loading-skeleton";
import GroupMembersModal from "./GroupMembersModal";
import EmojiPicker from "./EmojiPicker";
import VoiceBubble from "./VoiceBubble";
import AttachMenu, { MAX_ATTACHMENT_BYTES } from "./AttachMenu";
import { ImageMessage, FileMessage } from "./AttachmentMessages";
import useVoiceRecorder, { formatClock } from "./useVoiceRecorder";
import { ReactionPicker, ReactButton, ReactionChips } from "./MessageReactions";
// import StartChatSvg from "../../../assets/StartChat.svg";
// import VoiceChatSvg from "../../../assets/Voice chat-amico.svg";
// eslint-disable-next-line react-refresh/only-export-components
export function formatTimeAgo(dateString) {
  if (!dateString) return "recently";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "recently";
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  const intervals = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  for (const unit in intervals) {
    const value = Math.floor(seconds / intervals[unit]);
    if (value >= 1) {
      return rtf.format(-value, unit);
    }
  }
  return "just now";
}

const MENU_ITEM =
  "w-full cursor-pointer rounded-lg border border-transparent bg-white/5 px-3 py-2 text-left text-xs font-medium text-white/80 transition-all duration-200 hover:border-white/10 hover:bg-white/10 disabled:cursor-not-allowed disabled:text-[#8A8A93] disabled:hover:border-transparent disabled:hover:bg-white/5";

const CONFIRM_COPY = {
  clear: {
    title: "Clear this chat?",
    body: "This removes the messages from your view only. The other person keeps their copy.",
    confirmLabel: "Clear chat",
  },
  block: {
    title: "Block this user?",
    body: "Neither of you will be able to send messages in this chat. You can unblock them any time.",
    confirmLabel: "Block",
  },
};

const isOnlineByLastActive =(dateString) => {
  if (!dateString) return false;
  const lastActive = new Date(dateString);
  if (Number.isNaN(lastActive.getTime())) return false;
  const diff = Date.now() - lastActive.getTime();
  return diff >= 0 && diff < 60 * 1000;
};

const ChatInterface = ({
  isGroup = false,
  group,
  userSelected,
  userStats,
  isLoadingUserStats,
  clickedUser,
  isLoadingHistory,
  chatMessages,
  senderId,
  mutualFollowers = [],
  draftMessage,
  setDraftMessage,
  handleSendMessage,
  onReact,
  onSendVoice,
  onSendAttachment,
  isMuted = false,
  isBlockedByMe = false,
  requestState = null, // "incoming" | "sent" | "declined" | null
  onAcceptRequest,
  onDeclineRequest,
  onToggleMute,
  onClearChat,
  onToggleBlock,
  onBack,
  onLeftGroup,
}) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [confirm, setConfirm] = useState(null); // "clear" | "block" | null
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const [pickerFor, setPickerFor] = useState(null); // message _id with its picker open
  const longPressTimer = useRef(null);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [isSendingVoice, setIsSendingVoice] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef(null);
  const emojiBtnRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const menuRef = useRef(null);
  const skeletonBaseColor = "#161616";
  const skeletonHighlightColor = "#262626";
  const activeId = isGroup ? group?._id : userSelected?._id;
  // Best-effort sender label for group messages — resolved from the mutual
  // followers list the sidebar already has in memory, so no extra fetch is
  // needed just to label a bubble.
  const memberNameById = React.useMemo(() => {
    const map = new Map();
    mutualFollowers.forEach((u) => {
      map.set(String(u._id), `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim());
    });
    return map;
  }, [mutualFollowers]);

  useEffect(() => {
    if (isLoadingHistory) return;
    if (!messagesContainerRef.current) return;

    messagesContainerRef.current.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: "auto",
    });
  }, [chatMessages, activeId, isLoadingHistory]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setPickerFor(null);
    setIsEmojiOpen(false);
    recorder.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

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

  const handleAttachFile = async (file) => {
    if (file.size > MAX_ATTACHMENT_BYTES) {
      return toast.error("File is too large. Maximum size is 10 MB.");
    }
    setIsUploading(true);
    try {
      await onSendAttachment(file);
    } finally {
      setIsUploading(false);
    }
  };

  const startRecording = async () => {
    setIsEmojiOpen(false);
    try {
      await recorder.start();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Picking the emoji you already used removes it (Telegram/Instagram toggle).
  const react = (msg, emoji) => {
    const mine = msg.reactions?.[String(senderId)];
    onReact(String(msg._id), mine === emoji ? null : emoji);
    setPickerFor(null);
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

  // Touch has no hover, so a long press opens the picker instead.
  const startLongPress = (id) => {
    clearTimeout(longPressTimer.current);
    longPressTimer.current = setTimeout(() => setPickerFor(id), 450);
  };
  const cancelLongPress = () => clearTimeout(longPressTimer.current);

  return (
    <div className="min-w-0 flex-1 bg-black">
      <div className="flex h-[calc(100dvh-var(--navbar-h,0px))] md:h-screen flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 bg-black px-2 lg:px-3 py-2.5">
          <div className="flex min-w-0 items-center">
            <button type="button" onClick={onBack} aria-label="Back to conversations" className="relative after:absolute after:-inset-3">
              <ArrowLeft
                // size={18}
                className="w-4 h-4 lg:w-5 lg:h-5 lg:mr-4 mr-2 cursor-pointer text-white/70 hover:text-white "
              />
            </button>
            <div className="flex min-w-0 items-center gap-3">
              {isGroup ? (
                group?.avatar ? (
                  <img
                    src={group.avatar}
                    alt="Group"
                    className="lg:mx-0 mx-auto h-8 w-8 object-cover rounded-full bg-purple-100"
                  />
                ) : (
                  <div className="lg:mx-0 mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-fuchsia-950/40 text-fuchsia-300">
                    <Users size={16} />
                  </div>
                )
              ) : isLoadingUserStats ? (
                <Skeleton
                  circle
                  width={32}
                  height={32}
                  baseColor={skeletonBaseColor}
                  highlightColor={skeletonHighlightColor}
                />
              ) : (
                userStats?.profileImage ? (
                  <img
                    src={userStats.profileImage}
                    alt="Profile"
                    className="lg:mx-0 mx-auto h-8 w-8 object-cover rounded-full bg-purple-100"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-fuchsia-950/40 text-sm font-medium text-fuchsia-300">
                    {clickedUser?.[0]?.toUpperCase()}
                  </div>
                )
              )}
              <div className="min-w-0">
                {isGroup ? (
                  <div>
                    <p className="truncate text-sm lg:text-base text-white/90">
                      {group?.name || "Group"}
                    </p>
                    <p className="text-xs text-[#8A8A93]">
                      {group?.members?.length ?? 0} members
                    </p>
                  </div>
                ) : isLoadingUserStats ? (
                  <div className="space-y-0">
                    <Skeleton
                      width={130}
                      height={12}
                      borderRadius={6}
                      baseColor={skeletonBaseColor}
                      highlightColor={skeletonHighlightColor}
                    />
                    <Skeleton
                      width={90}
                      height={10}
                      borderRadius={6}
                      baseColor={skeletonBaseColor}
                      highlightColor={skeletonHighlightColor}
                    />
                  </div>
                ) : (
                  <div>
                    <p className="truncate text-sm lg:text-base text-white/90">
                      {clickedUser}
                    </p>

                    <div className="flex items-center gap-2 overflow-x-auto text-xs text-[#8A8A93]">
                      {isOnlineByLastActive(userStats?.lastActive) ? (
                        <>
                          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                          <p className="text-xs text-[#8A8A93]">
                            Online
                          </p>
                        </>
                      ) : (
                        <p className="text-xs text-[#8A8A93]">
                          {formatTimeAgo(userStats?.lastActive)}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="relative ml-2 shrink-0" ref={menuRef}>
            <button
              type="button"
              aria-label="Open chat actions"
              aria-expanded={isMenuOpen}
              aria-haspopup="menu"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="cursor-pointer rounded-2xl bg-white/5 p-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Ellipsis className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>

            {isMenuOpen && (
              <div
                role="menu"
                className="absolute right-0 z-4 mt-2 grid w-52 gap-1 overflow-hidden rounded-2xl border border-white/10 bg-black/95 p-2 shadow-xl shadow-black/40 backdrop-blur-sm"
              >
                {isGroup ? (
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsMembersOpen(true);
                    }}
                    className={MENU_ITEM}
                  >
                    Manage members
                  </button>
                ) : (
                  <button
                    type="button"
                    role="menuitem"
                    disabled={!userSelected?.username}
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate(`/users/${userSelected.username}`);
                    }}
                    className={MENU_ITEM}
                  >
                    View Profile
                  </button>
                )}
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onToggleMute();
                  }}
                  className={MENU_ITEM}
                >
                  {isMuted ? "Unmute notifications" : "Mute notifications"}
                </button>
                {/* Destructive-ish actions confirm first. */}
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setConfirm("clear");
                  }}
                  className={MENU_ITEM}
                >
                  Clear chat
                </button>
                {!isGroup && !isBlockedByMe && (
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setConfirm("block");
                    }}
                    className={`${MENU_ITEM} text-red-300! hover:bg-red-950/40!`}
                  >
                    Block user
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div
          ref={messagesContainerRef}
          className="grid flex-1 items-end overflow-y-auto bg-black p-3 sm:p-4"
        >
          <div className="flex max-w-full flex-col gap-2">
            {isLoadingHistory ? (
              <div className="space-y-3">
                {[...Array(12)].map((_, idx) => (
                  <div
                    key={idx}
                    className={`flex ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}
                  >
                    <Skeleton
                      width={idx % 2 === 0 ? 170 : 210}
                      height={34}
                      borderRadius={18}
                      baseColor={skeletonBaseColor}
                      highlightColor={skeletonHighlightColor}
                    />
                  </div>
                ))}
              </div>
            ) : chatMessages.length > 0 ? (
              chatMessages.map((msg) => {
                const isMine = String(msg.senderId) === String(senderId);
                return (
                  <div
                    key={msg._id}
                    className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex w-auto max-w-[85%] flex-col sm:max-w-[70%] lg:max-w-[56%] ${isMine ? "items-end" : "items-start"}`}
                    >
                      {isGroup && !isMine && (
                        <span className="mb-0.5 px-2 text-[11px] font-medium text-fuchsia-400/80">
                          {memberNameById.get(String(msg.senderId)) || "Member"}
                        </span>
                      )}
                      <div
                        className={`group relative flex max-w-full items-center gap-1 ${isMine ? "flex-row-reverse" : ""}`}
                      >
                        <div
                          onDoubleClick={() => {
                            if (msg.reactions?.[String(senderId)] !== "❤️") react(msg, "❤️");
                          }}
                          onTouchStart={() => startLongPress(msg._id)}
                          onTouchEnd={cancelLongPress}
                          onTouchMove={cancelLongPress}
                          onContextMenu={(e) => {
                            e.preventDefault();
                            setPickerFor(msg._id);
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
                            <VoiceBubble
                              url={msg.audio.url}
                              durationMs={msg.audio.durationMs}
                              isMine={isMine}
                            />
                          ) : (
                            msg.text
                          )}
                        </div>
                        <ReactButton onClick={() => setPickerFor(msg._id)} />
                        {pickerFor === msg._id && (
                          <ReactionPicker
                            alignRight={isMine}
                            myEmoji={msg.reactions?.[String(senderId)]}
                            onPick={(emoji) => react(msg, emoji)}
                            onClose={() => setPickerFor(null)}
                          />
                        )}
                      </div>
                      <ReactionChips
                        reactions={msg.reactions}
                        myId={senderId}
                        onToggle={(emoji) => react(msg, emoji)}
                      />
                      <span
                        className="mt-1 px-2 text-[11px] text-[#8A8A93]"
                      >
                        {msg.createdAt
                          ? new Date(msg.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : ""}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex h-full items-center justify-center py-16">
                <div className="rounded-3xl bg-transparent px-6 py-8 text-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-[0.5px] border-white text-white">
                    <Send size={44} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <p className="mt-4 text-xl font-semibold text-white">
                    No messages yet
                  </p>
                  <p className="mt-2 text-sm text-[#8A8A93]">
                    Start the conversation with your first message.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {isBlockedByMe ? (
          <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-black px-4 py-3">
            <p className="text-sm text-[#8A8A93]">
              You blocked this user. They can&apos;t message you and you can&apos;t
              message them.
            </p>
            <button
              type="button"
              onClick={onToggleBlock}
              className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-fuchsia-400"
            >
              Unblock
            </button>
          </div>
        ) : requestState === "incoming" ? (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-black px-4 py-3">
            <p className="text-sm text-[#8A8A93]">
              {clickedUser} wants to message you. They can&apos;t send more until you accept.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onAcceptRequest}
                className="cursor-pointer rounded-lg bg-purple-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-purple-500 focus-visible:outline-2 focus-visible:outline-purple-400"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={onDeclineRequest}
                className="cursor-pointer rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-purple-400"
              >
                Decline
              </button>
            </div>
          </div>
        ) : requestState ? (
          <div className="border-t border-white/10 bg-black px-4 py-3">
            <p className="text-sm text-[#8A8A93]">
              {requestState === "declined"
                ? "Your message request was declined."
                : "Message request sent. You can keep chatting once they accept."}
            </p>
          </div>
        ) : (
        /* A real <form>: Enter submits natively, so no key handler is needed. */
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative border-t border-white/10 bg-black p-2"
        >
          {isEmojiOpen && (
            <EmojiPicker
              anchorRef={emojiBtnRef}
              onPick={insertEmoji}
              onClose={() => setIsEmojiOpen(false)}
            />
          )}
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
              <span className="flex-1 text-sm tabular-nums text-white/90">
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
              className="w-full bg-transparent px-1 py-1 text-base md:text-sm text-white placeholder:text-[#8A8A93] outline-none"
            />
            <button
              ref={emojiBtnRef}
              type="button"
              aria-label="Add emoji"
              aria-expanded={isEmojiOpen}
              onClick={() => setIsEmojiOpen((o) => !o)}
              className="relative flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-[#8A8A93] transition-colors after:absolute after:-inset-1 hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-purple-500"
            >
              <Smile size={20} />
            </button>
            <button
              type="button"
              aria-label="Record voice message"
              onClick={startRecording}
              className={`relative ${draftMessage.trim() ? "hidden sm:flex" : "flex"} h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-[#8A8A93] transition-colors after:absolute after:-inset-1 hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-purple-500`}
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
        )}
      </div>

      {confirm && (
        <ConfirmDialog
          {...CONFIRM_COPY[confirm]}
          onCancel={() => setConfirm(null)}
          onConfirm={() => {
            const action = confirm === "clear" ? onClearChat : onToggleBlock;
            setConfirm(null);
            action();
          }}
        />
      )}

      {isGroup && isMembersOpen && (
        <GroupMembersModal
          roomId={group._id}
          currentUserId={senderId}
          mutualFollowers={mutualFollowers}
          onClose={() => setIsMembersOpen(false)}
          onLeft={onLeftGroup}
        />
      )}
    </div>
  );
};

export default ChatInterface;
