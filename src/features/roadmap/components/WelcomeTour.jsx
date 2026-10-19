import useRoadmapStore from "@/stores/useRoadmapStore";
import TourOverlay from "@/components/tour/TourOverlay";
import useTour from "@/components/tour/useTour";

/**
 * First-visit tour for /roadmaps. The user does the real clicks for the first
 * two steps; the last two are explained with a Next button.
 *
 * Steps with a `done` check follow the roadmap store (picking another domain
 * sends the tour back to "Pick a track"). Targets are found with data-tour
 * attributes on CategoryBar, TrackSelector, the first LayerNode and the
 * capstone node.
 */
const STEPS = [
  {
    id: "domain",
    selector: "[data-tour='domain']",
    advance: "state",
    title: "Pick a domain",
    body: "Start with what you want to learn, like Backend or Full-Stack.",
    done: (s) => s.selectedCategory != null,
  },
  {
    id: "track",
    selector: "[data-tour='track']",
    advance: "state",
    title: "Pick a track",
    body: "A track is one focused path inside that domain. Choose one to see its layers.",
    done: (s) => s.selectedTrack != null,
  },
  {
    id: "layer",
    selector: "[data-tour='first-layer']",
    block: "center",
    // Opening any lesson ("Start learning" or a subtopic) is what this step
    // asks for, and it leaves the page, so it ends the tour. Otherwise the tour
    // would come back at this same step after the learner returns.
    endOnClick: "a[href^='/learn/']",
    title: "Start with Layer 1",
    body: "A track is a stack of layers, and each ends with a test. Press “Start learning” on a layer to begin it.",
  },
  {
    id: "capstone",
    selector: "[data-tour='capstone']",
    block: "center",
    // Not every track has one on screen yet; skip rather than get stuck.
    optional: true,
    // Opening the capstone leaves the page, same reasoning as the layer step.
    endOnClick: "[data-tour='capstone']",
    title: "The Capstone",
    body: "Pass every layer test to unlock a real project to build and defend. It is the last step of every track.",
  },
];

export default function WelcomeTour() {
  // How many leading steps the store already shows as done.
  const derivedIndex = useRoadmapStore((s) => {
    let i = 0;
    while (STEPS[i]?.done?.(s)) i += 1;
    return i;
  });
  const tour = useTour({ steps: STEPS, tourId: "roadmap", derivedIndex });
  return <TourOverlay tour={tour} />;
}
