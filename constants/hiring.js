import { Building2, Briefcase, Users, UserCog, Rocket, BadgeCheck, Mic, Compass, ShieldCheck, GraduationCap } from "lucide-react";

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

export { TEAM_SIZES } from "./hiringRules";

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
