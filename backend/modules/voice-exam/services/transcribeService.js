import process from "node:process";
import { toFile } from "groq-sdk";
import { getGroqVoiceClient } from "../../../config/groq.js";
import { HttpError, ValidationError } from "../../../utils/httpErrors.js";
import { noteRateLimit } from "../../../services/groqChat.js";
import { createGroqGate, GroqBusyError } from "../../../services/groqGate.js";

const MODEL = "whisper-large-v3-turbo";

// Whisper runs on its own key and limits, so it gets its own line instead of the chat gate's.
// A few at once keeps a crowd from tripping Groq's audio rate limit all together.
const whisperGate = createGroqGate({ maxConcurrent: Number(process.env.GROQ_WHISPER_CONCURRENCY) || 4 });
const WHISPER_MAX_WAIT_MS = 15_000;

const busy = (retryAfterSec = 5) =>
  new HttpError(503, `Speech-to-text is busy right now. Try again in ${retryAfterSec} seconds, or type your answer.`);

// Room for upload and recorder lag; anything longer was not recorded by our page.
const DURATION_GRACE_SEC = 10;
const MIN_DURATION_SEC = 2;
const MIN_WORDS = 3;

// Whisper's own rule for a silent segment. On silence it tends to invent lines like
// "Thank you for watching", so those segments are dropped.
const isSilence = (s) => s.no_speech_prob > 0.6 && s.avg_logprob < -1;

// True if the buffer has these bytes at this position.
const startsWith = (buf, bytes, offset = 0) =>
  buf.length >= offset + bytes.length && bytes.every((b, i) => buf[offset + i] === b);

// By the bytes, never the browser's label: Chrome/Firefox record WebM, Safari MP4, some Ogg.
export const audioExtension = (buf) => {
  if (startsWith(buf, [0x1a, 0x45, 0xdf, 0xa3])) return "webm";
  if (startsWith(buf, [0x66, 0x74, 0x79, 0x70], 4)) return "mp4";
  if (startsWith(buf, [0x4f, 0x67, 0x67, 0x53])) return "ogg";
  return null;
};

// Whisper's prompt caps at 224 tokens; the checklist titles fit well inside this.
const vocabularyPrompt = (subtopics) =>
  `A developer explains: ${subtopics.map((s) => s.title).join("; ")}.`.slice(0, 600);

const couldNotHear = () => new ValidationError("We couldn't hear an answer. Record again closer to the microphone, or type it.");

/**
 * Turns a recorded answer into text with Whisper, rejecting silence and over-long recordings.
 * `onBilled(seconds)` runs as soon as Whisper answers: Groq counts the audio even when we reject it.
 * @returns {Promise<{text: string, durationSec: number}>} The audio buffer is never written anywhere.
 */
export const transcribe = async (audio, { subtopics, maxSec, onBilled }) => {
  const ext = audioExtension(audio);
  if (!ext) throw new ValidationError("That recording format isn't supported.");

  let permit;
  try {
    permit = await whisperGate.acquire({ cost: 1, maxWaitMs: WHISPER_MAX_WAIT_MS });
  } catch (err) {
    if (err instanceof GroqBusyError) throw busy(err.retryAfterSec);
    throw err;
  }

  let result;
  try {
    result = await getGroqVoiceClient().audio.transcriptions.create({
      file: await toFile(audio, `answer.${ext}`),
      model: MODEL,
      language: "en",
      temperature: 0,
      response_format: "verbose_json",
      prompt: vocabularyPrompt(subtopics),
    });
  } catch (err) {
    noteRateLimit(whisperGate, err);
    console.error("voice-exam transcription failed:", err?.status, err?.message);
    throw busy();
  } finally {
    permit.done();
  }

  const durationSec = Math.ceil(result.duration ?? 0);
  await onBilled?.(durationSec);

  if (result.duration > maxSec + DURATION_GRACE_SEC) {
    throw new ValidationError("That recording is longer than the time allowed for this answer.");
  }
  if (result.duration < MIN_DURATION_SEC) throw couldNotHear();

  const segments = Array.isArray(result.segments) ? result.segments : null;
  const text = (segments ? segments.filter((s) => !isSilence(s)).map((s) => s.text).join(" ") : result.text ?? "")
    .replace(/\s+/g, " ")
    .trim();
  if (text.split(" ").filter(Boolean).length < MIN_WORDS) throw couldNotHear();
  return { text, durationSec };
};
