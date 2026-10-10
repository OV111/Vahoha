import { NavLink } from "react-router-dom";
import { Sparkles } from "lucide-react";

// Styled like the other section links so the bar reads as one row; only the
// sparkle marks it as the AI feature. Static on purpose: no idle animation
// repainting on every page.
const MentorButton = ({ className = "" }) => (
  <NavLink
    to="/ai-agent"
    className={({ isActive }) =>
      `flex items-center gap-1 rounded transition focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none ${
        isActive ? "text-purple-500" : "hover:text-purple-500"
      } ${className}`
    }
  >
    <Sparkles size={13} className="text-purple-600" />
    Mentor
  </NavLink>
);

export default MentorButton;
