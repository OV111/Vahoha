import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, Clock, Sparkles } from "lucide-react";
import useAuthStore from "@/stores/useAuthStore";
import MentorPanel from "@/features/mentor/components/MentorPanel";
import { mentorOrigin } from "@/features/mentor/lib/mentorOrigin";
import useTopicSession from "@/features/learn/hooks/useTopicSession";
import useActiveSection from "@/features/learn/hooks/useActiveSection";
import { finishedLessons } from "@/features/learn/lib/lessonProgress";
import { LayerNav, PageNav } from "./TopicNav";
import TopicSection from "./TopicSection";
import TopicResult from "./TopicResult";
import { ExplainSection, SummarySection, WhenToUse } from "./TopicEnding";
import "@/features/learn/learn.css";

// Sticks under the navbar; taller than the screen scrolls on its own.
const sideColumn = "sticky top-20 hidden max-h-[calc(100dvh-6rem)] self-start overflow-y-auto px-2.5 -mx-2.5 pb-6";

function Intro({ topic, onMentor }) {
  return (
    <header>
      <h1 className="text-2xl font-semibold leading-none tracking-tight text-white sm:text-3xl">{topic.title}</h1>
      <p className="mt-3 text-base leading-snug text-neutral-300">{topic.mystery}</p>
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-1 text-[13px] text-neutral-400">
        <span className="inline-flex items-center gap-2">
          <Clock size={15} aria-hidden="true" /> {topic.minutes} min
        </span>
        <button
          type="button"
          onClick={onMentor}
          className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-purple-300 hover:text-purple-200"
        >
          <Sparkles size={15} aria-hidden="true" /> Ask Mentor
        </button>
      </div>
      <div className="mb-10 mt-5 rounded-2xl bg-purple-500/15 p-5 sm:p-6">
        <p className="text-[13px] font-medium text-purple-200">In short</p>
        <p className="mt-2 text-base font-medium leading-relaxed text-white">{topic.shortAnswer}</p>
      </div>
    </header>
  );
}

/** Below the width where the side columns fit, both lists live in one menu. */
function SmallMenu({ children }) {
  return (
    <details className="group mb-8 rounded-xl bg-(--lesson-raised) xl:hidden">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-5 text-sm font-medium text-white [&::-webkit-details-marker]:hidden">
        Contents
        <ChevronDown
          size={18}
          className="text-neutral-400 transition-transform group-open:rotate-180 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </summary>
      <div className="space-y-8 px-5 pb-6 pt-2">{children}</div>
    </details>
  );
}

/** One topic as a page to read, like good docs, with questions and real cases in the text. */
export default function TopicArticle({ topic, track, layer, lesson, lessons, next, labHref }) {
  const { auth } = useAuthStore();
  const navigate = useNavigate();
  const [mentorOpen, setMentorOpen] = useState(false);
  const closeMentor = useCallback(() => setMentorOpen(false), []);
  const session = useTopicSession({ topic, trackId: track.id, layerId: layer.id, slug: lesson.slug });

  const pageItems = [
    ...topic.sections.map((s) => ({ id: s.id, title: s.title, done: session.isSectionDone(s) })),
    { id: "when", title: "When to use it", done: false },
    { id: "explain", title: "Explain it", done: session.explain.revealed },
    { id: "summary", title: "Summary", done: session.done },
  ];
  const active = useActiveSection(pageItems.map((i) => i.id));

  // A guest has no mentor: the page itself sends them to sign in.
  const origin = mentorOrigin("lesson", { topic: topic.title, path: track.id, layer: layer.id });
  const askMentor = () => (auth ? setMentorOpen(true) : navigate("/mentor", { state: origin }));

  const base = `/learn/${track.id}/${layer.id}`;
  const doneSlugs = new Set([...finishedLessons(track.id, layer.id), ...(session.done ? [lesson.slug] : [])]);
  const layerNav = <LayerNav lessons={lessons} currentSlug={lesson.slug} doneSlugs={doneSlugs} base={base} />;
  const pageNav = <PageNav items={pageItems} active={active} />;

  return (
    <div className="lesson-shell">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-x-12 px-4 pb-24 pt-6 lg:px-6 xl:grid-cols-[260px_minmax(0,1fr)_220px]">
        <aside className={`${sideColumn} xl:block`}>
          <BackLink to={base} title={layer.title} />
          {layerNav}
        </aside>

        <article className="mx-auto w-full max-w-[780px]">
          <div className="xl:hidden">
            <BackLink to={base} title={layer.title} />
          </div>
          <SmallMenu>
            {pageNav}
            {layerNav}
          </SmallMenu>
          <Intro topic={topic} onMentor={askMentor} />
          {topic.sections.map((section) => (
            <TopicSection key={section.id} section={section} session={session} misconceptions={topic.misconceptions} />
          ))}
          <WhenToUse whenToUse={topic.whenToUse} />
          <ExplainSection topic={topic} session={session} />
          <SummarySection topic={topic} done={session.done} next={next} layerHref={base} labHref={labHref} />
        </article>

        <aside className={`${sideColumn} xl:block`}>
          {pageNav}
          <div className="mt-5 border-t border-(--lesson-line) pt-5">
            <TopicResult session={session} />
          </div>
        </aside>
      </div>

      <MentorPanel open={mentorOpen} onClose={closeMentor} origin={origin.origin} subtitle={topic.title} />
    </div>
  );
}

function BackLink({ to, title }) {
  return (
    <Link
      to={to}
      className="mb-2 -mt-2.5 inline-flex min-h-11 items-center gap-2 text-[13px] text-neutral-400 transition-colors hover:text-white"
    >
      <ArrowLeft size={16} aria-hidden="true" /> {title}
    </Link>
  );
}
