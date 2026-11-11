import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useParams, useNavigate, useSearchParams } from "react-router-dom";
import LoadingSuspense from "@/components/feedback/LoadingSuspense";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock, ChevronRight, CheckCircle2, XCircle,
  RotateCcw, ArrowLeft, Loader2, AlertTriangle, Timer, ListChecks, Eye, ShieldAlert,
} from "lucide-react";
import { API_BASE_URL, authHeaders, apiFetch } from "../../../constants/api";
import { EXAM_RULES } from "../../../constants/exam";
import useRoadmapStore from "../../stores/useRoadmapStore";
import InlineTeachBack from "./components/InlineTeachBack";
import useCountdown from "@/hooks/useCountdown";
import NoCopy from "@/components/integrity/NoCopy";

// ── Question timer (remounted for every question via its key) ─
const QuestionTimer = ({ seconds, onExpire }) => {
  const remaining = useCountdown(seconds, "question", onExpire);
  const mins = String(Math.floor(remaining / 60)).padStart(2, "0");
  const secs = String(remaining % 60).padStart(2, "0");
  const urgent = remaining <= 10;

  return (
    <div
      role="timer"
      aria-label={`${remaining} seconds left for this question`}
      className={`flex items-center gap-1.5 text-sm font-mono px-3 py-1.5 rounded-lg border transition-colors ${urgent ? "border-red-800/60 bg-red-950/30 text-red-400" : "border-neutral-800 bg-neutral-900 text-neutral-400"}`}
    >
      <Clock size={13} className={urgent ? "animate-pulse" : ""} /> {mins}:{secs}
      <span className="sr-only" aria-live="polite">
        {remaining === 10 ? "Ten seconds remaining" : ""}
      </span>
    </div>
  );
};

// ── Voided screen (the learner left the test tab too often) ───
const VoidedScreen = ({ onBack }) => (
  <motion.div
    className="min-h-screen flex items-center justify-center px-6"
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div role="alert" className="text-center max-w-sm">
      <div className="w-16 h-16 rounded-full border border-red-800/50 bg-red-950/20 flex items-center justify-center mx-auto mb-5">
        <ShieldAlert size={28} className="text-red-400" />
      </div>
      <h2 className="text-lg font-semibold text-neutral-200 mb-2">Test ended</h2>
      <p className="text-sm text-neutral-400 mb-6">
        You left the test tab {EXAM_RULES.maxTabLeaves} times, so this attempt ended and counts as
        not passed. You can try again in {EXAM_RULES.cooldownAfterFailMins} minutes.
      </p>
      <button
        onClick={onBack}
        className="flex min-h-11 items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-700 text-neutral-400 hover:text-neutral-200 hover:border-neutral-500 text-sm transition-colors mx-auto"
      >
        <ArrowLeft size={14} /> Back to Roadmap
      </button>
    </div>
  </motion.div>
);

// ── Cooldown screen ───────────────────────────────────────────
const CooldownScreen = ({ message, onBack }) => {
  // parse "Retry in X minutes" from message
  const match = message.match(/(\d+)\s*minute/);
  const initMins = match ? parseInt(match[1], 10) : 0;
  const [secsLeft, setSecsLeft] = useState(initMins * 60);

  useEffect(() => {
    if (secsLeft <= 0) return;
    const t = setInterval(() => setSecsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const mins = String(Math.floor(secsLeft / 60)).padStart(2, "0");
  const secs = String(secsLeft % 60).padStart(2, "0");

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 rounded-full border border-amber-800/50 bg-amber-950/20 flex items-center justify-center mx-auto mb-5">
          <Timer size={28} className="text-amber-500" />
        </div>
        <h2 className="text-lg font-semibold text-neutral-200 mb-2">Cooldown Active</h2>
        <p className="text-sm text-neutral-500 mb-4">{message}</p>
        {secsLeft > 0 && (
          <div className="text-3xl font-mono font-bold text-amber-400 mb-6">
            {mins}:{secs}
          </div>
        )}
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-700 text-neutral-400 hover:text-neutral-200 hover:border-neutral-500 text-sm transition-colors mx-auto"
        >
          <ArrowLeft size={14} /> Back to Roadmap
        </button>
      </div>
    </motion.div>
  );
};

// ── Result screen ─────────────────────────────────────────────
const ResultScreen = ({ result, passThreshold, onRetry, onBack, path, layer }) => {
  const { score, passed, correctCount, total, missedResults, xpEarned } = result;

  // auto-navigate to roadmap after pass
  useEffect(() => {
    if (!passed) return;
    const t = setTimeout(onBack, 3000);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passed]);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-start px-6 py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="w-full max-w-2xl">
        <div className={`rounded-2xl border p-8 mb-8 text-center ${passed ? "border-purple-700/50 bg-purple-950/20" : "border-neutral-800 bg-neutral-900/40"}`}>
          <motion.div
            className={`text-7xl font-bold mb-2 ${passed ? "text-purple-400" : "text-neutral-400"}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          >
            {score}%
          </motion.div>
          <div className={`text-lg font-semibold mb-1 ${passed ? "text-purple-300" : "text-neutral-300"}`}>
            {passed ? "Layer Passed!" : "Not Yet"}
          </div>
          <p className="text-sm text-neutral-500">
            {correctCount} / {total} correct · pass threshold {passThreshold}%
          </p>

          {passed ? (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-center gap-2 text-purple-400 text-sm">
                <CheckCircle2 size={16} /> Next layer unlocked
              </div>
              {xpEarned > 0 && (
                <p className="text-sm font-semibold text-yellow-400">+{xpEarned} XP</p>
              )}
              <p className="text-xs text-neutral-600">Returning to roadmap in 3 seconds...</p>
            </div>
          ) : (
            <div className="mt-4 flex items-center justify-center gap-2 text-neutral-500 text-sm">
              <XCircle size={16} /> Review your weak spots and retry
            </div>
          )}
        </div>

        {missedResults?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-[10px] uppercase tracking-widest text-neutral-600 mb-3">Topics to review</h3>
            <div className="space-y-3">
              {missedResults.map((r) => (
                <div key={r.id} className="rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-3">
                  <p className="text-sm text-neutral-300 mb-2">{r.stem}</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-red-900/30 text-red-400 border border-red-800/40">
                      Your answer: {r.yourAnswer}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-green-900/30 text-green-400 border border-green-800/40">
                      Correct: {r.correctAnswer}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] text-neutral-600 uppercase tracking-wider">{r.topic}</span>
                    {layer && (
                      // Small link, 44px invisible hit area on touch screens.
                      <Link
                        to={`/libs?layer=${encodeURIComponent(layer)}`}
                        className="relative text-xs font-medium text-purple-400 hover:text-purple-300 after:absolute after:-inset-x-2 after:-inset-y-3 after:content-['']"
                      >
                        Review in the library
                      </Link>
                    )}
                  </div>
                  {r.hasRubric && (
                    <InlineTeachBack path={path} layer={layer} topic={r.topic} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-700 text-neutral-400 hover:text-neutral-200 hover:border-neutral-500 text-sm transition-colors"
          >
            <ArrowLeft size={14} /> Back to Roadmap
          </button>
          {!passed && (
            <button
              onClick={onRetry}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors"
            >
              <RotateCcw size={14} /> Retry test
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ── Main exam page ────────────────────────────────────────────
// ── Intro screen ──────────────────────────────────────────────
// Shown before anything is generated: generating an exam starts the clock and
// uses up questions the learner hasn't seen yet, so it only happens on Start.
const ExamIntro = ({ onStart, onBack }) => {
  const {
    questionsPerExam, secondsPerQuestion, passThreshold, maxAttemptsPerDay, cooldownAfterFailMins, maxTabLeaves,
  } = EXAM_RULES;
  const rules = [
    {
      Icon: ListChecks,
      text: `${questionsPerExam} multiple-choice questions on this layer, one at a time. You can't go back to a question.`,
    },
    {
      Icon: Clock,
      text: `${secondsPerQuestion} seconds per question. When the time runs out, the choice you selected is sent, or the question is skipped.`,
    },
    { Icon: CheckCircle2, text: `Score ${passThreshold}% or more to pass and unlock the next layer.` },
    {
      Icon: RotateCcw,
      text: `If you don't pass, you can retry after ${cooldownAfterFailMins} minutes, up to ${maxAttemptsPerDay} attempts a day on this layer. Retries use questions you haven't seen yet where possible.`,
    },
    {
      Icon: Eye,
      text: `Stay on this tab. Leaving it gets a warning; leaving it ${maxTabLeaves} times ends the attempt, and it counts as not passed.`,
    },
    { Icon: ShieldAlert, text: "Copying the questions is turned off, and your mentor is paused during the test." },
    { Icon: AlertTriangle, text: "Closing or reloading the page in the middle loses your progress." },
  ];

  return (
    <motion.div
      className="min-h-dvh flex items-center justify-center px-6 py-10"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="w-full max-w-lg">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-1">Layer test</p>
        <h1 className="text-2xl font-semibold text-neutral-100 mb-6">Before you start</h1>
        <ul className="space-y-4 mb-8">
          {rules.map(({ Icon, text }) => (
            <li key={text} className="flex gap-3 text-sm text-neutral-300">
              <Icon size={16} className="mt-0.5 shrink-0 text-purple-400" aria-hidden="true" />
              {text}
            </li>
          ))}
        </ul>
        {/* Stacked on phones (Start on top, the main action), side by side from sm up. */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <button
            onClick={onBack}
            className="flex min-h-11 items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-700 text-neutral-400 hover:text-neutral-200 hover:border-neutral-500 text-sm transition-colors"
          >
            <ArrowLeft size={14} /> Back to Roadmap
          </button>
          <button
            onClick={onStart}
            className="flex min-h-11 items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors"
          >
            Start test <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Keyed by path and layer, so moving between two exams starts a fresh intro
// instead of reusing the previous exam's state.
export default function ExamPage() {
  const { layerId } = useParams();
  const [searchParams] = useSearchParams();
  return <ExamRunner key={`${searchParams.get("path") ?? ""}:${layerId}`} />;
}

function ExamRunner() {
  const { layerId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setLayerStatus } = useRoadmapStore();

  // path comes from URL param — safe for direct navigation
  const path = searchParams.get("path") ?? "backend";

  const [loadState, setLoadState] = useState("intro"); // intro | loading | cooldown | error | ready
  const [errorMsg, setErrorMsg] = useState("");
  const [examData, setExamData] = useState(null); // { attemptId, passThreshold, total, secondsPerQuestion }

  // The server sends one question at a time; earlier ones cannot be reopened.
  const [question, setQuestion] = useState(null);
  const [number, setNumber] = useState(1);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [leaveWarning, setLeaveWarning] = useState(false);
  // A click and the timer running out must not both answer the same question.
  const sendingRef = useRef(false);

  const fetchExam = useCallback(async () => {
    setLoadState("loading");
    setErrorMsg("");
    setSubmitError("");
    setLeaveWarning(false);
    setSelected(null);
    setResult(null);
    setExamData(null);
    setQuestion(null);
    setNumber(1);

    try {
      const res = await apiFetch(`${API_BASE_URL}/api/exams/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ path, layer: layerId }),
      });
      const data = await res.json();

      if (res.status === 429) {
        setErrorMsg(data.message ?? "Cooldown active. Please wait.");
        setLoadState("cooldown");
        return;
      }
      if (!res.ok) {
        setErrorMsg(data.message ?? "Failed to load test.");
        setLoadState("error");
        return;
      }

      const { question: first, ...meta } = data;
      setExamData(meta);
      setQuestion(first);
      setLoadState("ready");
    } catch {
      setErrorMsg("Network error — please try again.");
      setLoadState("error");
    }
  }, [layerId, path]);

  // No fetch on mount: the exam is generated when the learner presses Start
  // on the intro screen (generating it starts the clock).

  // React Router keeps the previous page's scroll position on navigation,
  // so jump to the top whenever an exam is entered.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [layerId]);

  // warn before leaving mid-exam
  useEffect(() => {
    if (loadState !== "ready" || result) return;
    const handler = (e) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [loadState, result]);

  // Leaving the tab is reported to the server, which counts the leaves and
  // ends the attempt at the limit. The question timer keeps running meanwhile.
  const attemptId = examData?.attemptId;
  useEffect(() => {
    if (!attemptId || result) return;
    const onVisibility = async () => {
      if (!document.hidden) return;
      try {
        const res = await apiFetch(`${API_BASE_URL}/api/exams/leave`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...authHeaders() },
          body: JSON.stringify({ attemptId }),
          keepalive: true, // the tab is in the background; the request must still go out
        });
        if (!res.ok) return;
        const data = await res.json();
        if (data.voided) setResult({ voided: true });
        else setLeaveWarning(true);
      } catch {
        /* offline: the server-side question timer still applies */
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [attemptId, result]);

  // `choice` is null when the timer ran out with nothing selected (a skip).
  const sendAnswer = useCallback(async (choice) => {
    if (sendingRef.current || !attemptId || !question) return;
    sendingRef.current = true;
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await apiFetch(`${API_BASE_URL}/api/exams/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ attemptId, questionId: question.id, choice }),
      });
      const data = await res.json();
      // Stay on the question on failure so the learner can retry sending it.
      if (!res.ok) {
        setSubmitError(data.message ?? "Failed to send your answer.");
        return;
      }
      if (data.done) {
        if (data.result.passed) setLayerStatus(layerId, "done");
        setResult(data.result);
        return;
      }
      setQuestion(data.question);
      setNumber(data.number);
      setSelected(null);
    } catch {
      setSubmitError("Network error while sending your answer. Please retry.");
    } finally {
      sendingRef.current = false;
      setSubmitting(false);
    }
  }, [attemptId, question, layerId, setLayerStatus]);

  // Back to the layer the learner came from, not the top of the page
  // (RoadmapTree scrolls to ?layer= once the tree has loaded).
  const goBack = useCallback(
    () => navigate(`/roadmaps?layer=${encodeURIComponent(layerId)}`),
    [navigate, layerId],
  );

  const confirmLeave = () => {
    if (loadState === "ready" && !result) {
      if (!window.confirm("Leave the test? Your progress will be lost.")) return;
    }
    goBack();
  };

  // ── Render states ──────────────────────────────────────────

  if (loadState === "intro") {
    return <ExamIntro onStart={fetchExam} onBack={goBack} />;
  }

  if (loadState === "loading") {
    return (
      <LoadingSuspense />
    );
  }

  if (loadState === "cooldown") {
    return <CooldownScreen message={errorMsg} onBack={goBack} />;
  }

  if (loadState === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="w-14 h-14 rounded-full border border-neutral-800 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={22} className="text-neutral-500" />
          </div>
          <p className="text-sm text-neutral-400 mb-6">{errorMsg}</p>
          <div className="flex gap-3 justify-center">
            <button onClick={goBack} className="px-4 py-2 rounded-xl border border-neutral-700 text-neutral-400 text-sm hover:text-neutral-200 transition-colors">
              Back
            </button>
            <button onClick={fetchExam} className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm transition-colors">
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (result?.voided) {
    return <VoidedScreen onBack={goBack} />;
  }

  if (result) {
    return (
      <ResultScreen
        result={result}
        passThreshold={examData.passThreshold}
        onRetry={fetchExam}
        onBack={goBack}
        path={path}
        layer={layerId}
      />
    );
  }

  // ── Exam in progress ───────────────────────────────────────

  const { passThreshold, total, secondsPerQuestion } = examData;
  const q = question;
  const isLast = number === total;

  return (
    <div className="min-h-screen flex flex-col px-6 py-10 max-w-2xl mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={confirmLeave}
          className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-300 text-sm transition-colors"
        >
          <ArrowLeft size={14} /> Roadmaps
        </button>
        <QuestionTimer key={q.id} seconds={secondsPerQuestion} onExpire={() => sendAnswer(selected)} />
      </div>

      {leaveWarning && (
        <div role="alert" className="mb-6 flex items-start justify-between gap-3 rounded-xl border border-amber-800/50 bg-amber-950/30 px-4 py-3 text-sm text-amber-200">
          <span>
            You left the test tab. If you leave it again, this attempt ends and counts as not passed.
          </span>
          <button
            onClick={() => setLeaveWarning(false)}
            className="shrink-0 px-3 py-1.5 rounded-lg border border-amber-700/60 text-xs font-medium hover:bg-amber-900/40"
          >
            Got it
          </button>
        </div>
      )}

      {/* Progress header */}
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-1">
          Layer Exam · pass threshold {passThreshold}%
        </p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-neutral-300">Question {number} of {total}</span>
          <span className="text-xs text-neutral-400">no going back</span>
        </div>
        <div
          role="progressbar"
          aria-label="Test progress"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={number}
          className="h-2 rounded-full bg-neutral-800 overflow-hidden"
        >
          <motion.div
            className="h-full bg-linear-to-r from-purple-600 to-violet-500 rounded-full"
            animate={{ width: `${(number / total) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="flex-1"
        >
          <NoCopy>
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-widest text-purple-500/70 mb-2 block">{q.topic}</span>
              <h2 className="text-lg font-semibold text-neutral-100 leading-snug">{q.stem}</h2>
            </div>

            <div role="radiogroup" aria-label={q.stem} className="space-y-3">
              {q.choices.map((choice, idx) => (
                <button
                  key={idx}
                  role="radio"
                  aria-checked={selected === idx}
                  onClick={() => setSelected(idx)}
                  className={`w-full min-h-11 text-left px-4 py-3.5 rounded-xl border text-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                    selected === idx
                      ? "border-purple-500 bg-purple-900/30 text-purple-200"
                      : "border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-neutral-600 hover:bg-neutral-800/60"
                  }`}
                >
                  <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold mr-3 shrink-0 ${selected === idx ? "bg-purple-600 text-white" : "bg-neutral-800 text-neutral-500"}`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {choice}
                </button>
              ))}
            </div>
          </NoCopy>
        </motion.div>
      </AnimatePresence>

      {submitError && (
        <div role="alert" className="mt-6 flex items-center justify-between gap-3 rounded-xl border border-red-800/50 bg-red-950/30 px-4 py-3 text-sm text-red-300">
          <span>{submitError}</span>
          <button
            onClick={() => sendAnswer(selected)}
            disabled={submitting}
            className="shrink-0 px-3 py-1.5 rounded-lg bg-red-700/60 hover:bg-red-600/60 text-white text-xs font-medium disabled:opacity-50"
          >
            Retry
          </button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-end mt-8 pt-6 border-t border-neutral-800">
        <button
          onClick={() => sendAnswer(selected)}
          disabled={selected == null || submitting}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {submitting && <Loader2 size={14} className="animate-spin" />}
          {isLast ? "Submit Test" : "Next"}
          {!isLast && !submitting && <ChevronRight size={14} />}
        </button>
      </div>
    </div>
  );
}
