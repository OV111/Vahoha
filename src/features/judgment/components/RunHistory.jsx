/** What happened so far: each week's choice and its immediate result. No grades until the debrief. */
const RunHistory = ({ history }) => {
  if (!history.length) return null;
  return (
    <section aria-label="What happened so far" className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
      <h2 className="mb-4 text-sm font-semibold text-neutral-200">What happened so far</h2>
      <ol className="flex flex-col gap-4">
        {history.map((h) => (
          <li key={h.eventId} className="border-l-2 border-neutral-800 pl-4">
            <p className="text-xs text-neutral-500">Week {h.week} · {h.title}</p>
            <p className="mt-1 text-sm text-neutral-300">{h.choice}</p>
            <p className="mt-1 text-sm text-neutral-100">→ {h.outcome}</p>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default RunHistory;
