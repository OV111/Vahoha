export default {
  slug: "lobby-rooms",
  trackId: "web-game",
  layerId: "web-game-8",
  type: "CODE",
  difficulty: "med",
  title: "A game lobby with ready checks and host migration",
  summary:
    "Track who joined, who is ready, who hosts, and when the match may start.",
  description:
    "Before a match begins, players gather in a lobby. The server must keep the player list, know who the host is, let the host start only when everyone is ready, and hand the host role to someone else if the host leaves.",
  task:
    "Write <code>createLobby(maxPlayers)</code> returning <code>{ join(id), leave(id), setReady(id, ready), start(requesterId), state() }</code>. <code>join</code> returns true when added and false if the lobby is full, the id is already in, or the match has started; the first player to join becomes host. <code>leave</code> returns true if the player was in the lobby; if the host leaves, the player who joined earliest among the rest becomes host (<code>null</code> if nobody is left). <code>setReady</code> returns false for an unknown id. <code>start(requesterId)</code> returns true only if the requester is the host, there are at least 2 players, every player is ready, and the match has not already started; it then marks the lobby started. <code>state()</code> returns <code>{ players: [{ id, ready }], host, started }</code> with players in join order.",
  constraints: [
    "New players start with <code>ready: false</code>.",
    "After <code>start</code> succeeds, <code>join</code> returns false, but <code>leave</code> still works.",
    "<code>state()</code> returns copies: changing the returned object must not affect the lobby.",
    "A player who leaves and joins again goes to the end of the join order and starts not ready.",
  ],
  example: `const lobby = createLobby(4);
lobby.join('ana');            // true, ana is host
lobby.join('ben');            // true
lobby.setReady('ana', true);
lobby.setReady('ben', true);
lobby.start('ben');           // false, only the host can start
lobby.start('ana');           // true`,
  tags: ["multiplayer","lobby","state-management"],
  estimatedMins: 30,
  xp: 45,
  starterFiles: [
    {
      name: "createLobby.js",
      lang: "js",
      code: `// createLobby.js
function createLobby(maxPlayers) {
  // your code here
}

module.exports = createLobby;`,
    },
  ],
  testFile: {
    name: "createLobby_test.js",
    lang: "test",
    code: `// createLobby_test.js
const createLobby = require('./createLobby');

test('first_player_becomes_host', () => {
  // see the hidden tests for the full checks
  expect(typeof createLobby).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Store players in an array in join order (objects with id and ready). Host is just the id of <code>players[0]</code> — if you derive it from the array you never have to patch it by hand when someone leaves.",
    },
    {
      order: 2,
      cost: 5,
      text: "Keep a <code>started</code> boolean. <code>join</code> must check full, duplicate and started; <code>start</code> must check host, size, everyone ready and not started.",
    },
    {
      order: 3,
      cost: 10,
      text: "<code>state()</code> should build a fresh object: <code>players.map(p =&gt; ({ ...p }))</code>.",
    },
  ],
  hiddenTests: [
    {
      name: "first_player_becomes_host",
      code: `const l = createLobby(3);
assert(l.join('ana') === true, 'first join should succeed');
l.join('ben');
const s = l.state();
assert(s.host === 'ana', 'ana joined first and must be host, got ' + s.host);
assert(s.players.length === 2 && s.players[0].id === 'ana' && s.players[1].ready === false, 'players should be in join order and start not ready');`,
    },
    {
      name: "rejects_duplicates_and_full_lobbies",
      code: `const l = createLobby(2);
l.join('a'); l.join('b');
assert(l.join('a') === false, 'joining twice must be rejected');
assert(l.join('c') === false, 'a full lobby must reject new players');
assert(l.state().players.length === 2, 'rejected joins must not add players');`,
    },
    {
      name: "host_migrates_to_the_earliest_remaining_player",
      code: `const l = createLobby(4);
l.join('a'); l.join('b'); l.join('c');
assert(l.leave('a') === true, 'leaving should return true');
assert(l.state().host === 'b', 'b joined before c, so b becomes host, got ' + l.state().host);
assert(l.leave('zzz') === false, 'leaving when not present returns false');
l.leave('b'); l.leave('c');
assert(l.state().host === null, 'an empty lobby has no host, got ' + l.state().host);`,
    },
    {
      name: "only_the_host_can_start_when_everyone_is_ready",
      code: `const l = createLobby(4);
l.join('a'); l.join('b');
assert(l.start('a') === false, 'cannot start when nobody is ready');
l.setReady('a', true);
assert(l.start('a') === false, 'cannot start while b is not ready');
l.setReady('b', true);
assert(l.start('b') === false, 'only the host may start');
assert(l.start('a') === true, 'host can start when everyone is ready');
assert(l.state().started === true, 'state.started must be true');
assert(l.start('a') === false, 'cannot start twice');`,
    },
    {
      name: "needs_at_least_two_players",
      code: `const l = createLobby(4);
l.join('solo');
l.setReady('solo', true);
assert(l.start('solo') === false, 'a single player cannot start a match');`,
    },
    {
      name: "after_start_no_one_can_join_but_leaving_works",
      code: `const l = createLobby(4);
l.join('a'); l.join('b');
l.setReady('a', true); l.setReady('b', true);
l.start('a');
assert(l.join('c') === false, 'joining after the start must be rejected');
assert(l.leave('b') === true, 'leaving after the start still works');
assert(l.setReady('ghost', true) === false, 'setReady for an unknown id returns false');`,
    },
    {
      name: "state_returns_copies_and_rejoin_goes_last",
      code: `const l = createLobby(4);
l.join('a'); l.join('b');
const s = l.state();
s.players.push({ id: 'hack', ready: true });
s.players[0].ready = true;
assert(l.state().players.length === 2 && l.state().players[0].ready === false, 'changing the returned state must not change the lobby');
l.setReady('a', true);
l.leave('a');
l.join('a');
const p = l.state().players;
assert(p[0].id === 'b' && p[1].id === 'a' && p[1].ready === false, 'a rejoining player goes last and starts not ready, got ' + JSON.stringify(p));`,
    },
  ],
  solution: {
    code: `function createLobby(maxPlayers) {
  let players = [];
  let started = false;

  const find = (id) => players.find((p) => p.id === id);

  function join(id) {
    if (started || players.length >= maxPlayers || find(id)) return false;
    players.push({ id, ready: false });
    return true;
  }

  function leave(id) {
    const before = players.length;
    players = players.filter((p) => p.id !== id);
    return players.length !== before;
  }

  function setReady(id, ready) {
    const p = find(id);
    if (!p) return false;
    p.ready = Boolean(ready);
    return true;
  }

  function start(requesterId) {
    if (started) return false;
    if (players.length < 2) return false;
    if (players[0].id !== requesterId) return false;
    if (!players.every((p) => p.ready)) return false;
    started = true;
    return true;
  }

  function state() {
    return {
      players: players.map((p) => ({ id: p.id, ready: p.ready })),
      host: players.length ? players[0].id : null,
      started,
    };
  }

  return { join, leave, setReady, start, state };
}

module.exports = createLobby;`,
    explanation:
      "The host rule 'the earliest remaining player' is exactly what the first element of a join-ordered array is, so the solution never stores a host at all: it derives it from players[0] when asked. That removes the whole class of bugs where the host field and the player list disagree after a leave. Rejoining naturally puts a player at the end, because leaving removes them and joining pushes. The start conditions are checked as a list of cheap early returns, each matching one sentence of the rules. state() builds fresh objects so callers cannot reach into the lobby's private array, which is what keeps a client or a bug elsewhere from changing the lobby without going through its methods.",
  },
};
