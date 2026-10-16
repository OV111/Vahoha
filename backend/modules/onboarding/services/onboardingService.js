const USERS = "users";

/** Ids of the tours this user already finished or skipped. */
export const getSeenTours = async (db, userId) => {
  const user = await db
    .collection(USERS)
    .findOne({ _id: userId }, { projection: { toursSeen: 1 } });
  return user?.toursSeen ?? [];
};

/**
 * Record that the user is done with a tour. $addToSet makes it idempotent:
 * pressing Done twice, or finishing in two tabs, can never store a duplicate.
 * Returns the full list so the client can replace its copy.
 */
export const markTourSeen = async (db, userId, tourId) => {
  await db
    .collection(USERS)
    .updateOne({ _id: userId }, { $addToSet: { toursSeen: tourId } });
  return getSeenTours(db, userId);
};
