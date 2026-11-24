import { Bone } from "@/components/ui/Skeleton";
import { BellOff, Users } from "lucide-react";
import { formatTimeAgo } from "../lib/time";

/** One conversation (direct or group) in the Messages list. */
const ConversationRow = ({ item, isActive, isLoadingPreview, onSelect }) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={isActive ? "true" : undefined}
      className={`flex w-full items-center gap-3 border-b border-white/5 px-3 py-3 text-left transition-colors first:border-t focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-fuchsia-400 ${
        isActive ? "bg-fuchsia-950/30" : "hover:bg-white/5"
      }`}
    >
      {item.avatar ? (
        <img
          src={item.avatar}
          alt="Profile"
          className="h-8 w-8 shrink-0 rounded-full bg-purple-100 object-cover"
        />
      ) : (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-fuchsia-950/40 dark:text-fuchsia-300">
          {item.kind === "group" ? <Users size={14} /> : item.title?.[0]?.toUpperCase()}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1.5 text-sm font-medium text-gray-100">
          <span className="truncate">{item.title}</span>
          {item.muted && <BellOff size={12} className="shrink-0 text-[#8A8A93]" aria-label="Muted" />}
        </p>
        <div className="flex items-center justify-between">
          {isLoadingPreview ? (
            <>
              <Bone className="my-0.5 h-3 w-[120px]" />
              <Bone soft className="my-0.5 h-3 w-11" />
            </>
          ) : (
            <>
              <p className="truncate text-xs text-[#8A8A93]">{item.preview?.text || "No messages yet"}</p>
              {item.preview && (
                <p className="ml-2 shrink-0 text-xs text-[#8A8A93]">{formatTimeAgo(item.preview.updatedAt)}</p>
              )}
            </>
          )}
        </div>
      </div>
    </button>
  );
};

export default ConversationRow;
