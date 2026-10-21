/**
 * Library module: the only public entry point. app.js mounts this router.
 */
export { default } from "./routes/library.routes.js";
export { default as digestRoutes } from "./routes/digest.routes.js";
export { default as adminLibraryRoutes } from "./routes/admin.routes.js";
