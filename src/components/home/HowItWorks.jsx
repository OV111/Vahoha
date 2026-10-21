import { lazy, Suspense, useSyncExternalStore } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Bot,
  Briefcase,
  ClipboardCheck,
  Code2,
  Library,
  Lock,
  Map as MapIcon,
  Mic,
  Trophy,
  Users,
} from "lucide-react";
import { TO } from "./hiwRoutes";
import { SoonTag } from "./hiwShared";

// The animated diagram (and the motion library it pulls in) is desktop-only.
const HowItWorksDiagram = lazy(() => import("./HowItWorksDiagram"));

// Below lg the diagram does not fit, so phones get the same steps as a list. Not
// mounting the diagram there (instead of hiding it with CSS) keeps its timers,
// re-renders and ~45 KB of motion code off the phone entirely.
const LG = "(min-width: 1024px)";
const subscribeLg = (onChange) => {
  const mq = window.matchMedia(LG);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};
const useIsDesktop = () =>
  useSyncExternalStore(
    subscribeLg,
    () => window.matchMedia(LG).matches,
    () => false, // prerender: no viewport, so ship the list and an empty reserved box
  );

const MOBILE_STEPS = [
  { to: TO.root, title: "Pick a path", body: "Choose your track.", icon: MapIcon },
  { to: TO.study, title: "Study the layer", body: "One layer at a time, in order.", icon: BookOpen },
  { to: TO.practice, title: "Practice it", body: "Solve real coding challenges.", icon: Code2 },
  { to: TO.library, title: "Code Library", body: "Books for each layer. Your mentor reads them too.", icon: Library, soon: true },
  { to: TO.voice, title: "Explain it back", body: "Say it out loud. Your mentor checks you get it.", icon: Mic, soon: true },
  { to: TO.exam, title: "Voice exam", body: "Explain a layer out loud and get a verified result.", icon: ClipboardCheck },
  { to: TO.test, title: "Pass the test", body: "Score 80% to unlock the next layer.", icon: Lock },
  { to: TO.mentor, title: "AI mentor", body: "Finds your weak spots and helps you retry.", icon: Bot },
  { to: TO.teams, title: "Join a Build Team", body: "Ship real PRs with other learners.", icon: Users },
  { to: TO.capstone, title: "Capstone", body: "Build and defend a real project.", icon: Trophy },
  { to: TO.recruiters, title: "Get seen by recruiters", body: "Every PR and project becomes public proof.", icon: Briefcase },
];

const HowItWorks = () => {
  const isDesktop = useIsDesktop();
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-6xl scroll-mt-[calc(var(--navbar-h,56px)+24px)] px-6 py-16 md:py-24"
    >
      <h2 className="text-center text-3xl font-[450] tracking-tight text-white">
        How it works
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-base text-neutral-400">
        Every step is earned. Every win becomes proof.
      </p>

      {/* Desktop: branching path diagram. The box keeps its size while the chunk loads. */}
      <div className="mx-auto mt-16 hidden aspect-[1200/460] w-full max-w-6xl lg:block">
        {isDesktop && (
          <Suspense fallback={null}>
            <HowItWorksDiagram />
          </Suspense>
        )}
      </div>

      {/* Below lg: the same steps as a vertical list */}
      <ol className="mx-auto mt-12 max-w-sm space-y-6 lg:hidden">
        {MOBILE_STEPS.map(({ to, title, body, icon: Icon, soon }) => (
          <li key={title}>
            <Link to={to} className="group flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-neutral-700 bg-black text-neutral-300 transition-colors group-hover:border-purple-400 group-hover:text-purple-200">
                <Icon size={20} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-medium text-neutral-100 md:text-base">
                  {title}
                  {soon && <SoonTag className="ml-2 align-middle" />}
                </h3>
                <p className="mt-0.5 text-base text-neutral-400 md:text-sm">{body}</p>
              </div>
            </Link>
          </li>
        ))}
      </ol>

      <div className="mt-14 flex justify-center lg:mt-24">
        <Link
          to="/roadmaps"
          className="flex min-h-11 items-center rounded-full bg-white px-6 py-3 text-base leading-[20px] font-medium text-black sm:text-[14px] transition hover:bg-neutral-200"
        >
          Browse the roadmaps →
        </Link>
      </div>
    </section>
  );
};

export default HowItWorks;
