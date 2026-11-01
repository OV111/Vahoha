import { Link } from "react-router-dom";
import { motion as Motion } from "motion/react";
import { Check, Github } from "lucide-react";
import { ABOUT_PILLARS, ABOUT_AUDIENCE, ABOUT_STATUS } from "../../constants/about";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay },
});

const SectionTitle = ({ children }) => (
  <Motion.h2
    className="text-center text-3xl font-[450] tracking-tight text-white"
    {...fadeUp()}
  >
    {children}
  </Motion.h2>
);

const About = () => (
  <div className="mx-auto flex max-w-5xl flex-col gap-16 px-4 py-12 sm:gap-28 sm:px-6 sm:py-20">
    {/* Hero */}
    <section className="flex flex-col items-center gap-4 text-center">
      <Motion.span
        className="text-sm font-medium text-neutral-400"
        {...fadeUp()}
      >
        About Vahoha
      </Motion.span>
      <Motion.h1
        className="max-w-2xl text-3xl leading-tight font-[450] tracking-tight text-balance text-white sm:text-5xl"
        style={{ fontFamily: '"Geist Variable", system-ui, sans-serif' }}
        {...fadeUp(0.1)}
      >
        Learning that won&apos;t let you fake it.
      </Motion.h1>
      <Motion.p
        className="max-w-2xl text-lg leading-relaxed text-neutral-300"
        {...fadeUp(0.2)}
      >
        Courses show you what to learn. Nothing checks if you understood it,
        until an interview does. Vahoha checks first.
      </Motion.p>
    </section>

    {/* What makes it different */}
    <section className="flex flex-col gap-10">
      <SectionTitle>How Vahoha is different</SectionTitle>
      <div className="grid gap-4 sm:grid-cols-3">
        {ABOUT_PILLARS.map(({ icon: Icon, title, body }, i) => (
          <Motion.div
            key={title}
            className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6"
            {...fadeUp(i * 0.1)}
          >
            <Icon size={20} className="text-purple-400" />
            <h3 className="mt-4 text-base font-medium text-neutral-100">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-400">
              {body}
            </p>
          </Motion.div>
        ))}
      </div>
    </section>

    {/* Who it's for */}
    <section className="flex flex-col gap-10">
      <SectionTitle>Who it&apos;s for</SectionTitle>
      <ul className="mx-auto flex max-w-xl flex-col gap-3">
        {ABOUT_AUDIENCE.map((line, i) => (
          <Motion.li
            key={line}
            className="flex items-start gap-3 text-neutral-300"
            {...fadeUp(i * 0.08)}
          >
            <Check size={18} className="mt-0.5 shrink-0 text-purple-400" />
            {line}
          </Motion.li>
        ))}
      </ul>
    </section>

    {/* Honest build status */}
    <section className="flex flex-col gap-10">
      <SectionTitle>Where we are</SectionTitle>
      <ol className="mx-auto flex w-full max-w-xl flex-col">
        {ABOUT_STATUS.map(({ done, label, desc }, i) => {
          const next = ABOUT_STATUS[i + 1];
          return (
          <Motion.li key={label} className="relative pb-5 pl-7 last:pb-0" {...fadeUp(i * 0.06)}>
            {/* Each item draws the line from its dot to the next one, so the
                path starts and ends at a dot. Purple while both ends are built. */}
            {next && (
              <span
                aria-hidden="true"
                className={`absolute top-2.5 -bottom-2.5 left-1 w-px ${
                  done && next.done ? "bg-purple-400/50" : "bg-neutral-800"
                }`}
              />
            )}
            {/* 9px dot centred on the 1px line (x = 4.5px) and on the 20px label row (y = 10px). */}
            <span
              aria-hidden="true"
              className={`absolute top-[5.5px] left-0 size-[9px] rounded-full ${
                done ? "bg-purple-400" : "border border-neutral-600 bg-black"
              }`}
            />
            <p className="flex min-h-5 items-center gap-2 text-sm font-medium text-neutral-100">
              {label}
              {!done && (
                // leading-4 + py-px keeps the badge inside the 20px row, so
                // "Next" rows line up with their dot like the others.
                <span className="rounded-full border border-neutral-700 px-2 py-px text-[11px] leading-4 text-neutral-400">
                  Next
                </span>
              )}
            </p>
            <p className="mt-1 text-sm text-neutral-400">{desc}</p>
          </Motion.li>
          );
        })}
      </ol>
    </section>

    {/* Built in public + CTA */}
    <Motion.section
      className="flex flex-col items-center gap-6 rounded-3xl border border-neutral-800 bg-neutral-950 px-5 py-10 text-center sm:px-6 sm:py-12"
      {...fadeUp()}
    >
      <h2 className="text-2xl font-[450] tracking-tight text-white sm:text-3xl">
        Built in public
      </h2>
      <p className="max-w-lg text-neutral-400">
        Vahoha is free during beta and built by a solo developer. Early users
        shape what gets built next, so tell us what works and what doesn&apos;t.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          to="/get-started"
          className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-neutral-200"
        >
          Get Started →
        </Link>
        <a
          href="https://github.com/OV111"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-neutral-800 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          <Github size={16} />
          GitHub
        </a>
        <Link
          to="/contact"
          className="rounded-full px-5 py-3 text-sm font-medium text-neutral-300 transition hover:text-white"
        >
          Contact
        </Link>
      </div>
    </Motion.section>
  </div>
);

export default About;
