import { useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";
import { Search } from "lucide-react";
import SearchBar from "../../search/SearchBar";
import NavSearchResults from "./NavSearchResults";
import { focusRing } from "./styles";

// Desktop search: an icon that expands into a search field on hover or click.
export default function NavSearch({
  isOpen,
  onOpen,
  onClose,
  onTriggerClick,
  value,
  onChange,
}) {
  const searchRef = useRef(null);

  return (
    <div
      ref={searchRef}
      className="relative hidden items-center gap-2 md:flex"
      onMouseEnter={onOpen}
      // Keep it open while there is a query, so moving the mouse away
      // doesn't throw away what was typed.
      onMouseLeave={() => !value && onClose()}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 220 }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <SearchBar value={value} onChange={onChange} placeholder="Search…" />
            <NavSearchResults query={value} boundaryRef={searchRef} />
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={onTriggerClick}
        aria-label="Open search"
        aria-expanded={isOpen}
        aria-controls="search-results"
        className={`flex h-8 w-8 items-center justify-center rounded-full transition ${focusRing} ${
          isOpen ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"
        }`}
      >
        <Search size={16} />
      </button>
    </div>
  );
}
