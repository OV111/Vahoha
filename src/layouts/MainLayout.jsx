import React, { Suspense } from "react";
import { Outlet, ScrollRestoration, useMatches } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Footer from "./Footer";
import LoadingSuspense from "../components/feedback/LoadingSuspense";
import ServerBanner from "../components/feedback/ServerBanner";
import RouteSeo from "../seo/RouteSeo";
import PrerenderHandoff from "../seo/PrerenderHandoff";
import RecruiterGate from "../features/hiring/components/RecruiterGate";
const MainLayout = () => {
  // A route marked `handle: { appShell: true }` is a full-screen tool (the mentor
  // chat): it sizes itself to the space under the navbar, so a footer or a
  // full-screen minimum below it would turn the whole page into a scroller.
  const matches = useMatches();
  const appShell = matches.some((m) => m.handle?.appShell);
  // `handle: { focus: true }` (a lesson): no navbar or footer, the page brings its own.
  const focus = matches.some((m) => m.handle?.focus);

  return (
    <div
      className="relative bg-black min-h-dvh overflow-x-hidden"
      // A lesson has its own bar at the bottom: the server banner floats above it.
      style={focus ? { "--banner-lift": "5.5rem" } : undefined}
    >
      <ScrollRestoration />
      <RouteSeo />
      {!focus && <Navbar />}
      <main className={appShell ? "" : "min-h-dvh"}>
        <Suspense fallback={<LoadingSuspense />}>
          <RecruiterGate>
            <Outlet />
          </RecruiterGate>
          <PrerenderHandoff />
        </Suspense>
      </main>
      {!appShell && !focus && <Footer />}
      <ServerBanner />
    </div>
  );
};
export default MainLayout;
