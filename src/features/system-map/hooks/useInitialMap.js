import { useEffect, useMemo, useState } from "react";
import useAuthStore from "@/stores/useAuthStore";
import { createMap, createOwnerMap, fetchMap, fetchMyMaps, fetchOwnerMap } from "../systemMapApi";
import { EXAMPLE_GRAPH, clearSaved, fromGraph, loadSaved, toGraph } from "../lib/mapGraph";

const DEFAULT_TITLE = "My project";
const OWNER_TITLES = { capstone: "Capstone map", team: "Team map" };

const toRemote = (map) => ({
  id: map.id,
  title: map.title,
  revision: map.revision,
  shared: Boolean(map.shared),
  publicId: map.publicId ?? null,
  ownerType: map.ownerType ?? "personal",
  ownerId: map.ownerId ?? null,
  drift: map.drift ?? null,
});

const openable = (map) => {
  const graph = fromGraph(map.graph);
  if (!graph) throw new Error("This map's data is damaged, so it wasn't opened.");
  return { graph, remote: toRemote(map) };
};

/** A capstone's or team's map: opened if it exists, otherwise created from the example. */
async function loadOwnerMap({ ownerType, ownerId }) {
  const existing = await fetchOwnerMap(ownerType, ownerId);
  if (existing) return openable(existing);
  const graph = fromGraph(EXAMPLE_GRAPH);
  const created = await createOwnerMap(ownerType, ownerId, {
    title: OWNER_TITLES[ownerType],
    graph: toGraph(graph.nodes, graph.edges, graph.repo, graph.lens),
  });
  return openable(created);
}

/** The learner's own map: their newest one, or the browser's map uploaded as their first. */
async function loadPersonalMap() {
  const [first] = await fetchMyMaps();
  if (first) return openable(await fetchMap(first.id));

  const graph = loadSaved() ?? fromGraph(EXAMPLE_GRAPH);
  const map = await createMap({ title: DEFAULT_TITLE, graph: toGraph(graph.nodes, graph.edges, graph.repo, graph.lens) });
  clearSaved();
  return { graph, remote: toRemote(map) };
}

/**
 * Where the map comes from.
 *   guest            -> this browser's saved map, or the example
 *   signed in        -> their newest map on the server. With none yet, the
 *                       browser's map (or the example) is uploaded as their
 *                       first one, then the browser copy is removed so the next
 *                       account on a shared computer can't see it.
 *   with an `owner`  -> that capstone's or team's map. These live only on the
 *                       server, so a guest gets status "signin"; a learner who
 *                       isn't eligible gets the server's reason as the error.
 *
 * @param {{ ownerType: "capstone" | "team", ownerId: string } | null} [owner]
 * @returns {{ status: "loading" | "ready" | "error" | "signin", graph?: object, remote?: { id: string, title: string, revision: number, shared: boolean, publicId: string | null, ownerType: string, ownerId: string | null, drift: object | null } | null, error?: string }}
 */
export default function useInitialMap(owner = null) {
  const auth = useAuthStore((s) => s.auth);
  const authLoading = useAuthStore((s) => s.isLoading);
  const session = useAuthStore((s) => s.session);
  const [loaded, setLoaded] = useState(null);
  const ownerType = owner?.ownerType ?? null;
  const ownerId = owner?.ownerId ?? null;
  const key = ownerType ? `${ownerType}/${ownerId}` : "personal";

  useEffect(() => {
    if (authLoading || !auth) return;
    let alive = true;

    (ownerType ? loadOwnerMap({ ownerType, ownerId }) : loadPersonalMap())
      .then((result) => alive && setLoaded({ session, key, status: "ready", ...result }))
      .catch((err) => alive && setLoaded({ session, key, status: "error", error: err.message }));

    return () => {
      alive = false;
    };
  }, [auth, authLoading, session, key, ownerType, ownerId]);

  // A guest's map is read once per visit, not on every render.
  const guest = useMemo(
    () => (!authLoading && !auth && !ownerType ? { status: "ready", graph: loadSaved() ?? fromGraph(EXAMPLE_GRAPH), remote: null } : null),
    [authLoading, auth, ownerType],
  );

  if (authLoading) return { status: "loading" };
  if (!auth) return ownerType ? { status: "signin" } : guest;
  // A result from an earlier session or another map (sign out, sign in as someone else) is not ours.
  return loaded?.session === session && loaded.key === key ? loaded : { status: "loading" };
}
