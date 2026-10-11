/**
 * Blogs module: the only public entry point. Two routers because they mount
 * at different paths in app.js: blogRoutes at /blogs (CRUD, likes, comments,
 * favourites) and postRoutes at the root (category feeds, POST /blogs).
 */
export { default as blogRoutes } from "./routes/blogs.routes.js";
export { default as postRoutes } from "./routes/post.routes.js";
