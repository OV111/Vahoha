import TourOverlay from "@/components/tour/TourOverlay";
import useTour from "@/components/tour/useTour";

// First visit to the Project Map editor. It walks the page in the order a new
// learner uses it: what they are mapping, adding parts, wiring
// them, then the helpers (repo scan, 3D view) and finally keeping and checking
// it. Targets are data-tour markers in ProjectMapEditor.
const STEPS = [
  {
    id: "lens",
    selector: "[data-tour='map-lens']",
    block: "center",
    title: "Pick what you're mapping",
    body: "Software, data, AI, security or infrastructure. It changes which parts you can add; parts already on the map stay.",
  },
  {
    id: "palette",
    selector: "[data-tour='map-palette']",
    block: "center",
    title: "Add a part",
    body: "Tap or click a part to drop it in the middle of the map, or drag it to where you want it.",
  },
  {
    id: "canvas",
    selector: "[data-tour='map-canvas']",
    block: "center",
    title: "Wire it up",
    body: "We started you with an example to change. Drag a part to move it (on a phone, tap it first). To wire two parts, use the plug button, or Shift-drag on a computer. Select a part or a wire to rename it, add details or delete it.",
  },
  {
    id: "scan",
    selector: "[data-tour='map-scan']",
    block: "center",
    title: "Let your repo draw it",
    body: "Paste a GitHub link and we suggest parts from your dependencies and config files. Nothing is added until you accept it.",
  },
  {
    id: "3d",
    selector: "[data-tour='map-3d']",
    block: "center",
    title: "3D or flat",
    body: "The map opens in 3D so you can watch requests travel. Switch to the flat view here when you want to lay parts out precisely.",
  },
  {
    id: "keep",
    selector: "[data-tour='map-keep']",
    block: "center",
    title: "Keep it and share it",
    body: "Go back to an earlier version, import or export the map, and share a link to it when you're ready.",
  },
  {
    id: "check",
    selector: "[data-tour='map-check']",
    block: "center",
    // Only on personal maps saved to an account.
    optional: true,
    title: "Prove you understand it",
    body: "Answer 3 questions about your own map. An AI reads your answers and says what you missed.",
  },
];

export default function ProjectMapTour() {
  const tour = useTour({ steps: STEPS, tourId: "project-map" });
  return <TourOverlay tour={tour} />;
}
