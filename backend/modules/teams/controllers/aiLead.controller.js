/**
 * The AI lead: sprint plans a person accepts, and the team's pulse (health,
 * warnings, weekly update).
 */

import { acceptPlanService, createPlanService, discardPlanService, getPlanService } from "../services/ai-lead/aiPlanService.js";
import { getPulseService } from "../services/ai-lead/teamPulseService.js";
import { dbOf, respond } from "../../../utils/respond.js";

const p = (req) => req.params;

export const getPlan = respond((req) => getPlanService(dbOf(req), p(req).teamId, req.user));
export const createPlan = respond((req) => createPlanService(dbOf(req), p(req).teamId, req.user, req.body));
export const acceptPlan = respond((req) => acceptPlanService(dbOf(req), p(req).teamId, p(req).planId, req.user, req.body));
export const discardPlan = respond((req) => discardPlanService(dbOf(req), p(req).teamId, p(req).planId, req.user));

export const getPulse = respond((req) => getPulseService(dbOf(req), p(req).teamId, req.user));
