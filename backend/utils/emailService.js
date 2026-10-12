import { Resend } from "resend";
import process from "node:process";

// Who emails come from. Resend's shared test sender (onboarding@resend.dev) only
// delivers to the Resend account owner's own inbox, so real users get nothing
// from it. Once vahoha.com is verified in Resend, set for example:
//   EMAIL_FROM="Vahoha <no-reply@vahoha.com>"
//
// Env is read on first send, not at import: server.js calls dotenv.config() in
// its body, and ES module imports run before that, so a top-level read would
// always see undefined.
const TEST_SENDER = "Vahoha <onboarding@resend.dev>";
let resendClient;
let from;
const getResend = () => (resendClient ??= new Resend(process.env.RESEND_API_KEY));
const getFrom = () => {
  if (from) return from;
  from = process.env.EMAIL_FROM || TEST_SENDER;
  if (process.env.NODE_ENV === "production" && from === TEST_SENDER) {
    console.warn(
      "[email] EMAIL_FROM is not set: using Resend's test sender, which only delivers to the account owner.",
    );
  }
  return from;
};

// The Resend SDK reports failures as a returned `{ error }` instead of throwing.
// Turn that into a throw, so callers can't mistake a failed send for a sent one.
async function sendEmail(payload) {
  const { data, error } = await getResend().emails.send({ from: getFrom(), ...payload });
  if (error) throw new Error(`Resend ${error.name ?? "error"}: ${error.message}`);
  return data;
}

// User input goes into HTML, so escape it: otherwise a name or message containing
// <a href=...> or <img> would render as real markup in the inbox.
const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const BRAND = "#9333ea"; // purple-600, the site accent

/**
 * Password reset email.
 *
 * Email HTML is not web HTML: Gmail and Outlook strip <style> blocks and most
 * modern CSS, so this uses tables and inline styles only. The button is a
 * table cell with a link inside ("bulletproof button"), which renders in every
 * client. A plain-text part is sent too: some people read mail as text, and
 * HTML-only mail scores worse with spam filters.
 */
export async function sendPasswordResetEmail(toEmail, { resetUrl, firstName, expiresInMinutes }) {
  const hi = firstName ? `Hi ${escapeHtml(firstName)},` : "Hi,";
  const url = escapeHtml(resetUrl);

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Reset your Vahoha password</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f4f5;">
    <!-- Preheader: the grey preview line in the inbox list, hidden in the email itself -->
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
      Use this link to choose a new password. It expires in ${expiresInMinutes} minutes.
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
            style="max-width:480px;background:#ffffff;border:1px solid #e4e4e7;border-radius:12px;">
            <tr>
              <td style="padding:32px 32px 8px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
                <div style="font-size:20px;font-weight:700;color:#18181b;letter-spacing:-0.02em;">Vahoha</div>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 0;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#3f3f46;font-size:15px;line-height:24px;">
                <h1 style="margin:0 0 16px;font-size:22px;line-height:30px;color:#18181b;font-weight:600;">Reset your password</h1>
                <p style="margin:0 0 12px;">${hi}</p>
                <p style="margin:0 0 24px;">We got a request to reset the password for your Vahoha account. Click the button below to choose a new one.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="background:${BRAND};border-radius:8px;">
                      <a href="${url}" target="_blank"
                        style="display:inline-block;padding:12px 28px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:8px;">
                        Choose a new password
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 0;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#71717a;font-size:13px;line-height:20px;">
                <p style="margin:0 0 12px;">This link expires in <strong style="color:#3f3f46;">${expiresInMinutes} minutes</strong> and works only once.</p>
                <p style="margin:0 0 4px;">Button not working? Paste this link into your browser:</p>
                <p style="margin:0;word-break:break-all;"><a href="${url}" target="_blank" style="color:${BRAND};">${url}</a></p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 32px;">
                <div style="border-top:1px solid #e4e4e7;padding-top:16px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#71717a;font-size:13px;line-height:20px;">
                  Didn't ask for this? You can ignore this email. Your password stays the same until you use the link.
                </div>
              </td>
            </tr>
          </table>
          <p style="margin:16px 0 0;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#a1a1aa;font-size:12px;">
            Vahoha · <a href="https://vahoha.com" style="color:#a1a1aa;">vahoha.com</a>
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    firstName ? `Hi ${firstName},` : "Hi,",
    "",
    "We got a request to reset the password for your Vahoha account.",
    "Open this link to choose a new one:",
    "",
    resetUrl,
    "",
    `The link expires in ${expiresInMinutes} minutes and works only once.`,
    "",
    "Didn't ask for this? You can ignore this email. Your password stays the same until you use the link.",
    "",
    "Vahoha · vahoha.com",
  ].join("\n");

  return sendEmail({
    to: toEmail,
    subject: "Reset your Vahoha password",
    html,
    text,
  });
}

// Contact-form messages go to the team inbox. Reply-To is the sender, so
// hitting "Reply" in the inbox answers them directly.
export async function sendContactNotification({ name, email, topic, message }) {
  return sendEmail({
    to: process.env.CONTACT_INBOX || "hello.vahoha@gmail.com",
    replyTo: email,
    subject: `[Contact] ${topic} — ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px">
        <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
        <p><strong>Topic:</strong> ${escapeHtml(topic)}</p>
        <p style="white-space:pre-wrap;border-left:3px solid ${BRAND};padding-left:12px">${escapeHtml(message)}</p>
      </div>
    `,
  });
}
