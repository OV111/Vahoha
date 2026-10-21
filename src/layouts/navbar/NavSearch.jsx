import { Suspense, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import SearchBar from "../../components/search/SearchBar";
import SearchResults from "../../components/search/SearchResults";
import { focusRing } from "./parts";

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
      {/* CSS width transition, no animation library on the critical path.
          The field stays mounted (invisible when closed, so it can't be
          tabbed into); results only exist while it is open. */}
      <div
        aria-hidden={!isOpen}
        className={`overflow-hidden transition-[width,opacity,visibility] duration-[250ms] ease-out motion-reduce:transition-none ${
          isOpen ? "visible w-[220px] opacity-100" : "invisible w-0 opacity-0"
        }`}
      >
        <SearchBar value={value} onChange={onChange} placeholder="Search…" />
        {isOpen && <NavSearchResults query={value} boundaryRef={searchRef} />}
      </div>
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

// Search results shared by the desktop and mobile search, with one place
// deciding where each kind of result navigates to.
export function NavSearchResults({ query, boundaryRef }) {
  const navigate = useNavigate();

  const handleSelect = (item) => {
    if (item.type === "user") navigate(`/users/${item.username}`);
    else if (item.type === "post") navigate(`/?search=${encodeURIComponent(item.title)}`);
    else if (item.type === "category") navigate(item.path ?? `/roadmaps?domain=${item.id}`);
  };

  return (
    <Suspense fallback={null}>
      <SearchResults query={query} onSelect={handleSelect} boundaryRef={boundaryRef} />
    </Suspense>
  );
}
