import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const Dot = ({ done, current }) => (
  <span
    aria-hidden="true"
    className={`flex size-[18px] shrink-0 items-center justify-center rounded-full border ${
      done ? "border-emerald-500 text-emerald-400" : current ? "border-purple-500 bg-purple-500" : "border-neutral-600"
    }`}
  >
    {done && <Check size={11} strokeWidth={3} />}
  </span>
);

/** The layer's topics, grouped by step: where this page sits in the path. */
export function LayerNav({ lessons, currentSlug, doneSlugs, base }) {
  const steps = groupByStep(lessons);
  return (
    <nav aria-label="Topics in this layer" className="space-y-5">
      {steps.map(([title, items]) => (
        <div key={title}>
          <p className="pb-1 text-[13px] font-semibold text-white">{title}</p>
          <ul>
            {items.map((l) => {
              const current = l.slug === currentSlug;
              return (
                <li key={l.slug}>
                  <Link
                    to={`${base}/${l.slug}`}
                    aria-current={current ? "page" : undefined}
                    className={`-mx-2.5 flex min-h-9 items-center gap-3 rounded-lg px-2.5 py-1.5 text-[13px] leading-snug transition-colors hover:bg-(--lesson-raised) ${
                      current ? "bg-(--lesson-raised) font-medium text-white" : "text-neutral-300"
                    }`}
                  >
                    <span>
                      <Dot done={doneSlugs.has(l.slug)} current={current} />
                    </span>
                    {l.short ?? l.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function groupByStep(lessons) {
  const steps = new Map();
  for (const l of lessons) steps.set(l.step, [...(steps.get(l.step) ?? []), l]);
  return [...steps];
}

/** The sections of this page. `items` is [{ id, title, done }]. */
export function PageNav({ items, active }) {
  return (
    <nav aria-label="On this page">
      <p className="pb-2 text-[13px] font-semibold text-white">On this page</p>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={item.id === active ? "location" : undefined}
              className={`flex min-h-9 items-center gap-3 text-[13px] leading-snug transition-colors hover:text-white ${
                item.id === active ? "font-medium text-white" : "text-neutral-400"
              }`}
            >
              <Dot done={item.done} current={item.id === active} />
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
