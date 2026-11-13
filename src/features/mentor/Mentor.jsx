import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AlertTriangle, RefreshCw, X, GraduationCap, PanelLeft } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import useMentorStore from "@/stores/useMentorStore";
import useAgentStream from "./hooks/useAgentStream";
import SessionsSidebar from "./components/SessionsSidebar";
import ChatTopBar from "./components/ChatTopBar";
import MessageList from "./components/MessageList";
import ChatInput from "./components/ChatInput";
import AgentHero from "./components/AgentHero";
import PromptChips from "./components/PromptChips";
import { getAccessToken } from "../../../constants/api";
import { readMentorOrigin } from "./lib/mentorOrigin";
import {
  listSessions,
  getSession,
  createSession,
  updateSession,
  deleteSession,
  deleteAllSessions,
  getMentorContext,
  submitTeachBack,
} from "@/services/mentorApi";

/**
 * Placeholder title shown for the second or so before the generated one arrives.
 * Breaks on a word boundary so the sidebar never shows a chopped-off word.
 */
const placeholderTitle = (text) => {
  const clean = text.trim().replace(/\s+/g, " ");
  if (clean.length <= 48) return clean;
  const cut = clean.slice(0, 48);
  const lastSpace = cut.lastIndexOf(" ");
  return `${lastSpace > 20 ? cut.slice(0, lastSpace) : cut}…`;
};

/**
 * `embedded` renders the chat inside another page (the challenge arena's side
 * panel): no sessions sidebar, fills its parent instead of the viewport, and
 * starts a fresh conversation tied to `challengeContext`, which is what the
 * full page receives through router state when navigated to.
 *
 * `origin` + `initialPrompt` do the same for any other page (MentorPanel): a
 * fresh conversation about where the learner was, with the question pre-filled
 * but NOT sent, so they can edit it before it spends one of their daily messages.
 */
export default function Mentor({ embedded = false, challengeContext = null, origin = null, initialPrompt = "" }) {
  // The composer draft lives here because the hero's prompt chips sit outside
  // ChatInput and need to write into it.
  const [draft, setDraft] = useState("");
  // Phones have no sidebar, so the sessions list opens as a drawer from here.
  const [sessionsOpen, setSessionsOpen] = useState(false);
  const [focusToken, setFocusToken] = useState(0);
  const [teachBackContext, setTeachBackContext] = useState(null);
  // Where the learner came from, sent with every message so the mentor can
  // resolve "this" and "why did it fail". Kept SEPARATE from teachBackContext,
  // which is cleared as soon as teach-back mode is used or dismissed — the origin
  // is still useful context for an ordinary question afterwards.
  const [originContext, setOriginContext] = useState({ surface: "chat" });

  const location = useLocation();
  const navigate = useNavigate();

  // Arriving from the exam results "Teach it back" nudge: capture the topic
  // context once, then clear router state so a refresh/back doesn't re-trigger it.
  useEffect(() => {
    if (location.state?.teachBack) {
      const { path, layer, topic } = location.state.teachBack;
      setTeachBackContext({ mode: "initial", path, layer, topic });
      setOriginContext({ surface: "exam-results", path, layer, topic });
      setFocusToken((n) => n + 1);
      navigate(".", { replace: true, state: {} });
    } else if (location.state?.challenge) {
      // Arriving from the challenge arena's "Ask mentor": the slug lets the
      // mentor fetch the attempt itself, so nothing else is passed along.
      const { path, layer, topic, challengeSlug } = location.state.challenge;
      setOriginContext({ surface: "challenge", path, layer, topic, challengeSlug });
      setFocusToken((n) => n + 1);
      navigate(".", { replace: true, state: {} });
    } else if (location.state?.origin) {
      // Any other page's "Ask the mentor" link (see lib/mentorOrigin.js).
      const origin = readMentorOrigin(location.state.origin);
      if (origin) setOriginContext(origin);
      setFocusToken((n) => n + 1);
      navigate(".", { replace: true, state: {} });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);


  // A selector, not the whole store: `streamingContent` changes on every token, and
  // subscribing to it here would re-render this page (sidebar, composer, list)
  // dozens of times a second while a reply streams. Only whether text exists is
  // needed here; MessageList's StreamingAnswer reads the text itself.
  const {
    sessions: storeSessions,
    activeSessionId: storeActiveSessionId,
    messages: storeMessages,
    isStreaming,
    isLoadingSession,
    isLoadingSessions,
    sessionsTotal,
    sessionsHasMore,
    isLoadingMoreSessions,
    error,
    setActiveSession,
    setSessions,
    setError,
  } = useMentorStore(
    useShallow((s) => ({
      sessions: s.sessions,
      activeSessionId: s.activeSessionId,
      messages: s.messages,
      isStreaming: s.isStreaming,
      isLoadingSession: s.isLoadingSession,
      isLoadingSessions: s.isLoadingSessions,
      sessionsTotal: s.sessionsTotal,
      sessionsHasMore: s.sessionsHasMore,
      isLoadingMoreSessions: s.isLoadingMoreSessions,
      error: s.error,
      setActiveSession: s.setActiveSession,
      setSessions: s.setSessions,
      setError: s.setError,
    })),
  );
  const hasStreamText = useMentorStore((s) => s.streamingContent !== "");

  // Server-side title search. Kept apart from the store's list so clearing the
  // box restores the normal list instantly, with no refetch. `searchSeq` marks
  // the latest query: a slower, older response is dropped instead of overwriting.
  const [search, setSearch] = useState(null);
  const searchSeq = useRef(0);

  const { sendMessage } = useAgentStream();

  const sessions = storeSessions;
  const activeSessionId = storeActiveSessionId;
  const messages = storeMessages;

  // "New chat" is a state, not a page: no messages, nothing streaming, and no
  // session being loaded.
  const isEmptyChat =
    messages.length === 0 && !isStreaming && !isLoadingSession && !hasStreamText;

  // null (not a placeholder) when there's no conversation yet — ChatTopBar
  // renders nothing at all in that case.
  const activeTitle = activeSessionId
    ? (sessions.find((s) => s._id === activeSessionId)?.title ?? null)
    : null;

  // React Router keeps the window scroll position across navigations, so arriving
  // from the scrolled landing page would drop you into this full-height chat view
  // already scrolled down. Same fix ChallengeArena.jsx uses.
  useEffect(() => {
    if (!embedded) window.scrollTo(0, 0);
  }, [embedded]);

  // Embedded in a challenge: every challenge gets its own fresh conversation,
  // so a transcript from another challenge (or the full page) never claims to
  // be about this one. The slug lets the mentor fetch the attempt itself.
  const ctxSlug = challengeContext?.challengeSlug;
  const ctxPath = challengeContext?.path;
  const ctxLayer = challengeContext?.layer;
  const ctxTopic = challengeContext?.topic;
  useEffect(() => {
    if (!embedded || !ctxSlug) return;
    setActiveSession(null);
    useMentorStore.getState().setMessages([]);
    setError(null);
    setOriginContext({ surface: "challenge", path: ctxPath, layer: ctxLayer, topic: ctxTopic, challengeSlug: ctxSlug });
    setFocusToken((n) => n + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [embedded, ctxSlug, ctxPath, ctxLayer, ctxTopic]);

  const originKey = embedded && !ctxSlug && origin ? JSON.stringify(origin) : null;
  useEffect(() => {
    if (!originKey) return;
    setActiveSession(null);
    useMentorStore.getState().setMessages([]);
    setError(null);
    setOriginContext(readMentorOrigin(JSON.parse(originKey)) ?? { surface: "chat" });
    setDraft(initialPrompt);
    setFocusToken((n) => n + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originKey, initialPrompt]);

  // A page can overlap the list (a chat created or bumped meanwhile), and a
  // duplicate _id would render the same row twice.
  const mergeById = (existing, incoming) => {
    const known = new Set(existing.map((s) => s._id));
    return [...existing, ...incoming.filter((s) => !known.has(s._id))];
  };

  // load sessions list on mount (the embedded chat has no sessions list)
  useEffect(() => {
    if (embedded) return;
    const loadSessions = async () => {
      try {
        const data = await listSessions();
        useMentorStore.getState().setSessionsPage({
          sessions: data.sessions ?? [],
          total: data.total ?? (data.sessions ?? []).length,
          hasMore: data.hasMore,
        });
      } catch { /* non-fatal */ }
      finally {
        useMentorStore.getState().setLoadingSessions(false);
      }
    };
    loadSessions();
  }, [embedded]);

  const loadMoreSessions = async () => {
    const store = useMentorStore.getState();
    if (store.isLoadingMoreSessions) return;
    // Pinned chats all arrive on the first page, so the cursor is the oldest unpinned one.
    const before = store.sessions.findLast((s) => !s.pinned)?.updatedAt;
    if (!before) return;

    store.setLoadingMoreSessions(true);
    try {
      const data = await listSessions({ before });
      const current = useMentorStore.getState();
      current.setSessionsPage({
        sessions: mergeById(current.sessions, data.sessions ?? []),
        total: data.total,
        hasMore: data.hasMore,
      });
    } catch { /* the button stays, so they can retry */ }
    finally {
      useMentorStore.getState().setLoadingMoreSessions(false);
    }
  };

  // The text search and the "challenge chats" filter share one server-side view of
  // all the learner's chats, so either (or both) being set turns it on.
  const searchParams = (q, challenge) => ({ ...(q && { q }), ...(challenge && { challenge: "true" }) });

  const handleSearch = async (q, challenge = false) => {
    const seq = ++searchSeq.current;
    if (!q && !challenge) {
      setSearch(null);
      return;
    }
    // Keep the previous results on screen while the next ones load, so typing
    // doesn't flash a skeleton on every keystroke.
    setSearch((prev) => ({
      query: q,
      challenge,
      sessions: prev?.sessions ?? [],
      hasMore: prev?.hasMore ?? false,
      loading: true,
      loadingMore: false,
    }));
    let next;
    try {
      const data = await listSessions(searchParams(q, challenge));
      next = { sessions: data.sessions ?? [], hasMore: Boolean(data.hasMore) };
    } catch {
      next = { sessions: [], hasMore: false };
    }
    if (seq !== searchSeq.current) return;
    setSearch({ query: q, challenge, ...next, loading: false, loadingMore: false });
  };

  const loadMoreSearch = async () => {
    if (!search || search.loadingMore) return;
    const before = search.sessions.at(-1)?.updatedAt;
    if (!before) return;

    const seq = searchSeq.current;
    setSearch((s) => s && { ...s, loadingMore: true });
    try {
      const data = await listSessions({ ...searchParams(search.query, search.challenge), before });
      if (seq !== searchSeq.current) return;
      setSearch((s) => s && {
        ...s,
        sessions: mergeById(s.sessions, data.sessions ?? []),
        hasMore: Boolean(data.hasMore),
        loadingMore: false,
      });
    } catch {
      if (seq === searchSeq.current) setSearch((s) => s && { ...s, loadingMore: false });
    }
  };

  // Rename, pin and delete must show up in the search results too, not just the main list.
  const patchSearch = (fn) => setSearch((s) => (s ? { ...s, sessions: fn(s.sessions) } : s));

  const handleSelectSession = async (sessionId) => {
    // Ignore a click on the session that's already open — it would clear a
    // loaded transcript and re-fetch it for nothing.
    if (sessionId === storeActiveSessionId) return;

    const store = useMentorStore.getState();
    setActiveSession(sessionId);
    store.setMessages([]);
    store.setLoadingSession(true);
    setError(null);
    // Opening another conversation ends the connection to wherever they arrived
    // from — otherwise an old chat still claims they are on that exam page.
    setOriginContext({ surface: "chat" });

    try {
      const session = await getSession(sessionId);
      useMentorStore.getState().setMessages(
        (session.messages ?? []).map((m) => ({ role: m.role, content: m.content }))
      );
    } catch {
      // Surface the failure: a silent empty transcript looks like a genuinely empty
      // conversation. Distinct from "network" so the banner doesn't offer a Retry
      // that would try to RE-SEND a message instead of re-loading the conversation.
      setError({ type: "session_load", message: "Couldn't load this conversation." });
    } finally {
      useMentorStore.getState().setLoadingSession(false);
    }
  };

  const handleNewSession = async () => {
    try {
      const session = await createSession("New conversation");
      setSessions([session, ...useMentorStore.getState().sessions]);
      useMentorStore.getState().adjustSessionsTotal(1);
      setActiveSession(session._id);
      useMentorStore.getState().setMessages([]);
      // A deliberately fresh conversation carries no arrival context.
      setOriginContext({ surface: "chat" });
    } catch { /* non-fatal */ }
  };

  /**
   * Send a message, creating a session first if this is a fresh chat
   * ("new chat" is the state where activeSessionId is null; no navigation).
   */
  const handleSend = async (text, attachments = []) => {
    const token = getAccessToken();
    setDraft("");

    // Teach-Back mode: the answer is graded against a rubric, not sent to the
    // general agent — same "never touch the daily message cap" reasoning /context uses.
    if (teachBackContext) {
      const ctx = teachBackContext;
      appendMessage({ role: "user", content: text });
      appendMessage({ role: "teach_back", loading: true });
      setTeachBackContext(null);

      const isFollowUp = ctx.mode === "followup";
      const body = isFollowUp
        ? { sessionId: ctx.sessionId, answerText: text }
        : { path: ctx.path, layer: ctx.layer, topic: ctx.topic, answerText: text };

      try {
        const data = await submitTeachBack(body, { followUp: isFollowUp });
        replaceLastTeachBack({ role: "teach_back", data });
      } catch (err) {
        replaceLastTeachBack({ role: "teach_back", error: err.message || "Couldn't grade this explanation." });
      }
      return;
    }

    // Slash commands are handled entirely client-side — they never reach the
    // model, so they cost nothing and don't consume the daily message cap.
    if (text.trim() === "/context") {
      appendMessage({ role: "context", loading: true });
      try {
        const data = await getMentorContext();
        replaceLastContext({ role: "context", data });
      } catch {
        replaceLastContext({ role: "context", error: "Couldn't load context." });
      }
      return;
    }

    let sessionId = storeActiveSessionId;

    if (!sessionId) {
      try {
        const session = await createSession(placeholderTitle(text));
        sessionId = session._id;
        setActiveSession(sessionId);
        setSessions([session, ...useMentorStore.getState().sessions]);
        useMentorStore.getState().adjustSessionsTotal(1);
      } catch {
        // Session creation failed — the stream route creates one server-side
        // when sessionId is null, so the message still goes through.
        sessionId = null;
      }
    }

    sendMessage({ sessionId, content: text, token, attachments, activity: originContext });
  };

  const handleRenameSession = async (sessionId, title) => {
    // Optimistic: the rename is trivially reversible and the list should feel
    // instant. On failure we restore the previous title rather than leave a lie.
    const previous = useMentorStore.getState().sessions;
    const previousTitle = previous.find((s) => s._id === sessionId)?.title;
    const retitle = (to) => (list) => list.map((s) => (s._id === sessionId ? { ...s, title: to } : s));
    setSessions(retitle(title)(previous));
    patchSearch(retitle(title));

    try {
      await updateSession(sessionId, { title });
    } catch {
      setSessions(previous);
      patchSearch(retitle(previousTitle));
      setError({ type: "session_load", message: "Couldn't rename this chat." });
    }
  };

  const handleTogglePinSession = async (sessionId, pinned) => {
    const previous = useMentorStore.getState().sessions;

    // Re-sort locally to match the server's `pinned desc, updatedAt desc`, so the
    // row jumps to its new group immediately instead of after the next reload.
    const next = previous
      .map((s) => (s._id === sessionId ? { ...s, pinned } : s))
      .sort(
        (a, b) =>
          Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)) ||
          new Date(b.updatedAt ?? 0) - new Date(a.updatedAt ?? 0),
      );
    setSessions(next);
    const repin = (to) => (list) => list.map((s) => (s._id === sessionId ? { ...s, pinned: to } : s));
    patchSearch(repin(pinned));

    try {
      await updateSession(sessionId, { pinned });
    } catch {
      setSessions(previous);
      patchSearch(repin(!pinned));
      setError({ type: "session_load", message: "Couldn't update this chat." });
    }
  };

  const handleDeleteSession = async (sessionId) => {
    const previous = useMentorStore.getState().sessions;
    const previousSearch = search;
    setSessions(previous.filter((s) => s._id !== sessionId));
    patchSearch((list) => list.filter((s) => s._id !== sessionId));
    useMentorStore.getState().adjustSessionsTotal(-1);

    // Deleting the conversation you're reading has to reset the view too,
    // otherwise the transcript stays on screen with no session behind it.
    if (sessionId === useMentorStore.getState().activeSessionId) {
      setActiveSession(null);
      useMentorStore.getState().setMessages([]);
    }

    try {
      await deleteSession(sessionId);
    } catch {
      setSessions(previous);
      setSearch(previousSearch);
      useMentorStore.getState().adjustSessionsTotal(1);
      setError({ type: "session_load", message: "Couldn't delete this chat." });
    }
  };

  // Clears the sidebar at once and puts it back if the server says no, like single delete.
  const handleDeleteAllSessions = async ({ keepPinned }) => {
    const store = useMentorStore.getState();
    const previous = store.sessions;
    const previousTotal = store.sessionsTotal;
    const previousHasMore = store.sessionsHasMore;
    const previousSearch = search;
    const kept = keepPinned ? previous.filter((s) => s.pinned) : [];
    setSessions(kept);
    // Everything unpinned is gone, so there is no further page to load.
    store.setSessionsTotal(kept.length);
    store.setSessionsHasMore(false);
    patchSearch((list) => list.filter((s) => kept.some((k) => k._id === s._id)));

    // The open chat goes too unless it's a pinned one being kept.
    const activeId = store.activeSessionId;
    if (activeId && !kept.some((s) => s._id === activeId)) {
      setActiveSession(null);
      store.setMessages([]);
    }

    try {
      await deleteAllSessions({ keepPinned });
    } catch {
      setSessions(previous);
      setSearch(previousSearch);
      useMentorStore.getState().setSessionsTotal(previousTotal);
      useMentorStore.getState().setSessionsHasMore(previousHasMore);
      setError({ type: "session_load", message: "Couldn't delete your chats." });
    }
  };

  const appendMessage = (msg) =>
    useMentorStore.getState().appendMessage(msg);

  // /context appends a placeholder, then swaps it for the loaded result.
  const replaceLastContext = (msg) => {
    const store = useMentorStore.getState();
    const next = [...store.messages];
    const i = next.findLastIndex((m) => m.role === "context" && m.loading);
    if (i === -1) return;
    next[i] = msg;
    store.setMessages(next);
  };

  // Same swap-the-placeholder pattern as /context, for teach-back grading.
  const replaceLastTeachBack = (msg) => {
    const store = useMentorStore.getState();
    const next = [...store.messages];
    const i = next.findLastIndex((m) => m.role === "teach_back" && m.loading);
    if (i === -1) return;
    next[i] = msg;
    store.setMessages(next);
  };

  // "Answer" on a TeachBackCard's follow-up re-arms teach-back mode, scoped to
  // just that one weak criterion via sessionId — no path/layer/topic needed.
  const handleAnswerFollowUp = (resultData) => {
    if (!resultData.followUp) return;
    setTeachBackContext({
      mode: "followup",
      sessionId: resultData.sessionId,
      topic: resultData.followUp.question,
    });
    setFocusToken((n) => n + 1);
  };

  // Prompt chips and menu shortcuts fill the composer; the token bump tells
  // ChatInput to focus and park the caret at the end.
  const insertPrompt = (prompt) => {
    setDraft(prompt);
    setFocusToken((n) => n + 1);
  };

  return (
    <div
      className={`flex bg-black text-[#e5e5e5] ${
        embedded ? "h-full" : "h-[calc(100dvh-var(--navbar-h,44px))]"
      }`}
    >
      {!embedded && (
        <SessionsSidebar
          loading={isLoadingSessions}
          sessions={sessions}
          total={sessionsTotal}
          hasMore={sessionsHasMore}
          loadingMore={isLoadingMoreSessions}
          onLoadMore={loadMoreSessions}
          search={search}
          onSearch={handleSearch}
          onLoadMoreSearch={loadMoreSearch}
          activeSessionId={activeSessionId}
          onSelectSession={handleSelectSession}
          onNewSession={handleNewSession}
          onRenameSession={handleRenameSession}
          onDeleteSession={handleDeleteSession}
          onDeleteAllSessions={handleDeleteAllSessions}
          onTogglePinSession={handleTogglePinSession}
          mobileOpen={sessionsOpen}
          onMobileClose={() => setSessionsOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0 relative">
        {!embedded && (
        <button
          type="button"
          onClick={() => setSessionsOpen(true)}
          aria-label="Open sessions"
          className="absolute top-2 left-2 z-30 flex h-9 w-9 items-center justify-center rounded-lg text-white/70 after:absolute after:-inset-1 hover:bg-white/10 hover:text-white md:hidden"
        >
          <PanelLeft size={18} strokeWidth={2} />
        </button>
        )}
        {activeTitle && (
          <div className="absolute top-0 inset-x-0 z-20">
            <ChatTopBar title={activeTitle} messages={messages} />
          </div>
        )}

        {error && (
          <div
            className="mx-4 mt-12 md:mt-2 px-4 py-3 rounded-xl flex items-start gap-3 text-[13px] shrink-0"
            style={{ backgroundColor: "#1a0e0e", border: "1px solid #4a1a1a", color: "#f87171" }}
          >
            <AlertTriangle size={15} className="shrink-0 mt-0.5" />
            <span className="flex-1">
              {error.type === "rate_limit"
                ? `Daily limit reached (30 messages/day).${error.resetAt ? ` Resets at ${new Date(error.resetAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}.` : ""}`
                : error.type === "session_load" || error.type === "paused"
                  ? error.message
                  : "Connection error. Your message was not sent."}
            </span>
            {error.type === "network" && (
              <button
                onClick={() => {
                  setError(null);
                  handleSend(messages.findLast?.((m) => m.role === "user")?.content ?? "");
                }}
                className="flex items-center gap-1 text-[12px] underline underline-offset-2 shrink-0 hover:opacity-80"
              >
                <RefreshCw size={12} /> Retry
              </button>
            )}
            <button onClick={() => setError(null)} aria-label="Dismiss error" className="shrink-0 hover:opacity-60 -m-3 p-3">
              <X size={14} />
            </button>
          </div>
        )}

        {/* One flex column holds transcript-or-hero AND the composer, so the
            SAME ChatInput instance serves both states — mounting a second copy
            inside the hero would reset its attachment state on the first send.

            Empty state: justify-center centres [greeting → composer → chips]
            as one block. Conversation: MessageList takes flex-1 and pushes the
            composer to the bottom. */}
        <div
          className={`flex-1 flex flex-col min-h-0 ${
            isEmptyChat ? "justify-center overflow-y-auto py-8 gap-5 sm:gap-7" : ""
          }`}
        >
          {isEmptyChat ? (
            <AgentHero compact={embedded} />
          ) : (
            <MessageList
              messages={messages}
              isLoadingSession={isLoadingSession}
              isStreaming={isStreaming}
              onAnswerFollowUp={handleAnswerFollowUp}
              topInset={Boolean(activeTitle)}
            />
          )}

          {teachBackContext && (
            <div className="max-w-3xl mx-auto w-full px-4 sm:px-8 mb-2 flex items-center justify-between gap-3 text-[12px] rounded-lg border border-purple-700/40 bg-purple-950/20 px-3 py-2">
              <span className="flex items-center gap-1.5 text-purple-300">
                <GraduationCap size={13} />
                {teachBackContext.mode === "followup" ? (
                  <>Follow-up: <strong>{teachBackContext.topic}</strong></>
                ) : (
                  <>Teach-Back: explain <strong>{teachBackContext.topic}</strong> in your own words</>
                )}
              </span>
              <button onClick={() => setTeachBackContext(null)} aria-label="Cancel teach-back" className="text-purple-400/60 hover:text-purple-300 -m-3 p-3">
                <X size={13} />
              </button>
            </div>
          )}

          <ChatInput
            isStreaming={isStreaming}
            onSend={handleSend}
            value={draft}
            onValueChange={setDraft}
            focusToken={focusToken}
            spacious={isEmptyChat && !embedded}
            stacked={embedded}
            />
            {isEmptyChat && !embedded && <PromptChips onSelectPrompt={insertPrompt} />}

        </div>
      </div>
    </div>
  );
}
