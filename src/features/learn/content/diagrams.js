// The pictures lessons use, as data drawn by components/player/LessonDiagram.jsx.
// box: [x, y, width, height, text, tone?]   tone: "hot" (the thing to look at) | "scope" (a container)
// wire: SVG path data, drawn under the boxes with an arrowhead at its end
// note: [x, y, text]
const rows = [44, 92, 140];

export const DIAGRAMS = {
  "lexical-scope": {
    size: [540, 190],
    alt: "sayHi is written in the global scope next to greeting hi, so it finds that one, not the greeting hello inside run.",
    boxes: [
      [4, 34, 250, 148, "", "scope"],
      [24, 58, 210, 40, 'greeting = "hi"', "hot"],
      [24, 122, 210, 40, "sayHi()"],
      [300, 34, 236, 148, "", "scope"],
      [320, 58, 196, 40, 'greeting = "hello"'],
      [320, 122, 196, 40, "calls sayHi()"],
    ],
    wires: ["M129 122 V100"],
    notes: [[4, 22, "Written here: looks here"], [300, 22, "Called from run: not searched"]],
  },
  "scope-chain": {
    size: [540, 200],
    alt: "Three nested scopes. inner looks in itself, then outer, then global.",
    boxes: [
      [4, 28, 532, 168, "", "scope"],
      [180, 62, 340, 118, "", "scope"],
      [350, 98, 154, 64, "c", "hot"],
      [28, 110, 120, 42, "a"],
      [204, 110, 112, 42, "b"],
    ],
    wires: ["M350 131 H318", "M204 131 H150"],
    notes: [[16, 18, "global"], [192, 54, "outer"], [362, 90, "inner starts here"]],
  },
  counters: {
    size: [540, 150],
    alt: "Counter a keeps its own count of 2. Counter b keeps a separate count of 1.",
    boxes: [
      [4, 34, 96, 44, "a()"],
      [160, 34, 110, 44, "count = 2", "hot"],
      [300, 34, 96, 44, "b()"],
      [430, 34, 106, 44, "count = 1", "hot"],
    ],
    wires: ["M100 56 H158", "M396 56 H428"],
    notes: [[4, 20, "First makeCounter call"], [300, 20, "Second call, new count"], [4, 120, "makeCounter has returned, but each count stays alive."]],
  },
  "live-link": {
    size: [540, 130],
    alt: "hello points to the variable name. The variable changed from Ada to Grace, so hello prints Grace.",
    boxes: [
      [4, 44, 120, 46, "hello()"],
      [220, 44, 150, 46, "name", "hot"],
      [420, 10, 116, 42, '"Ada"'],
      [420, 80, 116, 42, '"Grace"', "hot"],
    ],
    wires: ["M124 67 H218", "M370 67 C398 67 394 101 418 101"],
    notes: [[4, 28, "keeps the variable"], [220, 28, "was Ada, now Grace"]],
  },
  "loop-bindings": {
    size: [540, 184],
    alt: "With var, three functions point to one shared i, which is 3. With let, each function has its own j: 0, 1 and 2.",
    boxes: [
      ...rows.flatMap((y, i) => [
        [4, y, 70, 36, `fn ${i}`],
        [294, y, 70, 36, `fn ${i}`],
        [440, y, 96, 36, `j = ${i}`, "hot"],
      ]),
      [152, 90, 96, 40, "i = 3", "hot"],
    ],
    wires: ["M74 62 L150 102", "M74 110 H150", "M74 158 L150 118", ...rows.map((y) => `M364 ${y + 18} H438`)],
    notes: [[4, 24, "var: one shared variable"], [294, 24, "let: one each"]],
  },
  "call-stack": {
    size: [540, 170],
    alt: "The stack over time: a, then a with b on top, then a again, then empty.",
    boxes: [
      [4, 100, 100, 42, "a"],
      [150, 100, 100, 42, "a"],
      [150, 52, 100, 42, "b", "hot"],
      [296, 100, 100, 42, "a"],
      [436, 100, 100, 42, "empty"],
    ],
    wires: ["M104 121 H148", "M250 121 H294", "M396 121 H434"],
    notes: [[4, 162, "call a"], [150, 162, "a calls b"], [296, 162, "b returns"], [436, 162, "a returns"]],
  },
  waiting: {
    size: [540, 126],
    alt: "The stack hands the timer to the host. When it ends, the callback waits in the queue and returns to the stack when it is empty.",
    boxes: [
      [4, 34, 130, 46, "call stack"],
      [200, 34, 130, 46, "host waits", "hot"],
      [396, 34, 140, 46, "queue"],
    ],
    wires: ["M134 57 H198", "M330 57 H394", "M466 80 V106 H69 V82"],
    notes: [[4, 20, "setTimeout"], [396, 20, "timer is done"], [176, 124, "when the stack is empty"]],
  },
  "two-queues": {
    size: [540, 150],
    alt: "Microtasks such as then and await go first. Tasks such as timers and clicks go after.",
    boxes: [
      [4, 34, 120, 42, ".then", "hot"],
      [136, 34, 120, 42, "await", "hot"],
      [4, 104, 120, 42, "setTimeout"],
      [136, 104, 120, 42, "click"],
      [410, 68, 126, 46, "call stack"],
    ],
    wires: ["M256 55 H330 C360 55 372 84 408 86", "M256 125 H330 C360 125 372 98 408 96"],
    notes: [[4, 22, "Microtask queue: first"], [4, 96, "Task queue: after"]],
  },
  "event-loop": {
    size: [540, 106],
    alt: "The event loop runs one task, then every microtask, then repaints if it is time, then repeats.",
    boxes: [
      [4, 10, 140, 46, "one task"],
      [196, 10, 150, 46, "ALL microtasks", "hot"],
      [398, 10, 138, 46, "repaint"],
    ],
    wires: ["M144 33 H194", "M346 33 H396", "M467 56 V90 H74 V58"],
    notes: [[248, 82, "repeat"]],
  },
  "await-pause": {
    size: [540, 120],
    alt: "load runs until await, the caller continues, then the rest of load runs as a microtask.",
    boxes: [
      [4, 34, 150, 46, "load starts"],
      [196, 34, 150, 46, "caller goes on", "hot"],
      [388, 34, 148, 46, "load finishes"],
    ],
    wires: ["M154 57 H194", "M346 57 H386"],
    notes: [[4, 20, "up to await"], [196, 20, "not blocked"], [388, 20, "as a microtask"]],
  },
  blocked: {
    size: [540, 116],
    alt: "A 500 millisecond loop holds the stack, so the timer due at 0 waits until it ends.",
    boxes: [
      [4, 34, 380, 46, "busy loop, 500 ms", "hot"],
      [424, 34, 112, 46, "timer"],
    ],
    wires: ["M384 57 H422"],
    notes: [[4, 20, "timer is due here, at 0 ms"], [424, 20, "runs here"], [4, 106, "Clicks and rendering wait too."]],
  },
};
