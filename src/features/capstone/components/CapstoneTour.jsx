import TourOverlay from "@/components/tour/TourOverlay";
import useTour from "@/components/tour/useTour";

// First visit to a capstone page. The page changes a lot with the learner's
// state (locked, ready, building, in review), so every step explains something
// that is on screen in all of them; the copy sticks to what the page itself says.
// #brief and #submit are existing section ids; the other two are data-tour
// markers in CapstoneHero and CapstoneTrack.
const STEPS = [
  {
    id: "progress",
    selector: "[data-tour='capstone-progress']",
    block: "center",
    title: "Six steps to a certificate",
    body: "This rail shows where you are, from finishing your path to getting your certificate.",
  },
  {
    id: "agent",
    selector: "[data-tour='capstone-agent']",
    block: "center",
    title: "An AI agent reviews your work",
    body: "It runs automated checks on your repository, reviews it against a rubric, then asks you questions about your code.",
  },
  {
    id: "brief",
    selector: "#brief",
    block: "center",
    title: "Your assignment",
    body: "What to build and what the agent will check. You build it in your own GitHub repository and submit the link.",
  },
  {
    id: "submit",
    selector: "#submit",
    block: "center",
    // Only on the page once an attempt has started.
    optional: true,
    title: "Submit your repository",
    body: "Paste your GitHub link. The agent reviews the latest commit at the moment you submit; later pushes are ignored.",
  },
];

export default function CapstoneTour() {
  const tour = useTour({ steps: STEPS, tourId: "capstone" });
  return <TourOverlay tour={tour} />;
}
