import { Bot, FileCode2, FlaskConical, Play, RotateCcw } from "lucide-react";
import CodeEditor from "@/features/coding-challenges/components/arena/CodeEditor";

// The editor half: file tabs, the code, and the Run bar. A review task opens
// two files: the AI's code (marked as such) and the learner's test file.
export default function Workspace({ files, activeFile, onSelectFile, code, onChange, onReset, onRun, running, edited }) {
  const onKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && !running) {
      e.preventDefault();
      onRun();
    }
  };

  return (
    // min-h: tab bar (44px) + editor floor (280px), so it never shrinks under the results dock.
    <div onKeyDown={onKeyDown} className="flex min-h-[324px] flex-1 flex-col">
      <div className="flex items-stretch justify-between gap-2 border-b border-neutral-800 bg-neutral-950">
        <div role="tablist" aria-label="Files" className="flex min-w-0 overflow-x-auto">
          {files.map((f) => {
            const active = f.name === activeFile;
            return (
              <button
                key={f.name}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onSelectFile(f.name)}
                className={`relative flex min-h-11 shrink-0 items-center gap-2 border-r border-neutral-800 px-4 font-mono text-xs transition-colors duration-150 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-purple-400 ${
                  active ? "bg-[#050505] text-white" : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                {active && <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-purple-500" />}
                {f.kind === "test" ? (
                  <FlaskConical size={13} className="text-emerald-400" aria-hidden="true" />
                ) : (
                  <FileCode2 size={13} className="text-sky-300" aria-hidden="true" />
                )}
                {f.name}
                {f.byAI && (
                  <span className="flex items-center gap-1 rounded-full bg-rose-500/15 px-1.5 py-0.5 font-sans text-[10px] font-semibold text-rose-300">
                    <Bot size={10} aria-hidden="true" /> AI
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-1 px-2">
          {edited && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-3 text-xs text-neutral-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-purple-400"
            >
              <RotateCcw size={12} aria-hidden="true" /> Reset
            </button>
          )}
          <button
            type="button"
            onClick={onRun}
            disabled={running}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-purple-600 px-4 text-sm font-medium text-white transition-colors duration-150 enabled:hover:bg-purple-500 disabled:bg-neutral-800 disabled:text-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300"
          >
            <Play size={13} fill="currentColor" aria-hidden="true" />
            {running ? "Running…" : "Run tests"}
            <kbd className="hidden rounded border border-white/20 px-1 font-sans text-[10px] text-white/70 lg:inline">Ctrl ↵</kbd>
          </button>
        </div>
      </div>

      <div className="min-h-[280px] flex-1 overflow-auto bg-[#050505]">
        {/* Remount per file so CodeMirror gets the new document. */}
        <CodeEditor key={activeFile} value={code} onChange={onChange} />
      </div>
    </div>
  );
}
