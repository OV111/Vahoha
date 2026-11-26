import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { HIRING_EVIDENCE, HIRING_HERO, HIRING_LOGIN_PATH, HIRING_STEPS } from "@/constants/hiring";

const CARD = "rounded-2xl border border-neutral-800 bg-neutral-950 p-5";

// /hiring: the public door for companies.
const HiringLandingPage = () => (
  <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
    <p className="text-sm font-medium text-purple-400">{HIRING_HERO.eyebrow}</p>
    <h1 className="mt-3 max-w-2xl text-3xl font-semibold text-balance text-white sm:text-4xl">{HIRING_HERO.title}</h1>
    <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-neutral-400">{HIRING_HERO.body}</p>

    <div className="mt-8 flex flex-wrap gap-3">
      <Link
        to="/hiring/join"
        className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-700"
      >
        Create a hiring account <ArrowRight size={15} aria-hidden="true" />
      </Link>
      <Link
        to={HIRING_LOGIN_PATH}
        className="rounded-xl border border-neutral-700 px-5 py-3 text-sm font-semibold text-neutral-200 transition-colors hover:border-neutral-500"
      >
        Log in
      </Link>
    </div>

    <h2 className="mt-16 text-lg font-semibold text-white">What you see for each candidate</h2>
    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
      {HIRING_EVIDENCE.map(({ Icon, title, body }) => (
        <li key={title} className={CARD}>
          <Icon size={18} className="text-purple-400" aria-hidden="true" />
          <p className="mt-3 font-medium text-white">{title}</p>
          <p className="mt-1 text-sm text-neutral-400">{body}</p>
        </li>
      ))}
    </ul>

    <h2 className="mt-16 text-lg font-semibold text-white">How it works</h2>
    <ol className="mt-4 grid gap-3 sm:grid-cols-3">
      {HIRING_STEPS.map((s, i) => (
        <li key={s.title} className={CARD}>
          <p className="text-xs font-semibold text-purple-400">Step {i + 1}</p>
          <p className="mt-2 font-medium text-white">{s.title}</p>
          <p className="mt-1 text-sm text-neutral-400">{s.body}</p>
        </li>
      ))}
    </ol>

    <p className="mt-10 text-sm text-neutral-500">
      Developers choose what you see. Weak spots and private progress are never shown.
    </p>
  </div>
);

export default HiringLandingPage;
