import { lazy, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import RiseText from "../components/home/RiseText";
import Divider from "../components/ui/Divider";
import vahohaMark from "@/assets/brand/vahoha-mark-96.webp";

// Below the fold and the only homepage piece using motion/react, so it loads
// in its own chunk. No Suspense here on purpose: the page suspends to the
// layout's boundary, the prerendered copy stays on screen meanwhile, and the
// swap happens once this section exists (so /#how-it-works can scroll to it).
const HowItWorks = lazy(() => import("../components/home/HowItWorks"));

const Home = () => {
  const { auth } = useAuthStore();
  // `key` changes on every navigation, even to the same URL, so clicking
  // "See how it works" a second time (hash already set) still scrolls.
  const { hash, key } = useLocation();

  // Scroll-to-top is handled app-wide by <ScrollRestoration /> in MainLayout.
  // This only adds a smooth glide for "/#how-it-works" links, instead of the
  // instant jump ScrollRestoration does for hash targets.
  useEffect(() => {
    if (!hash) return;
    document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
  }, [hash, key]);

  return (
    <>
      <section className="flex min-h-[85dvh] flex-col items-center justify-center px-4 text-center sm:px-6">
        {/* Top badge */}
        <div
          className="rt-fade mb-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1"
          style={{ "--delay": "0ms" }}
        >
          <span className="inline-flex items-center gap-2.5 text-sm leading-6 font-normal text-neutral-300 sm:text-base sm:leading-7 md:text-[18px] md:leading-[29.25px]">
            <img src={vahohaMark} alt="" width={32} height={32} className="h-7 w-7 rounded-full md:h-8 md:w-8" />
            Vahoha
          </span>
          <span className="text-neutral-600" aria-hidden="true">|</span>
          <span className="text-sm leading-6 font-normal text-neutral-300 sm:text-base sm:leading-7 md:text-[18px] md:leading-[29.25px]">
            Built by devs, for devs
          </span>
        </div>

        {/* Headline */}
        <RiseText
          lines={["The Next Generation of", "Developer Learning."]}
          highlight="Learning"
          className="max-w-xl text-[clamp(26px,8.5vw,34px)] leading-[1.1] font-[450] tracking-[-0.48px] text-balance [--rt-underline-offset:-0.2em] min-[420px]:text-4xl sm:text-5xl md:text-[50px] md:leading-[0.96] md:[--rt-underline-offset:-0.08em] [&_.rt-line]:inline max-sm:[&_.rt-line]:whitespace-nowrap md:[&_.rt-line]:block text-white"
          style={{ fontFamily: '"Geist Variable", system-ui, sans-serif' }}
        />

        <p
          className="rt-fade mt-4 max-w-xl text-sm leading-6 sm:text-base sm:leading-7 md:text-[18px] md:leading-[29.25px] font-normal text-neutral-300"
          style={{ "--delay": "650ms" }}
        >
          Prove what you know, unlock real progress,{" "}
          <br className="hidden sm:block" />
          guided by an AI mentor that knows your journey.
        </p>

        <div
          className="rt-fade mt-6 mx-auto flex w-full max-w-[13rem] flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:justify-center md:mt-8"
          style={{ "--delay": "800ms" }}
        >
          <Link
            to={auth ? "/roadmaps" : "/get-started"}
            className="flex min-h-9 items-center justify-center rounded-full sm:min-h-11 bg-white px-4 py-1.5 text-[13px] sm:px-5 sm:py-2.5 sm:text-[14px] leading-[20px] font-medium text-black transition hover:bg-neutral-200"
          >
            {/* The label fits who is looking: a signed-in user is already on a path. */}
            {auth ? "Continue learning →" : "Start your path →"}
          </Link>
          <Link
            // Guests ask "what is this?", so they get the explainer on this same
            // page (smooth-scrolled by the hash effect above). Signed-in users get
            // a different feature, not a second link to the roadmap.
            to={auth ? "/progress" : "/#how-it-works"}
            className="flex min-h-9 items-center justify-center rounded-full sm:min-h-11 border border-white/15 bg-neutral-800 px-4 py-1.5 text-[13px] sm:px-5 sm:py-2.5 sm:text-[14px] leading-[20px] font-medium text-white hover:border-white/25 transition hover:bg-neutral-700"
          >
            {auth ? "View your progress" : "See how it works"}
          </Link>
        </div>
      </section>

      <Divider />

      <HowItWorks />
    </>
  );
};

export default Home;
