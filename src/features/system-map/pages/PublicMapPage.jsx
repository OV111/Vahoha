import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BadgeCheck, Map as MapIcon } from "lucide-react";
import UserAvatar from "@/components/ui/UserAvatar";
import useAuthStore from "@/stores/useAuthStore";
import ReadOnlyMap from "../components/ReadOnlyMap";
import { fetchPublicMap } from "../systemMapApi";
import { fromGraph } from "../lib/mapGraph";
import { DEFAULT_LENS, lensInfo } from "../lib/lenses";

// /map/:publicId — a Project Map its owner chose to share. Open to anyone and
// read-only: viewers can pan, zoom and click a part, never change it. The API
// answers 404 once sharing is turned off, so an old link simply stops working.

const updatedLabel = (iso) =>
  new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

function Missing({ message }) {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 text-center">
      <span className="flex size-12 items-center justify-center rounded-xl bg-neutral-900 text-neutral-400">
        <MapIcon size={22} aria-hidden="true" />
      </span>
      <p role="alert" className="mt-4 text-neutral-200">
        {message}
      </p>
      <Link
        to="/project-map"
        className="mt-5 inline-flex min-h-11 items-center rounded-lg border border-neutral-700 px-4 text-sm text-neutral-200 transition-colors hover:border-neutral-500 hover:text-white"
      >
        Draw your own
      </Link>
    </section>
  );
}

const OwnerBadge = ({ owner }) => (
  <>
    <UserAvatar src={owner.avatar} name={owner.name || owner.username || ""} size="size-7" />
    {owner.name || owner.username}
  </>
);

// `graph` is the validated copy (lens and repo for the header); the map itself
// is drawn by ReadOnlyMap from the saved shape.
function Viewer({ map, graph }) {
  const auth = useAuthStore((s) => s.auth);
  const { owner } = map;

  return (
    <section className="mx-auto max-w-[1500px] px-4 pt-6 pb-16 sm:px-6">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-amber-300">
        Project map{graph.lens !== DEFAULT_LENS && ` · ${lensInfo(graph.lens).title}`}
      </p>
      <h1 className="mt-1 text-2xl font-bold text-white">{map.title}</h1>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-400">
        {owner &&
          // Profiles need a login, so visitors (often recruiters) see the name without a link.
          (auth && owner.username ? (
            <Link to={`/users/${owner.username}`} className="inline-flex min-h-11 items-center gap-2 text-neutral-200 hover:text-white">
              <OwnerBadge owner={owner} />
            </Link>
          ) : (
            <span className="inline-flex min-h-11 items-center gap-2 text-neutral-200">
              <OwnerBadge owner={owner} />
            </span>
          ))}
        <span>Updated {updatedLabel(map.updatedAt)}</span>
        {graph.repo && (
          <a
            href={`https://github.com/${graph.repo.fullName}`}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex min-h-11 items-center gap-1.5 text-emerald-300 hover:underline"
          >
            <BadgeCheck size={15} aria-hidden="true" /> Verified from {graph.repo.fullName}
          </a>
        )}
      </div>

      <div className="mt-5">
        <ReadOnlyMap graph={map.graph}>
          <Link to="/project-map" className="mt-5 inline-flex min-h-11 items-center text-sm text-purple-300 hover:text-purple-200">
            Draw a map of your own project
          </Link>
        </ReadOnlyMap>
      </div>
    </section>
  );
}

export default function PublicMapPage() {
  const { publicId } = useParams();
  const [loaded, setLoaded] = useState({ key: null });

  useEffect(() => {
    let alive = true;
    fetchPublicMap(publicId)
      .then((map) => alive && setLoaded({ key: publicId, status: "ready", map, graph: fromGraph(map.graph) }))
      .catch((err) => alive && setLoaded({ key: publicId, status: "error", message: err.message }));
    return () => {
      alive = false;
    };
  }, [publicId]);

  // A result for the previous link counts as still loading.
  if (loaded.key !== publicId) {
    return (
      <div role="status" className="flex min-h-[60vh] items-center justify-center text-sm text-neutral-400">
        Opening the map…
      </div>
    );
  }
  if (loaded.status === "error") return <Missing message={loaded.message} />;
  if (!loaded.graph) return <Missing message="This map's data is damaged, so it can't be shown." />;
  return <Viewer key={publicId} map={loaded.map} graph={loaded.graph} />;
}
