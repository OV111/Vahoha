/**
 * Capstone brief — lua track (languages), v1.
 *
 * Drafted by Claude, 2026-10-21; NOT yet reviewed by a human.
 * The seeder refuses to publish a brief whose `reviewed` flag is false.
 *
 * Shape notes: see go.js. Rubric weights sum to 100; layerId maps to this track's roadmap layers.
 */

import { DEFAULT_PASS_THRESHOLDS } from "../../../modules/capstone/lib/constants.js";
import { CHECKS, COMMON_RULES } from "../shared.js";

export default {
  trackId: "lua",
  categoryId: "languages",
  slug: "lua-api-gateway-rate-limiter",
  version: 1,
  status: "draft",
  reviewed: false,
  title: "OpenResty API Gateway with Rate Limiting and a Reusable Lua Library",
  summary:
    "Build a small API gateway on OpenResty (Nginx + LuaJIT). It routes requests to an upstream, enforces a " +
    "token-bucket rate limit with shared memory, and ships its core logic as a tested LuaRocks module " +
    "built with metatable-based OOP and coroutine-based helpers.",
  stack: ["Lua 5.1/LuaJIT", "OpenResty", "LuaRocks", "Busted", "Docker"],

  requirements: [
    {
      id: "rockspec",
      text: "A valid .rockspec file describes the library module so it can be installed with luarocks.",
      check: { type: "file", glob: "*.rockspec" },
    },
    {
      id: "module-layout",
      text: "Logic is split into require-able modules (for example lib/ratelimit.lua, lib/router.lua) with no accidental globals.",
      check: { type: "file", glob: "**/*.lua" },
    },
    {
      id: "oop-metatables",
      text: "A class hierarchy (for example a Limiter base with TokenBucket and FixedWindow subclasses) is built with metatables and __index.",
    },
    {
      id: "closures-iterators",
      text: "Configuration or route matching uses closures and a custom iterator (for example iterating matched routes in priority order).",
    },
    {
      id: "coroutines",
      text: "A coroutine-based component (for example a log-flushing producer/consumer) uses coroutine.wrap or ngx.thread correctly.",
    },
    {
      id: "nginx-conf",
      text: "nginx.conf uses access_by_lua_block or an equivalent phase handler and lua_shared_dict for counters, and returns 429 with a Retry-After header when limited.",
      check: { type: "file", glob: "**/*.conf" },
    },
    {
      id: "error-handling",
      text: "Failures use pcall/xpcall and error objects with context; upstream failures return a clean JSON error, never a Lua stack trace.",
    },
    {
      id: "tests",
      text: "Busted specs cover the limiter and router logic, including time-dependent behaviour with an injectable clock.",
      check: { type: "file", glob: "{spec,tests,test}/**/*.lua" },
    },
    {
      id: "docker",
      text: "A Dockerfile (based on an OpenResty image) and a compose file start the gateway plus a sample upstream.",
      check: CHECKS.dockerfile,
    },
    {
      id: "readme",
      text: "README covers architecture, config options, the algorithm used, and a curl demo of the 429 behaviour.",
      check: CHECKS.readme,
    },
    {
      id: "ci",
      text: "GitHub Actions installs dependencies, runs luacheck and busted on every push.",
      check: CHECKS.ci,
    },
  ],

  rubric: [
    { id: "tables-closures", name: "Tables, closures, iterators", weight: 15, layerId: "lua-3", description: "Idiomatic use of tables and closures; no global leaks." },
    { id: "metatables", name: "Metatables & OOP", weight: 20, layerId: "lua-4", description: "Clean inheritance via __index, readable constructors, sensible __tostring/__eq usage." },
    { id: "coroutines", name: "Coroutines", weight: 10, layerId: "lua-5", description: "Correct yield/resume flow and error propagation through coroutines." },
    { id: "modules", name: "Modules & packaging", weight: 15, layerId: "lua-6", description: "Proper require structure, rockspec and no package.path hacks." },
    { id: "stdlib", name: "Standard library & patterns", weight: 10, layerId: "lua-7", description: "Effective use of string patterns, os/io and table functions." },
    { id: "performance", name: "LuaJIT-aware performance", weight: 10, layerId: "lua-9", description: "Avoids slow patterns on hot paths (table churn, string concatenation in loops) and documents any measurement." },
    { id: "production", name: "OpenResty, testing & deploy", weight: 20, layerId: "lua-10", description: "Working gateway, Busted tests, luacheck and a Docker setup." },
  ],

  twistPool: [
    { id: "redis-backed", text: "Add a Redis-backed limiter using lua-resty-redis so limits hold across multiple gateway instances." },
    { id: "ffi", text: "Use the LuaJIT FFI for one small native call (for example a hash or time function) and benchmark it against a pure Lua version." },
    { id: "plugin-system", text: "Add a plugin chain where each plugin is a module with access/header_filter hooks, loaded from config." },
    { id: "hot-reload", text: "Support reloading route config without dropping in-flight requests, and test it." },
  ],

  rules: COMMON_RULES,
  passThresholds: DEFAULT_PASS_THRESHOLDS,
};
