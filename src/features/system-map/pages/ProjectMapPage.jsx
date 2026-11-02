import { lazy, Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingSuspense from "@/components/feedback/LoadingSuspense";
import NotFound from "../../../components/feedback/NotFound";
import useInitialMap from "../hooks/useInitialMap";

// Only signed-in learners reach the editor; guests stop at the sign-in screen,
// so the heavy canvas/export code stays out of the page's own chunk.
const ProjectMapEditor = lazy(() => import("../components/ProjectMapEditor"));

// /project-map — a free editor for the system diagram of your own project.
// Guests keep their map in this browser (localStorage). Signed-in learners keep
// it in their account: loaded by useInitialMap, saved here with the revision
// they last saw, so two tabs can't silently overwrite each other.
//
// /project-map/for/:ownerType/:ownerId — the same editor for the map that
// belongs to a capstone or a team. Those live on the server only. A team map is
// shared by every active member, so it has no public link of its own (it reaches
// the public through the team's evidence page) and no understanding check.

const OWNER_TYPES = ["capstone", "team"];

function ProjectMapLoader({ owner }) {
  const initial = useInitialMap(owner);

  if (initial.status === "signin") {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 text-center">
        <p className="text-lg font-semibold text-white">Sign in to use Project Map</p>
        <p className="mt-2 text-sm text-neutral-400">Draw how your project works, scan your repo for parts, and keep the map in your account.</p>
        <Link
          to="/get-started"
          className="mt-4 inline-flex min-h-11 items-center rounded-lg border border-neutral-700 px-4 text-sm text-neutral-200 hover:border-neutral-500 hover:text-white"
        >
          Sign in
        </Link>
      </section>
    );
  }
  if (initial.status === "loading") {
    // Same element as the route's Suspense fallback, so the lazy-load and the
    // map fetch read as one loader instead of two circles in different spots.
    return <LoadingSuspense />;
  }
  if (initial.status === "error") {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 text-center">
        <p role="alert" className="text-neutral-200">{initial.error}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 min-h-11 cursor-pointer rounded-lg border border-neutral-700 px-4 text-sm text-neutral-200 hover:border-neutral-500"
        >
          Try again
        </button>
      </section>
    );
  }

  return (
    <Suspense fallback={<LoadingSuspense />}>
      <ProjectMapEditor key={initial.remote?.id ?? "guest"} initial={initial} />
    </Suspense>
  );
}

export default function ProjectMapPage() {
  const { ownerType, ownerId } = useParams();
  if (!ownerType) return <ProjectMapLoader owner={null} />;
  if (!OWNER_TYPES.includes(ownerType) || !ownerId) return <NotFound />;
  // Keyed by owner so moving between two maps never shows the first one's data.
  return <ProjectMapLoader key={`${ownerType}/${ownerId}`} owner={{ ownerType, ownerId }} />;
}
