export default {
  minutes: 12,
  whatItIs: [
    "A computer runs your program by having the CPU execute machine instructions, one after another, on data held in memory. Everything else (variables, functions, objects) is a convenience your language builds on top of that loop.",
    "When you start a program, the operating system creates a process: a private slice of memory plus at least one thread of execution. The thread works through your code, and each function call pushes a frame onto the call stack. Data that must outlive a single call goes on the heap.",
  ],
  whyNow:
    "Model calls are memory- and compute-hungry work running on someone's hardware. Knowing what the CPU, RAM and network are doing lets you explain why a request is slow, why a server ran out of memory, or why the same loop is fine for 100 items and painful for 10 million. AI can write the loop. You still need to predict what it costs.",
  keyIdeas: [
    {
      term: "CPU and instructions",
      explain:
        "The CPU fetches an instruction, decodes it and executes it, billions of times per second. Multiple cores let it run several instruction streams at once.",
    },
    {
      term: "Memory hierarchy",
      explain:
        "Registers and CPU caches are tiny and very fast, RAM is larger and slower, disk and network are far slower again. Code that keeps its data close (and accessed in order) runs faster.",
    },
    {
      term: "Process vs thread",
      explain:
        "A process owns its memory and resources. Threads are paths of execution inside a process and share its memory, which is why they can race with each other.",
    },
    {
      term: "Call stack",
      explain:
        "Each function call adds a frame holding its local variables and return address; returning pops it. Recursing without a base case fills the stack and you get a stack overflow.",
    },
    {
      term: "Heap",
      explain:
        "Memory for data whose size or lifetime isn't known up front. In JavaScript, Python and Java a garbage collector frees heap objects that nothing references anymore.",
    },
  ],
  tryIt: [
    {
      type: "observe",
      title: "Look at the processes running on your machine",
      steps: [
        "Open your process viewer and look at the list. Each row is one process: a program the operating system is running, with its own memory.",
        "Find the PID column and a memory column. Find the terminal or browser you are using right now.",
        "Count how many processes are running compared to the number of apps you opened yourself.",
        "In the terminal, press q to quit top.",
      ],
      command: "top",
      windows: "Open Task Manager (Ctrl+Shift+Esc) and use the Processes tab, or run tasklist in PowerShell.",
      expect: "Far more processes than apps you opened, each with its own PID and memory figure. Most of them are the operating system and background services.",
    },
    {
      type: "predict",
      title: "Run out of call stack on purpose",
      steps: [
        "Open your browser's DevTools console (F12, or Cmd+Option+J on a Mac).",
        "Guess what the snippet below does, then pick an option.",
        "Paste the snippet into the console and press Enter to check your guess. It is safe: the browser stops it and your computer is fine.",
        "Run it again and compare the number. It is not the same on every browser or machine.",
      ],
      command: "(() => { let d = 0; const f = () => { d++; f(); }; try { f(); } catch (e) { console.log(d, e.name); } })();",
      predict: {
        options: [
          "It runs forever",
          "It freezes the whole computer",
          "It stops with an error after some thousands of calls",
          "It returns normally",
        ],
        answer: "It stops with an error after some thousands of calls",
        why: "Every call adds a frame to the call stack, and the stack has a fixed size. The engine throws an error when it is full, long before the machine runs out of memory. Chrome reports RangeError; Firefox reports InternalError.",
      },
      expect: "One line with a number (how many calls fit) and the error name. The exact number depends on the browser and the machine.",
    },
  ],
  checkYourself: [
    {
      q: "Predict, then check in the console: will a loop that counts to 1,000,000 crash the way the recursive function did? Run (() => { let n = 0; while (n < 1000000) n++; console.log(n); })(); to find out.",
      a: "No, it prints 1000000. A loop reuses the same stack frame on every pass, so stack usage stays constant, while each recursive call adds a new frame.",
    },
    {
      q: "Two threads in one process increment the same counter 1,000 times each. Why might the result be less than 2,000?",
      a: "Threads share memory. Incrementing is a read, an add and a write; if both threads read the same old value before either writes, one update is lost. That is a race condition.",
    },
    {
      q: "Your server leaks memory slowly in a garbage-collected language. How is that possible?",
      a: "The collector only frees objects nothing references. A cache, global list or event listener that keeps growing holds references forever, so that memory is never reclaimed.",
    },
  ],
  explainBack: {
    prompt: "In your own words: what happens in memory when a function keeps calling itself with no stopping condition, and why does a loop doing the same amount of work not cause the same problem?",
    modelAnswer: "Each call pushes a new frame (its local variables and a return address) onto the call stack, which has a fixed size. With no stopping condition the stack fills up and the program fails with a stack overflow. A loop runs in a single frame and reuses it on every pass, so its stack usage never grows.",
  },
  practice: {
    challenges: [{ slug: "fix-long-running-memory-leak", title: "Fix a long-running memory leak" }],
  },
};
