import { isDown } from "../../../../constants/isoShapes";
import { isUnconfirmed } from "./mapGraph";

// Plays a few requests through the map by what each kind of part really does:
// a balancer picks one server, a cache hit skips the database, a queue answers
// at once and its jobs wait for a free worker. The result is a fixed timeline
// (no randomness), so both views show the same story and it loops cleanly.
// Pure, so it can be tested without React.

const PICK_ONE = new Set(["loadbalancer", "cluster"]);
const CALLERS = new Set(["client", "mobile"]);
const ONE_TARGET = new Set([...CALLERS, "gateway"]); // each request goes to one of the services behind it
const CHECKS = new Set(["auth", "secrets", "firewall", "ratelimiter"]);
const LOOKUPS = new Set(["dns", "registry"]);
const FAST = new Set(["cache", "memory", "cdn"]);
const HOLDS_JOBS = new Set(["queue", "eventbus"]);
const DATA = new Set(["database", "primary", "replica", "shard", "backup", "storage", "disk", "featurestore", "search", "vectordb", "warehouse"]);
const FORWARD = new Set(["datasource", "pipeline", "migration", "cicd", "scheduler"]); // hand work on, nobody waits for an answer
// Never start a request themselves, even when no wire points at them.
const PASSIVE = new Set([...DATA, ...FAST, ...CHECKS, ...HOLDS_JOBS, "registry", "monitoring", "model", "evaluation", "external"]);

const ROUND_TYPES = ["read", "read", "write"]; // the first read misses the cache, the second hits, the write clears it
const ROUNDS = 7;
const LIMITED_ROUND = 7; // an extra round the rate limiter turns away, on maps that have one
const BLOCKED_ROUND = 6; // the firewall turns this one away; last, so it does not shift whose turn it is at a balancer
const JOB_HOPS = 7; // a worker is slower than the requests, so a queue's jobs build up
const REST = 1; // pause between requests, and before the loop restarts

/**
 * @returns {{ moves: object[], length: number, used: Set<string>, types: Set<string> }}
 * Times are in hops. A move is one dot crossing one wire:
 * { edge, start, type, back (against the arrow), lane (dots sharing a wire at once) }.
 */
export function simulate(nodes, edges) {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const wires = edges.filter((e) => !isUnconfirmed(e) && e.source !== e.target && byId.has(e.source) && byId.has(e.target));
  const kind = (id) => byId.get(id).data.kind;
  const down = (id) => isDown(byId.get(id));
  const outs = new Map(nodes.map((n) => [n.id, []]));
  const ins = new Map(nodes.map((n) => [n.id, []]));
  for (const e of wires) {
    outs.get(e.source).push(e);
    // Monitoring reading a part is not a request to it.
    if (kind(e.source) !== "monitoring") ins.get(e.target).push(e);
  }

  // People draw a worker either way: queue -> worker, or worker -> queue because it pulls.
  const pulls = new Set(
    wires
      .filter(
        (e) =>
          HOLDS_JOBS.has(kind(e.target)) &&
          kind(e.source) === "worker" &&
          !outs.get(e.target).some((o) => kind(o.target) === "worker") &&
          ins.get(e.target).some((i) => kind(i.source) !== "worker"),
      )
      .map((e) => e.id),
  );

  const moves = [];
  const turns = new Map(); // key -> how many times it has picked a target
  const warm = new Set(); // caches holding the answer
  const busyUntil = new Map(); // worker id -> when it is free again

  const move = (edge, start, type, back = false) => {
    moves.push({ edge: edge.id, start, type, back });
    return start + 1;
  };

  const turn = (key, list) => {
    const n = turns.get(key) ?? 0;
    turns.set(key, n + 1);
    return list[n % list.length];
  };

  // Monitoring wires are no part of the request: see watch().
  const openWires = (id, ctx) => outs.get(id).filter((e) => !ctx.seen.has(e.id) && !pulls.has(e.id) && kind(e.target) !== "monitoring");

  // A request over one wire and the answer back. ctx.seen holds the wires this
  // request has crossed, so a loop in the map cannot trap it.
  function call(edge, at, ctx, type) {
    ctx.seen.add(edge.id);
    const there = move(edge, at, type);
    const id = edge.target;
    const done = down(id) ? { at: there, result: "fail" } : arrive(id, there, ctx);
    const at2 = move(edge, done.at, done.result, true);
    // The connection stays open, so the server can speak first.
    if (kind(id) === "websocket" && CALLERS.has(kind(edge.source)) && done.result === "ok") move(edge, at2, "push", true);
    return { at: at2, result: done.result };
  }

  // What a part reports to monitoring once it is done, whichever way the wire is drawn.
  function watch(id, at, result) {
    for (const e of wires) {
      const pushes = e.source === id && kind(e.target) === "monitoring";
      const scrapes = e.target === id && kind(e.source) === "monitoring" && kind(id) !== "external";
      if (!pushes && !scrapes) continue;
      const there = move(e, at, "metric", scrapes);
      if (result !== "fail") continue;
      const monitor = pushes ? e.target : e.source;
      for (const alert of outs.get(monitor)) if (kind(alert.target) === "external") move(alert, there, "fail");
    }
  }

  // Work handed on with nobody waiting for it.
  function hand(edge, at, ctx, type) {
    ctx.seen.add(edge.id);
    const there = move(edge, at, type);
    if (down(edge.target)) return there;
    // A scheduler starts the work itself; the other hand-overs only move data along.
    return kind(edge.source) === "scheduler" && !FORWARD.has(kind(edge.target)) ? arrive(edge.target, there, ctx).at : pass(edge.target, there, ctx);
  }

  function pass(id, at, ctx) {
    if (HOLDS_JOBS.has(kind(id))) {
      deliver(id, at, ctx);
      return at;
    }
    let end = at;
    for (const e of openWires(id, ctx)) {
      // An earlier branch of the same work may have crossed this wire already.
      if (!ctx.seen.has(e.id)) end = Math.max(end, hand(e, at, ctx, "job"));
    }
    return end;
  }

  function deliver(id, at, ctx) {
    const consumers = [
      ...openWires(id, ctx).map((e) => ({ edge: e, to: e.target, back: false })),
      ...ins
        .get(id)
        .filter((e) => pulls.has(e.id) && !ctx.seen.has(e.id))
        .map((e) => ({ edge: e, to: e.source, back: true })),
    ].filter((c) => !down(c.to));
    if (!consumers.length) return;
    if (kind(id) === "eventbus") {
      // Every reader gets its own copy of the event.
      for (const c of consumers) {
        const there = move(c.edge, at, "event", c.back);
        if (DATA.has(kind(c.to)) || kind(c.to) === "external") continue;
        arrive(c.to, there, { ...ctx, type: "write", event: true, seen: new Set([...ctx.seen, c.edge.id]) });
      }
      return;
    }
    // The worker that is free first takes the job; equally free ones take turns.
    const freeAt = (c) => Math.max(busyUntil.get(c.to) ?? 0, at);
    const start = Math.min(...consumers.map(freeAt));
    const c = turn(
      id,
      consumers.filter((x) => freeAt(x) === start),
    );
    const there = move(c.edge, start, "job", c.back);
    const job = arrive(c.to, there, { ...ctx, type: "write", seen: new Set([...ctx.seen, c.edge.id]) });
    busyUntil.set(c.to, Math.max(job.at, start + JOB_HOPS));
  }

  function arrive(id, at, ctx) {
    const answer = handle(id, at, ctx);
    watch(id, answer.at, answer.result);
    return answer;
  }

  function handle(id, at, ctx) {
    const k = kind(id);
    const open = openWires(id, ctx);

    if (HOLDS_JOBS.has(k)) {
      deliver(id, at, ctx);
      return { at, result: "ok" };
    }
    if ((k === "firewall" && ctx.blocked) || (k === "ratelimiter" && ctx.limited)) return { at, result: "fail" };
    // News for the people connected: sent down their open connections.
    if (k === "websocket" && ctx.event) {
      for (const e of ins.get(id)) if (CALLERS.has(kind(e.source))) move(e, at, "push", true);
      return { at, result: "ok" };
    }
    if (FORWARD.has(k)) {
      pass(id, at, ctx);
      return { at, result: "ok" };
    }
    if (DATA.has(k)) {
      // Copies travel after the write is saved, and only writes make them.
      for (const e of ctx.type === "write" ? open : []) {
        if (DATA.has(kind(e.target))) hand(e, at, ctx, "copy");
      }
      return { at, result: "ok" };
    }
    if (FAST.has(k) && ctx.type === "read" && warm.has(id)) return { at, result: "ok" };
    if (PICK_ONE.has(k) && open.length) {
      const up = open.filter((e) => !down(e.target));
      const e = turn(id, up.length ? up : open);
      return call(e, at, ctx, ctx.type);
    }

    const answer = work(id, open, at, ctx);
    if (FAST.has(k) && ctx.type === "write") warm.delete(id);
    if (FAST.has(k) && ctx.type === "read" && answer.result === "ok") {
      warm.add(id);
      // Nothing behind it to ask: whoever called has to fetch the data.
      if (!open.length) return { at: answer.at, result: "miss" };
    }
    return answer;
  }

  // A part that runs code: checks first, then the cache, then everything else at once.
  function work(id, open, at, ctx) {
    const within = (set) => open.filter((e) => set.has(kind(e.target)));
    const lookups = within(LOOKUPS);
    // A caller asks its CDN only for files, next to the API it also calls.
    const edges = CALLERS.has(kind(id)) ? open.filter((e) => kind(e.target) === "cdn") : [];
    const beside = edges.length > 0 && open.some((e) => !FAST.has(kind(e.target)) && !LOOKUPS.has(kind(e.target)) && !CHECKS.has(kind(e.target)));
    const caches = within(FAST).filter((e) => kind(e.target) !== "cdn" || (beside && ctx.type === "read"));
    let now = at;

    for (const e of [...within(CHECKS), ...lookups]) {
      const isCheckOnly = CHECKS.has(kind(e.target)) && kind(e.target) !== "firewall" && !outs.get(e.target).length;
      const isLookup = LOOKUPS.has(kind(e.target)) && !outs.get(e.target).length;
      const answer = call(e, now, ctx, isCheckOnly ? "check" : isLookup ? "lookup" : ctx.type);
      now = answer.at;
      if (answer.result === "fail") return { at: now, result: "fail" };
    }

    let hit = false;
    for (const e of ctx.type === "read" ? caches : []) {
      const answer = call(e, now, ctx, "read");
      now = answer.at;
      if (answer.result === "ok" && kind(e.target) !== "cdn") hit = true; // a cache that is down only counts as a miss
    }

    const rest = open.filter((e) => !CHECKS.has(kind(e.target)) && !caches.includes(e) && !lookups.includes(e) && !(beside && edges.includes(e)) && !ctx.seen.has(e.id));
    const stores = rest.filter((e) => DATA.has(kind(e.target)));
    let others = rest.filter((e) => !DATA.has(kind(e.target)));
    if (ONE_TARGET.has(kind(id)) && others.length > 1) others = [turn(id, others)];

    let end = now;
    let failed = false;
    for (const e of [...others, ...(hit ? [] : pickStores(id, stores, ctx))]) {
      if (ctx.seen.has(e.id)) continue;
      const to = kind(e.target);
      const type = to === "eventbus" ? "event" : to === "queue" || FORWARD.has(to) ? "job" : ctx.type;
      const answer = call(e, now, ctx, type);
      end = Math.max(end, answer.at);
      if (answer.result === "fail") failed = true;
    }
    for (const e of ctx.type === "write" ? caches : []) {
      if (down(e.target) || ctx.seen.has(e.id)) continue;
      ctx.seen.add(e.id);
      move(e, end, "write");
      warm.delete(e.target);
    }
    return { at: end, result: failed ? "fail" : "ok" };
  }

  // Which stores one request touches: reads go to a replica when there is one,
  // writes to the primary, and a record lives on one shard.
  function pickStores(id, stores, ctx) {
    const of = (...kinds) => stores.filter((e) => kinds.includes(kind(e.target)));
    const replicas = of("replica").filter((e) => !down(e.target));
    const shards = of("shard");
    const picked = of("storage", "disk", "featurestore", "search", "vectordb", "warehouse");
    if (ctx.type === "read" && replicas.length) picked.push(turn(`${id}:replica`, replicas));
    else picked.push(...of("primary", "database"));
    if (shards.length) picked.push(turn(`${id}:shard`, shards));
    if (ctx.type === "write") picked.push(...of("backup"));
    return picked;
  }

  const canSend = (n) => !down(n.id) && outs.get(n.id).some((e) => !pulls.has(e.id));
  const starts = nodes.filter((n) => canSend(n) && !ins.get(n.id).length && !outs.get(n.id).some((e) => pulls.has(e.id)));
  const feeders = starts.filter((n) => FORWARD.has(n.data.kind));
  let callers = starts.filter((n) => !PASSIVE.has(n.data.kind) && !FORWARD.has(n.data.kind));
  if (!callers.length && !feeders.length) {
    // One big loop, or only passive parts at the edge: start from whoever can ask.
    const able = nodes.filter((n) => canSend(n) && !PASSIVE.has(n.data.kind));
    callers = able.filter((n) => ["client", "mobile", "entry"].includes(n.data.kind));
    if (!callers.length) callers = able.slice(0, 1);
  }

  let now = 0;
  const rounds = callers.length || feeders.length ? Math.max(ROUNDS + (nodes.some((n) => n.data.kind === "ratelimiter") ? 1 : 0), callers.length, feeders.length) : 0;
  for (let round = 0; round < rounds; round += 1) {
    let end = now;
    if (callers.length) {
      const type = ROUND_TYPES[round % ROUND_TYPES.length];
      end = arrive(callers[round % callers.length].id, now, { type, seen: new Set(), blocked: round === BLOCKED_ROUND, limited: round === LIMITED_ROUND }).at;
    }
    if (feeders.length) end = Math.max(end, pass(feeders[round % feeders.length].id, now, { type: "write", seen: new Set() }));
    now = end + REST;
  }

  moves.sort((a, b) => a.start - b.start);
  assignLanes(moves);
  const length = moves.reduce((max, m) => Math.max(max, m.start + 1 + REST), now);
  return { moves, length, used: new Set(moves.map((m) => m.edge)), types: new Set(moves.map((m) => m.type)) };
}

// Dots on the same wire at the same time each get their own circle.
function assignLanes(moves) {
  const ends = new Map();
  for (const m of moves) {
    const lanes = ends.get(m.edge) ?? [];
    ends.set(m.edge, lanes);
    let lane = lanes.findIndex((end) => end <= m.start);
    if (lane < 0) lane = lanes.length;
    lanes[lane] = m.start + 1;
    m.lane = lane;
  }
}

/** Wire id -> how many circles it needs. */
export function laneCounts(moves) {
  const counts = new Map();
  for (const m of moves) counts.set(m.edge, Math.max(counts.get(m.edge) ?? 0, m.lane + 1));
  return counts;
}
