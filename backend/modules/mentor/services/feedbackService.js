import { ObjectId } from "mongodb";

export const FEEDBACK_REASONS = ["wrong", "too_long", "gave_away", "not_helpful"];

/** Turns before the rated answer kept with it: enough to see what went wrong. */
const CONTEXT_MESSAGES = 6;
// Saved messages can carry attached files; the snapshot needs the gist, not 16k chars.
const MAX_SNAPSHOT_CHARS = 4000;

const clip = (text) =>
  typeof text === "string" && text.length > MAX_SNAPSHOT_CHARS
    ? `${text.slice(0, MAX_SNAPSHOT_CHARS)}\n…[cut]`
    : text ?? "";

/**
 * Record a learner's 👍/👎 on one mentor answer, or clear it (`vote: null`).
 *
 * Written in two places on purpose. The session copy is what the chat shows on
 * reload. The `agent_feedback` row keeps a snapshot of the conversation around
 * the answer, because the session trims to 20 turns and can be deleted, and a 👎
 * is only useful later (turning it into an eval case) if its context survives.
 *
 * Scoped by userId like every session write. Returns false when the chat or
 * the message isn't theirs or no longer exists.
 */
export const setMessageFeedback = async (db, userId, sessionId, messageId, { vote, reason = null }) => {
  const uid = new ObjectId(userId);
  const sid = new ObjectId(sessionId);
  const sessions = db.collection("agent_sessions");

  const session = await sessions.findOne(
    { _id: sid, userId: uid, "messages.id": messageId },
    { projection: { messages: 1, challengeSlug: 1, "summary.text": 1 } },
  );
  if (!session) return false;

  const key = { userId: uid, sessionId: sid, messageId };
  const at = new Date();

  if (vote === null) {
    await Promise.all([
      sessions.updateOne({ _id: sid, userId: uid, "messages.id": messageId }, { $unset: { "messages.$.feedback": "" } }),
      db.collection("agent_feedback").deleteOne(key),
    ]);
    return true;
  }

  const feedback = { vote, ...(reason && { reason }), at };
  const index = session.messages.findIndex((m) => m.id === messageId);
  const context = session.messages
    .slice(Math.max(0, index - CONTEXT_MESSAGES), index)
    .map((m) => ({ role: m.role, content: clip(m.content) }));

  await Promise.all([
    sessions.updateOne({ _id: sid, userId: uid, "messages.id": messageId }, { $set: { "messages.$.feedback": feedback } }),
    db.collection("agent_feedback").updateOne(
      key,
      {
        $set: {
          vote,
          reason,
          answer: clip(session.messages[index].content),
          context,
          challengeSlug: session.challengeSlug ?? null,
          conversationSummary: session.summary?.text ?? null,
          at,
        },
      },
      { upsert: true },
    ),
  ]);
  return true;
};
