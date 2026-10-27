import { Trash2, X } from "lucide-react";
import { kindInfo } from "../lib/nodeKinds";
import { paletteFor } from "../lib/lenses";
import EvidenceList from "./EvidenceList";

const field =
  "mt-1 min-h-11 w-full rounded-lg border border-neutral-700 bg-black px-3 text-sm text-white placeholder:text-neutral-600 focus-visible:outline-2 focus-visible:outline-purple-400";

function Field({ label, children }) {
  return (
    <label className="mt-3 block text-xs font-medium text-neutral-400">
      {label}
      {children}
    </label>
  );
}

// Delete and close live in the header row, so the sheet a phone shows over the
// canvas stays short and neither needs scrolling to. Both are 44px targets
// around small icons.
const Header = ({ title, deleteLabel, onDelete, onClose }) => (
  <div className="flex items-center gap-2">
    <h2 className="mr-auto text-xs font-semibold uppercase tracking-wider text-neutral-400">{title}</h2>
    <button
      type="button"
      onClick={onDelete}
      className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-red-500/40 px-3 text-sm text-red-300 transition-colors hover:bg-red-500/10 focus-visible:outline-2 focus-visible:outline-purple-400"
    >
      <Trash2 size={14} aria-hidden="true" /> {deleteLabel}
    </button>
    <button
      type="button"
      onClick={onClose}
      className="-mr-2 flex size-11 cursor-pointer items-center justify-center rounded-lg text-neutral-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-purple-400"
    >
      <X size={16} aria-hidden="true" />
      <span className="sr-only">Close</span>
    </button>
  </div>
);

// The lens's parts, plus the part's own type when it comes from another lens (or the labs),
// so a map keeps its parts when the lens changes.
const typeOptions = (lens, current) => {
  const options = paletteFor(lens);
  return options.some((k) => k.kind === current) ? options : [kindInfo(current), ...options];
};

/**
 * Edits whatever is selected on the canvas: one node, one wire, or nothing.
 * A part's repo evidence is read-only: it comes from a scan, not from typing.
 */
export default function Inspector({ node, edge, repo, lens, onNode, onEdge, onDeleteNode, onDeleteEdge, onClose }) {
  if (node) {
    return (
      <div>
        <Header title="Selected part" deleteLabel="Delete" onDelete={onDeleteNode} onClose={onClose} />
        <Field label="Name">
          <input className={field} value={node.data.title} maxLength={40} onChange={(e) => onNode({ title: e.target.value })} />
        </Field>
        <Field label="What it is (a technology or a note)">
          <input className={field} value={node.data.sub} maxLength={60} placeholder="Express, PostgreSQL…" onChange={(e) => onNode({ sub: e.target.value })} />
        </Field>
        <Field label="Type">
          <select className={field} value={node.data.kind} onChange={(e) => onNode({ kind: e.target.value })}>
            {typeOptions(lens, node.data.kind).map((k) => (
              <option key={k.kind} value={k.kind}>
                {k.label}
              </option>
            ))}
          </select>
        </Field>
        {node.data.evidence?.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-medium text-emerald-300">Found in the repo</p>
            <EvidenceList repo={repo} items={node.data.evidence} />
          </div>
        )}
      </div>
    );
  }

  if (edge) {
    return (
      <div>
        <Header title="Selected wire" deleteLabel="Delete" onDelete={onDeleteEdge} onClose={onClose} />
        <Field label="What travels on it">
          <input
            className={field}
            value={edge.label ?? ""}
            maxLength={30}
            placeholder="HTTP, SQL, job…"
            onChange={(e) => onEdge({ label: e.target.value })}
          />
        </Field>
      </div>
    );
  }

  return null;
}
