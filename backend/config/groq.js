import Groq from "groq-sdk";
import process from "process";

// The SDK's own defaults are 60 s and 2 retries; they are written down here so they
// are a decision, and the timeout is raised to 90 s. It only runs until the response
// HEADERS arrive (the SDK clears it once fetch resolves), so it cannot cut a streamed
// answer. For a non-streaming call, headers arrive when the whole generation is done,
// so it bounds that call: 90 s is room for a long capstone review, and a hung call
// still ends instead of holding a request open for ever. Retries cover 408, 409, 429,
// 5xx and connection errors, before any byte of a stream has been sent.
export const GROQ_OPTIONS = { timeout: 90_000, maxRetries: 2 };

let client = null;

export const getGroqClient = () => {
  if (client) return client;

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY is missing from .env");

  client = new Groq({ apiKey, ...GROQ_OPTIONS });
  return client;
};
