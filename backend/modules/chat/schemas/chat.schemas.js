import { z } from "zod";

// Who may send this user a message request. Mutual followers can always chat.
export const messagePolicySchema = z.object({
  policy: z.enum(["everyone", "followers", "nobody"]),
});
