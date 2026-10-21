import { FEATURES } from "../../../constants/features";

// Where each step leads. The layer test and the voice exam both live inside a
// layer, so they open the roadmaps, where the layer is picked. "Get seen" goes to the
// candidates list when that feature is on, otherwise to the user's own profile.
export const TO = {
  root: "/roadmaps",
  study: "/roadmaps",
  practice: "/coding-challenges",
  library: "/libs",
  voice: "/voice-review",
  test: "/roadmaps",
  exam: "/roadmaps",
  mentor: "/ai-agent",
  teams: "/team",
  capstone: "/capstone",
  recruiters: FEATURES.candidates ? "/candidates" : "/my-profile",
};
