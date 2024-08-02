import { z } from "zod";

export type SettingsBasicInfoValidationType = z.infer<typeof SettingsBasicInfoValidation>;

export const SettingsBasicInfoValidation = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  bio: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(255, {
      message: "Bio must not be longer than 255 characters.",
    }),
});
