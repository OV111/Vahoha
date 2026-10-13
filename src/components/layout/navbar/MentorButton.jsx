import { NavLink } from "react-router-dom";
import { Sparkles } from "lucide-react";
import "./mentor-button.css";

// Mentor is the flagship feature, so it sits in a pill with a light line
// travelling around the border. CSS-only and respects reduced motion.
const MentorButton = ({ className = "" }) => (
  <NavLink
    to="/ai-agent"
    className={`mentor-pill flex items-center gap-1 px-2.5 py-0.5 font-semibold text-purple-200 focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none ${className}`}
  >
    <Sparkles size={13} className="text-purple-400" />
    Mentor
  </NavLink>
);

export default MentorButton;
