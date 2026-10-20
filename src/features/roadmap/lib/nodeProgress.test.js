import { describe, it, expect } from "vitest";
import { statusOf, effectiveStatuses, summarize, parentStatus, layerNodeProgress, layerView } from "./nodeProgress";

const empty = summarize([]);

describe("statusOf / effectiveStatuses", () => {
  const layer = { sideLeft: [{ title: "Basics", children: [{ title: "Intro" }, { title: "Types" }] }] };

  it("treats a lesson with no recorded status as not started", () => {
    expect(statusOf({}, "x")).toBe("not_started");
    expect(statusOf({ x: "done" }, "x")).toBe("done");
  });

  it("shows recorded progress as-is while the layer test isn't passed", () => {
    const recorded = { intro: "in_progress" };
    expect(effectiveStatuses(layer, "up-next", recorded)).toBe(recorded);
  });

  it("counts every lesson as done once the layer test is passed", () => {
    expect(effectiveStatuses(layer, "done", { intro: "in_progress" })).toEqual({ intro: "done", types: "done" });
  });
});

describe("summarize", () => {
  it("counts each status and treats done + skipped as completed", () => {
    const s = summarize(["done", "skipped", "in_progress", "not_started"]);
    expect(s).toEqual({ total: 4, done: 1, skipped: 1, inProgress: 1, completed: 2, percent: 50 });
  });

  it("is 0% for an empty list, not NaN", () => {
    expect(empty.percent).toBe(0);
  });

  it("rounds the percentage", () => {
    expect(summarize(["done", "not_started", "not_started"]).percent).toBe(33);
  });
});

describe("parentStatus", () => {
  it("is not started when nothing is touched", () => {
    expect(parentStatus(["not_started", "not_started"])).toBe("not_started");
    expect(parentStatus([])).toBe("not_started");
  });

  it("is in progress as soon as one leaf is started or finished", () => {
    expect(parentStatus(["in_progress", "not_started"])).toBe("in_progress");
    expect(parentStatus(["done", "not_started"])).toBe("in_progress");
  });

  it("is done when every leaf is done or skipped", () => {
    expect(parentStatus(["done", "skipped"])).toBe("done");
  });

  it("is skipped only when every leaf is skipped", () => {
    expect(parentStatus(["skipped", "skipped"])).toBe("skipped");
  });
});

describe("layerNodeProgress", () => {
  const layer = {
    sideLeft: [{ title: "Basics", children: [{ title: "Intro" }, { title: "Types" }] }],
    sideRight: [{ title: "Setup", children: [{ title: "Install" }] }],
  };

  it("groups lesson statuses by section and totals the layer", () => {
    const { sections, summary } = layerNodeProgress(layer, { intro: "done", types: "in_progress" });
    expect(sections.get("Basics").summary).toMatchObject({ total: 2, completed: 1 });
    expect(sections.get("Basics").status).toBe("in_progress");
    expect(sections.get("Setup").status).toBe("not_started");
    expect(summary).toMatchObject({ total: 3, completed: 1, percent: 33 });
  });

  it("uses the lesson-page slugs", () => {
    expect(layerNodeProgress(layer, {}).sections.get("Basics").slugs).toEqual(["intro", "types"]);
  });
});

describe("layerView: badge and button always agree", () => {
  const started = summarize(["in_progress", "not_started"]);
  const allDone = summarize(["done", "skipped"]);

  it("nothing started on an open layer -> up next / Start learning", () => {
    expect(layerView("up-next", empty)).toEqual({ tone: "up-next", badge: "up next", cta: "Start learning", primaryCta: true });
  });

  it("some lessons started -> in progress / Continue", () => {
    expect(layerView("up-next", started)).toMatchObject({ badge: "in progress", cta: "Continue", primaryCta: true });
  });

  it("server says in progress even with no lesson statuses -> Continue", () => {
    expect(layerView("in-progress", empty)).toMatchObject({ badge: "in progress", cta: "Continue" });
  });

  it("every lesson finished, test not passed -> test ready / Review", () => {
    expect(layerView("up-next", allDone)).toMatchObject({ tone: "ready", badge: "test ready", cta: "Review" });
  });

  it("test passed -> done / Review, whatever the lessons say", () => {
    expect(layerView("done", empty)).toMatchObject({ badge: "done", cta: "Review" });
    expect(layerView("done", started)).toMatchObject({ badge: "done", cta: "Review" });
  });

  it("test not open yet -> test locked, never a primary button", () => {
    expect(layerView("locked", empty)).toMatchObject({ badge: "test locked", cta: "Preview", primaryCta: false });
    expect(layerView("locked", started)).toMatchObject({ badge: "test locked", cta: "Continue", primaryCta: false });
    expect(layerView("locked", allDone)).toMatchObject({ badge: "test locked", cta: "Review", primaryCta: false });
  });

  it("never pairs 'up next' with Continue/Review or 'done' with Start learning", () => {
    const states = ["done", "in-progress", "up-next", "locked"];
    const summaries = [empty, started, allDone];
    for (const st of states) {
      for (const sum of summaries) {
        const v = layerView(st, sum);
        if (v.badge === "up next") expect(v.cta).toBe("Start learning");
        if (v.badge === "done") expect(v.cta).toBe("Review");
        if (v.cta === "Start learning") expect(v.badge).toBe("up next");
      }
    }
  });
});
