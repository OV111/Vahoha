import { ObjectId } from "mongodb";
import { trackEvent } from "../../../services/eventService.js";
import { verifyUnsubscribeToken } from "../lib/unsubscribeToken.js";

// Stored on the user as emailPrefs.weeklySummary. Missing means on: the email
// is on by default, and every one of them carries an unsubscribe link.

export const getEmailPrefs = async (db, userId) => {
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(String(userId)) }, { projection: { emailPrefs: 1 } });
  return { weeklySummary: user?.emailPrefs?.weeklySummary !== false };
};

export const setEmailPrefs = async (db, userId, { weeklySummary }) => {
  await db
    .collection("users")
    .updateOne({ _id: new ObjectId(String(userId)) }, { $set: { "emailPrefs.weeklySummary": weeklySummary } });
  if (!weeklySummary) await trackEvent(db, userId, "email_unsubscribed", { via: "settings" });
  return { weeklySummary };
};

/** @returns {Promise<boolean>} false for a bad token */
export const unsubscribeWithToken = async (db, token, via) => {
  const userId = verifyUnsubscribeToken(token);
  if (!userId) return false;
  const res = await db
    .collection("users")
    .updateOne(
      { _id: new ObjectId(userId), "emailPrefs.weeklySummary": { $ne: false } },
      { $set: { "emailPrefs.weeklySummary": false } },
    );
  if (res.modifiedCount) await trackEvent(db, userId, "email_unsubscribed", { via });
  return true;
};
