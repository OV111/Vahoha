import useProfileStore from "../../../stores/useProfileStore";

export const HIRING_HOME = "/hiring/home";

// Where a user lands after logging in. The account decides, not the door they
// used: a recruiter who logs in on the learner page still goes to hiring home,
// and a learner on the hiring login still goes to `fallback`.
export const landingPath = async (fallback = "/") => {
  await useProfileStore.getState().fetchProfile();
  return useProfileStore.getState().user?.role === "recruiter" ? HIRING_HOME : fallback;
};
