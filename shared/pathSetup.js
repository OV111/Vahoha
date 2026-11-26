// The Path Setup answers (TrackOnboardingPanel). Shared by the backend, which
// validates them and phrases them for the mentor, and the frontend, which asks.
// Each map is value -> how the mentor reads it.

export const PATH_SETUP = Object.freeze({
  skillLevel: Object.freeze({
    beginner: "no experience",
    some: "some basics",
    intermediate: "solid foundation",
    advanced: "experienced",
  }),
  goal: Object.freeze({
    get_job: "land a new role",
    upskill: "advance at their current job",
    build_projects: "build their own product",
    learn: "explore out of curiosity",
  }),
  background: Object.freeze({
    student: "student or bootcamp",
    working_dev: "employed in tech",
    career_changer: "switching careers into software",
    self_taught: "independent, self-taught learner",
  }),
  weeklyTime: Object.freeze({
    light: "1–5 h/week",
    moderate: "5–15 h/week",
    intensive: "15–30 h/week",
    fulltime: "30+ h/week",
  }),
});

export const ABOUT_MAX = 400;
