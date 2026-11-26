import { Building2, Briefcase, Users, UserCog, Rocket, BadgeCheck, Mic, Compass, ShieldCheck, GraduationCap, Ban, AlertTriangle, Flag, HelpCircle } from "lucide-react";
import { INTRO_RULES } from "@shared/hiringRules";

// Content for the hiring side (/hiring, /hiring/join, /hiring/home).

export const HIRING_HERO = {
  eyebrow: "For companies",
  title: "Hire developers who can defend their work.",
  body: "Every candidate on Vahoha earned their roadmap through graded exams, explained it out loud and defended their own code under a timer. You see the evidence, not a list of finished courses.",
};

// What a recruiter can look at on a candidate's scorecard.
export const HIRING_EVIDENCE = [
  { Icon: ShieldCheck, title: "Passed layer exams", body: "Server-graded tests on each roadmap layer, with the score." },
  { Icon: Mic, title: "Verified layers", body: "Spoken exams graded against a rubric, with quoted evidence." },
  { Icon: Compass, title: "Judgment results", body: "How they handled incidents and trade-offs in the simulator." },
  { Icon: BadgeCheck, title: "Defended capstone", body: "A real project, an AI repo review and a timed defense." },
];

export const HIRING_STEPS = [
  { title: "Create a hiring account", body: "Tell us about your company. It takes two minutes." },
  { title: "We check your company", body: "Usually within a day. This keeps developers safe from spam." },
  { title: "Browse and reach out", body: "Filter candidates by track and evidence. They accept before you see their contact details." },
];

// The one split that changes trust and limits.
export const ORG_TYPES = [
  {
    id: "company",
    Icon: Building2,
    title: "My own company",
    body: "Hiring for your own team, from startup to enterprise.",
  },
  {
    id: "agency",
    Icon: Briefcase,
    title: "A recruiting agency",
    body: "Hiring for clients. Checked by hand, with a daily contact limit.",
  },
];

// Roles inside a company. Agencies skip this step.
export const COMPANY_ROLES = [
  { id: "founder", Icon: Rocket, title: "Founder / CTO", body: "You hire yourself, often with no HR team." },
  { id: "hiring-manager", Icon: UserCog, title: "Hiring manager / Tech lead", body: "You pick who joins your team." },
  { id: "recruiter", Icon: Users, title: "HR / Talent recruiter", body: "You run hiring across the company." },
];

export { TEAM_SIZES } from "@shared/hiringRules";

export const JOIN_STEPS = ["Type", "Role", "Account", "Company", "Verify"];

export const JOIN_TITLES = [
  { title: "Who are you hiring for?", hint: "This decides how we check your account." },
  { title: "What's your role?", hint: "So we show you the right things first." },
  { title: "Create your login", hint: "You'll use this to sign in next time." },
  { title: "About your company", hint: "We use this to check you're a real team." },
  { title: "Confirm your work email", hint: "Last step. It proves you work where you say." },
];

// What each trust level means, shown after sign-up and on hiring home.
export const TRUST_COPY = {
  verified: { title: "You're verified.", body: "Your company passed our checks. You can browse candidates and reach out." },
  limited: { title: "You're in, with limited access.", body: "You can browse candidates. To contact them, we need a stronger signal:" },
  unverified: { title: "Confirm your email first.", body: "Enter the code we sent to your work email to finish." },
  rejected: { title: "We couldn't approve this account.", body: "Reply to any of our emails if you think this is a mistake." },
};

// The shared login page (/get-started) with ?for=hiring.
export const HIRING_LOGIN = {
  title: "Sign in to your hiring account",
  subtitle: "Welcome back. Log in to see your candidates.",
  emailPlaceholder: "you@company.com",
  newHere: "New to hiring on Vahoha? ",
  createLink: "Create a hiring account",
};
export const HIRING_LOGIN_PATH = "/get-started?mode=login&for=hiring";

// First screen of "Create account" on /get-started.
export const JOIN_AS = {
  title: "How will you use Vahoha?",
  subtitle: "We'll set up the right account for you.",
  options: [
    {
      id: "developer",
      Icon: GraduationCap,
      title: "I'm a developer",
      body: "Follow a roadmap, pass each test and build a record of what you can really do.",
    },
    {
      id: "hiring",
      Icon: Briefcase,
      title: "I'm hiring",
      body: "Meet developers who proved their skills in graded tests, spoken exams and defended projects.",
    },
  ],
};

// The hiring doors on other pages.
export const HIRE_CTA = {
  title: "Hiring?",
  body: (name) => `Create a free hiring account to contact ${name || "this developer"} and see more candidates like them.`,
  create: "Create hiring account",
};

// Labels for the job fields (the allowed values live in shared/hiringRules.js).
export const JOB_LEVEL_LABELS = { junior: "Junior", mid: "Mid-level", senior: "Senior" };
export const JOB_TYPE_LABELS = { "full-time": "Full-time", "part-time": "Part-time", contract: "Contract", internship: "Internship" };
export const WORKPLACE_LABELS = { remote: "Remote", hybrid: "Hybrid", onsite: "On-site" };
export const JOB_STATUS_LABELS = { draft: "Draft", open: "Open", closed: "Closed" };
export const SALARY_PERIOD_LABELS = { year: "per year", month: "per month", hour: "per hour" };

export const JOBS_COPY = {
  title: "Jobs",
  intro: "Jobs stay private to your company. They give your intro requests their context: what the role is, what it pays and which Vahoha layers it expects.",
  empty: "No jobs yet. Create one, then attach it when you reach out to a developer.",
  requiredLayersHint: "Developers prove these by passing the layer's test. Candidates then show how many they match.",
  salaryHint: "Optional, but jobs with a salary get a “Salary shown” badge that developers notice.",
};

// ── Intro requests ──────────────────────────────────────────────────────────
// The server counts the same limits (INTRO_RULES); the minimum length lives
// only in the API contract, so it is repeated here.
export const INTRO_MESSAGE = { min: 20, max: INTRO_RULES.messageMax };

export const INTRO_STATUS_LABELS = {
  pending: "Pending",
  accepted: "Accepted",
  declined: "Declined",
  expired: "Expired",
  withdrawn: "Withdrawn",
};

export const INTRO_FILTERS = [
  { id: "", label: "All" },
  ...Object.entries(INTRO_STATUS_LABELS).map(([id, label]) => ({ id, label })),
];

export const INTRO_REQUEST_COPY = {
  open: "Request intro",
  title: (name) => `Request an intro to ${name || "this developer"}`,
  hint: "Pick the job you're hiring for and say why you're reaching out.",
  jobLabel: "Which job?",
  messageLabel: "Your message",
  placeholder:
    "Hi! We're building … and your verified API layers and the capstone defense stood out. We'd like a 30-minute call about the role.",
  preview: `They'll see your company, the job and this message. Requests expire after ${INTRO_RULES.expiryDays} days.`,
  send: "Send request",
  sent: "Intro requested",
  noJobs: "You need an open job to request an intro.",
  createJob: "Create a job",
  verifiedOnly: "Only verified companies can request intros.",
  tooShort: (n) => `${n} more characters to go`,
};

export const INTROS_PAGE_COPY = {
  title: "Intros",
  intro: `Developers see your company, the job and your message. They have ${INTRO_RULES.expiryDays} days to answer; if they decline, you can ask again after ${INTRO_RULES.declineCooldownDays} days. Their email shows here once they accept.`,
  empty: "No intro requests here yet. Open a candidate and press “Request intro”.",
  emptyFiltered: "No requests with this status.",
  withdraw: "Withdraw",
  withdrawn: "Request withdrawn",
};

export const INTROS_SUMMARY_COPY = {
  title: "Intro requests",
  link: "See all",
  sentToday: (sent, limit) => `${sent} of ${limit} sent today`,
};

// Developer inbox (/my-profile/intros).
export const INBOX_COPY = {
  title: "Intros",
  subtitle: (pending) => (pending > 0 ? `${pending} waiting for your answer` : "Companies that want to talk to you"),
  empty: "No intro requests yet. When a verified company wants to talk to you about a job, it shows up here.",
  accept: "Accept",
  decline: "Decline",
  block: "Block company",
  report: "Report",
  accepted: "Accepted. We shared your email with them.",
  declined: `Declined. This company can't ask you again for ${INTRO_RULES.declineCooldownDays} days.`,
  blocked: "Company blocked. They can't contact you again.",
  reported: "Thanks. We'll look into it.",
  sharedEmail: "We shared your email with them",
  salaryHidden: "Salary not shown",
  matchLine: (met, total) => `You match ${met} of ${total}`,
  blockConfirm: {
    title: "Block this company?",
    body: "They won't be able to send you intro requests again, and this request is declined.",
    confirm: "Block company",
  },
  reportTitle: "What's wrong with this request?",
  reportDetails: "Anything we should know? (optional)",
  reportSend: "Send report",
};

export const TRUST_BADGES = {
  verified: { label: "Verified company", tone: "bg-emerald-500/15 text-emerald-300" },
  limited: { label: "Limited checks", tone: "bg-amber-500/15 text-amber-300" },
};

export const REPORT_REASONS = [
  { id: "spam", Icon: Ban, title: "Spam", body: "Mass message, nothing to do with me." },
  { id: "scam", Icon: AlertTriangle, title: "Scam", body: "Asks for money, personal data or looks fake." },
  { id: "inappropriate", Icon: Flag, title: "Inappropriate", body: "Rude, offensive or harassing." },
  { id: "other", Icon: HelpCircle, title: "Something else", body: "Tell us in the details below." },
];
export const REPORT_DETAILS_MAX = 500;
