import { Link } from "react-router-dom";
import { ArrowRight, FlaskConical, DoorOpen } from "lucide-react";
import { ROOMS, roomOfTrack, tracksInRoom } from "./rooms";
import { FONT_MONO } from "@/features/coding-challenges/lib/arenaTheme";
import { LAB_MANIFEST } from "./content/manifest";
import LabCard from "./components/LabCard";
import useNextLab from "./hooks/useNextLab";

// /labs — the Labs building, drawn as a corridor: one line down the middle,
// rooms on alternating sides like doors along a hallway. Any room is open to
// anyone, whatever their roadmap progress. On phones the corridor runs down
// the left edge and every room sits to its right.
const labsIn = (roomId) => LAB_MANIFEST.filter((lab) => roomOfTrack(lab.trackId) === roomId);

const RoomDoor = ({ room, index }) => {
  const count = room.openCount ?? labsIn(room.id).length;
  const noun = room.openNoun ?? "lab";
  const tracks = tracksInRoom(room.id).length;
  const onLeft = index % 2 === 0;

  return (
    <li className="relative py-5 pl-16 md:-mt-24 md:grid md:grid-cols-2 md:gap-28 md:pl-0 md:first:mt-6">
      {/* Door marker on the corridor */}
      <span
        aria-hidden="true"
        className={`absolute left-6 top-1/2 z-10 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 bg-black text-xs font-bold transition-colors duration-150 md:left-1/2 ${room.accent.border} ${room.accent.text}`}
      >
        {index + 1}
      </span>
      {/* Connector from the corridor to the room */}
      <span
        aria-hidden="true"
        className={`absolute top-1/2 left-6 h-px w-10 ${room.accent.line} md:w-14 ${onLeft ? "md:left-[calc(50%-3.5rem)]" : "md:left-1/2"}`}
      />

      <Link
        to={`/labs/${room.id}`}
        className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-neutral-950 p-5 transition-colors duration-150 border-neutral-800 ${room.accent.ring} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400 ${
          onLeft ? "md:col-start-1" : "md:col-start-2"
        }`}
      >
        <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b ${room.accent.glow} to-transparent`} />
        <div className="relative flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl border ${room.accent.border} ${room.accent.bg} ${room.accent.text}`}>
              <room.Icon size={20} className={room.Icon.selfAnimated ? undefined : "transition-transform duration-300 ease-out group-hover:-rotate-12 group-hover:scale-125 motion-reduce:transition-none motion-reduce:group-hover:transform-none"} aria-hidden="true" />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                Room {index + 1}</p>
              <h3 className="text-lg font-semibold leading-tight text-white">{room.title}</h3>
            </div>
          </div>
          {count > 0 ? (
            <span className="shrink-0 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
              {count} {noun}{count === 1 ? "" : "s"} open
            </span>
          ) : (
            <span className="shrink-0 rounded-full bg-neutral-800 px-2.5 py-1 text-[11px] font-medium text-neutral-400">Opening soon</span>
          )}
        </div>
        <p className="relative mt-3 text-sm text-neutral-300">{room.tagline}</p>
        <div className="relative mt-4 flex items-center justify-between gap-3">
          <p className="text-xs text-neutral-400">
            {room.vocabulary.join(" · ")} · {room.size ?? `${tracks} tracks`}
          </p>
          <span className={`inline-flex shrink-0 items-center gap-1.5 text-sm font-medium ${room.accent.text}`}>
            <DoorOpen size={15} aria-hidden="true" /> Enter
            <ArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </li>
  );
};

export default function LabsPage() {
  const next = useNextLab();

  return (
    <section className="mx-auto max-w-6xl px-6 pt-16 pb-24">
      <div className="text-center">
        {/* Not `rm-mono`: that class lives in the roadmap stylesheet, which this page never loads. */}
        <p
          style={{ fontFamily: FONT_MONO }}
          className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.8px] text-neutral-400"
        >
          <FlaskConical size={13} aria-hidden="true" />
          Labs
        </p>
        <h1 className="mx-auto mt-3 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl">
          Ten rooms. Walk into any of them.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-neutral-300">
          Every field is practiced differently, so every room has its own workbench. Each lab is a short mission:
          debug it, build it, then judge code an AI wrote.
        </p>
      </div>

      {/* The corridor */}
      <div className="relative mt-12">
        <span
          aria-hidden="true"
          className="absolute top-4 bottom-0 left-6 w-0.5 rounded-full bg-linear-to-b from-purple-500/80 via-purple-500/40 to-purple-500/10 md:left-1/2 md:-translate-x-1/2"
        />
        <p className="relative z-10 mx-auto w-fit rounded-full border border-purple-500/40 bg-black px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-300 max-md:ml-0">
          Entrance
        </p>
        <ol className="relative mt-6" aria-label="Lab rooms">
          {ROOMS.map((room, i) => (
            <RoomDoor key={room.id} room={room} index={i} />
          ))}
        </ol>
      </div>

      {/* Contextual: the lab that matches where you are on your roadmap */}
      {next && (
        <div className="mt-14">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-400">Your next lab</h2>
          <LabCard lab={next.lab} highlight={next.reason} />
        </div>
      )}
    </section>
  );
}
