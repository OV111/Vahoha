import { Link } from "react-router-dom";
import vahohaMark from "@/assets/brand/vahoha-mark-96.webp";

// The brand name is a logo, so it must render identically everywhere: same
// typeface as the hero headline (Geist), same weight, same tracking. Only the
// size changes per placement, and only through these presets.
const SIZES = {
  sm: "text-lg",
  md: "text-xl",
};

// Colour and hover. A placement that wants its own passes `look`, which
// replaces this whole set: plain concatenation can't resolve two colours or two
// hovers, and that's all tailwind-merge was here for (it is the largest piece
// of the first-load bundle).
const DEFAULT_LOOK = "text-white transition-opacity hover:opacity-80";

// `markOnMobile`: below the md breakpoint the name collapses to the logo mark, so
// a crowded mobile navbar keeps its space. The link keeps its aria-label either way.
// `className` is for layout (margins, line height, breakpoint sizes) only.
const Wordmark = ({ size = "md", look = DEFAULT_LOOK, className = "", markOnMobile = false }) => (
  <Link
    to="/"
    aria-label="Vahoha home"
    className={`font-semibold tracking-[-0.02em] ${SIZES[size]} ${look} ${className}`}
    style={{ fontFamily: '"Geist Variable", system-ui, sans-serif' }}
  >
    {markOnMobile ? (
      <>
        <img src={vahohaMark} alt="" width={32} height={32} className="block h-8 w-8 rounded-full md:hidden" />
        <span className="hidden md:inline">Vahoha</span>
      </>
    ) : (
      "Vahoha"
    )}
  </Link>
);

export default Wordmark;
