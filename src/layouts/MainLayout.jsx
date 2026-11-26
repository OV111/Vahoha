import { Suspense } from "react";
import { Outlet, ScrollRestoration, useMatches } from "react-router-dom";
import Navbar from "@/layouts/navbar/Navbar";
import Footer from "@/layouts/Footer";
import LoadingSuspense from "@/components/feedback/LoadingSuspense";
import ServerBanner from "@/components/feedback/ServerBanner";
import RouteSeo from "@/seo/RouteSeo";
import PrerenderHandoff from "@/seo/PrerenderHandoff";
import RecruiterGate from "@/features/hiring/components/RecruiterGate";

const MainLayout = () => {
  const matches = useMatches();
  const appShell = matches.some((m) => m.handle?.appShell);
  const reading = matches.some((m) => m.handle?.reading);

  return (
    <div
      className={`relative bg-black min-h-dvh ${reading ? "overflow-x-clip" : "overflow-x-hidden"}`}
    >
      <ScrollRestoration />
      <RouteSeo />
      <Navbar />
      <main className={appShell ? "" : "min-h-dvh"}>
        <Suspense fallback={<LoadingSuspense />}>
          <RecruiterGate>
            <Outlet />
          </RecruiterGate>
          <PrerenderHandoff />
        </Suspense>
      </main>
      {!appShell && !reading && <Footer />}
      <ServerBanner />
    </div>
  );
};

export default MainLayout;
