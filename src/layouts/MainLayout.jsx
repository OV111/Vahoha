import React, { Suspense } from "react";
import { Outlet, ScrollRestoration, useMatches } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Footer from "./Footer";
import LoadingSuspense from "../components/feedback/LoadingSuspense";
import RouteSeo from "../seo/RouteSeo";
import PrerenderHandoff from "../seo/PrerenderHandoff";
const MainLayout = () => {
  // A route marked `handle: { appShell: true }` is a full-screen tool (the mentor
  // chat): it sizes itself to the space under the navbar, so a footer or a
  // full-screen minimum below it would turn the whole page into a scroller.
  const appShell = useMatches().some((m) => m.handle?.appShell);

  return (
    <div className="relative bg-black min-h-dvh overflow-x-hidden">
      <ScrollRestoration />
      <RouteSeo />
      <Navbar />
      <main className={appShell ? "" : "min-h-dvh"}>
        <Suspense fallback={<LoadingSuspense />}>
          <Outlet />
          <PrerenderHandoff />
        </Suspense>
      </main>
      {!appShell && <Footer />}
    </div>
  );
};
export default MainLayout;
