import { z } from "zod";
import { CONTACT_TOPICS, CONTACT_LIMITS } from "../../../../constants/contact.js";

export { CONTACT_TOPICS };

/**
 * `website` is a honeypot: the field is hidden from humans, so only bots fill
 * it. It's accepted here (not rejected) so the bot gets a normal-looking
 * success and has no signal to adapt to — the controller just drops it.
 */
export const contactBodySchema = z
  .object({
    name: z.string().trim().min(1, "Name is required").max(CONTACT_LIMITS.nameMax),
    email: z.string().trim().toLowerCase().email("Enter a valid email").max(254),
    topic: z.enum(CONTACT_TOPICS, { errorMap: () => ({ message: "Pick a topic" }) }),
    message: z
      .string()
      .trim()
      .min(CONTACT_LIMITS.messageMin, `Message must be at least ${CONTACT_LIMITS.messageMin} characters`)
      .max(CONTACT_LIMITS.messageMax, `Message must be ${CONTACT_LIMITS.messageMax} characters or fewer`),
    website: z.string().max(200).optional().default(""),
  })
  .strict();
