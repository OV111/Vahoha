import { z } from "zod";

/**
 * Body of DELETE /deleteAccount.
 *
 * Strings only: an object like {"$ne": null} must never reach a Mongo query.
 * The password is NOT trimmed, so it is compared exactly as typed, the same
 * way login does it (a trimmed copy could never match a hash made from a
 * password with a leading or trailing space).
 *
 * `password` and `confirmation` are both optional here because which one is
 * required depends on the account (password accounts vs Google/GitHub
 * accounts, which have none). The service decides; see deleteAccountService.
 */
export const deleteAccountSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .min(1, "Email is required.")
    .max(254, "Max 254 characters."),
  password: z.string().max(1024, "Invalid credentials.").optional(),
  confirmation: z.string().trim().max(32).optional(),
});
