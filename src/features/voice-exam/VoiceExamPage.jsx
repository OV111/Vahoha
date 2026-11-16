import { useNavigate, useParams } from "react-router-dom";
import { AlertTriangle, Mic } from "lucide-react";
import { useVoiceExam } from "./hooks/useVoiceExam";
import {
  EXAM_STATES,
  INPUT_STATES,
  WORKING_STATES,
  FAILURE_STATES,
} from "./lib/examStates";
import PreExam from "./components/PreExam";
import RecordingPanel from "./components/RecordingPanel";
import TranscribingState from "./components/TranscribingState";
import ResultPanel from "./components/ResultPanel";
import TerminalNotice from "./components/TerminalNotice";

// One screen, driven by `attempt.state`. The UI never invents a state: it renders
// whatever the server (or the mock API) says the attempt is in.
const VoiceExamPage = () => {
  const { layerId } = useParams();
  const navigate = useNavigate();
  const {
    eligibility,
    attempt,
    isBusy,
    error,
    unsent,
    start,
    submitText,
    submitAudio,
    resend,
    discardUnsent,
    abandon,
    sending,
  } = useVoiceExam(layerId);

  // Back to the layer page this exam belongs to (layer ids are "<track>-<n>").
  const goBack = () =>
    navigate(`/learn/${layerId.replace(/-\d+$/, "")}/${layerId}`);

  const renderBody = () => {
    if (!attempt) {
      return (
        <PreExam eligibility={eligibility} isBusy={isBusy} onBegin={start} />
      );
    }
    // A request is in flight (transcribing / grading) or the server says it is working.
    if (isBusy || WORKING_STATES.includes(attempt.state)) {
      // The last question of the exam ends in grading the whole exam.
      const isLast =
        attempt.state === EXAM_STATES.GRADING ||
        attempt.currentPrompt?.n === attempt.currentPrompt?.total;
      return (
        <TranscribingState
          key={attempt.currentPrompt?.n}
          sending={sending}
          isLast={isLast}
        />
      );
    }
    if (INPUT_STATES.includes(attempt.state)) {
      return (
        <RecordingPanel
          key={attempt.currentPrompt.n} // fresh recorder and typed text for each question
          attempt={attempt}
          isBusy={isBusy}
          unsent={unsent}
          onResend={resend}
          onDiscardUnsent={discardUnsent}
          onSubmitAudio={submitAudio}
          onSubmitText={submitText}
          onAbandon={abandon}
        />
      );
    }
    if (attempt.state === EXAM_STATES.COMPLETED && attempt.result) {
      // Detailed for everyone in the pilot; the Free/Pro split is not decided yet.
      return (
        <ResultPanel
          result={attempt.result}
          layerTitle={eligibility?.layerTitle}
          detailed
          onClose={goBack}
        />
      );
    }
    if (FAILURE_STATES.includes(attempt.state)) {
      return <TerminalNotice state={attempt.state} onClose={goBack} />;
    }
    return null;
  };

  return (
    // Wider before the exam, for the two-column start screen; the exam itself stays narrow and focused.
    <div
      className={`mx-auto px-4 py-10 sm:px-6 sm:py-12 ${attempt ? "max-w-2xl" : "max-w-5xl"}`}
    >
      <h1 className="mb-6 flex items-center gap-2 text-sm font-medium text-emerald-300">
        <Mic size={15} aria-hidden="true" /> Voice exam
      </h1>

      {error && (
        <div
          role="alert"
          className="mb-5 flex items-center gap-2 rounded-2xl border border-rose-900/60 bg-rose-950/30 px-4 py-3 text-sm text-rose-300"
        >
          <AlertTriangle size={16} className="shrink-0" />
          {error}
        </div>
      )}

      {renderBody()}
    </div>
  );
};

export default VoiceExamPage;
