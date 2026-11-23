import { SALARY_PERIOD_LABELS } from "../../../../constants/hiring";

const money = (n, currency) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency, maximumFractionDigits: 0 }).format(n);

/** "$1,500 – $2,500 per month", or null when the job shows no salary. */
export const salaryText = (s) =>
  s ? `${money(s.min, s.currency)} – ${money(s.max, s.currency)} ${SALARY_PERIOD_LABELS[s.period]}` : null;
