import { Flame } from "lucide-react";
import { PROGRESS_COPY } from "../../../../constants/progress";
import { TEXT, MUTED, SOFT, BORDER, SURFACE } from "../lib/tone";

const COPY = PROGRESS_COPY.stats;

const weekdayLetter = (day) =>
  new Date(`${day}T12:00:00Z`).toLocaleDateString(undefined, { weekday: "narrow", timeZone: "UTC" });

/** Streak, XP and the last 7 days, one dot per day with learning. */
const ActivityCard = ({ journey }) => {
  const activeDays = journey.week.filter((d) => d.active).length;

  return (
    <section aria-labelledby="activity-heading" className={`rounded-xl border p-5 ${BORDER} ${SURFACE}`}>
      <h2 id="activity-heading" className={`text-base font-semibold ${TEXT}`}>
        {COPY.heading}
      </h2>

      <div className="mt-4 flex items-start gap-3">
        <Flame
          size={20}
          aria-hidden="true"
          className={`mt-0.5 shrink-0 ${journey.streak ? "text-orange-500" : "text-zinc-300 dark:text-zinc-700"}`}
        />
        <div>
          <p className={`text-sm font-semibold ${TEXT}`}>
            {journey.streak ? COPY.streak(journey.streak) : COPY.noStreak}
          </p>
          {!journey.streak && <p className={`text-xs ${MUTED}`}>{COPY.streakHint}</p>}
        </div>
      </div>

      <p className={`mt-3 text-sm ${SOFT}`}>
        <span className={`font-semibold ${TEXT}`}>{COPY.xp(journey.xpTotal)}</span> {COPY.xpSuffix}
      </p>

      <div className={`mt-4 border-t pt-4 ${BORDER}`}>
        <p className={`text-xs ${MUTED}`}>{COPY.week}</p>
        <ol
          className="mt-2 grid grid-cols-7 gap-1"
          aria-label={`${COPY.week}: ${COPY.weekActive(activeDays)}`}
        >
          {journey.week.map((d) => (
            <li key={d.day} className="flex flex-col items-center gap-1.5" aria-hidden="true">
              <span
                className={`h-3 w-3 rounded-full ${
                  d.active ? "bg-purple-600 dark:bg-purple-400" : "bg-zinc-200 dark:bg-zinc-800"
                }`}
              />
              <span className={`text-[10px] leading-none ${MUTED}`}>{weekdayLetter(d.day)}</span>
            </li>
          ))}
        </ol>
        <p className={`mt-3 text-sm ${SOFT}`}>{COPY.weekActive(activeDays)}</p>
      </div>
    </section>
  );
};

export default ActivityCard;
