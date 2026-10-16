import { Router } from "express";
import rateLimit from "express-rate-limit";
import { authenticate } from "../../../middleware/authenticate.js";
import { validate } from "../../../middleware/validate.js";
import { deleteAccount } from "../controllers/account.controller.js";
import { deleteAccountSchema } from "../schemas/account.schemas.js";

const router = Router();

// The password is the only real check on this endpoint, so a stolen access
// token must not allow unlimited guessing. Only failed attempts count
// (skipSuccessfulRequests), so a legitimate deletion is never blocked.
export const deleteAccountLimiter = rateLimit({
  windowMs: 15 * 60_000,
  limit: 5,
  skipSuccessfulRequests: true,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    message: "Too many attempts. Please wait 15 minutes and try again.",
    status: 429,
  },
});

/**
 * @openapi
 * tags:
 *   - name: Account
 *     description: Account management
 */

/**
 * @openapi
 * /deleteAccount:
 *   delete:
 *     tags: [Account]
 *     summary: Permanently delete the authenticated user's account
 *     description: >
 *       Accounts with a password must send `password`. Accounts that sign in
 *       with Google or GitHub have none, so they send `confirmation: "DELETE"`
 *       instead. Both must send the account `email`.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Account deleted
 *       400:
 *         description: Missing password or confirmation
 *       401:
 *         description: Not signed in, or incorrect password
 *       429:
 *         description: Too many failed attempts (5 per 15 minutes)
 *       502:
 *         description: Active subscription could not be cancelled; nothing was deleted
 */

// Order matters: `authenticate` runs first, so a request with no valid token
// never spends the password-guessing budget of the limiter below it.
router.delete(
  "/deleteAccount",
  authenticate,
  deleteAccountLimiter,
  validate({ body: deleteAccountSchema }),
  deleteAccount,
);

export default router;
