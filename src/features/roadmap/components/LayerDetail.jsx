// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  X,
  Clock,
  BookOpen,
  Code2,
  Layers,
  Check,
  ChevronRight,
  Lock,
  Mic,
} from "lucide-react";
import useRoadmapStore from "@/stores/useRoadmapStore";
import useAuthStore from "@/stores/useAuthStore";
import LayerPosts from "./LayerPosts";
import LayerLibrary from "./LayerLibrary";
import { hasVoiceExam } from "@/features/voice-exam/lib/pilotLayers";

const resourceTypeColor = {
  docs: "bg-blue-900/30 text-blue-400 border border-blue-800/50",
  course: "bg-violet-900/30 text-violet-400 border border-violet-800/50",
  video: "bg-red-900/30 text-red-400 border border-red-800/50",
  book: "bg-amber-900/30 text-amber-400 border border-amber-800/50",
  article: "bg-green-900/30 text-green-400 border border-green-800/50",
  project: "bg-teal-900/30 text-teal-400 border border-teal-800/50",
};

const LayerDetail = () => {
  const navigate = useNavigate();
  const {
    activeLayer,
    closePanel,
    layerProgress,
    selectedCategory,
    selectedTrack,
  } = useRoadmapStore();
  const { auth } = useAuthStore();

  if (!activeLayer) return null;

  const currentStatus =
    layerProgress[activeLayer.id] ?? activeLayer.status ?? "locked";
  const isDone = currentStatus === "done";

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closePanel}
      />

      {/* Drawer */}
      <motion.div
        className="fixed top-0 right-0 z-50 h-full w-full max-w-md pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] bg-neutral-950 border-l border-neutral-800 shadow-2xl flex flex-col"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-neutral-800">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-600 mb-1">
              Layer {activeLayer.order}
            </p>
            <h2 className="text-lg font-bold text-neutral-100 leading-snug">
              {activeLayer.title}
            </h2>
            <span className="inline-flex items-center gap-1.5 mt-2 text-[11px] text-neutral-500">
              <Clock size={11} />
              {activeLayer.estimatedTime}
            </span>
          </div>
          <button
            onClick={closePanel}
            className="mt-1 p-1.5 rounded-lg text-neutral-600 hover:text-neutral-300 hover:bg-neutral-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] space-y-6">
          {/* Tech pills */}
          <div className="flex flex-wrap gap-2">
            {activeLayer.techs.map((t) => (
              <span
                key={t}
                className="text-[11px] px-2.5 py-1 rounded-full bg-purple-900/30 text-purple-400 border border-purple-800/50"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-400 leading-relaxed">
            {activeLayer.description}
          </p>

          {/* Topics */}
          <div>
            <h3 className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-neutral-600 mb-3">
              <Layers size={12} />
              What you'll learn
            </h3>
            <ul className="space-y-2">
              {activeLayer.topics.map((topic, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-neutral-300"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-neutral-600 mb-3">
              <BookOpen size={12} />
              Resources
            </h3>
            <ul className="space-y-2">
              {activeLayer.resources.map((r, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between gap-3 py-2 px-3 rounded-xl bg-neutral-900 border border-neutral-800"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-neutral-200 truncate">
                      {r.label}
                    </p>
                    <p className="text-[11px] text-neutral-600 mt-0.5">
                      {r.platform}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full font-medium ${resourceTypeColor[r.type] ?? "bg-neutral-800 text-neutral-500"}`}
                  >
                    {r.type}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {selectedTrack && (
            <Link
              to={`/learn/${selectedTrack.id}/${activeLayer.id}`}
              onClick={closePanel}
              className="flex min-h-11 items-center justify-between gap-3 rounded-xl border border-purple-600/50 px-4 text-sm font-medium text-purple-300 transition-colors hover:bg-purple-600/20"
            >
              Start learning this layer
              <ChevronRight size={14} aria-hidden="true" />
            </Link>
          )}

          <LayerLibrary layerId={activeLayer.id} onNavigate={closePanel} />
          <LayerPosts layerId={activeLayer.id} onNavigate={closePanel} />

          {/* Challenge */}
          <div className="rounded-2xl border border-purple-800/40 bg-purple-950/20 px-4 py-4">
            <h3 className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-purple-500 mb-2">
              <Code2 size={12} />
              Layer Challenge
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {activeLayer.challenge}
            </p>
          </div>
        </div>

        {/* Footer actions — guests can read everything above, but tracking
            progress and taking the exam need an account. */}
        {!auth ? (
          <div className="px-6 py-4 border-t border-neutral-800 flex items-center justify-between gap-3">
            {/* min-w-0 lets the hint wrap instead of squeezing the button. */}
            <span className="flex min-w-0 items-start gap-2 text-[13px] leading-snug text-neutral-400">
              <Lock size={13} className="mt-0.5 shrink-0" aria-hidden="true" />
              Pass the test to unlock the next layer
            </span>
            {/* shrink-0 + nowrap: the call to action never breaks onto two lines;
                min-h-11 is the 44px touch target. */}
            <Link
              to="/get-started"
              onClick={closePanel}
              className="flex min-h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl bg-purple-600 px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-purple-500"
            >
              Sign up to start
              <ChevronRight size={14} aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <div className="px-6 py-4 border-t border-neutral-800 flex items-center justify-between gap-3">
            {/* Read-only on purpose: a layer is completed only by passing its
                exam, never by clicking. */}
            <span
              className={`flex items-center gap-2 text-sm font-medium ${
                isDone ? "text-purple-300" : "text-neutral-400"
              }`}
            >
              {isDone ? (
                <Check size={14} className="text-purple-400" aria-hidden="true" />
              ) : (
                <Lock size={14} className="text-neutral-600" aria-hidden="true" />
              )}
              {isDone ? "Completed" : "Pass the test to complete"}
            </span>

            <div className="flex items-center gap-2">
              {hasVoiceExam(activeLayer.id) && (
                <button
                  onClick={() => {
                    closePanel();
                    navigate(
                      `/voice-exam/${activeLayer.id}?path=${selectedCategory?.id ?? "backend"}`,
                    );
                  }}
                  className="flex min-h-11 items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border border-purple-600/50 text-purple-300 hover:bg-purple-600/20 transition-colors duration-200"
                >
                  <Mic size={14} aria-hidden="true" />
                  Voice exam
                </button>
              )}
              <button
                onClick={() => {
                  closePanel();
                  navigate(
                    `/roadmaps/exam/${activeLayer.id}?path=${selectedCategory?.id ?? "backend"}`,
                  );
                }}
                className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-colors duration-200"
              >
                Take Test
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default LayerDetail;
