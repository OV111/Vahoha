import express from "express";
import request from "supertest";
import { describe, expect, it } from "vitest";
import { createGlobalIpLimiter } from "../../middleware/rateLimits.js";

const buildApp = (limit) => {
  const app = express();
  app.set("trust proxy", 1);
  app.use(createGlobalIpLimiter({ limit }));
  app.use((req, res) => res.json({ ok: true }));
  return app;
};

describe("global per-IP limiter", () => {
  it("refuses an IP once it passes the limit", async () => {
    const app = buildApp(3);
    for (let i = 0; i < 3; i++) await request(app).get("/blogs").expect(200);
    const res = await request(app).get("/blogs").expect(429);
    expect(res.body.code).toBe(429);
  });

  it("counts each client IP separately", async () => {
    const app = buildApp(1);
    await request(app).get("/x").set("X-Forwarded-For", "1.1.1.1").expect(200);
    await request(app).get("/x").set("X-Forwarded-For", "1.1.1.1").expect(429);
    await request(app).get("/x").set("X-Forwarded-For", "2.2.2.2").expect(200);
  });

  it("never counts preflights or the billing webhook", async () => {
    const app = buildApp(1);
    for (let i = 0; i < 3; i++) {
      await request(app).options("/api/exams").expect(200);
      await request(app).post("/api/billing/webhook").expect(200);
    }
    await request(app).get("/x").expect(200);
    await request(app).get("/x").expect(429);
  });
});
