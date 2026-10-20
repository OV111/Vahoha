import { useMemo } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, Clock3, FlaskConical, Target, Wrench } from "lucide-react";
import { roomById, roomOfTrack, tracksInRoom, tracksInSection, trackTitle } from "./rooms";
import { LAB_MANIFEST } from "./content/manifest";
import LabCard from "./components/LabCard";
import useNextLab from "./hooks/useNextLab";

// /labs/:roomId[?section=web&track=javascript] — one room of the Labs building.
// Open to everyone. A big room is split into sections (tabs); the Languages
// section adds track chips. Both live in the URL so a link opens the same view.
export default function RoomPage() {
  const { roomId } = useParams();
  const [params, setParams] = useSearchParams();
  const room = roomById(roomId);
  const roomTracks = useMemo(() => (room ? tracksInRoom(room.id) : []), [room]);
  const roomTrackIds = useMemo(() => new Set(roomTracks.map((t) => t.id)), [roomTracks]);
  const next = useNextLab(roomTrackIds);

  if (!room) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold text-white">This room doesn&rsquo;t exist</h1>
        <Link to="/labs" className="mt-6 inline-flex min-h-11 items-center gap-2 text-purple-300 hover:text-purple-200">
          <ArrowLeft size={14} aria-hidden="true" /> Back to all labs
        </Link>
      </section>
    );
  }

  const section = room.sections?.find((s) => s.id === params.get("section")) ?? room.sections?.[0] ?? null;
  const sectionTracks = section ? tracksInSection(room, section.id) : roomTracks;
  const pickedTrack = section?.pickTrack ? sectionTracks.find((t) => t.id === params.get("track")) ?? null : null;
  const visibleTracks = pickedTrack ? [pickedTrack] : sectionTracks;

  const roomLabs = LAB_MANIFEST.filter((lab) => roomOfTrack(lab.trackId) === room.id);
  const labsOf = (trackId) => roomLabs.filter((l) => l.trackId === trackId);
  const groups = visibleTracks.map((track) => ({ track, labs: labsOf(track.id) })).filter((g) => g.labs.length);

  // Tabs and chips only change the view, not the page: replace the history entry
  // (Back leaves the room) and keep the scroll position. Without
  // preventScrollReset, the layout's <ScrollRestoration> treats every switch as
  // a new navigation and jumps to the top, which looks like a full re-render.
  const viewOnly = { replace: true, preventScrollReset: true };
  const openSection = (id) => setParams(id === room.sections[0].id ? {} : { section: id }, viewOnly);
  const pickTrack = (id) => setParams({ section: section.id, ...(id ? { track: id } : {}) }, viewOnly);

  return (
    <section className="relative">
      <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-0 h-72 bg-linear-to-b ${room.accent.glow} to-transparent`} />

      <div className="relative mx-auto max-w-5xl px-6 pt-10 pb-24">
        <Link
          to="/labs"
          className="inline-flex min-h-11 items-center gap-1.5 text-sm text-neutral-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-purple-400"
        >
          <ArrowLeft size={14} aria-hidden="true" /> All labs
        </Link>

        <div className="mt-4 flex items-start gap-4">
          <span className={`flex size-14 shrink-0 items-center justify-center rounded-2xl border ${room.accent.border} ${room.accent.bg} ${room.accent.text}`}>
            <room.Icon size={26} aria-hidden="true" />
          </span>
          <div>
            <p className={`text-[11px] font-semibold uppercase tracking-widest ${room.accent.text}`}>Lab room · {roomTracks.length} tracks</p>
            <h1 className="mt-1 text-3xl font-bold leading-tight text-white">{room.title}</h1>
            <p className="mt-2 text-neutral-300">{room.tagline}</p>
          </div>
        </div>

        {/* What practice looks like in this room */}
        <dl className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/80 p-4">
            <dt className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
              <Wrench size={13} aria-hidden="true" /> Your workbench
            </dt>
            <dd className="mt-1.5 text-sm text-neutral-200">{room.surface}</dd>
          </div>
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/80 p-4">
            <dt className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
              <Target size={13} aria-hidden="true" /> How you prove it
            </dt>
            <dd className="mt-1.5 text-sm text-neutral-200">{room.proof}</dd>
          </div>
        </dl>

        {next && (
          <div className="mt-10">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-400">Your next lab here</h2>
            <LabCard lab={next.lab} highlight={next.reason} />
          </div>
        )}

        {/* Sections: at most 5, each one roadmap category */}
        {room.sections && (
          <div role="tablist" aria-label={`${room.title} sections`} className="mt-12 flex gap-2 overflow-x-auto border-b border-neutral-800 pb-px">
            {room.sections.map((s) => {
              const active = s.id === section.id;
              const count = tracksInSection(room, s.id).length;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => openSection(s.id)}
                  className={`relative flex min-h-11 shrink-0 items-center gap-2 px-3 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-purple-400 ${
                    active ? "text-white" : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  <s.Icon size={15} className={active ? room.accent.text : ""} aria-hidden="true" />
                  {s.title}
                  <span className="rounded-full bg-neutral-800 px-1.5 text-[11px] tabular-nums text-neutral-400">{count}</span>
                  {active && <span aria-hidden="true" className={`absolute inset-x-2 -bottom-px h-0.5 rounded-full ${room.accent.line}`} />}
                </button>
              );
            })}
          </div>
        )}

        {/* Languages: pick one language instead of scrolling through all of them */}
        {section?.pickTrack && (
          <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Pick a language">
            {[{ id: null, title: "All" }, ...sectionTracks].map((t) => {
              const active = (pickedTrack?.id ?? null) === t.id;
              return (
                <button
                  key={t.id ?? "all"}
                  type="button"
                  aria-pressed={active}
                  onClick={() => pickTrack(t.id)}
                  className={`min-h-9 rounded-full border px-3 text-xs transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400 ${
                    active ? `${room.accent.border} ${room.accent.bg} text-white` : "border-neutral-800 text-neutral-300 hover:border-neutral-600"
                  }`}
                >
                  {t.id ? trackTitle(t.id) : t.title}
                  {t.id && labsOf(t.id).length > 0 && <span className="ml-1 text-emerald-300">●</span>}
                </button>
              );
            })}
          </div>
        )}

        {groups.length > 0 ? (
          <div className="mt-8 space-y-10">
            {groups.map(({ track, labs }) => (
              <div key={track.id}>
                <h2 className="text-lg font-semibold text-white">{track.title}</h2>
                <ul className="mt-3 space-y-3">
                  {labs.map((lab) => (
                    <li key={lab.slug}>
                      <LabCard lab={lab} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-neutral-700 p-8 text-center">
            <span className={`mx-auto flex size-12 items-center justify-center rounded-xl ${room.accent.bg} ${room.accent.text}`}>
              <Clock3 size={22} aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-lg font-semibold text-white">
              {section ? `${pickedTrack ? trackTitle(pickedTrack.id) : section.title} labs are opening soon` : "This room is opening soon"}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-neutral-300">
              Labs here are being designed around how people really work: {room.vocabulary.join(", ")}. Until then,
              learn the topics on the roadmap.
            </p>
            <Link
              to="/roadmaps"
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg border border-neutral-700 px-4 text-sm text-neutral-200 transition-colors hover:border-neutral-500 hover:text-white"
            >
              <FlaskConical size={14} aria-hidden="true" /> Go to the roadmaps
            </Link>
          </div>
        )}

        {/* Which roadmap tracks practice here (in this section) */}
        {!section?.pickTrack && (
          <>
            <h2 className="mt-14 text-sm font-semibold uppercase tracking-wider text-neutral-400">
              Tracks practiced {section ? `in ${section.title}` : "here"} · {sectionTracks.length}
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {sectionTracks.map((t) => (
                <li
                  key={t.id}
                  className={`rounded-full border px-3 py-1 text-xs ${
                    labsOf(t.id).length ? `${room.accent.border} ${room.accent.text}` : "border-neutral-800 text-neutral-400"
                  }`}
                >
                  {trackTitle(t.id)}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
