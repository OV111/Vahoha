import { create } from "zustand";

const useMentorStore = create((set) => ({
  sessions: [],
  activeSessionId: null,
  messages: [],
  isStreaming: false,
  // True while an existing session's history is being fetched. Without this the
  // transcript is cleared first and the empty-state ("start a conversation")
  // flashes, making a conversation with history look empty while it loads.
  isLoadingSession: false,
  // True until the sessions list has answered (success or failure). Without it the
  // sidebar says "No sessions yet" while the list is still on its way.
  isLoadingSessions: true,
  setLoadingSessions: (isLoadingSessions) => set({ isLoadingSessions }),
  streamingContent: "",
  error: null,
  // Token usage of the most recent turn ({ promptTokens, completionTokens, totalTokens }).
  // Belongs to one conversation, so it is cleared whenever the active session changes.
  lastUsage: null,
  setLastUsage: (lastUsage) => set({ lastUsage }),
  setActiveSession: (sessionId) => set({ activeSessionId: sessionId, lastUsage: null }),
  setLoadingSession: (isLoadingSession) => set({ isLoadingSession }),
  setSessions: (sessions) => set({ sessions }),
  // The list is paged, so `sessions.length` is not the learner's chat count.
  // Older servers send no total/hasMore: null total falls back to the list length.
  sessionsTotal: null,
  sessionsHasMore: false,
  isLoadingMoreSessions: false,
  setSessionsPage: ({ sessions, total, hasMore }) =>
    set((state) => ({
      sessions,
      sessionsTotal: total ?? state.sessionsTotal,
      sessionsHasMore: Boolean(hasMore),
    })),
  setSessionsTotal: (sessionsTotal) => set({ sessionsTotal }),
  adjustSessionsTotal: (delta) =>
    set((state) => ({
      sessionsTotal:
        state.sessionsTotal === null ? null : Math.max(0, state.sessionsTotal + delta),
    })),
  setSessionsHasMore: (sessionsHasMore) => set({ sessionsHasMore }),
  setLoadingMoreSessions: (isLoadingMoreSessions) => set({ isLoadingMoreSessions }),
  setMessages: (messages) => set({ messages }),
  appendMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setStreaming: (isStreaming) => set({ isStreaming }),
  appendStreamChunk: (chunk) =>
    set((state) => ({ streamingContent: state.streamingContent + chunk })),
  clearStream: () => set({ streamingContent: "" }),
  setError: (error) => set({ error }),
  reset: () =>
    set({
      sessions: [],
      sessionsTotal: null,
      sessionsHasMore: false,
      isLoadingMoreSessions: false,
      activeSessionId: null,
      messages: [],
      isStreaming: false,
      isLoadingSession: false,
      isLoadingSessions: true,
      streamingContent: "",
      error: null,
      lastUsage: null,
    }),
}));

export default useMentorStore;
