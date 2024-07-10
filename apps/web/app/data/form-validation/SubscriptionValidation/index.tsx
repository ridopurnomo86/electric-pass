import { z } from "zod";

export type SubscriptionValidationType = z.infer<typeof SubscriptionValidation>;

export const SubscriptionValidation = z.object({
  email: z.string().email(),
});
