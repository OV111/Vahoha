/**
 * Mentor attachment limits. The browser checks them to fail fast with a clear
 * message; the API schema (backend/modules/mentor/schemas/mentor.schemas.js)
 * enforces them, with a little headroom for the truncation marker.
 *
 * MAX_TOTAL_CHARS also guards the context window: 20 turns of ~4k tokens of
 * attachments stays inside gpt-oss-120b's 131K context.
 */
export const ATTACHMENT_LIMITS = Object.freeze({
  MAX_FILES: 3,
  MAX_FILE_BYTES: 256 * 1024,
  MAX_CHARS_PER_FILE: 8000, // ~2k tokens; longer files are truncated
  MAX_TOTAL_CHARS: 16000, // ~4k tokens across one message
});
