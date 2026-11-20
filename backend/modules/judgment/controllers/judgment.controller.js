import { dbOf, respond } from "../../../utils/respond.js";
import { getRun, listScenarios, startRun, submitDecision } from "../services/runService.js";

const uid = (req) => req.user._id.toString();

// Thin HTTP handlers: all logic lives in runService.
export const scenarios = respond((req) => listScenarios(dbOf(req), uid(req)));
export const start = respond((req) => startRun(dbOf(req), uid(req), req.body.scenarioId), { status: 201 });
export const run = respond((req) => getRun(dbOf(req), uid(req), req.params.id));
export const decide = respond((req) => submitDecision(dbOf(req), uid(req), req.params.id, req.body));
