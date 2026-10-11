/**
 * Users module: the only public entry point. app.js mounts the router; other
 * modules (profile, chat) use the follow helpers below.
 */
export { default } from "./routes/user.routes.js";
export * from "./services/followService.js";
