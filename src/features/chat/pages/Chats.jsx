import React, { useCallback, useEffect, useState, useMemo } from "react";
import { Search } from "lucide-react";
import Sidebar from "../../profile/components/SideBar";
import { BellOff, ChevronDown, Send, SquarePen, Users } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";
import {
  getChatRequests,
  acceptChatRequest,
  declineChatRequest,
  setRoomMuted,
  clearRoom,
  getBlockedIds,
  blockUser,
  unblockUser,
  sendVoiceMessage,
  sendAttachment,
} from "../lib/chatControlsApi";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { ArrowUpDown } from "lucide-react";
import "react-loading-skeleton/dist/skeleton.css";
import LoadingChatSuspense from "@/components/feedback/LoadingChatSuspense";
import ChatInterface from "../components/ChatInterface";
import { formatTimeAgo } from "../components/ChatInterface";
import NewGroupModal from "../components/NewGroupModal";
import Skeleton from "react-loading-skeleton";
import useThemeStore from "../../../stores/useThemeStore";
import { getAccessToken, apiFetch } from "../../../../constants/api";

const getUserIdFromJWT = (token) => {
  if (!token) return null;
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      "=",
    );
    const decodedPayload = JSON.parse(atob(padded));
    return decodedPayload?.id ? String(decodedPayload.id) : null;
  } catch {
    return null;
  }
};

const MIN_USER_STATS_SKELETON_MS = 350;

const Chats = () => {
  const { theme } = useThemeStore();
  const isDarkMode = theme === "dark";
  const [rooms, setRooms] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoadingLastMessages, setIsLoadingLastMessages] = useState(true);
  const [userStats, setUserStats] = useState(null);
  // { kind: "direct", user } | { kind: "group", room } | null
  const [activeConversation, setActiveConversation] = useState(null);
  const [filter, setFilter] = useState("");
  const [isLoadingChats, setIsLoadingChats] = useState(false);
  const [isLoadingUserStats, setIsLoadingUserStats] = useState(false);
  const [draftMessage, setDraftMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [mutualFollowers, setMutualFollowers] = useState([]);
  const [sortOrder, setSortOrder] = useState("Newest");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isNewGroupOpen, setIsNewGroupOpen] = useState(false);
  // Ids of users I've blocked (string ids). Blocked-by-them is deliberately not
  // exposed — the server just rejects the send, so it can't be probed.
  const [blockedIds, setBlockedIds] = useState([]);
  // Message requests from people I'm not mutual followers with. `tab` switches
  // the left column between normal chats and the incoming requests to answer.
  const [requests, setRequests] = useState({ incoming: [], outgoing: [], accepted: [] });
  const [tab, setTab] = useState("chats"); // "chats" | "requests"
  const location = useLocation();

  const loadRequests = useCallback(async () => {
    try {
      setRequests(await getChatRequests());
    } catch (err) {
      console.error("Failed to load message requests:", err);
    }
  }, []);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  const isGroupActive = activeConversation?.kind === "group";
  const activeUser = activeConversation?.kind === "direct" ? activeConversation.user : null;
  const activeRoom = isGroupActive ? activeConversation.room : null;

  const clickedUser =
    `${activeUser?.firstName ?? ""} ${activeUser?.lastName ?? ""}`.trim() ||
    "Name Surname";

  // ws implementation //////////////////////////////////////////////
  const token = getAccessToken();
  const [socket, setSocket] = useState(null);
  const senderId = getUserIdFromJWT(token);
  const receiverId = activeUser?._id;
  const roomId = isGroupActive
    ? activeRoom?._id
    : senderId && receiverId
      ? [String(senderId), String(receiverId)].sort().join("_")
      : null;

  const roomsById = useMemo(() => {
    const map = {};
    rooms.forEach((room) => {
      map[room._id] = room;
    });
    return map;
  }, [rooms]);

  // Every conversation the user can see: existing groups they belong to, plus
  // every mutual follower as a potential/ongoing direct chat. Direct rooms
  // don't need their own list entry — a mutual follower IS the direct chat,
  // whether or not a room document exists for them yet.
  const conversationItems = useMemo(() => {
    const groupItems = rooms
      .filter((room) => room.type === "group")
      .map((room) => ({
        kind: "group",
        key: `group-${room._id}`,
        muted: Boolean(room.mySettings?.muted),
        title: room.name || "Unnamed group",
        avatar: room.avatar,
        room,
        preview: room.lastMessage
          ? { text: room.lastMessage.text, updatedAt: room.updatedAt }
          : null,
      }));

    const directItems = mutualFollowers.map((user) => {
      const directRoomId =
        senderId && user._id
          ? [String(senderId), String(user._id)].sort().join("_")
          : null;
      const room = directRoomId ? roomsById[directRoomId] : null;
      return {
        kind: "direct",
        key: `direct-${user._id}`,
        muted: Boolean(room?.mySettings?.muted),
        title: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
        avatar: user.stats?.profileImage,
        user,
        preview: room?.lastMessage
          ? { text: room.lastMessage.text, updatedAt: room.updatedAt }
          : null,
      };
    });

    // People who aren't mutual followers but have a request with me (sent by me,
    // or accepted by either side) still need a place in the list.
    const knownIds = new Set(mutualFollowers.map((u) => String(u._id)));
    const requestItems = [...requests.accepted, ...requests.outgoing]
      .filter((r) => !knownIds.has(String(r.user._id)))
      .map((r) => {
        const room = roomsById[r.roomId];
        const text = room?.lastMessage?.text ?? r.preview;
        const label =
          r.status === "declined" ? "Request declined" : r.status === "pending" ? `Pending · ${text}` : text;
        return {
          kind: "direct",
          key: `direct-${r.user._id}`,
          muted: Boolean(room?.mySettings?.muted),
          title: `${r.user.firstName ?? ""} ${r.user.lastName ?? ""}`.trim(),
          avatar: r.user.stats?.profileImage,
          user: r.user,
          preview: text || r.status === "declined"
            ? { text: label, updatedAt: room?.updatedAt ?? r.updatedAt }
            : null,
        };
      });

    return [...groupItems, ...directItems, ...requestItems];
  }, [rooms, mutualFollowers, roomsById, senderId, requests]);

  const filteredConversations = useMemo(() => {
    // Sort by the last message time. Conversations with no messages yet have
    // nothing to order by, so they always go last in either direction.
    const time = (item) =>
      item.preview?.updatedAt ? new Date(item.preview.updatedAt).getTime() : null;
    const direction = sortOrder === "Newest" ? -1 : 1;
    const sorted = [...conversationItems].sort((a, b) => {
      const ta = time(a);
      const tb = time(b);
      if (ta === null && tb === null) return 0;
      if (ta === null) return 1;
      if (tb === null) return -1;
      return (ta - tb) * direction;
    });

    return sorted.filter((item) =>
      item.title.toLowerCase().includes(filter.trim().toLowerCase()),
    );
  }, [conversationItems, sortOrder, filter]);

  const skeletonBaseColor = isDarkMode ? "#1f2937" : "#ebebeb";
  const skeletonHighlightColor = isDarkMode ? "#374151" : "#f5f5f5";

  useEffect(() => {
    const ws = new WebSocket(import.meta.env.VITE_WS_URL);

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "auth", token }));
      ws.send(
        JSON.stringify({
          type: "load_last_messages",
        }),
      );
      setSocket(ws);
    };
    ws.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      if (payload.type === "error") {
        toast.error(payload.message || "Something went wrong");
      } else if (payload.type === "sended_message") {
        setChatMessages((prev) => [...prev, payload.message]);
      } else if (payload.type === "message_reaction") {
        setChatMessages((prev) =>
          prev.map((m) => {
            if (String(m._id) !== payload.messageId) return m;
            const reactions = { ...m.reactions };
            if (payload.emoji) reactions[payload.userId] = payload.emoji;
            else delete reactions[payload.userId];
            return { ...m, reactions };
          }),
        );
      } else if (payload.type === "message_history") {
        setChatMessages(payload.messageHistory || []);
        setIsLoadingHistory(false);
      } else if (payload.type === "load_last_messages") {
        setRooms(payload.roomsData || []);
        setIsLoadingLastMessages(false);
      } else if (
        payload.type === "group_created" ||
        payload.type === "group_updated"
      ) {
        const room = payload.room;
        const currentUserId = getUserIdFromJWT(getAccessToken());
        const isStillMember = room.members.includes(String(currentUserId));

        setRooms((prev) => {
          if (!isStillMember) return prev.filter((r) => r._id !== room._id);
          const idx = prev.findIndex((r) => r._id === room._id);
          if (idx === -1) return [...prev, room];
          const next = [...prev];
          // The broadcast room is shared by all members, so it carries no
          // per-user settings — keep this user's own.
          next[idx] = { ...room, mySettings: prev[idx].mySettings };
          return next;
        });

        if (!isStillMember) {
          setActiveConversation((prev) =>
            prev?.kind === "group" && prev.room._id === room._id ? null : prev,
          );
        }
      }
    };
    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
      setIsLoadingLastMessages(false);
    };
    ws.onclose = () => {
      return () => ws.close();
    };
    return () => ws.close();
    // Open one socket per mount; token is read once at connect time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!socket || !activeConversation || !roomId) return;
    if (socket.readyState !== WebSocket.OPEN) return;
    setIsLoadingHistory(true);
    setChatMessages([]);

    socket.send(
      JSON.stringify({
        type: "join_room",
        roomId,
        senderId,
        // Only meaningful for a direct chat's implicit first-message room
        // creation — a group's roomId already resolves to an existing room.
        receiverId: isGroupActive ? undefined : receiverId,
        message: "Creating Room",
      }),
    );
  }, [socket, activeConversation, roomId, senderId, receiverId, isGroupActive]);

  // Patch (or create a stub for) a room in the list. A direct chat's room is
  // created server-side on join, so it may not be in `rooms` yet.
  const patchRoom = (id, patch, direct = false) =>
    setRooms((prev) =>
      prev.some((r) => r._id === id)
        ? prev.map((r) => (r._id === id ? { ...r, ...patch } : r))
        : [...prev, { _id: id, type: direct ? "direct" : "group", ...patch }],
    );

  // Where the open chat stands in the message-request flow, if it is one:
  // "incoming" = they asked me (Accept / Decline), "sent" = I asked and wait,
  // "declined" = they said no. null = a normal chat (or my first message).
  const activeId = activeUser?._id ? String(activeUser._id) : null;
  const incomingRequest = activeId
    ? requests.incoming.find((r) => String(r.user._id) === activeId)
    : null;
  const outgoingRequest = activeId
    ? requests.outgoing.find((r) => String(r.user._id) === activeId)
    : null;
  const isRequestChat =
    activeId &&
    !mutualFollowers.some((u) => String(u._id) === activeId) &&
    !requests.accepted.some((r) => String(r.user._id) === activeId);
  const sentMessageToThem = chatMessages.some((m) => String(m.senderId) === String(senderId));
  let requestState = null;
  if (incomingRequest) requestState = "incoming";
  else if (outgoingRequest?.status === "declined") requestState = "declined";
  else if (outgoingRequest || (isRequestChat && sentMessageToThem)) requestState = "sent";

  // After the first message to a non-mutual person, refresh so the request shows.
  const messageCount = chatMessages.length;
  useEffect(() => {
    if (isRequestChat) loadRequests();
  }, [isRequestChat, messageCount, loadRequests]);

  const activeRoomDoc = roomId ? roomsById[roomId] : null;
  const isMuted = Boolean(activeRoomDoc?.mySettings?.muted);
  const isBlockedByMe = Boolean(receiverId && blockedIds.includes(String(receiverId)));

  const handleToggleMute = async () => {
    if (!roomId) return;
    const next = !isMuted;
    try {
      await setRoomMuted(roomId, next);
      patchRoom(roomId, { mySettings: { muted: next } }, !isGroupActive);
      toast.success(next ? "Notifications muted" : "Notifications on");
    } catch (err) {
      toast.error(err.message || "Couldn't update notifications");
    }
  };

  const handleClearChat = async () => {
    if (!roomId) return;
    try {
      await clearRoom(roomId);
      setChatMessages([]);
      patchRoom(roomId, { lastMessage: null }, !isGroupActive);
      toast.success("Chat cleared");
    } catch (err) {
      toast.error(err.message || "Couldn't clear chat");
    }
  };

  const handleToggleBlock = async () => {
    if (!receiverId) return;
    const id = String(receiverId);
    try {
      if (isBlockedByMe) {
        await unblockUser(id);
        setBlockedIds((prev) => prev.filter((b) => b !== id));
        toast.success("User unblocked");
      } else {
        await blockUser(id);
        setBlockedIds((prev) => [...prev, id]);
        toast.success("User blocked");
      }
    } catch (err) {
      toast.error(err.message || "Couldn't update block");
    }
  };

  useEffect(() => {
    getBlockedIds()
      .then(({ blockedIds: ids }) => setBlockedIds(ids.map(String)))
      .catch((err) => console.error("Failed to load blocked users:", err));
  }, []);

  // "Message" on someone's profile arrives with that person in router state, so
  // the chat opens even when they aren't a mutual follower (first message = request).
  useEffect(() => {
    const target = location.state?.chatWith;
    if (target?._id) setActiveConversation({ kind: "direct", user: target });
  }, [location.state]);

  const handleAcceptRequest = async (request) => {
    try {
      await acceptChatRequest(request.roomId);
      toast.success("Request accepted");
      await loadRequests();
    } catch (err) {
      toast.error(err.message || "Couldn't accept the request");
    }
  };

  const handleDeclineRequest = async (request) => {
    try {
      await declineChatRequest(request.roomId);
      toast.success("Request declined");
      setActiveConversation((prev) =>
        prev?.kind === "direct" && String(prev.user._id) === String(request.user._id) ? null : prev,
      );
      await loadRequests();
    } catch (err) {
      toast.error(err.message || "Couldn't decline the request");
    }
  };

  const handleSendMessage = () => {
    if (!draftMessage.trim() || !roomId) return;
    socket.send(
      JSON.stringify({
        type: "send_message",
        roomId,
        text: draftMessage,
      }),
    );
    setDraftMessage("");
  };

  // emoji === null removes my reaction. The server broadcasts the result back
  // (including to me), so state updates in one place: the message_reaction case.
  const handleReact = (messageId, emoji) => {
    if (!roomId || !socket) return;
    socket.send(
      JSON.stringify({ type: "react_message", roomId, messageId, emoji }),
    );
  };

  // The server saves the clip and broadcasts it over the socket, so the new
  // bubble arrives through the same "sended_message" path as text.
  const handleSendVoice = async (blob, durationMs) => {
    if (!roomId) return;
    try {
      await sendVoiceMessage(roomId, blob, durationMs);
    } catch (err) {
      toast.error(err.message || "Couldn't send voice message");
    }
  };

  const handleSendAttachment = async (file) => {
    if (!roomId) return;
    try {
      await sendAttachment(roomId, file);
    } catch (err) {
      toast.error(err.message || "Couldn't send file");
    }
  };

  const fetchUsers = useCallback(async () => {
    setIsLoadingChats(true);
    try {
      const request = await apiFetch(
        `${API_BASE_URL}/my-profile/chats/mutual-followers`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
          },
        },
      );
      const response = await request.json();
      setMutualFollowers(response.mutualFollowers);
    } catch (err) {
      console.error("Failed to load mutual followers:", err);
      setMutualFollowers([]);
    } finally {
      setIsLoadingChats(false);
    }
  }, []);

  useEffect(() => {
    if (isGroupActive || !receiverId) {
      setUserStats(null);
      setIsLoadingUserStats(false);
      return;
    }

    const fetchReceiverStats = async () => {
      const startedAt = Date.now();
      setIsLoadingUserStats(true);
      setUserStats(null);
      try {
        const request = await apiFetch(
          `${API_BASE_URL}/my-profile/chats/${receiverId}/stats`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getAccessToken()}`,
            },
          },
        );

        const response = await request.json();
        setUserStats(response.stats);
      } catch (error) {
        console.error("Failed to load user stats:", error);
      } finally {
        const elapsed = Date.now() - startedAt;
        if (elapsed < MIN_USER_STATS_SKELETON_MS) {
          await new Promise((resolve) =>
            setTimeout(resolve, MIN_USER_STATS_SKELETON_MS - elapsed),
          );
        }
        setIsLoadingUserStats(false);
      }
    };
    fetchReceiverStats();
  }, [receiverId, isGroupActive]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();

    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return (
    <div className="flex min-h-dvh">
      <Sidebar />
      {!activeConversation ? (
        <>
          <div className="border-r w-full border-white/10 bg-white dark:bg-black lg:w-70 lg:pt-4  lg:px-0 lg:text-lg">
            <div className="flex items-center justify-between px-3">
              <h1 className="mt-3 lg:mt-0 text-lg font-semibold text-gray-900 dark:text-gray-100">
                Messages
              </h1>
              {/* New group */}
              <button
                type="button"
                onClick={() => setIsNewGroupOpen(true)}
                title="New group"
                aria-label="New group"
              >
                <SquarePen
                  size={15}
                  strokeWidth={1.75}
                  className="mt-3 lg:mt-0 cursor-pointer text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-200"
                />
              </button>
            </div>

            <div className="flex gap-1 px-3 pt-4" role="tablist" aria-label="Message folders">
              {[
                ["chats", "Chats"],
                ["requests", "Requests"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={tab === id}
                  onClick={() => setTab(id)}
                  className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-purple-500 ${
                    tab === id ? "bg-white/10 text-white" : "text-[#8A8A93] hover:text-white"
                  }`}
                >
                  {label}
                  {id === "requests" && requests.incoming.length > 0 && (
                    <span className="rounded-full bg-purple-600 px-1.5 text-xs font-semibold text-white">
                      {requests.incoming.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {tab === "chats" && (
            <div className="px-3 pt-5">
              <label
                htmlFor="chat-search"
                className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-100 px-3 py-[3px] transition focus-within:border-purple-400 dark:border-white/10 dark:bg-white/5"
              >
                <Search size={20} className="text-gray-400" aria-hidden="true" />
                <input
                  id="chat-search"
                  type="text"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Search conversations"
                  className="w-full bg-transparent text-base md:text-sm text-gray-700 outline-none placeholder:text-gray-400 dark:text-gray-200"
                />
              </label>

              <div className="relative flex justify-end py-2">
                <button
                  type="button"
                  onClick={() => setIsSortOpen((prev) => !prev)}
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/5"
                >
                  <ArrowUpDown size={16} />
                  <div className="flex items-center justify-center gap-1 ">
                    <span>{sortOrder}</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        isSortOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {isSortOpen && (
                  <div className="absolute top-full mt-0 w-36 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/10 dark:bg-black">
                    {["Newest", "Oldest"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setSortOrder(option);
                          setIsSortOpen(false);
                        }}
                        className={`block w-full px-3 py-2 text-left text-sm transition hover:bg-gray-50 dark:hover:bg-white/5 ${
                          sortOrder === option
                            ? "bg-purple-50 text-purple-600 dark:bg-white/5 dark:text-purple-600"
                            : "text-gray-700 dark:text-gray-200"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            )}

            <div className="max-h-[calc(100dvh-180px)] thin-scrollbar overflow-y-auto bg-white dark:bg-black">
              {tab === "requests" ? (
                requests.incoming.length === 0 ? (
                  <p className="px-3 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    No message requests
                  </p>
                ) : (
                  requests.incoming.map((request) => {
                    const name = `${request.user.firstName} ${request.user.lastName}`.trim();
                    return (
                      <div key={request.roomId} className="border-b border-white/5 px-3 py-3">
                        <button
                          type="button"
                          onClick={() => setActiveConversation({ kind: "direct", user: request.user })}
                          className="flex w-full items-center gap-3 text-left focus-visible:outline-2 focus-visible:outline-purple-500"
                        >
                          {request.user.stats?.profileImage ? (
                            <img
                              src={request.user.stats.profileImage}
                              alt=""
                              className="h-8 w-8 shrink-0 rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-fuchsia-950/40 text-fuchsia-300">
                              {name[0]?.toUpperCase()}
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-100">{name}</p>
                            <p className="truncate text-xs text-[#8A8A93]">{request.preview}</p>
                          </div>
                        </button>
                        <div className="mt-2 flex gap-2 pl-11">
                          <button
                            type="button"
                            onClick={() => handleAcceptRequest(request)}
                            className="cursor-pointer rounded-lg bg-purple-600 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-purple-500"
                          >
                            Accept
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeclineRequest(request)}
                            className="cursor-pointer rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-white/10"
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    );
                  })
                )
              ) : isLoadingChats ? (
                <div className="flex justify-center items-center px-3 py-6 text-sm text-gray-500 dark:text-gray-100">
                  <LoadingChatSuspense />
                </div>
              ) : filteredConversations.length > 0 ? (
                filteredConversations.map((item) => {
                  const shouldShowLastMessageSkeleton =
                    isLoadingLastMessages && !item.preview;
                  const isActive =
                    item.kind === "group"
                      ? isGroupActive && activeRoom?._id === item.room._id
                      : !isGroupActive && activeUser?._id === item.user._id;

                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() =>
                        setActiveConversation(
                          item.kind === "group"
                            ? { kind: "group", room: item.room }
                            : { kind: "direct", user: item.user },
                        )
                      }
                      aria-current={isActive ? "true" : undefined}
                      className={`flex w-full items-center gap-3 border-b border-white/5 px-3 py-3 text-left transition-colors first:border-t focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-fuchsia-400
                  ${
                    isActive
                      ? "bg-fuchsia-950/30"
                      : "hover:bg-white/5"
                  }
                    `}
                    >
                      {item.avatar ? (
                        <img
                          src={item.avatar}
                          alt="Profile"
                          className="h-8 w-8 shrink-0 rounded-full bg-purple-100 object-cover"
                        />
                      ) : (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-fuchsia-950/40 dark:text-fuchsia-300">
                          {item.kind === "group" ? (
                            <Users size={14} />
                          ) : (
                            item.title?.[0]?.toUpperCase()
                          )}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-1.5 text-sm font-medium text-gray-100">
                          <span className="truncate">{item.title}</span>
                          {item.muted && (
                            <BellOff
                              size={12}
                              className="shrink-0 text-[#8A8A93]"
                              aria-label="Muted"
                            />
                          )}
                        </p>
                        <div className="flex justify-between items-center">
                          {shouldShowLastMessageSkeleton ? (
                            <>
                              <Skeleton
                                width={120}
                                height={12}
                                borderRadius={6}
                                baseColor={skeletonBaseColor}
                                highlightColor={skeletonHighlightColor}
                                className="opacity-80"
                              />
                              <Skeleton
                                width={44}
                                height={12}
                                borderRadius={6}
                                baseColor={skeletonBaseColor}
                                highlightColor={skeletonHighlightColor}
                                className="opacity-80"
                              />
                            </>
                          ) : (
                            <>
                              <p className="truncate text-xs text-[#8A8A93]">
                                {item.preview?.text || "No messages yet"}
                              </p>
                              {item.preview && (
                                <p className="ml-2 shrink-0 text-xs text-[#8A8A93]">
                                  {formatTimeAgo(item.preview.updatedAt)}
                                </p>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })
              ) : mutualFollowers.length > 0 ? (
                <p className="flex justify-center items-center px-3 py-6 text-sm text-gray-500 dark:text-gray-400">
                  No conversations found
                </p>
              ) : (
                <p className="flex justify-center items-center px-3 py-6 text-sm text-gray-500 dark:text-gray-400">
                  No users found
                </p>
              )}
            </div>
          </div>
          <div className="hidden min-w-0 flex-1 items-center justify-center p-4 lg:flex">
            <div className="mx-auto grid items-center justify-center text-center text-gray-500 dark:text-gray-400">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-[0.5px] border-white text-white">
                <Send size={44} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h2 className="pt-2 text-xl font-semibold text-gray-800 dark:text-gray-100">
                Your messages
              </h2>
              <p className=" mt-2">
                Send a message to start a chat.
              </p>
            </div>
          </div>
        </>
      ) : (
          <ChatInterface
            isGroup={isGroupActive}
            group={activeRoom}
            userSelected={activeUser}
            userStats={userStats}
            isMobile={isMobile}
            isLoadingUserStats={isLoadingUserStats}
            clickedUser={clickedUser}
            isLoadingHistory={isLoadingHistory}
            chatMessages={chatMessages}
            senderId={senderId}
            mutualFollowers={mutualFollowers}
            draftMessage={draftMessage}
            setDraftMessage={setDraftMessage}
            handleSendMessage={handleSendMessage}
            onReact={handleReact}
            onSendVoice={handleSendVoice}
            onSendAttachment={handleSendAttachment}
            isMuted={isMuted}
            isBlockedByMe={isBlockedByMe}
            requestState={requestState}
            onAcceptRequest={() => incomingRequest && handleAcceptRequest(incomingRequest)}
            onDeclineRequest={() => incomingRequest && handleDeclineRequest(incomingRequest)}
            onToggleMute={handleToggleMute}
            onClearChat={handleClearChat}
            onToggleBlock={handleToggleBlock}
            onBack={() => setActiveConversation(null)}
            onLeftGroup={() => setActiveConversation(null)}
          />
      )}

      {isNewGroupOpen && (
        <NewGroupModal
          mutualFollowers={mutualFollowers}
          onClose={() => setIsNewGroupOpen(false)}
          onCreated={(room) => {
            setRooms((prev) => [...prev, room]);
            setActiveConversation({ kind: "group", room });
          }}
        />
      )}
    </div>
  );
};

export default Chats;
