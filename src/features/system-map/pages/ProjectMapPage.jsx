import { lazy, Suspense, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingSuspense from "@/components/feedback/LoadingSuspense";
import ServerDown from "@/components/feedback/ServerDown";
import NotFound from "../../../components/feedback/NotFound";
import useAuthStore from "@/stores/useAuthStore";
import MapSkeleton from "../components/MapSkeleton";
import useInitialMap from "../hooks/useInitialMap";
import { DEVELOPER_SIGNUP_PATH } from "../../../../constants/site";

// Only signed-in learners reach the editor; guests stop at the sign-in screen,
// so the heavy canvas/export code stays out of the page's own chunk.
const loadEditor = () => import("../components/ProjectMapEditor");
const ProjectMapEditor = lazy(loadEditor);

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
  const returning = useAuthStore((s) => s.auth || s.sessionHint);
  const skeleton = returning ? <MapSkeleton ownerType={owner?.ownerType} /> : <LoadingSuspense />;

  // The editor downloads while the map does, not after it.
  useEffect(() => {
    if (returning) loadEditor();
  }, [returning]);

  if (initial.status === "unreachable") return <ServerDown />;
  if (initial.status === "signin") {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 text-center">
        <p className="text-lg font-semibold text-white">Prove you understand what you built</p>
        <p className="mt-2 text-sm text-neutral-400">Map your project in 3D, verify it against your repo, and share one link that shows it. Sign in to start.</p>
        <Link
          to={DEVELOPER_SIGNUP_PATH}
          className="mt-4 inline-flex min-h-11 items-center rounded-lg border border-neutral-700 px-4 text-sm text-neutral-200 hover:border-neutral-500 hover:text-white"
        >
          Sign in
        </Link>
      </section>
    );
  }
  if (initial.status === "loading") {
    // Same element as the editor's Suspense fallback, so loading the map and the
    // editor read as one wait. A guest is about to see the sign-in screen instead.
    return skeleton;
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
    <Suspense fallback={skeleton}>
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
