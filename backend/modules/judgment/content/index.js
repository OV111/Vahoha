import backendStartup from "./backendStartup.js";

export const SCENARIOS = Object.freeze([backendStartup]);

export const getScenario = (id) => SCENARIOS.find((s) => s.id === id) ?? null;
