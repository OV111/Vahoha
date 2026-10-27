import { FileCode2 } from "lucide-react";
import { evidenceUrl } from "../lib/mapGraph";

/**
 * Repo files that prove a part exists. Links open the file on GitHub at the
 * scanned commit; without a known repo the paths are shown as plain text.
 * `items` are paths, or { path, reason } from a fresh scan.
 */
export default function EvidenceList({ repo, items }) {
  if (!items?.length) return null;
  return (
    <ul className="mt-1 space-y-0.5">
      {items.map((item) => {
        const path = typeof item === "string" ? item : item.path;
        const reason = typeof item === "string" ? undefined : item.reason;
        return (
          <li key={path} className="min-w-0">
            {repo ? (
              <a
                href={evidenceUrl(repo, path)}
                target="_blank"
                rel="noreferrer noopener"
                title={reason}
                className="inline-flex min-h-8 max-w-full items-center gap-1.5 font-mono text-xs text-purple-300 hover:text-purple-200 hover:underline"
              >
                <FileCode2 size={12} className="shrink-0" aria-hidden="true" />
                <span className="truncate">{path}</span>
              </a>
            ) : (
              <span title={reason} className="inline-flex max-w-full items-center gap-1.5 font-mono text-xs text-neutral-300">
                <FileCode2 size={12} className="shrink-0" aria-hidden="true" />
                <span className="truncate">{path}</span>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
