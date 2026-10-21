import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import CategoryBar from "./components/CategoryBar";
import TrackSelector from "./components/TrackSelector";
import RoadmapTree from "./components/RoadmapTree";
import useRoadmapStore from "../../stores/useRoadmapStore";
import useAuthStore from "../../stores/useAuthStore";
import RoadmapHero from "./components/RoadmapHero";
import FloatingLoad from "./components/FloatingLoad";
import TrackOnboardingPanel from "./components/TrackOnboardingPanel";
import WelcomeTour from "./components/WelcomeTour";
import { trackHasDoneLayer } from "./lib/trackStarted";
import { useTrackHasProgress } from "../learn/lib/lessonStatus";
import "./roadmap.css";
import { ROADMAP_DOMAINS } from "../../../constants/categories";
import posthog, { isPostHogConfigured } from "@/lib/posthog";

export default function RoadmapPage() {
  const { selectedCategory, selectedTrack, layerProgress, progressLoaded, submitOnboarding, closePanel, setCategory } = useRoadmapStore();
  const { auth } = useAuthStore();
  const hasOpenedLessons = useTrackHasProgress(selectedTrack?.id);
  // "Start Path" begins a path, so it goes away once the learner has begun this one.
  // While progress is still loading it stays hidden rather than flashing and vanishing.
  const trackStarted =
    Boolean(selectedTrack) &&
    (!progressLoaded || hasOpenedLessons || trackHasDoneLayer(layerProgress, selectedTrack.id));
  const [panelOpen, setPanelOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Navbar, footer and search link here as /roadmaps?domain=<id>. Opens that
  // domain once, then drops the param so a later pick in the bar isn't
  // contradicted by a stale URL.
  const [searchParams, setSearchParams] = useSearchParams();
  const domainParam = searchParams.get("domain");
  useEffect(() => {
    if (!domainParam) return;
    const domain = ROADMAP_DOMAINS.find((d) => d.id === domainParam);
    if (domain) setCategory(domain);
    setSearchParams(
      (params) => {
        params.delete("domain");
        return params;
      },
      { replace: true },
    );
  }, [domainParam, setCategory, setSearchParams]);

  // Only `skillLevel` is actually persisted right now — see submitOnboarding
  // in useRoadmapStore.js for why the other 4 answers aren't sent yet. The
  // panel used to close instantly on submit with no signal either way —
  // a failed save looked identical to a successful one.
  const handleStart = async (answers) => {
    setSaving(true);
    const ok = await submitOnboarding(answers);
    setSaving(false);
    setPanelOpen(false);
    if (ok) {
      if (isPostHogConfigured) {
        posthog.capture("track_onboarding_completed", {
          track_id: answers.track?.id,
          skill_level: answers.skillLevel,
          goal: answers.goal,
          background: answers.background,
          weekly_time: answers.weeklyTime,
        });
      }
      toast.success("Got it — your mentor will use this to calibrate its answers.");
    } else {
      toast.error("Couldn't save that — your progress on the path itself is unaffected, but try Start Path again to set your level.");
    }
  };

  return (
    <div className="rm min-h-screen mx-auto max-w-[1200px] px-6 sm:px-10 py-12">
      <RoadmapHero />

      <CategoryBar />

      <AnimatePresence mode="wait">
        {selectedCategory ? (
          <TrackSelector key={selectedCategory.id} />
        ) : (
          <FloatingLoad />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {selectedTrack && <RoadmapTree key={selectedTrack.id} />}
      </AnimatePresence>

      {/* Onboarding saves to the account, so guests don't get it. */}
      {/* Appears once a domain is picked, but a path can only start from a
          track, so it stays disabled until one is chosen. */}
      {auth && selectedCategory && !panelOpen && !trackStarted && (
        <button
          disabled={!selectedTrack}
          title={selectedTrack ? undefined : "Choose a track first"}
          onClick={() => { closePanel(); setPanelOpen(true); }} // close any open layer sidebar first
          className={`fixed right-[env(safe-area-inset-right)] top-1/4 -translate-y-1/2 z-4
          flex items-center gap-2
          px-3 py-2 rounded-l-lg
          text-[13px] font-medium transition-all ${
            selectedTrack
              ? "bg-purple-500 rm-btn text-white cursor-pointer hover:px-4"
              : "bg-purple-500/30 text-white/50 cursor-not-allowed"
          }`}
        >
          Start Path
        </button>
      )}

      <AnimatePresence>
        {panelOpen && (
          // Backdrop: sits under the panel (z-50) but over the page, so the tree
          // can't be clicked while setup is open (no two sidebars at once).
          <Motion.div
            key="onboarding-backdrop"
            className="fixed inset-0 z-40 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { if (!saving) setPanelOpen(false); }}
          />
        )}
        {panelOpen && (
          <TrackOnboardingPanel
            track={selectedTrack}
            onClose={() => setPanelOpen(false)}
            onStart={handleStart}
            submitting={saving}
          />
        )}
      </AnimatePresence>

      {/* First-visit tour for signed-in users; renders nothing once dismissed. */}
      <WelcomeTour />
    </div>
  );
}
