import { useNavigate, useParams } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
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
  const { eligibility, attempt, isBusy, error, start, submitText, submitAudio, abandon } =
    useVoiceExam(layerId);

  const goBack = () => navigate("/roadmaps");

  const renderBody = () => {
    if (!attempt) {
      return <PreExam eligibility={eligibility} isBusy={isBusy} onBegin={start} />;
    }
    // A request is in flight (transcribing / grading) or the server says it is working.
    if (isBusy || WORKING_STATES.includes(attempt.state)) {
      const grading = attempt.state === EXAM_STATES.GRADING;
      return <TranscribingState label={grading ? "Grading your exam…" : undefined} />;
    }
    if (INPUT_STATES.includes(attempt.state)) {
      return (
        <RecordingPanel
          key={attempt.currentPrompt.n} // fresh recorder and typed text for each question
          attempt={attempt}
          isBusy={isBusy}
          onSubmitAudio={submitAudio}
          onSubmitText={submitText}
          onAbandon={abandon}
        />
      );
    }
    if (attempt.state === EXAM_STATES.COMPLETED && attempt.result) {
      return <ResultPanel result={attempt.result} onClose={goBack} />;
    }
    if (FAILURE_STATES.includes(attempt.state)) {
      return <TerminalNotice state={attempt.state} onClose={goBack} />;
    }
    return null;
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-[22px] sm:text-[24px] font-semibold text-[#1a1f36] dark:text-white mb-1">
        Voice exam
      </h1>
      <p className="text-[13.5px] text-[#697386] dark:text-zinc-400 mb-7">
        Explain the layer out loud, then answer follow-up questions.
      </p>

      {error && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm px-4 py-3 mb-5"
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
