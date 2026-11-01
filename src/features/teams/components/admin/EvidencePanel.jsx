import { useState } from "react";
import { Check, Copy } from "lucide-react";
import ConfirmButton from "./ConfirmButton";
import { Panel } from "./adminUi";
import { SECTION } from "./adminHelpers";

const evidenceUrl = (path) => `${window.location.origin}${path}`;

export default function EvidencePanel({ evidence, onIssue, onRevoke, busy }) {
  const [consented, setConsented] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(evidenceUrl(evidence.path));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard can be blocked; the URL is still visible to copy by hand.
    }
  };

  return (
    <Panel
      id={SECTION.evidence}
      title="Evidence page"
      hint="Publishes member names, PR counts and defense scores at a public link. Refreshing updates the snapshot and keeps the same link."
    >
      {evidence && (
        <div className="t-card-subtle flex flex-col gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className={`t-badge shrink-0 ${evidence.revoked ? "t-badge-red" : "t-badge-green"}`}>
              {evidence.revoked ? "Revoked" : "Live"}
            </span>
            <a
              className="t-link t-mono truncate"
              href={evidence.path}
              target="_blank"
              rel="noopener noreferrer"
            >
              {evidenceUrl(evidence.path)}
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="t-btn t-btn-ghost" onClick={copy}>
              {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
              {copied ? "Copied" : "Copy link"}
            </button>
            <ConfirmButton
              disabled={busy}
              onConfirm={() => onRevoke(!evidence.revoked)}
              className={evidence.revoked ? "t-btn t-btn-ghost" : "t-btn t-btn-danger"}
              confirmLabel={evidence.revoked ? "Restore link" : "Revoke link"}
            >
              {evidence.revoked ? "Restore" : "Revoke"}
            </ConfirmButton>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-[var(--t-mist)]">
          <input
            type="checkbox"
            className="mt-1 size-4 shrink-0 accent-[var(--t-accent)]"
            checked={consented}
            onChange={(e) => setConsented(e.target.checked)}
          />
          Every member agreed to have their name and results published.
        </label>
        <button
          type="button"
          className="t-btn t-btn-primary shrink-0"
          disabled={busy || !consented}
          onClick={async () => {
            if (await onIssue()) setConsented(false);
          }}
        >
          {evidence ? "Refresh evidence" : "Publish evidence"}
        </button>
      </div>
    </Panel>
  );
}
