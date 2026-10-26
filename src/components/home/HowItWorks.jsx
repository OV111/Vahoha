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
      className="mx-auto max-w-6xl scroll-mt-[calc(var(--navbar-h,56px)+24px)] px-4 py-12 sm:px-6 md:py-24"
    >
      <h2 className="text-3xl font-[450] tracking-tight text-white max-lg:text-left lg:text-center">
        How it works
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-base text-neutral-400 max-lg:text-left lg:mt-3 lg:text-center">
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

      {/* Below lg: the same steps as a compact timeline. The rail runs behind the
          small icon nodes; each row is a full-width link, so the tap area stays 44px. */}
      <ol className="mx-auto mt-8 max-w-md lg:hidden">
        {MOBILE_STEPS.map(({ to, title, body, icon: Icon, soon }) => (
          <li key={title} className="relative after:absolute after:top-[38px] after:-bottom-2.5 after:left-[13px] after:w-px after:bg-white/10 last:after:hidden">
            <Link to={to} className="group relative flex min-h-11 items-start gap-3 py-2.5">
              <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black text-neutral-400 transition-colors group-hover:border-purple-400 group-hover:text-purple-200">
                <Icon size={14} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h3 className="text-base leading-7 font-medium text-neutral-100">
                  {title}
                  {soon && <SoonTag className="ml-2 align-middle" />}
                </h3>
                <p className="text-sm leading-5 text-neutral-400">{body}</p>
              </div>
            </Link>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex justify-center lg:mt-24">
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
