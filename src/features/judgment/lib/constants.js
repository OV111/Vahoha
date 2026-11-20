// Mirrors backend/modules/judgment/lib/constants.js.
export const CONFIDENCE_LEVELS = [
  { value: 50, label: "Not sure" },
  { value: 70, label: "Fairly sure" },
  { value: 90, label: "Very sure" },
];

export const MIN_WHY_CHARS = 10;
export const MAX_WHY_CHARS = 1000;

export const VERDICTS = {
  strong: { label: "Strong call", chip: "border-emerald-800/60 bg-emerald-950/40 text-emerald-300" },
  mixed: { label: "Defensible", chip: "border-amber-800/60 bg-amber-950/40 text-amber-300" },
  weak: { label: "Weak call", chip: "border-rose-900/60 bg-rose-950/40 text-rose-300" },
};

export const CALIBRATION_TEXT = {
  calibrated: "Your confidence matched how good your calls were. You know what you don't know.",
  overconfident: "You were surer than your calls deserved. Slow down where you feel most certain.",
  underconfident: "Your calls were better than you thought. Trust your reasoning a bit more.",
};
