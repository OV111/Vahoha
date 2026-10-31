import { useState } from "react";
import { MessageSquare, Trash2 } from "lucide-react";

const MAX_LENGTH = 500; // mirrors MAX_COMMENT_LENGTH in the backend schema

const when = (date) =>
  new Date(date).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

/**
 * The discussion on one part of a team map, shown under the part's fields.
 * `saved` is false while the part exists only in this tab (not saved yet):
 * the server only takes comments on parts of the saved map.
 */
export default function PartComments({ comments, saved, onAdd, onDelete }) {
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setBusy(true);
    setError(null);
    try {
      await onAdd(text);
      setDraft("");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id) => {
    setError(null);
    try {
      await onDelete(id);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section aria-label="Comments on this part" className="mt-5 border-t border-neutral-800 pt-4">
      <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
        <MessageSquare size={13} aria-hidden="true" /> Comments{comments.length > 0 && ` (${comments.length})`}
      </h3>

      {comments.length === 0 ? (
        <p className="mt-2 text-sm text-neutral-500">No comments yet. Ask your team why this part is here, or how it works.</p>
      ) : (
        <ul className="mt-2 space-y-3">
          {comments.map((c) => (
            <li key={c.id} className="text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium text-neutral-200">{c.author}</span>
                <time dateTime={c.createdAt} className="mr-auto text-xs text-neutral-500">
                  {when(c.createdAt)}
                </time>
                {c.mine && (
                  <button
                    type="button"
                    onClick={() => remove(c.id)}
                    className="-my-2 flex size-9 cursor-pointer items-center justify-center rounded-lg text-neutral-500 transition-colors hover:text-red-300 focus-visible:outline-2 focus-visible:outline-purple-400"
                  >
                    <Trash2 size={13} aria-hidden="true" />
                    <span className="sr-only">Delete your comment</span>
                  </button>
                )}
              </div>
              <p className="mt-0.5 whitespace-pre-wrap break-words text-neutral-300">{c.text}</p>
            </li>
          ))}
        </ul>
      )}

      {saved ? (
        <form onSubmit={submit} className="mt-3">
          <label className="sr-only" htmlFor="part-comment">
            Add a comment
          </label>
          <textarea
            id="part-comment"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) submit(e);
            }}
            maxLength={MAX_LENGTH}
            rows={2}
            placeholder="Add a comment…"
            className="w-full resize-y rounded-lg border border-neutral-700 bg-black px-3 py-2 text-sm text-white placeholder:text-neutral-600 focus-visible:outline-2 focus-visible:outline-purple-400"
          />
          <div className="mt-2 flex items-center gap-2">
            <button
              type="submit"
              disabled={busy || !draft.trim()}
              className="inline-flex min-h-11 cursor-pointer items-center rounded-lg bg-purple-600 px-4 text-sm font-medium text-white transition-colors hover:bg-purple-500 focus-visible:outline-2 focus-visible:outline-purple-300 disabled:cursor-default disabled:opacity-50"
            >
              {busy ? "Posting…" : "Comment"}
            </button>
            {draft.length > MAX_LENGTH - 50 && (
              <span className="text-xs text-neutral-500">
                {draft.length}/{MAX_LENGTH}
              </span>
            )}
          </div>
        </form>
      ) : (
        <p className="mt-3 text-sm text-neutral-500">This part is still saving. Comments open once it&apos;s saved.</p>
      )}

      {error && (
        <p role="alert" className="mt-2 text-sm text-red-300">
          {error}
        </p>
      )}
    </section>
  );
}
