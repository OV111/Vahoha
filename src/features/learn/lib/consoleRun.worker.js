// One throwaway worker per run, so a runaway loop in a lesson snippet can't
// freeze the page. useConsoleRunner owns the hard kill.
import { runConsole } from "./consoleRun.js";

self.addEventListener("message", async (event) => {
  const { lines } = await runConsole(event.data?.source ?? "");
  self.postMessage({ lines });
});
