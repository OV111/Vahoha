import process from "node:process";

// Closed until HIRING_ENABLED=true, answering like an unknown route. Read per
// request: the env is loaded after modules are imported.
export const hiringOpen = (req, res, next) =>
  process.env.HIRING_ENABLED === "true" ? next() : res.status(404).json({ success: false, message: "Not found" });
