import { getSeenTours, markTourSeen } from "../services/onboardingService.js";

// `req.params.tourId` is already validated by the route (see tourParamsSchema).

export const listSeen = async (req, res) => {
  try {
    const seen = await getSeenTours(req.app.locals.db, req.user._id);
    res.json({ seen });
  } catch (err) {
    console.error("onboarding list failed:", err);
    res.status(500).json({ message: "Couldn't load your onboarding progress" });
  }
};

export const markSeen = async (req, res) => {
  try {
    const seen = await markTourSeen(req.app.locals.db, req.user._id, req.params.tourId);
    res.json({ seen });
  } catch (err) {
    console.error("onboarding mark failed:", err);
    res.status(500).json({ message: "Couldn't save your onboarding progress" });
  }
};
