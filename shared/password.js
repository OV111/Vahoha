/**
 * Rules for a new password (sign-up and reset). ONE source of truth: the
 * backend validates with them (backend/modules/auth/schemas/auth.schemas.js)
 * and the forms check them first (src/pages/GetStarted.jsx,
 * src/pages/ResetPassword.jsx), so the forms can't accept what the server
 * refuses. Login doesn't check them: that would block older passwords and
 * reveal the policy.
 *
 * maxBytes, not characters: bcrypt only reads the first 72 bytes, so an
 * emoji-heavy password under 72 characters could be silently truncated.
 */
export const PASSWORD_RULES = Object.freeze({
  minLength: 6,
  maxBytes: 72,
  symbol: /[!@#$%^&*()]/,
});

export const PASSWORD_MESSAGES = Object.freeze({
  minLength: `At least ${PASSWORD_RULES.minLength} characters.`,
  symbol: "Must include at least one symbol (!@#$%^&*()).",
  maxBytes: `Max ${PASSWORD_RULES.maxBytes} bytes (emoji and accented characters take more than one).`,
});

const byteLength = (value) => new TextEncoder().encode(value).length;

/** The first rule a new password breaks, as its message, or null when it passes. */
export const newPasswordError = (value) => {
  if (value.length < PASSWORD_RULES.minLength) return PASSWORD_MESSAGES.minLength;
  if (!PASSWORD_RULES.symbol.test(value)) return PASSWORD_MESSAGES.symbol;
  if (byteLength(value) > PASSWORD_RULES.maxBytes) return PASSWORD_MESSAGES.maxBytes;
  return null;
};
