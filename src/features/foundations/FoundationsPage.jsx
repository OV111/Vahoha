import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  // eslint-disable-next-line no-unused-vars
  motion,
  AnimatePresence,
  MotionConfig,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../../components/motion/Reveal.jsx";
import "./foundations-theme.css";
import { FOUNDATIONS_FAQ } from "./faq.js";
import { TOPICS, TOPIC_GROUPS } from "./topics/topics.js";

const GROUP_FILTERS = [{ id: "all", label: "All" }, ...TOPIC_GROUPS];
const LEVEL_FILTERS = ["beginner", "medium", "hard"];
const EASE = [0.22, 1, 0.36, 1];

// The number is the topic's place in the whole syllabus, so it stays the same
// when filters hide other rows ("07" is always Package Management).
const NUMBERED = TOPICS.map((t, i) => ({ ...t, num: String(i + 1).padStart(2, "0") }));
const LESSON_COUNT = TOPICS.filter((t) => t.lesson).length;
const FIRST_LESSON = TOPICS.find((t) => t.lesson);

function SyllabusRow({ topic }) {
  const body = (
    <>
      <span className="f-row-num">{topic.num}</span>
      <span className="f-row-main">
        <span className="f-row-title">{topic.title}</span>
        <span className="f-row-summary">{topic.summary}</span>
      </span>
      <span className={`f-row-level f-level-${topic.difficulty}`}>{topic.difficulty}</span>
      <span className="f-row-end" aria-hidden="true">
        {topic.lesson ? <ArrowRight size={16} /> : "Soon"}
      </span>
    </>
  );

  return (
    <motion.li
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.12 } }}
      transition={{ layout: { duration: 0.3, ease: EASE } }}
    >
      {/* Only topics with a written lesson link anywhere; the rest are visible
          so learners see the whole path, but not clickable dead ends. */}
      {topic.lesson ? (
        <Link to={`/foundations/${topic.slug}`} className="f-row">
          {body}
        </Link>
      ) : (
        <div className="f-row f-row-soon">{body}</div>
      )}
    </motion.li>
  );
}

// layoutId makes one background slide between pills instead of blinking.
function FilterPill({ active, onClick, layoutGroup, children }) {
  return (
    <button
      type="button"
      className="f-pill"
      aria-pressed={active}
      onClick={onClick}
    >
      {active && (
        <motion.span
          layoutId={layoutGroup}
          className="f-pill-bg"
          transition={{ type: "spring", stiffness: 500, damping: 38 }}
        />
      )}
      <span className="f-pill-label">{children}</span>
    </button>
  );
}

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal.Item className="f-faq-item">
      <button
        type="button"
        className="f-faq-q"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{item.q}</span>
        <motion.span
          aria-hidden="true"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: 22, lineHeight: 1 }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <p className="f-faq-a">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal.Item>
  );
}

export default function FoundationsPage() {
  const [group, setGroup] = useState("all");
  const [level, setLevel] = useState(null);

  const visible = useMemo(
    () =>
      NUMBERED.filter(
        (t) =>
          (group === "all" || t.group === group) &&
          (!level || t.difficulty === level),
      ),
    [group, level],
  );

  return (
    // reducedMotion="user" also covers the layout moves; the Reveal helpers
    // check useReducedMotion themselves because "user" only disables
    // transforms, not opacity.
    <MotionConfig reducedMotion="user">
      <div className="foundations-theme">
        <div className="f-wrap">
          <Reveal as="header" className="f-hero" stagger={0.1} onLoad>
            <Reveal.Item as="h1" className="f-display">
              The foundations every developer still needs.
            </Reveal.Item>
            <Reveal.Item as="p" className="f-lede">
              AI writes the surface. Learn what is underneath, plus the new
              skills to direct, review and trust what AI builds.
            </Reveal.Item>
            <Reveal.Item className="f-actions">
              <Link
                to={`/foundations/${FIRST_LESSON.slug}`}
                className="f-btn f-btn-primary"
              >
                Start with {FIRST_LESSON.title}
              </Link>
              <a href="#syllabus" className="f-btn f-btn-ghost">
                See the syllabus
              </a>
            </Reveal.Item>
            <Reveal.Item as="p" className="f-meta">
              {TOPICS.length} topics · {LESSON_COUNT} lessons ready · Free
            </Reveal.Item>
          </Reveal>

          <div
            id="syllabus"
            className="f-filters"
            role="group"
            aria-label="Filter topics"
          >
            {GROUP_FILTERS.map((f) => (
              <FilterPill
                key={f.id}
                layoutGroup="f-group-pill"
                active={group === f.id}
                onClick={() => setGroup(f.id)}
              >
                {f.label}
              </FilterPill>
            ))}
            <span className="f-divider" aria-hidden="true" />
            {LEVEL_FILTERS.map((l) => (
              <FilterPill
                key={l}
                layoutGroup="f-level-pill"
                active={level === l}
                onClick={() => setLevel(level === l ? null : l)}
              >
                {l}
              </FilterPill>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="f-empty">Nothing matches those filters.</p>
          )}

          {TOPIC_GROUPS.map((g) => {
            const items = visible.filter((t) => t.group === g.id);
            if (items.length === 0) return null;
            return (
              <section key={g.id} id={g.id} className="f-section">
                <Reveal>
                  <p className="f-section-eyebrow">{g.label}</p>
                  <h2 className="f-section-title">{g.title}</h2>
                  <p className="f-section-sub">{g.sub}</p>
                </Reveal>
                <ol className="f-syllabus">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {items.map((t) => (
                      <SyllabusRow key={t.slug} topic={t} />
                    ))}
                  </AnimatePresence>
                </ol>
              </section>
            );
          })}

          <section className="f-section">
            <Reveal>
              <p className="f-section-eyebrow">FAQ</p>
              <h2 className="f-section-title">Questions</h2>
            </Reveal>
            <Reveal stagger={0.08} amount={0.1} style={{ marginTop: 24 }}>
              {FOUNDATIONS_FAQ.map((item) => (
                <FaqItem key={item.q} item={item} />
              ))}
            </Reveal>
          </section>

          <Reveal className="f-cta">
            <h2 className="f-section-title">Ready to go deeper?</h2>
            <p className="f-section-sub">
              Pick a roadmap and earn each layer with a graded exam.
            </p>
            <Link to="/roadmaps" className="f-btn f-btn-primary">
              Pick a roadmap
            </Link>
          </Reveal>
        </div>
      </div>
    </MotionConfig>
  );
}
