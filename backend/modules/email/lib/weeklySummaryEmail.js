import { escapeHtml, BRAND } from "../../../utils/emailService.js";
import { WEEKLY_SUMMARY_COPY as COPY } from "../../../../constants/weeklySummary.js";

/**
 * The weekly summary as { subject, html, text }. Pure, so it can be tested and
 * previewed without sending. Same email-HTML rules as the other templates in
 * utils/emailService.js: tables and inline styles only, plus a text part.
 *
 * @param {object} m
 * @param {"week"|"nudge"} m.kind
 * @param {string} [m.firstName]
 * @param {{label: string, value: number}[]} m.stats   from weekStats()
 * @param {string[]} m.layersPassed
 * @param {{text: string, ctaLabel: string, url: string}} m.nextStep
 * @param {string} m.unsubscribeUrl
 */
export const renderWeeklySummaryEmail = (m) => {
  const copy = COPY[m.kind];
  const streak = m.stats.find((s) => s.label === "day streak")?.value ?? 0;
  const subject = m.kind === "week" ? copy.subject(streak) : copy.subject;
  const heading = escapeHtml(copy.heading(m.firstName));
  const font = "font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;";

  const statCells = m.stats
    .map(
      (s) => `<td style="padding:12px 8px;text-align:center;${font}">
                <div style="font-size:24px;font-weight:700;color:#18181b;">${s.value}</div>
                <div style="font-size:12px;color:#71717a;">${escapeHtml(s.label)}</div>
              </td>`,
    )
    .join("");

  const intro =
    m.kind === "nudge"
      ? `<p style="margin:0 0 16px;">${escapeHtml(copy.body)}</p>`
      : statCells
        ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 16px;background:#fafafa;border-radius:8px;"><tr>${statCells}</tr></table>`
        : "";

  const layers = m.layersPassed.length
    ? `<p style="margin:0 0 16px;">Passed this week: <strong style="color:#18181b;">${m.layersPassed.map(escapeHtml).join(", ")}</strong></p>`
    : "";

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f4f5;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(copy.preheader)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
            style="max-width:520px;background:#ffffff;border:1px solid #e4e4e7;border-radius:12px;">
            <tr>
              <td style="padding:32px 32px 8px;${font}">
                <div style="font-size:20px;font-weight:700;color:#18181b;letter-spacing:-0.02em;">Vahoha</div>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 0;${font}color:#3f3f46;font-size:15px;line-height:24px;">
                <h1 style="margin:0 0 16px;font-size:22px;line-height:30px;color:#18181b;font-weight:600;">${heading}</h1>
                ${intro}
                ${layers}
                <p style="margin:0 0 4px;font-size:13px;color:#71717a;text-transform:uppercase;letter-spacing:0.04em;">Next step</p>
                <p style="margin:0 0 24px;color:#18181b;">${escapeHtml(m.nextStep.text)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="background:${BRAND};border-radius:8px;">
                      <a href="${escapeHtml(m.nextStep.url)}" target="_blank"
                        style="display:inline-block;padding:12px 28px;${font}font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:8px;">
                        ${escapeHtml(m.nextStep.ctaLabel)}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 32px;">
                <div style="border-top:1px solid #e4e4e7;padding-top:16px;${font}color:#71717a;font-size:12px;line-height:18px;">
                  ${escapeHtml(COPY.footer)}
                  <a href="${escapeHtml(m.unsubscribeUrl)}" target="_blank" style="color:#71717a;">${escapeHtml(COPY.unsubscribeLink)}</a>
                </div>
              </td>
            </tr>
          </table>
          <p style="margin:16px 0 0;${font}color:#a1a1aa;font-size:12px;">
            Vahoha · <a href="https://vahoha.com" style="color:#a1a1aa;">vahoha.com</a>
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    copy.heading(m.firstName),
    "",
    m.kind === "nudge" ? copy.body : m.stats.map((s) => `${s.value} ${s.label}`).join(" · "),
    m.layersPassed.length ? `Passed this week: ${m.layersPassed.join(", ")}` : null,
    "",
    `Next step: ${m.nextStep.text}`,
    `${m.nextStep.ctaLabel}: ${m.nextStep.url}`,
    "",
    "--",
    COPY.footer,
    `${COPY.unsubscribeLink}: ${m.unsubscribeUrl}`,
  ]
    .filter((line) => line !== null)
    .join("\n");

  return { subject, html, text };
};
