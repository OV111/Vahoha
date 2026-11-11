import { MENTOR_USAGE_COPY as COPY, THIN_SCROLL_CLASS } from "../../../../constants/mentorUsage";
import { formatAgo, formatFull } from "../lib/usageFormat";

/** Per-conversation totals, newest first. A deleted chat keeps its usage but loses its title. */
export default function UsageSessionsTable({ sessions }) {
  const rows = (Array.isArray(sessions) ? sessions : [])
    .slice()
    .sort((a, b) => new Date(b.lastAt).getTime() - new Date(a.lastAt).getTime());

  if (!rows.length) {
    return <p className="text-sm text-gray-500 dark:text-[#8A8A93]">{COPY.conversationsEmpty}</p>;
  }

  return (
    <div className={`max-h-72 overflow-auto ${THIN_SCROLL_CLASS}`}>
      <table className="w-full text-left text-sm">
        <thead className="text-xs text-gray-500 dark:text-[#8A8A93]">
          <tr>
            <th className="py-1 font-medium">{COPY.colConversation}</th>
            <th className="py-1 text-right font-medium">{COPY.colTurns}</th>
            <th className="py-1 text-right font-medium">{COPY.colTokens}</th>
            <th className="py-1 text-right font-medium">{COPY.colLastUsed}</th>
          </tr>
        </thead>
        <tbody className="text-gray-800 dark:text-gray-200">
          {rows.map((s, i) => (
            <tr key={s.sessionId ?? i} className="border-t border-gray-100 dark:border-white/5">
              <td className="max-w-[260px] truncate py-1.5 pr-3">
                {s.title ? (
                  s.title
                ) : (
                  <span className="italic text-gray-400 dark:text-[#8A8A93]">{COPY.deletedChat}</span>
                )}
              </td>
              <td className="py-1.5 text-right tabular-nums">{formatFull(s.turns)}</td>
              <td className="py-1.5 text-right tabular-nums">{formatFull(s.totalTokens)}</td>
              <td className="whitespace-nowrap py-1.5 pl-3 text-right text-gray-500 dark:text-[#8A8A93]">
                {formatAgo(s.lastAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
