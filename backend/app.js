import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import process from "process";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

import authRoutes from "./modules/auth/index.js";
import { blogRoutes, postRoutes } from "./modules/blogs/index.js";
import profileRoutes from "./modules/profile/index.js";
import userRoutes from "./modules/users/index.js";
import searchRoutes from "./modules/search/index.js";
import accountRoutes from "./modules/account/index.js";
import systemMapRoutes, { commentRoutes, driftRoutes, understandingRoutes } from "./modules/system-map/index.js";
import libraryRoutes, { adminLibraryRoutes, digestRoutes } from "./modules/library/index.js";
import aiAgentRoutes from "./modules/ai-agent/index.js";
import roadmapRoutes from "./modules/roadmap/index.js";
import examRoutes from "./modules/exams/index.js";
import analyticsRoutes from "./modules/analytics/index.js";
import codingChallengeRoutes from "./modules/coding-challenges/index.js";
import billingRoutes, { handleBillingWebhook } from "./modules/billing/index.js";
import masteryRoutes from "./modules/mastery/index.js";
import contactRoutes from "./modules/contact/index.js";
import capstoneRoutes from "./modules/capstone/index.js";
import teamsRoutes from "./modules/teams/index.js";
import recruiterRoutes from "./modules/recruiter/index.js";
import readinessRoutes from "./modules/readiness/index.js";
import onboardingRoutes from "./modules/onboarding/index.js";
import { notFound } from "./middleware/notFound.js";
import { globalIpLimiter } from "./middleware/rateLimits.js";

/**
 * The one origin allowed to call the API from a browser. In production a missing
 * FRONTEND_URL must not turn into localhost (another site could then never be
 * told apart from a developer's machine), so there is no origin at all: false
 * switches CORS off, which is not the same as undefined (the cors package reads
 * undefined as "*").
 */
export const resolveCorsOrigin = (env = process.env) =>
  env.FRONTEND_URL || (env.NODE_ENV === "production" ? false : "http://localhost:5173");

export function createApp(db) {
  const app = express();

  app.locals.db = db;

  // Render puts exactly one proxy in front of the app. Trusting
  // that single hop makes req.ip the real client IP, so the rate limiters key
  // per user instead of lumping everyone under the proxy's IP. Don't use
  // `true`: that trusts any client-sent X-Forwarded-For, letting an attacker
  // spoof a fresh IP per request and walk straight past the limits.
  app.set("trust proxy", 1);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Security headers for everything below. Mounted after /api-docs on purpose:
  // helmet's default CSP blocks the inline scripts Swagger UI relies on.
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          scriptSrc: ["'self'", "https://*.posthog.com"],
          connectSrc: ["'self'", "https://*.posthog.com"],
          workerSrc: ["'self'", "blob:"],
        },
      },
    }),
  );

  const corsOrigin = resolveCorsOrigin();
  if (corsOrigin === false) console.error("FRONTEND_URL is not set: browser requests from other origins are blocked.");

  app.use(
    cors({
      origin: corsOrigin,
      methods: ["GET", "POST", "PUT", "PATCH", "OPTIONS", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }),
  );

  // Before body parsing, so a flood is refused before any JSON is read.
  app.use(globalIpLimiter);

  // Polar's webhook signature is computed over the exact request bytes, so this
  // route needs the body UNPARSED. It must be registered before express.json(),
  // which would consume the stream and leave only a parsed object behind.
  app.post(
    "/api/billing/webhook",
    express.raw({ type: "application/json" }),
    handleBillingWebhook,
  );

  app.use(express.json());
  app.use(cookieParser());

  app.use((req, res, next) => {
    const maintenance = process.env.MAINTENANCE_MODE === "true";
    if (maintenance) {
      return res.status(503).json({ message: "Server is under Maintenance" });
    }
    next();
  });

  app.use("/blogs", blogRoutes);
  app.use("/library", libraryRoutes);
  app.use("/api/library/admin", adminLibraryRoutes);
  app.use("/api/library", digestRoutes);

  app.use(authRoutes);
  app.use(postRoutes);
  app.use("/my-profile", profileRoutes);
  app.use(userRoutes);
  app.use("/search", searchRoutes);
  app.use(accountRoutes);
  app.use("/api/ai-agent", aiAgentRoutes);
  app.use("/api/roadmaps", roadmapRoutes);
  app.use("/api/exams", examRoutes);
  app.use("/api/challenges", codingChallengeRoutes);
  app.use("/api/billing", billingRoutes);
  app.use("/api/mastery", masteryRoutes);
  app.use("/api/contact", contactRoutes);
  app.use("/api/capstone", capstoneRoutes);
  app.use("/api/teams", teamsRoutes);
  app.use("/api/system-maps", systemMapRoutes);
  app.use("/api/system-maps", understandingRoutes);
  app.use("/api/system-maps", driftRoutes);
  app.use("/api/system-maps", commentRoutes);
  app.use("/api/recruiter", recruiterRoutes);
  app.use("/api/readiness", readinessRoutes);
  app.use("/api/onboarding", onboardingRoutes);
  app.use("/api/admin", analyticsRoutes);

  app.use(notFound)
  return app;
}
