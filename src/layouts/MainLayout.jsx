import React, { Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Footer from "./Footer";
import LoadingSuspense from "../components/feedback/LoadingSuspense";
import RouteSeo from "../seo/RouteSeo";
import PrerenderHandoff from "../seo/PrerenderHandoff";
const MainLayout = () => {
  return (
    <div className="relative bg-black min-h-dvh overflow-x-hidden">
      <ScrollRestoration />
      <RouteSeo />
      <Navbar />
      <main className="min-h-dvh">
        <Suspense fallback={<LoadingSuspense />}>
          <Outlet />
          <PrerenderHandoff />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};
export default MainLayout;
