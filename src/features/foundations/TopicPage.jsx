import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import NotFound from "../../components/feedback/NotFound";
import "./foundations-theme.css";
import { ExplainBack, TryItList } from "./components/TryIt.jsx";
import { TOPICS, TOPIC_GROUPS } from "./topics/topics.js";

// Loads the lesson module for a topic. Each lesson is its own chunk, so the
// syllabus never downloads lesson text and a lesson page only fetches one.
function useLesson(topic) {
  const [state, setState] = useState({ slug: null, lesson: null, error: false });

  useEffect(() => {
    if (!topic?.lesson) return;
    let cancelled = false;
    topic
      .lesson()
      .then((mod) => !cancelled && setState({ slug: topic.slug, lesson: mod.default, error: false }))
      .catch(() => !cancelled && setState({ slug: topic.slug, lesson: null, error: true }));
    // Navigating to the next topic before this one loads must not show the old lesson.
    return () => {
      cancelled = true;
    };
  }, [topic]);

  // State left over from the previous topic counts as "still loading".
  return state.slug === topic?.slug ? state : { lesson: null, error: false };
}

function CheckItem({ item, index }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="f-check">
      <p className="f-check-q">
        <span className="f-check-num">Q{index + 1}</span>
        {item.q}
      </p>
      {open ? (
        <p className="f-check-a">{item.a}</p>
      ) : (
        <button type="button" className="f-check-reveal" onClick={() => setOpen(true)}>
          Show answer
        </button>
      )}
    </li>
  );
}

export default function TopicPage() {
  const { slug } = useParams();
  const index = TOPICS.findIndex((t) => t.slug === slug);
  const topic = TOPICS[index];
  const { lesson, error } = useLesson(topic);

  // Unknown slugs and topics without a written lesson are both 404s:
  // the syllabus never links to them.
  if (!topic?.lesson) return <NotFound />;

  const group = TOPIC_GROUPS.find((g) => g.id === topic.group);
  const next = TOPICS.slice(index + 1).find((t) => t.lesson);
  const num = String(index + 1).padStart(2, "0");

  return (
    <div className="foundations-theme">
      <article className="f-wrap f-lesson">
        <Link to="/labs/foundations" className="f-back">
          <ArrowLeft size={14} /> Foundations
        </Link>

        <header className="f-lesson-head">
          <p className="f-section-eyebrow">
            {num} · {group.label} · <span className={`f-level-${topic.difficulty}`}>{topic.difficulty}</span>
            {lesson && ` · ${lesson.minutes} min`}
          </p>
          <h1 className="f-lesson-title">{topic.title}</h1>
          <p className="f-lede">{topic.summary}</p>
        </header>

        {error && (
          <p className="f-empty">
            This lesson didn't load. Check your connection and refresh the page.
          </p>
        )}
        {!lesson && !error && <p className="f-empty">Loading lesson…</p>}

        {lesson && (
          <>
            <section className="f-lesson-section">
              <h2>What it is</h2>
              {lesson.whatItIs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </section>

            <section className="f-lesson-section f-why-now">
              <h2>Why it matters now</h2>
              <p>{lesson.whyNow}</p>
            </section>

            <section className="f-lesson-section">
              <h2>Key ideas</h2>
              <dl className="f-ideas">
                {lesson.keyIdeas.map((k) => (
                  <div key={k.term} className="f-idea">
                    <dt>{k.term}</dt>
                    <dd>{k.explain}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="f-lesson-section">
              <h2>Try it</h2>
              <p className="f-hint">No account needed. Do these on your own machine.</p>
              <TryItList items={lesson.tryIt} topicSlug={topic.slug} />
            </section>

            <section className="f-lesson-section">
              <h2>Check yourself</h2>
              <p className="f-hint">Answer in your head first, then reveal.</p>
              <ol className="f-checks">
                {lesson.checkYourself.map((item, i) => (
                  // key = slug + index resets revealed answers when the topic changes
                  <CheckItem key={`${topic.slug}-${i}`} item={item} index={i} />
                ))}
              </ol>
            </section>

            <section className="f-lesson-section">
              <h2>Explain it back</h2>
              <ExplainBack key={topic.slug} explainBack={lesson.explainBack} />
            </section>

            <section className="f-lesson-section">
              <h2>More practice</h2>
              <p className="f-hint">Optional. These need a free account.</p>
              <ul className="f-practice">
                {lesson.practice.challenges.map((c) => (
                  <li key={c.slug}>
                    <Link to={`/coding-challenges/${c.slug}`} className="f-practice-link">
                      <span>
                        <span className="f-practice-kind">Challenge</span>
                        {c.title}
                      </span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/ai-agent" className="f-practice-link">
                    <span>
                      <span className="f-practice-kind">Mentor</span>
                      Explain {topic.title} back to the AI mentor
                    </span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </li>
              </ul>
            </section>
          </>
        )}

        <nav className="f-lesson-nav" aria-label="Next topic">
          {next ? (
            <Link to={`/labs/foundations/${next.slug}`} className="f-next">
              <span className="f-section-eyebrow">Next</span>
              <span className="f-next-title">
                {next.title} <ArrowRight size={18} aria-hidden="true" />
              </span>
            </Link>
          ) : (
            <Link to="/roadmaps" className="f-next">
              <span className="f-section-eyebrow">You finished the written lessons</span>
              <span className="f-next-title">
                Pick a roadmap <ArrowRight size={18} aria-hidden="true" />
              </span>
            </Link>
          )}
        </nav>
      </article>
    </div>
  );
}
