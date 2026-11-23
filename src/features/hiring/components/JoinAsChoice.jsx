import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OptionCards from "./OptionCards";
import FormButtons from "./FormButtons";
import { JOIN_AS } from "../../../../constants/hiring";

// The first screen of "Create account": developer or hiring. Asked once, with
// big explicit cards, so a recruiter can't end up with a learner account by
// clicking the wrong small link.
const JoinAsChoice = ({ onDeveloper }) => {
  const navigate = useNavigate();
  const [choice, setChoice] = useState(null);

  const go = () => (choice === "hiring" ? navigate("/hiring/join") : onDeveloper());

  return (
    <div className="space-y-6">
      <OptionCards name="joinAs" options={JOIN_AS.options} value={choice} onChange={setChoice} sideBySide />
      <FormButtons type="button" primary="Continue" disabled={!choice} onPrimary={go} />
    </div>
  );
};

export default JoinAsChoice;
