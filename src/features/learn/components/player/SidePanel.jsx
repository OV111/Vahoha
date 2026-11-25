import { lazy, Suspense, useEffect, useRef, useState } from "react";
import LoadingSuspense from "@/components/feedback/LoadingSuspense";
import { CodePanelSkeleton } from "../LearnSkeletons";
import LessonDiagram from "./LessonDiagram";

// CodeMirror is the heaviest part of the lesson page. Loading it on demand lets
// the step text paint first.
const CodePanel = lazy(() => import("../CodePanel"));

// The editor chunk is ~137 KB gzip; fetching it at load competes with the
// lesson text for bandwidth, so wait until the panel is near the viewport.
function useNearViewport() {
  const ref = useRef(null);
  const [near, setNear] = useState(() => typeof window !== "undefined" && !("IntersectionObserver" in window));

  useEffect(() => {
    if (near || !ref.current) return;
    const io = new IntersectionObserver(([entry]) => entry.isIntersecting && setNear(true), {
      rootMargin: "400px 0px",
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [near]);

  return [ref, near, () => setNear(true)];
}

/** Which step's code the panel shows: this step's, or the latest one before it. */
const codeIndexFor = (steps, index) => {
  for (let i = index; i >= 0; i--) if (steps[i].code) return i;
  return -1;
};

function Code({ steps, index, locked, fixShown, onResult }) {
  const [ref, near, show] = useNearViewport();
  const step = steps[index];
  const codeIndex = codeIndexFor(steps, index);
  if (codeIndex === -1) return null;

  let label = "Live code";
  if (step.ai) label = "Written by AI";
  else if (codeIndex !== index) label = `From: ${steps[codeIndex].short}`;

  return (
    <div ref={ref} onPointerDown={show} onFocus={show} className="h-[440px] lg:h-full">
      {near ? (
        <Suspense
          fallback={
            <CodePanelSkeleton>
              <LoadingSuspense fill />
            </CodePanelSkeleton>
          }
        >
          <CodePanel
            key={`${codeIndex}-${fixShown}`}
            source={fixShown ? step.fix : steps[codeIndex].code.source}
            label={label}
            lockedReason={locked ? "Answer the question first, then run it to check." : null}
            onResult={onResult}
          />
        </Suspense>
      ) : (
        <CodePanelSkeleton />
      )}
    </div>
  );
}

// Explaining from memory works better with a cue than with the text: the
// pictures come back, the sentences don't.
function Pictures({ steps }) {
  return (
    <div className="space-y-4 p-5 sm:p-6">
      <p className="text-[15px] text-neutral-300">Pictures from this lesson, to help you remember</p>
      {steps
        .filter((s) => s.diagram)
        .map((s) => (
          <LessonDiagram key={s.diagram} name={s.diagram} />
        ))}
    </div>
  );
}

export default function SidePanel({ steps, index, ...code }) {
  return steps[index].kind === "explain" ? <Pictures steps={steps} /> : <Code steps={steps} index={index} {...code} />;
}
