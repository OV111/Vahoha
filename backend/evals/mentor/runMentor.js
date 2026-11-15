import { getGroqClient } from "../../config/groq.js";
import { toolDefinitions } from "../../modules/mentor/services/agentTools.js";
import {
  MODEL,
  buildBriefing,
  buildTurnMessages,
  capToolResult,
} from "../../modules/mentor/services/streamService.js";
import { SolutionGuard, OMITTED_NOTE } from "../../modules/mentor/services/solutionGuard.js";
import { withRetry } from "./withRetry.js";

const MAX_ROUNDS = 3;

/**
 * What a tool returns in the eval. Tools whose data the case supplies answer
 * with it (a model that re-fetches the attempt gets the same attempt); every
 * other tool is a stub, since this measures the prompt, not the database.
 */
const stubTool = (c, name) => {
  if (name === "get_challenge_attempt" && c.challengeAttempt) return c.challengeAttempt;
  if (name === "get_learner_context" && c.topicDetail) return c.topicDetail;
  return { ok: true, note: "eval stub: no real data available" };
};

/**
 * In a challenge the live stream passes through SolutionGuard, so the eval does
 * too: `reply` is what the learner would see. `guardTrimmed` records that the
 * model tried to write more code than allowed, which the prompt alone failed to stop.
 */
const guarded = (challengeSlug, raw) => {
  if (!challengeSlug) return { reply: raw, guardTrimmed: false };
  const guard = new SolutionGuard();
  const reply = guard.push(raw) + guard.flush();
  return { reply, guardTrimmed: reply.includes(OMITTED_NOTE) };
};

/**
 * One mentor reply for one case, built with the SAME functions the live mentor
 * uses (buildBriefing, buildTurnMessages), so the eval tests what production sends.
 *
 * The real tool definitions are offered because the system prompt tells the
 * model to use them; without them it invents tool use in prose or returns an
 * empty reply.
 */
export const runMentor = async (c) => {
  const challengeSlug =
    c.challengeSlug ?? (c.activity?.surface === "challenge" ? c.activity.challengeSlug ?? null : null);

  const { messages } = buildTurnMessages({
    systemPrompt: buildBriefing({
      learnerSummary: c.learnerSummary,
      activity: c.activity,
      challengeSlug,
      challengeAttempt: c.challengeAttempt,
      topicDetail: c.topicDetail,
      conversationSummary: c.conversationSummary,
      priorReplies: c.history.filter((m) => m.role === "assistant").length,
    }),
    history: c.history,
    userMessage: c.userMessage,
    attachments: c.attachments,
  });

  for (let round = 0; round < MAX_ROUNDS; round++) {
    const completion = await withRetry(() =>
      getGroqClient().chat.completions.create({
        model: MODEL,
        messages,
        tools: toolDefinitions,
        tool_choice: round === MAX_ROUNDS - 1 ? "none" : "auto",
        reasoning_effort: "low",
        max_tokens: 3000,
      }),
    );

    const msg = completion.choices?.[0]?.message;
    if (!msg?.tool_calls?.length) return guarded(challengeSlug, msg?.content ?? "");

    messages.push({ role: "assistant", content: msg.content ?? "", tool_calls: msg.tool_calls });
    for (const tc of msg.tool_calls) {
      messages.push({ role: "tool", tool_call_id: tc.id, content: capToolResult(stubTool(c, tc.function?.name)) });
    }
  }
  return guarded(challengeSlug, "");
};
