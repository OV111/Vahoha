import { useState } from "react";
import { ArrowUpDown, ChevronDown, Search } from "lucide-react";

const SORT_OPTIONS = ["Newest", "Oldest"];

/** Search box and Newest/Oldest sort menu above the conversation list. */
const ConversationFilters = ({ filter, onFilterChange, sortOrder, onSortChange }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);

  return (
    <div className="px-3 pt-5">
      <label
        htmlFor="chat-search"
        className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-100 px-3 py-[3px] transition focus-within:border-purple-400 dark:border-white/10 dark:bg-white/5"
      >
        <Search size={20} className="text-gray-400" aria-hidden="true" />
        <input
          id="chat-search"
          type="text"
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          placeholder="Search conversations"
          className="w-full bg-transparent text-base text-gray-700 outline-none placeholder:text-gray-400 md:text-sm dark:text-gray-200"
        />
      </label>

      <div className="relative flex justify-end py-2">
        <button
          type="button"
          onClick={() => setIsSortOpen((open) => !open)}
          className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/5"
        >
          <ArrowUpDown size={16} />
          <div className="flex items-center justify-center gap-1">
            <span>{sortOrder}</span>
            <ChevronDown size={16} className={`transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""}`} />
          </div>
        </button>

        {isSortOpen && (
          <div className="absolute top-full mt-0 w-36 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/10 dark:bg-black">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onSortChange(option);
                  setIsSortOpen(false);
                }}
                className={`block w-full px-3 py-2 text-left text-sm transition hover:bg-gray-50 dark:hover:bg-white/5 ${
                  sortOrder === option
                    ? "bg-purple-50 text-purple-600 dark:bg-white/5 dark:text-purple-600"
                    : "text-gray-700 dark:text-gray-200"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationFilters;
