import { useRef, useCallback } from "react";
import useMentorStore from "@/stores/useMentorStore";
import { apiFetch } from "@/lib/session";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

// A 16 ms timer stands in where there is no animation frame (tests, old runtimes).
const nextFrame =
  typeof requestAnimationFrame === "function" ? (fn) => requestAnimationFrame(fn) : (fn) => setTimeout(fn, 16);
const cancelFrame =
  typeof cancelAnimationFrame === "function" ? (id) => cancelAnimationFrame(id) : (id) => clearTimeout(id);

export default function useAgentStream() {
  const abortRef = useRef(null);

  const sendMessage = useCallback(async ({ sessionId, content, token, attachments = [], activity = null }) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    
    const {
      appendMessage: append,
      setStreaming,
      appendStreamChunk,
      clearStream,
      setError,
    } = useMentorStore.getState();

    // Optimistically add user message. We show the typed text plus the file
    // chips — NOT the composed prompt the server builds, which would dump the
    // whole file into the transcript.
    append({
      role: "user",
      content,
      attachments: attachments.map((a) => ({ name: a.name, bytes: a.bytes })),
    });

    setStreaming(true);
    clearStream();
    setError(null);

    // Declared out here so the abort path can keep what already arrived.
    let assistantContent = "";

    // Tokens can arrive faster than the screen refreshes, and each store write
    // re-renders the answer being typed, so they are written once per frame.
    let pendingChunk = "";
    let frame = null;
    const flushChunk = () => {
      frame = null;
      if (!pendingChunk) return;
      appendStreamChunk(pendingChunk);
      pendingChunk = "";
    };

    try {
      const res = await apiFetch(`${BASE_URL}/api/mentor/stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sessionId,
          message: content,
          // strip UI-only fields (bytes/truncated) — the server schema is strict
          ...(attachments.length
            ? { attachments: attachments.map((a) => ({ name: a.name, content: a.content })) }
            : {}),
          // Where the learner is as they type, so the mentor can resolve "this"
          // and "why did it fail". Omitted entirely when unknown — the server
          // schema rejects a partial object without a surface.
          ...(activity?.surface ? { activity } : {}),
        }),
        signal: controller.signal,
      });

      if (res.status === 429) {
        const data = await res.json().catch(() => ({}));
        setError({ type: "rate_limit", resetAt: data.resetAt ?? null });
        setStreaming(false);
        return;
      }

      // 423: the mentor is paused during a live capstone defense. Show the
      // server's own explanation instead of a generic connection error.
      if (res.status === 423) {
        const data = await res.json().catch(() => ({}));
        setError({ type: "paused", message: data.message ?? "Your mentor is paused right now." });
        setStreaming(false);
        return;
      }

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        // Keep incomplete last line in buffer
        buffer = lines.pop();

        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const raw = line.slice(5).trim();
          if (!raw || raw === "[DONE]") continue;

          let event;
          try {
            event = JSON.parse(raw);
          } catch {
            continue;
          }

          if (event.type === "delta") {
            assistantContent += event.content;
            pendingChunk += event.content;
            frame ??= nextFrame(flushChunk);
          } else if (event.type === "tool_call") {
            // The trace UI shows these as plain-language steps; the timestamps give
            // its "Thought for Ns" summary.
            useMentorStore.getState().appendMessage({
              role: "tool_call",
              id: event.id,
              name: event.name,
              input: event.input,
              status: "running",
              startedAt: Date.now(),
            });
          } else if (event.type === "tool_result") {
            const { messages, setMessages } = useMentorStore.getState();
            const updated = messages.map((m) =>
              m.role === "tool_call" && m.id === event.id
                ? { ...m, status: "done", result: event.result, endedAt: Date.now() }
                : m,
            );
            setMessages(updated);
          } else if (event.type === "title") {
            // The server auto-titled this conversation; swap the truncated
            // placeholder in the sidebar for the generated name.
            const { sessions, setSessions } = useMentorStore.getState();
            setSessions(
              sessions.map((s) =>
                s._id === event.sessionId ? { ...s, title: event.title } : s,
              ),
            );
          } else if (event.type === "usage") {
            // Token cost of this turn, sent just before "done". Stored only; the
            // Settings > Mentor usage page is where it is shown.
            useMentorStore.getState().setLastUsage(event.usage ?? null);
          } else if (event.type === "done") {
            break;
          } else if (event.type === "error") {
            throw new Error(event.message ?? "stream error");
          }
        }
      }

      if (assistantContent) {
        useMentorStore.getState().appendMessage({
          role: "assistant",
          content: assistantContent,
        });
      }
    } catch (err) {
      if (err.name === "AbortError") {
        // The server saves the partial reply when the client goes away, so keep
        // what the learner already saw: the transcript after a reload then
        // matches this one. Only for a plain cancel; when a newer send replaced
        // this request its user message is already in the list, and appending
        // here would put this reply after it.
        if (assistantContent && abortRef.current === controller) {
          useMentorStore.getState().appendMessage({ role: "assistant", content: assistantContent });
        }
        return;
      }
      useMentorStore
        .getState()
        .setError({ type: "network", message: err.message });
    } finally {
      // Always, even for a replaced request: a frame that fires late would write
      // this stream's text into the newer one's answer.
      if (frame !== null) cancelFrame(frame);
      pendingChunk = "";
      // A request that was replaced by a newer send must not switch off the
      // newer one's streaming state.
      if (abortRef.current === controller) {
        useMentorStore.getState().setStreaming(false);
        useMentorStore.getState().clearStream();
      }
    }
  }, []);

  const cancel = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  return { sendMessage, cancel };
}
