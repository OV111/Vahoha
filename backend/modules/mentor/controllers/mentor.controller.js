import {
  createSession as dbCreateSession,
  listSessionsPage,
  getSession,
  appendMessages,
  reserveDailyMessage,
  releaseDailyMessage,
  addUsageTokens,
  getUserTimezone,
  lockSessionChallenge,
  getUsageToday,
  updateSession,
  deleteSession,
  deleteAllSessions,
  MAX_TURNS,
  DAILY_MESSAGE_CAP,
} from "../services/sessionService.js";
// Namespace import so the context-window figures come from the one place that
// owns them (streamService) instead of being redefined here.
import * as streamService from "../services/streamService.js";
import { generateTitle } from "../services/titleService.js";
import { liveMessages, foldConversation } from "../services/summaryService.js";
import { getUsageSummary, recordUsageEvent } from "../services/usageService.js";
import { toolDefinitions } from "../services/agentTools.js";
import { ATTACHMENT_LIMITS } from "../schemas/mentor.schemas.js";
import { trackEvent } from "../../../services/eventService.js";
import { hasLiveDefense } from "../../capstone/index.js";
import { hasLiveExam } from "../../exams/index.js";

const { streamAgentResponse, composeUserMessage, MODEL } = streamService;

// A challenge slug is interpolated into the system prompt, so anything that did
// not come from the already-validated request body is checked before it is stored.
const CHALLENGE_SLUG = /^[a-z0-9-]{1,80}$/;

export const createSession = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const userId = req.user._id.toString();
    const { title } = req.body;
    const session = await dbCreateSession(db, userId, title);
    res.status(201).json(session);
  } catch (err) {
    console.error("createSession error:", err);
    res.status(500).json({ message: "Failed to create session" });
  }
};

export const getSessions = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const userId = req.user._id.toString();
    const { limit, before, q, challenge } = req.query;
    res.json(
      await listSessionsPage(db, userId, { limit, before, q, challengeOnly: challenge === "true" }),
    );
  } catch (err) {
    console.error("getSessions error:", err);
    res.status(500).json({ message: "Failed to fetch sessions" });
  }
};

export const getSessionById = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const userId = req.user._id.toString();
    const session = await getSession(db, userId, req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.json(session);
  } catch (err) {
    console.error("getSessionById error:", err);
    res.status(500).json({ message: "Failed to fetch session" });
  }
};

export const updateSessionById = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const userId = req.user._id.toString();
    // A rename through this endpoint is always a deliberate user action, so
    // lock the title against later auto-generation.
    const session = await updateSession(db, userId, req.params.id, {
      ...req.body,
      ...(req.body.title !== undefined && { titleLocked: true }),
    });

    // Also 404 when the session belongs to someone else — a 403 would confirm
    // that the id exists, which is information the caller shouldn't get.
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.json(session);
  } catch (err) {
    console.error("updateSessionById error:", err);
    res.status(500).json({ message: "Failed to update session" });
  }
};

export const deleteAllSessionsForUser = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const deleted = await deleteAllSessions(db, req.user._id.toString(), { keepPinned: req.query.keepPinned === "true" });
    res.json({ success: true, deleted });
  } catch (err) {
    console.error("deleteAllSessions error:", err);
    res.status(500).json({ message: "Failed to delete chats" });
  }
};

export const deleteSessionById = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const userId = req.user._id.toString();
    const deleted = await deleteSession(db, userId, req.params.id);
    if (!deleted) return res.status(404).json({ message: "Session not found" });
    res.json({ success: true });
  } catch (err) {
    console.error("deleteSessionById error:", err);
    res.status(500).json({ message: "Failed to delete session" });
  }
};

/**
 * GET /api/mentor/context
 *
 * Real runtime facts for the /context command. Everything here is read from the
 * same constants and collections the agent actually uses, so it cannot drift —
 * which is precisely how the old hardcoded context panel ended up stating a
 * skill level, streak and exam score that were never true.
 */
export const getContext = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const userId = req.user._id.toString();

    const tz = await getUserTimezone(db, userId);
    const usage = await getUsageToday(db, userId, tz);

    res.json({
      model: MODEL,
      tools: toolDefinitions.map((t) => t.function.name),
      limits: {
        maxTurns: MAX_TURNS,
        dailyMessageCap: DAILY_MESSAGE_CAP,
        maxAttachments: ATTACHMENT_LIMITS.MAX_FILES,
        maxAttachmentChars: ATTACHMENT_LIMITS.MAX_TOTAL_CHARS,
        contextWindowTokens: streamService.CONTEXT_WINDOW_TOKENS ?? null,
        historyTokenBudget: streamService.HISTORY_TOKEN_BUDGET ?? null,
      },
      // used / cap / remaining plus tokens: { prompt, completion, total } today
      usage,
    });
  } catch (err) {
    console.error("getContext error:", err);
    res.status(500).json({ message: "Failed to load context" });
  }
};

/** GET /api/mentor/usage?days=30 — feeds the "Mentor usage" tab in settings. */
export const getUsage = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const userId = req.user._id.toString();
    const tz = await getUserTimezone(db, userId);
    res.json(await getUsageSummary(db, userId, req.query.days, tz));
  } catch (err) {
    console.error("getUsage error:", err);
    res.status(500).json({ message: "Failed to load usage" });
  }
};

export const stream = async (req, res) => {
  const db = req.app.locals.db;
  const userId = req.user._id.toString();
  // Shape is guaranteed by validate({ body: streamSchema }) on the route —
  // message is a non-empty trimmed string, sessionId is a valid ObjectId or null,
  // and attachments (if present) are within the per-file and total size caps.
  const { sessionId, message, attachments = [], activity = null } = req.body;

  // Anti-cheat: while a capstone defense question or a layer test question is
  // on the clock, the mentor is paused — otherwise it could be asked the
  // answers. Checked before the daily limit so a paused request does not use
  // up a message.
  if (await hasLiveDefense(db, userId)) {
    return res.status(423).json({
      message: "Your mentor is paused while a capstone defense question is on the clock. It will be back as soon as you answer.",
      code: "defense_in_progress",
    });
  }
  if (await hasLiveExam(db, userId)) {
    return res.status(423).json({
      message: "Your mentor is paused while a layer test is in progress. It will be back as soon as the test ends.",
      code: "exam_in_progress",
    });
  }

  // Take today's message BEFORE calling the model. Check-then-count let parallel
  // requests all read "29" and all proceed; the reservation is one atomic update.
  // `tz` is the learner's own time zone, so "today" and the reset time are theirs.
  const tz = await getUserTimezone(db, userId);
  const reservation = await reserveDailyMessage(db, userId, tz);
  if (!reservation.allowed) {
    return res.status(429).json({ message: "Daily message limit reached.", resetAt: reservation.resetAt });
  }
  const refund = () =>
    releaseDailyMessage(db, userId, tz, reservation.date).catch((err) =>
      console.error("could not refund the reserved message:", err),
    );

  // resolve or create session
  let session = null;
  // The chat's pinned challenge. Starts as whatever is stored and is kept up to
  // date below, so the comparison after the turn only writes when it changed.
  let lockedSlug = null;
  try {
    await trackEvent(db, userId, "mentor_message", { hasAttachments: attachments.length > 0 });

    if (sessionId) {
      session = await getSession(db, userId, sessionId);
    }
    if (!session) {
      session = await dbCreateSession(db, userId, message.slice(0, 60));
    }
    lockedSlug = session.challengeSlug ?? null;

    // Challenge protection is decided here, not by the browser alone. The page
    // can ask for it (activity names a challenge), but once a chat has touched a
    // challenge it stays protected for every later message, whatever the client
    // sends, so leaving `activity` out no longer switches the guard off.
    const requestedSlug = activity?.surface === "challenge" ? activity.challengeSlug : null;
    if (requestedSlug && requestedSlug !== lockedSlug) {
      await lockSessionChallenge(db, userId, session._id.toString(), requestedSlug);
      lockedSlug = requestedSlug;
    }
  } catch (err) {
    // Nothing was answered, so the reserved message goes back.
    await refund();
    throw err;
  }

  const sessionMessages = session.messages ?? [];
  // Older turns already folded into session.summary go as notes, not word for word.
  const live = liveMessages(session);
  const challengeSlug = lockedSlug;

  // Auto-title on the first exchange only, and never over a name the user chose.
  // Fired BEFORE streaming so it runs concurrently with the answer — by the time
  // the reply finishes it has almost always resolved, costing no extra wait.
  const shouldTitle = sessionMessages.length === 0 && !session.titleLocked;
  const titlePromise = shouldTitle ? generateTitle(message) : null;

  // set SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  // The learner pressing stop (or closing the tab) must stop the model, or the
  // server keeps paying for tokens nobody is reading. "close" also fires after a
  // normal end, hence the writableEnded check.
  const controller = new AbortController();
  const clientGone = () => controller.signal.aborted;
  const onClose = () => {
    if (!res.writableEnded) controller.abort();
  };
  res.on("close", onClose);

  // Never write to a connection the client has already dropped.
  const send = (event) => {
    if (clientGone() || res.writableEnded) return;
    res.write(`data: ${JSON.stringify(event)}\n\n`);
  };

  // From the moment the model has answered (or been stopped) the message is
  // spent. Only a failure BEFORE that earns the refund.
  let answered = false;

  try {
    const result = await streamAgentResponse({
      res,
      db,
      userId,
      sessionMessages: live,
      conversationSummary: session.summary?.text ?? null,
      userMessage: message,
      attachments,
      // Lets the teaching log record which conversation an explanation happened
      // in, so a future turn can tell "I already tried this" from "we discussed
      // this at length in one long session".
      sessionId: session._id.toString(),
      // Deliberately NOT persisted with the turn: where the learner was when
      // they asked is context for this answer only. Replaying it into a later
      // turn would tell the mentor they are still on the exam results page.
      activity,
      signal: controller.signal,
      challengeSlug,
    });
    answered = true;

    const { content: assistantContent = "", aborted = false } = result;
    const usage = result.usage ?? {
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
      rounds: 0,
      estimated: true,
    };

    // Tokens only: the message was already counted when it was reserved. Spent
    // tokens count even when the learner stopped the answer early.
    await addUsageTokens(db, userId, usage, tz, reservation.date);

    // An empty reply is never saved: replayed into the next turn it would be an
    // assistant message with no content, which providers can reject. A stopped
    // answer keeps whatever had streamed.
    if (assistantContent) {
      // Persist the COMPOSED message (message + file content), not the bare text,
      // so follow-up turns like "now refactor that file" still see the content.
      // The total-size cap keeps 20 such turns inside the model's context window.
      const userContent = composeUserMessage(message, attachments);
      await appendMessages(db, session._id.toString(), userContent, assistantContent, usage);

      // Not awaited: folding old turns into notes is for the NEXT message and
      // must not hold this stream open.
      void foldConversation(db, session, [
        ...live,
        { role: "user", content: userContent },
        { role: "assistant", content: assistantContent },
      ]);
    }
    await recordUsageEvent(db, userId, session._id.toString(), usage, tz, reservation.date);

    // The turn itself may have shown the chat is about a challenge (for example
    // the model opened a challenge attempt); pin it for the rest of the chat.
    if (
      typeof result.challengeSlug === "string" &&
      CHALLENGE_SLUG.test(result.challengeSlug) &&
      result.challengeSlug !== lockedSlug
    ) {
      await lockSessionChallenge(db, userId, session._id.toString(), result.challengeSlug);
    }

    // A stopped turn has nobody left to tell: no title, no usage event, no "done".
    if (aborted || clientGone()) return;

    if (titlePromise) {
      // Race against a short timeout: a hung titling call must never hold the
      // stream open, because the client can't send its next message until this
      // closes. Titling is cosmetic — dropping it is always the right trade.
      const title = await Promise.race([
        titlePromise,
        new Promise((resolve) => setTimeout(() => resolve(null), 1500)),
      ]);

      if (title) {
        await updateSession(db, userId, session._id.toString(), { title });
        send({ type: "title", sessionId: session._id.toString(), title });
      }
    }

    const { totalTokens, promptTokens, completionTokens, trimmedMessages = 0 } = usage;
    send({
      type: "usage",
      usage: {
        totalTokens,
        promptTokens,
        completionTokens,
        contextWindowTokens: streamService.CONTEXT_WINDOW_TOKENS ?? null,
        trimmedMessages,
      },
    });

    // Close the stream only now that the turn is durable. The client treats
    // "done" as permission to send the next message, and that next request
    // re-reads the session — so persisting first is what makes follow-up
    // turns reliably see the turn they are following up on.
    send({ type: "done" });
    if (!clientGone() && !res.writableEnded) {
      res.write("data: [DONE]\n\n");
      res.end();
    }
  } catch (err) {
    // Busy is an expected state, not a fault: nothing was answered, so the
    // reserved message is refunded and the learner can simply send it again.
    if (!answered) await refund();
    const busy = err.code === "groq_busy";
    if (!busy) console.error("stream error:", err);
    const errorMessage = busy
      ? `The mentor is busy right now. Try again in ${err.retryAfterSec} seconds.`
      : "Agent error. Please try again.";
    try {
      send({ type: "error", message: errorMessage, ...(busy && { code: err.code }) });
      if (!res.writableEnded) res.end();
    } catch { /* already ended */ }
  } finally {
    res.off("close", onClose);
  }
};
