import { Eye } from "lucide-react";

// Shown in place of learner actions (take test, submit, ask mentor) for a hiring
// account: says what a developer does here instead of a row of dead buttons.
const ViewOnlyNotice = ({ children, className = "" }) => (
  <p className={`flex items-start gap-2 text-[13px] leading-snug text-neutral-400 ${className}`}>
    <Eye size={14} className="mt-0.5 shrink-0 text-purple-400" aria-hidden="true" />
    <span>
      <span className="font-medium text-neutral-200">Hiring view.</span> {children}
    </span>
  </p>
);

export default ViewOnlyNotice;
