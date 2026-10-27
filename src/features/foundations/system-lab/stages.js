// System-lab stages: plain data (no JSX), so a stage can be read in Node.
// Shape: { id, title, topic, brief, predict, starter, canvas }
//   - predict: asked before the first Run, so the learner commits to a guess
//   - canvas.fixed: wires the learner cannot change; canvas.wire is the one they must draw

export const STAGES = {
  "url-shortener-1": {
    id: "url-shortener-1",
    title: "Restart loses your links",
    topic: "How computers work",
    brief: [
      "This server shortens URLs. It works, and the links live in a plain object in the server's memory.",
      "The lab sends two links, restarts the server (as a deploy or a crash would), then asks for the old links back and adds a third.",
    ],
    predict: {
      q: "After the restart, what will resolve(codeOfLinkA) return?",
      options: ["The original link", "undefined", "An error"],
      answer: 1,
      why: "A process's memory lives only as long as the process. A restart starts a new one with an empty object.",
    },
    starter: `// Runs once each time the server starts.
// disk keeps data across restarts: disk.get(key) and disk.set(key, value).
// It only works if Server is wired to Disk on the canvas.
const links = {};
let next = 0;

function shorten(url) {
  const code = (next++).toString(36);
  links[code] = url;
  return code;
}

function resolve(code) {
  return links[code];
}

return { shorten, resolve };
`,
    canvas: {
      nodes: [
        { id: "client", kind: "client", title: "Client", sub: "sends requests", position: { x: 0, y: 70 } },
        { id: "server", kind: "server", title: "Server", sub: "your code", position: { x: 270, y: 70 } },
        { id: "memory", kind: "memory", title: "Memory", sub: "dies with the process", position: { x: 270, y: 250 } },
        { id: "disk", kind: "disk", title: "Disk", sub: "survives restarts", position: { x: 540, y: 70 } },
      ],
      fixed: [
        { id: "client-server", source: "client", target: "server" },
        { id: "server-memory", source: "server", target: "memory" },
      ],
      wire: { id: "server-disk", source: "server", target: "disk" },
    },
  },
};
