import { useState } from "react";
import { Search, X } from "lucide-react";
import FilterGroup from "./FilterGroup";
import MoreFiltersPopover from "./MoreFiltersPopover";
import { STATUS_OPTIONS } from "../../lib/statuses";

const Divider = () => <div className="hidden sm:block w-px h-4 bg-[#1f1f1f]" />;

/** Sticky toolbar: Path / Layer / Level / Status, recommended, more filters, search. */
export default function FilterBar({ filters, topics, tracks, shownTrack }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const openMenu = (name) => setOpenDropdown(name);
  const closeMenu = () => setOpenDropdown(null);

  const {
    activePath,
    setActivePath,
    activeLayer,
    setActiveLayer,
    activeLevel,
    setActiveLevel,
    recommended,
    setRecommended,
    selectedTopics,
    toggleTopicFilter,
    timeRange,
    setTimeRange,
    activeStatus,
    setActiveStatus,
    clearMoreFilters,
    activeFilterCount,
    clearAll,
    searchQuery,
    setSearchQuery,
  } = filters;

  // Real tracks from /tracks, the learner's own first and labelled as theirs.
  const pathTotal = tracks.reduce((sum, t) => sum + t.count, 0);
  const pathOptions = [
    ...tracks.map((t) => ({
      value: t.trackId,
      label: t.isMine ? `${t.title} · yours` : t.title,
      meta: t.count,
    })),
    { value: "all", label: "All paths", meta: pathTotal },
  ];

  return (
    <div className="sticky top-[var(--navbar-h)] z-30 px-6 sm:px-10 lg:px-14 py-3 flex flex-wrap items-center gap-3 backdrop-blur-sm border-b border-[#1a1a1a]">
      <FilterGroup
        label="Path"
        allLabel="All paths"
        options={pathOptions}
        // Before the first response the URL may say nothing ("my path");
        // the server's resolved track is what's actually on screen.
        active={activePath ?? shownTrack}
        onSelect={setActivePath}
        isOpen={openDropdown === "path"}
        onOpen={() => openMenu("path")}
        onClose={closeMenu}
      />
      <Divider />
      <FilterGroup
        label="LAYER"
        options={["all", "1", "2", "3", "4+"]}
        active={activeLayer}
        onSelect={setActiveLayer}
        isOpen={openDropdown === "layer"}
        onOpen={() => openMenu("layer")}
        onClose={closeMenu}
      />
      <Divider />
      <FilterGroup
        label="Level"
        options={["all", "easy", "med", "hard"]}
        active={activeLevel}
        onSelect={setActiveLevel}
        isOpen={openDropdown === "level"}
        onOpen={() => openMenu("level")}
        onClose={closeMenu}
      />
      <Divider />
      <FilterGroup
        label="Status"
        allLabel="Any status"
        options={[{ value: "all", label: "Any status" }, ...STATUS_OPTIONS.map(({ key, label }) => ({ value: key, label }))]}
        active={activeStatus}
        onSelect={setActiveStatus}
        isOpen={openDropdown === "status"}
        onOpen={() => openMenu("status")}
        onClose={closeMenu}
      />
      <Divider />
      <button
        onClick={() => setRecommended(!recommended)}
        className={`cursor-pointer whitespace-nowrap rounded-md border px-2.5 py-1.5 text-xs font-medium transition-all duration-200 ${
          recommended
            ? "border-purple-600 bg-purple-600 text-white"
            : "border-[#1f1f1f] bg-[#141414] text-[#888] hover:border-purple-900/60 hover:bg-purple-950/40 hover:text-purple-300"
        }`}
      >
        + recommended
      </button>
      <Divider />
      <MoreFiltersPopover
        topics={topics}
        selectedTopics={selectedTopics}
        onToggleTopic={toggleTopicFilter}
        timeRange={timeRange}
        onSelectTimeRange={setTimeRange}
        onClear={clearMoreFilters}
        activeCount={selectedTopics.length + (timeRange ? 1 : 0)}
      />

      {activeFilterCount > 0 && (
        <button
          type="button"
          onClick={clearAll}
          className="cursor-pointer text-xs font-medium text-purple-400 hover:text-purple-300"
        >
          Clear all
        </button>
      )}

      <div className="ml-auto flex items-center gap-2 rounded-md border border-[#1f1f1f] bg-[#141414] px-3 py-2">
        <Search className="h-3.5 w-3.5 shrink-0 text-[#555]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search challenges..."
          className="min-w-0 w-[220px] bg-transparent text-sm text-[#e5e5e5] placeholder-[#555] outline-none"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="shrink-0 text-[#555] hover:text-[#888]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
