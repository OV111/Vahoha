import { Link } from "react-router-dom";

// One entry point for guests: /get-started opens on signup and has its own
// "log in instead" toggle, so a separate Log in link only splits attention.
// `fullWidth` makes it a thumb-sized button for the mobile menu.
const GuestActions = ({ fullWidth = false, className = "" }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <Link
      to="/get-started"
      className={`text-sm font-medium text-gray-100 transition hover:text-purple-500 ${
        fullWidth
          ? "flex min-h-11 flex-1 items-center justify-center rounded-md border border-white/20 text-center text-base"
          : "py-1.5"
      }`}
    >
      Get Started
    </Link>
  </div>
);

export default GuestActions;
