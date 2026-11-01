import { useEffect, useMemo, useRef, useState } from "react";
import { Send } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import GroupMembersModal from "./GroupMembersModal";
import ChatHeader from "./ChatHeader";
import ChatComposer from "./ChatComposer";
import MessageBubble from "./MessageBubble";

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
  const [confirm, setConfirm] = useState(null); // "clear" | "block" | null
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const [pickerFor, setPickerFor] = useState(null); // message _id with its picker open
  const messagesContainerRef = useRef(null);
  const activeId = isGroup ? group?._id : userSelected?._id;
  // Best-effort sender label for group messages — resolved from the mutual
  // followers list the sidebar already has in memory, so no extra fetch is
  // needed just to label a bubble.
  const memberNameById = useMemo(() => {
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

  // The header and composer reset by remounting (key={activeId}); this is
  // the one piece of per-chat state that lives here.
  useEffect(() => setPickerFor(null), [activeId]);

  // Picking the emoji you already used removes it (Telegram/Instagram toggle).
  const react = (msg, emoji) => {
    const mine = msg.reactions?.[String(senderId)];
    onReact(String(msg._id), mine === emoji ? null : emoji);
    setPickerFor(null);
  };

  return (
    <div className="min-w-0 flex-1 bg-black">
      <div className="flex h-[calc(100dvh-var(--navbar-h,0px))] flex-col justify-between overflow-hidden">
        <ChatHeader
          key={activeId}
          isGroup={isGroup}
          group={group}
          userSelected={userSelected}
          userStats={userStats}
          isLoadingUserStats={isLoadingUserStats}
          clickedUser={clickedUser}
          isMuted={isMuted}
          isBlockedByMe={isBlockedByMe}
          onBack={onBack}
          onToggleMute={onToggleMute}
          onManageMembers={() => setIsMembersOpen(true)}
          onConfirm={setConfirm}
        />

        <div
          ref={messagesContainerRef}
          className="grid flex-1 items-end thin-scrollbar overflow-y-auto bg-black p-3 sm:p-4"
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
                      baseColor="#161616"
                      highlightColor="#262626"
                    />
                  </div>
                ))}
              </div>
            ) : chatMessages.length > 0 ? (
              chatMessages.map((msg) => {
                const isMine = String(msg.senderId) === String(senderId);
                return (
                  <MessageBubble
                    key={msg._id}
                    msg={msg}
                    isMine={isMine}
                    senderName={isGroup && !isMine ? memberNameById.get(String(msg.senderId)) || "Member" : null}
                    myId={senderId}
                    isPickerOpen={pickerFor === msg._id}
                    onOpenPicker={() => setPickerFor(msg._id)}
                    onClosePicker={() => setPickerFor(null)}
                    onReact={(emoji) => react(msg, emoji)}
                  />
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
          <ChatComposer
            key={activeId}
            draftMessage={draftMessage}
            setDraftMessage={setDraftMessage}
            onSendMessage={handleSendMessage}
            onSendVoice={onSendVoice}
            onSendAttachment={onSendAttachment}
          />
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
