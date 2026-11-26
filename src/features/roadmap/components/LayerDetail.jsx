import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, ChevronDown, Clock, Code2, Mic, Play, ShieldCheck, X } from "lucide-react";
import useRoadmapStore from "@/features/roadmap/hooks/useRoadmapStore";
import useAuthStore from "@/stores/useAuthStore";
import { buildLessons } from "@/features/learn/lib/curriculum";
import { hasVoiceExam } from "@/features/voice-exam/lib/pilotLayers";
import { useVerifiedLayers } from "@/features/voice-exam/hooks/useVerifiedLayers";
import LayerPosts from "./LayerPosts";
import LayerLibrary from "./LayerLibrary";
import { DEVELOPER_SIGNUP_PATH } from "@/constants/site";
import useViewOnly from "@/features/hiring/useViewOnly";
import ViewOnlyNotice from "@/features/hiring/components/ViewOnlyNotice";

const secondaryButton =
  "grid min-h-11 grid-flow-col place-content-center items-center gap-2 rounded-xl border border-neutral-700 px-4 text-sm font-medium text-neutral-100 transition-colors hover:border-purple-500";

/** Books, links and posts: useful, but not what the learner opened the panel for. */
function MoreToRead({ layer, onNavigate }) {
  // Mounted on first open, so a closed section fetches nothing.
  const [open, setOpen] = useState(false);
  return (
    <details onToggle={(e) => setOpen(e.currentTarget.open)} className="group border-t border-neutral-800 pt-2">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between text-sm font-medium text-neutral-300 hover:text-white [&::-webkit-details-marker]:hidden">
        Books and links
        <ChevronDown
          size={16}
          className="transition-transform group-open:rotate-180 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </summary>
      {open && (
        <div className="grid gap-6 pt-3">
          <ul className="grid gap-2">
            {layer.resources.map((r) => (
              <li key={r.label} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 text-sm">
                <span className="truncate text-neutral-200">{r.label}</span>
                <span className="text-neutral-400">{r.type}</span>
              </li>
            ))}
          </ul>
          <LayerLibrary layerId={layer.id} onNavigate={onNavigate} />
          <LayerPosts layerId={layer.id} onNavigate={onNavigate} />
        </div>
      )}
    </details>
  );
}

function Actions({ layer, track, category, isDone, verified, onNavigate }) {
  const { auth } = useAuthStore();
  const isViewOnly = useViewOnly();
  const path = category?.id ?? "backend";
  const voice = hasVoiceExam(layer.id);

  return (
    <div className="grid gap-3 border-t border-neutral-800 px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
      {isViewOnly ? (
        <ViewOnlyNotice>
          Developers pass this layer's test (80% or more) to unlock the next one.
          {voice && " A spoken exam here earns a Verified badge."}
        </ViewOnlyNotice>
      ) : auth ? (
        <>
          <div className={`grid gap-3 ${voice ? "grid-cols-2" : ""}`}>
            {voice && (
              <Link
                to={`/voice-exam/${layer.id}?path=${path}&track=${track?.id ?? ""}`}
                onClick={onNavigate}
                className={secondaryButton}
              >
                <Mic size={15} aria-hidden="true" /> Voice exam
              </Link>
            )}
            <Link to={`/roadmaps/exam/${layer.id}?path=${path}`} onClick={onNavigate} className={secondaryButton}>
              <ShieldCheck size={15} aria-hidden="true" /> Take test
            </Link>
          </div>
        </>
      ) : (
        <>
          <Link to={DEVELOPER_SIGNUP_PATH} onClick={onNavigate} className={secondaryButton}>
            Sign up to take the test
          </Link>
        </>
      )}

      {track && (
        <Link
          to={`/learn/${track.id}/${layer.id}`}
          onClick={onNavigate}
          className="grid min-h-12 grid-flow-col place-content-center items-center gap-2 rounded-xl bg-purple-600 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
        >
          <Play size={14} fill="currentColor" aria-hidden="true" /> {isDone ? "Review this layer" : "Start learning"}
        </Link>
      )}

      {!isViewOnly && (auth ? (
          <p className="text-center text-xs text-neutral-400">
            {isDone ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-300">
                <Check size={14} aria-hidden="true" /> Test passed{verified && ", voice verified"}
              </span>
            ) : (
              "Pass the test to complete this layer"
            )}
          </p>
      ) : (
          <p className="text-center text-xs text-neutral-400">Passing it unlocks the next layer</p>
      ))}
    </div>
  );
}

/** A layer at a glance: what it gives, what is inside, and the buttons to act on it. */
const LayerDetail = () => {
  const { activeLayer: layer, closePanel, layerProgress, selectedCategory, selectedTrack } = useRoadmapStore();
  const { auth } = useAuthStore();
  const verifiedLayers = useVerifiedLayers(Boolean(auth));

  if (!layer) return null;

  const isDone = (layerProgress[layer.id] ?? layer.status) === "done";
  const topics = buildLessons(layer);

  return (
    <>
      <motion.div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closePanel}
      />

      <motion.div
        role="dialog"
        aria-label={layer.title}
        className="fixed top-0 right-0 z-50 grid h-full w-full max-w-md grid-rows-[auto_minmax(0,1fr)_auto] border-l border-neutral-800 bg-neutral-950 pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] shadow-2xl"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <header className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-b border-neutral-800 px-6 pb-4 pt-6">
          <div>
            <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-neutral-400">Layer {layer.order}</p>
            <h2 className="text-lg font-bold leading-snug text-neutral-100">{layer.title}</h2>
            <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-neutral-400">
              <Clock size={11} aria-hidden="true" />
              {layer.estimatedTime}, {topics.length} topics
            </span>
          </div>
          <button
            type="button"
            onClick={closePanel}
            aria-label="Close"
            className="-mr-2 -mt-1 grid size-11 cursor-pointer place-items-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </header>

        <div className="thin-scrollbar grid content-start gap-6 overflow-y-auto px-6 py-5">
          <p className="text-sm leading-relaxed text-neutral-200">
            {layer.outcome ? `After this layer you can ${layer.outcome}` : layer.description}
          </p>

          <section>
            <h3 className="text-sm font-semibold text-white">Inside</h3>
            <ul className="mt-3 grid gap-2">
              {layer.topics.map((topic) => (
                <li key={topic} className="grid grid-cols-[6px_minmax(0,1fr)] gap-3 text-[13px] leading-snug text-neutral-300">
                  <span aria-hidden="true" className="mt-1.5 size-1.5 rounded-full bg-purple-500" />
                  {topic}
                </li>
              ))}
            </ul>
          </section>

          <section className="grid grid-cols-[18px_minmax(0,1fr)] gap-3 rounded-xl bg-purple-500/10 p-4">
            <Code2 size={17} className="mt-0.5 text-purple-300" aria-hidden="true" />
            <div>
              <h3 className="text-sm font-semibold text-white">You will build</h3>
              <p className="mt-1 text-[13px] leading-snug text-neutral-300">{layer.challenge}</p>
            </div>
          </section>

          <MoreToRead key={layer.id} layer={layer} onNavigate={closePanel} />
        </div>

        <Actions
          layer={layer}
          track={selectedTrack}
          category={selectedCategory}
          isDone={isDone}
          verified={verifiedLayers.has(layer.id)}
          onNavigate={closePanel}
        />
      </motion.div>
    </>
  );
};

export default LayerDetail;
