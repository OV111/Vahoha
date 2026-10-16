import { useEffect } from "react";
import TourOverlay from "@/components/tour/TourOverlay";
import useTour from "@/components/tour/useTour";

// Shown the first time any challenge is opened. `mobileTab` is the pane that
// must be visible for the step: below 1100px the arena shows one pane at a
// time, and a hidden target would leave the tour with nothing to point at.
const STEPS = [
  {
    id: "problem",
    selector: "[data-tour='arena-problem']",
    mobileTab: "problem",
    title: "Read the task",
    body: "The problem, examples and rules are here. Read them before you start.",
  },
  {
    id: "code",
    selector: "[data-tour='arena-code']",
    mobileTab: "code",
    title: "Write your solution",
    body: "Edit the code here. It saves automatically.",
  },
  {
    id: "run",
    selector: "[data-tour='arena-run']",
    advance: "both", // Next button, or just click Run tests
    title: "Run the tests",
    body: "Check your work as often as you like. Click Run tests.",
  },
  {
    id: "mentor",
    selector: "[data-tour='arena-mentor']",
    advance: "both", // Next button, or just click Ask mentor
    title: "Stuck? Ask the AI mentor",
    body: "The mentor reads your current code and talks it through with you. Hints are in the side panel.",
  },
  {
    id: "submit",
    selector: "[data-tour='arena-submit']",
    advance: "both", // Done button, or just click Submit
    title: "Submit for XP",
    body: "When the tests pass, submit to get graded and earn XP.",
  },
];

export default function ArenaTour({ setMobileTab }) {
  const tour = useTour({ steps: STEPS, tourId: "arena" });
  const { active, step } = tour;

  // Bring the step's pane to the front on small screens (a no-op on desktop,
  // where all three panes are always visible).
  useEffect(() => {
    if (active && step?.mobileTab) setMobileTab(step.mobileTab);
  }, [active, step, setMobileTab]);

  return <TourOverlay tour={tour} />;
}
