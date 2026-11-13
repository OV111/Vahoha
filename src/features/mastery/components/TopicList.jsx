import { useState } from "react";
import { Sparkles } from "lucide-react";
import { STATUS_META, STATUS_ORDER } from "../lib/statusMeta";
import { PROGRESS_COPY } from "../../../../constants/progress";
import { TEXT, MUTED, BORDER, CHIP, FOCUS } from "../lib/tone";

const COPY = PROGRESS_COPY.topics;

const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : null;

const TopicRow = ({ topic, onAskMentor }) => {
  const misconceptions = topic.misconceptions.filter((m) => m.description);
  const date = formatDate(topic.lastEvidenceAt);

  return (
    <li className="py-3">
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <p className={`min-w-0 text-sm font-medium ${TEXT}`}>{topic.title}</p>
        <div className="flex flex-wrap items-center gap-1.5">
          {/* The engine attaches the whole layer-test score to each topic missed
              in that test: it is not a per-topic score, so it says "Test". */}
          {topic.examScore != null && <span className={CHIP}>{COPY.test(topic.examScore)}</span>}
          {topic.teachBackScore != null && <span className={CHIP}>{COPY.explained(topic.teachBackScore)}</span>}
          {topic.failCount > 0 && <span className={CHIP}>{COPY.missed(topic.failCount)}</span>}
        </div>
      </div>
      {date && <p className={`mt-1 text-xs ${MUTED}`}>{COPY.lastSeen(date)}</p>}

      {misconceptions.length > 0 && (
        <div className="mt-3 rounded-md border border-amber-300 bg-amber-50 p-3 dark:border-amber-500/20 dark:bg-amber-500/5">
          <p className="mb-1 text-xs font-semibold text-amber-800 dark:text-amber-300">{COPY.misconceptions}</p>
          <ul className="space-y-1 text-[13px] text-amber-900 dark:text-amber-100/90">
            {misconceptions.map((m) => (
              <li key={m.id}>“{m.description}”</li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() =>
              onAskMentor({
                origin: { surface: "progress", topic: topic.title, layer: topic.layer?.title },
                prompt: PROGRESS_COPY.mentorPrompts.misconception(topic.title, misconceptions[0].description),
                subtitle: topic.title,
              })
            }
            className={`mt-2 inline-flex cursor-pointer items-center gap-1.5 rounded text-xs font-medium text-amber-800 hover:underline dark:text-amber-300 ${FOCUS}`}
          >
            <Sparkles size={12} aria-hidden="true" /> {COPY.fixWithMentor}
          </button>
        </div>
      )}
    </li>
  );
};

/** Topics of one status, grouped under their layer so the layer is named once. */
const groupByLayer = (topics) => {
  const groups = new Map();
  for (const t of topics) {
    const key = t.layer?.title ?? "";
    if (!groups.has(key)) groups.set(key, { layer: t.layer, topics: [] });
    groups.get(key).topics.push(t);
  }
  // Roadmap order; topics with no layer last.
  return [...groups.values()].sort((a, b) => (a.layer?.order ?? Infinity) - (b.layer?.order ?? Infinity));
};

/**
 * Topics behind tabs, one status at a time, opening on the first status that
 * has any. Replaces a single long list of every topic: a learner deciding what
 * to work on needs one group, not all of them at once.
 */
const TopicList = ({ topics, onAskMentor }) => {
  const counts = Object.fromEntries(STATUS_ORDER.map((s) => [s, topics.filter((t) => t.status === s).length]));
  const [tab, setTab] = useState(() => STATUS_ORDER.find((s) => counts[s] > 0) ?? STATUS_ORDER[0]);
  const shown = topics.filter((t) => t.status === tab);

  const onKeyDown = (event) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    const next = STATUS_ORDER[(STATUS_ORDER.indexOf(tab) + step + STATUS_ORDER.length) % STATUS_ORDER.length];
    setTab(next);
    document.getElementById(`tab-${next}`)?.focus();
  };

  return (
    <section aria-labelledby="topics-heading">
      <h2 id="topics-heading" className={`text-lg font-semibold ${TEXT}`}>
        {COPY.heading}
      </h2>
      <p className={`mt-1 text-sm ${MUTED}`}>{COPY.intro}</p>

      <div role="tablist" aria-label={COPY.heading} onKeyDown={onKeyDown} className={`mt-4 flex gap-1 overflow-x-auto overflow-y-hidden border-b [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${BORDER}`}>
        {STATUS_ORDER.map((status) => {
          const selected = status === tab;
          return (
            <button
              key={status}
              id={`tab-${status}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="topics-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setTab(status)}
              className={`-mb-px flex shrink-0 cursor-pointer items-center gap-2 border-b-2 px-3 py-2 text-sm transition-colors ${FOCUS} ${
                selected
                  ? `border-purple-600 font-medium dark:border-purple-400 ${TEXT}`
                  : `border-transparent hover:text-zinc-900 dark:hover:text-white ${MUTED}`
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${STATUS_META[status].dot}`} aria-hidden="true" />
              {STATUS_META[status].label}
              <span className={`tabular-nums ${MUTED}`}>{counts[status]}</span>
            </button>
          );
        })}
      </div>

      <div id="topics-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="pt-3">
        <p className={`text-xs ${MUTED}`}>{STATUS_META[tab].hint}</p>
        {shown.length === 0 ? (
          <p className={`py-6 text-sm ${MUTED}`}>{COPY.emptyTab}</p>
        ) : (
          groupByLayer(shown).map((group) => (
            <div key={group.layer?.title ?? "other"} className="mt-5">
              <h3 className={`text-xs font-medium ${MUTED}`}>
                {group.layer?.title
                  ? `${group.layer.order ? `Layer ${group.layer.order}: ` : ""}${group.layer.title}`
                  : COPY.otherGroup}
              </h3>
              <ul className={`mt-1 divide-y border-t ${BORDER} divide-zinc-200 dark:divide-white/10`}>
                {group.topics.map((t) => (
                  <TopicRow key={t.slug} topic={t} onAskMentor={onAskMentor} />
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default TopicList;
