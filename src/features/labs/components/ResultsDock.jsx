import { CheckCircle2, XCircle, CircleDashed, ListChecks } from "lucide-react";

// Bottom dock: test results. A failing test says exactly what was expected and
// what came back (feedback that says what's wrong, not just ✗). Review tasks
// group them: the AI's tests, your test, hidden tests.
//
// No console tab: the sandboxed runner silences console output so student
// logs can't flood or spoof the results.
export default function ResultsDock({ run, running, error }) {
  const tests = run?.tests ?? [];
  const passed = tests.filter((t) => t.ok).length;
  const allOk = tests.length > 0 && passed === tests.length;
  const groups = [...new Set(tests.map((t) => t.group ?? ""))];

  return (
    <section aria-label="Results" className="flex h-[38%] min-h-[220px] flex-col border-t border-neutral-800 bg-neutral-950">
      <div className="flex items-center justify-between border-b border-neutral-800 px-2">
        <p className="flex min-h-11 items-center gap-1.5 px-3 text-xs font-medium text-white">
          <ListChecks size={13} aria-hidden="true" /> Tests
          {tests.length > 0 && (
            <span className={`rounded-full px-1.5 tabular-nums ${allOk ? "bg-emerald-500/15 text-emerald-300" : "bg-red-500/15 text-red-300"}`}>
              {passed}/{tests.length}
            </span>
          )}
        </p>
        {tests.length > 0 && (
          <div className="mr-2 hidden h-1.5 w-40 overflow-hidden rounded-full bg-neutral-800 sm:block" aria-hidden="true">
            <div
              className={`h-full rounded-full transition-[width] duration-300 motion-reduce:transition-none ${allOk ? "bg-emerald-500" : "bg-red-500"}`}
              style={{ width: `${(passed / tests.length) * 100}%` }}
            />
          </div>
        )}
      </div>

      <div className="min-h-0 flex-1 overflow-auto px-4 py-3" aria-live="polite">
        {running ? (
          <p className="flex items-center gap-2 text-sm text-neutral-400">
            <CircleDashed size={14} className="motion-safe:animate-spin" aria-hidden="true" /> Running tests…
          </p>
        ) : error ? (
          <p className="text-sm text-red-300">{error}</p>
        ) : !run ? (
          <p className="text-sm text-neutral-500">Run the tests to see what passes. Ctrl + Enter works too.</p>
        ) : (
          <div className="space-y-4">
            {groups.map((g) => (
              <div key={g || "tests"}>
                {g && <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">{g}</p>}
                <ul className="space-y-1.5">
                  {tests
                    .filter((t) => (t.group ?? "") === g)
                    .map((t) => (
                      <li key={`${g}-${t.name}`} className="flex items-start gap-2.5">
                        {t.ok ? (
                          <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-400" aria-label="Passed" />
                        ) : (
                          <XCircle size={16} className="mt-0.5 shrink-0 text-red-400" aria-label="Failed" />
                        )}
                        <div className="min-w-0">
                          <p className={`text-sm ${t.ok ? "text-neutral-300" : "text-white"}`}>{t.name}</p>
                          {!t.ok && t.message && <p className="mt-0.5 break-words font-mono text-xs text-red-300">{t.message}</p>}
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
