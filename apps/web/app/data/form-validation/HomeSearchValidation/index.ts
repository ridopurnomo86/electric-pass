import { z } from "zod";

export type HomeSearchValidationType = z.infer<typeof HomeSearchValidation>;

export const HomeSearchValidation = z.object({
  location: z.string(),
});
